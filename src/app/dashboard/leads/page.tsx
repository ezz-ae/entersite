'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Target, 
  Users, 
  MessageCircle, 
  Phone, 
  Mail, 
  ArrowUpRight, 
  MoreHorizontal, 
  Filter,
  Download,
  Plus,
  Zap,
  CheckCircle2,
  Clock,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { formatDistanceToNow } from 'date-fns';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

interface LeadRecord {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  status?: string;
  source?: string;
  project?: string;
  createdAt?: string;
}

export default function LeadCrmPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, authLoading] = useAuthState(getAuth());

  const loadLeads = useCallback(async () => {
    if (!user) return;
    try {
      setError(null);
      setLoading(true);
      const token = await user.getIdToken();
      const params = new URLSearchParams({
        tenantId: user.uid,
        limit: '20',
      });
      const res = await fetch(`/api/leads/list?${params.toString()}`, {
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data.data || []);
      } else {
        setLeads([]);
        setError(res.status === 403 ? 'You are not authorized to read this tenant.' : 'Failed to load leads.');
      }
    } catch (fetchError) {
      console.error('Failed to load leads', fetchError);
      setLeads([]);
      setError('Failed to load leads.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }
    if (!user) {
      setLeads([]);
      setLoading(false);
      setError('Sign in to view lead intelligence.');
      return;
    }
    loadLeads();
  }, [authLoading, loadLeads, user]);

  const now = Date.now();
  const newIn24h = leads.filter((lead) => {
    if (!lead.createdAt) return false;
    const timestamp = Date.parse(lead.createdAt);
    return !Number.isNaN(timestamp) && now - timestamp <= 24 * 60 * 60 * 1000;
  }).length;
  const hotLeads = leads.filter((lead) => (lead.status || '').toLowerCase() === 'hot').length;
  const qualifiedLeads = leads.filter((lead) => (lead.status || '').toLowerCase() === 'qualified').length;
  const isAuthenticated = Boolean(user);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-white/5 pb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white uppercase">Lead Intelligence</h1>
          <p className="text-zinc-500 text-xl font-light">Manage and score every investor lead from all channels.</p>
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
            <Button variant="outline" className="flex-1 lg:flex-none h-12 rounded-full border-white/10 bg-white/5 text-zinc-400 font-bold gap-2">
                <Download className="h-4 w-4" /> Export CSV
            </Button>
            <Button className="flex-1 lg:flex-none h-12 rounded-full bg-blue-600 hover:bg-blue-700 font-bold gap-2">
                <Plus className="h-4 w-4" /> Add Lead
            </Button>
        </div>
      </div>

      {isAuthenticated ? (
        <>
        {/* Stats Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard label="Total Leads" value={leads.length.toString()} trend={leads.length ? `+${newIn24h} today` : undefined} icon={Users} />
            <MetricCard label="New (24h)" value={newIn24h.toString()} icon={Zap} />
            <MetricCard label="Qualified" value={qualifiedLeads.toString()} icon={Target} />
            <MetricCard label="WhatsApp Sync" value="Live" icon={MessageCircle} active />
        </div>

        {/* Main CRM View */}
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Leads Table */}
          <Card className="lg:col-span-2 bg-zinc-950 border-white/5 rounded-[2.5rem] overflow-hidden">
             <CardHeader className="p-10 border-b border-white/5 bg-zinc-900/30 flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-xl">Incoming Activity</CardTitle>
                    <CardDescription>Real-time lead feed from your OS.</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white bg-white/5 rounded-xl"><Filter className="h-4 w-4" /></Button>
             </CardHeader>
             <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                    {loading ? (
                        <div className="p-10 flex items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                        </div>
                    ) : error ? (
                        <div className="p-10 text-center text-red-400 text-sm">
                            {error}
                        </div>
                    ) : leads.length === 0 ? (
                        <div className="p-10 text-center text-zinc-500 text-sm">
                            No leads captured yet. Connect a form or run a campaign to see activity here.
                        </div>
                    ) : (
                    leads.map(lead => (
                        <div key={lead.id} className="p-8 flex items-center justify-between group hover:bg-white/5 transition-all">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 text-blue-500 font-bold text-xl">
                                    {lead.name?.charAt(0) || '?'}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-white text-lg leading-none">{lead.name || 'Unnamed Lead'}</h4>
                                    <div className="flex items-center gap-3 text-xs text-zinc-500 uppercase tracking-widest font-bold">
                                        <span className="text-blue-500">{lead.source || 'Web'}</span>
                                        <div className="w-1 h-1 rounded-full bg-zinc-800" />
                                        <span>{lead.project || 'General Inquiry'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-10">
                                <div className="text-right hidden sm:block">
                                    <Badge className={cn(
                                        "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-0",
                                        (lead.status || '').toLowerCase() === 'hot' ? "bg-orange-500 text-white" : "bg-zinc-800 text-zinc-400"
                                    )}>
                                        {(lead.status || 'New').toUpperCase()}
                                    </Badge>
                                    <p className="text-[10px] text-zinc-600 font-bold mt-2 flex items-center justify-end gap-1.5 uppercase">
                                        <Clock className="h-3 w-3" /> {lead.createdAt ? formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true }) : 'Just now'}
                                    </p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full border border-white/5 bg-white/5 opacity-0 group-hover:opacity-100 transition-all text-zinc-400 hover:text-white hover:bg-blue-600 hover:border-blue-600">
                                    <MessageCircle className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    )))}
                </div>
                <div className="p-6 text-center border-t border-white/5 bg-zinc-900/20">
                    <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 hover:text-white transition-all">View All Intelligence Clusters</button>
                </div>
             </CardContent>
          </Card>

          {/* CRM Connection Panel */}
          <div className="space-y-6">
             <Card className="bg-blue-600 border-none text-white rounded-[2.5rem] overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Zap className="h-40 w-40" />
                </div>
                <CardHeader className="relative z-10 p-10 pb-6">
                    <CardTitle className="text-2xl font-black leading-tight uppercase">Direct WhatsApp <br/>Syncing</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 p-10 pt-0 space-y-8">
                    <p className="text-blue-100 font-medium">Route every new lead directly to your phone in under 2 seconds.</p>
                    <Button className="w-full h-14 rounded-2xl bg-white text-blue-600 font-black text-lg hover:bg-zinc-100 shadow-xl">
                        Connect Phone
                    </Button>
                </CardContent>
             </Card>

             <Card className="bg-zinc-950 border-white/5 rounded-[2.5rem] p-10 space-y-8">
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">External CRM Bridge</h4>
                <div className="space-y-4">
                    <CrmButton name="HubSpot" active={false} />
                    <CrmButton name="Salesforce" active={false} />
                    <CrmButton name="Bitrix24" active={true} />
                </div>
                <Separator className="bg-white/5" />
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-500"><Plus className="h-5 w-5" /></div>
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Connect Webhook</span>
                </div>
             </Card>
          </div>

        </div>
        </>
      ) : (
        <AuthRequiredNotice isLoading={authLoading} message={error} />
      )}
    </div>
  );
}

