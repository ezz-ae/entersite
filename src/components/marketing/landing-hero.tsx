'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export function LandingHero() {
  const [prompt, setPrompt] = useState('');

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-background text-foreground overflow-hidden pt-20">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center space-y-12 max-w-5xl">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border text-xs font-medium mb-4">
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            EntreSite OS v2.0
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mx-auto leading-[1.1]">
            The AI Operating System for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary/50">Real Estate Growth.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
            From prompt to published site in seconds. Manage ads, leads, and your entire digital empire with one intelligent platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
          className="w-full max-w-3xl mx-auto relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative bg-background border border-border/50 rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row items-center gap-2">
            <Textarea
              placeholder="Describe your vision... (e.g. A luxury landing page for a new Emaar project in Dubai Marina)"
              className="min-h-[80px] md:min-h-[60px] text-lg p-4 resize-none border-0 focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground/50 flex-1"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="p-2 w-full md:w-auto">
              <Link href={`/builder?prompt=${encodeURIComponent(prompt)}`}>
                <Button size="lg" className="h-12 w-full md:w-auto px-8 rounded-xl text-base font-semibold shadow-lg hover:scale-105 transition-transform bg-primary text-primary-foreground" disabled={!prompt}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Site
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-6 text-xs text-muted-foreground uppercase tracking-wider font-medium">
             <span>• 3,750+ Projects</span>
             <span>• Google Ads Integration</span>
             <span>• Verified Data</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
