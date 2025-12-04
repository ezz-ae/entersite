'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Command, Zap } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export function LandingHero() {
  const [prompt, setPrompt] = useState('');

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center bg-black text-white overflow-hidden pt-24">
      
      {/* Fire Gradient Background - Enhanced */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[15%] w-[800px] h-[800px] bg-orange-600/20 rounded-full blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-[-20%] right-[15%] w-[700px] h-[700px] bg-purple-700/20 rounded-full blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '7s' }} />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-125 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 max-w-[1800px] text-center space-y-16">
        
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-white/80 mb-6 backdrop-blur-xl shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] hover:bg-white/10 transition-colors cursor-default">
            <Zap className="h-3 w-3 text-orange-500 fill-orange-500" />
            EntreSite OS 2.0
          </div>
          
          <h1 className="text-7xl md:text-[9rem] font-bold tracking-tighter leading-[0.85] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 select-none">
            Build your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">Digital Empire.</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-zinc-400 max-w-5xl mx-auto leading-relaxed font-light tracking-wide">
             The first AI Operating System for real estate. <br/>
             <span className="text-white">3,750+ Projects.</span> Live Ads. Zero Code.
          </p>
        </motion.div>

        {/* The "Brain" Prompt Box - Enhanced */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl mx-auto relative group"
        >
          {/* Glowing Border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          
          <div className="relative bg-black/80 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-2xl p-2 md:p-3 flex flex-col md:flex-row items-start gap-0 overflow-hidden">
            
            {/* Input Area */}
            <div className="flex-1 w-full relative">
                <div className="absolute top-4 left-6 flex items-center gap-2 pointer-events-none">
                    <Sparkles className="h-4 w-4 text-orange-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-orange-500/80 uppercase tracking-widest">AI Architect</span>
                </div>
                <Textarea
                placeholder="Describe your vision... (e.g. A dark-mode luxury landing page for Emaar Beachfront with a video hero...)"
                className="min-h-[120px] md:min-h-[80px] text-xl md:text-2xl p-6 pt-10 resize-none border-0 focus-visible:ring-0 bg-transparent placeholder:text-white/20 text-white leading-relaxed w-full font-light"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                spellCheck={false}
                />
            </div>

            {/* Action Area */}
            <div className="p-2 w-full md:w-auto self-end md:self-center flex-shrink-0">
              <Link href={`/builder?prompt=${encodeURIComponent(prompt)}`}>
                <Button size="lg" className="h-16 w-full md:w-auto px-10 rounded-2xl text-lg font-bold shadow-[0_0_40px_-10px_#f97316] hover:shadow-[0_0_60px_-10px_#f97316] transition-all hover:scale-[1.02] active:scale-[0.98] bg-white text-black hover:bg-white" disabled={!prompt}>
                  Let's Create
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-10 text-xs text-zinc-500 uppercase tracking-widest font-bold">
             <span className="flex items-center gap-3 hover:text-white transition-colors cursor-default"><Command className="h-4 w-4" /> Instant Generation</span>
             <span className="flex items-center gap-3 hover:text-white transition-colors cursor-default"><Command className="h-4 w-4" /> Real Market Data</span>
             <span className="flex items-center gap-3 hover:text-white transition-colors cursor-default"><Command className="h-4 w-4" /> Google Ads Integration</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
