'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Search, 
  Globe, 
  Bot, 
  Zap, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck,
  Cpu,
  Target,
  LineChart,
  Network
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function SystemInsights() {
  return (
    <section className="py-40 bg-zinc-950 border-y border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-[1800px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <div className="space-y-12">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 border border-orange-500/20 text-[10px] font-bold uppercase tracking-[0.3em]">
                        <Cpu className="h-3.5 w-3.5" />
                        Infrastructure Intelligence
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-white">Engineered for <br/><span className="text-zinc-600 italic uppercase">Growth.</span></h2>
                    <p className="text-zinc-500 text-2xl font-light leading-relaxed max-w-xl">
                        Entrestate OS isn't just a website builder—it's a verticalized AI infrastructure that automates the entire sales funnel for real estate.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InsightItem 
                        icon={Search} 
                        title="Semantic SEO" 
                        desc="Automatic schema markup and keyword-rich content generated from project brochures for #1 rankings." 
                    />
                    <InsightItem 
                        icon={Target} 
                        title="Ad Strategy" 
                        desc="Real-time market data flows into Google Ads, targeting high-intent investors with surgical precision. Launch global campaigns in 2 clicks." 
                    />
                    <InsightItem 
                        icon={Bot} 
                        title="Conversion AI" 
                        desc="Sales agents trained on 3,750+ projects to handle inquiries and book viewings 24/7 on your web and Instagram." 
                    />
                    <InsightItem 
                        icon={LineChart} 
                        title="Market Data Node" 
                        desc="Live ROI and market trend integration from Dubai Land Department keeps your data accurate every second." 
                    />
                </div>
            </div>

            <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-orange-600 rounded-[3rem] blur-3xl opacity-20 animate-pulse" />
                <Card className="relative bg-zinc-900/50 border border-white/10 backdrop-blur-3xl rounded-[3rem] overflow-hidden p-12 shadow-2xl">
                    <div className="space-y-10">
                        <div className="flex items-center justify-between border-b border-white/5 pb-8">
                            <div>
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">System Performance</p>
                                <h3 className="text-3xl font-black text-white">Deployment Engine</h3>
                            </div>
                            <div className="h-16 w-16 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
                                <Zap className="h-8 w-8 text-blue-500" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <StatBar label="SEO Authority Index" value={98} color="blue" />
                            <StatBar label="Ad Campaign ROAS" value={92} color="orange" />
                            <StatBar label="AI Lead Qualification" value={87} color="green" />
                            <StatBar label="Project Data Accuracy" value={100} color="purple" />
                        </div>

                        <div className="pt-10 grid grid-cols-2 gap-6">
                            <div className="p-6 rounded-3xl bg-black/40 border border-white/5">
                                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Build Speed</p>
                                <p className="text-3xl font-black text-white">{"<"} 30s</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-black/40 border border-white/5">
                                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Sync Latency</p>
                                <p className="text-3xl font-black text-white">12ms</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

        </div>
      </div>
    </section>
  );
}

function InsightItem({ icon: Icon, title, desc }: any) {
    return (
        <div className="space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-all">
                <Icon className="h-6 w-6 text-zinc-400 group-hover:text-white transition-colors" />
            </div>
            <h4 className="text-xl font-bold text-white">{title}</h4>
            <p className="text-sm text-zinc-500 leading-relaxed font-light">{desc}</p>
        </div>
    )
}

function StatBar({ label, value, color }: { label: string, value: number, color: string }) {
    const colors: any = {
        blue: "bg-blue-600",
        orange: "bg-orange-600",
        green: "bg-green-600",
        purple: "bg-purple-600"
    };

    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                <span>{label}</span>
                <span className="text-white font-mono">{value}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `\${value}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={cn("h-full", colors[color])}
                />
            </div>
        </div>
    )
}
