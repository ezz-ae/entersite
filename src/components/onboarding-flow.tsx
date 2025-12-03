'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ArrowRight, Building2, Map, Users, Zap, Layout, Search, Clock, TrendingUp, Sparkles, SlidersHorizontal, ChevronRight, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    { id: 'trending-1', title: "Dubai Luxury Launch", desc: "High-conversion template for premium off-plan projects.", trend: "+12% Conv." },
    { id: 'trending-2', title: "Agent Portfolio Minimal", desc: "Clean, personal branding for top-performing agents.", trend: "Popular" },
    { id: 'trending-3', title: "Investment Hub", desc: "Data-heavy layout with ROI calculators and market stats.", trend: "New" },
];

const RECENT_SITES = [
    { id: 'site-1', title: "Elysian Heights Launch", date: "2 hours ago" },
    { id: 'site-2', title: "My Agency Website", date: "1 day ago" },
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [prompt, setPrompt] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
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
      onComplete({
          method: 'prompt',
          'user-prompt': prompt,
          ...selections
      });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-black text-foreground flex flex-col font-sans selection:bg-black/10 dark:selection:bg-white/20">
      
      {/* Navbar Placeholder */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-[1600px] mx-auto w-full">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black">
                  <Layout className="h-5 w-5" />
              </div>
              EntreSite
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <span className="hover:text-foreground cursor-pointer transition-colors">Templates</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Showcase</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Pricing</span>
              <div className="w-px h-4 bg-border"></div>
              <span className="hover:text-foreground cursor-pointer transition-colors">Login</span>
          </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-[1fr_320px] gap-12 items-start">
            
            {/* Left Column: The Builder Interface */}
            <div className="space-y-8">
                <div className="space-y-2">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black dark:text-white leading-[1.1]">
                        Build your <br />
                        <span className="text-black/40 dark:text-white/40">digital empire.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-lg leading-relaxed pt-4">
                        Describe your dream real estate platform, and our AI will architect it pixel-perfectly in seconds.
                    </p>
                </div>

                <div className="relative group max-w-3xl w-full pt-8">
                    <div className="relative bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl shadow-black/5 dark:shadow-white/5 border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-xl">
                        <div className="p-1">
                            <Textarea 
                                placeholder="Describe your site (e.g. Luxury villa launch in Palm Jumeirah...)" 
                                className="min-h-[160px] text-xl p-6 resize-none border-0 focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground/50 leading-relaxed"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                        </div>
                        
                        <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-border/50 bg-muted/20">
                             <div className="flex gap-2">
                                <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={cn("h-9 gap-2 text-xs font-medium rounded-full border border-transparent hover:border-border hover:bg-white dark:hover:bg-zinc-800 transition-all", showFilters && "bg-white border-border shadow-sm")}
                                >
                                    <SlidersHorizontal className="h-3.5 w-3.5" />
                                    {showFilters ? "Less Options" : "Refine"}
                                </Button>
                                <Button size="sm" variant="ghost" className="h-9 w-9 rounded-full hover:bg-white dark:hover:bg-zinc-800 border border-transparent hover:border-border">
                                    <Upload className="h-4 w-4" />
                                </Button>
                             </div>

                             <Button 
                                size="lg" 
                                onClick={handleGenerate} 
                                className="h-12 px-8 rounded-full text-base font-semibold shadow-xl bg-black hover:bg-black/80 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
                                disabled={prompt.length < 5 && !showFilters}
                            >
                                <Sparkles className="mr-2 h-4 w-4" />
                                Create Site
                            </Button>
                        </div>
                    </div>

                    {/* Auto-complete Suggestions */}
                    <AnimatePresence>
                    {suggestions.length > 0 && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-4 right-4 mt-2 bg-white dark:bg-zinc-900 border rounded-2xl shadow-2xl z-20 overflow-hidden"
                        >
                            {suggestions.map((s, i) => (
                                <div 
                                    key={i} 
                                    className="p-4 hover:bg-muted/50 cursor-pointer text-sm flex items-start gap-3 transition-colors border-b last:border-0 border-border/50"
                                    onClick={() => handleSuggestionClick(s)}
                                >
                                    <div className="mt-0.5 bg-primary/10 p-1 rounded">
                                        <Command className="h-3 w-3 text-primary" />
                                    </div>
                                    <span className="line-clamp-1 font-medium">{s}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>

                {/* Mega Filters Section */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden w-full max-w-3xl"
                        >
                            <Tabs defaultValue="type" className="w-full">
                                <TabsList className="w-full justify-start bg-transparent p-0 h-auto gap-4 mb-4">
                                    <TabsTrigger value="type" className="rounded-full border bg-white dark:bg-zinc-900 px-4 py-2 data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black transition-all">Type</TabsTrigger>
                                    <TabsTrigger value="location" className="rounded-full border bg-white dark:bg-zinc-900 px-4 py-2 data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black transition-all">Location</TabsTrigger>
                                    <TabsTrigger value="brand" className="rounded-full border bg-white dark:bg-zinc-900 px-4 py-2 data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black transition-all">Brand</TabsTrigger>
                                </TabsList>
                                
                                <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border shadow-sm">
                                    <TabsContent value="type" className="mt-0 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {SITE_TYPES.map(t => (
                                            <div 
                                                key={t.id} 
                                                onClick={() => handleSelection('site-type', t.id)}
                                                className={cn(
                                                    "cursor-pointer p-4 rounded-xl border-2 text-sm font-semibold transition-all flex flex-col items-center gap-3 text-center hover:bg-muted/50",
                                                    selections['site-type'] === t.id ? "border-black bg-black/5 dark:border-white dark:bg-white/10" : "border-transparent bg-muted/30"
                                                )}
                                            >
                                                {t.icon}
                                                {t.label}
                                            </div>
                                        ))}
                                    </TabsContent>
                                    
                                    <TabsContent value="location" className="mt-0 grid grid-cols-2 gap-3">
                                        {LOCATIONS.map(l => (
                                            <div 
                                                key={l.id} 
                                                onClick={() => handleSelection('location', l.id, true)}
                                                className={cn(
                                                    "cursor-pointer p-4 rounded-xl border-2 text-center text-sm font-semibold transition-all hover:bg-muted/50",
                                                    selections['location'].includes(l.id) ? "border-black bg-black/5 dark:border-white dark:bg-white/10" : "border-transparent bg-muted/30"
                                                )}
                                            >
                                                {l.label}
                                            </div>
                                        ))}
                                    </TabsContent>

                                    <TabsContent value="brand" className="mt-0">
                                        <div className="space-y-4">
                                            <Label>Upload Logo</Label>
                                            <ImageUploader 
                                                label="Drop your logo here"
                                                className="h-40 rounded-2xl border-2 border-dashed hover:border-black dark:hover:border-white transition-colors"
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
            </div>

            {/* Right Column: Inspiration */}
            <div className="space-y-8 pt-8 lg:pt-0">
                
                {/* Recent Projects */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-muted-foreground uppercase tracking-wider text-xs">Your Projects</span>
                        <Button variant="link" className="h-auto p-0 text-xs text-black dark:text-white">View All</Button>
                    </div>
                    <div className="space-y-3">
                        {RECENT_SITES.map((site) => (
                            <div key={site.id} className="group p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-border/50 shadow-sm hover:shadow-md hover:border-black/10 dark:hover:border-white/10 transition-all cursor-pointer flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">{site.title}</h4>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                        <Clock className="h-3 w-3" /> {site.date}
                                    </p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                                    <ChevronRight className="h-4 w-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Templates */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-muted-foreground uppercase tracking-wider text-xs">Trending Templates</span>
                    </div>
                    <div className="space-y-3">
                        {READY_TEMPLATES.map((template) => (
                            <div key={template.id} className="group p-4 rounded-2xl bg-gradient-to-br from-black to-zinc-800 text-white shadow-lg cursor-pointer hover:scale-[1.02] transition-transform">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-sm">{template.title}</h4>
                                    <Badge variant="secondary" className="text-[10px] h-5 bg-white/20 text-white border-0 hover:bg-white/30 backdrop-blur-sm">{template.trend}</Badge>
                                </div>
                                <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">{template.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
      </main>
    </div>
  );
}
