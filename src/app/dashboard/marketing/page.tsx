'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, LineChart, PieChart, TrendingUp } from 'lucide-react';

// Enhanced Components
import { GoogleAdsManager } from '@/components/ads/google-ads-manager';
import { SeoManager } from '@/components/seo/seo-manager';

export default function MarketingDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Marketing Center</h1>
                <p className="text-muted-foreground">Manage your paid campaigns, SEO, and lead generation channels.</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline">Export Report</Button>
                <Button>New Campaign</Button>
            </div>
        </div>

        {/* High Level Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard title="Total Ad Spend" value="$12,450" trend="+15%" icon={DollarIcon} />
            <MetricCard title="Cost Per Lead (CPL)" value="$24.50" trend="-5%" positive icon={BarChart} />
            <MetricCard title="Total Conversions" value="482" trend="+8%" icon={PieChart} />
        </div>

        <Tabs defaultValue="campaigns" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                <TabsTrigger value="campaigns">Google Ads</TabsTrigger>
                <TabsTrigger value="seo">SEO & Keywords</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
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
                                             <Button size="icon" variant="ghost" className="h-8 w-8"><PlusIcon className="h-4 w-4" /></Button>
                                         </div>
                                     ))}
                                 </div>
                            </CardContent>
                        </Card>
                    </div>
                 </div>
            </TabsContent>
            
            <TabsContent value="social">
                <Card>
                    <CardContent className="py-20 text-center">
                        <p className="text-muted-foreground">Social Media Manager Coming Soon...</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>

      </div>
    </DashboardLayout>
  );
}

function MetricCard({ title, value, trend, icon: Icon, positive }: any) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className={`text-xs mt-1 flex items-center ${positive === false ? 'text-red-600' : 'text-green-600'}`}>
                    {trend} <TrendingUp className="h-3 w-3 ml-1" /> 
                    <span className="text-muted-foreground ml-1 font-normal">from last month</span>
                </p>
            </CardContent>
        </Card>
    )
}

function DollarIcon(props: any) {
    return (
        <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
    )
}

function PlusIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
}
