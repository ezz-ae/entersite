import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import type { SitePage } from '@/lib/types';
import { nanoid } from 'nanoid';

export const publishSite = async (page: SitePage, ownerUid?: string) => {
  const siteId = page.id || nanoid(10);
  const siteRef = doc(db, 'sites', siteId);
  
  // Create a subdomain friendly slug from title
  const slug = page.title.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 30);
    
  const siteData = {
    ...page,
    id: siteId,
    ownerUid: ownerUid || page.ownerUid || 'anonymous',
    tenantId: page.tenantId || 'public',
    published: true,
    slug,
    updatedAt: new Date().toISOString(),
  };

  await setDoc(siteRef, {
    ...siteData,
    updatedAt: serverTimestamp(),
  }, { merge: true });

  const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  const rootDomain = isDev ? 'localhost:3000' : 'entrestate.com';
  
  // Real subdomain logic would require wildcard DNS + middleware, 
  // for this prototype we'll use the [siteId] path but label it as subdomain in UI
  const publishedUrl = isDev 
    ? `http://${slug}.site.${rootDomain}/p/${siteId}`
    : `https://${slug}.site.${rootDomain}/p/${siteId}`;
  
  return {
    siteId,
    publishedUrl: `https://${slug}.site.entrestate.com` // Final display URL
  };
};

export const getPublishedSite = async (siteId: string): Promise<SitePage | null> => {
  try {
    const docRef = doc(db, 'sites', siteId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as SitePage;
    }
    return null;
  } catch (error) {
    console.error("Error fetching published site:", error);
    return null;
  }
};
