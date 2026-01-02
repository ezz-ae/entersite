import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { paypalRequest } from '@/server/paypal';
import { requireAuth, UnauthorizedError, ForbiddenError } from '@/server/auth';
import { getAdminDb } from '@/server/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

const requestSchema = z.object({
  orderId: z.string().min(1),
  tenantId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const decodedToken = await requireAuth(req);
    const payload = requestSchema.parse(await req.json());

    // 1. Capture the payment from PayPal
    const response = await paypalRequest(`/v2/checkout/orders/${payload.orderId}/capture`, {
      method: 'POST',
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[paypal/capture] PayPal API error:', data);
      return NextResponse.json({ error: 'PayPal capture failed', details: data }, { status: 500 });
    }

    // 2. Record the transaction in Firestore (Indestructible Record)
    const db = getAdminDb();
    const tenantId = payload.tenantId || decodedToken.uid;
    const paymentId = data.purchase_units?.[0]?.payments?.captures?.[0]?.id || payload.orderId;
    const amount = data.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value || "0";
    
    const paymentRef = db.collection('tenants').doc(tenantId).collection('billing').doc(paymentId);
    
    await paymentRef.set({
      id: paymentId,
      orderId: payload.orderId,
      status: 'completed',
      amount: parseFloat(amount),
      currency: data.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.currency_code || 'USD',
      paypalData: data,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      type: 'one_time_payment',
    });

    // 3. Update Tenant Subscription Status (Optional - adjust logic to your needs)
    await db.collection('tenants').doc(tenantId).set({
      subscriptionStatus: 'active',
      lastPaymentAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    console.log(`[paypal/capture] Payment recorded for tenant ${tenantId}: ${paymentId}`);

    return NextResponse.json({ success: true, paymentId, data });
  } catch (error) {
    console.error('[paypal/capture] error', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.json({ error: 'Failed to capture order' }, { status: 500 });
  }
}
