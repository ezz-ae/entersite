import { getAdminDb } from '@/server/firebase-admin';

export const PRO_PLAN_PRICE_USD = 19;

export type SubscriptionStatus = 'active' | 'inactive' | 'trial';

export async function getUserSubscriptionStatus(userId: string): Promise<SubscriptionStatus> {
  if (!userId) return 'inactive';
  
  try {
    const db = getAdminDb();
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) return 'inactive';
    
    const data = userDoc.data();
    // In a real app, you would check Stripe/PayPal subscription status here
    // For this MVP, we can check a manual flag or a 'proUntil' date
    if (data?.isPro) return 'active';
    
    return 'inactive';
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    return 'inactive';
  }
}

export async function activateProSubscription(userId: string) {
  try {
     const db = getAdminDb();
     await db.collection('users').doc(userId).set({
         isPro: true,
         proSince: new Date().toISOString(),
         updatedAt: new Date().toISOString()
     }, { merge: true });
     return true;
  } catch (error) {
      console.error('Failed to activate pro', error);
      return false;
  }
}
