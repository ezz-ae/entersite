'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { SAFE_IMAGES } from "@/lib/images";
import { motion } from "framer-motion";

interface LaunchHeroBlockProps {
  headline?: string;
  subtext?: string;
  launchDate?: string;
  backgroundImage?: string;
}

export function LaunchHeroBlock({
  headline = "THE FUTURE OF WATERFRONT LIVING",
  subtext = "Initialize early access to the most anticipated off-plan launch in Dubai. Institutional pricing nodes available for first-tier registrants.",
  launchDate = "November 15, 2025",
  backgroundImage = SAFE_IMAGES.hero[0]
}: LaunchHeroBlockProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black selection:bg-white/10">
        {/* Cinematic Background Node */}
        <div className="absolute inset-0 z-0">
             <motion.div 
               initial={{ scale: 1.1 }}
               animate={{ scale: 1 }}
               transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
               className="relative w-full h-full"
             >
                <ResponsiveImage 
                    src={backgroundImage} 
                    alt="Launch Background" 
                    fill 
                    className="object-cover opacity-40 grayscale"
                    priority
                />
             </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_rgba(0,0,0,0.8))] " />
        </div>

        <div className="container relative z-10 px-6 text-center text-white space-y-12 max-w-5xl">
            {/* 1. Prestige Identifier */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-zinc-900 border border-white/5 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mx-auto"
            >
                <ShieldCheck className="h-3.5 w-3.5 text-white" /> System Reveal Active
            </motion.div>

            {/* 2. Industrial System Clock */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex items-center justify-center gap-6 md:gap-10 py-6 border-y border-white/5"
            >
                <div className="text-center">
                    <p className="text-4xl md:text-6xl font-black italic tracking-tighter">04</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600 mt-2">Days</p>
                </div>
                <div className="text-zinc-800 text-3xl font-light italic">:</div>
                <div className="text-center text-blue-500">
                    <p className="text-4xl md:text-6xl font-black italic tracking-tighter">12</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600 mt-2">Hours</p>
                </div>
                <div className="text-zinc-800 text-3xl font-light italic">:</div>
                <div className="text-center">
                    <p className="text-4xl md:text-6xl font-black italic tracking-tighter">45</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600 mt-2">Minutes</p>
                </div>
                <div className="text-zinc-800 text-3xl font-light italic">:</div>
                <div className="text-center">
                    <motion.p 
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-4xl md:text-6xl font-black italic tracking-tighter"
                    >
                        30
                    </motion.p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600 mt-2">Seconds</p>
                </div>
            </motion.div>

            {/* 3. High-End Headline */}
            <div className="space-y-6">
                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-[0.05em] leading-[0.8] text-white uppercase italic"
                >
                    {headline}
                </motion.h1>
                
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed"
                >
                    {subtext}
                </motion.p>
            </div>

            {/* 4. Institutional Registration Node */}
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="max-w-xl mx-auto space-y-6 pt-6"
            >
                <div className="flex flex-col sm:flex-row gap-3 p-2 bg-zinc-900/50 border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-xl">
                    <Input 
                        placeholder="ENTER NODE EMAIL" 
                        className="h-16 bg-transparent border-0 text-white placeholder:text-zinc-700 focus-visible:ring-0 text-lg px-8 font-bold italic tracking-tight"
                    />
                    <Button size="lg" className="h-16 px-10 bg-white text-black hover:bg-zinc-200 text-xl font-black rounded-2xl transition-all uppercase italic tracking-tighter gap-3">
                        Register Node
                        <ArrowRight className="h-6 w-6" />
                    </Button>
                </div>
                <div className="flex items-center justify-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">
                    <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-blue-500" /> 2,500+ Nodes Waiting</span>
                    <div className="w-px h-3 bg-white/10" />
                    <span>Verified Registry</span>
                </div>
            </motion.div>
        </div>
    </section>
  );
}
