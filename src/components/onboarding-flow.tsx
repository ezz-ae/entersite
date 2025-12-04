'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Bot, Building, Layout, Play, User, Zap, X } from "lucide-react";
import { availableTemplates } from '@/lib/templates';
import type { SiteTemplate } from '@/lib/types';
import { cn } from '@/lib/utils';

interface OnboardingFlowProps {
  onComplete: (data: any) => void;
}

const STARTING_POINTS = [
  {
    id: 'ai-prompt',
    title: 'Build with AI',
    description: 'Describe your vision and let our AI architect create a custom site for you.',
    icon: <Bot className="h-6 w-6" />,
    color: 'text-primary',
  },
  {
    id: 'template-full-company',
    title: 'Company Hub',
    description: 'A complete corporate site with listings, agent profiles, and market insights.',
    icon: <Building className="h-6 w-6" />,
    color: 'text-blue-500',
  },
  {
    id: 'template-ads-launch',
    title: 'Project Launchpad',
    description: 'A high-conversion landing page to launch a new project with maximum impact.',
    icon: <Zap className="h-6 w-6" />,
    color: 'text-purple-500',
  },
  {
    id: 'template-freelancer',
    title: 'Agent Portfolio',
    description: 'A sleek, personal site to showcase your listings and build your brand.',
    icon: <User className="h-6 w-6" />,
    color: 'text-green-500',
  },
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handlePointClick = (id: string) => {
    if (id === 'ai-prompt') {
      setShowPrompt(true);
    } else {
      const selectedTemplate = availableTemplates.find(t => t.id === id);
      if (selectedTemplate) {
        onComplete({
          method: 'template',
          template: selectedTemplate,
        });
      }
    }
  };

  const handleGenerate = () => {
    if (prompt.trim()) {
      onComplete({
        method: 'prompt',
        'user-prompt': prompt,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <AnimatePresence>
        {showPrompt ? (
          <motion.div
            key="prompt-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-3xl mx-auto"
          >
            <div className="relative bg-card border rounded-3xl shadow-2xl p-8 md:p-12 text-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 h-9 w-9 rounded-full text-muted-foreground"
                onClick={() => setShowPrompt(false)}
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="space-y-4 mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/5 rounded-2xl text-primary mb-2">
                  <Bot className="h-8 w-8" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-primary">Describe Your Site</h1>
                <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                  Be as specific as you like. Mention the project, developer, target audience, or desired style.
                </p>
              </div>

              <Textarea
                placeholder="e.g., A luxury landing page for the new Emaar project in Dubai Hills, targeting international investors. Modern and minimalist style."
                className="min-h-[160px] text-lg p-6 resize-none shadow-inner bg-muted/40 border-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all rounded-2xl"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button
                size="lg"
                onClick={handleGenerate}
                className="w-full max-w-sm mt-8 h-14 text-lg font-semibold shadow-xl rounded-xl transition-transform hover:scale-[1.02]"
                disabled={!prompt.trim()}
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                Generate Site
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="gallery-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-5xl mx-auto"
          >
            <div className="text-center space-y-4 mb-16">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">How would you like to start?</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose a starting point, or describe your vision to our AI architect.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STARTING_POINTS.map((point) => (
                <motion.div
                  key={point.id}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="bg-card border rounded-2xl p-6 text-center flex flex-col items-center justify-between shadow-lg hover:shadow-2xl hover:border-primary/50 transition-all duration-300 cursor-pointer h-full"
                  onClick={() => handlePointClick(point.id)}
                >
                  <div className="space-y-4 flex-grow flex flex-col items-center">
                    <div className={cn("w-14 h-14 bg-muted/40 rounded-xl flex items-center justify-center mb-4", point.color)}>
                      {point.icon}
                    </div>
                    <h3 className="font-bold text-lg text-foreground">{point.title}</h3>
                    <p className="text-sm text-muted-foreground flex-1">{point.description}</p>
                  </div>
                  <div className="mt-6 w-full">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                          <Play className="h-5 w-5 ml-0.5" />
                      </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
