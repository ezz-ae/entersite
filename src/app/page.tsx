import { MarketingHero, FeatureGrid } from '@/components/marketing/landing-components';
import { SiteFooter } from '@/components/site-footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EntreSite AI | The Real Estate Operating System',
  description: 'Build high-converting real estate websites in seconds with AI.',
};

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <MarketingHero />
      <FeatureGrid />
      <SiteFooter />
    </main>
  );
}
