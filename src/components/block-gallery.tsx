'use client';

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const availableBlocks = [
  {
    type: 'hero',
    name: 'Hero Section',
    description: 'A large, attention-grabbing section with a headline and CTA.',
    previewImage: 'https://picsum.photos/seed/hero/400/200',
  },
  {
    type: 'listing-grid',
    name: 'Listing Grid',
    description: 'A grid to showcase multiple properties.',
    previewImage: 'https://picsum.photos/seed/grid/400/200',
  },
  {
    type: 'cta-form',
    name: 'Contact Form',
    description: 'A form for users to get in touch.',
    previewImage: 'https://picsum.photos/seed/form/400/200',
  },
];

interface BlockGalleryProps {
  onSelectBlock: (blockType: string) => void;
}

export function BlockGallery({ onSelectBlock }: BlockGalleryProps) {
  return (
      <div className="grid grid-cols-2 gap-2">
        {availableBlocks.map((block) => (
          <div 
            key={block.type} 
            className="cursor-pointer hover:bg-accent p-2 rounded-md transition-colors"
            onClick={() => onSelectBlock(block.type)}
          >
              <h3 className="text-sm font-semibold">{block.name}</h3>
              <p className="text-xs text-muted-foreground">{block.description}</p>
          </div>
        ))}
      </div>
  );
}
