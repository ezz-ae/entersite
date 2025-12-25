'use client';

import React, { useState, useEffect } from 'react';
import { SiteFooter } from '@/components/site-footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Filter, LayoutGrid, List as ListIcon, TrendingUp, BarChart3, Building2, SlidersHorizontal, X, ArrowRight, Zap, Globe, Activity } from "lucide-react";
import { getRealisteProjects, searchRealisteProjects } from '@/lib/realiste-projects';
import type { ProjectData } from '@/lib/types';
import { ResponsiveImage } from '@/components/ui/responsive-image';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const PROJECTS_PER_PAGE = 12;

export default function DiscoverPage() {
  const [allProjects, setAllProjects] = useState<ProjectData[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // Filter State
  const [selectedCity, setSelectedCity] = useState("Dubai");
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  // Statistics
  const [stats, setStats] = useState({ total: 0, avgPrice: 0, avgRoi: 0 });

  useEffect(() => {
    loadData();
  }, [selectedCity, selectedStatus, searchQuery]);

  const loadData = async () => {
    setLoading(true);
    const data = getRealisteProjects();
    
    let filteredData = data;

    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filteredData = filteredData.filter(p => 
            p.name.toLowerCase().includes(q) || 
            p.developer.toLowerCase().includes(q) ||
            p.location.area.toLowerCase().includes(q)
        );
    }

    if (selectedCity && selectedCity !== 'all') {
        filteredData = filteredData.filter(p => p.location.city.toLowerCase() === selectedCity.toLowerCase());
    }

    if (selectedStatus && selectedStatus !== 'all') {
        filteredData = filteredData.filter(p => p.status === selectedStatus);
    }
    
    setAllProjects(filteredData);
    setDisplayedProjects(filteredData.slice(0, PROJECTS_PER_PAGE));
    setPage(1);

    const total = filteredData.length;
    const avgPrice = total > 0 ? filteredData.reduce((acc, curr) => acc + curr.price.from, 0) / total : 0;
    setStats({ total, avgPrice, avgRoi: 8.4 });
    setLoading(false);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    const newProjects = allProjects.slice(0, nextPage * PROJECTS_PER_PAGE);
    setDisplayedProjects(newProjects);
    setPage(nextPage);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col font-sans">
      
      {/* Hero Header */}
      <section className="bg-zinc-950 border-b border-white/5 pt-40 pb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="container mx-auto px-6 max-w-[1800px] relative z-10">
              <div className="flex flex-col items-center gap-12 mb-16 text-center">
                  <div className="max-w-4xl space-y-8">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] border border-blue-500/20 mx-auto">
                        <Activity className="h-3.5 w-3.5" />
                        Enterprise Data Cluster
                      </div>
                      <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">Market <br/><span className="text-zinc-600">Intelligence.</span></h1>
                      <p className="text-zinc-500 text-2xl max-w-2xl mx-auto font-light leading-relaxed">
                          Access verified data on <span className="text-white font-medium">3,750+ UAE projects</span>. Live inventory, real-time ROI, and developer analytics.
                      </p>
                  </div>
              </div>

              {/* Search Control */}
              <div className="max-w-5xl mx-auto">
                  <div className="bg-zinc-900 border border-white/10 rounded-[2.5rem] p-2 flex flex-col md:flex-row gap-2 shadow-2xl backdrop-blur-3xl">
                      <div className="flex-1 flex items-center px-6 gap-4 py-4 md:py-0 border-b md:border-b-0 md:border-r border-white/5">
                          <Search className="h-6 w-6 text-zinc-600" />
                          <input 
                            type="text" 
                            placeholder="Project, Area, or Developer..."
                            className="flex-1 bg-transparent border-none text-white placeholder:text-zinc-700 focus:outline-none h-12 text-xl"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                      </div>
                      <div className="p-2 flex gap-2">
                           <Select value={selectedCity} onValueChange={setSelectedCity}>
                                <SelectTrigger className="h-14 bg-white/5 border-white/5 rounded-2xl w-40 font-bold uppercase tracking-widest text-[10px] text-zinc-400">
                                    <SelectValue placeholder="City" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                    <SelectItem value="Dubai">Dubai</SelectItem>
                                    <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                                    <SelectItem value="Sharjah">Sharjah</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button className="h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-900/40">
                                Query Nodes
                            </Button>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <div className="flex-1 container mx-auto px-6 max-w-[1800px] py-20">
            {/* Grid Header */}
            <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-8">
                <div className="flex items-center gap-4">
                    <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Cluster Activity</p>
                    <Badge variant="outline" className="bg-green-500/5 text-green-500 border-green-500/20 font-mono">
                        {allProjects.length} Ready
                    </Badge>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
                    <button className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-white/10 text-white" : "text-zinc-600")} onClick={() => setViewMode('grid')}><LayoutGrid className="h-5 w-5" /></button>
                    <button className={cn("p-2 rounded-lg transition-all", viewMode === 'table' ? "bg-white/10 text-white" : "text-zinc-600")} onClick={() => setViewMode('table')}><ListIcon className="h-5 w-5" /></button>
                </div>
            </div>

            {loading ? (
                <div className="h-96 flex flex-col items-center justify-center gap-6">
                    <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Synchronizing Cluster...</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {displayedProjects.map((project) => (
                        <div key={project.id} className="group bg-zinc-900/50 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-blue-500/30 transition-all duration-500">
                             <div className="relative aspect-[16/10] overflow-hidden">
                                <ResponsiveImage src={project.images[0]} alt={project.name} fill className="group-hover:scale-105 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <Badge className="bg-white/10 backdrop-blur-xl border-white/10 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{project.status}</Badge>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-2xl font-bold text-white tracking-tighter">{project.name}</h3>
                                    <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest flex items-center gap-1.5 mt-1"><MapPin className="h-3 w-3" /> {project.location.area}</p>
                                </div>
                             </div>
                             <div className="p-8 space-y-6">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-1.5">Developer</p>
                                        <p className="text-sm font-bold text-zinc-200">{project.developer}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-1.5">Starting</p>
                                        <p className="text-lg font-black text-white">{project.price.label}</p>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-white/5 flex gap-4">
                                    <div className="flex-1 p-3 rounded-2xl bg-black/40 border border-white/5">
                                        <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Yield</p>
                                        <p className="text-sm font-black text-green-500">8.4%</p>
                                    </div>
                                    <div className="flex-1 p-3 rounded-2xl bg-black/40 border border-white/5">
                                        <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Growth</p>
                                        <p className="text-sm font-black text-blue-500">+12%</p>
                                    </div>
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            )}

            {displayedProjects.length < allProjects.length && (
                <div className="mt-20 text-center">
                    <Button onClick={loadMore} className="h-16 px-12 rounded-full border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-all text-lg">
                        Load More Projects
                    </Button>
                </div>
            )}
      </div>
      
      <SiteFooter />
    </main>
  );
}
