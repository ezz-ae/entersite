import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { z } from 'zod';
import { getGoogleModel, FLASH_MODEL } from '@/lib/ai/google';
import { getAdminDb } from '@/server/firebase-admin';
import { requireAuth, UnauthorizedError, ForbiddenError } from '@/server/auth';

const requestSchema = z.object({
  message: z.string().min(1),
  history: z.array(z.object({
    role: z.enum(['user', 'agent']),
    text: z.string(),
  })).optional(),
  tenantId: z.string().optional(),
  siteId: z.string().optional(),
  context: z.string().optional(),
});

// Simple RAG: Fetch relevant projects from Firestore based on message keywords
async function fetchRelevantInventory(message: string) {
  const db = getAdminDb();
  const keywords = message.toLowerCase().split(/\s+/).filter(k => k.length > 3);
  
  if (keywords.length === 0) return [];

  // In a real production app, you might use vector search. 
  // Here we do a simple keyword match on names and areas as a first pass.
  // We limit to 3 projects to keep the prompt size small.
  const snapshot = await db.collection('inventory_projects')
    .limit(10) // Fetch a few to filter in memory
    .get();

  const allProjects = snapshot.docs.map(doc => doc.data());
  
  return allProjects.filter(p => {
    const text = `${p.name} ${p.location?.area} ${p.developer} ${p.description?.short}`.toLowerCase();
    return keywords.some(k => text.includes(k));
  }).slice(0, 3);
}

const rateLimits = new Map<string, { count: number; expiresAt: number }>();
const RATE_LIMIT_MAX = 15; // Increased slightly for RAG overhead
const RATE_LIMIT_WINDOW_MS = 60_000;

function consumeRateLimit(key: string) {
  const now = Date.now();
  const bucket = rateLimits.get(key);
  if (!bucket || bucket.expiresAt < now) {
    rateLimits.set(key, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (bucket.count >= RATE_LIMIT_MAX) {
    return false;
  }
  bucket.count += 1;
  return true;
}

export async function POST(req: NextRequest, { params: paramsPromise }: { params: Promise<{ botId: string }> }) {
  try {
    const params = await paramsPromise;
    const user = await requireAuth(req);
    const ip = req.headers.get('x-forwarded-for') || 'anon';
    if (!consumeRateLimit(`${params.botId}:${ip}`)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();
    const payload = requestSchema.parse(body);

    // 1. Fetch relevant project data (RAG)
    const projects = await fetchRelevantInventory(payload.message);
    const projectContext = projects.length > 0 
      ? `Relevant Projects found in database:\n${projects.map(p => `- ${p.name} in ${p.location?.area}: Starting at ${p.price?.label}. ROI: ${p.performance?.roi}%. Handover: Q${p.handover?.quarter} ${p.handover?.year}`).join('\n')}`
      : "No specific project matches found in the direct search. Refer to general market knowledge but be cautious.";

    // 2. Build the history
    const historyText = (payload.history || [])
      .map((entry) => `${entry.role === 'user' ? 'User' : 'Agent'}: ${entry.text}`)
      .join('\n');

    const prompt = `
Context: ${payload.context || 'web_widget'}.
${projectContext}

Conversation so far:
${historyText}

User (${params.botId}): ${payload.message}
`;

    const { text } = await generateText({
      model: getGoogleModel(FLASH_MODEL),
      system: `You are EntreSite's AI sales concierge. 
               Use the "Relevant Projects" provided in the context as your primary source of truth. 
               Be concise, professional, and high-end. 
               Cite the specific ROI and handover dates from the provided data.
               Always steer toward capturing name/contact if missing. 
               If no projects are provided, speak generally about Dubai real estate but encourage the user to provide their requirements so you can find matches.`,
      prompt,
    });

    // Log to Firestore for monitoring
    try {
      const db = getAdminDb();
      await db.collection('bot_events').add({
        botId: params.botId,
        tenantId: payload.tenantId || user.uid || 'public',
        siteId: payload.siteId || null,
        userMessage: payload.message,
        agentReply: text,
        matchedProjects: projects.map(p => p.id),
        createdAt: new Date().toISOString(),
        context: payload.context || 'web_widget',
      });
    } catch (logError) {
      console.error('[bot] failed to log event', logError);
    }

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error('[bot/chat] error', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
