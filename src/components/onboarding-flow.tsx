'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Wand2, Briefcase, Zap, User, Search, Pyramid, TrendingUp, Sparkles } from "lucide-react";
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';

interface OnboardingFlowProps {
  onComplete: (data: any) => void;
}

const promptCategories = [
    {
        id: 'company-hub',
        name: 'Company Hub',
        description: 'Full websites for agencies and brokerages.',
        prompts: [
            { 
                title: 'Describe Your Vision', 
                description: 'Use our AI Architect to refine your idea, choose a style, and generate the perfect site structure.', 
                isFreeform: true 
            },
            { title: 'Full Company Site', description: 'Build a complete website with listings, agent profiles, and contact pages.', prompt: 'Build me a full company website with listings, agents, and contact pages.' },
            { title: 'Corporate Site with Insights', description: 'A corporate real estate website with project portfolios and market insights.', prompt: 'Create a corporate real estate website with project portfolios and market insights.' },
            { title: 'Brokerage-Style Site', description: 'A professional site for a brokerage featuring projects and an interactive map.', prompt: 'I want a brokerage-style site with featured projects and a map.' },
            { title: 'Luxury Property Agency', description: 'A premium website tailored for a luxury property agency.', prompt: 'I want a website for a luxury property agency.' },
            { title: 'Bilingual Website (EN/AR)', description: 'Make a bilingual real estate company website (English + Arabic).', prompt: 'Make a bilingual real estate company website (English + Arabic).' },
            { title: 'Investment Consultancy Site', description: 'Create a site that positions my company as a premium investment consultant.', prompt: 'Create a site that positions my company as a premium investment consultant.' },
        ]
    },
    {
        id: 'project-launchpad',
        name: 'Project Launchpad',
        description: 'High-conversion landing pages.',
        prompts: [
            { title: 'High-Conversion Landing Page', description: 'Create a landing page for a new launch project, optimized for lead capture.', prompt: 'Create a high-conversion landing page for a new launch project.' },
            { title: 'Launch with Countdown', description: 'A project launch page featuring a countdown timer and lead form.', prompt: 'Make a project launch page with countdown timer and lead form.' },
            { title: 'Roadshow Event Page', description: 'Build a page for a roadshow with RSVP and event details.', prompt: 'Build a roadshow launch page with RSVP and event details.' },
            { title: 'Full Launch Microsite', description: 'Create a new project launch page with gallery, map, payment plan, and CTA.', prompt: 'Create a new project launch page with gallery, map, payment plan, and CTA.' }
        ]
    },
    {
        id: 'agent-portfolio',
        name: 'Agent Portfolio',
        description: 'Personal sites for agents & freelancers.',
        prompts: [
            { title: 'Personal Agent Portfolio', description: 'Create a personal portfolio site to showcase your profile and listings.', prompt: 'Create a personal portfolio site for a real estate agent.' },
            { title: 'Modern Agent Site', description: 'A contemporary website with featured listings and a prominent WhatsApp contact.', prompt: 'Make a modern agent website with featured listings and WhatsApp contact.' },
            { title: 'Social Media Landing Page', description: 'A one-page site perfect for linking from your social media profiles.', prompt: 'I want a social media-driven personal landing page for real estate.' },
            { title: 'Team Showcase', description: 'Build a sleek personal brand site for me with testimonials and listings.', prompt: 'Build a sleek personal brand site for me with testimonials and listings.' },
        ]
    },
    {
        id: 'listing-sites',
        name: 'Listing Sites',
        description: 'Map, Grid, and Search-based sites.',
        prompts: [
            { title: 'Map-Based Search', description: 'Build a full real estate website centered around an interactive map with filters.', prompt: 'Build a map-based real estate website with filters.' },
            { title: 'Listings Marketplace', description: 'Create a directory-style site to showcase all your available properties.', prompt: 'Create a listings marketplace using my available properties.' },
            { title: 'Single Property Showcase', description: 'A focused landing page to maximize leads for one specific, high-end property.', prompt: 'Create a landing page for one property only — maximize leads.' },
        ]
    },
    {
        id: 'developer-pages',
        name: 'Developer Pages',
        description: 'Showcase portfolios and brands.',
        prompts: [
            { title: 'Developer Portfolio', description: 'Build a website for a developer showcasing all their past, current, and future projects.', prompt: 'Build a website for a developer showcasing all their projects.' },
            { title: 'Co-Branded Launch Page', description: 'Create a collaborative launch page for a developer and broker partnership.', prompt: 'Create a co-branded launch page for developer + broker partnership.' },
        ]
    },
    {
        id: 'lead-gen',
        name: 'Lead Funnels',
        description: 'Funnels optimized for conversion.',
        prompts: [
            { title: 'Google Ads Funnel', description: 'A high-performance funnel page optimized for paid Google Ads traffic.', prompt: 'Build a funnel page optimized for Google Ads.' },
            { title: 'WhatsApp-Only Landing Page', description: 'A minimal, fast-loading page with the sole goal of starting a WhatsApp conversation.', prompt: 'Create a WhatsApp-only landing page with minimal content.' },
            { title: 'Brochure Download Funnel', description: 'A funnel designed to capture leads in exchange for a project brochure download.', prompt: 'Make a brochure-download funnel.' },
            { title: 'RSVP Funnel for Events', description: 'Create a registration funnel for a roadshow or developer launch event.', prompt: 'Create an RSVP funnel for a roadshow event.' }
        ]
    },
     {
        id: 'branding-prompts',
        name: 'Branding',
        description: 'Prompts based on brand themes.',
        prompts: [
            { title: 'Luxury Black & Gold', description: 'Generate a site with a black and gold, luxury-style theme.', prompt: 'Make my site black and gold, luxury-style.' },
            { title: 'Minimalist White & Grey', description: 'Build a site in minimalist white with soft grey tones.', prompt: 'Build a site in minimalist white with soft grey tones.' },
            { title: 'Bold & Colorful', description: 'Create a bold, colorful website with high-energy visuals.', prompt: 'Create a bold, colorful website with high-energy visuals.' },
            { title: 'Apple-Inspired Design', description: 'Make a site inspired by Apple’s clean design.', prompt: 'Make a site inspired by Apple’s clean design.' }
        ]
    },
    {
        id: 'advanced-prompts',
        name: 'Advanced',
        description: 'Prompts for power users.',
        prompts: [
            { title: 'Live Chat Layout', description: 'Generate a site with listings on the left and a live chat on the right.', prompt: 'Generate a site with listings on the left and a live chat on the right.' },
            { title: 'Custom Block Sequence', description: 'Create a landing page using a specific block sequence.', prompt: 'Create a landing page using block sequence: hero -> listing -> gallery -> form.' },
            { title: 'WhatsApp Automation', description: 'Build a multi-step lead capture flow with WhatsApp automation.', prompt: 'Build a multi-step lead capture flow with WhatsApp automation.' }
        ]
    },
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [activeTab, setActiveTab] = useState('company-hub');
  const [showFreeform, setShowFreeform] = useState(false);
  const [freeformPrompt, setFreeformPrompt] = useState('');

  const handlePresetClick = (prompt: string) => {
    onComplete({
      method: 'prompt',
      'user-prompt': prompt,
    });
  };

  const handleFreeformSubmit = () => {
    if (!freeformPrompt.trim()) return;
    onComplete({
        method: 'prompt',
        'user-prompt': freeformPrompt,
    });
  };
  
  if (showFreeform) {
    return (
      <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl mx-auto"
        >
          <div className="relative bg-card border rounded-2xl shadow-2xl p-4 group transition-all duration-300 focus-within:ring-2 focus-within:ring-primary">
            <Textarea
              placeholder="e.g., A luxury real estate site with a video hero, featured listings, and a simple lead form."
              className="min-h-[120px] text-lg p-4 resize-none border-0 focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground/50"
              value={freeformPrompt}
              onChange={(e) => setFreeformPrompt(e.target.value)}
              autoFocus
            />
            <div className="absolute bottom-4 right-4">
              <Button 
                size="lg" 
                className="h-12 px-6 rounded-full text-base font-semibold shadow-lg hover:scale-105 transition-transform" 
                disabled={!freeformPrompt.trim()}
                onClick={handleFreeformSubmit}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Site
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Describe your vision in detail. Press <kbd className="px-1.5 py-0.5 border bg-muted rounded font-mono text-[10px]">Enter</kbd> to generate.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4 my-12">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">How would you like to start?</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose a starting point, or describe your vision to our AI architect.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-7xl">
        <div className="flex justify-center mb-8">
            <TabsList className="h-auto p-1.5 bg-muted/50 space-x-1 rounded-xl">
                {promptCategories.map(cat => (
                    <TabsTrigger 
                        key={cat.id} 
                        value={cat.id} 
                        className="px-4 py-2 text-sm font-semibold flex items-center gap-2 rounded-lg"
                    >
                        {cat.name}
                    </TabsTrigger>
                ))}
            </TabsList>
        </div>

        <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
            >
                {promptCategories.map(cat => (
                    <TabsContent key={cat.id} value={cat.id}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {cat.prompts.map((p, i) => {
                                if (p.isFreeform) {
                                    return (
                                        <motion.div
                                            key="freeform"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="md:col-span-2 lg:col-span-2 xl:col-span-2 bg-card border rounded-2xl p-6 text-left flex flex-col justify-between shadow-2xl relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-transparent cursor-pointer group"
                                            onClick={() => setShowFreeform(true)}
                                        >
                                             <div className="absolute -inset-px bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-lg" />
                                             <div className="relative z-10 flex flex-col h-full">
                                                <div className="flex-grow">
                                                    <h3 className="font-bold text-lg text-foreground mb-2">{p.title}</h3>
                                                </div>
                                                <div className="mt-8 flex justify-end">
                                                    <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                                        <ArrowRight className="h-5 w-5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                }
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-card border rounded-2xl p-6 text-left flex flex-col justify-between shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full group relative overflow-hidden"
                                        onClick={() => p.prompt && handlePresetClick(p.prompt)}
                                    >
                                        <div className="absolute -inset-px bg-gradient-to-r from-orange-400/20 via-red-500/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="relative z-10 flex flex-col h-full">
                                          <div className="flex-grow">
                                              <h3 className="font-bold text-lg text-foreground mb-2">{p.title}</h3>
                                              <p className="text-sm text-muted-foreground">{p.description}</p>
                                          </div>
                                          <div className="mt-8 flex justify-end">
                                              <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
                                                  <ArrowRight className="h-4 w-4" />
                                              </div>
                                          </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </TabsContent>
                ))}
            </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
