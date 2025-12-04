'use client';

import React, { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layout, Search, Map, Building2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from 'next/link';

const templates = [
    {
        id: 'full-company',
        title: "Brokerage Firm",
        category: "Corporate",
        icon: Building2,
        mockup: (
            <div className="flex flex-col h-full w-full bg-background">
                <div className="h-8 border-b flex items-center px-3 gap-2">
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <div className="w-16 h-2 bg-zinc-800 rounded-full ml-auto" />
                </div>
                <div className="flex-1 p-4 space-y-3">
                    <div className="h-24 w-full bg-zinc-800/50 rounded-lg animate-pulse" />
                    <div className="grid grid-cols-2 gap-2">
                        <div className="h-16 bg-zinc-800/30 rounded-lg" />
                        <div className="h-16 bg-zinc-800/30 rounded-lg" />
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'map-focused',
        title: "Listing Portal",
        category: "Search",
        icon: Map,
        mockup: (
            <div className="flex h-full w-full bg-background">
                <div className="w-1/3 border-r p-2 space-y-2">
                    <div className="h-8 w-full bg-zinc-800 rounded-md" />
                    <div className="h-12 w-full bg-zinc-800/50 rounded-md" />
                    <div className="h-12 w-full bg-zinc-800/50 rounded-md" />
                </div>
                <div className="flex-1 bg-zinc-900 relative p-2">
                     <div className="absolute top-4 left-4 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_#f97316]" />
                     <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_#f97316]" />
                </div>
            </div>
        )
    },
    {
        id: 'roadshow',
        title: "Emaar Launch",
        category: "Campaign",
        icon: Layout,
        mockup: (
            <div className="flex flex-col h-full w-full bg-zinc-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                <div className="absolute inset-0 flex items-center justify-center z-20 flex-col gap-2 text-center">
                    <div className="h-2 w-24 bg-white/20 rounded-full" />
                    <div className="h-4 w-32 bg-white rounded-md" />
                    <div className="flex gap-1 mt-2">
                         <div className="h-6 w-6 bg-orange-500 rounded-md" />
                         <div className="h-6 w-6 bg-orange-500 rounded-md" />
                         <div className="h-6 w-6 bg-orange-500 rounded-md" />
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'ads-launch',
        title: "Ads Landing",
        category: "Conversion",
        icon: Search,
        mockup: (
            <div className="flex flex-col h-full w-full bg-background">
                 <div className="h-32 w-full bg-zinc-900 flex items-center justify-center">
                     <div className="h-8 w-40 bg-white/10 rounded-md border border-white/10" />
                 </div>
                 <div className="p-3">
                     <div className="h-8 w-full bg-orange-500/20 border border-orange-500/50 rounded-md flex items-center justify-center text-[8px] text-orange-500 font-bold uppercase tracking-widest">
                         Limited Offer
                     </div>
                 </div>
            </div>
        )
    },
];

export function TemplateShowcase({
  headline = "Start with a World-Class Foundation",
  subtext = "Choose from specialized architectures designed for every real estate use case."
}: { headline?: string, subtext?: string }) {
  
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['10%', '-30%']);

  return (
    <section ref={targetRef} className="py-32 bg-black text-white overflow-hidden border-t border-white/10">
      <div className="container mx-auto px-4 max-w-7xl mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">{headline}</h2>
                <p className="text-lg text-zinc-400">{subtext}</p>
            </div>
            <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white hover:text-black transition-all">
                View All Templates <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </div>
      
      <motion.div style={{ x }} className="flex gap-6 pl-4 w-max">
            {templates.map((template) => (
                <Link key={template.id} href={`/builder?template=${template.id}`}>
                    <div className="group cursor-pointer w-[300px] md:w-[400px] flex-shrink-0">
                        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900 transition-all duration-500 group-hover:scale-[1.02] group-hover:border-orange-500/50 group-hover:shadow-[0_0_30px_-10px_#f97316]">
                            {template.mockup}
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                                <div className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    Use Template
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 px-1">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-colors">
                                    <template.icon className="h-5 w-5" />
                                </div>
                                <h3 className="font-bold text-lg">{template.title}</h3>
                            </div>
                            <Badge variant="secondary" className="bg-white/10 text-white border-0 group-hover:bg-white group-hover:text-black transition-colors">
                                {template.category}
                            </Badge>
                        </div>
                    </div>
                </Link>
            ))}
            {/* Duplicate for infinite scroll illusion if needed, or just enough content */}
            {templates.map((template) => (
                <div key={`${template.id}-dup`} className="group cursor-pointer w-[300px] md:w-[400px] flex-shrink-0 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                     <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-zinc-900">
                        {template.mockup}
                    </div>
                </div>
            ))}
      </motion.div>
    </section>
  );
}
