'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ArrowRight, Building2, Map, Users, Zap, Layout, Upload, Target, Home, Key, Briefcase, Globe, X, Sparkles, SlidersHorizontal, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentChat } from './onboarding/agent-chat'; // Import the new chat component

interface OnboardingFlowProps {
  onComplete: (data: any) => void;
}

const SITE_TYPES = [
  { id: 'landing', icon: <Zap className="h-4 w-4" />, label: 'Landing Page' },
  { id: 'roadshow', icon: <GlobeIcon className="h-4 w-4" />, label: 'Roadshow' },
  { id: 'developer', icon: <Building2 className="h-4 w-4" />, label: 'Developer' },
  { id: 'partner', icon: <Users className="h-4 w-4" />, label: 'Partner' },
  { id: 'company', icon: <Layout className="h-4 w-4" />, label: 'Company' },
];

// Helper icon component
function GlobeIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" x2="22" y1="12" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    )
}

const LOCATIONS = [
  { id: 'dubai', label: 'Dubai' },
  { id: 'abudhabi', label: 'Abu Dhabi' },
  { id: 'sharjah', label: 'Sharjah' },
  { id: 'rasalkhaimah', label: 'Ras Al Khaimah' },
];

const BUSINESS_FOCUS = [
  { id: 'offplan', label: 'Off-Plan' },
  { id: 'secondary', label: 'Secondary' },
  { id: 'rent', label: 'Rentals' },
  { id: 'commercial', label: 'Commercial' },
];

const SUGGESTIONS = [
    "I want to build my real estate company website with listing all Dubai projects for the last 5 years, add pages about Dubai, all market avilibilty, and lead generation form.",
    "Luxury waterfront apartments in Dubai Marina with payment plan",
    "Villa community launch in Abu Dhabi with 50/50 payment plan",
    "Corporate website for a boutique real estate agency in Business Bay",
    "Landing page for Emaar off-plan investment with video tour"
];

const READY_TEMPLATES = [
    { id: 'template-dubai-luxury', title: "Dubai Luxury Collection", desc: "High-end portfolio for Jumeirah & Marina.", trend: "+12% Conv." },
    { id: 'template-emaar-launch', title: "Emaar Beachfront Launch", desc: "Conversion-focused page for new releases.", trend: "Popular" },
    { id: 'template-rak-invest', title: "RAK Casino Investment", desc: "Targeting investors for Wynn Resort area.", trend: "New" },
];

