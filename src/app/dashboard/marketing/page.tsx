'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GoogleAdsManager } from '@/components/ads/google-ads-manager';

export default function MarketingDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Google Ads Manager</h1>
                <p className="text-muted-foreground">Launch and manage high-performance campaigns in seconds.</p>
            </div>
            <Button>View Active Campaigns</Button>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Create New Campaign</CardTitle>
                <CardDescription>Our AI will generate ad copy based on your page content.</CardDescription>
            </CardHeader>
            <CardContent>
                <GoogleAdsManager 
                    pageTitle="Emaar Beachfront Residences" 
                    pageDescription="Discover luxury waterfront apartments with stunning views of the Dubai skyline. Handover Q4 2026." 
                />
            </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}
