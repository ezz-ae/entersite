'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, TrendingUp, MousePointerClick, Eye, Globe } from "lucide-react";
import { generateAdsFromPageContent } from "@/ai/flows/generate-ads-from-page-content";

interface GoogleAdsManagerProps {
  pageTitle: string;
  pageDescription: string;
}

export function GoogleAdsManager({ pageTitle, pageDescription }: GoogleAdsManagerProps) {
  const [activeTab, setActiveTab] = useState("preview");
  const [budget, setBudget] = useState([50]); // Daily budget in USD
  const [duration, setDuration] = useState([7]); // Duration in days
  const [isGenerating, setIsGenerating] = useState(false);
  const [adContent, setAdContent] = useState({
      headlines: [
          "Luxury Living in Dubai",
          "Invest in High ROI Properties",
          "Waterfront Apartments for Sale"
      ],
      descriptions: [
          "Exclusive pre-launch offers available now. Secure your unit with just 5% down payment.",
          "Experience world-class amenities and breathtaking views. Book your private viewing today."
      ],
      keywords: ["dubai real estate", "luxury apartments", "property investment", "buy villa dubai"]
  });

  const handleGenerateAds = async () => {
      setIsGenerating(true);
      // Simulate AI generation
      setTimeout(() => {
          setAdContent({
              headlines: [
                  `New Launch: ${pageTitle}`,
                  "Own a Piece of Paradise",
                  "10% Guaranteed ROI"
              ],
              descriptions: [
                  `Discover ${pageTitle}. ${pageDescription.slice(0, 50)}...`,
                  "Tax-free investment with high rental yields. Golden Visa eligibility included."
              ],
              keywords: ["off plan dubai", "emaar new launch", "investment property"]
          });
          setIsGenerating(false);
      }, 1500);
  };

  const estimatedReach = Math.floor(budget[0] * 800 * (duration[0] / 7));
  const estimatedClicks = Math.floor(estimatedReach * 0.04);

  return (
    <Card className="w-full h-full border-0 shadow-none">
        <CardHeader className="px-0 pt-0">
            <div className="flex justify-between items-center mb-2">
                <CardTitle className="text-xl">Google Ads Campaign</CardTitle>
                <Badge variant={isGenerating ? "outline" : "secondary"}>
                    {isGenerating ? "AI Generating..." : "Draft"}
                </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
                Launch a high-performance ad campaign directly from your dashboard.
            </p>
        </CardHeader>
        
        <CardContent className="px-0 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="preview">Ad Preview</TabsTrigger>
                    <TabsTrigger value="budget">Budget & Duration</TabsTrigger>
                    <TabsTrigger value="keywords">Keywords</TabsTrigger>
                </TabsList>

                {/* AD PREVIEW TAB */}
                <TabsContent value="preview" className="space-y-4 pt-4">
                    <div className="border rounded-xl p-4 bg-card shadow-sm space-y-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-sm">Search Ad Preview</h4>
                            <Button variant="ghost" size="sm" onClick={handleGenerateAds} disabled={isGenerating}>
                                {isGenerating ? "Generating..." : "Regenerate with AI"}
                            </Button>
                        </div>
                        
                        {/* Google Search Result Mock */}
                        <div className="font-sans max-w-[600px]">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-black font-bold text-xs">Ad</span>
                                <span className="text-xs text-muted-foreground">entresite.ai/projects/{pageTitle.toLowerCase().replace(/ /g, '-')}</span>
                            </div>
                            <div className="text-xl text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug">
                                {adContent.headlines[0]} | {adContent.headlines[1]}
                            </div>
                            <div className="text-sm text-[#4d5156] mt-1">
                                {adContent.descriptions[0]} {adContent.descriptions[1]}
                            </div>
                            <div className="flex gap-2 mt-2">
                                <span className="text-xs text-[#1a0dab] hover:underline cursor-pointer">View Floor Plans</span>
                                <span className="text-xs text-[#1a0dab] hover:underline cursor-pointer">Download Brochure</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Edit Headlines</Label>
                        {adContent.headlines.map((h, i) => (
                            <Input 
                                key={i} 
                                value={h} 
                                onChange={(e) => {
                                    const newHeadlines = [...adContent.headlines];
                                    newHeadlines[i] = e.target.value;
                                    setAdContent({...adContent, headlines: newHeadlines});
                                }}
                            />
                        ))}
                    </div>
                </TabsContent>

                {/* BUDGET TAB */}
                <TabsContent value="budget" className="space-y-6 pt-4">
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <Label>Daily Budget</Label>
                            <span className="font-bold text-primary">${budget[0]}</span>
                        </div>
                        <Slider value={budget} min={10} max={500} step={10} onValueChange={setBudget} />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>$10</span>
                            <span>$500</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <Label>Campaign Duration</Label>
                            <span className="font-bold text-primary">{duration[0]} Days</span>
                        </div>
                        <Slider value={duration} min={3} max={30} step={1} onValueChange={setDuration} />
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg border grid grid-cols-3 gap-4 text-center">
                        <div>
                            <Globe className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                            <div className="text-lg font-bold">{estimatedReach.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Est. Reach</div>
                        </div>
                        <div>
                            <MousePointerClick className="h-5 w-5 mx-auto mb-1 text-green-500" />
                            <div className="text-lg font-bold">{estimatedClicks.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Est. Clicks</div>
                        </div>
                        <div>
                            <TrendingUp className="h-5 w-5 mx-auto mb-1 text-purple-500" />
                            <div className="text-lg font-bold">${(budget[0] * duration[0]).toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Total Cost</div>
                        </div>
                    </div>
                </TabsContent>

                {/* KEYWORDS TAB */}
                <TabsContent value="keywords" className="space-y-4 pt-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {adContent.keywords.map((k, i) => (
                            <Badge key={i} variant="secondary" className="pl-2 pr-1 py-1">
                                {k}
                                <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 hover:bg-transparent" onClick={() => {
                                    const newK = adContent.keywords.filter((_, index) => index !== i);
                                    setAdContent({...adContent, keywords: newK});
                                }}>
                                    <span className="sr-only">Remove</span>
                                    <span aria-hidden>×</span>
                                </Button>
                            </Badge>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <Input placeholder="Add new keyword..." />
                        <Button size="sm">Add</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        AI has optimized these keywords for high-intent real estate investors in your target region.
                    </p>
                </TabsContent>
            </Tabs>

            <Button size="lg" className="w-full h-12 text-lg shadow-lg bg-green-600 hover:bg-green-700">
                Launch Campaign (${(budget[0] * duration[0]).toLocaleString()})
            </Button>
            <p className="text-xs text-center text-muted-foreground">
                Payment processed securely via EntreSite. No Google Ads account required.
            </p>
        </CardContent>
    </Card>
  );
}
