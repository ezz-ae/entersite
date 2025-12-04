
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SiteTemplate, availableTemplates } from '@/lib/templates';
import { PageRenderer } from "@/components/page-renderer";
import type { SitePage, Block } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';
import { verifyAndFetchAssets } from '@/lib/media-scraper';

// Components
import { EditorHeader } from '@/components/editor/editor-header';
import { SidebarNav } from '@/components/editor/sidebar/sidebar-nav';
import { InspectorPanel } from '@/components/editor/inspector/inspector-panel';
import { ThemePanel } from '@/components/editor/sidebar/theme-panel';
import { PageBuilder } from '@/components/page-builder';
import { PublishSuccessDialog } from '@/components/publish-success-dialog';
import { OnboardingFlow } from '@/components/onboarding-flow';
import { generateSiteFromAgentResponse } from '@/lib/ai-orchestration';

function useTemplateFromUrl() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  
  if (!templateId) return null;

  const template = availableTemplates.find(t => t.id === templateId);
  return template || null;
}


export default function BuilderPage() {
  const initialTemplate = useTemplateFromUrl();
  const [siteTemplate, setSiteTemplate] = useState<SiteTemplate | null>(initialTemplate);
  
  // App State
  const [pages, setPages] = useState<SitePage[]>(initialTemplate?.pages || []);
  const [activePageId, setActivePageId] = useState<string>(initialTemplate?.pages[0]?.id || '');
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  
  // UI State
  const [activeView, setActiveView] = useState<string | null>(null); 
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState('100%'); 

  const { setBrandColor } = useTheme();

  const activePage = pages.find(p => p.id === activePageId);
  const selectedBlock = activePage?.blocks.find(b => b.blockId === selectedBlockId) || null;

  // --- Handlers ---
  
  const handleOnboardingComplete = (agentData: any) => {
    // This can handle both a simple prompt and a complex agent response
    const promptText = agentData.prompt || '';
    const isTemplateRequest = availableTemplates.some(t => promptText.toLowerCase().includes(t.name.toLowerCase()));
    
    let newTemplate;

    if (isTemplateRequest) {
        newTemplate = availableTemplates.find(t => promptText.toLowerCase().includes(t.name.toLowerCase())) || generateSiteFromAgentResponse(agentData);
    } else {
        newTemplate = generateSiteFromAgentResponse(agentData);
    }
    
    setSiteTemplate(newTemplate);
    setPages(newTemplate.pages);
    setActivePageId(newTemplate.pages[0]?.id || '');
    
    if (agentData.brandColor) {
        setBrandColor(agentData.brandColor);
    }
  };

  const handlePageUpdate = (updatedPage: SitePage) => {
    setPages(pages.map(p => p.id === updatedPage.id ? updatedPage : p));
  };

  const handleBlockUpdate = (blockId: string, newData: any) => {
      if (!activePage) return;
      const updatedBlocks = activePage.blocks.map(b => 
          b.blockId === blockId ? { ...b, data: newData } : b
      );
      handlePageUpdate({ ...activePage, blocks: updatedBlocks });
  };

  const handleSelectBlock = (block: Block | null) => {
      setSelectedBlockId(block?.blockId || null);
      if (block) setActiveView(null);
  };

  const handleViewChange = (view: string) => {
      if (activeView === view) {
          setActiveView(null);
      } else {
          setActiveView(view);
          setSelectedBlockId(null);
      }
  }
  
  const handleDeviceChange = (device: 'desktop' | 'tablet' | 'mobile') => {
      if (device === 'mobile') setCanvasWidth('375px');
      else if (device === 'tablet') setCanvasWidth('768px');
      else setCanvasWidth('100%');
  }

  // --- Render ---

  if (!siteTemplate) {
      return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  if (isPreviewMode && activePage) {
     return (
         <div className="flex flex-col min-h-screen bg-background text-foreground">
             <div className="fixed top-4 right-4 z-50 flex gap-2">
                 <Button onClick={() => setShowPublishDialog(true)} className="shadow-lg gap-2 bg-green-600 hover:bg-green-700 text-white">
                     Publish Live
                 </Button>
                 <Button onClick={() => setIsPreviewMode(false)} variant="secondary" className="shadow-lg">
                     Back to Editor
                 </Button>
             </div>
             <PageRenderer page={activePage} />
             
             {activePage && (
                <PublishSuccessDialog 
                    open={showPublishDialog} 
                    onOpenChange={setShowPublishDialog} 
                    page={activePage}
                />
             )}
         </div>
     )
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden font-sans">
      
      <EditorHeader 
        onPreview={() => setIsPreviewMode(true)}
        onPublish={() => setShowPublishDialog(true)}
        onDeviceChange={handleDeviceChange}
      />

      <div className="flex-1 flex overflow-hidden relative">
        
        <SidebarNav activeView={activeView || ''} setActiveView={handleViewChange} />

        {activeView === 'theme' && (
            <ThemePanel onClose={() => setActiveView(null)} />
        )}

        <main className="flex-1 relative bg-muted/20 overflow-y-auto transition-all duration-300 flex justify-center">
            <div 
                className="min-h-full py-12 px-8 transition-all duration-500 ease-in-out"
                style={{ width: canvasWidth }}
            >
                <div className={cn(
                    "bg-background shadow-sm border rounded-xl min-h-[800px] relative transition-all duration-300",
                    canvasWidth !== '100%' ? "shadow-2xl border-zinc-200 dark:border-zinc-800 overflow-hidden" : ""
                )}>
                    {activePage && (
                        <PageBuilder 
                            key={activePage.id} 
                            page={activePage} 
                            onPageUpdate={handlePageUpdate} 
                            selectedBlockId={selectedBlockId}
                            onSelectBlock={handleSelectBlock}
                        />
                    )}
                </div>
            </div>
        </main>

        {selectedBlock && (
            <InspectorPanel 
                selectedBlock={selectedBlock} 
                onUpdateBlock={handleBlockUpdate}
                onClose={() => setSelectedBlockId(null)}
            />
        )}

      </div>
      
      {activePage && (
        <PublishSuccessDialog 
            open={showPublishDialog} 
            onOpenChange={setShowPublishDialog} 
            page={activePage}
        />
      )}
    </div>
  );
}
