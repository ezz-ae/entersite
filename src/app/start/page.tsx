'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LandingHero } from '@/components/marketing/landing-hero';
import { ShieldCheck, Zap, Globe, Cpu, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function StartPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            {/* Direct Promotion Landing Hero */}
            <LandingHero />

            {/* Sales Narrative / Why Site Architect */}
            <section className="py-40 bg-zinc-950 border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full" />
                
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                            <div className="space-y-6 text-center lg:text-left">
                                <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-none uppercase">
                                    The Future of <br/>
                                    <span className="text-zinc-600">Property Sales.</span>
                                </h2>
                                <p className="text-zinc-500 text-xl md:text-2xl font-medium leading-relaxed">
                                    Traditional web development takes weeks. Our AI Architect takes seconds. We don't just build sites; we build high-performance sales hubs.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <BenefitItem 
                                    icon={Cpu}
                                    title="AI Synthesis"
                                    desc="Neural engines analyze your PDF to extract project specs, ROI, and amenities automatically."
                                />
                                <BenefitItem 
                                    icon={Globe}
                                    title="Instant Reach"
                                    desc="Instantly deploy your project to high-speed global servers with automated SEO and lead tracking."
                                />
                                <BenefitItem 
                                    icon={Zap}
                                    title="One-Click Marketing"
                                    desc="Seamlessly push your project to Meta and Google Ads with one-click campaign generation."
                                />
                                <BenefitItem 
                                    icon={ShieldCheck}
                                    title="Verified Accuracy"
                                    desc="Powered by Entrestate's 3,750+ verified UAE project database for maximum reliability."
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                            <div className="relative bg-zinc-900 border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                                        <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 text-blue-500">
                                            <Zap className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">Live Performance</p>
                                            <h4 className="text-xl font-bold text-white uppercase">Manual vs. Automated</h4>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-4 shadow-inner">
                                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                                                <span className="text-zinc-600">Agency Build Time</span>
                                                <span className="text-white">14 Days</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full w-full bg-zinc-800" />
                                            </div>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-blue-600/10 border border-blue-500/20 space-y-4 shadow-inner">
                                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                                                <span className="text-blue-400">Entrestate AI Time</span>
                                                <span className="text-white">28 Seconds</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: '100%' }}
                                                    className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Link href="/builder?method=upload">
                                            <Button className="w-full h-16 rounded-2xl bg-white text-black font-bold text-lg hover:scale-[1.02] transition-all uppercase">
                                                Start Building Now <ArrowRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

function BenefitItem({ icon: Icon, title, desc }: any) {
    return (
        <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 shadow-sm">
                <Icon className="h-6 w-6" />
            </div>
            <h4 className="text-xl font-bold text-white uppercase tracking-tight">{title}</h4>
            <p className="text-sm text-zinc-500 leading-relaxed font-medium">{desc}</p>
        </div>
    )
}
