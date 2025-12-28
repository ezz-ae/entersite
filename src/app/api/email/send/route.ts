import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { z } from 'zod';
import { enforceRateLimit, getRequestIp } from '@/lib/rate-limit';
import { requireAuth, UnauthorizedError, ForbiddenError } from '@/server/auth';
import { createApiLogger } from '@/lib/logger';

const API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;

if (API_KEY) {
  sgMail.setApiKey(API_KEY);
}

const payloadSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
  tenantId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const logger = createApiLogger(req, { route: 'POST /api/email/send' });
  try {
    await requireAuth(req);
    if (!API_KEY || !FROM_EMAIL) {
      logger.logError('SendGrid not configured', 500);
      return NextResponse.json({ error: 'SendGrid is not configured' }, { status: 500 });
    }

    const ip = getRequestIp(req);
    if (!enforceRateLimit(`email:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
      logger.logRateLimit();
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const payload = payloadSchema.parse(await req.json());
    logger.setTenant(payload.tenantId);

    await sgMail.send({
      to: payload.to,
      from: FROM_EMAIL,
      subject: payload.subject,
      text: payload.body,
      html: `<div style="font-family: sans-serif; line-height: 1.6; color: #333;">${payload.body}</div>`,
    });

    logger.logSuccess(200, { to: payload.to });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('SendGrid Engine Error:', error.response?.body || error.message);
    logger.logError(error, 500, { provider: 'sendgrid' });
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.json({
      error: 'Failed to send email',
      details: error.response?.body?.errors || [],
    }, { status: 500 });
  }
}
