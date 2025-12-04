'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Building2, DollarSign, Loader2, Rocket, Bot, Sparkles, Layout, Code, ArrowRight } from "lucide-react";
import { AgentChat } from '@/components/onboarding/agent-chat';
import { ListingGridBlock } from '@/components/blocks/listing-grid-block';
import { searchProjects, getDevelopers, getLocations } from '@/lib/project-service';
import type { ProjectData } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function ProjectDiscoverySection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<any>({});
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(false);
  const [developers, setDevelopers] = useState<string[]>([]);
  const [locations, setLocations] = useState<{city: string, areas: string[]}[]>([]);

  useEffect(() => {
    const loadFilterData = async () => {
      setDevelopers(await getDevelopers());
      setLocations(await getLocations());
    };
    loadFilterData();
    handleSearch(); 
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const results = await searchProjects(searchQuery, filters);
      setProjects(results.slice(0, 9)); 
    } catch (error) {
      console.error("Error searching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
    }));
  };

  // This agent is for Q&A, not site generation, so we don't need onSiteConfigReady here.
  const handleAgentDiscoveryResponse = (config: any) => {
      console.log("AI Expert Agent Responded with:", config);
  }

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
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Explore <span className="text-primary">Real Project Data.</span></h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                  Search our unparalleled database of UAE real estate projects, with verified information and media.
              </p>
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by project, developer, city..."
                className="h-12 pl-10 rounded-xl bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
            
            <div className="md:col-span-4 text-center mt-4">
                <Button type="submit" size="lg" className="h-12 px-8 rounded-full shadow-lg">
                    <Search className="h-5 w-5 mr-2" /> Filter Projects
                </Button>
            </div>
          </form>

          {loading ? (
              <div className="h-64 flex items-center justify-center">
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

        <div className="py-20 text-center space-y-12 bg-muted/10 rounded-3xl border border-border/50 shadow-inner overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1]">
                Build Your Digital Presence in <br/>
                <span className="text-primary">Minutes, Not Months.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered platform streamlines every step from design to deployment.
            </p>
            
            <div className="relative w-full aspect-[16/9] max-w-6xl mx-auto rounded-xl shadow-2xl border border-border/50 overflow-hidden bg-background">
                {/* Placeholder for screenshot */}
                 <div className="absolute inset-0 bg-zinc-200 flex items-center justify-center text-muted-foreground">
                    Builder UI Screenshot Here
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 bg-background/80 backdrop-blur-md p-4 rounded-full border border-border shadow-lg">
                    <div className="flex items-center gap-2 text-primary font-medium">
                        <Sparkles className="h-4 w-4" /> AI Recommendations
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Layout className="h-4 w-4" /> Drag & Drop
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Code className="h-4 w-4" /> No Code Required
                    </div>
                </div>
            </div>
        </div>

        <div className="relative py-20 bg-card rounded-3xl border border-border/50 shadow-xl mt-20 flex flex-col items-center justify-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-md mb-4">
                <Bot className="h-4 w-4" />
                Your AI Real Estate Expert
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-3xl leading-[1.1]">
                Get instant insights from an AI trained on <span className="text-primary">3,750+ projects.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
                Ask about market trends, project details, or investment opportunities. Our AI provides data-driven answers, not generic chat.
            </p>
            
            <div className="relative w-full max-w-3xl mx-auto h-[600px] overflow-hidden rounded-2xl border shadow-2xl bg-background mt-12">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 z-10 pointer-events-none" />
                 <AgentChat onSiteConfigReady={handleAgentDiscoveryResponse} initialPrompt="Tell me about the latest luxury villas in Dubai Marina."/>
            </div>

            <Button size="lg" className="h-14 px-8 rounded-full shadow-lg mt-8">
                Start Building with AI <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>

      </div>
    </section>
  );
}
