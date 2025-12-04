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
    <section className="relative h-screen flex flex-col items-center justify-center bg-background text-foreground overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center space-y-12">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl mx-auto leading-[1.1]">
            The AI Operating System for Real Estate Growth
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From prompt to published site in seconds. EntreSite is the only platform that combines a 3,750+ project database with an enterprise-grade AI builder.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
          className="w-full max-w-3xl mx-auto"
        >
          <div className="relative bg-card border rounded-2xl shadow-2xl p-4 group transition-all duration-300 focus-within:ring-2 focus-within:ring-primary">
            <Textarea
              placeholder="I want to build a luxury landing page for a new Emaar project in Dubai Marina..."
              className="min-h-[100px] text-lg p-4 resize-none border-0 focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground/50"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="absolute bottom-4 right-4">
              <Link href={`/builder?prompt=${encodeURIComponent(prompt)}`}>
                <Button size="lg" className="h-12 px-6 rounded-full text-base font-semibold shadow-lg hover:scale-105 transition-transform" disabled={!prompt}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Start Building
                </Button>
              </Link>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Press <kbd className="px-1.5 py-0.5 border bg-muted rounded font-mono text-[10px]">Enter</kbd> to begin.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
