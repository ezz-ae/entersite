import type { SitePage, Block } from './types';
import { allProjects } from './projects';
import { dubaiProjects } from '@/data/dubai';
import { abuDhabiProjects } from '@/data/abudhabi';
import { rasAlKhaimahProjects } from '@/data/rasalkhaimah';
import { sharjahProjects } from '@/data/sharjah';

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
  'listing-grid': {
    type: 'listing-grid',
    data: {
      headline: "Featured Properties",
      subtext: "Handpicked listings that define luxury living.",
      projects: allProjects.slice(0, 3), // Default projects
    },
  },
  'cta-form': {
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

const createBlock = (type: keyof typeof defaultBlocks, order: number, context?: { city?: string }): Block => {
    const blockData = { ...defaultBlocks[type] };

    if (type === 'listing-grid') {
      let projectsToShow = [];
       const city = context?.city?.toLowerCase();

      if (city === 'dubai') projectsToShow = dubaiProjects.slice(0, 3);
      else if (city === 'abu dhabi') projectsToShow = abuDhabiProjects.slice(0, 3);
      else if (city === 'ras al khaimah') projectsToShow = rasAlKhaimahProjects.slice(0, 3);
      else if (city === 'sharjah') projectsToShow = sharjahProjects.slice(0, 3);
      else projectsToShow = allProjects.slice(0, 3);
      
      blockData.data.projects = projectsToShow;
    }


    return {
        blockId: `${blockData.type}-${Date.now()}-${Math.random()}`,
        type: blockData.type,
        order: order,
        data: blockData.data,
    }
}

const createPage = (id: string, title: string, blocks: (keyof typeof defaultBlocks)[], context?: { city?: string }): SitePage => {
    return {
        id: `page-${id}`,
        title: title,
        blocks: blocks.map((type, index) => createBlock(type, index + 1, context)),
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
  name: 'Dubai Roadshow Page',
  siteType: 'roadshow',
  pages: [
    createPage('home', 'Event Details', ['hero', 'listing-grid', 'map', 'cta-form', 'testimonial', 'faq'], { city: 'Dubai' }),
  ],
};

export const developerFocusTemplate: SiteTemplate = {
    id: 'template-dev-focus',
    name: 'Abu Dhabi Developer',
    siteType: 'developer-focus',
    pages: [
      createPage('home', 'Home', ['hero', 'listing-grid', 'testimonial'], { city: 'Abu Dhabi' }),
      createPage('about', 'About Us', ['hero']),
      createPage('contact', 'Contact', ['cta-form']),
    ],
};

export const partnerLaunchTemplate: SiteTemplate = {
    id: 'template-partner-launch',
    name: 'RAK Partner Launch',
    siteType: 'partner-launch',
    pages: [
        createPage('home', 'Launch Home', ['hero', 'listing-grid', 'map', 'testimonial'], { city: 'Ras Al Khaimah' }),
    ]
};

export const fullCompanyTemplate: SiteTemplate = {
    id: 'template-full-company',
    name: 'Full Real Estate Company',
    siteType: 'full-company',
    pages: [
        createPage('home', 'Home', ['hero', 'listing-grid']),
        createPage('about', 'About Us', ['hero']),
        createPage('projects', 'Projects', ['listing-grid']),
        createPage('contact', 'Contact Us', ['cta-form']),
    ]
};

export const freelancerTemplate: SiteTemplate = {
    id: 'template-freelancer',
    name: 'Freelancer Agent',
    siteType: 'freelancer',
    pages: [
        createPage('home', 'Home', ['hero', 'listing-grid', 'testimonial', 'cta-form']),
    ]
};

export const mapFocusedTemplate: SiteTemplate = {
    id: 'template-map-focused',
    name: 'Map-First Search',
    siteType: 'map-focused',
    pages: [
        createPage('home', 'Map Search', ['map', 'listing-grid']),
    ]
};

export const adsQuickLaunchTemplate: SiteTemplate = {
    id: 'template-ads-launch',
    name: 'Landing Page + Ads',
    siteType: 'ads-launch',
    pages: [
        createPage('home', 'Landing Page', ['hero', 'cta-form', 'faq']),
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
