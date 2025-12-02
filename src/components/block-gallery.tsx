'use client';

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const availableBlocks = [
  {
    type: 'hero',
    name: 'Hero Section',
    description: 'A large, attention-grabbing section with a headline, subtext, and call-to-action.',
    previewImage: 'https://picsum.photos/seed/hero/400/200',
  },
  {
    type: 'listing-grid',
    name: 'Listing Grid',
    description: 'A grid layout to showcase multiple properties or listings.',
    previewImage: 'https://picsum.photos/seed/grid/400/200',
  },
  {
    type: 'cta-form',
    name: 'Contact Form',
    description: 'A form for users to get in touch, schedule viewings, or ask questions.',
    previewImage: 'https://picsum.photos/seed/form/400/200',
  },
];

interface BlockGalleryProps {
  onSelectBlock: (blockType: string) => void;
}

export function BlockGallery({ onSelectBlock }: BlockGalleryProps) {
  return (
    <ScrollArea className="h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
        {availableBlocks.map((block) => (
          <Card 
            key={block.type} 
            className="cursor-pointer hover:shadow-lg hover:border-primary transition-all"
            onClick={() => onSelectBlock(block.type)}
          >
            <CardContent className="p-4 space-y-3">
              <div className="relative aspect-video w-full rounded-md overflow-hidden border">
                <Image
                  src={block.previewImage}
                  alt={`${block.name} preview`}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-md font-semibold">{block.name}</h3>
              <p className="text-sm text-muted-foreground">{block.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
