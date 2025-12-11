
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ProjectData, ProjectFilter } from '@/lib/types';
import { fetchRealisteProjects } from '@/lib/graphql-service';
import { debounce } from 'lodash';

// Helper to transform raw GraphQL data into our ProjectData format
const transformProjectData = (rawProject: any): ProjectData => {
  const priceFrom = rawProject.stats?.priceRange?.min?.value || 0;
  const priceLabel = priceFrom 
    ? `${rawProject.stats.priceRange.min.currency} ${priceFrom.toLocaleString('en-US', { notation: 'compact', compactDisplay: 'short' })}`
    : 'POA';

  let availability: ProjectData['availability'] = 'Available';
  const tags = rawProject.tags?.map((t: any) => t.code) || [];
  if (tags.includes('sold_out')) {
    availability = 'Sold Out';
  } else if (tags.includes('coming_soon') || tags.includes('prelaunch') || tags.includes('s: announced')) {
    availability = 'Coming Soon';
  }

  const bedrooms = rawProject.stats?.bedrooms?.map((b: any) => b.count) || [];
  const minBed = bedrooms.length > 0 ? Math.min(...bedrooms) : 0;
  const maxBed = bedrooms.length > 0 ? Math.max(...bedrooms) : 0;
  
  const areaMin = rawProject.stats?.areaRange?.min?.value;
  const areaMax = rawProject.stats?.areaRange?.max?.value;
  let areaLabel = 'N/A';
  if (areaMin && areaMax) {
      areaLabel = `${Math.round(areaMin)} - ${Math.round(areaMax)} sqft`;
  } else if (areaMin) {
      areaLabel = `${Math.round(areaMin)}+ sqft`;
  }

  return {
    id: rawProject.urlPathSegment || rawProject.name.toLowerCase().replace(/\s+/g, '-'),
    name: rawProject.name,
    developer: rawProject.developer?.name || 'Unknown Developer',
    location: {
      city: rawProject.agglomeration?.name || 'Unknown City',
      area: rawProject.agglomerationArea?.name || '',
      mapQuery: `${rawProject.name}, ${rawProject.agglomeration?.name}`,
    },
    handover: rawProject.handover,
    description: {
      short: `A premier development named ${rawProject.name}.`,
      full: `Discover ${rawProject.name}, a leading project offering unique living experiences. With its modern design and strategic location, it represents a prime investment opportunity.`
    },
    features: rawProject.tags?.map((t: any) => t.name) || [],
    price: {
      from: priceFrom,
      label: priceLabel,
    },
    availability,
    images: rawProject.marketing?.mainImageUrl ? [rawProject.marketing.mainImageUrl] : ['https://picsum.photos/seed/1/800/600'],
    bedrooms: { min: minBed, max: maxBed, label: bedrooms.length > 1 ? `${minBed}-${maxBed}` : `${minBed}` },
    areaSqft: {
      min: areaMin || 0,
      max: areaMax || 0,
      label: areaLabel
    },
    tags: tags,
    publicUrl: rawProject.publicUrl,
    unitsStockUpdatedAt: rawProject.unitsStockUpdatedAt,
  };
};

export function useRealisteProjects(initialFilter: ProjectFilter = {}) {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentFilter, setCurrentFilter] = useState(initialFilter);

  const fetchAndTransform = useCallback(async (filter: ProjectFilter) => {
    setLoading(true);
    setError(null);
    try {
      const graphqlFilter: any = {};
      if (filter.developer) graphqlFilter.developerName = { like: filter.developer };
      if (filter.availability) {
        if (filter.availability === "Available") graphqlFilter.tags = ["on_sale"];
        else if (filter.availability === "Sold Out") graphqlFilter.tags = ["sold_out"];
        else if (filter.availability === "Coming Soon") graphqlFilter.tags = ["coming_soon", "prelaunch"];
      }
      
      const rawData = await fetchRealisteProjects(filter.city || 'dubai', graphqlFilter);
      const transformedData = rawData.map(transformProjectData);
      
      let filteredProjects = transformedData;
      if (filter.query) {
          const q = filter.query.toLowerCase();
          filteredProjects = filteredProjects.filter(p => p.name.toLowerCase().includes(q));
      }

      setProjects(filteredProjects);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An unknown error occurred."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndTransform(currentFilter);
  }, [fetchAndTransform]);
  
  const search = (newFilter: ProjectFilter) => {
    setCurrentFilter(newFilter);
    debouncedFetch(newFilter);
  }

  const debouncedFetch = useCallback(
    debounce((filter) => fetchAndTransform(filter), 300),
    [fetchAndTransform]
  );

  return { projects, loading, error, search, currentFilter, setCurrentFilter };
}
