import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/server/firebase-admin';
import { ENTRESTATE_INVENTORY } from '@/data/entrestate-inventory';
import { filterProjects, paginateProjects } from '@/lib/projects/filter';
import type { ProjectData } from '@/lib/types';

const MAX_LIMIT = 24;

function parseFilters(searchParams: URLSearchParams) {
  return {
    query: searchParams.get('query')?.toLowerCase() ?? '',
    city: searchParams.get('city'),
    developer: searchParams.get('developer')?.toLowerCase(),
    status: searchParams.get('status'),
    minPrice: parseFloat(searchParams.get('minPrice') || '0') || undefined,
    maxPrice: parseFloat(searchParams.get('maxPrice') || '0') || undefined,
    page: Math.max(parseInt(searchParams.get('page') || '1', 10), 1),
    limit: Math.min(parseInt(searchParams.get('limit') || '12', 10), MAX_LIMIT),
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filters = parseFilters(searchParams);

  try {
    const db = getAdminDb();

    const snapshot = await db.collection('inventory_projects').orderBy('name').get();
    const source: ProjectData[] = snapshot.empty
      ? [...ENTRESTATE_INVENTORY]
      : snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ProjectData[];

    const filtered = filterProjects(source, filters);
    const { pageItems, meta } = paginateProjects(filtered, filters.page, filters.limit);

    return NextResponse.json({
      data: pageItems,
      pagination: meta,
    });
  } catch (error) {
    console.error('[projects/search] error', error);
    const filtered = filterProjects(ENTRESTATE_INVENTORY, filters);
    const { pageItems, meta } = paginateProjects(filtered, filters.page, filters.limit);
    return NextResponse.json({
      data: pageItems,
      pagination: meta,
    });
  }
}
