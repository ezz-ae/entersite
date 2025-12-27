'use client';

import React, { useState, useEffect } from 'react';
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
  Copy,
  Loader2
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
import { getUserSites } from '@/lib/firestore-service';
import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import type { SitePage } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function SitesDashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sites, setSites] = useState<SitePage[]>([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [newSitePrompt, setNewSitePrompt] = useState('');

  useEffect(() => {
    async function loadSites() {
      if (user) {
        setLoading(true);
        try {
          const userSites = await getUserSites(user.uid);
          setSites(userSites as SitePage[]);
        } catch (error) {
          console.error("Failed to load sites:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    loadSites();
  }, [user]);

  const handleCreateSite = () => {
    if (newSitePrompt) {
        router.push(`/builder?prompt=\${encodeURIComponent(newSitePrompt)}`);
    } else {
        router.push('/builder');
    }
  };

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
                        <Label htmlFor="site-description" className="text-zinc-500 uppercase text-[10px] font-bold tracking-[0.2em]">Architect's Brief</Label>
                        <Textarea 
                            id="site-description" 
                            placeholder="Describe the project... (e.g., A luxury villa launch in Dubai South.)" 
                            className="bg-zinc-900 border-white/5 min-h-[120px] text-base rounded-xl resize-none text-white"
                            value={newSitePrompt}
                            onChange={(e) => setNewSitePrompt(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter className="p-4 pt-0">
                    <Button type="submit" className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 rounded-2xl" onClick={handleCreateSite}>
                        Generate Blueprint
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

      {/* Sites List */}
      {loading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
              <p className="text-zinc-500">Loading your projects...</p>
          </div>
      ) : sites.length === 0 ? (
          <div className="h-64 border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center gap-6 p-10 text-center">
              <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-zinc-700" />
              </div>
              <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">No Projects Found</h3>
                  <p className="text-zinc-500 max-w-sm">You haven't built any sites yet. Use the AI Architect to create your first high-converting landing page.</p>
              </div>
              <Button variant="outline" className="rounded-full border-white/10" onClick={() => setIsModalOpen(true)}>
                  Launch AI Architect
              </Button>
          </div>
      ) : (
          <div className="grid grid-cols-1 gap-6">
            {sites.map((site) => (
              <Card key={site.id} className="overflow-hidden border-white/5 bg-zinc-900/50 backdrop-blur-3xl hover:border-blue-500/30 transition-all duration-500 rounded-[2.5rem]">
                <div className="flex flex-col lg:flex-row">
                    <div className={`w-full lg:w-80 h-48 lg:h-auto bg-gradient-to-br from-blue-900 to-indigo-900 relative flex-shrink-0 group overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <Link href={`/p/\${site.id}`} target="_blank">
                                <Button variant="secondary" className="rounded-full font-bold shadow-lg h-12 px-8">
                                    View Site
                                </Button>
                            </Link>
                        </div>
                        <div className="absolute top-4 left-4">
                            <Badge className={cn(
                                "border-0 shadow-lg text-white font-bold px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest bg-green-600"
                            )}>
                                Live
                            </Badge>
                        </div>
                    </div>

                    <CardContent className="p-10 flex-grow flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-3xl font-bold mb-2 text-white">{site.title}</h3>
                                <div className="flex items-center gap-4 text-sm font-medium text-zinc-500">
                                    <Link href={`/p/\${site.id}`} target="_blank" className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition-colors">
                                        <Globe className="h-4 w-4" /> entrestate.com/p/{site.id}
                                    </Link>
                                    <span className="opacity-20">|</span>
                                    <span>Updated recently</span>
                                </div>
                            </div>

                            <div className="flex gap-12">
                                 <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Views</p>
                                    <p className="text-2xl font-black text-white">0</p>
                                </div>
                                 <div className="space-y-1 border-l border-white/5 pl-12">
                                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Leads</p>
                                    <p className="text-2xl font-black text-blue-500">0</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <Link href={`/builder?siteId=\${site.id}`}>
                                <Button variant="outline" className="h-11 rounded-full gap-2 border-white/10 bg-white/5 text-zinc-400 hover:text-white transition-all px-6 font-bold text-xs uppercase tracking-widest">
                                    <Edit className="h-4 w-4" /> Edit
                                </Button>
                            </Link>
                            
                            <Link href="/dashboard/google-ads">
                                <Button variant="outline" className={cn(
                                    "h-11 rounded-full gap-2 border-white/10 transition-all px-6 font-bold text-xs uppercase tracking-widest bg-white/5 text-zinc-400 hover:text-white"
                                )}>
                                    <Target className="h-4 w-4" /> 
                                    Launch Ads
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
      )}

      <div className="p-10 rounded-[3rem] bg-blue-600/5 border border-dashed border-blue-500/20 text-center flex items-center justify-center gap-4">
          <Sparkles className="h-6 w-6 text-blue-500" />
          <p className="text-zinc-300 font-medium text-lg">
            Active Meta Lead Gen campaigns capture <span className="text-white font-bold">3.5x more</span> qualified investor data.
          </p>
      </div>
    </div>
  );
}
