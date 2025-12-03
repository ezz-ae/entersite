'use client';

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";
import Image from "next/image";

interface TemplateShowcaseProps {
  headline?: string;
  subtext?: string;
}

export function TemplateShowcase({
  headline = "Built with EntreSite",
  subtext = "Browse high-converting templates used by top developers and agencies."
}: TemplateShowcaseProps) {
  
  const templates = [
      {
          id: 1,
          title: "Luxury Launch",
          category: "Off-Plan",
          image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
          features: ["Countdown Hero", "Lead Capture", "Video Tour"]
      },
      {
          id: 2,
          title: "Developer Portfolio",
          category: "Corporate",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
          features: ["Project Grid", "Team Bios", "Stats"]
      },
      {
          id: 3,
          title: "Investment Hub",
          category: "Finance",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
          features: ["ROI Calculator", "Market Data", "Blog"]
      }
  ];

  return (
    <section className="py-24 bg-zinc-950 text-white border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4 max-w-2xl">
                <h2 className="text-4xl font-bold tracking-tight">{headline}</h2>
                <p className="text-zinc-400 text-lg">{subtext}</p>
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">View All Templates</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {templates.map((template) => (
                <div key={template.id} className="group cursor-pointer">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-white/10 bg-zinc-900">
                        <Image 
                            src={template.image} 
                            alt={template.title} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300" />
                        <div className="absolute top-4 left-4">
                            <Badge variant="secondary" className="bg-white/90 text-black backdrop-blur hover:bg-white">{template.category}</Badge>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{template.title}</h3>
                            <ArrowRight className="h-5 w-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-zinc-500 group-hover:text-white" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {template.features.map((f, i) => (
                                <span key={i} className="text-xs text-zinc-500 border border-white/10 px-2 py-1 rounded-md">{f}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
