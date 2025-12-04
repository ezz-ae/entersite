import { NextRequest, NextResponse } from 'next/server';
import { SessionsClient } from '@google-cloud/dialogflow-cx';
import { z } from 'zod';

// Configuration for your deployed Vertex AI Agent
const PROJECT_ID = process.env.VERTEX_AI_PROJECT_ID || 'studio-7730943652-a28e0';
const LOCATION = process.env.VERTEX_AI_LOCATION || 'us-central1';
const AGENT_ID = process.env.VERTEX_AI_AGENT_ID || '1573986079533432832';
const LANGUAGE_CODE = 'en';

const agentResponseSchema = z.object({
  siteType: z.enum(['roadshow', 'developer-focus', 'partner-launch', 'full-company', 'freelancer', 'map-focused', 'ads-launch', 'agent-portfolio', 'custom']).optional(),
  pageTitle: z.string().optional(),
  projectName: z.string().optional(),
  developerName: z.string().optional(),
  locationCity: z.string().optional(),
  brandColor: z.string().optional(), // Hex code expected
  logoUrl: z.string().optional(),
  adCampaignConfig: z.object({
    budget: z.number().optional(),
    keywords: z.array(z.string()).optional(),
    // ... other ad specific configs
  }).optional(),
  // This is a simplified representation of blocks. Realistically, it would be a more complex schema.
  blocks: z.array(z.object({
    type: z.string(),
    data: z.record(z.any()).optional()
  })).optional(),
});

// Initialize the client (relies on Application Default Credentials)
const client = new SessionsClient({
  apiEndpoint: `${LOCATION}-dialogflow.googleapis.com`,
});

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId } = await req.json();

    const sessionPath = client.projectLocationAgentSessionPath(
      PROJECT_ID,
      LOCATION,
      AGENT_ID,
      sessionId || 'default-session' 
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
        },
        languageCode: LANGUAGE_CODE,
      },
    };

    const [response] = await client.detectIntent(request);
    const result = response.queryResult;
    
    const agentText = result?.responseMessages?.[0]?.text?.text?.[0] || "I'm processing your request. Please bear with me...";
    
    const parameters = result?.parameters ? agentResponseSchema.parse(result.parameters.fields) : {}; // Parse and validate parameters
    const isEndInteraction = result?.match?.intent?.displayName === 'End Session' || !result?.match?.intent; // Infer end of conversation

    // If agent returns structured parameters, use them
    if (Object.keys(parameters).length > 0) {
        console.log("Agent returned structured parameters:", parameters);
        return NextResponse.json({
          text: agentText,
          parameters: parameters,
          isEndInteraction: isEndInteraction
        });
    }

    // Else, continue conversation
    return NextResponse.json({
        text: agentText,
        parameters: null, 
        isEndInteraction: isEndInteraction
    });

  } catch (error) {
    console.error('Vertex AI Agent Error:', error);
    
    // Enhanced Fallback for robust development
    const mockConfig = {
      siteType: 'full-company',
      pageTitle: 'Luxury Portfolio Generated',
      projectName: 'Marina Residences',
      developerName: 'Emaar',
      brandColor: '#D4AF37', // Gold
      blocks: [
        { type: 'hero', data: { headline: "Your AI-Crafted Luxury Site", subtext: "Generated instantly by EntreSite AI." } },
        { type: 'listing-grid', data: { headline: "Featured Marina Residences" } },
        { type: 'cta-form', data: { headline: "Book Your Exclusive Tour" } }
      ]
    };
    
    return NextResponse.json({ 
      text: "(Mock Agent): I'm simulating the agent response. Here is a generated site configuration. To connect a real agent, set up Vertex AI credentials.",
      parameters: mockConfig,
      isEndInteraction: true
    });
  }
}
