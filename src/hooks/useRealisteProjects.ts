'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ProjectData, ProjectFilter } from '@/lib/types';
import { fetchRealisteProjects } from '@/lib/graphql-service';
import { debounce } from 'lodash';

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
      
      const transformedData: ProjectData[] = rawData.map((rawProject: any) => {
        const priceFrom = rawProject.stats?.priceRange?.min?.value || 0;
        const currency = rawProject.stats?.priceRange?.min?.currency || 'AED';
        const priceLabel = priceFrom 
          ? `${currency} ${priceFrom.toLocaleString('en-US', { notation: 'compact', compactDisplay: 'short' })}`
          : 'POA';

        let availability: 'Available' | 'Sold Out' | 'Coming Soon' = 'Available';
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

        const project: ProjectData = {
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
          performance: {
              roi: 7.5,
              capitalAppreciation: 12,
              rentalYield: 6.5,
              marketTrend: 'up',
              priceHistory: [
                  { year: 2022, avgPrice: priceFrom * 0.8 },
                  { year: 2023, avgPrice: priceFrom * 0.9 },
                  { year: 2024, avgPrice: priceFrom }
              ]
          },
          availability,
          images: rawProject.marketing?.mainImageUrl ? [rawProject.marketing.mainImageUrl] : ['https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/U10759_EXT_ZED739.webp?alt=media&token=be7418eb-0f7f-4df3-8c89-8fa5b070a7aa'],
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
        return project;
      });
      
      let filteredProjects = transformedData;
      const query = (filter as any).query;
      if (query) {
          const q = query.toLowerCase();
          filteredProjects = filteredProjects.filter((p: ProjectData) => p.name.toLowerCase().includes(q));
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
  }, [fetchAndTransform, currentFilter]);
  
  const search = (newFilter: ProjectFilter) => {
    setCurrentFilter(newFilter);
    debouncedFetch(newFilter);
  };

  const debouncedFetch = useCallback(
    debounce((filter) => fetchAndTransform(filter), 300),
    [fetchAndTransform]
  );

  return { projects, loading, error, search, currentFilter, setCurrentFilter };
}
