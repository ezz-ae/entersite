'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageBuilder } from '@/components/page-builder';
import { EditorHeader } from '@/components/editor/header/editor-header';
import { LeftSidebar } from '@/components/editor/sidebar/left-sidebar';
import { RightSidebar } from '@/components/editor/sidebar/right-sidebar';
import { BuilderLandingPage } from '@/components/builder-landing-page';
import { SitePage, Block } from '@/lib/types';
import { Loader2 } from 'lucide-react';

const INITIAL_PAGE_STATE: SitePage = {
    id: 'new-site',
    title: 'Untitled Site',
    blocks: [],
    canonicalListings: [],
    brochureUrl: '',
    seo: {
        title: '',
        description: '',
        keywords: []
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

function BuilderContent() {
    const searchParams = useSearchParams();
    const initialPrompt = searchParams.get('prompt');
    const templateId = searchParams.get('template');

    const [isStarted, setIsStarted] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [page, setPage] = useState<SitePage>(INITIAL_PAGE_STATE);
    const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

    // Effect to handle initial prompt or template from URL
    useEffect(() => {
        if (initialPrompt) {
            handleStartWithAI(initialPrompt);
        } else if (templateId) {
            setIsStarted(true);
        }
    }, [initialPrompt, templateId]);

    const handleStartWithAI = async (prompt: string) => {
        setIsStarted(true);
        setIsGenerating(true);
        
        try {
            const response = await fetch('/api/ai/generate-site', {
                method: 'POST',
                body: JSON.stringify({ prompt }),
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                const data = await response.json();
                setPage(prev => ({ 
                    ...prev, 
                    title: data.pageTitle || 'AI Generated Site',
                    blocks: data.blocks.map((b: any, i: number) => ({
                        ...b,
                        blockId: `${b.type}-${i}-${Date.now()}`,
                        order: i
                    }))
                }));
            }
        } catch (error) {
            console.error("Failed to generate site:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    if (!isStarted) {
        return (
            <BuilderLandingPage 
                onStartWithAI={handleStartWithAI} 
                onChooseTemplate={() => setIsStarted(true)} 
            />
        );
    }

    return (
        <div className="h-screen w-screen flex flex-col bg-zinc-950 overflow-hidden">
            <EditorHeader page={page} />
            
            <div className="flex-1 flex overflow-hidden">
                <LeftSidebar page={page} onPageUpdate={setPage} />
                
                <main className="flex-1 overflow-y-auto bg-zinc-900/50 p-8 custom-scrollbar relative">
                    {isGenerating ? (
                        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse" />
                                <Loader2 className="h-16 w-16 text-blue-500 animate-spin mb-6 relative z-10" />
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter text-white mb-2">Architecting your vision...</h2>
                            <p className="text-zinc-400 text-lg max-w-md text-center">Our AI is sourcing real-time market data and building your blocks with precision.</p>
                        </div>
                    ) : null}
                    
                    <div className="max-w-5xl mx-auto">
                        <PageBuilder 
                            page={page} 
                            onPageUpdate={setPage}
                            selectedBlockId={selectedBlock?.blockId}
                            onSelectBlock={setSelectedBlock}
                        />
                    </div>
                </main>

                <RightSidebar 
                    selectedBlock={selectedBlock} 
                    onUpdateBlock={(newData) => {
                        if (selectedBlock) {
                            const updatedBlocks = page.blocks.map(b => 
                                b.blockId === selectedBlock.blockId ? { ...b, data: newData } : b
                            );
                            setPage({ ...page, blocks: updatedBlocks });
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default function BuilderPage() {
    return (
        <Suspense fallback={
            <div className="h-screen w-screen flex items-center justify-center bg-zinc-950">
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            </div>
        }>
            <BuilderContent />
        </Suspense>
    );
}
