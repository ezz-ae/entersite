'use client';

import React, { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface TemplateShowcaseProps {
  headline?: string;
  subtext?: string;
}

const templates = [
    {
        id: 1,
        title: "Luxury Launch",
        category: "Off-Plan",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: "Developer Portfolio",
        category: "Corporate",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "Investment Hub",
        category: "Finance",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 4,
        title: "Agent Profile",
        category: "Personal",
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?auto=format&fit=crop&q=80&w=800",
    },
     {
        id: 5,
        title: "Map Search",
        category: "Utility",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800",
    },
];

export function TemplateShowcase({
  headline = "Start with a World-Class Foundation",
  subtext = "Choose from dozens of pre-built, market-tested templates designed for conversion."
}: TemplateShowcaseProps) {
  
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Create a parallax scroll effect for the templates
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']); // Moves from left to right

  return (
    <section ref={targetRef} className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{headline}</h2>
            <p className="text-lg text-muted-foreground mt-4">{subtext}</p>
        </div>
      </div>
      
      <motion.div style={{ x }} className="flex gap-8 pl-8">
            {templates.map((template) => (
                <div key={template.id} className="group cursor-pointer flex-shrink-0 w-[400px]">
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-zinc-900">
                        <Image 
                            src={template.image} 
                            alt={template.title} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </div>
                    <h3 className="font-bold text-lg mt-4">{template.title}</h3>
                </div>
            ))}
      </motion.div>
    </section>
  );
}