function CrmButton({ name, active }: any) {
    return (
        <div className={cn(
            "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group",
            active ? "bg-green-500/5 border-green-500/20" : "bg-white/5 border-white/5 hover:border-blue-500/30"
        )}>
            <span className={cn("text-sm font-bold", active ? "text-green-500" : "text-zinc-500 group-hover:text-zinc-300")}>{name}</span>
            {active ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <ChevronRight className="h-4 w-4 text-zinc-800" />}
        </div>
    )
}

function MetricCard({ label, value, trend, icon: Icon, active }: any) {
    return (
        <Card className="bg-zinc-900/50 border-white/5 rounded-[2rem]">
            <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none">{label}</p>
                    <Icon className={cn("h-4 w-4", active ? "text-blue-500" : "text-zinc-700")} />
                </div>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-white leading-none">{value}</span>
                    {trend && <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">{trend}</span>}
                </div>
            </CardContent>
        </Card>
    )
}

function AuthRequiredNotice({ isLoading, message }: { isLoading: boolean; message: string | null }) {
    return (
        <Card className="bg-zinc-950 border-dashed border-white/10 rounded-[2.5rem] p-12 text-center space-y-6">
            <CardHeader className="space-y-4">
                <CardTitle className="text-3xl font-black uppercase tracking-tight text-white">
                    {isLoading ? 'Verifying Access' : 'Authentication Required'}
                </CardTitle>
                <CardDescription className="text-zinc-500 text-base">
                    {isLoading ? 'Checking your session to unlock live CRM telemetry.' : (message || "Sign in to synchronize your tenant's CRM feed.")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center">
                    <Button
                        variant="outline"
                        className="h-12 px-10 rounded-full border-white/10 bg-white/5 text-zinc-300 hover:text-white"
                        onClick={() => window.location.assign('/login')}
                    >
                        Return to Dashboard Login
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
