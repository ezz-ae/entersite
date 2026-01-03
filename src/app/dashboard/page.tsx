'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Megaphone, 
  Zap, 
  TrendingUp, 
  Plus, 
  ArrowRight, 
  MessageSquare,
  BarChart3,
  MousePointerClick,
  Target,
  Bot,
  Search,
  Instagram,
  Users,
  Terminal,
  Command as CommandIcon,
  Sparkles,
  Play,
  Mail,
  Share2,
  Calendar,
  Layers,
  Activity,
  ChevronRight,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { getDashboardStats } from '@/lib/dashboard-service';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function DashboardOverviewPage() {
  const [user] = useAuthState(getAuth());
  const [stats, setStats] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [isExecuting, setIsExecuting] = useState(false);
  const [executingCommand, setExecutingCommand] = useState('');

  useEffect(() => {
    async function loadStats() {
        const data = await getDashboardStats(user?.uid);
        setStats(data);
    }
    loadStats();
  }, [user]);

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
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      action();
      setIsExecuting(false);
      
      toast({
          title: "Command Executed",
          description: `\${name} successfully processed by AI OS.`,
      });
  };

  const COMMANDS = [
      { 
          group: "Quick Actions",
          items: [
              { label: "Build New Landing Page", icon: Globe, action: () => router.push('/builder') },
              { label: "Scan Project Brochure", icon: Layers, action: () => router.push('/builder?method=brochure') },
              { label: "Analyze Market Trends", icon: TrendingUp, action: () => router.push('/discover') },
          ]
      },
      {
          group: "Marketing Automations",
          items: [
              { label: "Run Launch Email Campaign", icon: Mail, action: () => router.push('/dashboard/email-marketing') },
              { label: "Sync Meta Lookalike Audience", icon: Users, action: () => router.push('/dashboard/meta-audience') },
              { label: "Deploy Google Ads Strategy", icon: Target, action: () => router.push('/dashboard/google-ads') },
          ]
      },
      {
          group: "Intelligence",
          items: [
              { label: "Configure Sales Agent", icon: Bot, action: () => router.push('/dashboard/chat-agent') },
              { label: "Generate ROI Report", icon: BarChart3, action: () => router.push('/dashboard/marketing') },
          ]
      }
  ];

  if (!stats) return (
      <div className="h-96 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
  );

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-700">
      
      {/* 1. Header with Stats Summary */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2 italic uppercase">System OS</h1>
          <p className="text-lg text-zinc-500 font-light">
            Infrastructure active. <span className="text-white font-medium">{stats.userSites} builds</span> deployed. <span className="text-green-500 font-medium">{stats.newLeads} leads</span> synced.
          </p>
        </div>
        <div className="flex gap-3">
             <Button 
                onClick={() => setOpen(true)}
                className="h-14 px-8 rounded-2xl bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-white gap-3 font-bold text-lg shadow-2xl"
             >
                <Terminal className="h-5 w-5 text-blue-500" />
                <span className="opacity-60">Press</span> 
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-white/5 px-1.5 font-mono text-[10px] font-medium text-white opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
             </Button>
             <Link href="/builder">
                <Button className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 gap-3 font-bold text-lg">
                    <Plus className="h-5 w-5" /> Deep Build
                </Button>
            </Link>
        </div>
      </div>

      {/* Execution Overlay */}
      <AnimatePresence>
          {isExecuting && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center"
              >
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse" />
                    <Loader2 className="h-20 w-20 text-blue-500 animate-spin relative z-10" />
                  </div>
                  <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic mb-2">Executing Command</h2>
                  <p className="text-blue-500 font-mono text-sm uppercase tracking-[0.3em] animate-pulse">{executingCommand}</p>
                  
                  <div className="mt-12 w-64 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-blue-600"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2 }}
                      />
                  </div>
              </motion.div>
          )}
      </AnimatePresence>

      {/* 2. COMMAND CENTER - SEARCH FIRST */}
      <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition-all duration-1000" />
          <div 
            onClick={() => setOpen(true)}
            className="relative bg-zinc-900/50 border border-white/10 backdrop-blur-3xl p-10 rounded-[3rem] cursor-pointer hover:border-blue-500/40 transition-all"
          >
              <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
                      <CommandIcon className="h-8 w-8 text-blue-500" />
                  </div>
                  <div>
                      <h2 className="text-3xl font-bold text-white tracking-tight">System Terminal</h2>
                      <p className="text-zinc-500 font-medium">Global command interface for all Entrestate infrastructure.</p>
                  </div>
              </div>
              
              <div className="bg-black/40 border border-white/5 h-20 rounded-2xl flex items-center px-8 gap-4 text-zinc-500 text-xl font-light">
                  <Search className="h-6 w-6" />
                  <span>Start typing a command... (e.g. "Run launching email campaign")</span>
                  <div className="ml-auto flex items-center gap-2">
                       <kbd className="pointer-events-none inline-flex h-8 select-none items-center gap-1 rounded-lg border bg-white/5 px-2.5 font-mono text-sm font-medium text-white opacity-100">
                           <span className="text-lg">⌘</span>K
                       </kbd>
                  </div>
              </div>
          </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="bg-zinc-950 border-white/10 text-white rounded-3xl overflow-hidden">
            <CommandInput placeholder="Type a command or search..." className="text-white" />
            <CommandList className="custom-scrollbar bg-zinc-950">
            <CommandEmpty>No results found.</CommandEmpty>
            {COMMANDS.map((group) => (
                <CommandGroup key={group.group} heading={group.group} className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest p-4">
                    {group.items.map((item) => (
                        <CommandItem 
                            key={item.label}
                            onSelect={() => runCommand(item.label, item.action)}
                            className="flex items-center gap-4 p-4 rounded-xl cursor-pointer aria-selected:bg-blue-600 aria-selected:text-white transition-all group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-aria-selected:bg-white/20 transition-all">
                                <item.icon className="h-5 w-5" />
                            </div>
                            <span className="text-base font-bold">{item.label}</span>
                            <ChevronRight className="ml-auto h-4 w-4 opacity-40" />
                        </CommandItem>
                    ))}
                </CommandGroup>
            ))}
            </CommandList>
        </div>
      </CommandDialog>

      {/* 3. WORKFLOW DESIGNER - THE NEXT LEVEL */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-600/10 flex items-center justify-center border border-orange-500/20">
                <Activity className="h-4 w-4 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white uppercase italic">Active Workflows</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <WorkflowCard 
                title="Launch Sequence"
                description="End-to-end campaign deployment."
                steps={[
                    { label: "Build Landing Page", status: 'done', icon: Globe },
                    { label: "Analyze Target Audience", status: 'done', icon: Users },
                    { label: "Run Google Search Campaign", status: 'running', icon: Target },
                    { label: "Trigger Email Sequence", status: 'pending', icon: Mail },
                ]}
            />
            <WorkflowCard 
                title="Lead Nurture AI"
                description="Automated sales interaction pipeline."
                steps={[
                    { label: "Capture Web Inquiry", status: 'done', icon: Target },
                    { label: "Trigger Instagram DM Bot", status: 'done', icon: Instagram },
                    { label: "Score Lead with AI", status: 'done', icon: BarChart3 },
                    { label: "Sync to Private WhatsApp", status: 'done', icon: MessageSquare },
                ]}
            />
        </div>
      </div>

      {/* 4. PERFORMANCE PULSE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard label="System Health" value={stats.systemHealth} icon={Zap} trend="Optimized" />
          <MetricCard label="Lead Conversion" value="4.8%" icon={BarChart3} trend="+1.2%" />
          <MetricCard label="Ad Spend Efficiency" value={stats.aiEfficiency} icon={Target} trend="High" />
          <MetricCard label="AI Interactions" value="1,240" icon={Bot} trend="+240" />
      </div>
    </div>
  );
}

function WorkflowCard({ title, description, steps }: any) {
    return (
        <Card className="border-white/5 bg-zinc-900/30 rounded-[2.5rem] overflow-hidden group hover:border-blue-500/20 transition-all">
            <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
                <CardDescription className="text-zinc-500 font-medium">{description}</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
                <div className="space-y-4 relative">
                    {/* Connecting Line */}
                    <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-white/5" />
                    
                    {steps.map((step: any, i: number) => (
                        <div key={i} className="flex items-center gap-6 relative z-10">
                            <div className={cn(
                                "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all",
                                step.status === 'done' ? "bg-green-600 border-green-500 text-white" :
                                step.status === 'running' ? "bg-blue-600 border-blue-500 text-white animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]" :
                                "bg-zinc-800 border-zinc-700 text-zinc-500"
                            )}>
                                <step.icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                                <p className={cn(
                                    "text-sm font-bold transition-all",
                                    step.status === 'pending' ? "text-zinc-500" : "text-white"
                                )}>{step.label}</p>
                                {step.status === 'running' && <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest animate-pulse">Processing...</span>}
                            </div>
                            {step.status === 'done' && (
                                <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <Check className="h-3 w-3 text-green-500" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                
                <div className="mt-10 flex gap-3">
                    <Button variant="outline" className="flex-1 rounded-xl border-white/5 bg-white/5 text-zinc-400 font-bold text-xs uppercase tracking-widest h-11">View Logs</Button>
                    <Button className="flex-1 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-widest h-11">Modify Flow</Button>
                </div>
            </CardContent>
        </Card>
    )
}

function MetricCard({ label, value, icon: Icon, trend, positive = true }: any) {
    return (
        <Card className="border-white/5 bg-zinc-900/30 rounded-[2rem]">
            <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none">{label}</p>
                    <Icon className="h-4 w-4 text-zinc-700" />
                </div>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-white">{value}</span>
                    <span className={cn(
                        "text-[10px] font-bold mb-1.5 px-2 py-0.5 rounded-full",
                        positive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    )}>{trend}</span>
                </div>
            </CardContent>
        </Card>
    )
}

function Check(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
