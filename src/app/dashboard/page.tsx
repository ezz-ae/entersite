'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Zap, 
  Rocket, 
  Megaphone, 
  Users, 
  Bot, 
  Search, 
  Activity, 
  ChevronRight, 
  Loader2,
  CheckCircle2,
  Layout,
  ShieldCheck,
  BarChart3,
  Target,
  X,
  Plus,
  Mail,
  Smartphone,
  MapPin,
  MessageSquare,
  ArrowRight // Added ArrowRight import
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { getDashboardStats } from '@/lib/dashboard-service';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ProjectCard } from '@/components/project-card';
import { ENTRESTATE_INVENTORY } from '@/data/entrestate-inventory';
import { ProjectData } from '@/lib/types';

export default function DashboardOverviewPage() {
  const [user, loadingAuth] = useAuthState(getAuth());
  const [stats, setStats] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>(ENTRESTATE_INVENTORY.slice(0, 3));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function loadStats() {
        const data = await getDashboardStats(user?.uid);
        setStats(data);
    }
    
    if (!loadingAuth) {
        loadStats();
    }
  }, [user, loadingAuth]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
        setFilteredProjects(ENTRESTATE_INVENTORY.slice(0, 3));
        return;
    }
    const query = searchQuery.toLowerCase();
    const results = ENTRESTATE_INVENTORY.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.location?.area?.toLowerCase().includes(query) ||
        p.developer?.toLowerCase().includes(query)
    ).slice(0, 3);
    setFilteredProjects(results);
  }, [searchQuery]);

  if (!isMounted) return null;

  if (loadingAuth || !stats) return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-6">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-widest">Synchronizing Dashboard...</p>
      </div>
  );

  return (
    <div className="space-y-16 pb-24 animate-in fade-in duration-700">
      
      {/* 1. Header & Quick Actions */}
      <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold tracking-tight text-white">Command Center</h1>
                    <p className="text-zinc-500 font-medium">Find projects, build sites, and launch campaigns.</p>
                </div>
                <div className="flex items-center gap-4">
                     <Link href="/builder?method=upload">
                        <Button className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold gap-3 shadow-lg">
                            <Plus className="h-4 w-4" /> New Project
                        </Button>
                     </Link>
                </div>
            </div>

            <div className="relative">
                <div className="relative bg-zinc-900 border border-white/10 rounded-2xl flex items-center shadow-2xl focus-within:border-blue-500/40 transition-all p-1">
                    <div className="px-5">
                        <Search className="h-5 w-5 text-zinc-500" />
                    </div>
                    <Input 
                        placeholder="Search any project, area, or developer in Dubai..." 
                        className="bg-transparent border-none focus-visible:ring-0 text-lg font-medium h-14 w-full placeholder:text-zinc-700"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="p-3 hover:bg-white/5 rounded-full text-zinc-500 transition-colors mr-2"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
      </div>

      {/* 2. Results / Recommendations Section */}
      <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                  {searchQuery ? `Search Results` : 'Live Market Feed'}
              </h2>
              <Link href="/discover" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
                  Market Library <ChevronRight className="h-3 w-3" />
              </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.length > 0 ? (
                  filteredProjects.map((p, i) => (
                      <ProjectCard key={p.id} project={p} index={i} />
                  ))
              ) : (
                  <div className="col-span-full py-20 text-center space-y-4 bg-zinc-900/30 border border-white/5 border-dashed rounded-[2rem]">
                      <Search className="h-12 w-12 text-zinc-800 mx-auto" />
                      <p className="text-zinc-500 font-medium italic">No results found for "{searchQuery}"</p>
                  </div>
              )}
          </div>
      </div>

      {/* 3. CORE SERVICE NODES (Smart Cards) */}
      <div className="space-y-6">
          <h2 className="text-xl font-bold text-white uppercase tracking-tight px-2">Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Marketing Suite */}
              <ServiceCard 
                  label="Marketing Hub" 
                  icon={Megaphone} 
                  desc="Google & Meta Ads"
                  href="/dashboard/marketing"
                  color="blue"
                  badges={["Search", "Social", "SEO"]}
              />
              
              {/* Communication Suite */}
              <ServiceCard 
                  label="Chat Experts" 
                  icon={MessageSquare} 
                  desc="24/7 Sales AI"
                  href="/dashboard/chat-agent"
                  color="indigo"
                  badges={["WhatsApp", "Web", "SMS"]}
              />

              {/* Site Builder */}
              <ServiceCard 
                  label="Site Assets" 
                  icon={Layout} 
                  desc="Landing Pages"
                  href="/dashboard/sites"
                  color="pink"
                  badges={["Builder", "Domains", "Hosting"]}
              />

              {/* Lead Management */}
              <ServiceCard 
                  label="Lead CRM" 
                  icon={Users} 
                  desc="Client Pipeline"
                  href="/dashboard/leads"
                  color="emerald"
                  badges={["Sync", "Export", "Analytics"]}
              />

              {/* Google Business */}
              <ServiceCard 
                  label="Google Business" 
                  icon={MapPin} 
                  desc="Local SEO & Reviews"
                  href="/dashboard/marketing?tab=seo"
                  color="orange"
                  badges={["Maps", "Reviews"]}
              />

               {/* Domain Manager */}
               <ServiceCard 
                  label="Domains" 
                  icon={Globe} 
                  desc="Custom URLs"
                  href="/dashboard/settings"
                  color="cyan"
                  badges={["DNS", "SSL"]}
              />

              {/* Messaging */}
              <ServiceCard 
                  label="Messaging" 
                  icon={Smartphone} 
                  desc="SMS & Email"
                  href="/dashboard/sms-marketing"
                  color="purple"
                  badges={["Broadcast", "Drip"]}
              />
              
               {/* Market Data */}
               <ServiceCard 
                  label="Market Data" 
                  icon={Activity} 
                  desc="3,750+ Projects"
                  href="/discover"
                  color="red"
                  badges={["ROI", "Trends"]}
              />

          </div>
      </div>

    </div>
  );
}

