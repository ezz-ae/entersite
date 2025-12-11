'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { EntreSiteLogo } from "@/components/icons";
import { PageBuilder } from "@/components/page-builder";
import { PageRenderer } from "@/components/page-renderer";
import { LayoutGrid, Plus, ChevronsUpDown, Eye, Edit3, Settings, Rocket } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { availableTemplates, SiteTemplate, fullCompanyTemplate, roadshowTemplate, developerFocusTemplate, partnerLaunchTemplate, adsQuickLaunchTemplate, luxuryAgentTemplate, offPlanSpecialistTemplate, internationalBuyerTemplate, whatsappLeadTemplate } from '@/lib/templates';
import { OnboardingFlow } from '@/components/onboarding-flow';
import { SeoSettingsDialog } from '@/components/seo-settings-dialog';
import { PublishSuccessDialog } from '@/components/publish-success-dialog';
import type { SitePage, Block } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';
import { verifyAndFetchAssets } from '@/lib/media-scraper';
import { searchProjects } from '@/lib/project-service';

// Components
import { EditorHeader } from '@/components/editor/editor-header';
import { SidebarNav } from '@/components/editor/sidebar/sidebar-nav';
import { InspectorPanel } from '@/components/editor/inspector/inspector-panel';
import { ThemePanel } from '@/components/editor/sidebar/theme-panel';

export default function BuilderPage() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  
  // App State
  const [currentTemplate, setCurrentTemplate] = useState<SiteTemplate>(availableTemplates[0]);
  const [pages, setPages] = useState<SitePage[]>(currentTemplate.pages);
  const [activePageId, setActivePageId] = useState<string>(currentTemplate.pages[0].id);
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

  const handleTemplateChange = (template: SiteTemplate) => {
    setCurrentTemplate(template);
    setPages(template.pages);
    setActivePageId(template.pages[0]?.id || '');
  };

  const handleOnboardingComplete = async (data: any) => {
      if (data['brand-color']) {
          setBrandColor(data['brand-color']);
      }

      // --- THE BRAIN: Translating User Intent into a Site Structure ---
      if (data.method === 'prompt' || data.method === 'agent') {
          const prompt = (data['user-prompt'] || "").toLowerCase();
          console.log("Analyzing prompt for Deep Build:", prompt);
          
          // 1. Identify Project/Developer Context
          let targetProject = null;
          let targetDeveloper = null;
          
          // Try to find a real project match in our 3750 database
          const projectResults = await searchProjects(prompt);
          if (projectResults.length > 0) {
              // Exact or close match found
              targetProject = projectResults[0];
              targetDeveloper = targetProject.developer;
          } else {
             // Fallback: Check for developer keywords if no specific project found
             if (prompt.includes('emaar')) targetDeveloper = "Emaar Properties";
             if (prompt.includes('damac')) targetDeveloper = "Damac Properties";
             if (prompt.includes('nakheel')) targetDeveloper = "Nakheel";
             if (prompt.includes('sobha')) targetDeveloper = "Sobha Realty";
          }

          // 2. Fetch Assets (The Librarian Agent)
          // We pass the project name OR developer name to get the best visual match
          const assets = await verifyAndFetchAssets(targetProject?.name || targetDeveloper || prompt);

          // 3. Construct Dynamic Blocks based on Intent
          const dynamicBlocks: any[] = [];
          let order = 0;

          // -- Hero Selection --
          const heroData = {
               headline: targetProject ? `Exclusive Offers at ${targetProject.name}` : (data.pageTitle || "Discover Luxury Living"),
               subtext: targetProject ? `Prices starting from ${targetProject.price.label}. Handover ${targetProject.deliveryYear}.` : "Your trusted partner for premium real estate investments.",
               backgroundImage: assets.heroImages[0],
               ctaText: prompt.includes('whatsapp') ? "WhatsApp Us" : "Register Interest"
          };

          if (prompt.includes('launch') || (targetProject && targetProject.status === 'Pipeline')) {
              dynamicBlocks.push({ type: 'launch-hero', order: order++, data: heroData });
          } else {
              dynamicBlocks.push({ type: 'hero', order: order++, data: heroData });
          }

          // -- Core Content --
          
          // If specific project, show Details & Gallery
          if (targetProject) {
              dynamicBlocks.push({ 
                  type: 'project-detail', 
                  order: order++, 
                  data: {
                      projectName: targetProject.name,
                      developer: targetProject.developer,
                      description: targetProject.description.full,
                      imageUrl: assets.galleryImages[0], // Use a different image if available
                      stats: [
                          { label: "Starting Price", value: targetProject.price.label },
                          { label: "Handover", value: targetProject.deliveryYear.toString() },
                          { label: "Type", value: "Luxury Residences" } // Mock type if missing
                      ]
                  } 
              });
              
              dynamicBlocks.push({ type: 'gallery', order: order++, data: { images: assets.galleryImages, headline: `Inside ${targetProject.name}` } });
              dynamicBlocks.push({ type: 'floor-plan', order: order++, data: {} });
              dynamicBlocks.push({ type: 'payment-plan', order: order++, data: {} });
          } 
          // If Developer/General, show Listing Grid
          else {
               const filter = targetDeveloper ? { developer: targetDeveloper } : {};
               dynamicBlocks.push({ 
                   type: 'listing-grid', 
                   order: order++, 
                   data: { 
                       headline: targetDeveloper ? `Latest from ${targetDeveloper}` : "Featured Projects",
                       // We pass the filter so the block knows what to fetch
                       initialFilter: filter 
                   } 
               });
               dynamicBlocks.push({ type: 'developers-list', order: order++, data: {} });
          }

          // -- Tools & Conversion --
          
          if (prompt.includes('invest') || prompt.includes('roi')) {
              dynamicBlocks.push({ type: 'roi-calculator', order: order++, data: {} });
          }
          
          // Map is always good for real estate
          dynamicBlocks.push({ type: 'map', order: order++, data: { headline: targetProject ? "Prime Location" : "Explore Our Projects" } });

          // Contact
          if (prompt.includes('whatsapp') || data.siteType === 'whatsapp_only') {
               // Floating widget is added via template, but we can also add a CTA section
               dynamicBlocks.push({ type: 'cta-grid', order: order++, data: { headline: "Connect Instantly" } });
          } else {
               dynamicBlocks.push({ type: 'cta-form', order: order++, data: { headline: "Register Your Interest" } });
          }
          
          // Always add Chat Widget for AI agent
          dynamicBlocks.push({ type: 'chat-widget', order: order++, data: { welcomeMessage: targetProject ? `Hi! Ask me anything about ${targetProject.name}.` : "Hi! How can I help you find a property?" } });


          // 4. Assemble the Template
          const customTemplate: SiteTemplate = {
              id: `ai-gen-${Date.now()}`,
              name: targetProject ? targetProject.name : 'AI Custom Build',
              siteType: 'custom',
              pages: [{
                  id: 'home',
                  title: 'Home',
                  blocks: dynamicBlocks.map((b, i) => ({
                      blockId: `ai-block-${i}`,
                      type: b.type,
                      order: b.order,
                      data: b.data
                  })),
                  canonicalListings: [],
                  brochureUrl: assets.brochureUrl || "",
                  seo: { 
                      title: targetProject ? `${targetProject.name} | Official Launch` : "Real Estate Portfolio", 
                      description: "Generated by EntreSite AI", 
                      keywords: [] 
                  },
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString()
              }]
          };

          handleTemplateChange(customTemplate);
      } else {
          // Standard Wizard Flow (Fallback)
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
