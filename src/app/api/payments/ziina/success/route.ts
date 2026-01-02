import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth, UnauthorizedError, ForbiddenError } from '@/server/auth';
import { getAdminDb } from '@/server/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

const API_KEY = process.env.ZIINA_API_KEY;
const BASE_URL = process.env.ZIINA_BASE_URL || 'https://api.sandbox.ziina.com';

const requestSchema = z.object({
  chargeId: z.string().min(1),
  tenantId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const decodedToken = await requireAuth(req);
    if (!API_KEY) {
      console.error('[ziina/success] Ziina API Key missing');
      return NextResponse.json({ error: 'Ziina is not configured' }, { status: 500 });
    }

    const payload = requestSchema.parse(await req.json());
    const tenantId = payload.tenantId || decodedToken.uid;

    // 1. Verify the charge with Ziina
    const response = await fetch(`${BASE_URL}/v1/charges/${payload.chargeId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[ziina/success] Ziina API Error:', data);
      return NextResponse.json({ error: 'Ziina charge lookup failed', details: data }, { status: 500 });
    }

    // Ziina status should be 'captured' or 'successful' depending on their specific API version
    // We check for successful payment indicators.
    const isSuccessful = data.status === 'captured' || data.status === 'successful';

    if (isSuccessful) {
      // 2. Record the transaction in Firestore
      const db = getAdminDb();
      const paymentRef = db.collection('tenants').doc(tenantId).collection('billing').doc(payload.chargeId);
      
      await paymentRef.set({
        id: payload.chargeId,
        status: 'completed',
        amount: data.amount / 100, // Ziina typically uses subunits (fils for AED)
        currency: data.currency || 'AED',
        ziinaData: data,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        type: 'one_time_payment',
        provider: 'ziina'
      });

      // 3. Update Tenant Subscription Status
      await db.collection('tenants').doc(tenantId).set({
        subscriptionStatus: 'active',
        lastPaymentAt: FieldValue.serverTimestamp(),
        paymentProvider: 'ziina',
        updatedAt: FieldValue.serverTimestamp(),
      }, { merge: true });

      console.log(`[ziina/success] Payment recorded for tenant ${tenantId}: ${payload.chargeId}`);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[ziina/success] error', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.json({ error: 'Failed to process Ziina success' }, { status: 500 });
  }
}
