import { CuriosityHero } from '@/components/marketing/curiosity-hero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EntreSite AI | Build What Matters',
  description: 'The AI-powered operating system for real estate growth.',
};

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-black">
      <CuriosityHero />
    </main>
  );
}
