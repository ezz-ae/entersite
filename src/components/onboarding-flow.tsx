'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

const promptCategories = [
  {
    name: "General & Vision",
    prompts: [
      { id: "vision-luxury", title: "Luxury & Premium", description: "Black/gold, feels like a high-end brand." },
      { id: "vision-minimal", title: "Minimal & Modern", description: "Clean, white-space, for international investors." },
      { id: "vision-countdown", title: "Launch Countdown", description: "A site that builds hype for a future release." },
    ]
  },
  {
    name: "Company Hub",
    prompts: [
        { id: "company-full", title: "Full Company Website", description: "With listings, agents, and contact pages." },
        { id: "company-luxury", title: "Luxury Property Agency", description: "A premium, black-and-gold showcase site." },
        { id: "company-bilingual", title: "Bilingual Corporate Site", description: "English + Arabic support." },
    ]
  },
  {
    name: "Project Launchpad",
    prompts: [
        { id: "launch-single", title: "Single Project Launch", description: "High-conversion page for a new off-plan project." },
        { id: "launch-event", title: "Developer Event Launch", description: "Roadshow page with RSVP and event details." },
        { id: "launch-ads", title: "Google Ads Funnel", description: "Lean, fast page optimized for paid traffic." },
    ]
  },
  {
    name: "Agent Portfolio - The Essentials",
    prompts: [
        { id: "personal_agent_portfolio", title: "Personal Agent Portfolio", description: "A clean, professional site to showcase your profile, track record, and active listings." },
        { id: "modern_agent_site", title: "Modern Agent Site", description: "A contemporary site with bold visuals, featured listings, and a prominent WhatsApp contact." },
        { id: "social_media_landing_page", title: "Social Media Landing Page", description: "Perfect for agents linking from TikTok, Instagram, and YouTube." },
    ]
  },
  {
    name: "Agent - High Performance & Niche",
    prompts: [
        { id: "luxury_agent_portfolio", title: "Luxury Agent Portfolio", description: "A premium, black-and-gold showcase site for agents targeting high-net-worth buyers." },
        { id: "offplan_specialist_page", title: "Off-Plan Specialist Page", description: "A dedicated funnel for agents selling new-launch off-plan projects." },
        { id: "rent_to_own_specialist_site", title: "Rent-to-Own Specialist Site", description: "A niche positioning site with calculators, guides, and lead-optimized forms." },
        { id: "international_buyer_landing", title: "International Buyer Landing Page", description: "A trust-building page for overseas investors with FAQ, guides, and WhatsApp CTA." },
        { id: "whatsapp_only_lead_page", title: "WhatsApp-Only Lead Page", description: "Ultra-lightweight page designed purely to convert into WhatsApp chats." },
    ]
  },
  {
    name: "Agent - Brand & Authority",
    prompts: [
        { id: "team_agent_site", title: "Team Agent Site (2-10 Agents)", description: "A multi-agent portfolio with individual pages, shared listings, and team branding." },
        { id: "top_agent_reputation_page", title: "Top Agent Reputation Page", description: "A credibility-heavy page with awards, testimonials, certifications, and reviews." },
        { id: "exclusive_listing_showcase", title: "Exclusive Listing Showcase", description: "A page dedicated to ONE special listing that the agent wants to push hard." },
        { id: "prequalification_funnel_site", title: "Pre-Qualification Funnel Site", description: "A mini-funnel with lead scoring, budget selector, and automated WhatsApp follow-up." },
        { id: "agent_press_media_kit", title: "Agent Press & Media Kit Page", description: "For agents doing PR, interviews, or public branding — downloadable materials included." },
        { id: "area_specialist_page", title: "Area Specialist Page", description: "Hyper-local branding: 'Downtown Dubai Specialist' / 'Palm Jumeirah Expert'." },
        { id: "lead_magnet_mini_site", title: "Lead Magnet Mini-Site", description: "For agents offering PDF guides, market reports, or WhatsApp newsletters." },
    ]
  },
  {
    name: "Lead Generation",
    prompts: [
        { id: "lead-whatsapp", title: "WhatsApp-Only Lead Page", description: "Ultra-lightweight page to convert into chats." },
        { id: "lead-brochure", title: "Brochure Download Funnel", description: "Capture leads in exchange for a downloadable guide." },
        { id: "lead-prequalify", title: "Pre-Qualification Funnel", description: "Mini-funnel with lead scoring and budget selector." },
    ]
  }
];


export function OnboardingFlow({ onComplete }: { onComplete: (data: any) => void; }) {
  const [prompt, setPrompt] = useState('');

  const handlePromptSubmit = () => {
    if (!prompt.trim()) return;
    onComplete({
      method: 'prompt',
      'user-prompt': prompt,
    });
  };

  const handlePresetClick = (presetPrompt: string) => {
    setPrompt(presetPrompt);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-6xl h-[80vh] bg-card border rounded-2xl shadow-2xl flex overflow-hidden"
      >
        {/* Left Side: Prompt Input */}
        <div className="w-1/2 flex flex-col p-8">
           <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight mb-2">Describe the website you want to build</h1>
              <p className="text-muted-foreground">
                Be as descriptive as possible, or choose a starting point from our library.
              </p>
           </div>
           
           <div className="flex-grow flex flex-col">
              <Textarea
                placeholder="e.g., A luxury real estate site for Emaar with a video hero, featured listings, and a simple lead form..."
                className="flex-grow text-base p-4 resize-none border rounded-lg bg-muted/20 focus-visible:ring-primary"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                autoFocus
              />
           </div>

            <div className="mt-6">
                <Button 
                    size="lg" 
                    className="w-full h-12 text-base font-semibold" 
                    disabled={!prompt.trim()}
                    onClick={handlePromptSubmit}
                >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Site
                </Button>
            </div>
        </div>

        {/* Right Side: Prompt Library */}
        <div className="w-1/2 bg-muted/30 border-l flex flex-col">
            <div className="p-8 pb-4">
                 <h2 className="text-xl font-bold">Inspiration Gallery</h2>
                 <p className="text-muted-foreground text-sm mt-1">Click any prompt to start.</p>
            </div>
            <ScrollArea className="flex-1 px-8 pb-8">
                <div className="space-y-6">
                    {promptCategories.map(category => (
                        <div key={category.name}>
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{category.name}</h3>
                            <div className="space-y-2">
                                {category.prompts.map(p => (
                                    <div
                                        key={p.id}
                                        onClick={() => handlePresetClick(p.description)}
                                        className="p-3 rounded-lg border bg-background hover:bg-muted hover:border-primary/50 transition-all cursor-pointer group"
                                    >
                                        <div className="flex justify-between items-center">
                                            <p className="font-medium text-sm">{p.title}</p>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1 opacity-70 line-clamp-2">{p.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
      </motion.div>
    </div>
  );
}
