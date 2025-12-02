import type { SitePage } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { dubaiProjects } from '@/data/dubai';

export const mockProjects = dubaiProjects.slice(0,4).map(p => ({
    ...p,
    id: p.id,
    title: p.name,
    price: p.price.from,
    currency: "AED",
    address: { street: p.location.area, lat: 0, lng: 0 },
    features: { beds: 3, baths: 2, area: 1800, type: "apartment" },
    images: p.images,
    brochureUrl: "",
    marketScore: 88,
    source: 'manual',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
}))

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
        projects: dubaiProjects.slice(0, 3).map(p => ({...p, priceLabel: p.price.label })),
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
