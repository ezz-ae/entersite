'use client';

import React, { useEffect, useState } from 'react';
import { getJobs, createJob, processJob, Job } from '@/lib/jobs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RefreshCw, Play, Terminal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function JobsDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    const data = await getJobs();
    setJobs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCreateTestJob = async () => {
    const newJob = await createJob('test-user-1', 'site_generation', { prompt: 'Luxury Villa' });
    // Simulate the backend picking it up
    processJob(newJob.id as string);
    fetchJobs();
  };

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Orchestrator</h1>
            <p className="text-muted-foreground">Monitor and manage background AI workflows.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchJobs} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={handleCreateTestJob}>
              <Play className="h-4 w-4 mr-2" />
              Trigger Test Job
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{jobs.length}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Processing</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-yellow-500">
                        {jobs.filter(j => j.status === 'running').length}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-500">100%</div>
                </CardContent>
            </Card>
        </div>

        <Card className="border-0 shadow-md">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Terminal className="h-5 w-5" />
                    <CardTitle>Live Job Queue</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Job ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Steps Completed</TableHead>
                            <TableHead>Created</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                    No jobs found. Start a new workflow.
                                </TableCell>
                            </TableRow>
                        ) : (
                            jobs.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell className="font-mono text-xs">{job.id.slice(0, 8)}...</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{job.type}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge status={job.status} />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <span className="font-medium">{job.steps?.length || 0}</span>
                                            <span className="text-muted-foreground">/ {job.plan?.steps?.length || 4}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {job.createdAt ? formatDistanceToNow(job.createdAt.toDate(), { addSuffix: true }) : '-'}
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

function StatusBadge({ status }: { status: string }) {
    const styles = {
        queued: "bg-zinc-100 text-zinc-600 border-zinc-200",
        running: "bg-blue-100 text-blue-700 border-blue-200 animate-pulse",
        done: "bg-green-100 text-green-700 border-green-200",
        error: "bg-red-100 text-red-700 border-red-200",
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
            {status.toUpperCase()}
        </span>
    )
}
