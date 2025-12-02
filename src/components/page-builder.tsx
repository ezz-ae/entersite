'use client';

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { mockPage } from '@/lib/data';
import type { Block as BlockType, SitePage } from '@/lib/types';
import { BlockCard } from './block-card';
import { HeroBlock } from './blocks/hero-block';
import { ListingGridBlock } from './blocks/listing-grid-block';
import { CtaFormBlock } from './blocks/cta-form-block';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BlockGallery } from './block-gallery';

const blockComponents: Record<string, React.ComponentType<any>> = {
  'hero': HeroBlock,
  'listing-grid': ListingGridBlock,
  'cta-form': CtaFormBlock,
};

const renderBlock = (block: BlockType) => {
  const Component = blockComponents[block.type];
  if (!Component) {
    return (
      <div className="p-4 text-center text-red-500 bg-red-100 rounded-lg">
        Unknown block type: {block.type}
      </div>
    );
  }
  return <Component {...block.data} />;
};

export function PageBuilder() {
  const [page, setPage] = useState<SitePage>(mockPage);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const addBlock = (blockType: string) => {
    // This is a placeholder for adding a new block.
    // In a real scenario, we would generate a unique ID and default data.
    console.log("Add block of type:", blockType);
    setIsGalleryOpen(false);
  };

  return (
    <div className="space-y-8 p-4 md:p-8 bg-white rounded-lg shadow-inner">
       {page.blocks.sort((a, b) => a.order - b.order).map((block) => (
        <BlockCard key={block.blockId} blockType={block.type}>
          {renderBlock(block)}
        </BlockCard>
      ))}

      <div className="text-center">
        <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="lg" className="border-dashed">
                <PlusCircle className="mr-2"/>
                Add Block
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle>Select a block to add</DialogTitle>
            </DialogHeader>
            <BlockGallery onSelectBlock={addBlock} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
