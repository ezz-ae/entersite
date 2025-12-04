import { ProjectDiscoverySection } from '@/components/marketing/project-discovery-section';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discover Real Estate Projects | EntreSite AI',
  description: 'Explore our database of 3,750+ verified real estate projects and get live insights from our AI Expert Agent.',
};

export default function DiscoverPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <ProjectDiscoverySection />
      <SiteFooter />
    </main>
  );
}
