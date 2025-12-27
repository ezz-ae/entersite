'use client';

import React from 'react';
import { LandingHero } from '@/components/marketing/landing-hero';
import { ReadyBuilds } from '@/components/marketing/feature-showcase/ready-builds';
import { BuilderShowcase } from '@/components/marketing/feature-showcase/builder-showcase';
import { AdsShowcase } from '@/components/marketing/feature-showcase/ads-showcase';
import { ChatAgentShowcase } from '@/components/marketing/feature-showcase/chat-agent-showcase';
import { SeoShowcase } from '@/components/marketing/feature-showcase/seo-showcase';
import { ProjectDiscoverySection } from '@/components/marketing/project-discovery-section';
import { SystemInsights } from '@/components/marketing/system-insights';
import { motion } from 'framer-motion';

/**
 * HOME PAGE
 * Header/Footer are handled globally in RootLayout.
 */

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Hero Section: The AI Entry Point */}
      <LandingHero />

      {/* OS Status Ticker */}
      <section className="py-8 border-y border-white/5 bg-zinc-950 flex items-center justify-center overflow-hidden">
         <div className="flex gap-16 animate-marquee whitespace-nowrap">
            <TickerItem label="Vertex Engine" status="Operational" />
            <TickerItem label="Entrestate Data" status="3,754 Projects" />
            <TickerItem label="Meta Sync" status="Connected" />
            <TickerItem label="Imagen 3" status="Active" />
            <TickerItem label="DIFC Node" status="Live" />
            {/* Duplicate for seamless marquee */}
            <TickerItem label="Vertex Engine" status="Operational" />
            <TickerItem label="Entrestate Data" status="3,754 Projects" />
            <TickerItem label="Meta Sync" status="Connected" />
         </div>
      </section>

      {/* The Intelligence Core: Project Discovery */}
      <ProjectDiscoverySection />

      {/* System Explanation: SEO, Marketing & Infrastructure */}
      <SystemInsights />

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,165,0,0.15),transparent_70%)]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-8xl md:text-[12rem] font-black tracking-tighter mb-12 leading-none text-white">
                Build with <br/>
              <span className="text-zinc-600">Entrestate.</span>
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
               <button className="h-24 px-20 rounded-full bg-white text-black font-black text-3xl hover:scale-110 transition-transform shadow-[0_0_60px_-10px_rgba(255,255,255,0.6)]">
                  Launch Your OS
               </button>
               <button className="h-24 px-20 rounded-full border border-white/10 bg-white/5 text-white font-black text-3xl backdrop-blur-3xl hover:bg-white/10 transition-all">
                  Book VIP Demo
               </button>
            </div>
            <p className="mt-16 text-zinc-500 font-mono text-sm uppercase tracking-[0.5em]">Real Estate Operating System v2.0</p>
          </motion.div>
        </div>
      </section>

    </main>
  );
}

function TickerItem({ label, status }: { label: string, status: string }) {
    return (
        <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">{label}</span>
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <span className="text-xs font-mono text-white">{status}</span>
        </div>
    )
}
