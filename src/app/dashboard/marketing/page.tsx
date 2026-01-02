'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, PieChart, DollarSign, Plus, Loader2, TrendingUp, Megaphone, Globe, Smartphone, Mail, Instagram, Target, Search, Activity } from 'lucide-react';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useToast } from '@/hooks/use-toast';

// Enhanced Components
import { GoogleAdsManager } from '@/components/ads/google-ads-manager';
import { MetaAdsManager } from '@/components/ads/meta-ads-manager';
import { SeoManager } from '@/components/seo/seo-manager';
import { MetricCard } from '@/components/dashboard/metric-card';
import { EmailCampaignDashboard } from '@/components/messaging/email-dashboard';
import { SmsCampaignDashboard } from '@/components/messaging/sms-dashboard';
import { DEFAULT_MARKETING_METRICS } from '@/data/marketing-metrics';
import type { MarketingMetricsSnapshot } from '@/data/marketing-metrics';
import { fetchMarketingMetrics } from '@/lib/marketing';
import { fetchCampaigns } from '@/lib/ads';
import { fetchMarketingPlans, StoredMarketingPlan } from '@/lib/marketing-plans';
import { useRouter } from 'next/navigation';

const GOOGLE_ADS_DRAFT_KEY = 'entrestate-google-ads-draft';

