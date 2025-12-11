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
  handover: {
      quarter: number;
      year: number;
  } | null;
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
  bedrooms?: {
    min: number;
    max: number;
  };
  areaSqft?: {
    min: number;
    max: number;
  };
  tags?: string[];
  publicUrl?: string;
  unitsStockUpdatedAt?: string;
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
