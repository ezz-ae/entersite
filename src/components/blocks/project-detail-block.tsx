
'use client';

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Download, ExternalLink, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectDetailBlockProps {
  projectName?: string;
  developer?: string;
  description?: string;
  features?: string[];
  brochureUrl?: string;
  locationMapUrl?: string;
  stats?: { label: string; value: string }[];
}

export function ProjectDetailBlock({
  projectName = "Elysian Residence",
  developer = "Mfour Development",
  description = "Elysian Residence redefines urban sophistication in Jumeirah Garden City. Designed for those who appreciate the finer things in life, these residences feature contemporary aesthetics, premium finishes, and a suite of lifestyle amenities that cater to your every need. Every detail has been carefully considered to provide residents with the ultimate comfort and luxury.",
  features = ["Rooftop Garden", "Infinity Pool", "State-of-the-art Gym", "24/7 Concierge", "Smart Home System", "Valet Parking"],
  brochureUrl = "#",
  locationMapUrl = "#",
  stats = [
      { label: "Starting Price", value: "AED 1.1M" },
      { label: "Handover", value: "Q4 2025" },
      { label: "Payment Plan", value: "60/40" },
      { label: "Units", value: "150+" }
  ]
}: ProjectDetailBlockProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Content */}
          <div className="space-y-8">
            <div>
                <Badge variant="outline" className="mb-4 text-primary border-primary/20 bg-primary/5">
                    {developer}
                </Badge>
                <h2 className="text-4xl font-bold tracking-tight mb-4">{projectName}</h2>
                <div className="prose prose-lg text-muted-foreground">
                    <p>{description}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-muted/30 p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-xl font-semibold text-primary">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
                 <Button className="h-12 px-6" onClick={() => window.open(brochureUrl, '_blank')}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Brochure
                 </Button>
                 <Button variant="outline" className="h-12 px-6" onClick={() => window.open(locationMapUrl, '_blank')}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Location
                 </Button>
            </div>
          </div>

          {/* Right Column: Features List & Visuals */}
          <div className="bg-muted/10 rounded-2xl p-8 border space-y-8">
             <div>
                 <h3 className="text-xl font-semibold mb-6">Premium Amenities</h3>
                 <ul className="grid sm:grid-cols-2 gap-y-4 gap-x-2">
                     {features.map((feature, i) => (
                         <li key={i} className="flex items-start gap-3">
                             <div className="mt-1 bg-primary/10 p-1 rounded-full">
                                <Check className="h-3 w-3 text-primary" />
                             </div>
                             <span className="text-sm font-medium">{feature}</span>
                         </li>
                     ))}
                 </ul>
             </div>
             
             <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border">
                 <Image 
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000" 
                    alt="Amenities" 
                    fill 
                    className="object-cover"
                 />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                     <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                         View Masterplan
                     </Button>
                 </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
