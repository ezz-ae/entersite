'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
    CheckCircle2, 
    TrendingUp, 
    MousePointerClick, 
    Eye, 
    Globe, 
    Target, 
    Loader2, 
    Plus, 
    MapPin, 
    Zap, 
    Sparkles, 
    X, 
    ArrowRight, 
    Info,
    Instagram,
    Facebook,
    Users,
    Heart,
    MessageCircle,
    Share2,
    MoreHorizontal,
    ShieldCheck
} from "lucide-react";
import { generateMetaAdsAction } from "@/app/actions/ai";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { authorizedFetch } from "@/lib/auth-fetch";
import { motion, AnimatePresence } from "framer-motion";
import type { GenerateMetaAdsOutput } from "@/ai/flows/generate-meta-ads";

interface MetaAdsManagerProps {
  pageTitle: string;
  pageDescription: string;
  userEmail?: string; 
  initialLocation?: string;
}

type CampaignStatus = 'draft' | 'generating' | 'active' | 'completed';

export function MetaAdsManager({
  pageTitle,
  pageDescription,
  userEmail,
  initialLocation = "Dubai, UAE",
}: MetaAdsManagerProps) {
  const { toast } = useToast();
  const [status, setStatus] = useState<CampaignStatus>('draft');
  const [activeTab, setActiveTab] = useState('setup');
  const [isLaunching, setIsLaunching] = useState(false);
  
  const [budget, setBudget] = useState([200]);
  const [duration, setDuration] = useState([14]);
  const [location, setLocation] = useState(initialLocation);
  const [objective, setObjective] = useState<'OUTCOME_TRAFFIC' | 'OUTCOME_LEADS' | 'OUTCOME_AWARENESS'>('OUTCOME_TRAFFIC');
  
  const [adData, setAdData] = useState<GenerateMetaAdsOutput | null>(null);
  const [selectedVariation, setSelectedVariation] = useState(0);

  const handleGenerate = async () => {
      setStatus('generating');
      try {
          const result = await generateMetaAdsAction({
              pageTitle,
              pageDescription,
              location
          });
          setAdData(result);
          setSelectedVariation(0);
          setStatus('draft');
          toast({ title: "Social Strategy Ready", description: "Engine has generated visual-first campaign variations." });
      } catch (error) {
          setStatus('draft');
          toast({ title: "Generation Failed", description: "Engine unavailable.", variant: "destructive" });
      }
  };

  const handleLaunch = async () => {
      if (!adData) return;
      try {
          setIsLaunching(true);
          const payload = {
              name: `${pageTitle} Meta Launch`,
              budget: budget[0],
              duration: duration[0],
              location,
              objective,
              variation: adData.variations[selectedVariation],
              interests: adData.targetInterests
          };
          const response = await authorizedFetch('/api/ads/meta/sync', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
          });
          if (!response.ok) throw new Error('Sync failed');
          setStatus('active');
          toast({ title: "Meta Campaign Live", description: "Pushed to Facebook Business Manager." });
      } catch (error: any) {
          toast({ title: 'Launch Failed', description: error?.message, variant: 'destructive' });
      } finally {
          setIsLaunching(false);
      }
  };

  const estimatedReach = Math.floor(budget[0] * (1000 / (adData?.estimatedCpm || 15))); 

  if (status === 'active') {
      return (
          <div className="space-y-6">
              <div className="flex justify-between items-center bg-blue-600/10 p-8 rounded-[2.5rem] border border-blue-500/20 shadow-sm">
                  <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center shadow-lg border border-white/10">
                        <Instagram className="h-7 w-7 text-white" />
                      </div>
                      <div>
                          <h3 className="font-bold text-2xl tracking-tight text-white uppercase">Campaign Active: {pageTitle}</h3>
                          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Delivering • {objective.replace('OUTCOME_', '')}</p>
                      </div>
                  </div>
                  <Button variant="outline" className="rounded-xl h-12 px-8 border-white/10 bg-white/5 hover:bg-white hover:text-black font-bold">Open Console</Button>
              </div>
          </div>
      )
  }

  return (
    <Card className="w-full h-full border-0 shadow-none bg-transparent">
        <CardHeader className="px-0 pt-0 pb-10">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <CardTitle className="text-4xl font-bold tracking-tight text-white uppercase">Meta Manager</CardTitle>
                    <CardDescription className="text-zinc-500 font-medium text-lg">Social lead generation across Instagram & Facebook.</CardDescription>
                </div>
                <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 text-blue-500"><Facebook className="h-5 w-5" /></div>
                    <div className="w-10 h-10 rounded-xl bg-pink-600/10 flex items-center justify-center border border-pink-500/20 text-pink-500"><Instagram className="h-5 w-5" /></div>
                </div>
            </div>
        </CardHeader>
        
        <CardContent className="px-0 space-y-8">
            {status === 'generating' ? (
                <div className="h-[400px] flex flex-col items-center justify-center space-y-6 bg-zinc-900/30 rounded-[3rem] border border-white/5 border-dashed">
                    <Loader2 className="h-12 w-12 animate-spin text-pink-500" />
                    <p className="text-xl font-bold tracking-tight text-white uppercase">Creating Visual Hooks...</p>
                </div>
            ) : !adData ? (
                 <div className="p-12 md:p-20 bg-zinc-900/40 rounded-[3.5rem] border border-white/5 text-center space-y-12 relative overflow-hidden shadow-sm">
                     <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-pink-600 to-blue-600 rounded-[2rem] flex items-center justify-center shadow-2xl border border-white/10">
                         <Sparkles className="h-10 w-10 text-white" />
                     </div>
                     <div className="space-y-4">
                         <h3 className="text-4xl font-bold tracking-tight text-white uppercase">Social Launch Engine</h3>
                         <p className="text-zinc-500 max-w-xl mx-auto leading-relaxed text-lg font-medium">Create Instagram and Facebook ads instantly. We target high-intent UAE investor clusters for you.</p>
                     </div>
                     <div className="max-w-md mx-auto space-y-8 text-left relative z-10">
                         <div className="space-y-3">
                             <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 ml-2">Target Market</label>
                             <div className="relative">
                                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                                <Input value={location} onChange={(e) => setLocation(e.target.value)} className="pl-14 h-16 bg-black border-white/5 rounded-2xl text-xl font-bold text-white shadow-inner" />
                             </div>
                         </div>
                         <Button onClick={handleGenerate} className="w-full h-20 bg-white text-black hover:bg-zinc-100 rounded-[2rem] text-2xl font-bold gap-4 shadow-2xl transition-all group uppercase tracking-tight">
                             <Zap className="h-8 w-8 text-blue-600 group-hover:scale-110" /> Create Ad Strategy
                         </Button>
                     </div>
                 </div>
            ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-10 bg-zinc-950 p-1.5 rounded-[1.5rem] border border-white/10">
                        <TabsTrigger value="setup" className="rounded-xl h-12 font-bold uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">1. Budget</TabsTrigger>
                        <TabsTrigger value="creative" className="rounded-xl h-12 font-bold uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">2. Visuals</TabsTrigger>
                        <TabsTrigger value="audience" className="rounded-xl h-12 font-bold uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">3. Targeting</TabsTrigger>
                        <TabsTrigger value="launch" className="rounded-xl h-12 font-bold uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">4. Launch</TabsTrigger>
                    </TabsList>

                    <TabsContent value="setup" className="space-y-8 mt-0">
                        <div className="p-12 bg-zinc-900/30 border border-white/5 rounded-[3rem] space-y-10 shadow-sm">
                            <div className="flex justify-between items-end">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Daily Investment</label>
                                    <p className="text-6xl font-bold tracking-tight text-white uppercase">AED {budget[0]}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase">Estimated Reach</p>
                                    <p className="text-2xl font-bold text-blue-500">~{estimatedReach.toLocaleString()}/day</p>
                                </div>
                            </div>
                            <Slider value={budget} min={100} max={10000} step={100} onValueChange={setBudget} className="py-6" />
                        </div>
                        <Button className="w-full h-16 rounded-2xl bg-white text-black font-bold text-xl uppercase tracking-tight shadow-xl" onClick={() => setActiveTab("creative")}>Next step <ArrowRight className="ml-3 h-6 w-6" /></Button>
                    </TabsContent>

                    <TabsContent value="creative" className="space-y-10 mt-0">
                        <div className="grid lg:grid-cols-2 gap-16">
                            <div className="bg-zinc-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] max-w-md mx-auto">
                                <div className="p-6 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-600 border border-white/10" />
                                    <div className="flex-1"><p className="text-sm font-bold uppercase tracking-tight text-white">EntreSite Premium</p><p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Sponsored</p></div>
                                </div>
                                <div className="px-6 pb-4"><p className="text-sm leading-relaxed text-zinc-300 font-medium">{adData.variations[selectedVariation].primaryText}</p></div>
                                <div className="aspect-square bg-zinc-800 flex items-center justify-center border-y border-white/5"><Sparkles className="h-10 w-10 text-white/10" /></div>
                                <div className="p-6 bg-black/40 border-t border-white/5 flex justify-between items-center"><div className="space-y-1"><p className="text-lg font-bold tracking-tight text-white uppercase">{adData.variations[selectedVariation].headline}</p></div><Button className="bg-white text-black font-bold text-[10px] uppercase h-10 px-6 rounded-xl shadow-lg">{adData.variations[selectedVariation].cta}</Button></div>
                            </div>
                            <div className="space-y-8">
                                <div className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-6 shadow-sm">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Edit Primary Hook</Label>
                                    <textarea defaultValue={adData.variations[selectedVariation].primaryText} className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 font-medium text-white min-h-[140px] resize-none focus:border-blue-500/50" />
                                </div>
                                <Button className="w-full h-16 rounded-2xl bg-zinc-900 border border-white/10 font-bold uppercase text-zinc-400 hover:text-white transition-colors" onClick={() => setActiveTab("audience")}>Continue to Targeting</Button>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="audience" className="space-y-8 mt-0">
                         <div className="p-12 bg-zinc-900/30 border border-white/5 rounded-[3rem] space-y-10 shadow-sm">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-2"><Users className="h-4 w-4 text-blue-500" /> Target Interest Clusters</h4>
                            <div className="flex flex-wrap gap-4">
                                {adData.targetInterests.map((interest, i) => (<Badge key={i} className="bg-blue-600/10 text-blue-400 border-blue-500/20 py-3 px-6 rounded-2xl text-xs font-bold uppercase shadow-sm">{interest}</Badge>))}
                            </div>
                         </div>
                         <Button className="w-full h-20 rounded-[2rem] bg-white text-black font-bold text-2xl uppercase tracking-tight shadow-2xl" onClick={() => setActiveTab("launch")}>Final Review <ArrowRight className="ml-3 h-8 w-8" /></Button>
                    </TabsContent>

                    <TabsContent value="launch" className="mt-0">
                         <div className="max-w-3xl mx-auto p-12 md:p-16 bg-zinc-900/60 rounded-[3.5rem] border border-white/10 text-center space-y-12 shadow-2xl">
                            <div className="space-y-2"><p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.5em]">Campaign Readiness Score: 100%</p><h3 className="text-5xl font-bold tracking-tight text-white uppercase">Push to Social</h3></div>
                            <Button size="lg" className="w-full h-24 rounded-[2.5rem] text-3xl font-bold shadow-[0_20px_50px_rgba(37,99,235,0.4)] bg-blue-600 hover:bg-blue-700 text-white uppercase tracking-tight" onClick={handleLaunch} disabled={isLaunching}>{isLaunching ? "Syncing Meta Cloud..." : "Launch Campaign Now"}</Button>
                            <div className="flex items-center justify-center gap-8 text-[10px] font-bold text-zinc-600 uppercase tracking-widest"><span className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Meta Verified</span><span className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Lead Sync Active</span></div>
                         </div>
                    </TabsContent>
                </Tabs>
            )}
        </CardContent>
    </Card>
  );
}
