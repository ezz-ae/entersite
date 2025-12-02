'use client';

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
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
import { SortableItem } from './sortable-item';

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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addBlock = (blockType: string) => {
    setPage((currentPage) => {
      const newBlock: BlockType = {
        blockId: `block-${Date.now()}`,
        type: blockType,
        order: currentPage.blocks.length + 1,
        data: { // Add default data based on block type
            headline: "New Headline",
            subtext: "New subtext",
            ctaText: "Click me",
            projects: mockPage.blocks.find(b => b.type === 'listing-grid')?.data.projects.slice(0,1) || [],
        },
      };
      return {
        ...currentPage,
        blocks: [...currentPage.blocks, newBlock],
      };
    });
    setIsGalleryOpen(false);
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPage((currentPage) => {
        const oldIndex = currentPage.blocks.findIndex((b) => b.blockId === active.id);
        const newIndex = currentPage.blocks.findIndex((b) => b.blockId === over.id);
        const newBlocks = arrayMove(currentPage.blocks, oldIndex, newIndex);
        
        // Update order property
        const reorderedBlocks = newBlocks.map((block, index) => ({
          ...block,
          order: index + 1,
        }));

        return {
          ...currentPage,
          blocks: reorderedBlocks,
        };
      });
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-8 bg-white rounded-lg shadow-inner">
       <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={page.blocks.map(b => b.blockId)} strategy={verticalListSortingStrategy}>
          <div className="space-y-8">
            {page.blocks.sort((a, b) => a.order - b.order).map((block) => (
              <SortableItem key={block.blockId} id={block.blockId}>
                <BlockCard blockType={block.type}>
                  {renderBlock(block)}
                </BlockCard>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

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
