export interface User {
  profile: {
    name: string;
    email: string;
    role: 'developer' | 'agent' | 'admin';
  };
  brandKit: {
    colors: {
      primary: string;
      secondary: string;
    };
    fonts: string;
    logoUrl: string;
  };
  subscriptions: any[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectData {
  id: string;
  name: string;
  developer: string;
  location: {
    city: string;
    area: string;
    mapQuery: string;
  };
  launchYear: number;
  deliveryYear: number;
  description: {
    full: string;
    short: string;
  };
  features: string[];
  price: {
    from: number;
    label: string;
  };
  availability: 'Available' | 'Sold Out' | 'Coming Soon';
  images: string[];
}


export interface Block {
  blockId: string;
  type: 'hero' | 'listing-grid' | 'cta-form' | string; // making it extensible
  data: Record<string, any>;
  order: number;
}

export interface SitePage {
  id: string;
  title: string;
  blocks: Block[];
  canonicalListings: string[];
  brochureUrl: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: string;
  updatedAt: string;
}
