'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MoreHorizontal, 
  Edit, 
  ExternalLink, 
  Target, 
  Users, 
  BarChart3, 
  Plus, 
  Sparkles,
  Settings,
  Trash2,
  Copy
} from 'lucide-react';
import Link from 'next/link';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SitesDashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sites = [
    { 
        id: '1', 
        name: "Dubai Luxury Launch", 
        url: "entresite.ai/p/dubai-lux", 
        status: "Live", 
        views: 1240, 
        leads: 45, 
        thumb: "bg-gradient-to-br from-purple-900 to-indigo-900",
        lastEdited: "2 hours ago",
        adsActive: false
    },
    { 
        id: '2', 
        name: "Agent Portfolio - Sarah", 
        url: "entresite.ai/p/sarah-agent", 
        status: "Live", 
        views: 450, 
        leads: 12, 
        thumb: "bg-gradient-to-br from-emerald-900 to-teal-900",
        lastEdited: "Yesterday",
        adsActive: true
    },
    { 
        id: '3', 
        name: "Emaar Beachfront - Phase 2", 
        url: "-", 
        status: "Draft", 
        views: 0, 
        leads: 0, 
        thumb: "bg-zinc-800",
        lastEdited: "3 days ago",
        adsActive: false
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Portfolio</h1>
          <p className="text-muted-foreground text-lg">Manage your digital assets and their performance.</p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 gap-2 px-8">
                    <Plus className="h-5 w-5" /> Start New Project
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] bg-zinc-950 border-zinc-800 text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-blue-400" />
                        AI Site Architect
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400 text-base">
                        Give our AI a project brief. We'll handle the sitemap, content, and data integration.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-6 text-left">
                    <div className="grid gap-2">
                        <Label htmlFor="site-name" className="text-zinc-400 uppercase text-[10px] font-bold tracking-widest">Project Internal Name</Label>
                        <Input id="site-name" placeholder="e.g., 'Palm Jebel Ali Launch'" className="bg-zinc-900 border-zinc-800 h-12" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="site-description" className="text-zinc-400 uppercase text-[10px] font-bold tracking-widest">Architect's Brief</Label>
                        <Textarea 
                            id="site-description" 
                            placeholder="Describe the project... (e.g., A luxury villa launch in Dubai South. Target: European investors. Focus on 8% ROI and immediate handover.)" 
                            className="bg-zinc-900 border-zinc-800 min-h-[120px] text-base"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                             <Label className="text-zinc-400 uppercase text-[10px] font-bold tracking-widest">Language</Label>
                             <select className="bg-zinc-900 border-zinc-800 h-10 rounded-md px-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none">
                                <option>English</option>
                                <option>Arabic</option>
                                <option>Bilingual (EN/AR)</option>
                             </select>
                        </div>
                        <div className="grid gap-2">
                             <Label className="text-zinc-400 uppercase text-[10px] font-bold tracking-widest">Primary Goal</Label>
                             <select className="bg-zinc-900 border-zinc-800 h-10 rounded-md px-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none">
                                <option>Lead Generation</option>
                                <option>WhatsApp Direct</option>
                                <option>Brochure Downloads</option>
                             </select>
                        </div>
                    </div>
                </div>
                <DialogFooter className="border-t border-white/5 pt-6">
                    <Button type="submit" className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700" onClick={() => setIsModalOpen(false)}>
                        Generate Blueprint
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

      {/* Sites List */}
      <div className="grid grid-cols-1 gap-6">
        {sites.map((site) => (
          <Card key={site.id} className="overflow-hidden border-border/60 hover:border-primary/40 transition-all duration-300">
            <div className="flex flex-col lg:flex-row">
                {/* Visual Preview */}
                <div className={`w-full lg:w-72 h-48 lg:h-auto ${site.thumb} relative flex-shrink-0 group`}>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="secondary" className="rounded-full font-bold shadow-lg shadow-black/20">
                            View Site
                        </Button>
                    </div>
                    <div className="absolute top-3 left-3">
                        <Badge className={cn(
                            "border-0 shadow-lg text-white font-bold px-3 py-1",
                            site.status === 'Live' ? 'bg-green-600' : 'bg-zinc-600'
                        )}>
                            {site.status}
                        </Badge>
                    </div>
                </div>

                {/* Content Area */}
                <CardContent className="p-8 flex-grow flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-2xl font-bold mb-1">{site.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5 hover:text-foreground cursor-pointer transition-colors">
                                    <Globe className="h-3.5 w-3.5" /> {site.url}
                                </span>
                                <span>•</span>
                                <span>Updated {site.lastEdited}</span>
                            </div>
                        </div>

                        {/* Performance Quick Stats */}
                        <div className="flex gap-8">
                             <div className="space-y-1">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Views</p>
                                <p className="text-xl font-bold">{site.views.toLocaleString()}</p>
                            </div>
                             <div className="space-y-1 border-l pl-8">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Leads</p>
                                <p className="text-xl font-bold text-blue-600">{site.leads}</p>
                            </div>
                        </div>
                    </div>

                    {/* Integrated Service Actions */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Button variant="outline" className="rounded-full gap-2 border-border/60 hover:bg-muted/50">
                            <Edit className="h-4 w-4" /> Edit Content
                        </Button>
                        <Link href="/dashboard/marketing">
                            <Button variant="outline" className={cn(
                                "rounded-full gap-2 border-border/60",
                                site.adsActive ? "border-green-600/30 bg-green-500/5 text-green-600" : "hover:bg-muted/50"
                            )}>
                                <Target className="h-4 w-4" /> 
                                {site.adsActive ? "Ads Live" : "Launch Ads"}
                            </Button>
                        </Link>
                        <Link href="/dashboard/leads">
                            <Button variant="outline" className="rounded-full gap-2 border-border/60 hover:bg-muted/50">
                                <Users className="h-4 w-4" /> Leads
                            </Button>
                        </Link>
                        
                        <div className="w-px h-8 bg-border hidden lg:block mx-2" />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full border border-border/40">
                                    <MoreHorizontal className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-zinc-950 border-zinc-800 text-white">
                                <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-white/5" />
                                <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-white/5 focus:text-white">
                                    <Copy className="h-4 w-4" /> Duplicate Project
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-white/5 focus:text-white">
                                    <Settings className="h-4 w-4" /> Project Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/5" />
                                <DropdownMenuItem className="gap-2 text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer">
                                    <Trash2 className="h-4 w-4" /> Delete Permanently
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State / Pro-tip */}
      <div className="p-8 rounded-3xl bg-muted/20 border border-dashed border-border/60 text-center">
          <p className="text-muted-foreground font-medium italic">
            💡 Pro-tip: Sites with active Meta Lead Gen campaigns capture 3.5x more qualified investor data.
          </p>
      </div>
    </div>
  );
}
