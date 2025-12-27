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
  Zap,
  Share2,
  FileText,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectData } from "@/lib/types";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { cn } from "@/lib/utils";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: ProjectData;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const router = useRouter();

  const handleCreateLandingPage = () => {
    router.push(`/builder?prompt=Luxury landing page for ${project.name} by ${project.developer} in ${project.location.area}`);
  };

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
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

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="rounded-full border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] h-10 px-6 hover:bg-white hover:text-black transition-all">
                            Project Details
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-4xl bg-zinc-950 border-white/10 text-white rounded-[2.5rem] overflow-hidden p-0 max-h-[90vh] overflow-y-auto custom-scrollbar border-none shadow-2xl">
                        <div className="relative aspect-video w-full">
                            <ResponsiveImage src={project.images[0]} alt={project.name} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                            <div className="absolute top-6 right-6 z-50">
                                <DialogClose className="h-10 w-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black transition-all">
                                    <X className="h-5 w-5" />
                                </DialogClose>
                            </div>
                            <div className="absolute bottom-10 left-10 right-10">
                                <Badge className="mb-4 bg-blue-600 border-none text-white font-black uppercase tracking-widest px-4 py-1.5">Master Node: {project.id}</Badge>
                                <h2 className="text-6xl font-black tracking-tighter text-white leading-none uppercase italic">{project.name}</h2>
                                <p className="text-xl text-zinc-400 font-light mt-4 flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-blue-500" /> {project.location.area}, {project.location.city}
                                </p>
                            </div>
                        </div>

                        <div className="p-12 space-y-16">
                            {/* Actions Node */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Button 
                                    onClick={handleCreateLandingPage}
                                    className="h-20 rounded-[2rem] bg-blue-600 hover:bg-blue-700 text-white font-black gap-3 text-xl shadow-xl shadow-blue-600/20 group"
                                >
                                    <Zap className="h-6 w-6 text-blue-300 group-hover:scale-125 transition-transform" /> Generate Campaign
                                </Button>
                                <Button variant="outline" className="h-20 rounded-[2rem] border-white/10 bg-white/5 hover:bg-white/10 font-bold gap-3 text-lg">
                                    <Share2 className="h-5 w-5" /> Export Data Link
                                </Button>
                                <Button variant="outline" className="h-20 rounded-[2rem] border-white/10 bg-white/5 hover:bg-white/10 font-bold gap-3 text-lg">
                                    <FileText className="h-5 w-5" /> Branded PDF
                                </Button>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-16">
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Infrastructure Brief</h4>
                                        <p className="text-zinc-300 leading-relaxed text-xl font-light">
                                            {project.description.full}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="p-8 rounded-[2rem] bg-zinc-900 border border-white/5">
                                            <p className="text-[10px] font-bold text-zinc-600 uppercase mb-2 tracking-widest">Expected Yield</p>
                                            <p className="text-4xl font-black text-green-500">{project.performance.roi}% <span className="text-xs font-medium opacity-50 ml-1">PA</span></p>
                                        </div>
                                        <div className="p-8 rounded-[2rem] bg-zinc-900 border border-white/5">
                                            <p className="text-[10px] font-bold text-zinc-600 uppercase mb-2 tracking-widest">Growth Potential</p>
                                            <p className="text-4xl font-black text-blue-500">+{project.performance.capitalAppreciation}%</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-10">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Market Performance Node</h4>
                                    <div className="h-64 flex items-end gap-3 px-4 bg-black/40 rounded-[2.5rem] border border-white/5 pt-12 pb-6">
                                        {project.performance.priceHistory.map((h, i) => (
                                            <div key={i} className="flex-1 flex flex-col items-center gap-4 h-full justify-end group">
                                                <div className="relative w-full">
                                                    <motion.div 
                                                        initial={{ height: 0 }}
                                                        whileInView={{ height: `${(h.avgPrice / project.price.from) * 100}%` }}
                                                        transition={{ duration: 1, delay: i * 0.1 }}
                                                        className="bg-blue-600/40 w-full rounded-t-xl group-hover:bg-blue-500 transition-all border-t border-blue-400" 
                                                    />
                                                </div>
                                                <p className="text-[10px] font-mono text-zinc-600 group-hover:text-white transition-colors">{h.year}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] bg-blue-600/5 border border-blue-500/20 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <TrendingUp className="h-20 w-20 text-blue-500" />
                                        </div>
                                        <div className="flex items-center gap-3 mb-3 relative z-10">
                                            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                                            <p className="font-black uppercase tracking-widest text-xs text-white">Sentiment: Aggressive</p>
                                        </div>
                                        <p className="text-sm text-zinc-400 leading-relaxed font-light relative z-10">This project is outperforming the {project.location.city} luxury index by 2.4% this quarter.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Project DNA */}
                            <div className="space-y-8">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Project DNA</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <DnaTag label="Developer" value={project.developer} />
                                    <DnaTag label="Handover" value={project.handover ? `Q${project.handover.quarter} ${project.handover.year}` : 'Ready'} />
                                    <DnaTag label="Price Range" value={project.price.label} />
                                    <DnaTag label="Status" value={project.status || 'Active'} />
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    </motion.div>
  );
}

function DnaTag({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-[8px] font-black text-zinc-600 uppercase mb-1.5 tracking-widest">{label}</p>
            <p className="text-sm font-bold text-white truncate">{value}</p>
        </div>
    )
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
