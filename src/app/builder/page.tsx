'use client';

import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PageBuilder } from '@/components/page-builder';
import { EditorHeader } from '@/components/editor/header/editor-header';
import { LeftSidebar } from '@/components/editor/sidebar/left-sidebar';
import { RightSidebar } from '@/components/editor/sidebar/right-sidebar';
import { BuilderLandingPage } from '@/components/builder-landing-page';
import { PublishSuccessDialog } from '@/components/publish-success-dialog';
import { SeoSettingsDialog } from '@/components/seo-settings-dialog';
import { PageRenderer } from '@/components/page-renderer';
import { SitePage, Block } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { saveSite, getUserSites } from '@/lib/firestore-service';
import { useToast } from '@/hooks/use-toast';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { cn } from '@/lib/utils';

const INITIAL_PAGE_STATE: SitePage = {
    id: '',
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
    const router = useRouter();
    const initialPrompt = searchParams.get('prompt');
    const templateId = searchParams.get('template');
    const siteIdParam = searchParams.get('siteId');
    const { toast } = useToast();
    const [user] = useAuthState(getAuth());

    const [isStarted, setIsStarted] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [page, setPage] = useState<SitePage>(INITIAL_PAGE_STATE);
    const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
    const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
    const [isSeoDialogOpen, setIsSeoDialogOpen] = useState(false);
    const [isLoadingSite, setIsLoadingSite] = useState(false);
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    // Effect to handle loading an existing site
    useEffect(() => {
        if (siteIdParam && user) {
            loadSite(siteIdParam);
        } else if (initialPrompt) {
            handleStartWithAI(initialPrompt);
        } else if (templateId) {
            setIsStarted(true);
        }
    }, [siteIdParam, initialPrompt, templateId, user]);

    const loadSite = async (id: string) => {
        setIsLoadingSite(true);
        setIsStarted(true);
        try {
            const sites = await getUserSites(user!.uid);
            const found = sites.find(s => s.id === id);
            if (found) {
                setPage(found as SitePage);
            } else {
                toast({
                    title: "Site not found",
                    description: "We couldn't find the requested project.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error("Load failed:", error);
        } finally {
            setIsLoadingSite(false);
        }
    };

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
                    title: data.pageTitle || data.title || 'AI Generated Site',
                    blocks: data.blocks.map((b: any, i: number) => ({
                        ...b,
                        blockId: `\${b.type}-\${i}-\${Date.now()}`,
                        order: i
                    })),
                    seo: data.seo || prev.seo
                }));
            }
        } catch (error) {
            console.error("Failed to generate site:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        if (!user) {
            toast({
                title: "Authentication Required",
                description: "Please sign in to save your progress.",
                variant: "destructive"
            });
            return;
        }
        
        try {
            const savedSiteId = await saveSite(user.uid, page);
            if (!page.id) {
                setPage(prev => ({ ...prev, id: savedSiteId }));
                router.replace(`/builder?siteId=\${savedSiteId}`);
            }
            toast({
                title: "Site saved",
                description: "Your progress has been saved successfully.",
            });
        } catch (error) {
            console.error("Save failed:", error);
            toast({
                title: "Save failed",
                description: "There was an error saving your site.",
                variant: "destructive"
            });
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
        <div className="h-screen w-screen flex flex-col bg-zinc-950 overflow-hidden text-white">
            <EditorHeader 
                page={page} 
                onSave={handleSave}
                onPublish={() => setIsPublishDialogOpen(true)}
                onPreview={() => setIsPreviewMode(!isPreviewMode)}
                isPreviewMode={isPreviewMode}
            />
            
            <div className="flex-1 flex overflow-hidden">
                {!isPreviewMode && (
                    <LeftSidebar 
                        page={page} 
                        onPageUpdate={setPage} 
                        onOpenSeo={() => setIsSeoDialogOpen(true)}
                        selectedBlockId={selectedBlock?.blockId}
                        onSelectBlock={setSelectedBlock}
                    />
                )}
                
                <main className={cn(
                    "flex-1 overflow-y-auto custom-scrollbar relative transition-all duration-500",
                    isPreviewMode ? "bg-white p-0" : "bg-zinc-900/50 p-8"
                )}>
                    {(isGenerating || isLoadingSite) ? (
                        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse" />
                                <Loader2 className="h-16 w-16 text-blue-500 animate-spin mb-6 relative z-10" />
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter text-white mb-2">
                                {isGenerating ? "Architecting your vision..." : "Accessing system archives..."}
                            </h2>
                        </div>
                    ) : null}
                    
                    {isPreviewMode ? (
                        <div className="bg-white text-black min-h-full">
                            <PageRenderer page={page} />
                        </div>
                    ) : (
                        <div className="max-w-5xl mx-auto">
                            <PageBuilder 
                                page={page} 
                                onPageUpdate={setPage}
                                selectedBlockId={selectedBlock?.blockId}
                                onSelectBlock={setSelectedBlock}
                            />
                        </div>
                    )}
                </main>

                {!isPreviewMode && (
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
                )}
            </div>

            <PublishSuccessDialog 
                open={isPublishDialogOpen} 
                onOpenChange={setIsPublishDialogOpen} 
                page={page}
            />

            <SeoSettingsDialog 
                open={isSeoDialogOpen}
                onOpenChange={setIsSeoDialogOpen}
                page={page}
                onSave={(seoData) => {
                    setPage({ ...page, seo: seoData });
                    toast({ title: "SEO Settings Saved" });
                }}
            />
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
