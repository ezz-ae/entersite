import { LandingHero } from '@/components/marketing/landing-hero';
import { BuilderShowcase } from '@/components/marketing/feature-showcase/builder-showcase';
import { TemplateShowcase } from '@/components/showcase/template-showcase';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EntreSite AI | The Real Estate OS',
  description: 'The AI Operating System for Real Estate Growth. Build sites, manage ads, and scale your business.',
};

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <LandingHero />
      <BuilderShowcase />
      <TemplateShowcase headline="Start with a World-Class Foundation" subtext="Choose from dozens of pre-built, market-tested templates." />
      <SiteFooter />
    </main>
  );
}
