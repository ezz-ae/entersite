import type { SitePage, Block } from './types';
import { allProjects } from './projects';
import { dubaiProjects } from '@/data/dubai';
import { abuDhabiProjects } from '@/data/abudhabi';
import { rasAlKhaimahProjects } from '@/data/rasalkhaimah';
import { sharjahProjects } from '@/data/sharjah';

export interface SiteTemplate {
  id: string;
  name: string;
  siteType: 'roadshow' | 'developer-focus' | 'partner-launch' | 'full-company' | 'freelancer' | 'map-focused' | 'ads-launch' | 'ready-made' | 'agent-portfolio';
  pages: SitePage[];
  thumbnail?: string;
  description?: string;
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

const createBlock = (type: keyof typeof defaultBlocks, order: number, context?: { city?: string, overrides?: any }): Block => {
    const blockData = JSON.parse(JSON.stringify(defaultBlocks[type]));

    if (type === 'listing-grid' || type === 'listing-grid-map') {
      let projectsToShow = [];
       const city = context?.city?.toLowerCase();

      if (city === 'dubai') projectsToShow = dubaiProjects;
      else if (city === 'abu dhabi') projectsToShow = abuDhabiProjects;
      else if (city === 'ras al khaimah') projectsToShow = rasAlKhaimahProjects;
      else if (city === 'sharjah') projectsToShow = sharjahProjects;
      else projectsToShow = allProjects;
      
      blockData.data.projects = type === 'listing-grid' ? projectsToShow.slice(0, 3) : projectsToShow.slice(0, 5);
    }

    // Apply manual overrides for ready-made templates
    if (context?.overrides) {
        Object.assign(blockData.data, context.overrides);
    }

    return {
        blockId: `${blockData.type}-${Date.now()}-${Math.random()}`,
        type: type,
        order: order,
        data: blockData.data,
    }
}

const createPage = (id: string, title: string, blocks: (keyof typeof defaultBlocks | { type: keyof typeof defaultBlocks, overrides: any })[], context?: { city?: string }): SitePage => {
    return {
        id: `page-${id}`,
        title: title,
        blocks: blocks.map((blockDef, index) => {
            const type = typeof blockDef === 'string' ? blockDef : blockDef.type;
            const overrides = typeof blockDef === 'string' ? {} : blockDef.overrides;
            return createBlock(type, index + 1, { ...context, overrides });
        }),
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


// --- BASE TEMPLATES ---
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
        createPage('home', 'Home', ['hero', 'listing-grid', 'blog-grid', 'team', 'testimonial', 'cta-form', 'chat-widget']),
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

// --- NEW AGENT PORTFOLIO TEMPLATES ---

export const luxuryAgentTemplate: SiteTemplate = {
    id: 'luxury_agent_portfolio',
    name: 'Luxury Agent Portfolio',
    siteType: 'agent-portfolio',
    description: 'Premium showcase for high-net-worth clients.',
    pages: [
        createPage('home', 'Home', [
            { type: 'hero', overrides: { headline: "Discreet Luxury Real Estate", subtext: "Exclusive off-market listings for the discerning investor.", backgroundImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000" } },
            { type: 'featured-listing', overrides: { headline: "Signature Listing" } },
            { type: 'split-content', overrides: { headline: "About Your Advisor", subtext: "15 years of experience managing high-value portfolios.", imagePosition: "left" } },
            { type: 'listing-grid', overrides: { headline: "Curated Collection" } },
            'testimonial',
            { type: 'cta-form', overrides: { headline: "Private Consultation" } }
        ], { city: 'Dubai' })
    ]
};

export const offPlanSpecialistTemplate: SiteTemplate = {
    id: 'offplan_specialist_page',
    name: 'Off-Plan Specialist',
    siteType: 'agent-portfolio',
    description: 'Dedicated funnel for new project launches.',
    pages: [
        createPage('home', 'Home', [
            { type: 'launch-hero', overrides: { headline: "First Access to Dubai's Launches", subtext: "Don't miss the next big opportunity. Get pre-launch pricing." } },
            'developers-list',
            { type: 'listing-grid', overrides: { headline: "Launching Soon" } },
            'payment-plan',
            'roi-calculator',
            'cta-grid'
        ], { city: 'Dubai' })
    ]
};

export const internationalBuyerTemplate: SiteTemplate = {
    id: 'international_buyer_landing',
    name: 'International Buyer Guide',
    siteType: 'agent-portfolio',
    description: 'Trust-building site for overseas investors.',
    pages: [
        createPage('home', 'Home', [
            { type: 'hero-lead-form', overrides: { headline: "Invest in Dubai from Anywhere", subtext: "Your trusted partner for safe, remote property acquisition." } },
            'city-guide',
            { type: 'stats', overrides: { headline: "Why Invest Now?" } },
            { type: 'listing-grid', overrides: { headline: "Investment Opportunities" } },
            'faq',
            { type: 'chat-widget', overrides: { welcomeMessage: "Hi! I can help with Golden Visa & Remote Buying questions." } }
        ], { city: 'Dubai' })
    ]
};

export const whatsappLeadTemplate: SiteTemplate = {
    id: 'whatsapp_only_lead_page',
    name: 'WhatsApp Quick Lead',
    siteType: 'agent-portfolio',
    description: 'Minimalist page to drive chat conversions.',
    pages: [
        createPage('home', 'Chat Now', [
            { type: 'hero', overrides: { headline: "Find Your Dream Home Today", subtext: "Chat with a specialist instantly for live availability.", ctaText: "WhatsApp Now" } },
            { type: 'featured-listing', overrides: { headline: "Hot Deal of the Week" } },
            'chat-widget' // This handles the floating button, but hero CTA also drives action
        ], { city: 'Dubai' })
    ]
};


// --- READY-MADE TEMPLATES (Existing) ---
export const dubaiLuxuryTemplate: SiteTemplate = {
    id: 'template-dubai-luxury',
    name: 'Dubai Luxury Collection',
    siteType: 'ready-made',
    description: 'High-end portfolio for Jumeirah & Marina properties.',
    pages: [
        createPage('home', 'Luxury Collection', [
            { type: 'hero', overrides: { headline: "Dubai's Finest Addresses", subtext: "Exclusive waterfront apartments and villas.", backgroundImage: "https://images.unsplash.com/photo-1512453979798-5ea904ac66de?auto=format&fit=crop&q=80&w=2000" } },
            { type: 'featured-listing', overrides: { headline: "Penthouse of the Month", listingTitle: "Palm Royale Penthouse", price: "AED 45,000,000" } },
            'listing-grid',
            { type: 'city-guide', overrides: { city: "Dubai", headline: "Invest in the Future" } },
            'roi-calculator',
            'cta-form'
        ], { city: 'Dubai' })
    ]
}

export const emaarLaunchTemplate: SiteTemplate = {
    id: 'template-emaar-launch',
    name: 'Emaar Beachfront Launch',
    siteType: 'ready-made',
    description: 'Conversion-focused page for Emaar new releases.',
    pages: [
        createPage('home', 'Launch Event', [
            { type: 'launch-hero', overrides: { headline: "Emaar Beachfront", subtext: "Private Beach Living. Launching Soon.", launchDate: "Dec 2025" } },
            { type: 'banner-cta', overrides: { headline: "50/50 Payment Plan", subtext: "Pay 50% during construction, 50% on handover." } },
            { type: 'project-detail', overrides: { projectName: "Beach Isle", developer: "Emaar" } },
            'video',
            'payment-plan',
            'brochure-form'
        ], { city: 'Dubai' })
    ]
}

export const rakInvestmentTemplate: SiteTemplate = {
    id: 'template-rak-invest',
    name: 'RAK Casino Investment',
    siteType: 'ready-made',
    description: 'Targeting investors for the upcoming Wynn Resort area.',
    pages: [
        createPage('home', 'Investment Opportunity', [
            { type: 'hero-lead-form', overrides: { headline: "Invest in Al Marjan Island", subtext: "Home of the upcoming Wynn Casino Resort." } },
            { type: 'stats', overrides: { headline: "The Next Vegas", stats: [{ value: "20M", label: "Annual Tourists" }, { value: "15%", label: "Exp. Yield" }] } },
            'listing-grid',
            { type: 'offer', overrides: { headline: "Founder's Special", subtext: "Get 4% DLD Waiver + Free Furnishing" } },
            'cta-grid'
        ], { city: 'Ras Al Khaimah' })
    ]
}


export const availableTemplates: SiteTemplate[] = [
    // New Agent Portfolio Templates
    luxuryAgentTemplate,
    offPlanSpecialistTemplate,
    internationalBuyerTemplate,
    whatsappLeadTemplate,

    // Ready Made
    dubaiLuxuryTemplate,
    emaarLaunchTemplate,
    rakInvestmentTemplate,

    // Classic Templates
    roadshowTemplate,
    developerFocusTemplate,
    partnerLaunchTemplate,
    fullCompanyTemplate,
    freelancerTemplate,
    mapFocusedTemplate,
    adsQuickLaunchTemplate,
];
