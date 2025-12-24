'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Layout, MousePointerClick, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const BLUEPRINTS = [
    {
        id: 'luxury-high-rise',
        title: "The Sky Villa",
        type: "Luxury Landing",
        focus: "High-Ticket Sales",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/U10759_EXT_ZED739.webp?alt=media&token=be7418eb-0f7f-4df3-8c89-8fa5b070a7aa",
        color: "blue"
    },
    {
        id: 'off-plan-brokerage',
        title: "Empire Portal",
        type: "Multi-Listing",
        focus: "Lead Volume",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/the-palace-downtown-dubai-view-from-the-poolside-900.jpg?alt=media&token=45ef0994-1111-4f85-a500-c470c85c3785",
        color: "orange"
    },
    {
        id: 'investor-roi-tracker',
        title: "Yield Expert",
        type: "ROI Dashboard",
        focus: "Investor Trust",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/DAMAC_Islands-Gallery-00.jpg?alt=media&token=c51b483f-dd32-42ce-85e5-b06beb78c41f",
        color: "purple"
    }
];

export function ReadyBuilds() {
  return (
    <section className="py-40 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-6 max-w-[1800px] relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 border-b border-white/5 pb-16">
            <div className="max-w-4xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                    Verified Blueprints
                </div>
                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
                    Architected for <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Pure Conversion.</span>
                </h2>
                <p className="text-2xl text-zinc-400 max-w-2xl font-light">
                    Every blueprint is pre-wired with Vertex AI marketing models and the 3,750+ project database. Don't build. Deploy.
                </p>
            </div>
            <Link href="/builder">
                <Button variant="outline" className="h-16 px-10 rounded-full border-white/10 bg-white/5 text-white font-bold text-lg hover:bg-white/10 gap-3">
                    View Blueprint Library <ArrowRight className="h-5 w-5" />
                </Button>
            </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
            {BLUEPRINTS.map((bp, i) => (
                <motion.div
                    key={bp.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                >
                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-zinc-900 border border-white/5 group-hover:border-white/20 transition-all duration-700">
                        <Image 
                            src={bp.imageUrl} 
                            alt={bp.title} 
                            fill 
                            className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-80 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        
                        <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
                            <Badge className="bg-white/10 backdrop-blur-md border-white/10 text-white py-1.5 px-4 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                {bp.type}
                            </Badge>
                            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
                                <Zap className="h-5 w-5 text-white" />
                            </div>
                        </div>

                        <div className="absolute bottom-8 left-8 right-8 space-y-4">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em]">{bp.focus}</p>
                                <h3 className="text-4xl font-bold text-white tracking-tighter">{bp.title}</h3>
                            </div>
                            <Link href={`/builder?template=${bp.id}`}>
                                <Button className="w-full h-14 rounded-2xl bg-white text-black font-bold group-hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)] transition-all">
                                    Deploy Strategy
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Feature Grid: Why it works */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mt-32">
            <FeatureCard 
                icon={Sparkles} 
                title="Vertex AI Layer" 
                desc="Ad copy and headlines generated by Google's specialized marketing models." 
            />
            <FeatureCard 
                icon={Layout} 
                title="Schema Validated" 
                desc="Perfect SEO structure out of the box. No technical knowledge required." 
            />
            <FeatureCard 
                icon={MousePointerClick} 
                title="Live Data Feeds" 
                desc="Your site updates automatically when developers change project pricing." 
            />
            <FeatureCard 
                icon={Zap} 
                title="Instant Ads" 
                desc="Deploy Google and Meta campaigns directly from your site dashboard." 
            />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, desc }: any) {
    return (
        <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Icon className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-white">{title}</h4>
            <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
        </div>
    )
}
