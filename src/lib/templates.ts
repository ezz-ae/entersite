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
      backgroundImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000"
    },
  },
  'launch-hero': {
      type: 'launch-hero',
      data: {
          headline: "The Future of Living Arrives Soon"
      }
  },
  'coming-soon-hero': {
      type: 'coming-soon-hero',
      data: {
          headline: "Something Extraordinary is Coming"
      }
  },
  'hero-lead-form': {
    type: 'hero-lead-form',
    data: {
        headline: "Find Your Dream Home",
    }
  },
  'search-filters': {
      type: 'search-filters',
      data: {
          headline: "Search Properties"
      }
  },
  'listing-grid': {
    type: 'listing-grid',
    data: {
      headline: "Featured Properties",
      subtext: "Handpicked listings that define luxury living.",
      projects: allProjects.slice(0, 3), // Default projects
    },
  },
  'listing-grid-map': {
    type: 'listing-grid-map',
    data: {
        headline: "Explore Projects on Map",
        projects: allProjects.slice(0, 5),
    }
  },
  'featured-listing': {
      type: 'featured-listing',
      data: {
          headline: "Property of the Month"
      }
  },
  'cta-form': {
    type: 'cta-form',
    data: {
      headline: "Schedule a Private Viewing",
      subtext: "Our experts are ready to assist you.",
    },
  },
  'cta-grid': {
      type: 'cta-grid',
      data: {
          headline: "Take the Next Step"
      }
  },
  'banner-cta': {
      type: 'banner-cta',
      data: {
          headline: "Limited Availability"
      }
  },
  'newsletter': {
      type: 'newsletter',
      data: {
          headline: "Stay Ahead of the Market"
      }
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
          headline: 'Project Gallery',
          images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1600596542815-275084988866?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000",
          ]
      }
  },
  testimonial: {
      type: 'testimonial',
      data: {
          headline: 'What Our Clients Say',
          testimonials: [
            { quote: "Working with this team was a game-changer. Their AI-powered platform helped us launch our project website in record time.", author: "Fatima Al-Marzouqi", role: "CEO, Prestige Properties", avatarId: 'user-avatar-1' },
            { quote: "The automated Google Ads campaigns are incredibly effective. We saw a 200% increase in qualified leads within the first month.", author: "Johnathan Smith", role: "Marketing Director, Skyline Developments", avatarId: 'user-avatar-2' },
            { quote: "As a boutique agency, we need to be agile. EntreSite allowed us to compete with the big players, giving us a professional web presence without the huge overhead.", author: "Chen Wei", role: "Founder, Urban Nest Realty", avatarId: 'user-avatar-3' },
          ]
      }
  },
  faq: {
      type: 'faq',
      data: {
          headline: 'Frequently Asked Questions',
          subtext: "Find answers to common questions about our properties and services.",
          faqItems: [
              { question: "What types of properties do you offer?", answer: "We offer a wide range of properties including luxury villas, modern apartments, and exclusive townhouses in prime locations." },
              { question: "Can I schedule a viewing online?", answer: "Yes, you can easily schedule a private viewing through our contact form. One of our agents will get in touch with you to confirm the details." },
              { question: "Are there financing options available?", answer: "We work with several trusted financial partners to offer you flexible financing options. Please contact us for more information." },
              { question: "What amenities are included?", answer: "Our properties come with a variety of high-end amenities, which may include private pools, state-of-the-art gyms, community centers, and more. Specific amenities vary by project." }
          ]
      }
  },
  roadshow: {
      type: 'roadshow',
      data: {
          eventName: "Dubai Property Show 2025",
          city: "London",
          date: "October 15-17, 2025"
      }
  },
  team: {
      type: 'team',
      data: {
          headline: "Meet Our Experts"
      }
  },
  'project-detail': {
      type: 'project-detail',
      data: {
          projectName: "Elysian Residence"
      }
  },
  'brochure-form': {
      type: 'brochure-form',
      data: {
          brochureTitle: "Investor Guide"
      }
  },
  offer: {
      type: 'offer',
      data: {
          headline: "Exclusive Offer"
      }
  },
  'floor-plan': {
      type: 'floor-plan',
      data: {
          headline: "Floor Plans"
      }
  },
  features: {
      type: 'features',
      data: {
          headline: "Key Features"
      }
  },
  launch: {
      type: 'launch',
      data: {
          headline: "Grand Launch"
      }
  },
  'chat-widget': {
      type: 'chat-widget',
      data: {
          agentName: "Sarah - Support"
      }
  },
  'blog-grid': {
      type: 'blog-grid',
      data: {
          headline: "Market Insights"
      }
  },
  'mortgage-calculator': {
      type: 'mortgage-calculator',
      data: {
          headline: "Mortgage Calculator"
      }
  },
  'roi-calculator': {
      type: 'roi-calculator',
      data: {
          headline: "Calculate ROI"
      }
  },
  'payment-plan': {
      type: 'payment-plan',
      data: {
          headline: "Flexible Payment Plan"
      }
  },
  'video': {
      type: 'video',
      data: {
          headline: "Watch Video Tour"
      }
  },
  'split-content': {
      type: 'split-content',
      data: {
          headline: "Experience Waterfront Living"
      }
  },
  'contact-details': {
      type: 'contact-details',
      data: {
          headline: "Contact Us"
      }
  },
  'partners': {
      type: 'partners',
      data: {
          headline: "Our Partners"
      }
  },
  'developers-list': {
      type: 'developers-list',
      data: {
          headline: "Top Developers"
      }
  },
  'stats': {
      type: 'stats',
      data: {
          headline: "Our Achievements"
      }
  },
  'city-guide': {
      type: 'city-guide',
      data: {
          headline: "Why Invest in Dubai?"
      }
  }
};

