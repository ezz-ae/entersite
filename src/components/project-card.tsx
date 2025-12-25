'use client';

import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  MapPin, 
  Building2, 
  ArrowUpRight, 
  BarChart3, 
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectData } from "@/lib/types";
import { ResponsiveImage } from "@/components/ui/responsive-image";

interface ProjectCardProps {
  project: ProjectData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="group relative bg-zinc-900 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-blue-500/30 transition-all duration-500"
    >
        {/* Visual Top */}
        <div className="relative aspect-[16/10] overflow-hidden">
            <ResponsiveImage 
                src={project.images[0]} 
                alt={project.name}
                fill
                className="group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            <div className="absolute top-6 left-6 flex gap-2">
                <Badge className="bg-white/10 backdrop-blur-xl border-white/10 text-white text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                    {project.status}
                </Badge>
                {project.performance.marketTrend === 'up' && (
                    <Badge className="bg-green-500/20 backdrop-blur-xl border-green-500/20 text-green-500 text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full gap-1.5">
                        <TrendingUp className="h-3 w-3" /> Trending
                    </Badge>
                )}
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-white/60 text-xs font-medium">
                        <MapPin className="h-3.5 w-3.5" /> {project.location.area}, {project.location.city}
                    </div>
                    <h3 className="text-3xl font-bold text-white tracking-tighter">{project.name}</h3>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Starting</p>
                    <p className="text-2xl font-black text-white">{project.price.label}</p>
                </div>
            </div>
        </div>

        {/* Intelligence Data Bottom */}
        <div className="p-8 space-y-8">
            <div className="grid grid-cols-3 gap-6">
                <DataMetric 
                    label="Expected ROI" 
                    value={`${project.performance.roi}%`} 
                    icon={BarChart3} 
                    color="blue"
                />
                <DataMetric 
                    label="Capital Gain" 
                    value={`+${project.performance.capitalAppreciation}%`} 
                    icon={ArrowUpRight} 
                    color="green"
                />
                <DataMetric 
                    label="Handover" 
                    value={project.handover ? `Q${project.handover.quarter} ${project.handover.year}` : 'Ready'} 
                    icon={Calendar} 
                    color="orange"
                />
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-zinc-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none mb-1.5">Developer</p>
                        <p className="text-sm font-bold text-zinc-300 leading-none">{project.developer}</p>
                    </div>
                </div>
                <Button variant="outline" size="sm" className="rounded-full border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] h-10 px-6 hover:bg-white hover:text-black transition-all">
                    Project Details
                </Button>
            </div>
        </div>
    </motion.div>
  );
}

function DataMetric({ label, value, icon: Icon, color }: any) {
    const colorClasses: any = {
        blue: "text-blue-500 bg-blue-500/10",
        green: "text-green-500 bg-green-500/10",
        orange: "text-orange-500 bg-orange-500/10"
    };

    return (
        <div className="space-y-3">
            <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", colorClasses[color])}>
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none mb-1.5">{label}</p>
                <p className="text-lg font-black text-white leading-none">{value}</p>
            </div>
        </div>
    )
}

import { cn } from "@/lib/utils";
