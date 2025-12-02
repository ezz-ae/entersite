import type { ProjectData } from '@/lib/types';

export const rasAlKhaimahProjects: ProjectData[] = [
    {
        "id": "la-perla",
        "name": "La Perla",
        "developer": "The Sea",
        "location": {
          "city": "Ras Al Khaimah",
          "area": "Al Marjan Island",
          "mapQuery": "La Perla, Al Marjan Island, Ras Al Khaimah, United Arab Emirates"
        },
        "launchYear": 2024,
        "deliveryYear": 2025,
        "description": {
          "full": "La Perla is a luxurious waterfront development on Al Marjan Island, Ras Al Khaimah. It offers stunning sea views, premium amenities, and a serene lifestyle, making it a perfect coastal retreat.",
          "short": "Luxurious waterfront development on Al Marjan Island."
        },
        "features": ["Private Beach", "Infinity Pool", "Sea Views", "Water Sports Facilities"],
        "price": {
          "from": 3165450,
          "label": "AED 3.2M"
        },
        "availability": "Available",
        "images": ["https://picsum.photos/seed/126/800/600"]
      }
];
