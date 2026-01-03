'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Send, 
  Sparkles, 
  Users, 
  Zap, 
  Layout, 
  UploadCloud, 
  ArrowRight, 
  ShieldCheck, 
  Database,
  Plus,
  Clock,
  Rocket,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export default function EmailMarketingPage() {
  const [activeTab, setActiveTab] = useState('templates');

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">Email Intelligence</h1>
          <p className="text-zinc-500 text-lg font-light">Automated investor sequences powered by Vertex AI.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
             <Button className="h-14 px-10 rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-lg gap-3 shadow-xl shadow-blue-900/20 w-full md:w-auto">
                <Plus className="h-5 w-5" /> New Sequence
            </Button>
        </div>
      </div>

      <Tabs defaultValue="templates" className="space-y-10" onValueChange={setActiveTab}>
        <div className="border-b border-white/5">
            <TabsList className="bg-transparent h-auto p-0 gap-8">
                <TabsTrigger value="templates" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none pb-4 px-0 h-auto text-lg font-medium transition-all gap-2 text-zinc-500 data-[state=active]:text-white">
                    <Layout className="h-5 w-5" /> Verified Templates
                </TabsTrigger>
                <TabsTrigger value="audiences" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none pb-4 px-0 h-auto text-lg font-medium transition-all gap-2 text-zinc-500 data-[state=active]:text-white">
                    <Users className="h-5 w-5" /> Investor Lists
                </TabsTrigger>
                <TabsTrigger value="data-mining" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none pb-4 px-0 h-auto text-lg font-medium transition-all gap-2 text-zinc-500 data-[state=active]:text-white">
                    <Database className="h-5 w-5" /> Verified Data Mining
                </TabsTrigger>
            </TabsList>
        </div>

        {/* --- Templates View --- */}
        <TabsContent value="templates" className="space-y-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <EmailTemplateCard 
                    title="Investor Yield Report" 
                    desc="Showcases current ROI trends in Dubai Marina." 
                    performance="42% Open Rate" 
                    icon={Zap}
                />
                <EmailTemplateCard 
                    title="Off-Plan Launch VIP" 
                    desc="Exclusive first-access invite for upcoming projects." 
                    performance="58% Open Rate" 
                    icon={Rocket}
                />
                <EmailTemplateCard 
                    title="Post-Viewing Follow-up" 
                    desc="Automated thank you and next steps after a tour." 
                    performance="89% Open Rate" 
                    isNew
                    icon={Clock}
                />
            </div>

            {/* AI Sequence Architect */}
            <Card className="bg-blue-600 border-none text-white rounded-[3rem] overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
                    <Sparkles className="h-64 w-64" />
                </div>
                <div className="relative z-10 p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="max-w-2xl space-y-6">
                        <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">AI Sequence <br/>Architect.</h2>
                        <p className="text-xl text-blue-100 font-medium">Upload a project brochure, and our AI will write a 5-step hyper-personalized investor nurturing sequence.</p>
                    </div>
                    <Button className="h-20 px-16 rounded-full bg-white text-blue-600 font-black text-2xl hover:scale-105 transition-transform shadow-2xl">
                        Launch Composer <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                </div>
            </Card>
        </TabsContent>

        {/* --- Audiences View --- */}
        <TabsContent value="audiences" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-zinc-900/50 border-white/5 rounded-[2.5rem] p-10">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-white">Your Lead Segments</h3>
                            <Button variant="ghost" size="sm" className="text-zinc-500 uppercase font-black text-[10px] tracking-widest hover:text-white">Manage All</Button>
                        </div>
                        <div className="space-y-4">
                            <AudienceRow name="European High Net Worth" count="1,240" lastSync="2h ago" />
                            <AudienceRow name="Local Off-Plan Investors" count="3,450" lastSync="Yesterday" />
                            <AudienceRow name="Creek Harbour Interest" count="840" lastSync="5m ago" active />
                        </div>
                    </Card>

                    <div className="border-2 border-dashed border-white/5 rounded-[2.5rem] p-12 flex flex-col items-center justify-center gap-6 group hover:border-blue-500/30 transition-all cursor-pointer bg-white/5">
                        <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-zinc-600 group-hover:text-blue-500 transition-colors">
                            <UploadCloud className="h-10 w-10" />
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-xl font-bold text-zinc-300">Upload Investor List</p>
                            <p className="text-zinc-500 text-sm">Drop your CSV or Excel lead files here. AI will auto-clean and verify.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card className="bg-zinc-950 border-white/5 rounded-[2.5rem] p-10 space-y-8">
                        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">List Verification</h4>
                        <div className="space-y-6">
                            <VerificationItem label="Spam Filter" active />
                            <VerificationItem label="Syntax Analysis" active />
                            <VerificationItem label="MX Record Validation" active />
                            <VerificationItem label="Lead Scoring" />
                        </div>
                        <Separator className="bg-white/5" />
                        <p className="text-xs text-zinc-600 leading-relaxed font-medium text-center">Verified lists result in 94% higher delivery rates to the inbox.</p>
                    </Card>
                </div>
            </div>
        </TabsContent>

        {/* --- Data Mining View --- */}
        <TabsContent value="data-mining" className="space-y-8">
            <Card className="bg-zinc-900 border border-white/5 rounded-[3.5rem] overflow-hidden relative p-16 flex flex-col md:flex-row items-center gap-16">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent pointer-events-none" />
                 
                 <div className="w-full md:w-1/2 space-y-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-bold uppercase tracking-widest">
                        <ShieldCheck className="h-4 w-4" /> Enterprise Capability
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-white">
                        Rent our <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Lead Machine.</span>
                    </h2>
                    <p className="text-xl text-zinc-400 font-light leading-relaxed">
                        Access our verified pool of <span className="text-white font-bold">10,000+ active UAE investors</span>. These are verified leads ready to receive high-yield project offers.
                    </p>
                    <div className="flex flex-col gap-4">
                        <FeaturePoint text="Verified WhatsApp & Email data" />
                        <FeaturePoint text="Interest segmented by area & price" />
                        <FeaturePoint text="Direct integration with SendGrid" />
                    </div>
                 </div>

                 <div className="w-full md:w-1/2 relative z-10">
                    <Card className="bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 space-y-10 shadow-2xl">
                        <div className="text-center space-y-2">
                            <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Package Pricing</p>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-6xl font-black text-white">$499</span>
                                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">/ campaign</span>
                            </div>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center border-b border-white/5 pb-4">
                                <span className="text-zinc-400 font-medium">Investor Reach</span>
                                <span className="text-white font-black">5,000 Leads</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-white/5 pb-4">
                                <span className="text-zinc-400 font-medium">Guaranteed Open Rate</span>
                                <span className="text-emerald-500 font-black">15%+</span>
                            </li>
                        </ul>
                        <Button className="w-full h-20 rounded-[2rem] bg-blue-600 hover:bg-blue-700 font-black text-xl shadow-xl shadow-blue-900/20">
                            Unlock Data Node
                        </Button>
                        <p className="text-[10px] text-center text-zinc-600 font-bold uppercase tracking-widest leading-relaxed">Compliance: All leads are double opt-in and GDPR compliant for UAE market entry.</p>
                    </Card>
                 </div>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmailTemplateCard({ title, desc, performance, isNew, icon: Icon }: any) {
    return (
        <Card className="bg-zinc-950 border-white/5 rounded-[2.5rem] p-10 hover:border-blue-500/30 transition-all group cursor-pointer h-full flex flex-col">
            <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:bg-blue-600/10 group-hover:text-blue-500 transition-colors">
                    <Icon className="h-8 w-8" />
                </div>
                {isNew && <Badge className="bg-blue-600 text-white border-0 text-[8px] font-black tracking-[0.2em] px-3 py-1.5 rounded-full uppercase">New</Badge>}
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
            <p className="text-base text-zinc-500 font-light mb-10 leading-relaxed flex-grow">{desc}</p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-500 mt-auto">
                <Zap className="h-4 w-4" /> {performance}
            </div>
        </Card>
    )
}

function AudienceRow({ name, count, lastSync, active }: any) {
    return (
        <div className={cn(
            "p-6 rounded-2xl flex items-center justify-between group transition-all cursor-pointer border",
            active ? "bg-blue-600/5 border-blue-500/20" : "bg-black/40 border-transparent hover:border-white/10"
        )}>
            <div className="flex items-center gap-4">
                <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    active ? "bg-blue-600 text-white" : "bg-white/5 text-zinc-500"
                )}>
                    <Users className="h-5 w-5" />
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm">{name}</h4>
                    <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mt-1">Updated {lastSync}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-lg font-black text-white">{count}</p>
                <p className="text-[10px] text-zinc-600 font-bold uppercase">Leads</p>
            </div>
        </div>
    )
}

function VerificationItem({ label, active }: any) {
    return (
        <div className="flex items-center justify-between">
            <span className={cn("text-sm font-medium", active ? "text-zinc-300" : "text-zinc-600")}>{label}</span>
            {active ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <div className="w-4 h-4 rounded-full border border-white/5" />}
        </div>
    )
}

function FeaturePoint({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center">
                <CheckCircle2 className="h-3 w-3 text-blue-500" />
            </div>
            <span className="text-sm font-bold text-zinc-300">{text}</span>
        </div>
    )
}