const createBlock = (type: keyof typeof defaultBlocks, order: number, context?: { city?: string }): Block => {
    // Create a deep copy of the block data to avoid shared reference issues
    const blockData = JSON.parse(JSON.stringify(defaultBlocks[type]));

    if (type === 'listing-grid' || type === 'listing-grid-map') {
      let projectsToShow = [];
       const city = context?.city?.toLowerCase();

      if (city === 'dubai') projectsToShow = dubaiProjects;
      else if (city === 'abu dhabi') projectsToShow = abuDhabiProjects;
      else if (city === 'ras al khaimah') projectsToShow = rasAlKhaimahProjects;
      else if (city === 'sharjah') projectsToShow = sharjahProjects;
      else projectsToShow = allProjects;
      
      // Slice depending on block type
      blockData.data.projects = type === 'listing-grid' ? projectsToShow.slice(0, 3) : projectsToShow.slice(0, 5);
    }


    return {
        blockId: `${blockData.type}-${Date.now()}-${Math.random()}`,
        type: type,
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
    createPage('home', 'Event Details', ['roadshow', 'banner-cta', 'split-content', 'listing-grid', 'brochure-form', 'cta-form', 'faq', 'chat-widget'], { city: 'Dubai' }),
  ],
};

export const developerFocusTemplate: SiteTemplate = {
    id: 'template-dev-focus',
    name: 'Abu Dhabi Developer',
    siteType: 'developer-focus',
    pages: [
      createPage('home', 'Home', ['hero', 'stats', 'listing-grid', 'project-detail', 'features', 'payment-plan', 'team', 'newsletter', 'chat-widget'], { city: 'Abu Dhabi' }),
      createPage('about', 'About Us', ['hero', 'split-content', 'team', 'video', 'partners']),
      createPage('contact', 'Contact', ['contact-details', 'cta-form']),
    ],
};

export const partnerLaunchTemplate: SiteTemplate = {
    id: 'template-partner-launch',
    name: 'RAK Partner Launch',
    siteType: 'partner-launch',
    pages: [
        createPage('home', 'Launch Home', ['launch-hero', 'featured-listing', 'listing-grid', 'offer', 'map', 'partners', 'cta-grid', 'chat-widget'], { city: 'Ras Al Khaimah' }),
    ]
};

export const fullCompanyTemplate: SiteTemplate = {
    id: 'template-full-company',
    name: 'Full Real Estate Company',
    siteType: 'full-company',
    pages: [
        createPage('home', 'Home', ['hero-lead-form', 'search-filters', 'partners', 'listing-grid-map', 'featured-listing', 'developers-list', 'city-guide', 'features', 'blog-grid', 'team', 'newsletter', 'chat-widget']),
        createPage('about', 'About Us', ['hero', 'stats', 'team', 'contact-details']),
        createPage('projects', 'Projects', ['listing-grid', 'mortgage-calculator', 'roi-calculator']),
        createPage('contact', 'Contact Us', ['contact-details', 'cta-form']),
    ]
};

export const freelancerTemplate: SiteTemplate = {
    id: 'template-freelancer',
    name: 'Freelancer Agent',
    siteType: 'freelancer',
    pages: [
        createPage('home', 'Home', ['hero', 'listing-grid', 'blog-grid', 'team', 'cta-grid', 'testimonial', 'chat-widget']),
    ]
};

export const mapFocusedTemplate: SiteTemplate = {
    id: 'template-map-focused',
    name: 'Map-First Search',
    siteType: 'map-focused',
    pages: [
        createPage('home', 'Map Search', ['search-filters', 'listing-grid-map', 'listing-grid', 'chat-widget']),
    ]
};

export const adsQuickLaunchTemplate: SiteTemplate = {
    id: 'template-ads-launch',
    name: 'Landing Page + Ads',
    siteType: 'ads-launch',
    pages: [
        createPage('home', 'Landing Page', ['coming-soon-hero', 'project-detail', 'video', 'floor-plan', 'payment-plan', 'offer', 'brochure-form', 'chat-widget']),
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
