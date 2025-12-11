
'use client';

import React from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, BedDouble, Bath, Square, ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import type { ProjectData } from "@/lib/types";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: ProjectData;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        viewport={{ once: true, amount: 0.5 }}
    >
        <Card className="group overflow-hidden border border-border/50 bg-card hover:bg-muted/20 transition-colors duration-500 flex flex-col h-full rounded-2xl shadow-sm hover:shadow-xl">
        <div className="relative aspect-[4/3] overflow-hidden m-2 rounded-xl">
            <Image
                src={project.images?.[0] || 'https://picsum.photos/seed/1/800/600'}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                        {project.location?.area || project.location.city}
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
                    <span className="font-semibold text-sm">{project.bedrooms?.label || 'N/A'}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium uppercase tracking-wide">
                        <Square className="h-3.5 w-3.5" /> Area
                    </div>
                    <span className="font-semibold text-sm">{project.areaSqft?.label || 'N/A'}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium uppercase tracking-wide">
                        <Bath className="h-3.5 w-3.5" /> Handover
                    </div>
                    <span className="font-semibold text-sm">{project.handover ? `Q${project.handover.quarter} ${project.handover.year}` : 'N/A'}</span>
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
  );
}
