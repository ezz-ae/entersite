import type { ProjectData } from '@/lib/types';

export const sharjahProjects: ProjectData[] = [
  {
    id: "ayat-tower",
    name: "Ayat Tower",
    developer: "Ayat Development",
    location: {
      city: "Sharjah",
      area: "Al Nahda",
      mapQuery: "Ayat Tower, Al Nahda, Sharjah, United Arab Emirates"
    },
    launchYear: 2024,
    deliveryYear: 2026,
    description: {
      full: "Ayat Tower in Al Nahda, Sharjah, combines intelligent architecture with contemporary interiors. It offers a range of residential options designed for comfort and practicality, with easy access to Dubai and key landmarks in Sharjah.",
      short: "Contemporary living in the connected Al Nahda district."
    },
    features: [
      "Gymnasium", 
      "Swimming Pool", 
      "Covered Parking", 
      "24/7 Security", 
      "Retail Shops"
    ],
    price: {
      from: 879000,
      label: "AED 879K"
    },
    availability: "Available",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000"
    ]
  },
  {
    id: "sharjah-garden-city",
    name: "Sharjah Garden City Villas",
    developer: "Shurooq",
    location: {
      city: "Sharjah",
      area: "Sharjah Garden City",
      mapQuery: "Sharjah Garden City, Sharjah, United Arab Emirates"
    },
    launchYear: 2023,
    deliveryYear: 2025,
    description: {
      full: "Sharjah Garden City offers a unique gated community experience with spacious villas set amidst lush greenery. Designed for families, it provides a safe, serene, and sustainable environment with large plots and modern amenities.",
      short: "Spacious family villas in a green, gated community."
    },
    features: [
      "Gated Community", 
      "Large Plots", 
      "Mosque", 
      "Community Mall", 
      "Parks"
    ],
    price: {
      from: 1900000,
      label: "AED 1.9M"
    },
    availability: "Available",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000"
    ]
  }
];
