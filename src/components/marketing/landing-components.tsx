'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Zap, Globe, Layout, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function MarketingHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/50 via-black to-black opacity-70"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium mb-8 animate-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            v2.0 Now Live
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.1] max-w-5xl mx-auto">
          The Operating System for <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Real Estate Growth.</span>
        </h1>
        
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Build high-converting landing pages, manage Google Ads, and launch entire developer portfolios in seconds. No code required.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/builder">
                <Button size="lg" className="h-14 px-8 text-base rounded-full bg-white text-black hover:bg-zinc-200">
                    Start Building Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
            <Link href="/docs">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-white/20 text-white hover:bg-white/10">
                    Read Documentation
                </Button>
            </Link>
        </div>
      </div>
    </section>
  );
}

export function FeatureGrid() {
    const features = [
        { icon: <Zap className="h-6 w-6" />, title: "Instant Generation", desc: "Type a prompt, get a full website. Our AI understands real estate context perfectly." },
        { icon: <Globe className="h-6 w-6" />, title: "Global CDN", desc: "Your sites are deployed to the edge, ensuring sub-100ms load times worldwide." },
        { icon: <Layout className="h-6 w-6" />, title: "30+ Pro Blocks", desc: "From mortgage calculators to interactive maps, we have every component you need." },
        { icon: <Shield className="h-6 w-6" />, title: "Enterprise Security", desc: "SSL, DDoS protection, and 99.99% uptime guarantee included with every site." },
    ];

    return (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="p-6 bg-white dark:bg-black border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-black/5 dark:bg-white/10 rounded-xl flex items-center justify-center mb-4">
                                {f.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