const RECENT_SITES = [
    { id: 'site-1', title: "Elysian Heights Launch", date: "2 hours ago" },
    { id: 'site-2', title: "My Agency Website", date: "1 day ago" },
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [prompt, setPrompt] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isChatMode, setIsChatMode] = useState(false); // New state to toggle chat view
  
  const [selections, setSelections] = useState<Record<string, any>>({
      'site-type': 'landing',
      'location': ['dubai'],
      'business-focus': ['offplan'],
      'brand-logo': null
  });

  useEffect(() => {
      if (prompt.length > 2) {
          const matched = SUGGESTIONS.filter(s => s.toLowerCase().includes(prompt.toLowerCase()));
          setSuggestions(matched.slice(0, 3));
      } else {
          setSuggestions([]);
      }
  }, [prompt]);

  const handleSuggestionClick = (text: string) => {
      setPrompt(text);
      setSuggestions([]);
  };
  
  const handleTemplateClick = (templateId: string) => {
      onComplete({
          method: 'template',
          templateId: templateId
      });
  }

  const handleSelection = (key: string, value: any, multi = false) => {
      if (multi) {
          const current = selections[key] || [];
          const updated = current.includes(value) 
              ? current.filter((item: any) => item !== value)
              : [...current, value];
          setSelections(prev => ({ ...prev, [key]: updated }));
      } else {
          setSelections(prev => ({ ...prev, [key]: value }));
      }
  };

  const handleGenerate = () => {
      // Switch to chat mode instead of completing immediately
      setIsChatMode(true);
  };
  
  const handleAgentCompletion = (config: any) => {
      // Merge manual selections with agent config
      onComplete({
          method: 'agent',
          'user-prompt': prompt,
          ...selections,
          ...config // Config from Dialogflow/Vertex
      });
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-5xl relative grid lg:grid-cols-[1fr_300px] gap-6">
        
        {/* Main Prompt Card */}
        <Card className="border-0 shadow-2xl bg-card overflow-hidden flex flex-col justify-center min-h-[600px] relative">
            <div className="p-8 md:p-12 h-full flex flex-col">
                
                {isChatMode ? (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        className="flex-1 flex flex-col items-center justify-center h-full w-full"
                     >
                        <div className="w-full max-w-2xl">
                            <AgentChat 
                                initialPrompt={prompt} 
                                onSiteConfigReady={handleAgentCompletion}
                            />
                        </div>
                     </motion.div>
                ) : (
                    <>
                        <div className="text-center space-y-4 mb-8">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/5 rounded-2xl text-primary mb-2 animate-in zoom-in duration-500">
                                <Sparkles className="h-7 w-7" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Build your vision.</h1>
                            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                                Describe your ideal real estate site, and our AI Agent will architect it with you.
                            </p>
                        </div>

                        <div className="relative group max-w-2xl mx-auto w-full mb-auto">
                            <div className="relative">
                                <Textarea 
                                    placeholder="e.g. I want to build my real estate company website with listing all Dubai projects for the last 5 years..." 
                                    className="min-h-[140px] text-lg p-6 pr-32 resize-none shadow-sm border-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all rounded-2xl bg-muted/20"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                />
                                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                                    <Button 
                                        size="sm" 
                                        variant={showFilters ? "secondary" : "ghost"}
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="h-9 gap-2 text-xs font-medium rounded-lg"
                                    >
                                        <SlidersHorizontal className="h-3.5 w-3.5" />
                                        {showFilters ? "Hide Options" : "Options"}
                                    </Button>
                                </div>
                            </div>

                            {/* Auto-complete Suggestions */}
                            {suggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-xl shadow-lg z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 max-h-[300px] overflow-y-auto">
                                    {suggestions.map((s, i) => (
                                        <div 
                                            key={i} 
                                            className="p-3 hover:bg-accent cursor-pointer text-sm flex items-start gap-2"
                                            onClick={() => handleSuggestionClick(s)}
                                        >
                                            <Search className="h-3 w-3 mt-1 text-muted-foreground shrink-0" />
                                            <span className="line-clamp-2">{s}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mega Filters Section */}
                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden max-w-2xl mx-auto w-full mb-6"
                                >
                                    <Tabs defaultValue="type" className="w-full bg-muted/20 p-1 rounded-xl">
                                        <TabsList className="w-full justify-start bg-transparent p-0 h-auto gap-2 overflow-x-auto no-scrollbar">
                                            <TabsTrigger value="type" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Type</TabsTrigger>
                                            <TabsTrigger value="location" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Location</TabsTrigger>
                                            <TabsTrigger value="focus" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Focus</TabsTrigger>
                                            <TabsTrigger value="brand" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">Brand</TabsTrigger>
                                        </TabsList>
                                        
                                        <div className="p-4 bg-background mt-2 rounded-lg border shadow-sm">
                                            <TabsContent value="type" className="mt-0 grid grid-cols-2 gap-2">
                                                {SITE_TYPES.map(t => (
                                                    <div 
                                                        key={t.id} 
                                                        onClick={() => handleSelection('site-type', t.id)}
                                                        className={cn(
                                                            "cursor-pointer p-3 rounded-md border text-sm font-medium transition-all flex items-center gap-2",
                                                            selections['site-type'] === t.id ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"
                                                        )}
                                                    >
                                                        {t.icon}
                                                        {t.label}
                                                    </div>
                                                ))}
                                            </TabsContent>
                                            
                                            <TabsContent value="location" className="mt-0 grid grid-cols-2 gap-2">
                                                {LOCATIONS.map(l => (
                                                    <div 
                                                        key={l.id} 
                                                        onClick={() => handleSelection('location', l.id, true)}
                                                        className={cn(
                                                            "cursor-pointer p-3 rounded-md border text-center text-sm font-medium transition-all",
                                                            selections['location'].includes(l.id) ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"
                                                        )}
                                                    >
                                                        {l.label}
                                                    </div>
                                                ))}
                                            </TabsContent>

                                            <TabsContent value="focus" className="mt-0 grid grid-cols-2 gap-2">
                                                {BUSINESS_FOCUS.map(f => (
                                                    <div 
                                                        key={f.id} 
                                                        onClick={() => handleSelection('business-focus', f.id, true)}
                                                        className={cn(
                                                            "cursor-pointer p-3 rounded-md border text-center text-sm font-medium transition-all",
                                                            selections['business-focus'].includes(f.id) ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"
                                                        )}
                                                    >
                                                        {f.label}
                                                    </div>
                                                ))}
                                            </TabsContent>

                                            <TabsContent value="brand" className="mt-0">
                                                <div className="space-y-3">
                                                    <Label>Upload Logo</Label>
                                                    <ImageUploader 
                                                        label="Upload"
                                                        className="h-32"
                                                        initialImage={selections['brand-logo']}
                                                        onImageChange={(url) => handleSelection('brand-logo', url)}
                                                    />
                                                </div>
                                            </TabsContent>
                                        </div>
                                    </Tabs>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex items-center justify-center pt-4">
                            <Button 
                                size="lg" 
                                onClick={handleGenerate} 
                                className="w-full max-w-xs h-14 text-lg font-semibold shadow-xl rounded-xl transition-transform hover:scale-[1.02]"
                                disabled={prompt.length < 5 && !showFilters}
                            >
                                <Sparkles className="mr-2 h-5 w-5" />
                                Start Conversation
                            </Button>
                        </div>
                    </>
                )}

            </div>
        </Card>

        {/* Sidebar: History & Trending */}
        <div className="space-y-6 hidden lg:block">
            {/* Recent */}
            <Card className="border-0 shadow-xl bg-card p-5 h-[280px]">
                <div className="flex items-center gap-2 font-semibold mb-4 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Recent Projects</span>
                </div>
                <div className="space-y-3">
                    {RECENT_SITES.map((site) => (
                        <div key={site.id} className="p-3 rounded-xl bg-muted/40 hover:bg-muted transition-colors cursor-pointer group">
                            <h4 className="font-medium text-sm group-hover:text-primary transition-colors">{site.title}</h4>
                            <p className="text-xs text-muted-foreground">{site.date}</p>
                        </div>
                    ))}
                    <Button variant="ghost" className="w-full text-xs text-muted-foreground mt-2">View All</Button>
                </div>
            </Card>

            {/* Trending Templates */}
            <Card className="border-0 shadow-xl bg-primary text-primary-foreground p-5 h-[300px]">
                <div className="flex items-center gap-2 font-semibold mb-4 text-white/80">
                    <TrendingUp className="h-4 w-4" />
                    <span>Market Trends</span>
                </div>
                <div className="space-y-3">
                    {READY_TEMPLATES.map((template) => (
                        <div 
                            key={template.id} 
                            onClick={() => handleTemplateClick(template.id)}
                            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border border-white/5 group"
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-medium text-sm">{template.title}</h4>
                                <Badge variant="secondary" className="text-[10px] h-5 bg-white text-black hover:bg-white">{template.trend}</Badge>
                            </div>
                            <p className="text-xs text-white/60 line-clamp-2 group-hover:text-white/90 transition-colors">{template.desc}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>

      </div>
    </div>
  );
}

    