'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight, Sparkles, Zap, BrainCircuit, Activity } from 'lucide-react';
import { ResponsiveImage } from '@/components/ui/responsive-image';
import { motion } from 'framer-motion';

const POSTS = [
  {
    id: 'uae-market-2025',
    title: 'UAE Real Estate 2025: The Rise of AI Agents',
    excerpt: 'How artificial intelligence is turning local brokerages into global investment engines.',
    author: 'Sarah Jenkins',
    date: 'Oct 12, 2025',
    category: 'Intelligence',
    icon: BrainCircuit
  },
  {
    id: 'brochure-to-conversion',
    title: 'Turning PDF Brochures into High-Yield Portals',
    excerpt: 'The science behind our automated architect engine and why it works for investors.',
    author: 'David Chen',
    date: 'Oct 08, 2025',
    category: 'Productivity',
    icon: Zap
  },
  {
    id: 'meta-lookalike-strategy',
    title: 'Leveraging 3,750+ Data Points for Meta Ads',
    excerpt: 'A deep dive into how Entrestate builds custom audiences for off-plan launches.',
    author: 'James Wilson',
    date: 'Sep 15, 2025',
    category: 'Marketing',
    icon: Activity
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white py-40">
      <div className="container mx-auto px-6 max-w-[1800px]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/5 pb-16 gap-12">
            <div className="max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-bold uppercase tracking-widest">
                    <Sparkles className="h-3 w-3" /> Intelligence Blog
                </div>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
                    Market <br/>
                    <span className="text-zinc-600">Intelligence.</span>
                </h1>
                <p className="text-2xl text-zinc-400 font-light leading-relaxed">
                    Strategies, product updates, and data-driven insights from the Entrestate engineering and marketing teams.
                </p>
            </div>
            <div className="flex gap-4">
                <div className="px-6 py-4 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-xl">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Total Articles</p>
                    <p className="text-2xl font-black text-white">124</p>
                </div>
                <div className="px-6 py-4 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-xl">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Subscribers</p>
                    <p className="text-2xl font-black text-white">8.2K</p>
                </div>
            </div>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {POSTS.map((post, i) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="group">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="h-full bg-zinc-900/50 border border-white/10 rounded-[3rem] p-10 flex flex-col hover:border-blue-500/30 transition-all duration-500 group-hover:bg-zinc-900"
                    >
                        <div className="mb-12 flex justify-between items-start">
                             <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:bg-blue-600/10 group-hover:text-blue-500 transition-all">
                                <post.icon className="h-8 w-8" />
                             </div>
                             <Badge className="bg-white/10 text-zinc-400 border-white/10 py-1.5 px-4 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                {post.category}
                             </Badge>
                        </div>

                        <div className="space-y-4 mb-12">
                             <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                                <span>{post.date}</span>
                                <div className="w-1 h-1 rounded-full bg-blue-500/40" />
                                <span>{post.author}</span>
                             </div>
                             <h3 className="text-3xl font-bold leading-tight group-hover:text-white transition-colors">
                                {post.title}
                             </h3>
                             <p className="text-lg text-zinc-500 font-light leading-relaxed line-clamp-3">
                                {post.excerpt}
                             </p>
                        </div>

                        <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 group-hover:text-white transition-all">Read Insight</span>
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                <ArrowRight className="h-5 w-5" />
                            </div>
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>

        {/* Newsletter Callout */}
        <section className="mt-40 p-20 rounded-[4rem] bg-blue-600 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="absolute top-0 right-0 p-12 opacity-10">
                <BrainCircuit className="h-64 w-64" />
            </div>
            <div className="max-w-2xl relative z-10 space-y-4">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">Join the Intelligence.</h2>
                <p className="text-xl text-blue-100 font-medium">Get UAE market trends and AI strategy guides delivered weekly.</p>
            </div>
            <div className="w-full md:w-auto relative z-10 flex flex-col sm:flex-row gap-3">
                <input 
                    placeholder="Enter your email" 
                    className="h-16 px-8 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-blue-200 text-lg w-full md:w-80 backdrop-blur-xl focus:outline-none"
                />
                <button className="h-16 px-12 rounded-full bg-white text-blue-600 font-black text-xl hover:scale-105 transition-transform">
                    Subscribe
                </button>
            </div>
        </section>

      </div>
    </main>
  );
}
