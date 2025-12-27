'use client';

import React, { useEffect, useState } from 'react';
import { subscribeToJobs, createJob, processJob, Job } from '@/lib/jobs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RefreshCw, Play, Terminal, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { cn } from '@/lib/utils';

export default function JobsDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(getAuth());

  useEffect(() => {
    const unsubscribe = subscribeToJobs((data) => {
        setJobs(data);
        setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleCreateTestJob = async () => {
    if (!user) return;
    const newJob = await createJob(user.uid, 'site_generation', { prompt: 'Luxury Villa' });
    processJob(newJob.id as string);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white">Infrastructure Logs</h1>
            <p className="text-zinc-500 text-lg font-light">Monitor real-time AI workload and system orchestration.</p>
          </div>
          <div className="flex gap-3">
            <Button 
                onClick={handleCreateTestJob}
                className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold text-lg shadow-xl shadow-blue-600/20"
            >
              <Play className="h-5 w-5 mr-2" />
              Trigger System Test
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard label="Active Nodes" value={jobs.filter(j => j.status === 'running').length.toString()} icon={RefreshCw} color="blue" />
            <StatsCard label="Queue Depth" value={jobs.filter(j => j.status === 'queued').length.toString()} icon={Terminal} color="zinc" />
            <StatsCard label="Completed" value={jobs.filter(j => j.status === 'done').length.toString()} icon={CheckCircle2} color="green" />
            <StatsCard label="System Faults" value={jobs.filter(j => j.status === 'error').length.toString()} icon={AlertCircle} color="red" />
        </div>

        <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-2xl">
            <CardHeader className="p-8 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center">
                        <Terminal className="h-5 w-5 text-blue-500" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white">Execution Pipeline</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest px-8">Process ID</TableHead>
                            <TableHead className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Orchestrator</TableHead>
                            <TableHead className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Status</TableHead>
                            <TableHead className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Progress</TableHead>
                            <TableHead className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest text-right px-8">Timestamp</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-40 text-center">
                                    <Loader2 className="h-8 w-8 text-blue-500 animate-spin mx-auto" />
                                </TableCell>
                            </TableRow>
                        ) : jobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-40 text-zinc-500 font-light text-lg">
                                    No active processes in pipeline.
                                </TableCell>
                            </TableRow>
                        ) : (
                            jobs.map((job) => (
                                <TableRow key={job.id} className="border-white/5 hover:bg-white/5 transition-colors">
                                    <TableCell className="font-mono text-xs text-blue-500 px-8"># {job.id.slice(0, 12)}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm text-white capitalize">{job.type.replace('_', ' ')}</span>
                                            <span className="text-[10px] text-zinc-600 font-mono italic">{job.plan.flowId}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge status={job.status} />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div 
                                                    className={cn(
                                                        "h-full transition-all duration-1000",
                                                        job.status === 'done' ? "bg-green-500 w-full" : 
                                                        job.status === 'running' ? "bg-blue-500 w-1/2 animate-pulse" : 
                                                        "bg-zinc-700 w-0"
                                                    )}
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold text-zinc-500">{job.steps?.length || 0}/{job.plan.steps.length}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-zinc-500 text-xs text-right px-8 font-mono">
                                        {job.createdAt ? formatDistanceToNow(job.createdAt.toDate(), { addSuffix: true }) : 'Now'}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

      </div>
    </main>
  );
}

function StatsCard({ label, value, icon: Icon, color }: any) {
    const colors: any = {
        blue: "text-blue-500 bg-blue-500/10",
        zinc: "text-zinc-500 bg-zinc-500/10",
        green: "text-green-500 bg-green-500/10",
        red: "text-red-500 bg-red-500/10"
    };

    return (
        <Card className="border-white/5 bg-zinc-900/30 rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{label}</p>
                <div className={cn("p-2 rounded-lg", colors[color])}>
                    <Icon className="h-4 w-4" />
                </div>
            </div>
            <p className="text-3xl font-black text-white">{value}</p>
        </Card>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles = {
        queued: "bg-zinc-900 text-zinc-500 border-zinc-800",
        running: "bg-blue-600/10 text-blue-500 border-blue-500/20 animate-pulse",
        done: "bg-green-600/10 text-green-500 border-green-500/20",
        error: "bg-red-600/10 text-red-500 border-red-500/20",
    };
    return (
        <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border", styles[status as keyof typeof styles])}>
            {status}
        </span>
    )
}
