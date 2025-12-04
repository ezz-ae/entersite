'use client';

import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, BedDouble, Bath, Square, ArrowRight, Heart, Search, Loader2 } from "lucide-react";
import { ResponsiveImage } from "@/components/ui/responsive-image"; // Use ResponsiveImage
import { SAFE_IMAGES, getRandomImage } from "@/lib/images"; // Import safe images
import type { ProjectData } from "@/lib/types";
import { motion } from "framer-motion";
import { searchProjects } from "@/lib/project-service";
import { verifyAndFetchAssets } from "@/lib/media-scraper"; 

interface ListingGridBlockProps {
  headline?: string;
  subtext?: string;
  initialFilter?: { city?: string, developer?: string, status?: string }; // Expanded filter options
  projects?: ProjectData[]; // Can be pre-populated by template
}

export function ListingGridBlock({
    headline = "Featured Properties",
    subtext = "Discover our handpicked selection of premium real estate opportunities.",
    initialFilter = {},
    projects: initialProjects = []
}: ListingGridBlockProps) {
  
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
      // Only load projects if not pre-populated by a template
      if (initialProjects.length === 0 || Object.keys(initialFilter).length > 0) {
          loadProjects(searchQuery, initialFilter);
      } else {
          setProjects(initialProjects);
      }
  }, [initialFilter, initialProjects]); // Re-run if initialFilter/Projects change

  const loadProjects = async (query = "", filters = initialFilter) => {
      setLoading(true);
      try {
          const rawResults = await searchProjects(query, filters);
          
          const cleanedResults = await Promise.all(rawResults.slice(0, 6).map(async (p) => {
              const cleanAssets = await verifyAndFetchAssets(p.name, p.images);
              
              return {
                  ...p,
                  images: cleanAssets.heroImages.concat(cleanAssets.galleryImages),
                  developer: cleanAssets.developerName || p.developer
              };
          }));

          setProjects(cleanedResults);
      } catch (error) {
          console.error("Failed to load projects", error);
      } finally {
          setLoading(false);
      }
  }

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      loadProjects(searchQuery);
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">{headline}</h2>
                <p className="text-lg text-muted-foreground font-light max-w-xl">{subtext}</p>
            </div>
            
            <form onSubmit={handleSearch} className="relative w-full md:w-72">
                <Input 
                    placeholder="Search projects..." 
                    className="pl-10 h-12 bg-muted/30 border-muted-foreground/10 rounded-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
            </form>
        </div>

        {loading ? (
            <div className="h-64 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 text-lg text-muted-foreground">Loading projects...</span>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    viewport={{ once: true, amount: 0.5 }}
                    key={project.id}
                >
                    <Card className="group overflow-hidden border border-border/50 bg-card hover:bg-muted/20 transition-colors duration-500 flex flex-col h-full rounded-2xl shadow-sm hover:shadow-xl">
                    <div className="relative aspect-[4/3] overflow-hidden m-2 rounded-xl">
                        <ResponsiveImage
                            src={project.images?.[0] || getRandomImage('hero')}
                            alt={project.name}
                            fill
                            className="transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                            <Badge variant="secondary" className="bg-white/90 backdrop-blur text-black border-0 shadow-sm font-medium px-3 py-1">
                                {project.availability}
                            </Badge>
                        </div>
                        <Button size="icon" variant="ghost" className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <Heart className="h-5 w-5" />
                        </Button>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex gap-2">
                                {project.features?.slice(0, 2).map((f, i) => (
                                    <Badge key={i} variant="outline" className="text-white border-white/30 bg-black/20 backdrop-blur-sm text-[10px]">
                                        {f}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <CardContent className="p-6 space-y-4 flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-xl mb-1 group-hover:text-primary transition-colors line-clamp-1">{project.name}</h3>
                                <div className="flex items-center text-muted-foreground text-sm">
                                    <MapPin className="h-3.5 w-3.5 mr-1" />
                                    {project.location?.area}
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-muted-foreground uppercase font-medium">Starting from</p>
                                <p className="text-lg font-bold text-primary">{project.price?.label}</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium uppercase tracking-wide">
                                    <BedDouble className="h-3.5 w-3.5" /> Beds
                                </div>
                                <span className="font-semibold text-sm">1 - 4</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium uppercase tracking-wide">
                                    <Square className="h-3.5 w-3.5" /> Area
                                </div>
                                <span className="font-semibold text-sm">850+ sqft</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium uppercase tracking-wide">
                                    <Bath className="h-3.5 w-3.5" /> Baths
                                </div>
                                <span className="font-semibold text-sm">2 - 5</span>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="p-6 pt-0">
                        <Button variant="secondary" className="w-full h-12 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardFooter>
                    </Card>
                </motion.div>
            ))}
            </div>
        )}
      </div>
    </section>
  );
}
