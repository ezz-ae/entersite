'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, AlignLeft, Type, Image as ImageIcon } from 'lucide-react';
import type { Block } from '@/lib/types';

interface InspectorPanelProps {
  selectedBlock: Block | null;
  onUpdateBlock: (blockId: string, newData: any) => void;
  onClose: () => void;
}

export function InspectorPanel({ selectedBlock, onUpdateBlock, onClose }: InspectorPanelProps) {
  if (!selectedBlock) return null;

  const handleChange = (key: string, value: any) => {
    onUpdateBlock(selectedBlock.blockId, { ...selectedBlock.data, [key]: value });
  };

  return (
    <div className="w-80 border-l bg-background h-full flex flex-col z-20 shadow-[-10px_0_30px_-10px_rgba(0,0,0,0.1)]">
      <div className="h-14 border-b flex items-center justify-between px-4 flex-shrink-0">
        <h3 className="font-semibold text-sm uppercase tracking-wider">
            {selectedBlock.type.replace('-', ' ')}
        </h3>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
            
            {/* Content Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <Type className="h-3 w-3" /> Content
                </div>
                
                <div className="space-y-3">
                    <div className="space-y-1">
                        <Label htmlFor="headline" className="text-xs">Headline</Label>
                        <Input 
                            id="headline" 
                            value={selectedBlock.data.headline || ''} 
                            onChange={(e) => handleChange('headline', e.target.value)}
                            className="bg-muted/50"
                        />
                    </div>
                    
                    <div className="space-y-1">
                        <Label htmlFor="subtext" className="text-xs">Subtext</Label>
                        <Textarea 
                            id="subtext" 
                            value={selectedBlock.data.subtext || ''} 
                            onChange={(e) => handleChange('subtext', e.target.value)}
                            className="bg-muted/50 min-h-[80px] text-xs leading-relaxed resize-none"
                        />
                    </div>

                    {(selectedBlock.data.ctaText !== undefined) && (
                        <div className="space-y-1">
                            <Label htmlFor="ctaText" className="text-xs">Button Text</Label>
                            <Input 
                                id="ctaText" 
                                value={selectedBlock.data.ctaText || ''} 
                                onChange={(e) => handleChange('ctaText', e.target.value)}
                                className="bg-muted/50"
                            />
                        </div>
                    )}
                </div>
            </div>

            <Separator />

            {/* Media Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <ImageIcon className="h-3 w-3" /> Media
                </div>
                
                <div className="p-4 border-2 border-dashed rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer text-center">
                    <div className="mx-auto w-8 h-8 rounded-full bg-muted flex items-center justify-center mb-2">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">Click to upload image</p>
                </div>
            </div>

            <Separator />

            {/* Layout Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <AlignLeft className="h-3 w-3" /> Layout
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 border rounded text-center text-xs hover:bg-muted cursor-pointer">Left</div>
                    <div className="p-2 border rounded text-center text-xs hover:bg-muted cursor-pointer bg-muted/50 font-medium">Center</div>
                </div>
            </div>

        </div>
      </ScrollArea>
    </div>
  );
}
