'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { LayoutGrid, Layers, Paintbrush, Plus, SidebarClose, SidebarOpen } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Panel Imports
import { NavigatorPanel } from './panels/navigator-panel';
import { ThemePanel } from './panels/theme-panel';
import { AddBlockPanel } from './panels/add-block-panel';

import type { SitePage, Block } from '@/lib/types';

interface LeftSidebarProps {
    activeView: string | null;
    setActiveView: (view: string | null) => void;
    pages: SitePage[];
    activePageId: string;
    setActivePageId: (id: string) => void;
    selectedBlockId: string | null;
    onSelectBlock: (block: Block | null) => void;
}

export function LeftSidebar({
    activeView,
    setActiveView,
    pages,
    activePageId,
    setActivePageId,
    selectedBlockId,
    onSelectBlock
}: LeftSidebarProps) {
    
    const handleViewChange = (view: string) => {
        setActiveView(activeView === view ? null : view);
    };

    const activePage = pages.find(p => p.id === activePageId);

    return (
        <div className="flex h-full bg-zinc-900 transition-all duration-300">
            
            {/* Main Icon Navbar */}
            <div className="w-16 flex-shrink-0 flex flex-col items-center justify-between py-4 bg-zinc-950 border-r border-white/5">
                <div className="flex flex-col items-center gap-2">
                    <SidebarButton 
                        label="Navigator" 
                        icon={Layers} 
                        isActive={activeView === 'navigator'} 
                        onClick={() => handleViewChange('navigator')} 
                    />
                    <SidebarButton 
                        label="Add Blocks" 
                        icon={Plus} 
                        isActive={activeView === 'add'} 
                        onClick={() => handleViewChange('add')} 
                    />
                    <SidebarButton 
                        label="Theme" 
                        icon={Paintbrush} 
                        isActive={activeView === 'theme'} 
                        onClick={() => handleViewChange('theme')} 
                    />
                </div>
                <SidebarButton 
                    label={activeView ? "Close Panel" : "Open Panel"}
                    icon={activeView ? SidebarClose : SidebarOpen}
                    onClick={() => setActiveView(null)}
                />
            </div>

            {/* Sliding Panel Content */}
            <AnimatePresence>
            {activeView && (
                <motion.div 
                    key={activeView} // Ensures re-render on view change
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '-100%', opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="w-72 bg-zinc-900 border-r border-white/10 shadow-2xl"
                >
                    {activeView === 'navigator' && activePage && (
                        <NavigatorPanel 
                            pages={pages}
                            activePage={activePage}
                            onPageChange={setActivePageId}
                            selectedBlockId={selectedBlockId}
                            onSelectBlock={onSelectBlock}
                        />
                    )}
                    {activeView === 'add' && (
                        <AddBlockPanel />
                    )}
                    {activeView === 'theme' && (
                        <ThemePanel onClose={() => setActiveView(null)} />
                    )}
                </motion.div>
            )}
            </AnimatePresence>
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
)
