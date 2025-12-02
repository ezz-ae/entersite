'use client';

import { PlusCircle } from 'lucide-react';
import { mockPage } from '@/lib/data';
import type { Block as BlockType } from '@/lib/types';
import { BlockCard } from './block-card';
import { HeroBlock } from './blocks/hero-block';
import { ListingGridBlock } from './blocks/listing-grid-block';
import { CtaFormBlock } from './blocks/cta-form-block';
import { Button } from './ui/button';

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
  return (
    <div className="space-y-8 p-4 md:p-8 bg-white rounded-lg shadow-inner">
       {mockPage.blocks.sort((a, b) => a.order - b.order).map((block) => (
        <BlockCard key={block.blockId} blockType={block.type}>
          {renderBlock(block)}
        </BlockCard>
      ))}

      <div className="text-center">
        <Button variant="outline" size="lg" className="border-dashed">
            <PlusCircle className="mr-2"/>
            Add Block
        </Button>
      </div>
    </div>
  );
}
