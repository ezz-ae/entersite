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
  X,
  MessageSquare,
  Target,
  Layout
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectData } from "@/lib/types";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { cn } from "@/lib/utils";
import { 
  Dialog, 
  DialogContent, 
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

/**
 * Robust developer name extraction.
 */
function getDeveloperName(project: ProjectData): string {
  let dev = project.developer || '';
  
  // Clean platform branding from developer names
  dev = dev.replace(/Entrestate/gi, '').replace(/EntreSite/gi, '').trim();

  const projectName = project.name.toLowerCase();

  if (!dev || dev === 'N/A' || dev === '') {
    if (projectName.includes('emaar')) return 'Emaar Properties';
    if (projectName.includes('damac')) return 'Damac Properties';
    if (projectName.includes('sobha')) return 'Sobha Realty';
    if (projectName.includes('nakheel')) return 'Nakheel';
    if (projectName.includes('meraas')) return 'Meraas';
    if (projectName.includes('danube')) return 'Danube Properties';
    return 'Signature Development';
  }

  return dev;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const router = useRouter();
  const statusLabel = project.availability ?? project.status ?? 'Active';
  const developerName = getDeveloperName(project);

  const firstImage =
  Array.isArray(project.images) && project.images.length > 0
    ? project.images[0]
    : "/images/placeholder-project.jpg";

  const handleAction = (path: string) => {
    const params = new URLSearchParams();
    params.set('projectId', project.id);
    params.set('projectName', project.name);
    params.set('developer', developerName);
    params.set('area', project.location?.area || '');
    
    if (path === '/builder') {
        params.set('prompt', `Luxury landing page for ${project.name} by ${developerName} in ${project.location?.area}`);
    }
    
    router.push(`${path}?${params.toString()}`);
  };

  const priceHistory = project.performance?.priceHistory || [];
  const maxPrice = priceHistory.length > 0 
    ? Math.max(...priceHistory.map(ph => ph.avgPrice))
    : 0;

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group relative bg-zinc-900 border border-white/5 rounded-[2rem] overflow-hidden hover:border-blue-500/30 transition-all duration-700 shadow-sm"
    >
        {/* Visual Top */}
        <div className="relative aspect-[16/11] overflow-hidden">
            <ResponsiveImage 
                src={firstImage} 
                alt={project.name ?? "Project"}
                fill
                className="group-hover:scale-105 transition-transform duration-[2000ms] ease-out object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <Badge className="bg-black/60 backdrop-blur-md border-white/10 text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {statusLabel}
                </Badge>
                {project.performance?.marketTrend === 'up' && (
                    <Badge className="bg-green-500/20 backdrop-blur-md border-green-500/20 text-green-500 text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full gap-1">
                        <TrendingUp className="h-2.5 w-2.5" /> Trending
                    </Badge>
                )}
            </div>

            {/* Quick Actions Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6">
                <QuickActionButton 
                    icon={Layout} 
                    label="Site" 
                    onClick={() => handleAction('/builder')} 
                />
                <QuickActionButton 
                    icon={MessageSquare} 
                    label="Chat" 
                    onClick={() => handleAction('/dashboard/chat-agent')} 
                />
                <QuickActionButton 
                    icon={Target} 
                    label="Ads" 
                    onClick={() => handleAction('/dashboard/google-ads')} 
                />
            </div>

            <div className="absolute bottom-5 left-6 right-6 flex justify-between items-end group-hover:opacity-0 transition-opacity">
                <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-white/70 text-[10px] font-semibold uppercase tracking-wider">
                        <MapPin className="h-3 w-3 text-blue-500" /> {project.location?.area}
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight leading-none uppercase">{project.name}</h3>
                </div>
                <div className="text-right">
                    <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">From</p>
                    <p className="text-xl font-bold text-white tracking-tight leading-none">{project.price?.label}</p>
                </div>
            </div>
        </div>

        {/* Intelligence Data Bottom */}
        <div className="p-8 space-y-8 bg-zinc-950/50">
            <div className="grid grid-cols-3 gap-4">
                <DataMetric 
                    label="ROI" 
                    value={`${project.performance?.roi ?? 0}%`} 
                    icon={BarChart3} 
                    color="blue"
                />
                <DataMetric 
                    label="Gain" 
                    value={`+${project.performance?.capitalAppreciation ?? 0}%`} 
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
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-zinc-500" />
                    </div>
                    <div>
                        <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Developer</p>
                        <p className="text-xs font-bold text-zinc-400 truncate max-w-[100px]">{developerName}</p>
                    </div>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="rounded-xl border-white/10 bg-white/5 text-[9px] font-bold uppercase tracking-widest h-10 px-5 hover:bg-white hover:text-black transition-all">
                            Details
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-5xl bg-zinc-950 border-white/10 text-white rounded-[2.5rem] overflow-hidden p-0 max-h-[90vh] overflow-y-auto custom-scrollbar border-none shadow-2xl">
                        <div className="relative aspect-video w-full">
                            <ResponsiveImage src={firstImage} alt={project.name ?? "Project"} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                            <div className="absolute top-8 right-8 z-50">
                                <DialogClose className="h-12 w-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black transition-all">
                                    <X className="h-6 w-6" />
                                </DialogClose>
                            </div>
                            <div className="absolute bottom-12 left-12 right-12">
                                <div className="flex items-center gap-3 mb-4">
                                    <Badge className="bg-blue-600 text-white border-none font-bold px-4 py-1 rounded-full text-[10px] tracking-widest uppercase">
                                        {developerName}
                                    </Badge>
                                </div>
                                <DialogTitle className="text-6xl font-bold tracking-tight text-white leading-none uppercase">{project.name}</DialogTitle>
                                <DialogDescription className="text-xl text-zinc-400 font-medium mt-6 flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-blue-500" /> {project.location?.area}, {project.location?.city}
                                </DialogDescription>
                            </div>
                        </div>

                        <div className="p-12 space-y-16">
                            {/* Actions Node */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Button 
                                    onClick={() => handleAction('/builder')}
                                    className="h-20 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold gap-3 text-xl shadow-lg shadow-blue-600/20 group"
                                >
                                    <Layout className="h-6 w-6 text-blue-300" /> Build Site
                                </Button>
                                <Button 
                                    onClick={() => handleAction('/dashboard/chat-agent')}
                                    variant="outline" 
                                    className="h-20 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 font-bold gap-3 text-lg uppercase tracking-tight text-zinc-300"
                                >
                                    <MessageSquare className="h-5 w-5 text-zinc-500" /> Chat Agent
                                </Button>
                                <Button 
                                    onClick={() => handleAction('/dashboard/google-ads')}
                                    variant="outline" 
                                    className="h-20 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 font-bold gap-3 text-lg uppercase tracking-tight text-zinc-300"
                                >
                                    <Target className="h-5 w-5 text-zinc-500" /> Launch Ads
                                </Button>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-16">
                                <div className="space-y-10">
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">Project Overview</h4>
                                        <p className="text-zinc-300 leading-relaxed text-lg font-medium">
                                            {project.description.full}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5">
                                            <p className="text-[10px] font-bold text-zinc-500 uppercase mb-2 tracking-widest">Expected Yield</p>
                                            <p className="text-4xl font-bold text-green-500 tracking-tight">{project.performance?.roi ?? 0}% <span className="text-[10px] font-medium opacity-50 ml-1">PA</span></p>
                                        </div>
                                        <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5">
                                            <p className="text-[10px] font-bold text-zinc-500 uppercase mb-2 tracking-widest">Capital Growth</p>
                                            <p className="text-4xl font-bold text-blue-500 tracking-tight">+{project.performance?.capitalAppreciation ?? 0}%</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-10">
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">Price Intelligence</h4>
                                    <div className="h-60 flex items-end gap-3 px-6 bg-black/40 rounded-2xl border border-white/5 pt-12 pb-6">
                                        {priceHistory.length > 0 ? (
                                            priceHistory.map((h, i) => (
                                                <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
                                                    <div className="relative w-full">
                                                        <motion.div 
                                                            initial={{ height: 0 }}
                                                            whileInView={{ height: `${maxPrice > 0 ? (h.avgPrice / maxPrice) * 100 : 0}%` }}
                                                            transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                                            className="bg-blue-600/40 w-full rounded-t-xl group-hover:bg-blue-500 transition-all border-t border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.1)]" 
                                                        />
                                                    </div>
                                                    <p className="text-[9px] font-mono font-bold text-zinc-600 group-hover:text-white transition-colors tracking-tighter">{h.year}</p>
                                                </div>
                                            ))
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center text-zinc-600 italic text-sm">
                                            Pricing trends syncing...
                                          </div>
                                        )}
                                    </div>
                                    <div className="p-8 rounded-2xl bg-blue-600/5 border border-blue-500/20 relative overflow-hidden">
                                        <div className="flex items-center gap-3 mb-3 relative z-10">
                                            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                                            <p className="font-bold uppercase tracking-widest text-[9px] text-white">Sentiment: {project.performance?.marketTrend === 'up' ? 'Bullish' : 'Stable'}</p>
                                        </div>
                                        <p className="text-sm text-zinc-400 leading-relaxed font-medium relative z-10">
                                            This project is {project.performance?.marketTrend === 'up' ? 'outperforming' : 'matching'} the local index by <span className="text-white font-bold">{(project.performance?.capitalAppreciation ?? 0) / 5}%</span>.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Project DNA */}
                            <div className="space-y-8">
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">Project DNA</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <DnaTag label="Developer" value={developerName} />
                                    <DnaTag label="Handover" value={project.handover ? `Q${project.handover.quarter} ${project.handover.year}` : 'Ready'} />
                                    <DnaTag label="Price" value={project.price?.label ?? 'N/A'} />
                                    <DnaTag label="Status" value={statusLabel} />
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

function QuickActionButton({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) {
    return (
        <button 
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className="flex flex-col items-center gap-2 group/btn"
        >
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 scale-90 group-hover/btn:scale-100">
                <Icon className="h-5 w-5" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/60 group-hover/btn:text-white transition-colors">{label}</span>
        </button>
    )
}

function DnaTag({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-[8px] font-bold text-zinc-600 uppercase mb-1 tracking-widest">{label}</p>
            <p className="text-sm font-bold text-white truncate uppercase tracking-tight">{value}</p>
        </div>
    )
}

function DataMetric({ label, value, icon: Icon, color }: any) {
  const colorClasses: any = {
      blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
      green: "text-green-500 bg-green-500/10 border-green-500/20",
      orange: "text-orange-500 bg-orange-500/10 border-orange-500/20"
  };

  return (
      <div className="space-y-3">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border", colorClasses[color])}>
              <Icon className="h-5 w-5" />
          </div>
          <div>
              <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest leading-none mb-1.5">{label}</p>
              <p className="text-lg font-bold text-white leading-none tracking-tight uppercase">{value}</p>
          </div>
      </div>
  )
}
