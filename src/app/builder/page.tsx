'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { SitePage, Block, SiteTemplate } from '@/lib/types';
import { cn } from '@/lib/utils';

// Major Components
import { OnboardingFlow } from '@/components/onboarding-flow';
import { EditorHeader } from '@/components/editor/editor-header';
import { LeftSidebar } from '@/components/editor/sidebar/left-sidebar';
import { EditorCanvas } from '@/components/editor/canvas/editor-canvas';
import { RightSidebar } from '@/components/editor/inspector/right-sidebar';
import { PageRenderer } from '@/components/page-renderer';
import { PublishSuccessDialog } from '@/components/publish-success-dialog';

// UI Components
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Hooks & Services
import { useTheme } from '@/components/theme-provider';
import { useProject } from '@/hooks/use-project';
import { handleOnboarding } from '@/lib/onboarding-handler';


export default function BuilderPage() {
  const searchParams = useSearchParams();
  const { setBrandColor } = useTheme();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Core application state
  const {
    pages, setPages,
    activePageId, setActivePageId,
    selectedBlockId, setSelectedBlockId,
    currentTemplate, setCurrentTemplate,
    activePage, selectedBlock
  } = useProject();

  // UI State
  const [leftSidebarView, setLeftSidebarView] = useState<string | null>('navigator');
  const [rightSidebarView, setRightSidebarView] = useState<string | null>('inspector');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState('100%');

  // Effect to handle initial template loading from URL
  useEffect(() => {
    const templateId = searchParams.get('template');
    if (templateId) {
      // Here you would typically fetch the template from a service
      // For now, let's assume it's handled by a hook or context
      console.log(`Loading template: ${templateId}`);
      setShowOnboarding(false);
    }
  }, [searchParams]);

  const handleOnboardingComplete = async (data: any) => {
    setIsLoading(true);
    try {
      const template = await handleOnboarding(data, setBrandColor);
      if (template) {
        setCurrentTemplate(template);
        setPages(template.pages);
        setActivePageId(template.pages[0]?.id || '');
      } 
    } catch (error) {
      console.error("Onboarding failed:", error);
      // Handle error state appropriately
    } finally {
      setIsLoading(false);
      setShowOnboarding(false);
    }
  };

  const handlePageUpdate = (updatedPage: SitePage) => {
    setPages(pages.map(p => p.id === updatedPage.id ? updatedPage : p));
  };

  const handleBlockUpdate = (blockId: string, newData: any) => {
    if (!activePage) return;
    const updatedBlocks = activePage.blocks.map(b => 
        b.blockId === blockId ? { ...b, data: { ...b.data, ...newData } } : b
    );
    handlePageUpdate({ ...activePage, blocks: updatedBlocks });
  };

  const handleSelectBlock = (block: Block | null) => {
    setSelectedBlockId(block?.blockId || null);
    if (block) {
        setLeftSidebarView(null); // Close left panel to focus on inspector
        setRightSidebarView('inspector');
    }
  };

  // --- Render Logic ---

  if (showOnboarding || isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-zinc-950">
        {isLoading 
          ? <LoadingSpinner text="Building your AI site..." /> 
          : <OnboardingFlow onComplete={handleOnboardingComplete} />
        }
      </div>
    )
  }

  if (isPreviewMode && activePage) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <div className="fixed top-4 right-4 z-[100] flex gap-2">
          <Button onClick={() => setShowPublishDialog(true)} className="shadow-lg gap-2 bg-green-600 hover:bg-green-700 text-white">
            Publish Live
          </Button>
          <Button onClick={() => setIsPreviewMode(false)} variant="secondary" className="shadow-lg bg-black/50 text-white hover:bg-black/80">
            Back to Editor
          </Button>
        </div>
        <PageRenderer page={activePage} />
        <PublishSuccessDialog open={showPublishDialog} onOpenChange={setShowPublishDialog} page={activePage}/>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-zinc-950 text-white font-sans flex flex-col">
        {/* Main Editor Layout: Header, Body */}
        
        <EditorHeader 
            onPreview={() => setIsPreviewMode(true)}
            onPublish={() => setShowPublishDialog(true)}
            onDeviceChange={setCanvasWidth}
            activePage={activePage}
        />
        
        <main className="flex-1 flex overflow-hidden">
            
            {/* Left Sidebar: Navigator, Blocks, Themes */}
            <LeftSidebar 
                activeView={leftSidebarView}
                setActiveView={setLeftSidebarView}
                pages={pages}
                activePageId={activePageId}
                setActivePageId={setActivePageId}
                selectedBlockId={selectedBlockId}
                onSelectBlock={handleSelectBlock}
            />

            {/* Center Canvas: The Website Preview */}
            <EditorCanvas 
                width={canvasWidth}
                page={activePage}
                selectedBlockId={selectedBlockId}
                onSelectBlock={handleSelectBlock}
                onPageUpdate={handlePageUpdate}
            />

            {/* Right Sidebar: Inspector for the selected block */}
            <RightSidebar
                view={rightSidebarView}
                setView={setRightSidebarView}
                selectedBlock={selectedBlock}
                onUpdateBlock={handleBlockUpdate}
                onClose={() => setSelectedBlockId(null)}
            />

        </main>

        {activePage && (
          <PublishSuccessDialog open={showPublishDialog} onOpenChange={setShowPublishDialog} page={activePage}/>
        )}
    </div>
  );
}
