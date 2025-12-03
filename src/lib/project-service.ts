import { allProjects } from './projects';
import type { ProjectData } from './types';

// In a real ecosystem, this would call an API endpoint or query Firestore directly
// endpoint: https://api.entrestate.com/v1/projects/search

export interface ProjectFilter {
  city?: string;
  developer?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  status?: 'Off-Plan' | 'Ready' | 'Resale';
}

export const searchProjects = async (query: string, filters?: ProjectFilter): Promise<ProjectData[]> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 300));

  let results = allProjects;

  // 1. Text Search (Name, Area, Developer)
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.developer.toLowerCase().includes(q) ||
      p.location.area.toLowerCase().includes(q) ||
      p.location.city.toLowerCase().includes(q)
    );
  }

  // 2. Apply Filters
  if (filters) {
    if (filters.city) {
      results = results.filter(p => p.location.city.toLowerCase() === filters.city?.toLowerCase());
    }
    if (filters.developer) {
      results = results.filter(p => p.developer.toLowerCase().includes(filters.developer!.toLowerCase()));
    }
    if (filters.minPrice) {
      results = results.filter(p => p.price.from >= filters.minPrice!);
    }
    if (filters.maxPrice) {
        // Note: Our current mock data only has 'from' price. In real app, we'd check range.
        results = results.filter(p => p.price.from <= filters.maxPrice!);
    }
    // Add more filter logic as data structure evolves
  }

  return results;
};

export const getDevelopers = async (): Promise<string[]> => {
    // Extract unique developers from the dataset
    const developers = Array.from(new Set(allProjects.map(p => p.developer)));
    return developers.sort();
}

export const getLocations = async (): Promise<{city: string, areas: string[]}[]> => {
    // Group areas by city
    const locationMap = new Map<string, Set<string>>();
    
    allProjects.forEach(p => {
        if (!locationMap.has(p.location.city)) {
            locationMap.set(p.location.city, new Set());
        }
        locationMap.get(p.location.city)?.add(p.location.area);
    });

    return Array.from(locationMap.entries()).map(([city, areas]) => ({
        city,
        areas: Array.from(areas).sort()
    }));
}
