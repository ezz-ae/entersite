'use client';

import React from 'react';
import type { SitePage, Block } from '@/lib/types';
import { cn } from '@/lib/utils';
import { PageBuilder } from '@/components/page-builder';
import { AnimatePresence, motion } from 'framer-motion';

interface EditorCanvasProps {
    width: string;
    page: SitePage | undefined;
    selectedBlockId: string | null;
    onSelectBlock: (block: Block | null) => void;
    onPageUpdate: (page: SitePage) => void;
}

export function EditorCanvas({ 
    width, 
    page, 
    selectedBlockId, 
    onSelectBlock,
    onPageUpdate
}: EditorCanvasProps) {

    return (
        <main className="flex-1 relative bg-zinc-950 overflow-y-auto flex justify-center" style={{ backgroundImage: 'url(/grid.svg)' }}>
            <AnimatePresence>
                <motion.div
                    key={width} // Animate when width changes
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="min-h-full py-12 px-2 sm:px-8 transition-all duration-300 ease-in-out w-full flex justify-center"
                >
                    <div 
                        className="transition-all duration-500 ease-in-out flex-shrink-0"
                        style={{ width: width }}
                    >
                        <div className={cn(
                            "bg-background shadow-lg rounded-xl min-h-[800px] relative transition-all duration-300",
                             width !== '100%' ? "shadow-2xl border-4 border-zinc-700 overflow-hidden mx-auto" : "border border-transparent"
                        )}>
                            {page && (
                                <PageBuilder 
                                    key={page.id} 
                                    page={page} 
                                    onPageUpdate={onPageUpdate} 
                                    selectedBlockId={selectedBlockId}
                                    onSelectBlock={onSelectBlock}
                                />
                            )}
                        </div>
                         <p className="text-center text-xs text-zinc-500 mt-4">Live Preview Canvas</p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </main>
    );
}
