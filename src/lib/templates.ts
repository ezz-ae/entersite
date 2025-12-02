import type { SitePage, Block } from './types';
import { mockProjects } from './data';

export interface SiteTemplate {
  id: string;
  name: string;
  siteType: 'developer-launch' | 'roadshow' | 'partner-launch' | 'company' | 'freelancer' | 'map';
  pages: SitePage[];
}

const defaultBlocks: Record<string, Omit<Block, 'blockId' | 'order'>> = {
  hero: {
    type: 'hero',
    data: {
      headline: "Discover Unparalleled Luxury in the Heart of Dubai",
      subtext: "Explore our exclusive collection of premium properties, crafted for the discerning.",
      ctaText: "Explore Properties",
    },
  },
  listingGrid: {
    type: 'listing-grid',
    data: {
      headline: "Featured Properties",
      subtext: "Handpicked listings that define luxury living.",
      projects: mockProjects.slice(0, 3),
    },
  },
  ctaForm: {
    type: 'cta-form',
    data: {
      headline: "Schedule a Private Viewing",
      subtext: "Our experts are ready to assist you. Fill out the form and we'll be in touch.",
    },
  }
};

const createBlock = (type: string, order: number): Block => {
    const blockData = defaultBlocks[type] || defaultBlocks['hero'];
    return {
        blockId: `${blockData.type}-${Date.now()}-${Math.random()}`,
        type: blockData.type,
        order: order,
        data: blockData.data,
    }
}

export const developerLaunchTemplate: SiteTemplate = {
  id: 'template-dev-launch',
  name: 'Developer Launch',
  siteType: 'developer-launch',
  pages: [
    {
      id: "page-home",
      title: "Home",
      blocks: [
        createBlock('hero', 1),
        createBlock('listingGrid', 2),
        createBlock('ctaForm', 3),
      ],
      canonicalListings: ["proj-001", "proj-002", "proj-003"],
      brochureUrl: "",
      seo: {
        title: "Luxury Homes Dubai | Exclusive Real Estate",
        description: "Find the finest luxury properties in Dubai.",
        keywords: ["luxury homes dubai", "real estate dubai"],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "page-about",
      title: "About Us",
      blocks: [
        createBlock('hero', 1)
      ],
      canonicalListings: [],
      brochureUrl: "",
      seo: {
        title: "About Our Company",
        description: "Learn more about our mission.",
        keywords: ["about us", "real estate company"],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
};

export const roadshowTemplate: SiteTemplate = {
  id: 'template-roadshow',
  name: 'Roadshow Event',
  siteType: 'roadshow',
  pages: [
    {
      id: "page-event",
      title: "Event Details",
      blocks: [
        createBlock('hero', 1),
        createBlock('ctaForm', 2),
      ],
      canonicalListings: [],
      brochureUrl: "",
      seo: {
        title: "Join Our Exclusive Roadshow",
        description: "Register for our upcoming real estate roadshow event.",
        keywords: ["real estate event", "roadshow"],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
};

export const availableTemplates: SiteTemplate[] = [
    developerLaunchTemplate,
    roadshowTemplate,
];
