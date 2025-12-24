'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, LineChart, PieChart, DollarSign, Plus } from 'lucide-react';

// Enhanced Components
import { GoogleAdsManager } from '@/components/ads/google-ads-manager';
import { SeoManager } from '@/components/seo/seo-manager';
import { MetricCard } from '@/components/dashboard/metric-card';

export default function MarketingDashboardPage() {
  return (
      <div className="space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Marketing Center</h1>
                <p className="text-muted-foreground">Manage your paid campaigns, SEO, and lead generation channels.</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline">Export Report</Button>
                <Button><Plus className="h-4 w-4 mr-2" />Create Campaign</Button>
            </div>
        </div>

        {/* High Level Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard title="Total Ad Spend" value="$12,450" trend="+15%" icon={DollarSign} />
            <MetricCard title="Cost Per Lead (CPL)" value="$24.50" trend="-5%" positive icon={BarChart} />
            <MetricCard title="Total Conversions" value="482" trend="+8%" icon={PieChart} />
        </div>

        <Tabs defaultValue="campaigns" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
                <TabsTrigger value="campaigns">Google Ads</TabsTrigger>
                <TabsTrigger value="seo">SEO & Keywords</TabsTrigger>
                <TabsTrigger value="meta">Meta Ads</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="sms">SMS</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>
            
            <TabsContent value="campaigns" className="mt-6 space-y-6">
                <div className="grid lg:grid-cols-3 gap-6 h-[800px]">
                     <Card className="lg:col-span-2 h-full overflow-hidden">
                        <CardContent className="p-6 h-full">
                            {/* We pass dummy data since this is a dashboard view */}
                            <GoogleAdsManager pageTitle="New Campaign" pageDescription="Describe your offer to generate ads..." />
                        </CardContent>
                    </Card>
                    
                    <div className="space-y-6">
                         <Card className="h-1/2">
                            <CardHeader>
                                <CardTitle>Active Campaigns</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { name: "Dubai Luxury Launch", status: "Active", budget: "$50/day" },
                                        { name: "Emaar Beachfront", status: "Paused", budget: "$30/day" },
                                        { name: "General Branding", status: "Active", budget: "$20/day" },
                                    ].map((c, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm border-b last:border-0 pb-3 last:pb-0">
                                            <div>
                                                <p className="font-medium">{c.name}</p>
                                                <p className="text-xs text-muted-foreground">{c.budget}</p>
                                            </div>
                                            <Badge variant={c.status === 'Active' ? 'default' : 'secondary'} className="text-[10px]">{c.status}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                         <Card className="h-[calc(50%-1.5rem)]">
                            <CardHeader>
                                <CardTitle>Recommendations</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/50 rounded-lg text-sm">
                                    <p className="font-medium text-yellow-800 dark:text-yellow-200">Increase Budget</p>
                                    <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">Your "Luxury" campaign is limited by budget. Increase by $10/day to get ~50 more clicks.</p>
                                    <Button size="sm" variant="outline" className="mt-2 h-7 text-xs bg-white dark:bg-black">Apply</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="seo" className="mt-6">
                 <div className="grid lg:grid-cols-3 gap-6 h-[800px]">
                    <div className="lg:col-span-2 h-full">
                        <SeoManager />
                    </div>
                    <div>
                         <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Keyword Opportunities</CardTitle>
                            </CardHeader>
                            <CardContent>
                                 <div className="space-y-4">
                                     {[
                                         { kw: "waterfront apartments dubai", vol: "High", comp: "Med" },
                                         { kw: "buy villa with crypto", vol: "Med", comp: "Low" },
                                         { kw: "golden visa property", vol: "High", comp: "High" },
                                     ].map((k, i) => (
                                         <div key={i} className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                             <div>
                                                 <p className="font-medium text-sm">{k.kw}</p>
                                                 <p className="text-xs text-muted-foreground">{k.vol} Vol • {k.comp} Comp</p>
                                             </div>
                                             <Button size="icon" variant="ghost" className="h-8 w-8"><Plus className="h-4 w-4" /></Button>
                                         </div>
                                     ))}
                                 </div>
                            </CardContent>
                        </Card>
                    </div>
                 </div>
            </TabsContent>

            <TabsContent value="meta">
                <Card>
                    <CardContent className="py-20 text-center">
                        <p className="text-muted-foreground">Meta Ads Manager Coming Soon...</p>
                    </CardContent>
                </Card>
            </TabsContent>
            
            <TabsContent value="social">
                <Card>
                    <CardContent className="py-20 text-center">
                        <p className="text-muted-foreground">Social Media Manager Coming Soon...</p>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="email">
                <Card>
                    <CardContent className="py-20 text-center">
                        <p className="text-muted-foreground">Email Campaign Manager Coming Soon...</p>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="sms">
                <Card>
                    <CardContent className="py-20 text-center">
                        <p className="text-muted-foreground">SMS Campaign Manager Coming Soon...</p>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="chat">
                <Card>
                    <CardContent className="py-20 text-center">
                        <p className="text-muted-foreground">Chat Manager Coming Soon...</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>

      </div>
  );
}
