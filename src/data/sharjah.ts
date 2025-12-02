import type { ProjectData } from '@/lib/types';

export const sharjahProjects: ProjectData[] = [
    {
        "id": "ayat-tower",
        "name": "Ayat Tower",
        "developer": "Combining Intelligent Architecture With Contemporary Interiors",
        "location": {
          "city": "Sharjah",
          "area": "Al Nahda Sharjah",
          "mapQuery": "Ayat Tower, Al Nahda Sharjah, Sharjah, United Arab Emirates"
        },
        "launchYear": 2024,
        "deliveryYear": 2025,
        "description": {
          "full": "Ayat Tower in Al Nahda, Sharjah, is a modern residential building that combines intelligent architecture with contemporary interiors. It offers residents a comfortable and stylish living environment with a range of amenities.",
          "short": "Modern residential building in Al Nahda, Sharjah with contemporary interiors."
        },
        "features": ["Swimming Pool", "Gymnasium", "Covered Parking", "Retail on Ground Floor"],
        "price": {
          "from": 879000,
          "label": "AED 879.0K"
        },
        "availability": "Available",
        "images": ["https://picsum.photos/seed/155/800/600"]
      }
];
