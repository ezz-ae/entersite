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

export interface Project {
  id: string;
  title: string;
  developer: string;
  city: string;
  price: number;
  currency: string;
  address: {
    street: string;
    lat: number;
    lng: number;
  };
  features: {
    beds: number;
    baths: number;
    area: number;
    type: string;
  };
  images: string[];
  brochureUrl: string;
  marketScore: number;
  source: 'bayut' | 'propertyfinder' | 'dubizzle' | 'manual';
  createdAt: string;
  updatedAt: string;
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
