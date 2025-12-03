import { nanoid } from 'nanoid';
import type { SitePage } from '@/lib/types';

// In-memory store for published sites (mock database)
const publishedSites: Record<string, SitePage> = {};

export const publishSite = async (page: SitePage) => {
  // In a real app, this would save to Firestore/Database
  const siteId = nanoid(10); // Generate a short, unique ID
  const publishedUrl = `${window.location.origin}/p/${siteId}`;
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  publishedSites[siteId] = page;
  
  return {
    siteId,
    publishedUrl
  };
};

export const getPublishedSite = async (siteId: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return publishedSites[siteId];
}
