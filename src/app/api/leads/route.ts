import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/server/firebase-admin';
import { updateMarketingTotals } from '@/server/marketing-analytics';
import { createApiLogger } from '@/lib/logger';
import { enforceRateLimit, getRequestIp } from '@/lib/rate-limit';

const payloadSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(30).optional(),
  source: z.string().max(120).optional(),
  project: z.string().max(120).optional(),
  tenantId: z.string().optional(),
  siteId: z.string().min(1).max(120).optional(),
  context: z.object({
    page: z.string().optional(),
    buttonId: z.string().optional(),
    service: z.string().optional(),
  }).optional(),
  attribution: z.object({
    campaignId: z.string().optional(),
    campaignDocId: z.string().optional(),
    channel: z.string().optional(),
    value: z.number().nonnegative().optional(),
  }).optional(),
  metadata: z.record(z.any()).optional(),
});

async function attributeLeadToCampaign(
  db: FirebaseFirestore.Firestore,
  tenantId: string,
  attribution: { campaignId?: string; campaignDocId?: string; value?: number } | undefined,
  leadId: string,
  timestamp: string,
) {
  const campaignIdentifier = attribution?.campaignDocId || attribution?.campaignId;
  if (!campaignIdentifier) return;

  const campaignsRef = db.collection('tenants').doc(tenantId).collection('ads_campaigns');
  let campaignRef = campaignsRef.doc(campaignIdentifier);
  let campaignSnap = await campaignRef.get();

  if (!campaignSnap.exists && attribution?.campaignId && attribution.campaignId !== campaignIdentifier) {
    const query = await campaignsRef.where('campaignId', '==', attribution.campaignId).limit(1).get();
    if (!query.empty) {
      campaignRef = query.docs[0].ref;
      campaignSnap = query.docs[0];
    } else {
      return;
    }
  } else if (!campaignSnap.exists) {
    return;
  }

  const revenueDelta = Math.max(0, attribution?.value ?? 0);

  await campaignRef.set(
    {
      leadsCaptured: FieldValue.increment(1),
      conversions: FieldValue.increment(1),
      revenue: FieldValue.increment(revenueDelta),
      lastConversionAt: timestamp,
      lastLeadId: leadId,
    },
    { merge: true },
  );

  const refreshedSnap = await campaignRef.get();
  const refreshed = refreshedSnap.data() || {};
  const scheduledSpend = refreshed.scheduledSpend ?? ((refreshed.budget || 0) * (refreshed.duration || 0));
  const totalRevenue = refreshed.revenue ?? 0;
  if (scheduledSpend > 0) {
    await campaignRef.set(
      {
        roas: totalRevenue / scheduledSpend,
      },
      { merge: true },
    );
  }

  await updateMarketingTotals(db, tenantId, (totals) => {
    totals.conversions = (totals.conversions || 0) + 1;
    totals.revenue = (totals.revenue || 0) + revenueDelta;
    if ((totals.conversions || 0) > 0 && (totals.adSpend || 0) > 0) {
      totals.cpl = totals.adSpend / (totals.conversions || 1);
    }
    if ((totals.adSpend || 0) > 0) {
      totals.roas = (totals.revenue || 0) / totals.adSpend;
    }
    return totals;
  });
}

export async function POST(req: NextRequest) {
  const logger = createApiLogger(req, { route: 'POST /api/leads' });
  try {
    const body = await req.json();
    const payload = payloadSchema.parse(body);
    logger.setTenant(payload.tenantId);

    if (!payload.email && !payload.phone) {
      logger.logError('Missing contact', 400);
      return NextResponse.json({ error: 'Email or phone is required.' }, { status: 400 });
    }

    const ip = getRequestIp(req);
    if (!enforceRateLimit(`leads:${ip}`, 60, 60_000)) {
      logger.logRateLimit();
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const db = getAdminDb();
    const tenantId = payload.tenantId || 'public';
    const leadRef = db.collection('tenants').doc(tenantId).collection('leads').doc();
    const now = new Date().toISOString();

    const siteId = payload.siteId || payload.metadata?.siteId;

    await leadRef.set({
      ...payload,
      siteId,
      status: 'new',
      createdAt: now,
      updatedAt: now,
    });

    const eventsRef = db.collection('tenants').doc(tenantId).collection('events').doc();
    await eventsRef.set({
      type: 'cta_click',
      buttonId: payload.context?.buttonId,
      page: payload.context?.page,
      service: payload.context?.service,
      leadId: leadRef.id,
      siteId,
      createdAt: now,
    });

    await attributeLeadToCampaign(db, tenantId, payload.attribution, leadRef.id, now);

    logger.logSuccess(200, { leadId: leadRef.id, tenantId });
    return NextResponse.json({ success: true, leadId: leadRef.id });
  } catch (error) {
    console.error('[leads] error', error);
    logger.logError(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 });
  }
}
