'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface HeroLeadFormBlockProps {
  headline?: string;
  subtext?: string;
  backgroundImage?: string;
}

export function HeroLeadFormBlock({
  headline = "Find Your Dream Home in Dubai",
  subtext = "Browse thousands of verified listings and get exclusive offers directly from developers.",
  backgroundImage = "https://images.unsplash.com/photo-1512453979798-5ea904ac66de?auto=format&fit=crop&q=80&w=2000"
}: HeroLeadFormBlockProps) {
  return (
    <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
             <Image 
                src={backgroundImage} 
                alt="Hero Background" 
                fill 
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container relative z-10 px-4 flex flex-col items-center">
            <div className="text-center text-white max-w-3xl mb-10 space-y-4">
                 <h1 className="text-4xl md:text-5xl font-bold">{headline}</h1>
                 <p className="text-xl opacity-90">{subtext}</p>
            </div>

            <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-2 md:p-4">
                <form className="flex flex-col md:flex-row gap-2">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                        <Input placeholder="Location (e.g. Dubai Marina)" className="h-12 border-none bg-gray-50 focus:ring-0" />
                        <select className="h-12 px-3 rounded-md bg-gray-50 border-none text-sm text-muted-foreground focus:outline-none focus:ring-0">
                            <option value="">Property Type</option>
                            <option value="apartment">Apartment</option>
                            <option value="villa">Villa</option>
                            <option value="townhouse">Townhouse</option>
                        </select>
                         <select className="h-12 px-3 rounded-md bg-gray-50 border-none text-sm text-muted-foreground focus:outline-none focus:ring-0">
                            <option value="">Price Range</option>
                            <option value="1">Up to 1M AED</option>
                            <option value="2">1M - 3M AED</option>
                            <option value="3">3M+ AED</option>
                        </select>
                    </div>
                    <Button size="lg" className="h-12 px-8 text-base">Search</Button>
                </form>
            </div>
        </div>
    </section>
  );
}
