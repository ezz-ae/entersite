'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Label } from "@/components/ui/label";

export default function SitesDashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Sites</h1>
                <p className="text-muted-foreground">Manage your landing pages, portfolios, and domains.</p>
            </div>
             <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                    <Button>Create New Site</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create a New Site</DialogTitle>
                        <DialogDescription>
                            Describe your project, and our AI will generate a stunning first draft.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="site-name">Site Name</Label>
                            <Input id="site-name" placeholder="e.g., 'Luxury Real Estate Dubai'" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="site-description">Briefly describe your business or project</Label>
                             <Textarea id="site-description" placeholder="e.g., 'A high-end real estate agency specializing in luxury villas and penthouses in Dubai...'" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Your Email</Label>
                            <Input id="email" type="email" placeholder="you@example.com" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={() => setIsModalOpen(false)}>Create Site</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
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
                                <a href={`https://${site.url}`} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:underline flex items-center gap-1">
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
                            <Button variant="outline" className="w-full gap-2">
                                <Edit className="h-4 w-4" /> Edit
                            </Button>
                            <Button variant="secondary" className="flex-1 gap-2">
                                Analytics
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

      </div>
  );
}
