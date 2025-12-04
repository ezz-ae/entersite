'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Bot, Building, Layout, Play, User, Zap, X, Sparkles, Wand2, Briefcase, Search, Filter, Pyramid, TrendingUp } from "lucide-react";
import { SiteTemplate } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentChat } from './onboarding/agent-chat';

interface OnboardingFlowProps {
  onComplete: (data: any) => void;
}

const promptCategories = [
    {
        id: 'ai-native',
        name: 'Build with AI',
        icon: <Wand2 className="h-4 w-4" />,
        description: 'Describe your vision in plain text.',
        prompts: [
            {
                title: 'Start with a conversation',
                description: 'Use our AI Architect to refine your idea, choose a style, and generate the perfect site structure.',
                isFreeform: true,
            },
        ]
    },
    {
        id: 'company-hub',
        name: 'Company Hub',
        icon: <Briefcase className="h-4 w-4" />,
        description: 'Full websites for agencies and brokerages.',
        prompts: [
            {
                title: 'Full Company Site',
                description: 'Build a complete website with listings, agent profiles, and contact pages.',
                prompt: 'Build me a full company website with listings, agents, and contact pages.'
            },
            {
                title: 'Corporate Site with Insights',
                description: 'A corporate real estate website with project portfolios and market insights.',
                prompt: 'Create a corporate real estate website with project portfolios and market insights.'
            },
            {
                title: 'Brokerage-Style Site',
                description: 'A professional site for a brokerage featuring projects and an interactive map.',
                prompt: 'I want a brokerage-style site with featured projects and a map.'
            },
            {
                title: 'Luxury Property Agency',
                description: 'A premium website tailored for a luxury property agency.',
                prompt: 'I want a website for a luxury property agency.'
            },
        ]
    },
    {
        id: 'project-launchpad',
        name: 'Project Launchpad',
        icon: <Zap className="h-4 w-4" />,
        description: 'High-conversion landing pages.',
        prompts: [
            {
                title: 'High-Conversion Landing Page',
                description: 'Create a landing page for a new launch project, optimized for lead capture.',
                prompt: 'Create a high-conversion landing page for a new launch project.'
            },
            {
                title: 'Launch with Countdown',
                description: 'A project launch page featuring a countdown timer and lead form.',
                prompt: 'Make a project launch page with countdown timer and lead form.'
            },
            {
                title: 'Roadshow Event Page',
                description: 'Build a page for a roadshow with RSVP and event details.',
                prompt: 'Build a roadshow launch page with RSVP and event details.'
            },
            {
                title: 'Google Ads Funnel',
                description: 'A fast-loading page designed specifically for performance ad campaigns.',
                prompt: 'Build a landing page designed ONLY for Google Ads and WhatsApp leads.'
            }
        ]
    },
    {
        id: 'agent-portfolio',
        name: 'Agent Portfolio',
        icon: <User className="h-4 w-4" />,
        description: 'Personal sites for agents & freelancers.',
        prompts: [
            {
                title: 'Personal Agent Portfolio',
                description: 'Create a personal portfolio site to showcase your profile and listings.',
                prompt: 'Create a personal portfolio site for a real estate agent.'
            },
            {
                title: 'Modern Agent Site',
                description: 'A contemporary website with featured listings and a prominent WhatsApp contact.',
                prompt: 'Make a modern agent website with featured listings and WhatsApp contact.'
            },
            {
                title: 'Social Media Landing Page',
                description: 'A one-page site perfect for linking from your social media profiles.',
                prompt: 'I want a social media-driven personal landing page for real estate.'
            },
        ]
    },
    {
        id: 'listing-sites',
        name: 'Listing Sites',
        icon: <Search className="h-4 w-4" />,
        description: 'Map, Grid, and Search-based sites.',
        prompts: [
            {
                title: 'Map-Based Search',
                description: 'Build a full real estate website centered around an interactive map with filters.',
                prompt: 'Build a map-based real estate website with filters.'
            },
            {
                title: 'Listings Marketplace',
                description: 'Create a directory-style site to showcase all your available properties.',
                prompt: 'Create a listings marketplace using my available properties.'
            },
            {
                title: 'Single Property Showcase',
                description: 'A focused landing page to maximize leads for one specific, high-end property.',
                prompt: 'Create a landing page for one property only — maximize leads.'
            },
        ]
    },
    {
        id: 'developer-pages',
        name: 'Developer Pages',
        icon: <Pyramid className="h-4 w-4" />,
        description: 'Showcase portfolios and brands.',
        prompts: [
            {
                title: 'Developer Portfolio',
                description: 'Build a website for a developer showcasing all their past, current, and future projects.',
                prompt: 'Build a website for a developer showcasing all their projects.'
            },
            {
                title: 'Co-Branded Launch Page',
                description: 'Create a collaborative launch page for a developer and broker partnership.',
                prompt: 'Create a co-branded launch page for developer + broker partnership.'
            },
        ]
    },
    {
        id: 'lead-gen',
        name: 'Lead Funnels',
        icon: <TrendingUp className="h-4 w-4" />,
        description: 'Funnels optimized for conversion.',
        prompts: [
            {
                title: 'Google Ads Funnel',
                description: 'A high-performance funnel page optimized specifically for paid Google Ads traffic.',
                prompt: 'Build a funnel page optimized for Google Ads.'
            },
            {
                title: 'WhatsApp-Only Landing Page',
                description: 'A minimal, fast-loading page with the sole goal of starting a WhatsApp conversation.',
                prompt: 'Create a WhatsApp-only landing page with minimal content.'
            },
            {
                title: 'Brochure Download Funnel',
                description: 'A funnel designed to capture leads in exchange for a project brochure download.',
                prompt: 'Make a brochure-download funnel.'
            },
            {
                title: 'RSVP Funnel for Events',
                description: 'Create a registration funnel for a roadshow or developer launch event.',
                prompt: 'Create an RSVP funnel for a roadshow event.'
            }
        ]
    },
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [activeTab, setActiveTab] = useState('ai-native');

  const handlePromptClick = (prompt: string) => {
    onComplete({
      method: 'prompt',
      'user-prompt': prompt,
    });
  };

  const handleSiteConfigReady = (config: any) => {
    onComplete({
      method: 'wizard', // or 'agent'
      ...config
    })
  }

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">How would you like to start?</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose a starting point, or describe your vision to our AI architect.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-7xl">
        <div className="flex justify-center mb-8">
            <TabsList className="h-auto p-1.5 bg-muted/50">
                {promptCategories.map(cat => (
                    <TabsTrigger 
                        key={cat.id} 
                        value={cat.id} 
                        className="px-4 py-2 text-sm flex items-center gap-2 rounded-lg"
                    >
                        {cat.icon}
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
                        {cat.id === 'ai-native' ? (
                             <div className="w-full max-w-3xl mx-auto h-[600px]">
                                <AgentChat onSiteConfigReady={handleSiteConfigReady} />
                             </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {cat.prompts.map((p, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-card border rounded-2xl p-6 text-left flex flex-col justify-between shadow-lg hover:shadow-2xl hover:border-primary/50 transition-all duration-300 cursor-pointer h-full group"
                                        onClick={() => p.prompt && handlePromptClick(p.prompt)}
                                    >
                                        <div className="flex-grow">
                                            <h3 className="font-bold text-lg text-foreground mb-2">{p.title}</h3>
                                            <p className="text-sm text-muted-foreground">{p.description}</p>
                                        </div>
                                        <div className="mt-6 flex justify-end">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                                <Play className="h-5 w-5 ml-0.5" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                ))}
            </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}

    