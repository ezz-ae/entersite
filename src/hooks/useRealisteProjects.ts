
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

  // Determine availability from tags
  let availability: ProjectData['availability'] = 'Available';
  if (rawProject.tags?.some((t: any) => t.code === 'sold_out')) {
    availability = 'Sold Out';
  } else if (rawProject.tags?.some((t: any) => t.code === 'coming_soon' || t.code === 'prelaunch' || t.code.includes('announced'))) {
    availability = 'Coming Soon';
  }
  
  const bedrooms = rawProject.stats?.bedrooms?.map((b: any) => b.count) || [];
  const minBed = bedrooms.length > 0 ? Math.min(...bedrooms) : 0;
  const maxBed = bedrooms.length > 0 ? Math.max(...bedrooms) : 0;

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
      full: `Discover ${rawProject.name}, a leading project offering unique living experiences in ${rawProject.agglomeration?.name}. With its modern design and strategic location, it represents a prime investment opportunity.`
    },
    features: rawProject.tags?.map((t: any) => t.name) || [],
    price: {
      from: priceFrom,
      label: priceLabel,
    },
    availability,
    images: rawProject.marketing?.mainImageUrl ? [rawProject.marketing.mainImageUrl] : [],
    bedrooms: { min: minBed, max: maxBed },
    areaSqft: {
      min: rawProject.stats?.areaRange?.min?.value || 0,
      max: rawProject.stats?.areaRange?.max?.value || 0,
    },
    tags: rawProject.tags?.map((t:any) => t.code),
    publicUrl: rawProject.publicUrl,
    unitsStockUpdatedAt: rawProject.unitsStockUpdatedAt,
  };
};


export function useRealisteProjects(initialFilter: ProjectFilter = {}) {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAndTransform = useCallback(async (filter: ProjectFilter) => {
    setLoading(true);
    setError(null);
    try {
      const graphqlFilter: any = {};
      if (filter.developer) graphqlFilter.developerName = filter.developer;
      if (filter.city) {
          // Find the country code from the city name if needed, assuming one country for now
          const agglomerationCode = filter.city.toLowerCase().replace(/\s+/g, '-');
          graphqlFilter.agglomerationCodes = [`uae-${agglomerationCode}`];
      }
       if (filter.availability) {
        if(filter.availability === "Available") {
          graphqlFilter.tags = ["on_sale"];
        } else if (filter.availability === "Sold Out") {
          graphqlFilter.tags = ["sold_out"];
        } else if (filter.availability === "Coming Soon") {
            graphqlFilter.tags = ["coming_soon", "prelaunch"];
        }
      }
      
      const rawData = await fetchRealisteProjects(graphqlFilter);
      const transformedData = rawData.map(transformProjectData);
      setProjects(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An unknown error occurred."));
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchAndTransform(initialFilter);
  }, []);

  const debouncedFetch = useCallback(
    debounce((newFilter: ProjectFilter) => {
        fetchAndTransform(newFilter);
    }, 500),
    [fetchAndTransform]
  );
  
  const search = (newFilter: ProjectFilter) => {
    debouncedFetch(newFilter);
  }

  return { projects, loading, error, search };
}
