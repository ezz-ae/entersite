import { LandingHero } from '@/components/marketing/landing-hero';
import { BuilderMotionShowcase } from '@/components/marketing/feature-showcase/builder-motion-showcase';
import { AdsShowcase } from '@/components/marketing/feature-showcase/ads-showcase';
import { SeoShowcase } from '@/components/marketing/feature-showcase/seo-showcase';
import { ChatAgentShowcase } from '@/components/marketing/feature-showcase/chat-agent-showcase';
import { TemplateShowcase } from '@/components/showcase/template-showcase';
import { ReadyBuilds } from '@/components/marketing/feature-showcase/ready-builds';
import { DomainSearchBlock } from '@/components/marketing/domain-search-block';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EntreSite AI | The Real Estate Operating System',
  description: 'Build high-converting real estate websites in seconds with AI. The only platform with 3,750+ verified project listings.',
};

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col font-sans">
      <SiteHeader />
      
      {/* 1. The Brain: AI Generation */}
      <LandingHero />
      
      {/* 2. The Tool: Visual Builder */}
      <BuilderMotionShowcase />
      
      {/* 3. The Foundation: Ready-Made Sites */}
      <ReadyBuilds />
      
      {/* 4. The Growth Engine: Marketing Tools */}
      <div className="space-y-0 bg-background text-foreground">
        <AdsShowcase />
        <SeoShowcase />
        <ChatAgentShowcase />
      </div>

      {/* 5. The Polish: Templates & Domains */}
      <TemplateShowcase headline="Design That Converts" subtext="Award-winning layouts for every niche." />
      <DomainSearchBlock />
      
      <SiteFooter />
    </main>
  );
}
