'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Loader2, Rocket, ArrowRight } from "lucide-react";
import { ListingGridBlock } from '@/components/blocks/listing-grid-block';
import { searchProjects, getDevelopers, getLocations } from '@/lib/project-service';
import type { ProjectData } from '@/lib/types';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { debounce } from 'lodash';

export function ProjectDiscoverySection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<any>({});
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [developers, setDevelopers] = useState<string[]>([]);
  const [locations, setLocations] = useState<{city: string, areas: string[]}[]>([]);
  const { toast } = useToast();

  const loadInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const [devs, locs, initialProjects] = await Promise.all([
        getDevelopers(),
        getLocations(),
        searchProjects("", {})
      ]);
      setDevelopers(devs);
      setLocations(locs);
      setProjects(initialProjects.slice(0, 9));
    } catch (error) {
      console.error("Failed to load initial data:", error);
      toast({
        title: "Error Loading Data",
        description: "Could not fetch project information. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const debouncedSearch = useCallback(
    debounce(async (query, currentFilters) => {
        setLoading(true);
        try {
            const results = await searchProjects(query, currentFilters);
            setProjects(results.slice(0, 9)); 
        } catch (error) {
            console.error("Error searching projects:", error);
        } finally {
            setLoading(false);
        }
    }, 500),
    []
  );

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = {
      ...filters,
      [key]: value === "all" ? undefined : value,
    };
    setFilters(newFilters);
    debouncedSearch(searchQuery, newFilters);
  };
  
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      debouncedSearch(query, filters);
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      debouncedSearch.cancel(); // Cancel any pending debounced calls
      handleSearch();
  };

  return (
    <section className="bg-background text-foreground py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="text-center max-w-5xl mx-auto mb-20 space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1]"
          >
            The <span className="text-primary">AI Operating System</span> for Real Estate Growth.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Leverage <span className="font-semibold text-foreground">3,750+ verified projects</span> and advanced AI agents to build, market, and manage your real estate empire.
          </motion.p>
           <Link href="/builder">
                <Button size="lg" className="h-14 px-8 text-base rounded-full shadow-lg hover:scale-105 transition-transform mt-8">
                    <Rocket className="mr-2 h-4 w-4" /> Launch Your Platform
                </Button>
            </Link>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-card border rounded-3xl p-8 shadow-xl mb-20"
        >
          <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Explore <span className="text-primary">Real Project Data</span></h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                  Search our unparalleled database of UAE real estate projects, with verified information and media.
              </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto mb-8">
            <div className="md:col-span-2 lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by project, developer, city..."
                className="h-12 pl-10 rounded-xl bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
            
            <Select onValueChange={(val) => handleFilterChange('city', val)}>
              <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-muted-foreground/20 focus:ring-primary">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {locations.map(loc => (
                    <SelectItem key={loc.city} value={loc.city}>{loc.city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(val) => handleFilterChange('developer', val)}>
              <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-muted-foreground/20 focus:ring-primary">
                <SelectValue placeholder="Developer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Developers</SelectItem>
                {developers.map(dev => (
                    <SelectItem key={dev} value={dev}>{dev}</SelectItem>
                ))}
              </SelectContent>
            </Select>
             <Button type="submit" size="lg" className="h-12 px-8 rounded-xl shadow-lg w-full lg:w-auto" onClick={() => handleSearch()}>
                    {loading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Search className="h-5 w-5 mr-2" />}
                    {loading ? 'Searching...' : 'Search'}
             </Button>
          </form>

          {loading ? (
              <div className="h-96 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-3 text-lg text-muted-foreground">Loading projects...</span>
              </div>
          ) : projects.length > 0 ? (
              <ListingGridBlock headline="" subtext="" projects={projects} />
          ) : (
              <div className="text-center py-16 text-muted-foreground text-lg">
                  No projects found matching your criteria.
              </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
