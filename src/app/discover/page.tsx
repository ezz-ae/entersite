'use client';

import React, { useState, useEffect } from 'react';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Filter, LayoutGrid, List as ListIcon, TrendingUp, BarChart3, Building2, SlidersHorizontal, X } from "lucide-react";
import { getRealisteProjects, searchRealisteProjects } from '@/lib/realiste-projects';
import type { ProjectData } from '@/lib/types';
import { ResponsiveImage } from '@/components/ui/responsive-image';
import { getRandomImage } from '@/lib/images';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function DiscoverPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter State
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 50000000]); // 0 to 50M
  
  // Statistics
  const [stats, setStats] = useState({ total: 0, avgPrice: 0, avgRoi: 0 });

  useEffect(() => {
    loadData();
  }, [selectedCity, selectedStatus]); // Reload when filters change

  const loadData = async () => {
    setLoading(true);
    
    // Construct filter object
    const filters: any = {};
    if (selectedCity !== "all") filters.city = selectedCity;
    if (selectedStatus !== "all") filters.status = selectedStatus;
    
    // In a real app, we'd pass priceRange to the backend/service too
    // For now, we'll filter client-side or assume service handles it if we passed it
    
    const data = await searchRealisteProjects(searchQuery, filters);
    
    // Apply client-side price filtering for this demo if service doesn't do it fully
    const filteredData = data.filter(p => p.price.from >= priceRange[0] && p.price.from <= priceRange[1]);
    
    setProjects(filteredData);
    
    // Calculate stats dynamiclly based on filtered view
    const total = filteredData.length;
    const avgPrice = total > 0 ? filteredData.reduce((acc, curr) => acc + curr.price.from, 0) / total : 0;
    const avgRoi = 8.5; // This would ideally come from the data

    setStats({ total, avgPrice, avgRoi });
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      loadData();
  }

  const formatPrice = (price: number) => {
      if (price >= 1000000) return `AED ${(price / 1000000).toFixed(1)}M`;
      if (price >= 1000) return `AED ${(price / 1000).toFixed(0)}K`;
      return `AED ${price}`;
  }

  return (
    <main className="min-h-screen bg-background flex flex-col font-sans">
      <SiteHeader />
      
      {/* Hero / Market Pulse */}
      <section className="bg-zinc-950 text-white border-b border-white/10 pt-32 pb-16">
          <div className="container mx-auto px-6 max-w-[1800px]">
              <div className="flex flex-col xl:flex-row justify-between items-end gap-12 mb-12">
                  <div className="max-w-3xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20 mb-6">
                        <BarChart3 className="h-3 w-3" />
                        Live Market Data
                      </div>
                      <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">Market Intelligence Portal</h1>
                      <p className="text-zinc-400 text-xl max-w-2xl leading-relaxed">
                          Access verified data on 3,750+ UAE projects. Analyze ROI, growth potential, and off-plan opportunities with precision.
                      </p>
                  </div>
                  
                  {/* Stats Bar */}
                  <div className="flex flex-wrap gap-8 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm min-w-[300px] xl:min-w-[600px]">
                      <div className="flex-1">
                          <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Total Projects</p>
                          <p className="text-4xl font-bold text-white">{stats.total.toLocaleString()}</p>
                      </div>
                      <div className="w-px bg-white/10" />
                      <div className="flex-1">
                          <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Avg. Price</p>
                          <p className="text-4xl font-bold text-white">{(stats.avgPrice / 1000000).toFixed(1)}M</p>
                      </div>
                      <div className="w-px bg-white/10" />
                      <div className="flex-1">
                          <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Avg. ROI</p>
                          <p className="text-4xl font-bold text-emerald-400">{stats.avgRoi}%</p>
                      </div>
                  </div>
              </div>

              {/* Search Bar */}
              <div className="max-w-4xl">
                  <form onSubmit={handleSearch} className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                      <div className="relative flex items-center bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2 pl-4 transition-all focus-within:ring-2 focus-within:ring-primary/50">
                          <Search className="h-6 w-6 text-zinc-500 mr-4" />
                          <input 
                            type="text" 
                            placeholder="Search by project, developer, or area (e.g. 'Emaar Beachfront')"
                            className="flex-1 bg-transparent border-none text-white placeholder:text-zinc-500 focus:outline-none h-12 text-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <Button size="lg" className="rounded-xl h-12 px-8 text-base font-semibold">Search</Button>
                      </div>
                  </form>
              </div>
          </div>
      </section>

      <div className="flex-1 container mx-auto px-6 max-w-[1800px] py-12">
        <div className="grid lg:grid-cols-[300px_1fr] gap-10">
            
            {/* Sidebar Filters */}
            <aside className="space-y-8 hidden lg:block sticky top-24 h-fit">
                <div className="bg-card border rounded-xl p-6 space-y-8 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold flex items-center gap-2 text-lg">
                            <SlidersHorizontal className="h-5 w-5" /> Filters
                        </h3>
                        <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => {
                            setSelectedCity("all");
                            setSelectedStatus("all");
                            setPriceRange([0, 50000000]);
                        }}>Reset</Button>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">City</label>
                            <Select value={selectedCity} onValueChange={setSelectedCity}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Cities" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Cities</SelectItem>
                                    <SelectItem value="Dubai">Dubai</SelectItem>
                                    <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                                    <SelectItem value="Sharjah">Sharjah</SelectItem>
                                    <SelectItem value="Ras Al Khaimah">Ras Al Khaimah</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</label>
                             <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="Pipeline">Off-Plan (Pipeline)</SelectItem>
                                    <SelectItem value="Construction">Under Construction</SelectItem>
                                    <SelectItem value="Ready">Ready</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Price Range</label>
                                <span className="text-xs font-medium text-primary">{formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}+</span>
                            </div>
                            <Slider 
                                defaultValue={[0, 50000000]} 
                                max={50000000} 
                                step={100000} 
                                value={priceRange}
                                onValueChange={setPriceRange}
                                className="py-4"
                            />
                        </div>

                         <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Completion Year</label>
                            <div className="grid grid-cols-3 gap-2">
                                <Button variant="outline" size="sm" className="text-xs">2025</Button>
                                <Button variant="outline" size="sm" className="text-xs">2026</Button>
                                <Button variant="outline" size="sm" className="text-xs">2027+</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900/50 rounded-xl space-y-4">
                    <div className="flex items-start gap-3">
                         <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-md">
                             <TrendingUp className="h-6 w-6 text-white" />
                         </div>
                         <div>
                            <h4 className="font-bold text-blue-900 dark:text-blue-100">AI Analyst</h4>
                            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 leading-relaxed">
                                Get predictive ROI analysis and rental yield forecasts for these projects.
                            </p>
                         </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                        Analyze Market
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="space-y-8">
                <div className="flex justify-between items-center bg-card p-4 rounded-xl border shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground">Showing <strong>{projects.length}</strong> verified projects</p>
                    <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg">
                        <Button 
                            variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                            size="sm" 
                            className="h-8 w-8 p-0 rounded-md"
                            onClick={() => setViewMode('grid')}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button 
                            variant={viewMode === 'table' ? 'secondary' : 'ghost'} 
                            size="sm" 
                            className="h-8 w-8 p-0 rounded-md"
                            onClick={() => setViewMode('table')}
                        >
                            <ListIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {viewMode === 'grid' ? (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <Card key={project.id} className="overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group border-border/60 rounded-2xl bg-card">
                                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                                    <ResponsiveImage 
                                        src={project.images?.[0] || getRandomImage('hero')} 
                                        alt={project.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <Badge variant="secondary" className="backdrop-blur-xl bg-white/90 text-black border-0 shadow-sm font-semibold px-3 py-1">
                                            {project.deliveryYear}
                                        </Badge>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md">
                                        {project.status || 'Off-Plan'}
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white opacity-100">
                                        <p className="font-bold text-lg tracking-tight mb-1">{project.developer}</p>
                                        <p className="text-white/80 text-sm flex items-center gap-1"><MapPin className="h-3 w-3" /> {project.location.area}</p>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-bold text-xl line-clamp-1 group-hover:text-primary transition-colors">{project.name}</h3>
                                        <div className="text-right">
                                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-0.5">Starting From</p>
                                            <p className="font-bold text-lg text-primary whitespace-nowrap">{project.price.label}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-border/50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                                                <TrendingUp className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-muted-foreground uppercase font-bold">Est. ROI</p>
                                                <p className="text-sm font-bold text-green-600">8.5%</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                                <BarChart3 className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-muted-foreground uppercase font-bold">Growth</p>
                                                <p className="text-sm font-bold text-blue-600">+12%</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="border rounded-2xl overflow-hidden bg-card shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50 border-b border-border/50">
                                <tr>
                                    <th className="text-left py-4 px-6 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Project Name</th>
                                    <th className="text-left py-4 px-6 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Developer</th>
                                    <th className="text-left py-4 px-6 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Location</th>
                                    <th className="text-left py-4 px-6 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Completion</th>
                                    <th className="text-right py-4 px-6 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Price From</th>
                                    <th className="text-right py-4 px-6 font-semibold text-muted-foreground uppercase text-xs tracking-wider">ROI</th>
                                    <th className="py-4 px-6"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-muted/30 transition-colors group">
                                        <td className="py-4 px-6 font-bold text-foreground">{project.name}</td>
                                        <td className="py-4 px-6 text-muted-foreground">{project.developer}</td>
                                        <td className="py-4 px-6 text-muted-foreground">{project.location.area}</td>
                                        <td className="py-4 px-6">
                                            <Badge variant="outline" className="font-mono text-xs">{project.deliveryYear}</Badge>
                                        </td>
                                        <td className="py-4 px-6 text-right font-bold tabular-nums">{project.price.label}</td>
                                        <td className="py-4 px-6 text-right text-green-600 font-bold tabular-nums">8.5%</td>
                                        <td className="py-4 px-6 text-right">
                                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">Details</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
      </div>
      
      <SiteFooter />
    </main>
  );
}
