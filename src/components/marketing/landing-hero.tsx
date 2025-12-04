'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Command } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export function LandingHero() {
  const [prompt, setPrompt] = useState('');

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center bg-black text-white overflow-hidden pt-16 md:pt-24">
      
      {/* Fire Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-orange-600/15 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '5s' }} />
          <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-purple-700/15 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center space-y-12">
        
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium uppercase tracking-widest text-white/60 mb-2 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316] animate-pulse" />
            EntreSite OS 2.0
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            A complete real estate website <br />
            in just 15 minutes.
          </h1>
          
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light">
             Full project data. Live Google Ads. Zero code. <br/>
             The operating system for high-growth developers.
          </p>
        </motion.div>

        {/* The "Brain" Prompt Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl mx-auto relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <div className="relative bg-black/90 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl p-3 flex flex-col md:flex-row items-start gap-3">
            
            <div className="flex-1 w-full text-left">
                <div className="flex items-center gap-2 px-4 pt-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                    <Sparkles className="h-3 w-3 text-orange-400" />
                    AI Architect
                </div>
                <Textarea
                placeholder="Start by writing your company name, or which project you want to create a landing page for?"
                className="min-h-[60px] text-lg p-4 resize-none border-0 focus-visible:ring-0 bg-transparent placeholder:text-white/20 text-white leading-relaxed w-full"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                />
            </div>

            <div className="p-1 w-full md:w-auto self-end md:self-center">
              <Link href={`/builder?prompt=${encodeURIComponent(prompt)}`}>
                <Button size="lg" className="h-12 w-full md:w-auto px-8 rounded-xl text-base font-bold shadow-[0_0_20px_-5px_#f97316] hover:shadow-[0_0_30px_-5px_#f97316] transition-all hover:scale-105 bg-white text-black hover:bg-white" disabled={!prompt}>
                  Let's Create
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-8 text-[10px] text-white/30 uppercase tracking-widest font-bold">
             <span className="flex items-center gap-2"><Command className="h-3 w-3" /> 3,750+ Projects</span>
             <span className="flex items-center gap-2"><Command className="h-3 w-3" /> Google Ads Ready</span>
             <span className="flex items-center gap-2"><Command className="h-3 w-3" /> Instant Deploy</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
