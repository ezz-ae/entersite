'use client';

import React from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, BedDouble, Bath, Square, ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import type { ProjectData } from "@/lib/types";
import { motion } from "framer-motion";

interface ListingGridBlockProps {
  headline?: string;
  subtext?: string;
  projects?: ProjectData[];
}

export function ListingGridBlock({ 
    headline = "Featured Properties", 
    subtext = "Discover our handpicked selection of premium real estate opportunities.",
    projects = []
}: ListingGridBlockProps) {
  
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{headline}</h2>
                <p className="text-xl text-muted-foreground font-light">{subtext}</p>
            </div>
            <Button variant="outline" className="rounded-full px-6">View All Listings</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={project.id}
            >
                <Card className="group overflow-hidden border-0 bg-card/50 hover:bg-card transition-colors duration-500 flex flex-col h-full rounded-3xl shadow-sm hover:shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden m-2 rounded-2xl">
                    <Image
                    src={project.images?.[0] || 'https://picsum.photos/800/600'}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
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
      </div>
    </section>
  );
}
