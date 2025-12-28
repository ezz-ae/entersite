import type { ProjectData } from '@/lib/types';
import { getAdminDb } from '@/server/firebase-admin';
import { ProjectDiscoveryClient } from '@/components/marketing/project-discovery-client';
import { ENTRESTATE_INVENTORY } from '@/data/entrestate-inventory';
import { shouldUseRemoteContent } from '@/server/remote-config';

async function fetchInitialProjects(): Promise<ProjectData[]> {
  try {
    if (!shouldUseRemoteContent) {
      return ENTRESTATE_INVENTORY.slice(0, 6);
    }
    const db = getAdminDb();
    const snapshot = await db
      .collection('inventory_projects')
      .orderBy('name')
      .limit(6)
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ProjectData[];
  } catch (error) {
    console.error('[ProjectDiscoverySection] Failed to fetch inventory_projects', error);
    return [];
  }
}

export async function ProjectDiscoverySection() {
  const initialProjects = await fetchInitialProjects();
  return <ProjectDiscoveryClient initialProjects={initialProjects} />;
}