function ServiceCard({ label, icon: Icon, desc, href, color, badges = [] }: any) {
    const colorClasses: any = {
        blue: "bg-blue-600/10 text-blue-500 group-hover:border-blue-500/30",
        indigo: "bg-indigo-600/10 text-indigo-500 group-hover:border-indigo-500/30",
        pink: "bg-pink-600/10 text-pink-500 group-hover:border-pink-500/30",
        emerald: "bg-emerald-600/10 text-emerald-500 group-hover:border-emerald-500/30",
        orange: "bg-orange-600/10 text-orange-500 group-hover:border-orange-500/30",
        cyan: "bg-cyan-600/10 text-cyan-500 group-hover:border-cyan-500/30",
        purple: "bg-purple-600/10 text-purple-500 group-hover:border-purple-500/30",
        red: "bg-red-600/10 text-red-500 group-hover:border-red-500/30",
    };

    return (
        <Link href={href}>
            <Card className={cn(
                "bg-zinc-900/40 border-white/5 rounded-[2rem] h-full transition-all group p-6 shadow-sm border hover:bg-zinc-900",
                colorClasses[color]
            )}>
                <div className="flex justify-between items-start mb-6">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all", colorClasses[color].split(" ")[0] + " " + colorClasses[color].split(" ")[1])}>
                        <Icon className="h-6 w-6" />
                    </div>
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-white" />
                    </div>
                </div>
                
                <div className="space-y-3">
                    <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors tracking-tight">{label}</h3>
                        <p className="text-sm text-zinc-500 font-medium">{desc}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                        {badges.map((b: string) => (
                            <Badge key={b} variant="secondary" className="bg-white/5 hover:bg-white/10 text-zinc-400 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 h-5 border-none">
                                {b}
                            </Badge>
                        ))}
                    </div>
                </div>
            </Card>
        </Link>
    )
}
