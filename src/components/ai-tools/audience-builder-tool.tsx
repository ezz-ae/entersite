'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target, 
  Sparkles, 
  Plus, 
  ArrowRight, 
  Zap,
  MapPin,
  CircleDollarSign
} from 'lucide-react';

export function AudienceBuilderTool() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Audience Architect</h2>
          <p className="text-muted-foreground">Build high-intent Meta audiences using project-level data.</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-6 gap-2 h-11 shadow-lg shadow-purple-900/20">
          <Zap className="h-4 w-4" /> Sync to Meta
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Build Rules */}
        <div className="lg:col-span-2 space-y-6">
           <Card>
              <CardHeader>
                 <CardTitle className="text-xl">Audience Foundation</CardTitle>
                 <CardDescription>We'll use our verified lead data to seed this audience.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Project Interest</label>
                       <div className="flex flex-wrap gap-2">
                          {['Dubai Marina', 'Creek Harbour', 'Palm Jumeirah', 'Business Bay'].map(tag => (
                             <Badge key={tag} variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-primary hover:text-white transition-colors">
                                {tag}
                             </Badge>
                          ))}
                          <Button variant="outline" size="sm" className="h-7 border-dashed"><Plus className="h-3 w-3 mr-1" /> Add Area</Button>
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Lead Profile</label>
                       <div className="space-y-2">
                          <SelectionRow icon={CircleDollarSign} label="High Net Worth Investors" active={true} />
                          <SelectionRow icon={MapPin} label="European Expats in UAE" active={false} />
                          <SelectionRow icon={Target} label="First-time Home Buyers" active={false} />
                       </div>
                    </div>
                 </div>

                 <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <Sparkles className="h-5 w-5 text-purple-500" />
                       </div>
                       <div>
                          <p className="font-bold text-purple-900 dark:text-purple-100">AI Lookalike Engine</p>
                          <p className="text-xs text-purple-600/80">Generating lookalikes from 12,000+ verified buyers.</p>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div className="flex justify-between text-xs font-bold text-purple-700 uppercase">
                          <span>Narrow (1%)</span>
                          <span>Balanced (3%)</span>
                          <span>Broad (5%)</span>
                       </div>
                       <div className="h-2 w-full bg-purple-200 dark:bg-purple-900/40 rounded-full">
                          <div className="h-full bg-purple-500 w-[33%] rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                       </div>
                    </div>
                 </div>
              </CardContent>
           </Card>

           <div className="flex gap-4">
              <Button variant="outline" className="flex-1 h-14 text-lg font-bold">Save as Draft</Button>
              <Button className="flex-1 h-14 text-lg font-bold bg-purple-600 hover:bg-purple-700 gap-2">
                 Generate Meta Audience <ArrowRight className="h-5 w-5" />
              </Button>
           </div>
        </div>

        {/* Right Column: Audience Summary */}
        <div className="space-y-6">
           <Card className="bg-zinc-900 border-white/5 text-white">
              <CardHeader>
                 <CardTitle className="text-zinc-400 text-xs uppercase tracking-widest">Audience Reach</CardTitle>
                 <div className="mt-2">
                    <span className="text-4xl font-bold">142,000</span>
                    <span className="text-zinc-500 text-sm ml-2">Potential reach</span>
                 </div>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="h-40 w-full bg-zinc-800 rounded-xl relative overflow-hidden flex items-center justify-center">
                    {/* Visual representation of audience overlap */}
                    <div className="absolute w-32 h-32 rounded-full bg-purple-500/20 border border-purple-500/40 -translate-x-10" />
                    <div className="absolute w-32 h-32 rounded-full bg-blue-500/20 border border-blue-500/40 translate-x-10" />
                    <p className="text-[10px] text-zinc-500 font-mono relative z-10">Meta x Project Data Overlap</p>
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Predicted Performance</h4>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-3 rounded-lg bg-zinc-800/50">
                          <p className="text-[10px] text-zinc-500 uppercase">Est. CTR</p>
                          <p className="text-xl font-bold text-green-500">3.4%</p>
                       </div>
                       <div className="p-3 rounded-lg bg-zinc-800/50">
                          <p className="text-[10px] text-zinc-500 uppercase">Lead Quality</p>
                          <p className="text-xl font-bold text-blue-400">High</p>
                       </div>
                    </div>
                 </div>
              </CardContent>
           </Card>

           <Card>
              <CardHeader>
                 <CardTitle className="text-sm">Direct Data Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                 <p className="text-xs text-muted-foreground leading-relaxed">
                    Based on current market data, <strong>Creek Harbour</strong> is trending with European investors aged 35-50.
                 </p>
                 <Button variant="ghost" size="sm" className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50/50 text-xs font-bold">
                    View Market Heatmap
                 </Button>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

function SelectionRow({ icon: Icon, label, active }: any) {
  return (
    <div className={cn(
      "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer",
      active ? "bg-primary/5 border-primary/20 shadow-sm" : "bg-transparent border-transparent hover:bg-muted/50"
    )}>
       <div className="flex items-center gap-3">
          <Icon className={cn("h-4 w-4", active ? "text-primary" : "text-muted-foreground")} />
          <span className={cn("text-sm font-medium", active ? "text-foreground" : "text-muted-foreground")}>{label}</span>
       </div>
       <div className={cn(
         "w-4 h-4 rounded-full border flex items-center justify-center",
         active ? "border-primary bg-primary" : "border-muted-foreground/30"
       )}>
          {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
       </div>
    </div>
  )
}

import { cn } from '@/lib/utils';
