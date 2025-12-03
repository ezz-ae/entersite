import type { ProjectData } from '@/lib/types';

export const abuDhabiProjects: ProjectData[] = [
  {
    id: "yas-living",
    name: "Yas Living",
    developer: "Unknown Developer",
    location: {
      city: "Abu Dhabi",
      area: "Yas Island",
      mapQuery: "Yas Living, Yas Island, Abu Dhabi, United Arab Emirates"
    },
    launchYear: 2024,
    deliveryYear: 2026,
    description: {
      full: "Yas Living brings the excitement of Yas Island to your doorstep. Located in the heart of Abu Dhabi's entertainment hub, this residential community offers modern apartments with easy access to theme parks, shopping malls, and pristine beaches.",
      short: "Modern living in the heart of Abu Dhabi's entertainment hub."
    },
    features: [
      "Access to Theme Parks", 
      "Beach Club Access", 
      "Community Pool", 
      "Retail & Dining", 
      "Cycling Tracks"
    ],
    price: {
      from: 2813000,
      label: "AED 2.8M"
    },
    availability: "Available",
    images: [
      "https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1512453979798-5ea904ac66de?auto=format&fit=crop&q=80&w=1000"
    ]
  },
  {
    id: "four-seasons-private-residences",
    name: "Four Seasons Private Residences",
    developer: "Four Seasons Hotels & Resorts",
    location: {
      city: "Abu Dhabi",
      area: "Saadiyat Island",
      mapQuery: "Four Seasons Private Residences, Saadiyat Island, Abu Dhabi, United Arab Emirates"
    },
    launchYear: 2023,
    deliveryYear: 2025,
    description: {
      full: "The Four Seasons Private Residences on Saadiyat Island offer an unparalleled lifestyle of luxury and service. Set against the backdrop of white sandy beaches and turquoise waters, these homes provide exclusive access to world-class amenities and the renowned hospitality of Four Seasons.",
      short: "Ultra-luxury branded residences on Saadiyat Island."
    },
    features: [
      "Private Beach", 
      "24/7 Concierge", 
      "Luxury Spa", 
      "Fine Dining", 
      "Valet Parking"
    ],
    price: {
      from: 4780000,
      label: "AED 4.8M"
    },
    availability: "Available",
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1000"
    ]
  },
  {
    id: "marbella-villas",
    name: "Marbella Villas",
    developer: "Bloom Holding",
    location: {
      city: "Abu Dhabi",
      area: "Bloom Living",
      mapQuery: "Marbella Villas, Bloom Living, Abu Dhabi, United Arab Emirates"
    },
    launchYear: 2024,
    deliveryYear: 2026,
    description: {
      full: "Inspired by the charm of southern Spain, Marbella Villas in Bloom Living offers a unique lifestyle community. These spacious villas feature Mediterranean architecture, lush gardens, and a family-friendly environment with excellent schools and parks nearby.",
      short: "Mediterranean-inspired villas in a family-friendly community."
    },
    features: [
      "Gated Community", 
      "Clubhouse", 
      "International Schools", 
      "Parks & Gardens", 
      "Retail Centre"
    ],
    price: {
      from: 7900000,
      label: "AED 7.9M"
    },
    availability: "Available",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000"
    ]
  }
];
