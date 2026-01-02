'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Send, 
  Users, 
  MessageCircle, 
  Zap, 
  Clock, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  BrainCircuit
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIComposer } from '@/components/messaging/ai-composer';

export default function SmsMarketingPage() {
  const [activeTab, setActiveTab] = useState('composer');

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">SMS VIP Broadcast</h1>
          <p className="text-zinc-500 text-lg font-light">High-urgency investor outreach powered by EntreSite AI.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
             <div className="bg-zinc-900 border border-white/10 rounded-2xl px-6 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <BrainCircuit className="h-4 w-4 text-green-500" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Global IQ</p>
                    <p className="text-xs font-bold text-white uppercase">3,750+ Nodes</p>
                </div>
             </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard label="Total Dispatched" value="12,400" icon={Send} trend="+1.2K" />
          <MetricCard label="Read Rate" value="98.2%" icon={Zap} trend="+0.4%" />
          <MetricCard label="WhatsApp Syncs" value="452" icon={MessageCircle} trend="+84" />
      </div>

      <Tabs defaultValue="composer" className="space-y-10" onValueChange={setActiveTab}>
        <div className="border-b border-white/5">
            <TabsList className="bg-transparent h-auto p-0 gap-8">
                <TabsTrigger value="composer" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-green-600 rounded-none pb-4 px-0 h-auto text-lg font-medium transition-all gap-2 text-zinc-500 data-[state=active]:text-white">
                    <Sparkles className="h-5 w-5" /> AI SMS Composer
                </TabsTrigger>
                <TabsTrigger value="campaigns" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-green-600 rounded-none pb-4 px-0 h-auto text-lg font-medium transition-all gap-2 text-zinc-500 data-[state=active]:text-white">
                    <Smartphone className="h-5 w-5" /> Active Broadcasts
                </TabsTrigger>
                <TabsTrigger value="audiences" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-green-600 rounded-none pb-4 px-0 h-auto text-lg font-medium transition-all gap-2 text-zinc-500 data-[state=active]:text-white">
                    <Users className="h-5 w-5" /> Verified Lists
                </TabsTrigger>
            </TabsList>
        </div>

        {/* --- AI Composer (The Core Intelligence) --- */}
        <TabsContent value="composer" className="space-y-12">
            <div className="bg-green-600/5 border border-green-500/20 p-1 rounded-[3rem]">
                <AIComposer mode="sms" />
            </div>
        </TabsContent>

        {/* --- Campaigns View --- */}
        <TabsContent value="campaigns" className="space-y-12">
            <Card className="bg-zinc-900/50 border-white/5 rounded-[2.5rem] overflow-hidden">
                <div className="divide-y divide-white/5">
                    <CampaignRow 
                        name="Creek Waters Launch" 
                        status="Delivered" 
                        recipients="2,400" 
                        openRate="99%" 
                    />
                    <CampaignRow 
                        name="Palm Jebel Ali VIP" 
                        status="In Progress" 
                        recipients="1,200" 
                        openRate="84%" 
                        active
                    />
                    <CampaignRow 
                        name="Investor Yield Report" 
                        status="Draft" 
                        recipients="450" 
                        openRate="0%" 
                    />
                </div>
            </Card>
        </TabsContent>

        {/* --- Audiences View --- */}
        <TabsContent value="audiences" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="bg-zinc-900/50 border-white/5 rounded-[2.5rem] p-10">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-white">Verified Segments</h3>
                        <Button variant="ghost" size="sm" className="text-zinc-500 uppercase font-black text-[10px] tracking-widest hover:text-white">Global Search</Button>
                    </div>
                    <div className="space-y-4">
                        <AudienceRow name="High Net Worth - UAE" count="4,120" lastSync="1h ago" active />
                        <AudienceRow name="International Yield Seekers" count="2,840" lastSync="Yesterday" />
                        <AudienceRow name="DSO Project Interest" count="1,240" lastSync="3d ago" />
                    </div>
                </Card>
                <div className="p-10 bg-green-600/5 border border-green-500/20 rounded-[2.5rem] flex flex-col justify-center space-y-6">
                    <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                    <h4 className="text-2xl font-black tracking-tight italic uppercase">98% Delivery Rate</h4>
                    <p className="text-zinc-400 leading-relaxed font-light">
                        Our SMS infrastructure is optimized for UAE teleco networks (Etisalat/Du), ensuring your broadcasts land in the inbox, not the spam folder.
                    </p>
                    <Button className="h-14 rounded-2xl bg-white text-black font-bold">Request Direct API Access</Button>
                </div>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CampaignRow({ name, status, recipients, openRate, active }: any) {
    return (
        <div className="p-8 flex items-center justify-between group hover:bg-white/5 transition-all">
            <div className="flex items-center gap-6">
                <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center border transition-all",
                    active ? "bg-green-600 border-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]" : "bg-white/5 border-white/10 text-zinc-500"
                )}>
                    <Smartphone className="h-6 w-6" />
                </div>
                <div>
                    <h4 className="font-bold text-white text-lg tracking-tight">{name}</h4>
                    <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-1">{status}</p>
                </div>
            </div>
            <div className="flex gap-12 text-right">
                <div>
                    <p className="text-[10px] font-black text-zinc-600 uppercase mb-1 tracking-widest">Reach</p>
                    <p className="text-lg font-black text-white italic">{recipients}</p>
                </div>
                <div>
                    <p className="text-[10px] font-black text-zinc-600 uppercase mb-1 tracking-widest">Open</p>
                    <p className="text-lg font-black text-green-500 italic">{openRate}</p>
                </div>
            </div>
        </div>
    )
}

function AudienceRow({ name, count, lastSync, active }: any) {
    return (
        <div className={cn(
            "p-6 rounded-2xl flex items-center justify-between group transition-all cursor-pointer border",
            active ? "bg-green-600/5 border-green-500/20" : "bg-black/40 border-transparent hover:border-white/10"
        )}>
            <div className="flex items-center gap-4">
                <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    active ? "bg-green-600 text-white" : "bg-white/5 text-zinc-500"
                )}>
                    <Users className="h-5 w-5" />
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm">{name}</h4>
                    <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mt-1">Synced {lastSync}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-lg font-black text-white italic">{count}</p>
                <p className="text-[10px] text-zinc-600 font-bold uppercase">Nodes</p>
            </div>
        </div>
    )
}

function MetricCard({ label, value, icon: Icon, trend }: any) {
    return (
        <Card className="bg-zinc-900/50 border-white/5 rounded-[2.5rem]">
            <CardContent className="p-10">
                <div className="flex justify-between items-start mb-8">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">{label}</p>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                        <Icon className="h-5 w-5 text-zinc-600" />
                    </div>
                </div>
                <div className="flex items-end gap-3">
                    <span className="text-5xl font-black text-white tracking-tighter italic uppercase">{value}</span>
                    <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-3 py-1 rounded-full uppercase tracking-tighter mb-2">{trend}</span>
                </div>
            </CardContent>
        </Card>
    )
}
