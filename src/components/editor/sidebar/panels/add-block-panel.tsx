'use client';

import React from 'react';
import { availableBlocks } from '@/lib/blocks';
import { Button } from '@/components/ui/button';
import { Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function AddBlockPanel() {
    const categories = Array.from(new Set(availableBlocks.map(b => b.category)));

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-white/10">
                <h3 className="font-bold text-lg text-white">Add Elements</h3>
                <p className="text-xs text-zinc-400">Drag & drop blocks onto your canvas.</p>
            </div>

            <div className="p-2 border-b border-white/10">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input placeholder="Search blocks..." className="pl-9 bg-zinc-800 border-none h-10" />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-purple-500/10">
                        <Sparkles className="h-5 w-5 text-purple-400" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
                {categories.map(category => (
                    <div key={category} className="mb-4">
                        <h4 className="px-2 py-1 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            {category}
                        </h4>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                            {availableBlocks.filter(b => b.category === category).map(block => (
                                <div 
                                    key={block.type}
                                    className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 cursor-grab transition-colors flex flex-col items-center justify-center text-center aspect-square"
                                    draggable
                                    onDragStart={(e) => {
                                        e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'block', blockType: block.type }));
                                    }}
                                >
                                    <block.icon className="h-6 w-6 mb-2 text-zinc-300" />
                                    <p className="text-xs font-medium text-white">{block.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
