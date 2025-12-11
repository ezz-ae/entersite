import rawData from '../../realiste_buildings_raw.json';
import type { ProjectData } from './types';

// Define the shape of the raw Realiste data based on inspection
// (Simplified based on standard real estate data structures)
interface RawBuilding {
  id: string;
  name: string;
  developer?: { name: string };
  region?: { name: string; city?: { name: string } };
  completion_date?: string;
  price_min?: number;
  currency?: string;
  photos?: string[];
  location?: { lat: number; lng: number };
  // Add other fields as discovered in the JSON
}

// Map raw data to our internal ProjectData interface
export const getRealisteProjects = (): ProjectData[] => {
  // @ts-ignore - Assuming the raw JSON structure is an array or has a data property
  const buildings = Array.isArray(rawData) ? rawData : (rawData as any).data || [];

  return buildings.map((b: any) => ({
    id: b.id || `realiste-${Math.random().toString(36).substr(2, 9)}`,
    name: b.name || "Unnamed Project",
    developer: b.developer?.name || "Unknown Developer",
    location: {
      city: b.region?.city?.name || "Dubai", // Default to Dubai if missing
      area: b.region?.name || "Unknown Area",
      mapQuery: `${b.name}, ${b.region?.name}, Dubai`
    },
    launchYear: new Date().getFullYear(), // Fallback
    deliveryYear: b.completion_date ? new Date(b.completion_date).getFullYear() : 2026,
    description: {
      full: `Experience luxury living at ${b.name} by ${b.developer?.name}. Located in ${b.region?.name}, this project offers exceptional value and modern amenities.`,
      short: `${b.name} in ${b.region?.name}`
    },
    features: [" luxury finishes", "modern design", "prime location"], // Generic if missing
    price: {
      from: b.price_min || 0,
      label: b.price_min ? `AED ${(b.price_min / 1000000).toFixed(1)}M` : "Price on Request"
    },
    availability: "Available",
    images: b.photos && b.photos.length > 0 ? b.photos : [],
    // Custom Realiste Fields (we can extend ProjectData type later)
    coordinates: b.location ? { lat: b.location.lat, lng: b.location.lng } : undefined
  }));
};

export const searchRealisteProjects = async (query: string, filters?: any): Promise<ProjectData[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let projects = getRealisteProjects();
    
    if (query) {
        const q = query.toLowerCase();
        projects = projects.filter(p => 
            p.name.toLowerCase().includes(q) || 
            p.developer.toLowerCase().includes(q) ||
            p.location.area.toLowerCase().includes(q)
        );
    }
    
    // Apply filters
    if (filters?.city) {
        projects = projects.filter(p => p.location.city.toLowerCase() === filters.city.toLowerCase());
    }
    
    return projects;
}
