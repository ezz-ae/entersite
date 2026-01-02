'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Globe, Bot, Search, Facebook, Activity, Target, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// --- Content Configuration ---
const SERVICE_DATA = {
  website: {
    title: "Site Architect",
    tagline: "High-Performance Property Sites",
    description: "Deploy high-converting project landing pages by simply uploading a brochure. Our AI extracts project data, generates SEO-optimized copy, and builds a professional layout instantly.",
    icon: Globe,
    color: "blue",
    features: [
      "Auto-extraction of project details & specs",
      "AI-generated high-conversion sales copy",
      "Mobile-first responsive architecture",
      "Direct integration with market data",
      "Custom branded project domains"
    ],
    cta: "Launch Architect",
    href: "/builder"
  },
  'ai-market-expert': {
    title: "Market Intelligence",
    tagline: "Real-time UAE Project Data",
    description: "Access our centralized intelligence database with 3,750+ verified UAE projects. Get live ROI data, capital appreciation trends, and inventory updates.",
    icon: Bot,
    color: "orange",
    features: [
        "Real-time ROI & Yield analytics",
        "Developer performance tracking",
        "Historical price trend visualization",
        "Branded PDF export for investors",
        "Direct campaign generation"
    ],
    cta: "Explore Data Engine",
    href: "/discover"
  },
  'google-ads': {
    title: "Search Ads Sync",
    tagline: "Target High-Intent Buyers",
    description: "Launch targeted Google Search campaigns directly from your project data. Our AI handles keyword bidding, ad copy, and budget optimization for maximum leads.",
    icon: Search,
    color: "green",
    features: [
        "One-click campaign deployment",
        "High-intent keyword grouping",
        "AI-optimized ad copy variations",
        "Real-time performance dashboard",
        "Automatic tracking pixel setup"
    ],
    cta: "Sync Google Ads",
    href: "/dashboard/marketing"
  },
  'instagram-bot': {
    title: "Social Automation",
    tagline: "24/7 Instagram DM Sales",
    description: "Turn your Instagram profile into a sales engine. Our AI bot handles project inquiries, qualifies investors, and pushes hot leads to your WhatsApp.",
    icon: Facebook,
    color: "pink",
    features: [
        "Official Meta API integration",
        "Speaks 40+ languages natively",
        "Automated project info sharing",
        "Lead qualification & CRM sync",
        "Zero missed inquiries policy"
    ],
    cta: "Deploy Instagram Bot",
    href: "/dashboard/chat-agent"
  }
};

interface PageProps {
  params: Promise<{ service: string }>;
}

export default function ServicePage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const serviceKey = resolvedParams.service as keyof typeof SERVICE_DATA;
  const service = SERVICE_DATA[serviceKey];

  if (!service) {
    notFound();
  }

  const Icon = service.icon;
  const colorMap: any = {
      blue: "from-blue-600 to-indigo-600",
      orange: "from-orange-500 to-red-600",
      green: "from-green-500 to-emerald-600",
      pink: "from-pink-500 to-purple-600"
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/10">
      
      {/* Header Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
          <div className={cn("absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] blur-[120px] rounded-full pointer-events-none opacity-20 bg-gradient-to-r", colorMap[service.color])} />
          
          <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                  <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest mx-auto")}>
                    <Activity className="h-3.5 w-3.5 text-blue-500" />
                    System Infrastructure
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none uppercase">{service.title}<br/><span className="text-zinc-600">{service.tagline}</span></h1>
                  <p className="text-zinc-500 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
                      {service.description}
                  </p>
              </motion.div>
          </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
          <div className="container mx-auto px-6 max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  
                  <div className="space-y-12">
                      <div>
                          <h2 className="text-4xl font-bold mb-8 uppercase tracking-tight">Capabilities</h2>
                          <div className="space-y-6">
                              {service.features.map((feature, i) => (
                                  <div key={i} className="flex items-start gap-4">
                                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                                          <CheckCircle className="h-4 w-4 text-green-500" />
                                      </div>
                                      <p className="text-lg text-zinc-300 font-medium">{feature}</p>
                                  </div>
                              ))}
                          </div>
                      </div>

                      <Link href={service.href}>
                        <Button className="h-16 px-12 rounded-full bg-white text-black font-bold text-xl hover:scale-105 transition-all shadow-2xl uppercase tracking-tight">
                            {service.cta} <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                  </div>

                  <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-3xl rounded-[3rem] overflow-hidden p-12 shadow-sm">
                      <div className="space-y-8">
                          <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center border", `bg-white/5 border-white/10 text-white`)}>
                                  <Icon className="h-8 w-8" />
                              </div>
                              <div>
                                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Module</p>
                                  <h4 className="text-xl font-bold text-white uppercase tracking-tight">{service.title}</h4>
                              </div>
                          </div>
                          
                          <div className="space-y-6">
                              <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                                  <p className="text-[10px] font-bold text-zinc-600 uppercase mb-2 tracking-widest">Sync Status</p>
                                  <div className="flex items-center gap-3">
                                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                                      <p className="text-sm font-bold text-white uppercase tracking-tight">Connected to Market Data</p>
                                  </div>
                              </div>
                              <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                                  <p className="text-[10px] font-bold text-zinc-600 uppercase mb-2 tracking-widest">AI Performance</p>
                                  <p className="text-lg font-bold text-white uppercase tracking-tight">Optimization Active</p>
                              </div>
                          </div>

                          <div className="pt-4">
                              <div className="flex justify-between text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3">
                                  <span>Efficiency Rating</span>
                                  <span className="text-blue-500">98.4%</span>
                              </div>
                              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '98%' }}
                                    className="h-full bg-blue-600" 
                                  />
                              </div>
                          </div>
                      </div>
                  </Card>
              </div>
          </div>
      </section>

      {/* Interconnectivity Section */}
      <section className="py-40 bg-zinc-950 border-y border-white/5 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="container mx-auto px-6 max-w-4xl space-y-8 relative z-10">
              <Zap className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-4xl font-bold uppercase tracking-tight text-white">Full Stack Growth.</h3>
              <p className="text-zinc-500 text-xl font-medium leading-relaxed max-w-3xl mx-auto">
                  Every Entrestate service is interconnected. Data from the <span className="text-white">Architect</span> flows directly into your <span className="text-white">Ads Manager</span> and <span className="text-white">Chat Experts</span>, creating a high-conversion sales loop.
              </p>
              <div className="pt-8 flex flex-wrap justify-center gap-8">
                  <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-green-500" /><span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Verified Assets</span></div>
                  <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-green-500" /><span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Secure Cloud</span></div>
                  <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-green-500" /><span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Live ROI Sync</span></div>
              </div>
          </div>
      </section>

    </main>
  );
}