export default function MarketingDashboardPage() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const router = useRouter();

  const [metrics, setMetrics] = useState<MarketingMetricsSnapshot>(DEFAULT_MARKETING_METRICS);
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState(DEFAULT_MARKETING_METRICS.campaigns);
  const [campaignsLoading, setCampaignsLoading] = useState(false);
  const [plans, setPlans] = useState<StoredMarketingPlan[]>([]);
  const [plansLoading, setPlansLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      if (!user) return;
      setLoading(true);
      const snapshot = await fetchMarketingMetrics(user.uid);
      if (isMounted) {
        setMetrics(snapshot);
        setLoading(false);
      }
    };
    load().catch((error) => {
      console.error(error);
      if (isMounted) {
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [user]);

  useEffect(() => {
    let isMounted = true;
    const loadCampaigns = async () => {
      if (!user) return;
      setCampaignsLoading(true);
      const data = await fetchCampaigns();
      if (isMounted) {
        setCampaigns(data);
        setCampaignsLoading(false);
      }
    };
    loadCampaigns().catch((error) => {
      console.error(error);
      if (isMounted) {
        setCampaignsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [user]);

  useEffect(() => {
    let isMounted = true;
    const loadPlans = async () => {
      if (!user) return;
      setPlansLoading(true);
      const data = await fetchMarketingPlans();
      if (isMounted) {
        setPlans(data);
        setPlansLoading(false);
      }
    };
    loadPlans().catch((error) => {
      console.error(error);
      if (isMounted) {
        setPlansLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [user]);

  const summaryCards = useMemo(() => {
    const { totals, currencySymbol } = metrics;
    const formatCurrency = (value: number) =>
      `${currencySymbol}${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    const formatTrend = (value: number) =>
      `${value >= 0 ? '+' : ''}${(value * 100).toFixed(0)}%`;

    return [
      {
        title: 'Total Ad Spend',
        value: formatCurrency(totals.adSpend),
        trend: formatTrend(totals.adSpendChange),
        icon: DollarSign,
        positive: totals.adSpendChange >= 0,
      },
      {
        title: 'Cost Per Lead (CPL)',
        value: `${currencySymbol}${totals.cpl.toFixed(2)}`,
        trend: formatTrend(totals.cplChange),
        icon: BarChart,
        positive: totals.cplChange <= 0,
      },
      {
        title: 'Total Conversions',
        value: totals.conversions.toLocaleString(),
        trend: formatTrend(totals.conversionsChange),
        icon: PieChart,
        positive: totals.conversionsChange >= 0,
      },
      {
        title: 'Marketing ROAS',
        value: `${(totals.roas || 0).toFixed(2)}x`,
        trend: `${currencySymbol}${(totals.revenue || 0).toLocaleString()} revenue`,
        icon: TrendingUp,
        positive: (totals.roas || 0) >= 1,
      },
    ];
  }, [metrics]);

  const campaignList = campaigns ?? [];

  return (
      <div className="space-y-8 animate-in fade-in duration-700 pb-24">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
            <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-blue-600/10 text-blue-500 border-blue-500/20 px-2 py-0 h-5 text-[9px] font-bold uppercase tracking-widest">Active Hub</Badge>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white">Marketing Hub</h1>
                <p className="text-zinc-500 font-medium">Coordinate global project launches and lead generation channels.</p>
            </div>
            <div className="flex gap-3">
                <Button variant="outline" className="rounded-xl border-white/10 bg-white/5 font-bold h-12 px-6">Export Report</Button>
                <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 font-bold h-12 px-6"><Plus className="h-4 w-4 mr-2" />Create Launch</Button>
            </div>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            Synchronizing live marketing performance...
          </div>
        )}

        {/* High Level Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryCards.map((card) => (
              <MetricCard
                key={card.title}
                title={card.title}
                value={card.value}
                trend={card.trend}
                icon={card.icon}
                positive={card.positive}
              />
            ))}
        </div>

        <Tabs defaultValue="google" className="w-full">
           <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-8 bg-zinc-950 p-1.5 rounded-[1.5rem] border border-white/10">
               <TabsTrigger value="google" className="rounded-xl h-10 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">Google Ads</TabsTrigger>
               <TabsTrigger value="meta" className="rounded-xl h-10 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">Meta Ads</TabsTrigger>
               <TabsTrigger value="seo" className="rounded-xl h-10 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">SEO Engine</TabsTrigger>
               <TabsTrigger value="email" className="rounded-xl h-10 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">Email</TabsTrigger>
               <TabsTrigger value="sms" className="rounded-xl h-10 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">SMS</TabsTrigger>
               <TabsTrigger value="plans" className="rounded-xl h-10 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">AI Plans</TabsTrigger>
           </TabsList>
            
            <TabsContent value="google" className="mt-0 space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                     <Card className="lg:col-span-2 bg-zinc-900/30 border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm">
                        <CardContent className="p-8">
                            <GoogleAdsManager pageTitle="New Campaign" pageDescription="Describe your offer to generate ads..." />
                        </CardContent>
                    </Card>
                    
                    <div className="space-y-6">
                         <Card className="bg-zinc-900/30 border-white/5 rounded-[2.5rem] shadow-sm">
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-xl font-bold">Active Campaigns</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 pt-0">
                                <div className="space-y-5">
                                    {campaignList.map((c: any, i: number) => (
                                        <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                            <div className="space-y-1">
                                                <p className="font-bold text-white uppercase tracking-tight">{c.name}</p>
                                                <p className="text-xs text-zinc-500 font-medium">
                                                  {metrics.currencySymbol}{c.dailyBudget}/day
                                                </p>
                                            </div>
                                            <Badge variant={c.status === 'Active' ? 'default' : 'secondary'} className="rounded-lg h-6 px-3 text-[9px] font-bold uppercase tracking-widest">{c.status}</Badge>
                                        </div>
                                    ))}
                                    {campaignList.length === 0 && (
                                      <div className="py-8 text-center space-y-3">
                                          <Activity className="h-8 w-8 text-zinc-800 mx-auto" />
                                          <p className="text-xs text-zinc-600 font-medium uppercase tracking-widest">No Active Campaigns</p>
                                      </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="meta" className="mt-0">
                 <Card className="bg-zinc-900/30 border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm">
                    <CardContent className="p-8">
                        <MetaAdsManager pageTitle="Meta Launch" pageDescription="Instagram and Facebook social leads." />
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="seo" className="mt-0">
                 <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card className="bg-zinc-900/30 border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm">
                            <CardContent className="p-8">
                                <SeoManager />
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                         <Card className="bg-zinc-900/30 border-white/5 rounded-[2.5rem] shadow-sm h-full">
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-xl font-bold">Opportunities</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 pt-0">
                                 <div className="space-y-4">
                                     {[
                                         { kw: "waterfront villas dubai", vol: "High", comp: "Med" },
                                         { kw: "palm jebel ali prices", vol: "Extreme", comp: "Low" },
                                         { kw: "luxury off-plan 2025", vol: "High", comp: "High" },
                                     ].map((k, i) => (
                                         <div key={i} className="flex justify-between items-center p-5 border border-white/5 rounded-2xl bg-black/20 hover:bg-black/40 transition-colors">
                                             <div className="space-y-1">
                                                 <p className="font-bold text-sm text-white uppercase tracking-tight">{k.kw}</p>
                                                 <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{k.vol} Vol • {k.comp} Comp</p>
                                             </div>
                                             <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-600 hover:text-blue-500 hover:bg-blue-500/10"><Plus className="h-4 w-4" /></Button>
                                         </div>
                                     ))}
                                 </div>
                            </CardContent>
                        </Card>
                    </div>
                 </div>
            </TabsContent>

            <TabsContent value="email" className="mt-0">
                <Card className="bg-zinc-900/30 border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm">
                    <CardContent className="p-8">
                        <EmailCampaignDashboard />
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="sms" className="mt-0">
                <Card className="bg-zinc-900/30 border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm">
                    <CardContent className="p-8">
                        <SmsCampaignDashboard />
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="plans" className="mt-0">
                <Card className="bg-zinc-900/30 border-white/5 rounded-[2.5rem] shadow-sm">
                    <CardHeader className="p-8 pb-4">
                        <CardTitle className="text-2xl font-bold">AI Marketing Briefs</CardTitle>
                        <CardDescription className="text-zinc-500 font-medium">Recent autonomous strategies generated by the system.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-0 space-y-6">
                        {plans.length === 0 && (
                            <div className="py-20 text-center space-y-4 border-2 border-dashed border-white/5 rounded-3xl">
                                <Activity className="h-12 w-12 text-zinc-800 mx-auto" />
                                <p className="text-zinc-500 font-medium">No plans generated yet.</p>
                            </div>
                        )}
                        {plans.map((plan) => (
                            <div key={plan.id} className="border border-white/5 rounded-[2rem] p-8 space-y-5 bg-black/20 hover:border-blue-500/20 transition-all group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">
                                            <Zap className="h-4 w-4" />
                                        </div>
                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{plan.audience || 'Custom Segment'}</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-600">{new Date(plan.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-lg font-bold text-white tracking-tight leading-relaxed">{plan.response?.text || 'Strategic Campaign Overview'}</p>
                                <div className="flex flex-col gap-3 sm:flex-row pt-2">
                                    <Button
                                        variant="outline"
                                        className="h-11 rounded-xl border-white/10 bg-white/5 font-bold text-xs uppercase tracking-widest px-6"
                                        onClick={() => {
                                            navigator.clipboard.writeText(plan.prompt || '');
                                            toast({ title: 'Brief Copied' });
                                        }}
                                    >
                                        Copy Specs
                                    </Button>
                                    <Button
                                        className="h-11 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-xs uppercase tracking-widest px-6"
                                        onClick={() => router.push('/dashboard/google-ads?source=plan')}
                                    >
                                        Execute Flow
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>

      </div>
  );
}
