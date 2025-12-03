'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, LineChart, PieChart } from 'lucide-react';

// Placeholder for the complex Ads Manager component we built earlier, 
// but adapted for a dashboard view rather than a modal.
import { GoogleAdsManager } from '@/components/ads/google-ads-manager';

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
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Ad Spend</CardTitle>
                    <DollarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$12,450</div>
                    <p className="text-xs text-muted-foreground mt-1">+15% from last month</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Cost Per Lead (CPL)</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$24.50</div>
                    <p className="text-xs text-green-600 mt-1">-5% (Improving)</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Conversions</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">482</div>
                    <p className="text-xs text-muted-foreground mt-1">Leads generated</p>
                </CardContent>
            </Card>
        </div>

        <Tabs defaultValue="campaigns" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="seo">SEO & Keywords</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>
            
            <TabsContent value="campaigns" className="mt-6 space-y-6">
                {/* Active Campaigns Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Active Google Ads Campaigns</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: "Dubai Luxury Launch - Search", status: "Active", budget: "$50/day", clicks: 120, cost: "$145" },
                                { name: "Emaar Beachfront - Display", status: "Paused", budget: "$30/day", clicks: 45, cost: "$310" },
                                { name: "General Branding - Retargeting", status: "Active", budget: "$20/day", clicks: 85, cost: "$98" },
                            ].map((campaign, i) => (
                                <div key={i} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                                    <div>
                                        <p className="font-medium">{campaign.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'} className="text-[10px]">
                                                {campaign.status}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">{campaign.budget}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">{campaign.clicks} Clicks</p>
                                        <p className="text-xs text-muted-foreground">Cost: {campaign.cost}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Launch Wizard (Reusing the component) */}
                <div className="grid lg:grid-cols-2 gap-6">
                     <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Quick Launch New Ad</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* We pass dummy data since this is a dashboard view, not linked to a specific page yet */}
                            <GoogleAdsManager pageTitle="New Campaign" pageDescription="Describe your offer to generate ads..." />
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Trends</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px] flex items-center justify-center bg-muted/10">
                            <p className="text-muted-foreground text-sm">Chart Placeholder (Impressions vs Clicks)</p>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

            <TabsContent value="seo">
                <Card>
                    <CardHeader>
                        <CardTitle>Keyword Intelligence</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">SEO Dashboard coming soon...</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>

      </div>
    </DashboardLayout>
  );
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
