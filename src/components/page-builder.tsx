'use client';

import { useState, useEffect } from 'react';
import { Plus, Sparkles } from 'lucide-react';
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
import type { Block as BlockType, SitePage } from '@/lib/types';
import { BlockCard } from './block-card';
import { HeroBlock } from './blocks/hero-block';
import { ListingGridBlock } from './blocks/listing-grid-block';
import { CtaFormBlock } from './blocks/cta-form-block';
import { GalleryBlock } from './blocks/gallery-block';
import { FaqBlock } from './blocks/faq-block';
import { MapBlock, TestimonialBlock } from './blocks/placeholder-blocks';
import { Button } from './ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BlockGallery } from './block-gallery';
import { SortableItem } from './sortable-item';
import { suggestNextBlocks, SuggestNextBlocksOutput } from '@/ai/flows/suggest-next-blocks';
import { Separator } from './ui/separator';
import { allProjects } from '@/lib/projects';

const blockComponents: Record<string, React.ComponentType<any>> = {
  'hero': HeroBlock,
  'listing-grid': ListingGridBlock,
  'cta-form': CtaFormBlock,
  'map': MapBlock,
  'gallery': GalleryBlock,
  'testimonial': TestimonialBlock,
  'faq': FaqBlock,
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

const AddBlockPopover = ({ onSelectBlock, currentBlocks }: { onSelectBlock: (blockType: string, content?: any) => void, currentBlocks: string[] }) => {
  const [suggestions, setSuggestions] = useState<SuggestNextBlocksOutput>([]);
  const [loading, setLoading] = useState(false);

  const handleSuggest = async () => {
    setLoading(true);
    try {
      const result = await suggestNextBlocks({
        currentBlocks: currentBlocks,
        siteType: 'developer-launch',
        brand: 'Prestige',
        primaryColor: '#002F4B'
      });
      setSuggestions(result);
    } catch (e) {
      console.error(e);
      // Handle error - maybe show a toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-10 w-10 rounded-full border-2 border-dashed border-primary/30 text-primary/60 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-300">
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add Block</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-4">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium leading-none">Add a New Block</h4>
            <p className="text-sm text-muted-foreground">
              Get AI suggestions or choose from the gallery.
            </p>
          </div>
          <Button onClick={handleSuggest} disabled={loading} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            {loading ? 'Thinking...' : 'Suggest Blocks'}
          </Button>
          {suggestions.length > 0 && (
             <div className="space-y-2">
                <Separator />
                <h5 className="font-medium text-sm">Suggestions</h5>
                {suggestions.map(suggestion => (
                    <div
                        key={suggestion.blockId}
                        onClick={() => onSelectBlock(suggestion.blockId, suggestion.defaultContent)}
                        className="p-2 rounded-md hover:bg-accent cursor-pointer"
                    >
                        <p className="font-medium text-sm capitalize">{suggestion.blockId.replace('-', ' ')}</p>
                    </div>
                ))}
             </div>
          )}
          <Separator />
          <h5 className="font-medium text-sm">Or choose from gallery</h5>
          <BlockGallery onSelectBlock={(type) => onSelectBlock(type)} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface PageBuilderProps {
  page: SitePage;
  onPageUpdate: (page: SitePage) => void;
}

export function PageBuilder({ page, onPageUpdate }: PageBuilderProps) {
  const [blocks, setBlocks] = useState<BlockType[]>(page.blocks);

  useEffect(() => {
    setBlocks(page.blocks);
  }, [page]);
  
  const updatePage = (newBlocks: BlockType[]) => {
    setBlocks(newBlocks);
    onPageUpdate({
      ...page,
      blocks: newBlocks,
    });
  };


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addBlock = (blockType: string, content?: any, index?: number) => {
    const newBlock: BlockType = {
      blockId: `${blockType}-${Date.now()}`,
      type: blockType,
      order: 0, // Order will be recalculated
      data: content || {
        headline: "New Headline",
        subtext: "New subtext",
        ctaText: "Click me",
        projects: allProjects.slice(0, 3)
      },
    };
    
    const newBlocksList = [...blocks];
    const targetIndex = index !== undefined ? index : newBlocksList.length;
    newBlocksList.splice(targetIndex, 0, newBlock);

    const reorderedBlocks = newBlocksList.map((block, i) => ({
      ...block,
      order: i,
    }));
    
    updatePage(reorderedBlocks);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
        const oldIndex = blocks.findIndex((b) => b.blockId === active.id);
        const newIndex = blocks.findIndex((b) => b.blockId === over.id);
        const movedBlocks = arrayMove(blocks, oldIndex, newIndex);
        
        const reorderedBlocks = movedBlocks.map((block, index) => ({
          ...block,
          order: index,
        }));

        updatePage(reorderedBlocks);
    }
  };

  const sortedBlocks = blocks.sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-4xl mx-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-4">
           {sortedBlocks.length === 0 && (
             <div className="text-center py-12 border-2 border-dashed rounded-lg">
               <h2 className="text-xl font-medium text-muted-foreground">This page is empty.</h2>
               <p className="text-muted-foreground mb-4">Start by adding a block.</p>
               <AddBlockPopover 
                  onSelectBlock={(type, content) => addBlock(type, content, 0)}
                  currentBlocks={[]}
                />
             </div>
           )}

          {sortedBlocks.length > 0 && (
            <div className="flex justify-center">
              <AddBlockPopover 
                onSelectBlock={(type, content) => addBlock(type, content, 0)}
                currentBlocks={sortedBlocks.map(b => b.type)}
              />
            </div>
          )}

          <SortableContext items={sortedBlocks.map(b => b.blockId)} strategy={verticalListSortingStrategy}>
            {sortedBlocks.map((block, index) => (
              <div key={block.blockId} className="space-y-4 group/add-block-area">
                <SortableItem id={block.blockId}>
                  <BlockCard blockType={block.type}>
                    {renderBlock(block)}
                  </BlockCard>
                </SortableItem>
                <div className="flex justify-center opacity-0 group-hover/add-block-area:opacity-100 transition-opacity duration-300 -my-2 py-2">
                   <AddBlockPopover 
                      onSelectBlock={(type, content) => addBlock(type, content, index + 1)}
                      currentBlocks={sortedBlocks.map(b => b.type)}
                   />
                </div>
              </div>
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
}
