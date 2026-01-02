'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
    CheckCircle2, TrendingUp, MousePointerClick, Eye, Globe, 
    Target, Loader2, Plus, BarChart3, MapPin, Zap, Sparkles, X, 
    ArrowRight, Info, Search
} from "lucide-react";
import { generateGoogleAdsAction } from "@/app/actions/ai";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { authorizedFetch } from "@/lib/auth-fetch";
import { motion, AnimatePresence } from "framer-motion";
import type { GenerateAdsOutput } from "@/types/ads";

interface PrefillPlan {
  id?: string;
  summary?: string;
  prompt?: string;
  locationCity?: string;
  projectName?: string;
  audience?: string | null;
  createdAt?: string;
  adCampaignConfig?: {
    budget?: number;
    keywords?: string[];
  };
}

type AdsTab = 'setup' | 'creative' | 'keywords' | 'extensions';

interface GoogleAdsManagerProps {
  pageTitle: string;
  pageDescription: string;
  userEmail?: string; 
  prefillPlan?: PrefillPlan;
  prefillResetKey?: number;
  onPrefillReset?: () => void;
  initialTab?: AdsTab;
}

type CampaignStatus = 'draft' | 'generating' | 'active' | 'completed';

export function GoogleAdsManager({
  pageTitle,
  pageDescription,
  userEmail,
  prefillPlan,
  prefillResetKey = 0,
  onPrefillReset,
  initialTab = 'setup',
}: GoogleAdsManagerProps) {
  const { toast } = useToast();
  const [status, setStatus] = useState<CampaignStatus>('draft');
  const [activeTab, setActiveTab] = useState<AdsTab>(initialTab);
  const [isLaunching, setIsLaunching] = useState(false);
  
  const [budget, setBudget] = useState([150]);
  const [duration, setDuration] = useState([30]);
  const [location, setLocation] = useState("Dubai, UAE");
  
  const [adData, setAdData] = useState<GenerateAdsOutput | null>(null);
  const [selectedVariation, setSelectedVariation] = useState(0);

  const [performance] = useState({
      impressions: 12500,
      clicks: 480,
      ctr: 3.8,
      spend: 145.50,
      leads: 18,
      cpl: 8.08,
      roas: 4.5,
      qualityScore: 9
  });

  const handleGenerate = async () => {
      setStatus('generating');
      try {
          const result = await generateGoogleAdsAction({
              pageTitle,
              pageDescription,
              location,
              targetAudience: prefillPlan?.audience || undefined
          });
          setAdData(result);
          setSelectedVariation(0);
          setStatus('draft');
          toast({ title: "Ad Strategy Ready", description: "Created 4 search ad variations for your project." });
      } catch (error) {
          setStatus('draft');
          toast({ title: "Failed to create", description: "The ad engine is temporarily busy.", variant: "destructive" });
      }
  };

  const handleLaunch = async () => {
      if (!adData) return;
      try {
          setIsLaunching(true);
          const payload = {
              name: `${pageTitle} Search Campaign`,
              budget: budget[0],
              duration: duration[0],
              location,
              variation: adData.variations[selectedVariation],
              keywords: adData.keywordGroups.flatMap(g => g.keywords),
              negativeKeywords: adData.negativeKeywords,
              sitelinks: adData.sitelinks,
              strategy: adData.variations[selectedVariation].strategy
          };
          const response = await authorizedFetch('/api/ads/google/sync', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
          });
          if (!response.ok) throw new Error('Sync failed');
          setStatus('active');
          toast({ title: "Campaign Live", description: "Your ads have been pushed to Google." });
      } catch (error: any) {
          toast({ title: 'Launch Failed', description: error?.message, variant: 'destructive' });
      } finally {
          setIsLaunching(false);
      }
  };

  const estimatedReach = Math.floor(budget[0] * (1 / (adData?.estimatedCpc || 2.5)) * 10); 

  if (status === 'active') {
      return (
          <div className="space-y-6">
              <div className="flex justify-between items-center bg-blue-600/10 p-8 rounded-[2.5rem] border border-blue-500/20 shadow-sm">
                  <div className="flex items-center gap-5">
                      <div className="relative">
                        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
                        <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-75" />
                      </div>
                      <div>
                          <h3 className="font-bold text-2xl tracking-tight text-white uppercase">Campaign Active: {pageTitle}</h3>
                          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Delivering • Daily budget: AED {budget[0]}</p>
                      </div>
                  </div>
                  <Button variant="outline" className="rounded-xl h-12 px-8 border-white/10 bg-white/5 hover:bg-white hover:text-black font-bold">Open Google Ads</Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   <MetricCard label="Impressions" value={performance.impressions.toLocaleString()} icon={Eye} trend="+12%" highlight />
                   <MetricCard label="Clicks" value={performance.clicks} icon={MousePointerClick} trend="+5%" />
                   <MetricCard label="CTR" value={`${performance.ctr}%`} icon={TrendingUp} trend="+0.2%" />
                   <MetricCard label="Spend" value={`$${performance.spend}`} icon={Target} />
              </div>
          </div>
      )
  }

  return (
    <Card className="w-full h-full border-0 shadow-none bg-transparent">
        <CardHeader className="px-0 pt-0 pb-10">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <CardTitle className="text-4xl font-bold tracking-tight text-white uppercase">Google Search Ads</CardTitle>
                    <CardDescription className="text-zinc-500 font-medium text-lg">Target high-intent buyers searching for your project.</CardDescription>
                </div>
                {adData && <Badge className="bg-blue-600/10 text-blue-500 border-blue-500/20 py-1.5 px-4 rounded-full uppercase text-[10px] font-bold tracking-widest">Strategy Ready</Badge>}
            </div>
        </CardHeader>
        
        <CardContent className="px-0 space-y-8">
            {status === 'generating' ? (
                <div className="h-96 flex flex-col items-center justify-center space-y-6 bg-zinc-900/30 rounded-[3rem] border border-white/5 border-dashed">
                    <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
                    <p className="text-xl font-bold tracking-tight text-white uppercase">Designing Ad Strategy...</p>
                </div>
            ) : !adData ? (
                 <div className="p-10 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 flex flex-col items-center text-center space-y-8 shadow-sm">
                     <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-2 border border-blue-500/20">
                         <Search className="h-8 w-8" />
                     </div>
                     <div className="space-y-2 max-w-md">
                         <h3 className="text-2xl font-bold text-white">Start New Campaign</h3>
                         <p className="text-zinc-500 text-sm font-medium">Create a search campaign for <span className="text-white">{pageTitle}</span>.</p>
                     </div>
                     
                     <div className="w-full max-w-sm space-y-4">
                        <div className="space-y-2 text-left">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Target Location</Label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <Input 
                                    value={location} 
                                    onChange={(e) => setLocation(e.target.value)} 
                                    className="pl-10 h-12 bg-black/40 border-white/10 rounded-xl font-medium text-white focus:border-blue-500/50" 
                                />
                            </div>
                        </div>
                        <Button 
                            onClick={handleGenerate} 
                            className="w-full h-14 bg-white text-black hover:bg-zinc-200 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg"
                        >
                            Generate Strategy
                        </Button>
                     </div>
                 </div>
            ) : (
                <Tabs value={activeTab} onValueChange={(tab) => setActiveTab(tab as AdsTab)} className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-10 bg-zinc-950 p-1.5 rounded-[1.5rem] border border-white/10">
                        <TabsTrigger value="setup" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black uppercase text-[10px] font-bold tracking-widest h-12">1. Budget</TabsTrigger>
                        <TabsTrigger value="creative" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black uppercase text-[10px] font-bold tracking-widest h-12">2. Creative</TabsTrigger>
                        <TabsTrigger value="keywords" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black uppercase text-[10px] font-bold tracking-widest h-12">3. Keywords</TabsTrigger>
                        <TabsTrigger value="extensions" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black uppercase text-[10px] font-bold tracking-widest h-12">4. Extensions</TabsTrigger>
                    </TabsList>

                    <TabsContent value="setup" className="space-y-8 mt-0">
                        <div className="p-12 bg-zinc-900/30 border border-white/5 rounded-[3rem] space-y-10 shadow-sm">
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Daily Investment</label>
                                    <p className="text-6xl font-bold tracking-tight text-white uppercase leading-none">AED {budget[0]}</p>
                                </div>
                                <Badge className="bg-green-500/10 text-green-500 border-green-500/20 uppercase font-bold text-[9px] px-3 py-1 rounded-full">Optimal Range</Badge>
                            </div>
                            <Slider value={budget} min={50} max={5000} step={50} onValueChange={setBudget} className="py-6" />
                        </div>
                        <Button className="w-full h-16 rounded-2xl bg-white text-black font-bold text-xl uppercase tracking-tight shadow-xl" onClick={() => setActiveTab("creative")}>Next step <ArrowRight className="ml-3 h-6 w-6" /></Button>
                    </TabsContent>

                    <TabsContent value="creative" className="space-y-10 mt-0">
                        <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar">
                            {adData.variations.map((v, i) => (
                                <button key={v.id} onClick={() => setSelectedVariation(i)} className={cn("px-10 py-5 rounded-2xl text-xs font-bold uppercase tracking-widest border transition-all whitespace-nowrap flex items-center gap-3", selectedVariation === i ? "bg-white text-black border-white shadow-xl" : "bg-zinc-900 text-zinc-500 border-white/5 hover:border-white/10")}>
                                    Variation {i + 1}
                                </button>
                            ))}
                        </div>
                        <div className="grid lg:grid-cols-2 gap-16">
                            <div className="p-10 bg-white border border-zinc-200 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] font-sans space-y-6 text-black overflow-hidden relative">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center text-[11px] font-bold border border-zinc-200">G</div>
                                    <div className="flex flex-col"><span className="text-[11px] font-bold leading-none uppercase tracking-tighter">Sponsored</span><span className="text-[11px] text-zinc-500">https://your-project-site.com</span></div>
                                </div>
                                <div className="space-y-3"><h3 className="text-2xl text-[#1a0dab] font-medium leading-tight hover:underline cursor-pointer">{adData.variations[selectedVariation].headlines.join(' | ')}</h3><p className="text-sm text-zinc-600 leading-relaxed font-medium">{adData.variations[selectedVariation].descriptions.join(' ')}</p></div>
                            </div>
                            <div className="space-y-6">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-2">Edit Headlines</Label>
                                {adData.variations[selectedVariation].headlines.map((h, i) => (
                                    <Input key={i} defaultValue={h} className="h-14 bg-black/40 border-white/5 rounded-xl font-bold text-white uppercase tracking-tight focus:border-blue-500/50" maxLength={30} />
                                ))}
                            </div>
                        </div>
                        <Button className="w-full h-16 rounded-2xl bg-white text-black font-bold text-xl uppercase tracking-tight shadow-xl" onClick={() => setActiveTab("keywords")}>Continue to Keywords</Button>
                    </TabsContent>

                    <TabsContent value="keywords" className="space-y-8 mt-0">
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="bg-zinc-900/30 border border-white/5 rounded-[3rem] p-10 space-y-8 shadow-sm">
                                <h4 className="font-bold text-xs uppercase tracking-widest flex items-center gap-3 text-white"><Target className="h-5 w-5 text-blue-500" /> High Intent Keywords</h4>
                                <div className="flex flex-wrap gap-3">{adData.keywordGroups[0].keywords.map((k, j) => (<Badge key={j} className="bg-white/5 text-zinc-300 border-white/5 py-2.5 px-5 rounded-2xl text-xs font-bold shadow-sm">{k}</Badge>))}</div>
                            </div>
                            <div className="bg-red-600/5 border border-red-500/20 rounded-[3rem] p-10 space-y-8 shadow-sm">
                                <h4 className="font-bold text-xs uppercase tracking-widest text-red-500">Negative Filter (Cost Saving)</h4>
                                <div className="flex flex-wrap gap-3">{adData.negativeKeywords.map((k, i) => (<Badge key={i} className="bg-red-500/10 text-red-500 border-red-500/10 py-2.5 px-5 rounded-2xl text-xs font-bold">- {k}</Badge>))}</div>
                            </div>
                        </div>
                        <Button className="w-full h-16 rounded-2xl bg-white text-black font-bold text-xl uppercase tracking-tight shadow-xl" onClick={() => setActiveTab("extensions")}>Continue to Extensions</Button>
                    </TabsContent>

                    <TabsContent value="extensions" className="mt-0">
                        <div className="max-w-3xl mx-auto p-12 md:p-20 bg-zinc-900/60 rounded-[4rem] border border-white/10 text-center space-y-12 shadow-2xl">
                            <div className="space-y-3"><p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.5em]">Campaign Readiness Score: 100%</p><h3 className="text-5xl font-bold tracking-tight text-white uppercase">Push to Google</h3></div>
                            <Button size="lg" className="w-full h-24 rounded-[2.5rem] text-3xl font-bold shadow-[0_20px_60px_rgba(37,99,235,0.4)] bg-blue-600 hover:bg-blue-700 text-white uppercase tracking-tight" onClick={handleLaunch} disabled={isLaunching}>{isLaunching ? "Syncing Search Cloud..." : "Launch Search Campaign"}</Button>
                            <div className="flex items-center justify-center gap-10 text-[10px] font-bold text-zinc-600 uppercase tracking-widest"><span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Google Verified</span><span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Conversion Tracking Active</span></div>
                        </div>
                    </TabsContent>
                </Tabs>
            )}
        </CardContent>
    </Card>
  );
}

function MetricCard({ label, value, icon: Icon, trend, highlight, positive = true }: any) {
    return (
        <div className={cn("p-10 rounded-[2.5rem] border flex flex-col justify-between transition-all hover:border-blue-500/30 shadow-sm", highlight ? "bg-blue-600/5 border-blue-600/20" : "bg-zinc-900/30 border-white/5")}>
            <div className="flex justify-between items-start mb-8">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</p>
                <div className={cn("p-2.5 rounded-xl", highlight ? "bg-blue-600/10 text-blue-500" : "bg-white/5 text-zinc-600")}><Icon className="h-5 w-5" /></div>
            </div>
            <div>
                <p className="text-4xl font-bold text-white tracking-tight uppercase">{value}</p>
                {trend && (<div className="flex items-center gap-2 mt-2"><TrendingUp className={cn("h-3.5 w-3.5", positive ? "text-green-500" : "text-red-500")} /><span className={cn("text-[10px] font-bold uppercase tracking-tight", positive ? "text-green-500" : "text-red-500")}>{trend}</span></div>)}
            </div>
        </div>
    )
}
