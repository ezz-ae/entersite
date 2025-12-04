'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Link as LinkIcon, Bot } from 'lucide-react';

export function SeoShowcase() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="relative">
            <div className="aspect-[4/3] bg-muted/30 rounded-2xl border flex items-center justify-center p-8">
                {/* Mockup of the SEO Settings Dialog */}
                <Card className="w-full shadow-xl">
                    <div className="p-4 border-b">
                        <h4 className="font-bold text-sm flex items-center gap-2">
                            <Search className="h-4 w-4" /> SEO Optimizer
                        </h4>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-200">
                            <h5 className="text-xs font-semibold text-blue-800 mb-2">Google Preview</h5>
                            <div className="font-sans">
                                <div className="text-xl text-[#1a0dab] font-medium truncate">
                                    Luxury Villas for Sale | Dubai Hills
                                </div>
                                <div className="text-sm text-[#006621]">
                                    https://yoursite.com/dubai-hills-villas
                                </div>
                                <div className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                    Discover exclusive 5-bedroom villas in Dubai Hills Estate. Gated community, golf course views...
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="outline">dubai villas</Badge>
                            <Badge variant="outline">luxury property</Badge>
                            <Badge variant="outline">emaar</Badge>
                        </div>
                    </div>
                </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="outline" className="border-green-500/20 bg-green-500/5 text-green-700">
              Organic Growth
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Rank Higher, Convert More</h2>
            <p className="text-lg text-muted-foreground">
              Our AI doesn't just write content; it writes content that ranks. Get automated meta tags, keyword suggestions, and SEO-optimized copy for all your listings and pages.
            </p>
            <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> AI Meta Tag Generation</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Keyword Opportunity Finder</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Automatic Internal Linking</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

function CheckCircle(props: any) {
    return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
