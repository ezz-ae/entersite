'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, CheckCircle2, Globe, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export function SeoShowcase() {
  return (
    <section className="py-40 bg-black text-white selection:bg-white/10 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-1 bg-gradient-to-tl from-blue-500/10 to-emerald-500/10 rounded-[3rem] blur-3xl opacity-30" />
            <div className="relative aspect-[4/3] bg-zinc-900/20 rounded-[3rem] border border-white/5 flex items-center justify-center p-8 backdrop-blur-3xl shadow-2xl">
                
                {/* Prestige SEO Interface Mockup */}
                <Card className="w-full shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] border-white/10 overflow-hidden bg-zinc-950 rounded-[2rem]">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/40">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
                                <Search className="h-4 w-4 text-blue-500" />
                            </div>
                            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-zinc-400">Search Optimizer</h4>
                        </div>
                        <div className="flex gap-1.5 opacity-20">
                            <div className="w-2 h-2 rounded-full bg-white" />
                            <div className="w-2 h-2 rounded-full bg-white" />
                            <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                    </div>
                    
                    <div className="p-10 space-y-10">
                        <div className="p-8 bg-black rounded-2xl border border-white/5 shadow-inner relative overflow-hidden group">
                             <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-50" />
                            <h5 className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                                <Globe className="h-3 w-3" /> Live Index Preview
                            </h5>
                            <div className="font-sans space-y-2">
                                <div className="text-[10px] text-zinc-500 flex items-center gap-1">
                                    <span>entresite.ai › assets › dubai-hills</span>
                                </div>
                                <div className="text-xl text-blue-400 font-bold tracking-tight leading-tight uppercase italic underline underline-offset-4 decoration-blue-400/30">
                                    Signature Villas | Dubai Hills Estate
                                </div>
                                <div className="text-sm text-zinc-400 font-light line-clamp-2 leading-relaxed">
                                    Acquire exclusive 5-bedroom assets in Dubai Hills. Tier-1 amenities, championship golf course views, and institutional payment frameworks.
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                             <div className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.4em]">Optimized Index Terms</div>
                             <div className="flex flex-wrap gap-2">
                                <Badge className="bg-white/5 text-zinc-300 border-white/10 uppercase text-[9px] font-bold tracking-widest px-3 py-1.5 rounded-full">Dubai Luxury Assets</Badge>
                                <Badge className="bg-white/5 text-zinc-300 border-white/10 uppercase text-[9px] font-bold tracking-widest px-3 py-1.5 rounded-full">ROI Portfolio</Badge>
                                <Badge className="bg-white/5 text-zinc-300 border-white/10 uppercase text-[9px] font-bold tracking-widest px-3 py-1.5 rounded-full">Emaar Off-Plan</Badge>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
          </motion.div>

          <div className="space-y-10 order-1 lg:order-2">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-white/5 text-zinc-400 text-[9px] font-black uppercase tracking-[0.4em]"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
              Index Calibration
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] uppercase italic">
                Dominant <br/>
                <span className="text-zinc-600">Search Presence.</span>
            </h2>
            
            <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-lg">
              Our autonomous indexing engine ensures every asset is discoverable by high-intent global investors. Automated meta-tagging, schema injection, and keyword anchoring are built-in.
            </p>
            
            <ul className="space-y-6 pt-4">
                <li className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-blue-500/30 transition-all">
                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                    </div>
                    <span className="font-bold text-zinc-300 uppercase text-xs tracking-widest">Autonomous Meta Generation</span>
                </li>
                <li className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-blue-500/30 transition-all">
                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                    </div>
                    <span className="font-bold text-zinc-300 uppercase text-xs tracking-widest">Market-Key Anchoring</span>
                </li>
                <li className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-blue-500/30 transition-all">
                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                    </div>
                    <span className="font-bold text-zinc-300 uppercase text-xs tracking-widest">Institutional Schema Markup</span>
                </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
