'use client';

import { useState } from 'react';
import { OnboardingFlow } from '@/components/onboarding-flow';
import type { SitePage, Block } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';
import { availableTemplates, SiteTemplate, fullCompanyTemplate, roadshowTemplate, developerFocusTemplate, partnerLaunchTemplate, adsQuickLaunchTemplate } from '@/lib/templates';

// Components
import { EditorHeader } from '@/components/editor/editor-header';
import { SidebarNav } from '@/components/editor/sidebar/sidebar-nav';
import { InspectorPanel } from '@/components/editor/inspector/inspector-panel';
import { ThemePanel } from '@/components/editor/sidebar/theme-panel'; // New
import { PageBuilder } from '@/components/page-builder';
import { PageRenderer } from '@/components/page-renderer';
import { PublishSuccessDialog } from '@/components/publish-success-dialog';

export default function BuilderPage() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  
  // App State
  const [currentTemplate, setCurrentTemplate] = useState<SiteTemplate>(availableTemplates[0]);
  const [pages, setPages] = useState<SitePage[]>(currentTemplate.pages);
  const [activePageId, setActivePageId] = useState<string>(currentTemplate.pages[0].id);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  
  // UI State
  const [activeView, setActiveView] = useState<string | null>(null); // Controls left panel
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState('100%'); // For device preview

  const { setBrandColor } = useTheme();

  const activePage = pages.find(p => p.id === activePageId);
  const selectedBlock = activePage?.blocks.find(b => b.blockId === selectedBlockId) || null;

  // --- Handlers ---

  const handleTemplateChange = (template: SiteTemplate) => {
    setCurrentTemplate(template);
    setPages(template.pages);
    setActivePageId(template.pages[0]?.id || '');
  };

  const handleOnboardingComplete = (data: any) => {
      if (data['brand-color']) {
          setBrandColor(data['brand-color']);
      }

      if (data.method === 'prompt') {
          console.log("Prompt:", data['user-prompt']);
          handleTemplateChange(fullCompanyTemplate);
      } else {
          let selectedTemplate = availableTemplates[0];
          if (data['site-type'] === 'roadshow') selectedTemplate = roadshowTemplate;
          else if (data['site-type'] === 'developer') selectedTemplate = developerFocusTemplate;
          else if (data['site-type'] === 'partner') selectedTemplate = partnerLaunchTemplate;
          else if (data['site-type'] === 'company') selectedTemplate = fullCompanyTemplate;
          else if (data['site-type'] === 'landing') selectedTemplate = adsQuickLaunchTemplate;

          handleTemplateChange(selectedTemplate);
      }
      setShowOnboarding(false);
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
      // Close other panels when selecting a block to focus on inspector
      if (block) setActiveView(null);
  };

  const handleViewChange = (view: string) => {
      // Toggle view
      if (activeView === view) {
          setActiveView(null);
      } else {
          setActiveView(view);
          // Deselect block to focus on left panel
          setSelectedBlockId(null);
      }
  }
  
  const handleDeviceChange = (device: 'desktop' | 'tablet' | 'mobile') => {
      if (device === 'mobile') setCanvasWidth('375px');
      else if (device === 'tablet') setCanvasWidth('768px');
      else setCanvasWidth('100%');
  }

  // --- Render ---

  if (showOnboarding) {
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
      
      {/* 1. Top Header */}
      <EditorHeader 
        onPreview={() => setIsPreviewMode(true)}
        onPublish={() => setShowPublishDialog(true)}
        onDeviceChange={handleDeviceChange}
      />

      <div className="flex-1 flex overflow-hidden relative">
        
        {/* 2. Left Sidebar (Navigator) */}
        <SidebarNav activeView={activeView || ''} setActiveView={handleViewChange} />

        {/* 2.5 Left Panels (Slide out) */}
        {activeView === 'theme' && (
            <ThemePanel onClose={() => setActiveView(null)} />
        )}

        {/* 3. Center Canvas (Artboard) */}
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

        {/* 4. Right Sidebar (Inspector) */}
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
