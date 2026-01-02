import React from 'react';
import { Metadata } from 'next';
import { getAdminDb } from '@/server/firebase-admin';
import { ENTRESTATE_INVENTORY } from '@/data/entrestate-inventory';
import type { ProjectData } from '@/lib/types';
import { SiteClient } from './site-client';

export const metadata: Metadata = {
  title: 'Build Site | EntreSite OS',
  description: 'The autonomous engine for real estate marketing. Build, analyze, and deploy marketing assets instantly.',
};

async function getInitialProjects(): Promise<ProjectData[]> {
  try {
    const db = getAdminDb();
    const snapshot = await db.collection('inventory_projects').limit(6).get();
    if (snapshot.empty) return ENTRESTATE_INVENTORY.slice(0, 6);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ProjectData[];
  } catch (error) {
    console.error('Failed to fetch initial discovery projects', error);
    return ENTRESTATE_INVENTORY.slice(0, 6);
  }
}

export default async function SitePage() {
  const initialProjects = await getInitialProjects();
  return <SiteClient initialProjects={initialProjects} />;
}
