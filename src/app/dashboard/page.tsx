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
  Target,
  Bot,
  Search,
  Instagram,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { getDashboardStats } from '@/lib/dashboard-service';

export default function DashboardOverviewPage() {
  const stats = getDashboardStats();

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-700">
      {/* 1. Header with Stats Summary */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2">Command Center</h1>
          <p className="text-lg text-zinc-500 font-light">
            Welcome back. Your OS is running with <span className="text-white font-medium">{stats.totalProjects} active projects</span> and <span className="text-green-500 font-medium">{stats.newLeads} new leads</span> today.
          </p>
        </div>
        <div className="flex gap-3">
             <Link href="/builder">
                <Button className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 gap-3 font-bold text-lg">
                    <Plus className="h-5 w-5" /> Start Project
                </Button>
            </Link>
        </div>
      </div>

      {/* 2. THE GROWTH OS TOOLKIT - Everything Front and Center */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
                <Zap className="h-4 w-4 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Service Infrastructure</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <ServiceBox 
            title="Google Ads"
            desc="AI Search & Keyword engine."
            icon={Search}
            href="/dashboard/marketing?service=google-ads"
            color="blue"
            badge="ROI 12.4x"
          />
          <ServiceBox 
            title="Instagram Bot"
            desc="Automated DM sales agent."
            icon={Instagram}
            href="/dashboard/ai-tools?service=chat"
            color="pink"
            status="Active"
          />
          <ServiceBox 
            title="Site Architect"
            desc="Brochure-to-Web generator."
            icon={Globe}
            href="/dashboard/sites"
            color="orange"
            count={`${stats.totalProjects} Sites`}
          />
          <ServiceBox 
            title="Audience Pro"
            desc="Meta Lookalike creator."
            icon={Users}
            href="/dashboard/ai-tools?service=audiences"
            color="purple"
            badge="High Quality"
          />
          <ServiceBox 
            title="Lead CRM"
            desc="Instant WhatsApp lead sync."
            icon={Target}
            href="/dashboard/leads"
            color="green"
            count="45 Total"
          />
        </div>
      </div>

      {/* 3. Performance & Focus */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommendation Engine */}
        <Card className="lg:col-span-2 border-white/5 bg-zinc-900/50 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden group">
            <CardHeader className="p-10 pb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-500 text-[10px] font-bold uppercase tracking-widest mb-4 border border-blue-500/20">
                    Vertex AI Insight
                </div>
                <CardTitle className="text-3xl font-bold text-white tracking-tight">Scale "Dubai Luxury Launch"</CardTitle>
                <CardDescription className="text-xl text-zinc-500 font-light mt-2 leading-relaxed">
                    This site is trending in Europe. Launch a <span className="text-white font-bold">Google Ads</span> campaign now to increase leads by an estimated 40%.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-10 pt-0">
                <Link href="/dashboard/marketing">
                    <Button className="h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold text-lg group-hover:scale-[1.02] transition-transform shadow-xl shadow-blue-600/20">
                        Launch Google Ads Engine <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                </Link>
            </CardContent>
        </Card>

        {/* Market Pulse */}
        <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-3xl rounded-[2.5rem]">
            <CardHeader className="p-10 pb-6">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-white">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                    Market Pulse
                </CardTitle>
            </CardHeader>
            <CardContent className="p-10 pt-0 space-y-6">
                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 group hover:border-blue-500/30 transition-all cursor-default">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Dubai Marina ROI</p>
                    <p className="text-3xl font-black text-white">8.4% <span className="text-xs text-green-500 font-medium ml-1">↑ 0.2%</span></p>
                </div>
                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 group hover:border-blue-500/30 transition-all cursor-default">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Top Trend</p>
                    <p className="text-xl font-bold text-white leading-none">Emaar Beachfront</p>
                </div>
            </CardContent>
        </Card>
      </div>

      {/* 4. Real Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard label="Impressions" value="42.5K" icon={MousePointerClick} trend="+12%" />
          <MetricCard label="Conversion" value="3.2%" icon={BarChart3} trend="+0.8%" />
          <MetricCard label="Cost/Lead" value="AED 48" icon={TrendingUp} trend="-4%" positive />
          <MetricCard label="AI Interacted" value="840" icon={MessageSquare} trend="+156" />
      </div>
    </div>
  );
}

function ServiceBox({ title, desc, icon: Icon, href, color, badge, status, count }: any) {
    const colorClasses: any = {
        blue: "text-blue-500 bg-blue-600/10 border-blue-500/20",
        pink: "text-pink-500 bg-pink-600/10 border-pink-500/20",
        orange: "text-orange-500 bg-orange-600/10 border-orange-500/20",
        purple: "text-purple-500 bg-purple-600/10 border-purple-500/20",
        green: "text-green-500 bg-green-600/10 border-green-500/20",
    };

    return (
        <Link href={href} className="group">
            <Card className="h-full bg-zinc-900/50 border-white/5 backdrop-blur-3xl rounded-[2rem] hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden">
                <CardContent className="p-8 flex flex-col h-full">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border", colorClasses[color])}>
                        <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-light mb-8 flex-grow">{desc}</p>
                    
                    <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{badge || status || count}</span>
                        <ArrowRight className="h-4 w-4 text-zinc-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

function MetricCard({ label, value, icon: Icon, trend, positive = true }: any) {
    return (
        <Card className="border-white/5 bg-zinc-900/30 rounded-[2rem]">
            <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none">{label}</p>
                    <Icon className="h-4 w-4 text-zinc-700" />
                </div>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-white">{value}</span>
                    <span className={cn(
                        "text-[10px] font-bold mb-1.5 px-2 py-0.5 rounded-full",
                        positive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    )}>{trend}</span>
                </div>
            </CardContent>
        </Card>
    )
}
