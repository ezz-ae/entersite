'use client';

import React, { useState, useEffect } from 'react';
import type { Block } from '@/lib/types';
import { getBlockConfig } from '@/lib/blocks';
import { Button } from '@/components/ui/button';
import { X, Bot } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageUploader } from '@/components/ui/image-uploader';

interface InspectorPanelProps {
  selectedBlock: Block;
  onUpdateBlock: (blockId: string, newData: any) => void;
  onClose: () => void;
}

export function InspectorPanel({ 
  selectedBlock, 
  onUpdateBlock,
  onClose
}: InspectorPanelProps) {
  const [blockData, setBlockData] = useState(selectedBlock.data);
  const config = getBlockConfig(selectedBlock.type);

  useEffect(() => {
    setBlockData(selectedBlock.data);
  }, [selectedBlock]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...blockData, [name]: value };
    setBlockData(updatedData);
    onUpdateBlock(selectedBlock.blockId, updatedData);
  };
  
  const handleImageChange = (name: string, url: string) => {
      const updatedData = { ...blockData, [name]: url };
      setBlockData(updatedData);
      onUpdateBlock(selectedBlock.blockId, updatedData);
  }

  if (!config) {
    return (
      <div className="p-4 text-sm text-zinc-400">No configuration available for this block.</div>
    );
  }

  const renderField = (field: any) => {
    const value = blockData[field.name] || '';
    
    switch (field.type) {
      case 'text':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="text-xs font-medium text-zinc-400">{field.label}</Label>
            <Input 
              type="text"
              id={field.name} 
              name={field.name} 
              value={value} 
              onChange={handleInputChange} 
              className="bg-zinc-800 border-zinc-700 h-9"
            />
          </div>
        );
      case 'textarea':
         return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="text-xs font-medium text-zinc-400">{field.label}</Label>
            <Textarea 
              id={field.name} 
              name={field.name} 
              value={value} 
              onChange={handleInputChange} 
              className="bg-zinc-800 border-zinc-700"
            />
          </div>
        );
      case 'image':
        return (
            <div key={field.name} className="space-y-2">
                <Label className="text-xs font-medium text-zinc-400">{field.label}</Label>
                <ImageUploader id={field.name} currentImage={value} onUpload={(url) => handleImageChange(field.name, url)} />
            </div>
        )
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 h-16">
            <div>
                <h3 className="font-bold text-lg text-white capitalize">{selectedBlock.type}</h3>
                <p className="text-xs text-zinc-400">Editing element</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-white/10">
                <X className="h-4 w-4" />
            </Button>
        </div>

        {/* Fields */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {config.fields.map(renderField)}
        </div>
        
        {/* AI Actions */}
        <div className="p-4 border-t border-white/10">
            <Button variant="outline" className="w-full border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 gap-2">
                <Bot className="h-4 w-4" />
                Rewrite with AI
            </Button>
        </div>
    </div>
  );
}
