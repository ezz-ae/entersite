'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Command, Zap, Play, ChevronRight } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export function LandingHero() {
  const [prompt, setPrompt] = useState('');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,100,0,0.1),transparent_50%)] animate-pulse" />
          <div className="absolute top-[-20%] left-[15%] w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[180px] mix-blend-screen" />
          <div className="absolute bottom-[-20%] right-[15%] w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[150px] mix-blend-screen" />
          
          {/* Subtle Video/Motion Placeholder */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-[1800px] pt-20">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: Text Content */}
            <div className="lg:col-span-7 space-y-12">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-8 backdrop-blur-xl shadow-2xl">
                        <Zap className="h-3.5 w-3.5 fill-orange-500" />
                        Empowering 12,000+ Agents via Vertex AI
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85] mb-8">
                        The Real Estate <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-700">Operating System.</span>
                    </h1>
                    
                    <p className="text-2xl md:text-3xl text-zinc-400 max-w-2xl font-light leading-relaxed">
                        Go from an idea to a high-converting empire in seconds. <br/>
                        <span className="text-white font-medium">Market data. AI Experts. Live Ads.</span> No code required.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000" />
                        <Link href="/builder">
                            <Button size="lg" className="relative h-16 px-10 rounded-full bg-white text-black font-bold text-xl hover:bg-white transition-all hover:scale-[1.02]">
                                Launch Architect <ChevronRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                    <Button size="lg" variant="ghost" className="h-16 px-10 rounded-full border border-white/10 text-white font-bold text-xl hover:bg-white/5 gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Play className="h-4 w-4 fill-white" /></div>
                        Watch OS Demo
                    </Button>
                </motion.div>
            </div>

            {/* Right: AI "Prompt" Visual */}
            <div className="lg:col-span-5 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="relative"
                >
                    {/* Glowing Brain / Core Visual */}
                    <div className="absolute -inset-10 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
                    
                    <div className="relative bg-zinc-900/50 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 shadow-[0_0_100px_-20px_rgba(255,255,255,0.1)]">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-2xl bg-orange-600 flex items-center justify-center">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Vertex Intelligence</p>
                                <p className="text-[10px] text-orange-500 uppercase tracking-widest font-bold">Awaiting Command...</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Your Vision</label>
                                <Textarea
                                    placeholder="e.g. A luxury launch page for Emaar Beachfront with an AI agent trained on ROI..."
                                    className="min-h-[140px] bg-black/40 border-white/10 rounded-2xl p-6 text-lg focus:ring-orange-500/50 resize-none text-white placeholder:text-zinc-700"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                />
                            </div>
                            
                            <Link href={`/builder?prompt=${encodeURIComponent(prompt)}`}>
                                <Button className="w-full h-14 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg shadow-xl shadow-orange-900/20 transition-all active:scale-95 disabled:opacity-50" disabled={!prompt}>
                                    Generate Empire <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>

                            <div className="flex justify-between items-center pt-4 opacity-40">
                                <span className="text-[10px] font-mono text-zinc-500">SYS_V2.0_LOADED</span>
                                <div className="flex gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Meta-Badges */}
                    <div className="absolute -right-8 top-1/4 bg-white text-black p-4 rounded-2xl shadow-2xl rotate-6 animate-bounce" style={{ animationDuration: '4s' }}>
                        <p className="text-[10px] font-bold uppercase tracking-widest">ROI Focused</p>
                        <p className="text-2xl font-black">94%</p>
                    </div>
                    <div className="absolute -left-12 bottom-1/4 bg-blue-600 text-white p-4 rounded-2xl shadow-2xl -rotate-6">
                        <p className="text-[10px] font-bold uppercase tracking-widest">Data Points</p>
                        <p className="text-2xl font-black">3,750</p>
                    </div>
                </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
}
