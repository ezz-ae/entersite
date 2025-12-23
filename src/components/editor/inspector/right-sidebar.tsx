'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { InspectorPanel } from './inspector-panel';
import { SidebarClose, SidebarOpen, Settings } from 'lucide-react';
import type { Block } from '@/lib/types';
import { cn } from '@/lib/utils';

interface RightSidebarProps {
    view: string | null;
    setView: (view: string | null) => void;
    selectedBlock: Block | null;
    onUpdateBlock: (blockId: string, newData: any) => void;
    onClose: () => void;
}

export function RightSidebar({ view, setView, selectedBlock, onUpdateBlock, onClose }: RightSidebarProps) {
    
    const handleToggle = () => {
        setView(view ? null : 'inspector');
    };

    return (
        <div className="flex h-full bg-zinc-900 transition-all duration-300">
            <AnimatePresence>
                {(view && selectedBlock) && (
                     <motion.div 
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="w-80 bg-zinc-900 border-l border-white/10 shadow-2xl"
                    >
                        <InspectorPanel 
                            key={selectedBlock.blockId} // Force re-mount on block change
                            selectedBlock={selectedBlock} 
                            onUpdateBlock={onUpdateBlock}
                            onClose={onClose}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Collapsed Bar */}
             <div className="w-16 flex-shrink-0 flex flex-col items-center justify-between py-4 bg-zinc-950 border-l border-white/5">
                <div className="flex flex-col items-center gap-2">
                    {selectedBlock && (
                        <SidebarButton 
                            label="Inspector" 
                            icon={Settings} 
                            isActive={view === 'inspector'} 
                            onClick={handleToggle} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

const SidebarButton = ({ label, icon: Icon, isActive, onClick }: any) => (
    <button 
        onClick={onClick} 
        aria-label={label}
        data-tooltip-id="editor-tooltip"
        data-tooltip-content={label}
        className={cn(
            "p-3 rounded-lg w-full transition-colors duration-200 relative",
            isActive 
                ? "bg-blue-600 text-white"
                : "text-zinc-400 hover:bg-white/10 hover:text-white"
        )}
    >
        <Icon className="h-5 w-5 mx-auto" />
    </button>
);
