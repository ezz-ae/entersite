'use client';

import React from 'react';
import { LandingHero } from '@/components/marketing/landing-hero';
import { ReadyBuilds } from '@/components/marketing/feature-showcase/ready-builds';
import { BuilderShowcase } from '@/components/marketing/feature-showcase/builder-showcase';
import { AdsShowcase } from '@/components/marketing/feature-showcase/ads-showcase';
import { ChatAgentShowcase } from '@/components/marketing/feature-showcase/chat-agent-showcase';
import { SeoShowcase } from '@/components/marketing/feature-showcase/seo-showcase';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ProjectDiscoverySection } from '@/components/marketing/project-discovery-section';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black selection:bg-orange-500/30 overflow-x-hidden">
      <SiteHeader />
      
      {/* Hero Section: The AI Entry Point */}
      <LandingHero />

      {/* OS Status Ticker */}
      <section className="py-6 border-y border-white/5 bg-zinc-950 flex items-center justify-center overflow-hidden">
         <div className="flex gap-12 animate-marquee whitespace-nowrap">
            <TickerItem label="Vertex AI" status="Operational" />
            <TickerItem label="Data Engine" status="3,754 Projects" />
            <TickerItem label="Ad Sync" status="Connected" />
            <TickerItem label="Global CDN" status="Active" />
            <TickerItem label="Lead CRM" status="Live" />
            {/* Duplicate for seamless marquee */}
            <TickerItem label="Vertex AI" status="Operational" />
            <TickerItem label="Data Engine" status="3,754 Projects" />
            <TickerItem label="Ad Sync" status="Connected" />
         </div>
      </section>

      {/* The Intelligence Core: Project Discovery */}
      <ProjectDiscoverySection />

      {/* Strategic Showcase: Blueprints & Conversion */}
      <ReadyBuilds />

      {/* UI Showcase: The Builder Studio */}
      <BuilderShowcase />

      {/* Full Stack Growth: Ads, Chat, SEO */}
      <div className="space-y-0 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-orange-500/5 pointer-events-none" />
          <AdsShowcase />
          <ChatAgentShowcase />
          <SeoShowcase />
      </div>

      {/* Final Conversion Section */}
      <section className="py-60 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,165,0,0.1),transparent_70%)]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-7xl md:text-[10rem] font-bold tracking-tighter mb-12 leading-none">
              Build your <br/>
              <span className="text-zinc-600">Legacy.</span>
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
               <button className="h-20 px-16 rounded-full bg-white text-black font-black text-2xl hover:scale-110 transition-transform shadow-[0_0_50px_-10px_rgba(255,255,255,0.5)]">
                  Get Started Free
               </button>
               <button className="h-20 px-16 rounded-full border border-white/10 bg-white/5 text-white font-black text-2xl backdrop-blur-3xl hover:bg-white/10 transition-all">
                  Book VIP Demo
               </button>
            </div>
            <p className="mt-12 text-zinc-500 font-mono text-xs uppercase tracking-[0.5em]">Powered by Vertex AI Intelligence Layer</p>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function TickerItem({ label, status }: { label: string, status: string }) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</span>
            <div className="h-1 w-1 rounded-full bg-blue-500" />
            <span className="text-[10px] font-mono text-white">{status}</span>
        </div>
    )
}
