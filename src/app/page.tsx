import { ProjectDiscoverySection } from '@/components/marketing/project-discovery-section';
import { SiteFooter } from '@/components/site-footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EntreSite AI | Real Estate OS - Discover & Build',
  description: 'Leverage 3,750+ verified real estate projects and AI agents to build, market, and manage your digital empire.',
};

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <ProjectDiscoverySection />
      <SiteFooter />
    </main>
  );
}
