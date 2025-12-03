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
import { availableTemplates, SiteTemplate, roadshowTemplate, developerFocusTemplate, partnerLaunchTemplate, fullCompanyTemplate, adsQuickLaunchTemplate } from '@/lib/templates';
import { OnboardingFlow } from '@/components/onboarding-flow';
import { SeoSettingsDialog } from '@/components/seo-settings-dialog';
import { PublishSuccessDialog } from '@/components/publish-success-dialog';
import type { SitePage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';


export default function BuilderPage() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentTemplate, setCurrentTemplate] = useState<SiteTemplate>(availableTemplates[0]);
  const [pages, setPages] = useState<SitePage[]>(currentTemplate.pages);
  const [activePageId, setActivePageId] = useState<string>(currentTemplate.pages[0].id);
  const [openTemplateSelector, setOpenTemplateSelector] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  // New Dialog States
  const [showSeoDialog, setShowSeoDialog] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  
  const { setBrandColor } = useTheme();

  const activePage = pages.find(p => p.id === activePageId);

  const handleTemplateChange = (template: SiteTemplate) => {
    setCurrentTemplate(template);
    setPages(template.pages);
    setActivePageId(template.pages[0]?.id || '');
    setOpenTemplateSelector(false);
  };

  const handleOnboardingComplete = (data: any) => {
      // Apply the selected brand color immediately
      if (data['brand-color']) {
          setBrandColor(data['brand-color']);
      }

      // Logic to handle AI Prompt vs. Wizard
      if (data.method === 'prompt') {
          // In a real app, this would call an AI endpoint to generate the template structure
          console.log("Generating site from prompt:", data['user-prompt']);
          
          // For now, simulate by picking a complex template
          handleTemplateChange(fullCompanyTemplate);
      } else {
          // Logic for Wizard selections
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

  const addPage = () => {
    const newPage: SitePage = {
      id: `page-${Date.now()}`,
      title: 'New Page',
      blocks: [],
      canonicalListings: [],
      brochureUrl: '',
      seo: { title: 'New Page', description: '', keywords: [] },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPages([...pages, newPage]);
    setActivePageId(newPage.id);
  };

  const handlePageUpdate = (updatedPage: SitePage) => {
    setPages(pages.map(p => p.id === updatedPage.id ? updatedPage : p));
  };
  
  const handleSeoUpdate = (seoData: SitePage['seo']) => {
      if (activePage) {
          handlePageUpdate({
              ...activePage,
              seo: seoData
          });
      }
  }


  if (showOnboarding) {
      return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  if (isPreviewMode && activePage) {
     return (
         <div className="flex flex-col min-h-screen">
             <div className="fixed top-4 right-4 z-50 flex gap-2">
                 <Button onClick={() => setShowPublishDialog(true)} className="shadow-lg gap-2 bg-green-600 hover:bg-green-700 text-white">
                     <Rocket className="h-4 w-4" />
                     Publish Live
                 </Button>
                 <Button onClick={() => setIsPreviewMode(false)} variant="secondary" className="shadow-lg">
                     <Edit3 className="mr-2 h-4 w-4" />
                     Back to Editor
                 </Button>
             </div>
             <PageRenderer page={activePage} />
             
             <PublishSuccessDialog 
                open={showPublishDialog} 
                onOpenChange={setShowPublishDialog} 
                page={activePage}
             />
         </div>
     )
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/40 transition-colors duration-500">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 font-semibold">
             <EntreSiteLogo className="h-6 w-6" />
             <span>EntreSite AI</span>
           </div>
           <Popover open={openTemplateSelector} onOpenChange={setOpenTemplateSelector}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openTemplateSelector}
                    className="w-[250px] justify-between"
                  >
                    {currentTemplate.name}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {availableTemplates.map((template) => (
                          <CommandItem
                            key={template.id}
                            onSelect={() => handleTemplateChange(template)}
                          >
                            {template.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold tracking-tight hidden md:block">{activePage?.title}</h1>
        </div>
        <div className="flex items-center gap-3">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <LayoutGrid className="h-5 w-5" />
                <span className="sr-only">Manage Pages</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{currentTemplate.name} Pages</SheetTitle>
              </SheetHeader>
              <div className="py-4 space-y-2">
                {pages.map(page => (
                  <div
                    key={page.id}
                    onClick={() => setActivePageId(page.id)}
                    className={cn(
                      "p-3 rounded-md cursor-pointer transition-colors",
                      activePageId === page.id ? "bg-primary text-primary-foreground" : "hover:bg-accent/80"
                    )}
                  >
                    <p className="font-medium">{page.title}</p>
                  </div>
                ))}
              </div>
               <Button onClick={addPage} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Page
               </Button>
            </SheetContent>
          </Sheet>
          
          <Button variant="outline" size="icon" onClick={() => setShowSeoDialog(true)} title="SEO Settings">
              <Settings className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={() => setIsPreviewMode(true)} title="Preview Site">
              <Eye className="h-5 w-5" />
          </Button>
          
          <Button 
            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
            onClick={() => setShowPublishDialog(true)}
          >
              <Rocket className="h-4 w-4" />
              Publish
          </Button>
          <UserNav />
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
         {activePage && <PageBuilder key={activePage.id} page={activePage} onPageUpdate={handlePageUpdate} />}
      </main>

      {/* Global Dialogs */}
      {activePage && (
          <SeoSettingsDialog 
            open={showSeoDialog} 
            onOpenChange={setShowSeoDialog} 
            page={activePage} 
            onSave={handleSeoUpdate} 
          />
      )}
      
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
