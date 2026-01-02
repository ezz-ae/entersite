'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Book,
  Terminal,
  Settings,
  Zap,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Search,
  MessageSquare,
  Globe,
  FolderOpen,
  Copy,
  LifeBuoy,
  Plus,
  Minus,
  Activity,
  Cpu,
  Database,
  Cloud
} from 'lucide-react';
import { DocSummary } from '@/types/docs';
import { cn } from '@/lib/utils';

const DOCS_CATEGORIES = [
  {
    title: 'Getting Started',
    icon: Zap,
    links: ['Quick Start Guide', 'System Overview', 'Mobile Setup', 'Authentication'],
  },
  {
    title: 'Smart Architect',
    icon: Cpu,
    links: ['Brochure Ingestion', 'Prompt Engineering', 'Site Generation', 'Data Schema'],
  },
  {
    title: 'Chat Experts',
    icon: MessageSquare,
    links: ['Instagram Auth', 'Knowledge Base Setup', 'Sales Agent Training', 'Widget Embed'],
  },
  {
    title: 'Infrastructure',
    icon: Globe,
    links: ['Vercel Domains', 'PayPal Integration', 'DNS Configuration', 'Security & SSL'],
  },
];

const SYSTEM_NODES = [
  { name: 'Build Engine', status: 'Optimal', icon: Cpu, latency: '42ms' },
  { name: 'Search API', status: 'Optimal', icon: Database, latency: '12ms' },
  { name: 'Messaging Node', status: 'Optimal', icon: MessageSquare, latency: '88ms' },
  { name: 'Cloud Sync', status: 'Optimal', icon: Cloud, latency: '156ms' },
];

const FAQ_ITEMS = [
  {
    q: "How does the PDF brochure extraction work?",
    a: "Our smart engine uses architectural parsing to identify ROI percentages, handover quarters, amenities, and floor plan data directly from developer PDFs. It then maps this data to the System OS schema for instant site generation."
  },
  {
    q: "Can I use my own custom domain?",
    a: "Yes. In the Settings dashboard, you can point any domain or subdomain to our infrastructure. We provide automatic SSL provisioning via the Vercel edge network."
  },
  {
    q: "How do I sync my first Meta campaign?",
    a: "Ensure your Meta Ad Account is authorized. Once active, use the Meta OS dashboard to generate your campaign architecture and click 'Initialize Live Sync'. Our system handles the Housing Category compliance automatically."
  },
  {
    q: "What regions are supported for the Market Library?",
    a: "Currently, our data nodes cover the entire UAE (Dubai, Abu Dhabi, Sharjah, RAK). We are expanding to other GCC markets and global luxury hubs in late 2025."
  }
];

interface DocsPageContentProps {
  recentDocs: DocSummary[];
}

