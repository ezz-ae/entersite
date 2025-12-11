'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GoogleAdsManager } from '@/components/ads/google-ads-manager';

export default function MarketingDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Google Ads Campaign Manager</CardTitle>
                <CardDescription>
                    Our AI will generate high-performance ad copy, keywords, and settings based on your page content.
                </CardDescription>
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
