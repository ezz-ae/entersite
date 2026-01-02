'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Terminal, 
  Loader2, 
  Sparkles, 
  Zap, 
  Globe, 
  ArrowRight,
  Command as CommandIcon,
  Plus,
  Activity,
  ChevronRight,
  Check,
  Building2,
  MapPin,
  Upload,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList 
} from "@/components/ui/command";
import { Badge } from '@/components/ui/badge';
import { ProjectDiscoveryClient } from '@/components/marketing/project-discovery-client';
import type { ProjectData } from '@/lib/types';

interface SiteClientProps {
  initialProjects: ProjectData[];
}

export function SiteClient({ initialProjects }: SiteClientProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [isExecuting, setIsExecuting] = useState(false);
  const [executingCommand, setExecutingCommand] = useState('');
  const [city, setCity] = useState('Dubai');

  // Command Shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = async (name: string, action: () => void) => {
      setOpen(false);
      setExecutingCommand(name);
      setIsExecuting(true);
      
      // Simulate Synthesis Latency
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      action();
      setIsExecuting(false);
      
      toast({
          title: "Service Started",
          description: `"${name}" is being prepared.`,
      });
  };

  const QUICK_COMMANDS = [
      { 
          group: "Project Catalog",
          items: initialProjects.map(p => ({
              label: `Build website for ${p.name}`,
              icon: Building2,
              action: () => router.push(`/builder?projectId=${p.id}`)
          }))
      },
      {
          group: "Quick Actions",
          items: [
              { label: "Upload New Project Brochure", icon: Upload, action: () => router.push('/builder?method=upload') },
              { label: "Search Market Data", icon: Activity, action: () => router.push('/discover') },
              { label: "Launch Marketing Campaign", icon: Zap, action: () => router.push('/dashboard/marketing') },
          ]
      }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      
      {/* Processing State */}
      <AnimatePresence>
          {isExecuting && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center"
              >
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse" />
                    <Loader2 className="h-20 w-20 text-blue-500 animate-spin relative z-10" />
                  </div>
                  <h2 className="text-4xl font-bold tracking-tight text-white uppercase mb-4">Building Service</h2>
                  <p className="text-blue-500 font-bold text-sm uppercase tracking-widest animate-pulse">{executingCommand}</p>
                  
                  <div className="mt-12 w-80 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        className="h-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.6)]"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.5 }}
                      />
                  </div>
                  <p className="mt-8 text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Assembling content and assets...</p>
              </motion.div>
          )}
      </AnimatePresence>

      {/* 1. Header & Search Hub */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/5 bg-zinc-950/20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto text-center mb-16 space-y-8">
                <Badge className="bg-blue-600/10 text-blue-400 border-blue-500/20 py-1.5 px-6 rounded-full uppercase text-[10px] font-bold tracking-widest animate-in fade-in slide-in-from-top-4 duration-700">
                    <Sparkles className="h-3.5 w-3.5 mr-2" /> AI Builder Live
                </Badge>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.85] uppercase animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    Build and <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600">Launch.</span>
                </h1>
                <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed">
                    The fastest way to create high-end real estate marketing. Choose a project or upload a brochure to get started.
                </p>
            </div>

            {/* THE COMMAND CENTER */}
            <div className="max-w-4xl mx-auto group relative animate-in zoom-in-95 duration-1000">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div 
                    onClick={() => setOpen(true)}
                    className="relative bg-zinc-900/60 border border-white/10 backdrop-blur-3xl p-12 rounded-[3.5rem] cursor-pointer hover:border-blue-500/40 transition-all shadow-2xl overflow-hidden"
                >
                    <div className="flex items-center gap-6 mb-10">
                        <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 shadow-lg">
                            <CommandIcon className="h-8 w-8 text-blue-500" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold uppercase tracking-tight">Project Search</h2>
                            <p className="text-zinc-500 font-bold text-sm tracking-wide uppercase">Institutional Catalog v2.0</p>
                        </div>
                    </div>
                    
                    <div className="bg-black/60 border border-white/5 h-20 rounded-2xl flex items-center px-8 gap-5 text-zinc-500 text-xl font-medium group-hover:bg-black/80 transition-all">
                        <Search className="h-6 w-6 text-blue-500" />
                        <span className="flex-1 opacity-60">Try "Build site for {initialProjects[0]?.name || 'Marina Horizon'}"...</span>
                        <div className="hidden sm:flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 mr-2">Shortcut</span>
                            <kbd className="pointer-events-none inline-flex h-10 select-none items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 font-mono text-sm font-bold text-white shadow-xl">
                                <span className="text-lg">⌘</span>K
                            </kbd>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                        {initialProjects.slice(0, 3).map((p, i) => (
                            <button 
                                key={p.id} 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    runCommand(`Build Site: ${p.name}`, () => router.push(`/builder?projectId=${p.id}`));
                                }}
                                className="px-6 py-3 rounded-full bg-white/5 border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/5 text-[10px] font-bold uppercase tracking-widest transition-all text-zinc-400 hover:text-white"
                            >
                                Launch {p.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 2. Trending Projects Browser */}
      <section className="py-24" id="browse">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Live Inventory</p>
                    </div>
                    <h2 className="text-5xl font-bold uppercase tracking-tight">Trending in {city}</h2>
                </div>
                
                <Link href="/builder?method=upload">
                    <Button variant="outline" className="h-16 px-8 rounded-2xl border-white/10 bg-white/5 text-zinc-300 font-bold uppercase tracking-widest gap-3 hover:bg-white hover:text-black transition-all">
                        <Upload className="h-5 w-5" /> Upload Brochure
                    </Button>
                </Link>
            </div>
            
            <ProjectDiscoveryClient initialProjects={initialProjects} />
        </div>
      </section>

      {/* Command Dialog Logic */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="bg-zinc-950 border border-white/10 text-white rounded-[2.5rem] overflow-hidden shadow-2xl">
            <CommandInput 
                placeholder="Search for a project..." 
                className="text-white h-16 border-b border-white/10 font-bold" 
            />
            <CommandList className="custom-scrollbar bg-zinc-950/50 max-h-[500px] p-4">
                <CommandEmpty className="p-12 text-center text-zinc-500">
                    <p className="text-lg font-bold mb-2">No results found</p>
                    <p className="text-sm font-medium">Try a different project name or developer.</p>
                </CommandEmpty>
                
                {QUICK_COMMANDS.map((group) => (
                    <CommandGroup 
                        key={group.group} 
                        heading={group.group} 
                        className="text-zinc-600 font-bold uppercase text-[10px] tracking-widest p-4 pb-2"
                    >
                        {group.items.map((item) => (
                            <CommandItem 
                                key={item.label}
                                onSelect={() => runCommand(item.label, item.action)}
                                className="flex items-center gap-5 p-4 rounded-2xl cursor-pointer aria-selected:bg-blue-600 aria-selected:text-white transition-all group my-1 border border-transparent"
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-aria-selected:bg-white/20 transition-all border border-white/5">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-lg font-bold uppercase tracking-tight">{item.label}</p>
                                    <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest">Execute Action</p>
                                </div>
                                <ChevronRight className="ml-auto h-5 w-5 opacity-20 group-aria-selected:opacity-100 transition-all" />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                ))}
            </CommandList>
            <div className="p-4 border-t border-white/5 bg-black/40 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                <div className="flex gap-4">
                    <span><kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 mr-1">↵</kbd> Select</span>
                    <span><kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 mr-1">↑↓</kbd> Navigate</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    System Active
                </div>
            </div>
        </div>
      </CommandDialog>
    </div>
  );
}
