'use client';

import React from "react";
import { Check, Star, Trophy, Users, ShieldCheck, Activity, BarChart3, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
  icon: any;
}

interface StatsBlockProps {
  headline?: string;
  subtext?: string;
  stats?: StatItem[];
}

export function StatsBlock({
  headline = "ARCHITECTURAL PERFORMANCE NODES",
  subtext = "Verified benchmarks for our active UAE data clusters.",
  stats = [
      { value: "10B+", label: "Sales Flow (AED)", icon: Trophy },
      { value: "3,750+", label: "Library Assets", icon: Globe },
      { value: "15+", label: "Global Nodes", icon: Activity },
      { value: "98%", label: "System Uptime", icon: ShieldCheck },
  ]
}: StatsBlockProps) {
  return (
    <section className="py-32 bg-black text-white selection:bg-white/10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-24 space-y-8">
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-2"
            >
                <BarChart3 className="h-3.5 w-3.5" /> Performance Cluster
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9]">{headline}</h2>
            <p className="text-xl text-zinc-500 font-light leading-relaxed max-w-2xl">{subtext}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
                <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative p-10 rounded-[2.5rem] bg-zinc-950 border border-white/5 hover:border-white/20 transition-all duration-700 overflow-hidden shadow-2xl"
                >
                    {/* Inner Texture */}
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <stat.icon className="h-24 w-24 text-white" />
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-700">
                            <stat.icon className="h-7 w-7" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-5xl font-black italic uppercase tracking-tighter text-white group-hover:text-blue-500 transition-colors duration-500">
                                {stat.value}
                            </p>
                            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">{stat.label}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
