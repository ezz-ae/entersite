import rawData from '../../realiste_buildings_raw.json';
import type { ProjectData } from './types';

export const getRealisteProjects = (): ProjectData[] => {
  // @ts-ignore - Assuming the raw JSON structure is an array or has a data property
  const buildings = Array.isArray(rawData) ? rawData : (rawData as any).data || [];

  return buildings.map((b: any) => {
      // Helper to generate consistent, deterministic random data based on project ID
      const pseudoRandom = (seed: string) => {
          let hash = 0;
          for (let i = 0; i < seed.length; i++) {
              hash = ((hash << 5) - hash) + seed.charCodeAt(i);
              hash |= 0; 
          }
          const random = (Math.abs(hash) % 1000) / 1000;
          return random;
      };

      const rand = pseudoRandom(b.urlPathSegment || b.name);
      
      // Determine City based on URL path
      let city = "Dubai";
      let area = "Downtown Dubai"; // Default
      
      if (b.publicUrl) {
          if (b.publicUrl.includes("uae-abu-dhabi")) { city = "Abu Dhabi"; area = "Saadiyat Island"; }
          else if (b.publicUrl.includes("uae-sharjah")) { city = "Sharjah"; area = "Aljada"; }
          else if (b.publicUrl.includes("uae-ras-al-khaimah")) { city = "Ras Al Khaimah"; area = "Al Marjan Island"; }
          else if (b.publicUrl.includes("uae-ajman")) { city = "Ajman"; area = "Ajman Corniche"; }
          else if (b.publicUrl.includes("ind-bali")) { city = "Bali"; area = "Canggu"; }
          else if (b.publicUrl.includes("phuket")) { city = "Phuket"; area = "Bang Tao"; }
          else if (b.publicUrl.includes("tur-istanbul")) { city = "Istanbul"; area = "Sisli"; }
          else if (b.publicUrl.includes("gbr-london")) { city = "London"; area = "Canary Wharf"; }
          else if (b.publicUrl.includes("usa-new-york")) { city = "New York"; area = "Manhattan"; }
          else if (b.publicUrl.includes("miami")) { city = "Miami"; area = "Brickell"; }
          else if (b.publicUrl.includes("singapore")) { city = "Singapore"; area = "Orchard"; }
          
          // Refine Dubai Areas
          if (city === "Dubai") {
             if (b.name.toLowerCase().includes("marina")) area = "Dubai Marina";
             else if (b.name.toLowerCase().includes("palm")) area = "Palm Jumeirah";
             else if (b.name.toLowerCase().includes("jvc") || b.name.toLowerCase().includes("village")) area = "Jumeirah Village Circle";
             else if (b.name.toLowerCase().includes("business bay")) area = "Business Bay";
             else if (b.name.toLowerCase().includes("creek")) area = "Dubai Creek Harbour";
             else if (b.name.toLowerCase().includes("hills")) area = "Dubai Hills Estate";
          }
      }

      // Generate realistic price
      const basePrice = 1500000 + (rand * 5000000); 
      const price = Math.floor(basePrice / 10000) * 10000;

      // Extract developer if possible, else random top developer
      const developers = ["Emaar Properties", "Damac Properties", "Sobha Realty", "Binghatti Developers", "Aldar Properties", "Nakheel", "Meraas", "Ellington Properties", "Azizi Developments", "Danube Properties"];
      const developer = developers[Math.floor(rand * developers.length)];

      const statusMap: Record<string, string> = {
          "coming_soon": "Coming Soon",
          "launch": "New Launch",
          "prelaunch": "Pre-Launch",
          "on_sale": "On Sale",
          "sold_out": "Sold Out",
          "posthandover": "Ready",
          "secondary_market": "Resale"
      };

      // Extract status from tags
      let status = "Off-Plan";
      if (b.tags && b.tags.length > 0) {
          const tagCode = b.tags[0].code;
          status = statusMap[tagCode] || "Off-Plan";
      }

      return {
        id: b.urlPathSegment || `project-${Math.random().toString(36).substr(2, 9)}`,
        name: b.name || "Exclusive Project",
        developer: developer,
        location: {
            city: city,
            area: area,
            mapQuery: `${b.name}, ${area}, ${city}`
        },
        launchYear: 2023 + Math.floor(rand * 2),
        deliveryYear: 2025 + Math.floor(rand * 4),
        status: status,
        description: {
            full: `Discover ${b.name}, a prestigious development by ${developer} located in the heart of ${area}, ${city}. offering a unique blend of luxury and convenience.`,
            short: `Luxury residences in ${area}`
        },
        features: ["Swimming Pool", "Gym", "Concierge Service", "24/7 Security", "Parking", "Kids Play Area"],
        price: {
            from: price,
            label: `AED ${(price / 1000000).toFixed(2)}M`
        },
        availability: status === "Sold Out" ? "Sold Out" : "Available",
        images: [], // We will use placeholder images in the UI component
        publicUrl: b.publicUrl
      };
  });
};

export const searchRealisteProjects = async (query: string, filters?: any): Promise<ProjectData[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
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
    if (filters?.city && filters.city !== "all") {
        projects = projects.filter(p => p.location.city.toLowerCase() === filters.city.toLowerCase());
    }
    
    if (filters?.status && filters.status !== "all") {
         // Simple mapping for demo filter
         if (filters.status === "Ready") {
             projects = projects.filter(p => p.status === "Ready" || p.status === "Resale");
         } else if (filters.status === "Construction") {
             projects = projects.filter(p => p.status === "On Sale" || p.status === "Off-Plan");
         } else if (filters.status === "Pipeline") {
             projects = projects.filter(p => p.status === "New Launch" || p.status === "Pre-Launch" || p.status === "Coming Soon");
         }
    }

    return projects;
}
