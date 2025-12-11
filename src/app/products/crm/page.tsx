import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Users, Filter, MessageCircle, BarChart3, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
  title: 'Real Estate CRM | EntreSite',
  description: 'Manage leads, track deals, and automate follow-ups with the only CRM built for real estate developers.',
};

export default function CrmProductPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30 font-sans">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none" />
         <div className="container mx-auto px-6 max-w-[1800px] relative z-10 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20 mb-4">
                <Users className="h-3 w-3" />
                Intelligent Lead Management
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none max-w-4xl mx-auto">
                Turn Traffic into <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">Closed Deals.</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                The first CRM designed specifically for off-plan sales. Auto-capture leads from your landing pages, score them with AI, and route them to your best agents instantly.
            </p>
            <div className="flex justify-center gap-4 pt-4">
                <Button size="lg" className="h-14 px-8 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-lg shadow-[0_0_40px_-10px_rgba(147,51,234,0.5)]">
                    Try CRM Free
                </Button>
            </div>
         </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-zinc-950 border-y border-white/5">
          <div className="container mx-auto px-6 max-w-7xl">
              <div className="grid lg:grid-cols-5 gap-12 items-start">
                  
                   <div className="lg:col-span-3">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                          {/* Embedded CRM Mockup */}
                          <div className="p-1 bg-muted/20">
                             <div className="bg-background rounded-xl overflow-hidden shadow-sm">
                                <div className="p-4 border-b flex justify-between items-center bg-muted/10">
                                    <h4 className="font-bold text-sm flex items-center gap-2">
                                        <Users className="h-4 w-4" /> Recent Leads
                                    </h4>
                                    <div className="flex gap-2">
                                        <Badge variant="outline">Today</Badge>
                                        <Button size="sm" variant="secondary" className="h-7 text-xs">Export CSV</Button>
                                    </div>
                                </div>
                                <div className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="hover:bg-transparent">
                                                <TableHead>Name</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Interest</TableHead>
                                                <TableHead className="text-right">Score</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                { name: "Ahmed Al-Mansouri", status: "New", interest: "Damac Lagoon", score: 98 },
                                                { name: "Sarah Johnson", status: "Contacted", interest: "Emaar Beachfront", score: 85 },
                                                { name: "Michael Chen", status: "Qualified", interest: "Palm Jebel Ali", score: 92 },
                                                { name: "Elena Petrova", status: "New", interest: "Dubai Hills", score: 45 },
                                                { name: "David Miller", status: "Lost", interest: "Downtown", score: 20 },
                                            ].map((lead, i) => (
                                                <TableRow key={i} className="hover:bg-muted/50 cursor-pointer">
                                                    <TableCell className="font-medium">{lead.name}</TableCell>
                                                    <TableCell>
                                                        <Badge className={
                                                            lead.status === 'New' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                                                            lead.status === 'Qualified' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                                                            'bg-zinc-100 text-zinc-700 hover:bg-zinc-100'
                                                        }>{lead.status}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground">{lead.interest}</TableCell>
                                                    <TableCell className="text-right font-mono font-bold">
                                                        <span className={lead.score > 80 ? "text-green-600" : lead.score > 50 ? "text-yellow-600" : "text-red-600"}>
                                                            {lead.score}
                                                        </span>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                             </div>
                          </div>
                      </div>
                      <p className="text-center text-xs text-zinc-500 mt-4">
                          * Live preview of the Lead Manager dashboard.
                      </p>
                  </div>

                  <div className="lg:col-span-2 space-y-8 sticky top-24">
                      <h2 className="text-3xl font-bold">Smart Management <br/> for Serious Brokers.</h2>
                      <div className="space-y-6">
                          <Feature 
                            icon={Filter} 
                            title="AI Lead Scoring" 
                            desc="Don't waste time on cold leads. Our AI analyzes behavior to score every prospect from 0-100." 
                          />
                          <Feature 
                            icon={MessageCircle} 
                            title="WhatsApp Integration" 
                            desc="Start conversations instantly. Chat history is automatically synced to the lead profile." 
                          />
                          <Feature 
                            icon={BarChart3} 
                            title="Pipeline Analytics" 
                            desc="Visualize your sales funnel. Know exactly how much revenue is projected for next month." 
                          />
                      </div>
                  </div>
                  
              </div>
          </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-black">
          <div className="container mx-auto px-6 max-w-5xl text-center">
              <h2 className="text-3xl font-bold mb-16">The Automated Workflow</h2>
              
              <div className="grid md:grid-cols-3 gap-8 relative">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -z-10 hidden md:block" />
                  
                  <WorkflowStep 
                    step="1" 
                    title="Capture" 
                    desc="Lead fills form on your AI-generated landing page."
                  />
                   <WorkflowStep 
                    step="2" 
                    title="Qualify" 
                    desc="AI Agent chats instantly to verify budget and interest."
                  />
                   <WorkflowStep 
                    step="3" 
                    title="Close" 
                    desc="High-score leads are routed to your phone via WhatsApp."
                  />
              </div>
          </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function Feature({ icon: Icon, title, desc }: any) {
    return (
        <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
                <Icon className="h-5 w-5 text-purple-400" />
            </div>
            <div>
                <h3 className="font-bold text-lg mb-1 text-white">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}

function WorkflowStep({ step, title, desc }: any) {
    return (
        <div className="bg-black border border-zinc-800 p-6 rounded-2xl relative">
            <div className="w-10 h-10 bg-zinc-900 rounded-full border border-zinc-700 flex items-center justify-center font-bold text-white mx-auto mb-4 relative z-10">
                {step}
            </div>
            <h3 className="font-bold text-xl mb-2">{title}</h3>
            <p className="text-sm text-zinc-400">{desc}</p>
        </div>
    )
}
