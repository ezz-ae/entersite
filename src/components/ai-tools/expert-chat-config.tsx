'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Instagram, 
  Globe, 
  MessageSquare, 
  Copy, 
  Check, 
  ExternalLink,
  Zap,
  Target,
  BrainCircuit
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ExpertChatConfig() {
  const [copied, setCopied] = useState(false);
  const snippet = `<script src="https://cdn.entresite.ai/chat.js" data-agent="agent_772"></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Expert AI Sales Agent</h2>
          <p className="text-muted-foreground">Train your agent on real project data and deploy it anywhere.</p>
        </div>
        <div className="flex gap-2">
           <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
             <BrainCircuit className="h-3 w-3 mr-1" /> Knowledge: 3,750 Projects
           </Badge>
           <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
             <Zap className="h-3 w-3 mr-1" /> Live on Instagram
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Core Intelligence</CardTitle>
              <CardDescription>Select the data sources your agent will use to answer customer queries.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="p-4 rounded-xl border bg-muted/30 space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                           <Globe className="h-5 w-5 text-orange-500" />
                        </div>
                        <div>
                           <p className="font-bold">UAE Project Database</p>
                           <p className="text-xs text-muted-foreground">Access to live prices, floor plans, and ROIs.</p>
                        </div>
                     </div>
                     <Badge>Always On</Badge>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Additional Training Data</label>
                     <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 justify-start h-12 text-zinc-400">
                           <Plus className="h-4 w-4 mr-2" /> Upload Brochure (PDF)
                        </Button>
                        <Button variant="outline" className="flex-1 justify-start h-12 text-zinc-400">
                           <Plus className="h-4 w-4 mr-2" /> Scrape Website URL
                        </Button>
                     </div>
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deployment Channels</CardTitle>
              <CardDescription>Where should your agent live?</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DeploymentCard 
                    icon={Instagram} 
                    title="Instagram DM" 
                    desc="Automate replies and lead capture in your DMs." 
                    connected={true}
                  />
                  <DeploymentCard 
                    icon={MessageSquare} 
                    title="WhatsApp" 
                    desc="Send brochures and booking links automatically." 
                    connected={false}
                  />
                  <DeploymentCard 
                    icon={Globe} 
                    title="Web Widget" 
                    desc="Add a floating chat bubble to your current site." 
                    connected={true}
                  />
                   <DeploymentCard 
                    icon={Target} 
                    title="Standalone Page" 
                    desc="A dedicated link for your Instagram Bio." 
                    connected={true}
                  />
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview / Snippet Panel */}
        <div className="space-y-6">
          <Card className="bg-black border-primary/20">
             <CardHeader>
                <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground">Live Preview</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="bg-zinc-900 rounded-2xl p-4 aspect-[9/16] relative flex flex-col shadow-2xl overflow-hidden border border-white/5">
                   {/* Fake Phone UI */}
                   <div className="flex-1 space-y-4">
                      <div className="bg-blue-600 rounded-2xl rounded-tr-none p-3 ml-8 text-xs text-white">
                         Hello! I'm interested in the new launch at Dubai Creek. What's the starting price?
                      </div>
                      <div className="bg-zinc-800 rounded-2xl rounded-tl-none p-3 mr-8 text-xs text-zinc-100 flex gap-2">
                         <div className="w-5 h-5 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center">
                            <Bot className="h-3 w-3" />
                         </div>
                         <div>
                            The starting price for Creek Waters is AED 1.6M. Would you like me to send the full payment plan to your WhatsApp?
                         </div>
                      </div>
                   </div>
                   <div className="mt-auto border-t border-white/10 pt-4">
                      <div className="bg-zinc-800 rounded-full px-4 py-2 text-[10px] text-zinc-500">
                         Ask about ROI, Location or Floorplans...
                      </div>
                   </div>
                </div>
             </CardContent>
          </Card>

          <Card>
             <CardHeader>
                <CardTitle className="text-sm">Embed Code</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="bg-muted p-3 rounded-lg font-mono text-[10px] relative group overflow-hidden border">
                   {snippet}
                   <button 
                     onClick={copyToClipboard}
                     className="absolute top-2 right-2 p-1 bg-background rounded border shadow-sm hover:bg-muted transition-colors"
                   >
                     {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                   </button>
                </div>
                <Button className="w-full gap-2">
                   View Landing Page <ExternalLink className="h-3 w-3" />
                </Button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DeploymentCard({ icon: Icon, title, desc, connected }: any) {
  return (
    <div className={cn(
      "p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer",
      connected ? "bg-primary/5 border-primary/20" : "bg-muted/10 opacity-60"
    )}>
      <div className="flex justify-between items-start mb-2">
        <div className={cn(
          "p-2 rounded-lg",
          connected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
        )}>
          <Icon className="h-5 w-5" />
        </div>
        {connected ? (
           <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/10 border-0 text-[10px]">Active</Badge>
        ) : (
           <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2">Connect</Button>
        )}
      </div>
      <h4 className="font-bold text-sm mb-1">{title}</h4>
      <p className="text-[11px] text-muted-foreground leading-snug">{desc}</p>
    </div>
  )
}

function Separator() {
  return <div className="h-px bg-border w-full" />
}

import { Plus } from 'lucide-react';
