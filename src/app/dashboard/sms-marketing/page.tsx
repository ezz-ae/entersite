'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Send, Users, MessageCircle, Zap, Clock, ArrowRight, CheckCircle2, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function SmsMarketingPage() {
  return (
    <div className="space-y-8 md:space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">SMS VIP Broadcast</h1>
          <p className="text-md md:text-lg text-zinc-500 font-light mt-1">Launch targeted SMS/WhatsApp blasts to your investor lists.</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link href="/dashboard/sms-marketing/import">
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full px-6 h-11 font-bold gap-2 text-xs uppercase tracking-wider">
               <Upload className="h-4 w-4" /> Import Contacts
            </Button>
          </Link>
          <Button className="bg-green-600 hover:bg-green-700 rounded-full px-6 h-11 font-bold gap-2 text-xs uppercase tracking-wider">
             <Send className="h-4 w-4" /> Create Broadcast
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <MetricCard label="Total Sent" value="12,400" icon={Send} trend="+1.2K" />
          <MetricCard label="Open Rate" value="98.2%" icon={Zap} trend="+0.4%" />
          <MetricCard label="WhatsApp Conversions" value="452" icon={MessageCircle} trend="+84" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
         {/* Campaigns List */}
         <Card className="lg:col-span-3 bg-zinc-900/50 border-white/5 rounded-3xl md:rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-6 md:p-8 border-b border-white/5">
                <CardTitle className="text-xl">Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
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
            </CardContent>
         </Card>

         {/* Composer Side */}
         <Card className="lg:col-span-2 bg-zinc-900/50 border-white/5 rounded-3xl md:rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-6 md:p-8">
                <CardTitle className="text-xl">Quick Send</CardTitle>
                <CardDescription>Send a fast update to a targeted list.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 pt-0 space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Select Audience</label>
                    <div className="h-12 bg-black/40 border border-white/10 rounded-xl flex items-center px-4 text-sm text-zinc-300">
                        <Users className="h-4 w-4 mr-2 text-zinc-600" /> High-Intent Investors (450)
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Message Content</label>
                    <textarea 
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-green-500/50 min-h-[120px] resize-none"
                        placeholder="Hi {name}, Emaar just released 5 cancelled units in Creek Beach. Instant 8% ROI. Call me now to book."
                    />
                </div>
                <Button className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 font-bold text-lg gap-3">
                    Send VIP Broadcast <Send className="h-5 w-5" />
                </Button>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}

function CampaignRow({ name, status, recipients, openRate, active }: any) {
    return (
        <div className="p-4 md:p-6 flex items-center justify-between group hover:bg-white/5 transition-all">
            <div className="flex items-center gap-4">
                <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0",
                    active ? "bg-green-600/10 border-green-500/20 text-green-500" : "bg-white/5 border-white/10 text-zinc-500"
                )}>
                    <Smartphone className="h-5 w-5" />
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm">{name}</h4>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-1">{status}</p>
                </div>
            </div>
            <div className="hidden sm:flex gap-8 text-right">
                <div>
                    <p className="text-[10px] font-bold text-zinc-600 uppercase mb-0.5">Reach</p>
                    <p className="text-sm font-bold text-white">{recipients}</p>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-zinc-600 uppercase mb-0.5">Open</p>
                    <p className="text-sm font-bold text-green-500">{openRate}</p>
                </div>
            </div>
        </div>
    )
}

function MetricCard({ label, value, icon: Icon, trend }: any) {
    return (
        <Card className="bg-zinc-900/50 border-white/5 rounded-3xl md:rounded-[2rem]">
            <CardContent className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</p>
                    <Icon className="h-4 w-4 text-zinc-700" />
                </div>
                <div className="flex items-end gap-2">
                    <span className="text-2xl md:text-3xl font-black text-white">{value}</span>
                    <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">{trend}</span>
                </div>
            </CardContent>
        </Card>
    )
}
