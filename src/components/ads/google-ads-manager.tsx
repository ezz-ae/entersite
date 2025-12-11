
'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
    CheckCircle2, AlertCircle, TrendingUp, MousePointerClick, Eye, Globe, 
    Target, Loader2, Plus, Trash2, BarChart3, Calendar, MapPin, Zap, ExternalLink,
    Sparkles
} from "lucide-react";
import { generateAdsFromPageContent, GenerateAdsOutput } from "@/ai/flows/generate-ads-from-page-content";
import { createJob } from "@/lib/jobs";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface GoogleAdsManagerProps {
  pageTitle: string;
  pageDescription: string;
  userEmail?: string; 
}

type CampaignStatus = 'draft' | 'generating' | 'active' | 'completed';

export function GoogleAdsManager({ pageTitle, pageDescription, userEmail }: GoogleAdsManagerProps) {
  const { toast } = useToast();
  const [status, setStatus] = useState<CampaignStatus>('draft');
  const [activeTab, setActiveTab] = useState("setup");
  
  // Campaign Settings
  const [budget, setBudget] = useState([50]); // Daily
  const [duration, setDuration] = useState([30]); // Days
  const [location, setLocation] = useState("Dubai, UAE");
  
  // AI Generated Content
  const [adData, setAdData] = useState<GenerateAdsOutput | null>(null);
  const [selectedVariation, setSelectedVariation] = useState(0);

  // Live Performance Mock Data
  const [performance, setPerformance] = useState({
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
          const result = await generateAdsFromPageContent({
              pageTitle,
              pageDescription,
              location
          });
          setAdData(result);
          setStatus('draft');
      } catch (error) {
          console.error("Ad gen error", error);
          setStatus('draft');
      }
  };

  const handleLaunch = async () => {
      setStatus('active');
      toast({
          title: "Campaign Launched!",
          description: "Your ads are now being reviewed by Google. Dashboard will update shortly.",
      });
      // Trigger backend job
      await createJob('user-123', 'ad_campaign', { 
          budget: budget[0],
          duration: duration[0],
          location,
          adCopy: adData?.variations[selectedVariation]
      });
  };

  const estimatedReach = Math.floor(budget[0] * 1200); 
  const estimatedClicks = Math.floor(estimatedReach * 0.035);

  if (status === 'active') {
      return (
          <div className="space-y-6">
              {/* Active Campaign Header */}
              <div className="flex justify-between items-center bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" />
                      </div>
                      <div>
                          <h3 className="font-bold text-green-900 dark:text-green-100">Campaign Active: {pageTitle} Launch</h3>
                          <div className="flex gap-2 text-xs text-green-700 dark:text-green-300 mt-0.5">
                              <span>Optimization Score: 92%</span>
                              <span>•</span>
                              <span>Learning Phase: Active</span>
                          </div>
                      </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-white dark:bg-black h-8 text-xs">Edit</Button>
                    <Button variant="outline" size="sm" className="bg-white dark:bg-black h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => setStatus('draft')}>Pause</Button>
                  </div>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <MetricCard label="Impressions" value={performance.impressions.toLocaleString()} icon={Eye} trend="+12%" />
                   <MetricCard label="Clicks" value={performance.clicks} icon={MousePointerClick} trend="+5%" />
                   <MetricCard label="CTR" value={`${performance.ctr}%`} icon={TrendingUp} trend="+0.2%" />
                   <MetricCard label="Total Spend" value={`$${performance.spend}`} icon={Target} />
                   <MetricCard label="Leads Generated" value={performance.leads} icon={CheckCircle2} highlight trend="+3" />
                   <MetricCard label="Cost Per Lead" value={`$${performance.cpl}`} icon={BarChart3} trend="-10%" positive />
                   <MetricCard label="ROAS" value={`${performance.roas}x`} icon={Zap} trend="+0.5" />
                   <MetricCard label="Quality Score" value={`${performance.qualityScore}/10`} icon={Target} />
              </div>

              {/* Performance Chart Placeholder */}
              <Card>
                  <CardHeader>
                      <CardTitle className="text-sm font-medium">Performance Over Time</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[200px] flex items-end gap-1 pb-2 px-6">
                      {/* CSS Bar Chart */}
                      {[30, 45, 60, 50, 70, 85, 90, 80, 95, 100, 90, 85, 95, 110, 120, 115, 130, 125, 140, 135].map((h, i) => (
                          <div key={i} className="flex-1 bg-blue-500/20 hover:bg-blue-500/40 transition-colors rounded-t-sm relative group" style={{ height: `${h}%` }}>
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-[10px] px-1 py-0.5 rounded whitespace-nowrap z-10">
                                  {Math.floor(h * 3.5)} Clicks
                              </div>
                          </div>
                      ))}
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <CardTitle className="text-sm font-medium">Top Performing Keywords</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                      <div className="divide-y">
                          {adData?.keywordGroups[0].keywords.slice(0, 5).map((k, i) => (
                              <div key={i} className="flex justify-between items-center p-4 hover:bg-muted/30 transition-colors">
                                  <div className="flex items-center gap-3">
                                      <span className="font-medium text-sm">{k}</span>
                                      <Badge variant="secondary" className="text-[10px] h-5">High Intent</Badge>
                                  </div>
                                  <div className="flex gap-6 text-sm">
                                      <div className="text-right">
                                          <p className="font-bold">{Math.floor(Math.random() * 200)}</p>
                                          <p className="text-xs text-muted-foreground">Clicks</p>
                                      </div>
                                      <div className="text-right w-20">
                                          <p className="font-bold">${(Math.random() * 2 + 0.5).toFixed(2)}</p>
                                          <p className="text-xs text-muted-foreground">CPC</p>
                                      </div>
                                      <div className="text-right w-16">
                                          <p className="font-bold text-green-600">{(Math.random() * 5).toFixed(1)}%</p>
                                          <p className="text-xs text-muted-foreground">CTR</p>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </CardContent>
              </Card>
          </div>
      )
  }

  return (
    <Card className="w-full h-full border-0 shadow-none bg-background">
        <CardHeader className="px-0 pt-0">
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-2xl">Google Ads Manager</CardTitle>
                    <CardDescription>Target high-intent buyers with AI-optimized search campaigns.</CardDescription>
                </div>
                {adData && <Badge variant="secondary" className="bg-blue-100 text-blue-700">AI Generated</Badge>}
            </div>
        </CardHeader>
        
        <CardContent className="px-0">
            {status === 'generating' ? (
                <div className="h-64 flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">Analyzing market trends & generating keywords...</p>
                </div>
            ) : !adData ? (
                 <div className="space-y-6">
                     <div className="grid gap-4 p-8 bg-muted/30 rounded-xl border border-dashed text-center">
                         <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                             <Zap className="h-6 w-6 text-blue-600" />
                         </div>
                         <div className="space-y-2 mb-4">
                             <h3 className="font-bold text-lg">Start Automated Campaign</h3>
                             <p className="text-sm text-muted-foreground max-w-md mx-auto">
                                 Our AI will scan your landing page content, identify the best keywords, and write high-converting ad copy in seconds.
                             </p>
                         </div>
                         
                         <div className="max-w-xs mx-auto space-y-4 text-left">
                             <div className="space-y-2">
                                 <Label>Target Location</Label>
                                 <div className="flex gap-2 relative">
                                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input 
                                        value={location} 
                                        onChange={(e) => setLocation(e.target.value)} 
                                        className="pl-10"
                                    />
                                 </div>
                             </div>
                             <Button onClick={handleGenerate} className="w-full h-10 gap-2">
                                 <Sparkles className="h-4 w-4" /> Generate Strategy
                             </Button>
                         </div>
                     </div>
                 </div>
            ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50 p-1">
                        <TabsTrigger value="setup">1. Budget & Target</TabsTrigger>
                        <TabsTrigger value="creative">2. Ad Creative</TabsTrigger>
                        <TabsTrigger value="keywords">3. Keywords</TabsTrigger>
                    </TabsList>

                    <TabsContent value="setup" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="p-6 bg-card border rounded-xl space-y-8">
                             <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label className="text-base font-semibold">Daily Budget</Label>
                                    <span className="font-bold text-xl text-primary">${budget[0]}</span>
                                </div>
                                <Slider value={budget} min={10} max={1000} step={10} onValueChange={setBudget} />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>$10/day</span>
                                    <span>Estimated Monthly: ${(budget[0] * 30).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg text-center border border-blue-100 dark:border-blue-900/50">
                                    <Globe className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{estimatedReach.toLocaleString()}</div>
                                    <p className="text-xs text-blue-600 dark:text-blue-300 font-medium">Daily Impressions</p>
                                </div>
                                <div className="p-4 bg-green-50/50 dark:bg-green-900/10 rounded-lg text-center border border-green-100 dark:border-green-900/50">
                                    <MousePointerClick className="h-6 w-6 mx-auto mb-2 text-green-500" />
                                    <div className="text-2xl font-bold text-green-900 dark:text-green-100">{estimatedClicks}</div>
                                    <p className="text-xs text-green-600 dark:text-green-300 font-medium">Est. Daily Clicks</p>
                                </div>
                            </div>
                            
                            <Button className="w-full h-12" onClick={() => setActiveTab("creative")}>
                                Next: Review Creative <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="creative" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="space-y-6">
                             <div className="flex gap-2 overflow-x-auto pb-2">
                                 {adData.variations.map((v, i) => (
                                     <button
                                        key={v.id}
                                        onClick={() => setSelectedVariation(i)}
                                        className={cn(
                                            "px-4 py-2 rounded-full text-sm font-medium border transition-colors whitespace-nowrap",
                                            selectedVariation === i ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"
                                        )}
                                     >
                                         Variation {i + 1}
                                     </button>
                                 ))}
                             </div>

                             {/* Google Ad Preview - High Fidelity */}
                            <div className="p-6 bg-white border rounded-xl shadow-sm max-w-2xl mx-auto font-sans">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-black text-xs">Ad</span>
                                    <span className="text-xs text-gray-600">www.entresite.ai/projects/luxury-launch</span>
                                </div>
                                <div className="text-xl text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug mb-1">
                                    {adData.variations[selectedVariation].headlines[0]} | {adData.variations[selectedVariation].headlines[1]}
                                </div>
                                <div className="text-sm text-[#4d5156] leading-normal">
                                    {adData.variations[selectedVariation].descriptions[0]} {adData.variations[selectedVariation].descriptions[1]}
                                </div>
                                <div className="flex gap-3 mt-3">
                                    {["Floor Plans", "Payment Plan", "Location Map", "Register Now"].map((link, i) => (
                                        <span key={i} className="text-xs text-[#1a0dab] hover:underline cursor-pointer">{link}</span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="space-y-4 bg-card p-4 border rounded-xl">
                                <h4 className="font-semibold text-sm">Edit Content</h4>
                                <div className="space-y-3">
                                    {adData.variations[selectedVariation].headlines.map((h, i) => (
                                        <div key={i} className="space-y-1">
                                            <Label className="text-xs text-muted-foreground">Headline {i + 1}</Label>
                                            <Input defaultValue={h} className="h-9" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                             <Button className="w-full h-12" onClick={() => setActiveTab("keywords")}>
                                 Next: Keywords <ArrowRight className="ml-2 h-4 w-4" />
                             </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="keywords" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="space-y-6">
                            {adData.keywordGroups.map((group, i) => (
                                <div key={i} className="bg-card border rounded-xl p-4">
                                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                        <Target className="h-4 w-4 text-primary" />
                                        {group.category} Keywords
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {group.keywords.map((k, j) => (
                                            <Badge key={j} variant="secondary" className="pl-3 pr-1 py-1.5 text-sm font-normal bg-muted/50 hover:bg-muted border border-transparent hover:border-border transition-all">
                                                {k}
                                                <button className="ml-2 hover:bg-destructive/10 hover:text-destructive rounded-full p-0.5 transition-colors"><X className="h-3 w-3" /></button>
                                            </Badge>
                                        ))}
                                        <Button variant="outline" size="sm" className="h-8 rounded-full border-dashed text-xs">
                                            <Plus className="h-3 w-3 mr-1" /> Add
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            
                             <div className="pt-6 border-t bg-gradient-to-b from-background to-muted/20 p-6 -mx-6 -mb-6 rounded-b-xl">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-sm font-medium">Estimated Monthly Cost</p>
                                        <p className="text-2xl font-bold">${(budget[0] * 30).toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">Estimated Monthly Leads</p>
                                        <p className="text-2xl font-bold text-green-600">~{(estimatedClicks * 0.05 * 30).toFixed(0)}</p>
                                    </div>
                                </div>
                                <Button size="lg" className="w-full h-14 text-lg font-bold shadow-xl bg-green-600 hover:bg-green-700 text-white" onClick={handleLaunch}>
                                    Launch Campaign Now
                                </Button>
                                <p className="text-[10px] text-center text-muted-foreground mt-3">
                                    By launching, you agree to the ad spend terms. Billing is processed securely via Stripe.
                                </p>
                             </div>
                        </div>
                    </TabsContent>
                </Tabs>
            )}
        </CardContent>
    </Card>
  );
}

function MetricCard({ label, value, icon: Icon, highlight, trend, positive = true }: any) {
    return (
        <div className={cn("p-4 rounded-xl border flex flex-col justify-between transition-all hover:shadow-md", highlight ? "bg-primary/5 border-primary/20" : "bg-card")}>
            <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
                <Icon className={cn("h-4 w-4", highlight ? "text-primary" : "text-muted-foreground")} />
            </div>
            <div>
                <p className="text-2xl font-bold">{value}</p>
                {trend && (
                    <p className={cn("text-xs font-medium mt-1", positive ? "text-green-600" : "text-red-600")}>
                        {trend} vs last 30 days
                    </p>
                )}
            </div>
        </div>
    )
}
// Helper icons
function ArrowRight(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg> }
function X(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> }

    