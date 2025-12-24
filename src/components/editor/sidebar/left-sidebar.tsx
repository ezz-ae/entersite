'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Layers, Paintbrush, Plus, SidebarClose, SidebarOpen, FileText } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { NavigatorPanel } from './panels/navigator-panel';
import { ThemePanel } from './panels/theme-panel';
import { AddBlockPanel } from './panels/add-block-panel';

import type { SitePage, Block } from '@/lib/types';

interface LeftSidebarProps {
    page: SitePage;
    onPageUpdate: (page: SitePage) => void;
}

export function LeftSidebar({
    page,
    onPageUpdate
}: LeftSidebarProps) {
    const [activeView, setActiveView] = useState<string | null>('navigator');
    
    const handleViewChange = (view: string) => {
        setActiveView(activeView === view ? null : view);
    };

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
            <AnimatePresence mode="wait">
            {activeView && (
                <motion.div 
                    key={activeView}
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="w-72 bg-zinc-900 border-r border-white/10 shadow-2xl flex flex-col"
                >
                    {activeView === 'navigator' && (
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-4 border-b border-white/5 bg-zinc-950/30">
                                <h3 className="font-bold text-sm text-zinc-100 uppercase tracking-widest flex items-center gap-2">
                                    <Layers className="h-4 w-4 text-blue-500" />
                                    Layer Map
                                </h3>
                            </div>
                            <div className="p-2">
                                {page.blocks.map((block, i) => (
                                    <div key={block.blockId} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white cursor-pointer group transition-colors">
                                        <div className="text-[10px] font-mono opacity-30">{i + 1}</div>
                                        <div className="capitalize text-sm font-medium">{block.type.replace('-', ' ')}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeView === 'add' && (
                         <div className="flex-1 overflow-y-auto">
                            <div className="p-4 border-b border-white/5 bg-zinc-950/30">
                                <h3 className="font-bold text-sm text-zinc-100 uppercase tracking-widest">Add Content</h3>
                            </div>
                            <div className="p-4">
                                <p className="text-xs text-zinc-500 mb-4">Drag and drop or click to add blocks to your page.</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {['Hero', 'Listings', 'Features', 'Gallery', 'Testimonials', 'FAQ', 'Contact'].map(type => (
                                        <div key={type} className="p-4 rounded-xl bg-zinc-800/50 border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 cursor-pointer transition-all">
                                            <span className="text-sm font-bold text-zinc-300">{type}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                         </div>
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
        className={cn(
            "p-3 rounded-xl w-12 h-12 transition-all duration-200 relative group",
            isActive 
                ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                : "text-zinc-500 hover:bg-white/5 hover:text-white"
        )}
    >
        <Icon className="h-5 w-5 mx-auto" />
        <div className="absolute left-full ml-3 px-2 py-1 bg-black text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
            {label}
        </div>
    </button>
)
