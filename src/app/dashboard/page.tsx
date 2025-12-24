'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Megaphone, 
  Zap, 
  TrendingUp, 
  Plus, 
  ArrowRight, 
  MessageSquare,
  BarChart3,
  MousePointerClick,
  Target
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-10 pb-20">
      {/* 1. The Power Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border/40 pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Command Center</h1>
          <p className="text-xl text-muted-foreground font-light">
            Welcome back. You have <span className="text-foreground font-medium">3 active projects</span> and <span className="text-green-600 font-medium">12 new leads</span> today.
          </p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" className="rounded-full px-6">View Reports</Button>
            <Link href="/dashboard/sites">
                <Button className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 gap-2">
                    <Plus className="h-4 w-4" /> Create New Site
                </Button>
            </Link>
        </div>
      </div>

      {/* 2. Active Focus: The "Next Step" Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-primary/20 bg-primary/[0.02] overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="h-32 w-32 text-primary" />
            </div>
            <CardHeader>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-2">
                    Recommended Action
                </div>
                <CardTitle className="text-2xl">Scale "Dubai Luxury Launch"</CardTitle>
                <CardDescription className="text-lg">
                    This site is getting traffic but has no active ad campaign. 
                    Launch a Google Search campaign to increase leads by an estimated 40%.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button className="gap-2 h-12 px-8 text-base">
                    Launch Campaign Now <ArrowRight className="h-4 w-4" />
                </Button>
            </CardContent>
        </Card>

        <Card className="border-border/60">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Market Pulse
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/30 border">
                    <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Dubai Marina ROI</p>
                    <p className="text-2xl font-bold">8.4% <span className="text-xs text-green-600 font-medium ml-1">↑ 0.2%</span></p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border">
                    <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Top Developer Trend</p>
                    <p className="text-lg font-bold">Emaar - Beachfront</p>
                </div>
                <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/5 text-sm font-bold">
                    Full Market Analysis
                </Button>
            </CardContent>
        </Card>
      </div>

      {/* 3. The Services Grid: Categorized & Visual */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight px-1">Your Growth Toolkit</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <ServiceCard 
            title="AI Site Architect"
            desc="Generate landing pages pre-loaded with UAE project data."
            icon={Globe}
            href="/dashboard/sites"
            count="3 Sites"
          />
          <ServiceCard 
            title="Campaign Manager"
            desc="Automated Google & Meta ads optimized for real estate."
            icon={Megaphone}
            href="/dashboard/marketing"
            count="2 Active"
          />
          <ServiceCard 
            title="Lead CRM"
            desc="Smart lead scoring and automated WhatsApp routing."
            icon={Target}
            href="/dashboard/leads"
            count="12 New"
          />
          <ServiceCard 
            title="AI Training"
            desc="Train your 24/7 AI Sales Agent on your brochures."
            icon={Bot}
            href="/dashboard/ai-tools"
            status="92% Trained"
          />
        </div>
      </div>

      {/* 4. Real Performance Insight */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            label="Total Impressions" 
            value="42.5K" 
            icon={MousePointerClick} 
            trend="+12%" 
          />
          <MetricCard 
            label="Lead Conversion" 
            value="3.2%" 
            icon={BarChart3} 
            trend="+0.8%" 
          />
          <MetricCard 
            label="Cost Per Lead" 
            value="$18.40" 
            icon={TrendingUp} 
            trend="-4%" 
            positive
          />
          <MetricCard 
            label="AI Interacted" 
            value="840" 
            icon={MessageSquare} 
            trend="+156" 
          />
      </div>
    </div>
  );
}

function ServiceCard({ title, desc, icon: Icon, href, count, status }: any) {
    return (
        <Link href={href}>
            <Card className="h-full hover:shadow-xl hover:border-primary/40 transition-all duration-300 group cursor-pointer border-border/60">
                <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {desc}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{count || status}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform group-hover:text-primary" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

function MetricCard({ label, value, icon: Icon, trend, positive = true }: any) {
    return (
        <Card className="border-border/40 bg-muted/10">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold">{value}</span>
                    <span className={cn(
                        "text-xs font-bold mb-1.5",
                        positive ? "text-green-600" : "text-red-600"
                    )}>{trend}</span>
                </div>
            </CardContent>
        </Card>
    )
}
