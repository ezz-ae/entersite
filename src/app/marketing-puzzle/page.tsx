import { CouponPuzzle } from '@/components/marketing/coupon-puzzle';
import { TemplateShowcase } from '@/components/showcase/template-showcase';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unlock Your Credit | EntreSite AI',
  description: 'Solve the puzzle to unlock your $100 credit.',
};

export default function MarketingPuzzlePage() {
  return (
    <main className="min-h-screen bg-black">
      <CouponPuzzle />
      <TemplateShowcase />
    </main>
  );
}
