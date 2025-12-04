'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Target } from 'lucide-react';

export function AdsShowcase() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">
              Automated Marketing
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Launch Google Ads in 90 Seconds</h2>
            <p className="text-lg text-muted-foreground">
              Our AI analyzes your site content, generates high-intent keywords, writes compelling ad copy, and launches a performance-optimized campaign—all without leaving your dashboard.
            </p>
            <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> AI Keyword Generation</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Automated Ad Copy</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Real-time Performance Tracking</li>
            </ul>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] bg-muted/30 rounded-2xl border flex items-center justify-center p-8">
                {/* Mockup of the Ads Dashboard */}
                <Card className="w-full shadow-xl">
                    <div className="p-4 border-b">
                        <h4 className="font-bold text-sm">Campaign: Dubai Hills Launch</h4>
                    </div>
                    <div className="p-4 grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-xs text-muted-foreground">Clicks</p>
                            <p className="text-lg font-bold">1,245</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Spend</p>
                            <p className="text-lg font-bold">$850</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Leads</p>
                            <p className="text-lg font-bold">78</p>
                        </div>
                    </div>
                    <div className="px-4 pb-4">
                        <div className="h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                             <BarChart3 className="h-8 w-8 text-blue-400" />
                        </div>
                    </div>
                </Card>
            </div>
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
