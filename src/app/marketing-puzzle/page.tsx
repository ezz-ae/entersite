import { CouponPuzzle } from '@/components/marketing/coupon-puzzle';
import { TemplateShowcase } from '@/components/showcase/template-showcase';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unlock Your Credit | EntreSite AI',
  description: 'Solve the puzzle to unlock your $100 credit.',
};

export default function MarketingPuzzlePage() {
  return (
    <main className="min-h-screen bg-black">
      <SiteHeader />
      <div className="pt-20">
        <CouponPuzzle />
      </div>
      <TemplateShowcase headline="Templates Worth Unlocking" subtext="Browse the premium designs you can build with your credits." />
      <SiteFooter />
    </main>
  );
}
