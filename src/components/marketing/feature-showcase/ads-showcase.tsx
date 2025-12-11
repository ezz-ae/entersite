'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Target, MousePointerClick, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export function AdsShowcase() {
  return (
    <section className="py-32 bg-background border-t border-border/40">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium border border-blue-500/20">
              <Target className="h-3.5 w-3.5" />
              Automated Marketing
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.05]">
                Launch Google Ads <br/>
                <span className="text-muted-foreground">in 90 Seconds.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our AI analyzes your site content, generates high-intent keywords, writes compelling ad copy, and launches a performance-optimized campaign—all without leaving your dashboard.
            </p>
            
            <ul className="space-y-4 pt-4">
                <li className="flex items-start gap-3">
                    <div className="bg-blue-100 p-1 rounded-full text-blue-600 mt-0.5"><CheckCircle className="h-4 w-4" /></div>
                    <span className="font-medium text-foreground/80">AI Keyword Generation & Bidding</span>
                </li>
                <li className="flex items-start gap-3">
                    <div className="bg-blue-100 p-1 rounded-full text-blue-600 mt-0.5"><CheckCircle className="h-4 w-4" /></div>
                    <span className="font-medium text-foreground/80">Automated Ad Copywriting</span>
                </li>
                <li className="flex items-start gap-3">
                    <div className="bg-blue-100 p-1 rounded-full text-blue-600 mt-0.5"><CheckCircle className="h-4 w-4" /></div>
                    <span className="font-medium text-foreground/80">Real-time Performance Dashboard</span>
                </li>
            </ul>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-50" />
            <div className="relative aspect-[4/3] bg-muted/20 rounded-2xl border border-border/50 flex items-center justify-center p-8 backdrop-blur-sm">
                
                {/* Mockup of the Ads Dashboard */}
                <Card className="w-full shadow-2xl border-border/50 overflow-hidden bg-background">
                    <div className="p-4 border-b border-border/50 flex justify-between items-center bg-muted/30">
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                             <h4 className="font-bold text-sm text-foreground">Campaign: Dubai Hills Launch</h4>
                        </div>
                        <Badge variant="outline" className="text-[10px] bg-background">Active</Badge>
                    </div>
                    
                    <div className="p-6 grid grid-cols-3 gap-6 text-center">
                        <div className="space-y-1">
                            <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-xs font-medium uppercase tracking-wider mb-2">
                                <MousePointerClick className="h-3.5 w-3.5" /> Clicks
                            </div>
                            <p className="text-2xl font-bold text-foreground">1,245</p>
                            <p className="text-[10px] text-green-600 font-medium">+12%</p>
                        </div>
                        <div className="space-y-1 border-x border-border/50">
                             <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-xs font-medium uppercase tracking-wider mb-2">
                                <DollarSign className="h-3.5 w-3.5" /> Spend
                            </div>
                            <p className="text-2xl font-bold text-foreground">$850</p>
                            <p className="text-[10px] text-muted-foreground">Budget: $1k</p>
                        </div>
                        <div className="space-y-1">
                             <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-xs font-medium uppercase tracking-wider mb-2">
                                <Target className="h-3.5 w-3.5" /> Leads
                            </div>
                            <p className="text-2xl font-bold text-foreground">78</p>
                            <p className="text-[10px] text-green-600 font-medium">CPL: $10.8</p>
                        </div>
                    </div>
                    
                    <div className="px-6 pb-6">
                        <div className="h-32 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/50 flex items-center justify-center relative overflow-hidden group">
                             <BarChart3 className="h-10 w-10 text-blue-300 dark:text-blue-800" />
                             {/* Fake Bars */}
                             <div className="absolute bottom-0 left-4 w-4 h-12 bg-blue-400/20 rounded-t-sm" />
                             <div className="absolute bottom-0 left-10 w-4 h-20 bg-blue-400/40 rounded-t-sm" />
                             <div className="absolute bottom-0 left-16 w-4 h-16 bg-blue-400/30 rounded-t-sm" />
                             <div className="absolute bottom-0 left-22 w-4 h-24 bg-blue-500 rounded-t-sm" />
                             <div className="absolute bottom-0 right-16 w-4 h-14 bg-blue-400/20 rounded-t-sm" />
                             <div className="absolute bottom-0 right-10 w-4 h-18 bg-blue-400/30 rounded-t-sm" />
                        </div>
                    </div>
                </Card>

            </div>
          </motion.div>
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
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