export function DocsPageContent({ recentDocs }: DocsPageContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCopy = useCallback((value: string) => {
    navigator.clipboard?.writeText(value).catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-black text-white py-40">
      <div className="container mx-auto px-6 max-w-6xl space-y-32">
        
        {/* 1. Header & Search */}
        <div className="text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-700">
            <LifeBuoy className="h-3 w-3" /> System Support
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none uppercase italic">
            Support <br />
            <span className="text-zinc-600">Center.</span>
          </h1>
          <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            Technical documentation, operational guides, and system status for the EntreSite architecture.
          </p>
          <div className="max-w-xl mx-auto pt-8">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-zinc-700 group-focus-within:text-blue-500 transition-colors" />
              <input
                placeholder="Search system nodes, tools, or guides..."
                className="w-full h-20 bg-zinc-900/50 border border-white/5 rounded-3xl pl-16 pr-6 text-xl focus:outline-none focus:border-blue-500/50 transition-all font-medium placeholder:italic placeholder:text-zinc-800 shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* 2. System Status Node */}
        <section className="space-y-10">
            <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Global Cluster Health</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SYSTEM_NODES.map((node, i) => (
                    <div key={i} className="p-6 bg-zinc-900/30 border border-white/5 rounded-[2rem] flex items-center justify-between group hover:border-blue-500/20 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-600 group-hover:text-blue-500 transition-colors">
                                <node.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white leading-none mb-1">{node.name}</p>
                                <p className="text-[9px] font-black text-green-500 uppercase tracking-widest">{node.status}</p>
                            </div>
                        </div>
                        <p className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors">{node.latency}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* 3. Documentation Categories */}
        <div className="grid md:grid-cols-2 gap-8">
          {DOCS_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-zinc-900/50 border border-white/5 hover:border-blue-500/30 transition-all duration-500 h-full p-10 rounded-[3rem] shadow-xl">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-inner">
                    <cat.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tight">{cat.title}</h3>
                </div>
                <div className="space-y-2">
                  {cat.links.map((link) => (
                    <Link
                      key={link}
                      href="#"
                      className="flex items-center justify-between p-5 rounded-2xl hover:bg-white/5 group transition-all"
                    >
                      <span className="text-zinc-500 group-hover:text-white font-bold text-lg">{link}</span>
                      <ChevronRight className="h-5 w-5 text-zinc-800 group-hover:text-blue-500 transition-all transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 4. Frequently Asked Intelligence */}
        <section className="space-y-12">
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter">Common Queries</h2>
                <p className="text-zinc-500 font-medium">Quick answers to architectural and operational questions.</p>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
                {FAQ_ITEMS.map((faq, i) => (
                    <div key={i} className="rounded-[2rem] border border-white/5 bg-zinc-900/40 overflow-hidden transition-all hover:border-white/10">
                        <button 
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="w-full p-8 flex items-center justify-between text-left"
                        >
                            <span className="text-xl font-bold text-zinc-200">{faq.q}</span>
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 transition-colors group-hover:text-white">
                                {openFaq === i ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                            </div>
                        </button>
                        <AnimatePresence>
                            {openFaq === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                >
                                    <div className="px-8 pb-8 text-lg text-zinc-500 leading-relaxed font-light">
                                        {faq.a}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>

        {/* 5. Deep Internal Playbooks */}
        {recentDocs.length > 0 && (
          <section className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
              <div className="space-y-4">
                <Badge className="bg-white/5 border-white/10 text-zinc-500 uppercase font-black text-[10px] tracking-widest px-4 py-1">Internal Playbooks</Badge>
                <h2 className="text-4xl font-black italic uppercase tracking-tighter">System Blueprints</h2>
                <p className="text-zinc-500 font-medium leading-relaxed">Direct technical archives surfaced from the system core.</p>
              </div>
              <div className="hidden md:flex gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700 italic">
                <ShieldCheck className="h-4 w-4 text-blue-500" />
                Source: Core Archives
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {recentDocs.map((doc) => (
                <Card key={doc.slug} className="bg-zinc-900/60 border border-white/5 p-10 rounded-[2.5rem] group hover:border-blue-500/20 transition-all shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                      <FolderOpen className="h-24 w-24 text-white" />
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-6">
                    <Activity className="h-4 w-4 text-blue-500" />
                    Technical Archive
                  </div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tight text-white mb-4 leading-none">{doc.title}</h3>
                  <p className="text-lg text-zinc-500 font-light leading-relaxed mb-10">{doc.summary}</p>
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between gap-3">
                    <div className="text-[10px] font-mono font-bold text-zinc-700 truncate tracking-tighter bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">/{doc.path}</div>
                    <button
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-500 hover:text-white transition-colors"
                      onClick={() => handleCopy(doc.path)}
                    >
                      <Copy className="h-4 w-4" /> Copy Path
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* 6. Human Support Callout */}
        <div className="pt-40 text-center space-y-10 border-t border-white/5 pb-20">
          <div className="w-20 h-20 bg-white/5 rounded-[1.5rem] border border-white/10 flex items-center justify-center mx-auto shadow-2xl">
              <LifeBuoy className="h-10 w-10 text-zinc-500" />
          </div>
          <div className="space-y-4">
              <h4 className="text-4xl font-black italic uppercase tracking-tighter">Unresolved Incident?</h4>
              <p className="text-xl text-zinc-500 font-light max-w-md mx-auto">Our specialized engineering node is available for complex infrastructure assistance.</p>
          </div>
          <button className="h-20 px-16 rounded-[2rem] bg-white text-black font-black text-2xl italic uppercase tracking-tighter shadow-2xl hover:scale-105 active:scale-95 transition-all">
            Join Developer Cluster
          </button>
        </div>
      </div>
    </main>
  );
}
