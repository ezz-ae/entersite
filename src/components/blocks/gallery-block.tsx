import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface GalleryBlockProps {
  headline: string;
  subtext: string;
}

export function GalleryBlock({ headline, subtext }: GalleryBlockProps) {
    const galleryImages = [
        'property-gallery-1',
        'property-gallery-2',
        'property-gallery-3',
        'property-gallery-4',
        'property-gallery-5'
    ];

    const imagePlaceholders = galleryImages.map(id => 
        PlaceHolderImages.find(p => p.id === id)
    ).filter(Boolean);

  return (
    <div className="py-12 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">{headline}</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">{subtext}</p>
        </div>
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {imagePlaceholders.map((image, index) => (
              image && (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="relative flex aspect-video items-center justify-center p-0 overflow-hidden rounded-lg">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          data-ai-hint={image.imageHint}
                          fill
                          className="object-cover"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    </div>
  );
}
