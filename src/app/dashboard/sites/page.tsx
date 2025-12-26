'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MoreHorizontal, 
  Edit, 
  Globe, 
  Target, 
  Users, 
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
import { cn } from '@/lib/utils';
import { getRealisteProjects } from '@/lib/realiste-projects';

export default function SitesDashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sites = getRealisteProjects();

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white uppercase italic">Project Portfolio</h1>
          <p className="text-zinc-500 text-lg font-light">Manage your digital assets and their performance.</p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 gap-2 px-8 h-14 text-base font-bold">
                    <Plus className="h-5 w-5" /> Start New Project
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] bg-zinc-950 border-white/10 text-white rounded-[2.5rem]">
                <DialogHeader className="p-4">
                    <DialogTitle className="text-3xl font-bold flex items-center gap-3">
                        <Sparkles className="h-8 w-8 text-blue-500" />
                        AI Site Architect
                    </DialogTitle>
                    <DialogDescription className="text-zinc-500 text-lg font-light mt-2">
                        Give our AI a project brief. We'll handle the sitemap, content, and data integration.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-8 px-4 text-left">
                    <div className="grid gap-2">
                        <Label htmlFor="site-name" className="text-zinc-500 uppercase text-[10px] font-bold tracking-[0.2em]">Project Internal Name</Label>
                        <Input id="site-name" placeholder="e.g., 'Palm Jebel Ali Launch'" className="bg-zinc-900 border-white/5 h-12 rounded-xl" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="site-description" className="text-zinc-500 uppercase text-[10px] font-bold tracking-[0.2em]">Architect's Brief</Label>
                        <Textarea 
                            id="site-description" 
                            placeholder="Describe the project... (e.g., A luxury villa launch in Dubai South.)" 
                            className="bg-zinc-900 border-white/5 min-h-[120px] text-base rounded-xl resize-none"
                        />
                    </div>
                </div>
                <DialogFooter className="p-4 pt-0">
                    <Button type="submit" className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 rounded-2xl" onClick={() => setIsModalOpen(false)}>
                        Generate Blueprint
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

      {/* Sites List */}
      <div className="grid grid-cols-1 gap-6">
        {sites.map((site) => (
          <Card key={site.id} className="overflow-hidden border-white/5 bg-zinc-900/50 backdrop-blur-3xl hover:border-blue-500/30 transition-all duration-500 rounded-[2.5rem]">
            <div className="flex flex-col lg:flex-row">
                <div className={`w-full lg:w-80 h-48 lg:h-auto bg-gradient-to-br from-blue-900 to-indigo-900 relative flex-shrink-0 group overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <Button variant="secondary" className="rounded-full font-bold shadow-lg h-12 px-8">
                            View Site
                        </Button>
                    </div>
                    <div className="absolute top-4 left-4">
                        <Badge className={cn(
                            "border-0 shadow-lg text-white font-bold px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest",
                            site.status === 'Live' ? 'bg-green-600' : 'bg-zinc-700'
                        )}>
                            {site.status}
                        </Badge>
                    </div>
                </div>

                <CardContent className="p-10 flex-grow flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-3xl font-bold mb-2 text-white">{site.name}</h3>
                            <div className="flex items-center gap-4 text-sm font-medium text-zinc-500">
                                <span className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition-colors">
                                    <Globe className="h-4 w-4" /> entrestate.com/p/{site.id}
                                </span>
                                <span className="opacity-20">|</span>
                                <span>Updated 2 hours ago</span>
                            </div>
                        </div>

                        <div className="flex gap-12">
                             <div className="space-y-1">
                                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Views</p>
                                <p className="text-2xl font-black text-white">{Math.floor(Math.random() * 10000)}</p>
                            </div>
                             <div className="space-y-1 border-l border-white/5 pl-12">
                                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Leads</p>
                                <p className="text-2xl font-black text-blue-500">{Math.floor(Math.random() * 100)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <Button variant="outline" className="h-11 rounded-full gap-2 border-white/10 bg-white/5 text-zinc-400 hover:text-white transition-all px-6 font-bold text-xs uppercase tracking-widest">
                            <Edit className="h-4 w-4" /> Edit
                        </Button>
                        
                        <Link href="/dashboard/google-ads">
                            <Button variant="outline" className={cn(
                                "h-11 rounded-full gap-2 border-white/10 transition-all px-6 font-bold text-xs uppercase tracking-widest",
                                false ? "border-green-600/30 bg-green-500/10 text-green-500" : "bg-white/5 text-zinc-400 hover:text-white"
                            )}>
                                <Target className="h-4 w-4" /> 
                                {false ? "Ads Active" : "Launch Ads"}
                            </Button>
                        </Link>
                        
                        <div className="w-px h-10 bg-white/5 hidden lg:block mx-2" />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full border border-white/5 bg-white/5 text-zinc-500">
                                    <MoreHorizontal className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64 bg-zinc-950 border-white/10 text-white rounded-2xl p-2 shadow-2xl">
                                <DropdownMenuLabel className="px-4 py-3 text-xs font-bold text-zinc-500 uppercase tracking-widest">Management</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-white/5" />
                                <DropdownMenuItem className="gap-3 cursor-pointer py-3 rounded-xl hover:bg-white/5">
                                    <Copy className="h-4 w-4 text-zinc-500" /> Duplicate Build
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-3 cursor-pointer py-3 rounded-xl hover:bg-white/5">
                                    <Settings className="h-4 w-4 text-zinc-500" /> Domain & SEO
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/5" />
                                <DropdownMenuItem className="gap-3 text-red-500 hover:bg-red-500/10 cursor-pointer py-3 rounded-xl">
                                    <Trash2 className="h-4 w-4" /> Delete Site
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <div className="p-10 rounded-[3rem] bg-blue-600/5 border border-dashed border-blue-500/20 text-center flex items-center justify-center gap-4">
          <Sparkles className="h-6 w-6 text-blue-500" />
          <p className="text-zinc-300 font-medium text-lg">
            Active Meta Lead Gen campaigns capture <span className="text-white font-bold">3.5x more</span> qualified investor data.
          </p>
      </div>
    </div>
  );
}
