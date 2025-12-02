'use client';

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const availableBlocks = [
  {
    type: 'hero',
    name: 'Hero Section',
    description: 'A large, attention-grabbing section with a headline and CTA.',
  },
  {
    type: 'listing-grid',
    name: 'Listing Grid',
    description: 'A grid to showcase multiple properties.',
  },
  {
    type: 'cta-form',
    name: 'Contact Form',
    description: 'A form for users to get in touch.',
  },
  {
    type: 'map',
    name: 'Map',
    description: 'An interactive map to show project locations.',
  },
  {
    type: 'gallery',
    name: 'Image Gallery',
    description: 'A gallery to showcase project images.',
  },
  {
    type: 'testimonial',
    name: 'Testimonials',
    description: 'Showcase client reviews and feedback.',
  },
  {
    type: 'faq',
    name: 'FAQ',
    description: 'An accordion-style FAQ section.',
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
