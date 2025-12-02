import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface HeroBlockProps {
  headline: string;
  subtext: string;
  ctaText: string;
}

export function HeroBlock({ headline, subtext, ctaText }: HeroBlockProps) {
  const heroBg = PlaceHolderImages.find(p => p.id === 'hero-bg');

  return (
    <div className="relative w-full h-[60vh] rounded-lg overflow-hidden">
      {heroBg && (
        <Image
          src={heroBg.imageUrl}
          alt={heroBg.description}
          data-ai-hint={heroBg.imageHint}
          fill
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      <div className="relative h-full flex flex-col justify-end p-8 md:p-12 text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl drop-shadow-md">
          {headline}
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow">
          {subtext}
        </p>
        <div className="mt-8">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            {ctaText}
          </Button>
        </div>
      </div>
    </div>
  );
}
