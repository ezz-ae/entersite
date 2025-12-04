'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Layout, 
  Palette, 
  Smartphone, 
  Search, 
  Rocket,
  MousePointerClick,
  BarChart3
} from 'lucide-react';

export function BuilderMotionShowcase() {
  return (
    <section className="py-32 bg-muted/10 border-y border-border/50 overflow-hidden relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
            A Professional Studio, <br/>
            <span className="text-muted-foreground">Simplified by Intelligence.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience a builder that feels like a creative tool, not a form. Drag, drop, and design with unprecedented freedom, guided by AI at every step.
          </p>
        </div>

        {/* The "Screenshot" UI Mockup */}
        <motion.div 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative max-w-7xl mx-auto"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-2xl blur-3xl opacity-40" />
            
            <div className="relative bg-background border border-border rounded-2xl shadow-2xl overflow-hidden aspect-[16/10] group">
                {/* Fake Window Controls */}
                <div className="h-12 border-b bg-muted/30 flex items-center px-4 gap-2 backdrop-blur-sm">
                    <div className="flex gap-2 mr-4">
                        <div className="w-3 h-3 rounded-full bg-red-400/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                        <div className="w-3 h-3 rounded-full bg-green-400/80" />
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="bg-background/50 h-7 px-4 rounded-md flex items-center justify-center text-[10px] text-muted-foreground font-mono border border-border/50 shadow-sm">
                            entresite.ai/builder/dubai-marina-launch
                        </div>
                    </div>
                    <div className="flex gap-3 text-muted-foreground">
                         <Smartphone className="h-4 w-4" />
                         <Layout className="h-4 w-4" />
                         <Rocket className="h-4 w-4 text-primary" />
                    </div>
                </div>

                {/* UI Composition */}
                <div className="flex h-full">
                    {/* Left Sidebar */}
                    <div className="w-16 border-r bg-muted/5 flex flex-col items-center py-6 gap-6 z-10">
                        {[Layout, Palette, Search, BarChart3].map((Icon, i) => (
                            <div key={i} className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                                <Icon className="h-5 w-5" />
                            </div>
                        ))}
                    </div>
                    
                    {/* Center Canvas */}
                    <div className="flex-1 bg-muted/10 p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] dark:bg-[radial-gradient(#fff_1px,transparent_1px)]" />
                        
                        {/* The "Site" being built */}
                        <motion.div 
                            initial={{ scale: 0.95 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 1.5 }}
                            className="w-full h-full max-w-4xl bg-background rounded-xl shadow-2xl border flex flex-col overflow-hidden relative z-10"
                        >
                            {/* Hero Block Mock */}
                            <div className="h-[65%] bg-zinc-900 relative flex items-center justify-center overflow-hidden">
                                <motion.div 
                                    animate={{ scale: [1, 1.1] }}
                                    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512453979798-5ea904ac66de?auto=format&fit=crop&q=80&w=1200')] bg-cover opacity-40"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                
                                <div className="text-center space-y-6 relative z-10 px-8">
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="h-12 w-3/4 max-w-lg bg-white/10 backdrop-blur rounded-lg mx-auto border border-white/10"
                                    />
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                        className="h-4 w-1/2 max-w-md bg-white/5 rounded mx-auto" 
                                    />
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.9 }}
                                        className="h-12 w-40 bg-primary rounded-full mx-auto mt-8 shadow-lg shadow-primary/20" 
                                    />
                                </div>
                            </div>
                            
                            {/* Grid Block Mock */}
                            <div className="flex-1 p-6 grid grid-cols-3 gap-6 bg-background">
                                {[1,2,3].map(i => (
                                    <div key={i} className="bg-muted/30 rounded-xl border h-full relative overflow-hidden group/card">
                                        <div className="h-[55%] bg-muted/50" />
                                        <div className="p-3 space-y-2">
                                            <div className="h-3 w-3/4 bg-muted-foreground/10 rounded" />
                                            <div className="h-2 w-1/2 bg-muted-foreground/5 rounded" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Floating Cursor Animation */}
                        <motion.div 
                            className="absolute top-[40%] left-[40%] pointer-events-none z-20 drop-shadow-xl"
                            animate={{ x: [0, 150, 150, 0], y: [0, 80, 0, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                            <MousePointerClick className="h-8 w-8 text-primary fill-primary/20" />
                            <div className="ml-4 mt-2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                                Agent AI is editing...
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-72 border-l bg-background p-6 space-y-8 hidden lg:block">
                        <div className="space-y-3">
                            <div className="h-4 w-24 bg-muted rounded" />
                            <div className="h-10 w-full bg-muted/30 rounded-lg border" />
                        </div>
                        <div className="space-y-3">
                            <div className="h-4 w-32 bg-muted rounded" />
                            <div className="h-32 w-full bg-muted/30 rounded-lg border" />
                        </div>
                        <div className="space-y-3">
                             <div className="h-4 w-20 bg-muted rounded" />
                             <div className="grid grid-cols-2 gap-3">
                                 <div className="h-10 w-full bg-primary/10 rounded-lg border border-primary/20" />
                                 <div className="h-10 w-full bg-muted/30 rounded-lg border" />
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>

      </div>
    </section>
  );
}
