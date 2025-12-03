import type { ProjectData } from '@/lib/types';

export const rasAlKhaimahProjects: ProjectData[] = [
  {
    id: "palazzo-tissoli",
    name: "Palazzo Tissoli",
    developer: "Unknown Developer",
    location: {
      city: "Ras Al Khaimah",
      area: "Al Marjan Island",
      mapQuery: "Palazzo Tissoli, Al Marjan Island, Ras Al Khaimah, United Arab Emirates"
    },
    launchYear: 2024,
    deliveryYear: 2027,
    description: {
      full: "Palazzo Tissoli on Al Marjan Island is a tribute to Italian elegance. This beachfront development offers luxurious residences with direct access to the sea, surrounded by five-star hotels and world-class entertainment options.",
      short: "Italian-inspired luxury on Al Marjan Island."
    },
    features: [
      "Private Beach Access", 
      "Infinity Pool", 
      "Italian Restaurant", 
      "Spa & Wellness", 
      "Water Sports"
    ],
    price: {
      from: 1500000,
      label: "AED 1.5M"
    },
    availability: "Available",
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&q=80&w=1000"
    ]
  },
  {
    id: "la-perla",
    name: "La Perla",
    developer: "The Sea",
    location: {
      city: "Ras Al Khaimah",
      area: "Al Marjan Island",
      mapQuery: "La Perla, Al Marjan Island, Ras Al Khaimah, United Arab Emirates"
    },
    launchYear: 2024,
    deliveryYear: 2026,
    description: {
      full: "La Perla brings the essence of pearl diving heritage to modern luxury living. Located on the pristine shores of Al Marjan Island, these residences offer stunning ocean views and a serene, resort-like atmosphere.",
      short: "Heritage-inspired beachfront living on Al Marjan Island."
    },
    features: [
      "Sea Views", 
      "Beach Club", 
      "Rooftop Terrace", 
      "Gym & Sauna", 
      "Kids Pool"
    ],
    price: {
      from: 3165000,
      label: "AED 3.2M"
    },
    availability: "Available",
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1000"
    ]
  }
];
