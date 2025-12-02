import type { SitePage, Block } from './types';
import { allProjects } from './projects';

export interface SiteTemplate {
  id: string;
  name: string;
  siteType: 'roadshow' | 'developer-focus' | 'partner-launch' | 'full-company' | 'freelancer' | 'map-focused' | 'ads-launch';
  pages: SitePage[];
}

const defaultBlocks: Record<string, Omit<Block, 'blockId' | 'order'>> = {
  hero: {
    type: 'hero',
    data: {
      headline: "Discover Unparalleled Luxury",
      subtext: "Explore our exclusive collection of premium properties.",
      ctaText: "Explore Properties",
    },
  },
  listingGrid: {
    type: 'listing-grid',
    data: {
      headline: "Featured Properties",
      subtext: "Handpicked listings that define luxury living.",
      projects: allProjects.slice(0, 3),
    },
  },
  ctaForm: {
    type: 'cta-form',
    data: {
      headline: "Schedule a Private Viewing",
      subtext: "Our experts are ready to assist you.",
    },
  },
  map: {
    type: 'map',
    data: {
        headline: "Explore the Location"
    }
  },
  gallery: {
      type: 'gallery',
      data: {
          headline: 'Project Gallery'
      }
  },
  testimonial: {
      type: 'testimonial',
      data: {
          headline: 'What Our Clients Say'
      }
  },
  faq: {
      type: 'faq',
      data: {
          headline: 'Frequently Asked Questions'
      }
  }
};

const createBlock = (type: keyof typeof defaultBlocks, order: number): Block => {
    const blockData = defaultBlocks[type] || defaultBlocks['hero'];
    return {
        blockId: `${blockData.type}-${Date.now()}-${Math.random()}`,
        type: blockData.type,
        order: order,
        data: {
          ...blockData.data,
          // ensure projects are sliced for listing grid
          ...(type === 'listingGrid' && { projects: allProjects.slice(0, 3) })
        }
    }
}

const createPage = (id: string, title: string, blocks: (keyof typeof defaultBlocks)[]): SitePage => {
    return {
        id: `page-${id}`,
        title: title,
        blocks: blocks.map((type, index) => createBlock(type, index + 1)),
        canonicalListings: [],
        brochureUrl: "",
        seo: {
            title: `${title} | EntreSite AI`,
            description: `This is the ${title} page.`,
            keywords: [],
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
}


export const roadshowTemplate: SiteTemplate = {
  id: 'template-roadshow',
  name: 'Roadshow Landing Page',
  siteType: 'roadshow',
  pages: [
    createPage('home', 'Event Details', ['hero', 'gallery', 'map', 'ctaForm', 'testimonial', 'faq']),
  ],
};

export const developerFocusTemplate: SiteTemplate = {
    id: 'template-dev-focus',
    name: 'Developer Focus',
    siteType: 'developer-focus',
    pages: [
      createPage('home', 'Home', ['hero', 'listingGrid', 'testimonial']),
      createPage('about', 'About Us', ['hero']),
      createPage('contact', 'Contact', ['ctaForm']),
    ],
};

export const partnerLaunchTemplate: SiteTemplate = {
    id: 'template-partner-launch',
    name: 'Partner Launch',
    siteType: 'partner-launch',
    pages: [
        createPage('home', 'Launch Home', ['hero', 'listingGrid', 'map', 'testimonial']),
    ]
};

export const fullCompanyTemplate: SiteTemplate = {
    id: 'template-full-company',
    name: 'Full Real Estate Company',
    siteType: 'full-company',
    pages: [
        createPage('home', 'Home', ['hero', 'listingGrid']),
        createPage('about', 'About Us', ['hero']),
        createPage('projects', 'Projects', ['listingGrid']),
        createPage('contact', 'Contact Us', ['ctaForm']),
    ]
};

export const freelancerTemplate: SiteTemplate = {
    id: 'template-freelancer',
    name: 'Freelancer Agent',
    siteType: 'freelancer',
    pages: [
        createPage('home', 'Home', ['hero', 'listingGrid', 'testimonial', 'ctaForm']),
    ]
};

export const mapFocusedTemplate: SiteTemplate = {
    id: 'template-map-focused',
    name: 'Map-First Search',
    siteType: 'map-focused',
    pages: [
        createPage('home', 'Map Search', ['map', 'listingGrid']),
    ]
};

export const adsQuickLaunchTemplate: SiteTemplate = {
    id: 'template-ads-launch',
    name: 'Landing Page + Ads',
    siteType: 'ads-launch',
    pages: [
        createPage('home', 'Landing Page', ['hero', 'ctaForm', 'faq']),
    ]
};


export const availableTemplates: SiteTemplate[] = [
    roadshowTemplate,
    developerFocusTemplate,
    partnerLaunchTemplate,
    fullCompanyTemplate,
    freelancerTemplate,
    mapFocusedTemplate,
    adsQuickLaunchTemplate,
];
