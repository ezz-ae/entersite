'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, MoreHorizontal, Edit, ExternalLink, Copy } from 'lucide-react';
import Link from 'next/link';

export default function SitesDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Sites</h1>
                <p className="text-muted-foreground">Manage your landing pages, portfolios, and domains.</p>
            </div>
            <Button>Create New Site</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
                { id: '1', name: "Dubai Luxury Launch", url: "entresite.ai/p/dubai-lux", status: "Live", views: 1240, leads: 45, thumb: "bg-gradient-to-br from-purple-900 to-indigo-900" },
                { id: '2', name: "Agent Portfolio", url: "entresite.ai/p/sarah-agent", status: "Live", views: 450, leads: 12, thumb: "bg-gradient-to-br from-emerald-900 to-teal-900" },
                { id: '3', name: "Emaar Beachfront", url: "-", status: "Draft", views: 0, leads: 0, thumb: "bg-zinc-800" },
            ].map((site) => (
                <Card key={site.id} className="overflow-hidden group">
                    <div className={`h-40 ${site.thumb} relative`}>
                        <div className="absolute top-3 right-3">
                            <Badge variant={site.status === 'Live' ? 'default' : 'secondary'} className="bg-black/50 backdrop-blur text-white border-0">
                                {site.status}
                            </Badge>
                        </div>
                    </div>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">{site.name}</h3>
                                <a href="#" className="text-sm text-muted-foreground hover:underline flex items-center gap-1">
                                    {site.url} <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 py-4 border-t border-b mb-4">
                            <div className="text-center">
                                <p className="text-xl font-bold">{site.views}</p>
                                <p className="text-xs text-muted-foreground">Views</p>
                            </div>
                            <div className="text-center border-l">
                                <p className="text-xl font-bold">{site.leads}</p>
                                <p className="text-xs text-muted-foreground">Leads</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Link href="/builder" className="flex-1">
                                <Button variant="outline" className="w-full gap-2">
                                    <Edit className="h-4 w-4" /> Edit
                                </Button>
                            </Link>
                            <Button variant="secondary" className="flex-1 gap-2">
                                Analytics
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

      </div>
    </DashboardLayout>
  );
}
