import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, UnauthorizedError, ForbiddenError } from '@/server/auth';
import { getAdminDb } from '@/server/firebase-admin';
import { updateMarketingTotals } from '@/server/marketing-analytics';
import { z } from 'zod';
import { createApiLogger } from '@/lib/logger';

// Standard ESM import for the FB SDK
import * as bizSdk from 'facebook-nodejs-business-sdk';

const requestSchema = z.object({
  name: z.string().min(1),
  budget: z.number().nonnegative(),
  objective: z.enum(['OUTCOME_TRAFFIC', 'OUTCOME_LEADS', 'OUTCOME_AWARENESS']).default('OUTCOME_TRAFFIC'),
  location: z.string().min(1),
  tenantId: z.string().optional(),
});

export async function POST(req: NextRequest) {
    const logger = createApiLogger(req, { route: 'POST /api/ads/meta/sync' });
    try {
        const user = await requireAuth(req);
        const payload = requestSchema.parse(await req.json());
        logger.setTenant(payload.tenantId || user.uid);

        const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
        const FB_AD_ACCOUNT_ID = process.env.FB_AD_ACCOUNT_ID;

        if (!FB_ACCESS_TOKEN || !FB_AD_ACCOUNT_ID) {
            logger.logError('Meta credentials missing', 500);
            return NextResponse.json({ error: 'Meta integration is not configured' }, { status: 500 });
        }

        // 1. Initialize Meta API
        bizSdk.FacebookAdsApi.init(FB_ACCESS_TOKEN);
        const AdAccount = bizSdk.AdAccount;
        const account = new AdAccount(FB_AD_ACCOUNT_ID);

        // 2. Create the Campaign
        // Note: Real estate ads MUST have special_ad_categories: ['HOUSING']
        const campaign = await account.createCampaign([], {
            name: payload.name,
            objective: payload.objective,
            status: 'PAUSED',
            special_ad_categories: ['HOUSING'],
        });

        const campaignId = campaign.id;

        // 3. Persist in Firestore
        const db = getAdminDb();
        const tenantId = payload.tenantId || user.uid || 'public';
        const campaignDoc = db.collection('tenants').doc(tenantId).collection('meta_campaigns').doc(campaignId);
        
        const now = new Date().toISOString();
        await campaignDoc.set({
            ...payload,
            campaignId,
            status: 'Draft',
            provider: 'meta',
            createdAt: now,
            updatedAt: now,
            metaData: {
                fbId: campaignId,
                objective: payload.objective
            }
        });

        // 4. Update Analytics
        await updateMarketingTotals(db, tenantId, (totals) => {
            totals.adSpend = (totals.adSpend || 0) + payload.budget;
            return totals;
        });

        logger.logSuccess(200, { campaignId });
        return NextResponse.json({ success: true, campaignId });

    } catch (error: any) {
        console.error('[meta/sync] error', error);
        logger.logError(error);
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
            error: 'Failed to sync with Meta', 
            details: error.response?.error?.message || error.message 
        }, { status: 500 });
    }
}
