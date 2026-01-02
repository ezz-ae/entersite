'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, LayoutGrid, List as ListIcon, Loader2, Activity } from "lucide-react";
import type { ProjectData } from '@/lib/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { ProjectCard } from '@/components/project-card';

const PROJECTS_PER_PAGE = 12;
const buildQueryString = (params: Record<string, string | number | undefined>) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      search.set(key, String(value));
    }
  });
  return search.toString();
};

export default function DiscoverPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);

  // Filter State
  const [selectedCity, setSelectedCity] = useState("Dubai");
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  const fetchProjects = useCallback(async (pageParam: number, append: boolean) => {
    setLoading(true);
    try {
      const queryString = buildQueryString({
        city: selectedCity,
        status: selectedStatus,
        query: searchQuery,
        page: pageParam,
        limit: PROJECTS_PER_PAGE,
      });
      const res = await fetch(`/api/projects/search?\${queryString}`);
      if (!res.ok) throw new Error('Failed to fetch projects');
      const json = await res.json();
      setTotalProjects(json.pagination.total || 0);
      setProjects((prev) => {
        return append ? [...prev, ...json.data] : json.data;
      });
      setPage(pageParam);
    } catch (error) {
      console.error('Failed to load projects', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCity, selectedStatus, searchQuery]);

  useEffect(() => {
    fetchProjects(1, false);
  }, [fetchProjects]);

  const loadMore = () => {
    const nextPage = page + 1;
    fetchProjects(nextPage, true);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col font-sans">
      
      {/* Hero Header */}
      <section className="bg-zinc-950 border-b border-white/5 pt-40 pb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="container mx-auto px-6 max-w-[1800px] relative z-10">
              <div className="flex flex-col items-center gap-8 mb-16 text-center">
                  <div className="max-w-4xl space-y-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 text-blue-500 text-[10px] font-bold uppercase tracking-widest border border-blue-500/20 mx-auto">
                        <Activity className="h-3.5 w-3.5" />
                        Market Database
                      </div>
                      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight uppercase">Market Intelligence</h1>
                      <p className="text-zinc-500 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
                          Access verified data on <span className="text-white">3,750+ projects</span>. Live inventory, ROI insights, and developer analytics.
                      </p>
                  </div>
              </div>

              {/* Search Control */}
              <div className="max-w-5xl mx-auto">
                  <div className="bg-zinc-900 border border-white/10 rounded-[2.5rem] p-2 flex flex-col md:flex-row gap-2 shadow-2xl backdrop-blur-3xl focus-within:border-blue-500/30 transition-all">
                      <div className="flex-1 flex items-center px-6 gap-4 py-4 md:py-0 border-b md:border-b-0 md:border-r border-white/5">
                          <Search className="h-6 w-6 text-zinc-600" />
                          <input 
                            type="text" 
                            placeholder="Search project, area, or developer..."
                            className="flex-1 bg-transparent border-none text-white placeholder:text-zinc-700 focus:outline-none h-12 text-lg font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                      </div>
                      <div className="p-2 flex gap-2">
                           <Select value={selectedCity} onValueChange={setSelectedCity}>
                                <SelectTrigger className="h-14 bg-white/5 border-white/5 rounded-2xl w-48 font-bold uppercase tracking-widest text-[10px] text-zinc-400 hover:bg-white/10 transition-all">
                                    <SelectValue placeholder="Location" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                    <SelectItem value="all">Global (All)</SelectItem>
                                    <SelectItem value="Dubai">Dubai</SelectItem>
                                    <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                                    <SelectItem value="Ras Al Khaimah">Ras Al Khaimah</SelectItem>
                                    <SelectItem value="Sharjah">Sharjah</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={() => fetchProjects(1, false)} className="h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-900/40 uppercase tracking-tight">
                                Search Data
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
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Available Clusters</p>
                    <Badge variant="outline" className="bg-green-500/5 text-green-500 border-green-500/20 font-bold px-3 py-1 rounded-full">
                        {totalProjects} Results
                    </Badge>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
                    <button className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-white/10 text-white" : "text-zinc-600")} onClick={() => setViewMode('grid')}><LayoutGrid className="h-5 w-5" /></button>
                    <button className={cn("p-2 rounded-lg transition-all", viewMode === 'table' ? "bg-white/10 text-white" : "text-zinc-600")} onClick={() => setViewMode('table')}><ListIcon className="h-5 w-5" /></button>
                </div>
            </div>

            {loading && projects.length === 0 ? (
                <div className="h-96 flex flex-col items-center justify-center gap-6">
                    <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Searching Market...</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {projects.map((project, idx) => (
                        <ProjectCard key={project.id} project={project} index={idx} />
                    ))}
                </div>
            )}

            {!loading && projects.length < totalProjects && (
                <div className="mt-20 text-center">
                    <Button onClick={loadMore} className="h-16 px-12 rounded-full border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-all text-lg uppercase tracking-tight">
                        Load More Projects
                    </Button>
                </div>
            )}
      </div>
    </main>
  );
}
