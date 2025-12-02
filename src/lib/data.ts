import type { Project, SitePage } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const propertyImage1 = PlaceHolderImages.find(img => img.id === 'property-1')?.imageUrl || '';
const propertyImage2 = PlaceHolderImages.find(img => img.id === 'property-2')?.imageUrl || '';
const propertyImage3 = PlaceHolderImages.find(img => img.id === 'property-3')?.imageUrl || '';
const propertyImage4 = PlaceHolderImages.find(img => img.id === 'property-4')?.imageUrl || '';

export const mockProjects: Project[] = [
  {
    id: 'proj-001',
    title: "Azure Residences",
    developer: "Prestige Group",
    city: "Dubai",
    price: 3500000,
    currency: "AED",
    address: { street: "Palm Jumeirah", lat: 25.11, lng: 55.13 },
    features: { beds: 3, baths: 4, area: 2100, type: "apartment" },
    images: [propertyImage1, propertyImage2, propertyImage3],
    brochureUrl: "",
    marketScore: 85,
    source: "propertyfinder",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-002',
    title: "Emerald Hills",
    developer: "Emaar Properties",
    city: "Dubai",
    price: 7800000,
    currency: "AED",
    address: { street: "Dubai Hills Estate", lat: 25.11, lng: 55.22 },
    features: { beds: 5, baths: 6, area: 5500, type: "villa" },
    images: [propertyImage2, propertyImage4, propertyImage1],
    brochureUrl: "",
    marketScore: 92,
    source: "bayut",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-003',
    title: "Creek Waters",
    developer: "Nakheel",
    city: "Dubai",
    price: 2100000,
    currency: "AED",
    address: { street: "Dubai Creek Harbour", lat: 25.21, lng: 55.35 },
    features: { beds: 2, baths: 2, area: 1200, type: "apartment" },
    images: [propertyImage3, propertyImage1, propertyImage4],
    brochureUrl: "",
    marketScore: 88,
    source: "dubizzle",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-004',
    title: "The Valley",
    developer: "Emaar Properties",
    city: "Dubai",
    price: 4500000,
    currency: "AED",
    address: { street: "Dubai-Al Ain Road", lat: 25.02, lng: 55.40 },
    features: { beds: 4, baths: 5, area: 3800, type: "townhouse" },
    images: [propertyImage4, propertyImage2, propertyImage3],
    brochureUrl: "",
    marketScore: 90,
    source: "manual",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const mockPage: SitePage = {
  id: "page-01",
  title: "Luxury Homes Dubai Launch",
  blocks: [
    {
      blockId: "hero-01",
      type: "hero",
      order: 1,
      data: {
        headline: "Discover Unparalleled Luxury in the Heart of Dubai",
        subtext: "Explore our exclusive collection of premium properties, crafted for the discerning.",
        ctaText: "Explore Properties",
      },
    },
    {
      blockId: "listing-grid-07",
      type: "listing-grid",
      order: 2,
      data: {
        headline: "Featured Properties",
        subtext: "Handpicked listings that define luxury living.",
        projects: mockProjects.slice(0, 3),
      },
    },
    {
      blockId: "cta-form-02",
      type: "cta-form",
      order: 3,
      data: {
        headline: "Schedule a Private Viewing",
        subtext: "Our experts are ready to assist you. Fill out the form and we'll be in touch.",
      },
    },
  ],
  canonicalListings: ["proj-001", "proj-002", "proj-003"],
  brochureUrl: "",
  seo: {
    title: "Luxury Homes Dubai | Exclusive Real Estate",
    description: "Find the finest luxury properties in Dubai. Explore exclusive apartments, villas, and townhouses from top developers.",
    keywords: ["luxury homes dubai", "real estate dubai", "emaar properties", "dubai hills"],
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
