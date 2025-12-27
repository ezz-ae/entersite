import rawData from '../../realiste_buildings_raw.json';
import type { ProjectData, ProjectFilter } from './types';

export const getRealisteProjects = (): ProjectData[] => {
  const buildings = Array.isArray(rawData) ? rawData : (rawData as any).data || [];

  return buildings.map((b: any) => {
      const pseudoRandom = (seed: string) => {
          let hash = 0;
          for (let i = 0; i < seed.length; i++) {
              hash = ((hash << 5) - hash) + seed.charCodeAt(i);
              hash |= 0; 
          }
          const random = (Math.abs(hash) % 1000) / 1000;
          return random;
      };

      const rand = pseudoRandom(b.urlPathSegment || b.name || Math.random().toString());
      
      let city = "Dubai";
      let area = "Downtown Dubai"; 
      
      if (b.publicUrl) {
          const url = b.publicUrl.toLowerCase();
          if (url.includes("uae-abu-dhabi")) { city = "Abu Dhabi"; area = "Saadiyat Island"; }
          else if (url.includes("uae-sharjah")) { city = "Sharjah"; area = "Aljada"; }
          else if (url.includes("uae-ras-al-khaimah")) { city = "Ras Al Khaimah"; area = "Al Marjan Island"; }
          else if (url.includes("uae-ajman")) { city = "Ajman"; area = "Ajman Corniche"; }
          else if (url.includes("umm-al-quwain")) { city = "Umm Al Quwain"; area = "Siniyah Island"; }
          else if (url.includes("ind-bali")) { city = "Bali"; area = "Canggu"; }
          else if (url.includes("phuket")) { city = "Phuket"; area = "Bang Tao"; }
          else if (url.includes("tur-istanbul")) { city = "Istanbul"; area = "Sisli"; }
          else if (url.includes("gbr-london")) { city = "London"; area = "Canary Wharf"; }
          else if (url.includes("usa-new-york")) { city = "New York"; area = "Manhattan"; }
          else if (url.includes("miami")) { city = "Miami"; area = "Brickell"; }
          else if (url.includes("singapore")) { city = "Singapore"; area = "Orchard"; }
          
          if (city === "Dubai") {
             if (b.name?.toLowerCase().includes("marina")) area = "Dubai Marina";
             else if (b.name?.toLowerCase().includes("palm")) area = "Palm Jumeirah";
             else if (b.name?.toLowerCase().includes("jvc") || b.name?.toLowerCase().includes("village")) area = "Jumeirah Village Circle";
             else if (b.name?.toLowerCase().includes("business bay")) area = "Business Bay";
             else if (b.name?.toLowerCase().includes("creek")) area = "Dubai Creek Harbour";
             else if (b.name?.toLowerCase().includes("hills")) area = "Dubai Hills Estate";
          }
      }

      const basePrice = 1500000 + (rand * 5000000); 
      const price = Math.floor(basePrice / 10000) * 10000;

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

      let status = "Off-Plan";
      if (b.tags && b.tags.length > 0) {
          const tagCode = b.tags[0].code;
          status = statusMap[tagCode] || "Off-Plan";
      }

      // Generate realistic ROI and Trends
      const roi = 6 + (rand * 4); // 6% to 10%
      const appreciation = 8 + (rand * 15); // 8% to 23%
      const trend: 'up' | 'stable' | 'down' = rand > 0.2 ? 'up' : 'stable';

      return {
        id: b.urlPathSegment || `project-${Math.random().toString(36).substr(2, 9)}`,
        name: b.name || "Exclusive Project",
        developer: developer,
        location: {
            city: city,
            area: area,
            mapQuery: `${b.name}, ${area}, ${city}`
        },
        handover: {
            quarter: Math.floor(rand * 4) + 1,
            year: 2025 + Math.floor(rand * 4)
        },
        deliveryYear: 2025 + Math.floor(rand * 4),
        status: status,
        description: {
            full: `Discover ${b.name}, a prestigious development by ${developer} located in the heart of ${area}, ${city}. Offering a unique blend of luxury and convenience.`,
            short: `Luxury residences in ${area}`
        },
        features: ["Swimming Pool", "Gym", "Concierge Service", "24/7 Security", "Parking", "Kids Play Area"],
        price: {
            from: price,
            label: `AED ${(price / 1000000).toFixed(2)}M`,
            sqftAvg: 1800 + (rand * 1200)
        },
        performance: {
            roi: parseFloat(roi.toFixed(1)),
            capitalAppreciation: parseFloat(appreciation.toFixed(1)),
            rentalYield: parseFloat((roi - 1.5).toFixed(1)),
            marketTrend: trend,
            priceHistory: [
                { year: 2022, avgPrice: price * 0.8 },
                { year: 2023, avgPrice: price * 0.9 },
                { year: 2024, avgPrice: price }
            ]
        },
        availability: status === "Sold Out" ? "Sold Out" : "Available",
        images: b.images || ["https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/U10759_EXT_ZED739.webp?alt=media&token=be7418eb-0f7f-4df3-8c89-8fa5b070a7aa"],
        publicUrl: b.publicUrl
      };
  });
};

export const searchRealisteProjects = async (query: string, filters?: ProjectFilter): Promise<ProjectData[]> => {
    let results = getRealisteProjects();

    if (query) {
        const q = query.toLowerCase();
        results = results.filter(p => 
            p.name.toLowerCase().includes(q) || 
            p.developer.toLowerCase().includes(q) ||
            p.location.area.toLowerCase().includes(q) ||
            p.location.city.toLowerCase().includes(q)
        );
    }

    if (filters) {
        if (filters.city && filters.city !== 'all') {
            results = results.filter(p => p.location.city.toLowerCase() === filters.city?.toLowerCase());
        }
        if (filters.developer) {
            results = results.filter(p => p.developer.toLowerCase().includes(filters.developer!.toLowerCase()));
        }
        if (filters.minPrice) {
            results = results.filter(p => p.price.from >= filters.minPrice!);
        }
        if (filters.maxPrice) {
            results = results.filter(p => p.price.from <= filters.maxPrice!);
        }
        if (filters.availability) {
            results = results.filter(p => p.availability === filters.availability);
        }
    }

    return results;
};
