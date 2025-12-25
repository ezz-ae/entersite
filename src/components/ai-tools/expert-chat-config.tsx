'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
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
  BrainCircuit,
  Plus,
  Loader2,
  Building2,
  FileText
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export function ExpertChatConfig() {
  const [copied, setCopied] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [agentName, setAgentName] = useState('Real Estate Expert');
  const [companyBio, setCompanyBio] = useState('');

  const snippet = `<script src="https://cdn.entrestate.ai/chat.js" data-agent="agent_772"></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConnectInstagram = () => {
    setIsConnecting(true);
    // Simulate Meta OAuth flow
    setTimeout(() => {
        setIsConnecting(false);
        setIsConnected(true);
    }, 2000);
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Expert AI Sales Agent</h2>
          <p className="text-zinc-500">Train your agent on your company details and deploy to Instagram in seconds.</p>
        </div>
        <div className="flex gap-2">
           <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-3 py-1">
             <BrainCircuit className="h-3 w-3 mr-1.5" /> Market Knowledge: 3,750 Projects
           </Badge>
           {isConnected && (
             <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 px-3 py-1">
               <Zap className="h-3 w-3 mr-1.5" /> Live on Instagram
             </Badge>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Identity & Bio */}
          <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-500" />
                Agent Identity
              </CardTitle>
              <CardDescription>Tell the AI who it represents and how it should speak.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Agent Name</label>
                    <Input 
                        placeholder="e.g. Sarah from Entrestate" 
                        className="bg-black/40 border-white/10 h-12"
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Language</label>
                    <div className="h-12 bg-black/40 border border-white/10 rounded-lg flex items-center px-4 text-sm font-medium text-zinc-300">
                        Auto-Detect (Arabic & English)
                    </div>
                  </div>
               </div>
               <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Company Bio & Sales Rules</label>
                    <Textarea 
                        placeholder="e.g. We specialize in luxury penthouses in Dubai Marina. Always offer a free consultation for investors from UK." 
                        className="bg-black/40 border-white/10 min-h-[100px] resize-none"
                        value={companyBio}
                        onChange={(e) => setCompanyBio(e.target.value)}
                    />
               </div>
            </CardContent>
          </Card>

          {/* 2. Knowledge Base */}
          <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Custom Knowledge
              </CardTitle>
              <CardDescription>Upload specific brochures or inventory lists.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="p-8 rounded-2xl border-2 border-dashed border-white/10 bg-black/20 flex flex-col items-center justify-center gap-4 group hover:border-blue-500/50 transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                     <Plus className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Add Project Brochure (PDF)</p>
               </div>
            </CardContent>
          </Card>

          {/* 3. Integrations */}
          <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg">Deploy Anywhere</CardTitle>
              <CardDescription>Connect your agent to your communication channels.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="grid md:grid-cols-2 gap-4">
                  <div className={cn(
                    "p-6 rounded-2xl border transition-all flex flex-col gap-4",
                    isConnected ? "bg-green-500/5 border-green-500/20" : "bg-zinc-900 border-white/5"
                  )}>
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-12 rounded-xl bg-pink-600/10 flex items-center justify-center text-pink-500">
                           <Instagram className="h-6 w-6" />
                        </div>
                        {isConnected ? <Badge className="bg-green-500 text-white">Active</Badge> : null}
                    </div>
                    <div>
                        <h4 className="font-bold text-white">Instagram DM</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed mt-1">Capture leads automatically from your stories and direct messages.</p>
                    </div>
                    <Button 
                        onClick={handleConnectInstagram}
                        disabled={isConnecting || isConnected}
                        className={cn(
                            "w-full h-10 font-bold text-xs uppercase tracking-widest",
                            isConnected ? "bg-zinc-800 text-zinc-500" : "bg-white text-black hover:bg-zinc-200"
                        )}
                    >
                        {isConnecting ? <Loader2 className="h-4 w-4 animate-spin" /> : isConnected ? "Authorized" : "Authorize Agent"}
                    </Button>
                  </div>

                  <div className="p-6 rounded-2xl border bg-zinc-900 border-white/5 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                        <Globe className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white">Web Widget</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed mt-1">Embed a floating chat bubble on your existing real estate website.</p>
                    </div>
                    <div className="mt-auto space-y-3">
                         <div className="bg-black p-2 rounded-lg font-mono text-[9px] text-zinc-500 truncate border border-white/5">
                            {snippet}
                         </div>
                         <Button variant="outline" className="w-full h-10 border-white/10 bg-white/5 font-bold text-xs uppercase tracking-widest gap-2" onClick={copyToClipboard}>
                            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            {copied ? "Copied" : "Copy Snippet"}
                         </Button>
                    </div>
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Mobile Preview */}
        <div className="space-y-6">
          <div className="sticky top-24">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-4 text-center">Live Interface Preview</p>
              <div className="relative mx-auto w-[280px] aspect-[9/18.5] bg-zinc-900 rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden flex flex-col">
                  {/* Top Notch */}
                  <div className="h-6 w-full flex items-center justify-center">
                     <div className="w-20 h-4 bg-zinc-800 rounded-b-2xl" />
                  </div>

                  {/* Chat Content */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                     <div className="flex justify-start">
                        <div className="max-w-[85%] bg-zinc-800 rounded-2xl rounded-tl-none p-3 text-[11px] text-zinc-200">
                           Hi! I'm {agentName}. I know all about 3,750+ UAE projects. How can I help you today?
                        </div>
                     </div>
                     <div className="flex justify-end">
                        <div className="max-w-[85%] bg-blue-600 rounded-2xl rounded-tr-none p-3 text-[11px] text-white shadow-lg">
                           What's the handover for the new Palm Jebel Ali villas?
                        </div>
                     </div>
                     <div className="flex justify-start">
                        <div className="max-w-[85%] bg-zinc-800 rounded-2xl rounded-tl-none p-3 text-[11px] text-zinc-200">
                           Nakheel's Palm Jebel Ali villas are expected to start handover in <strong>Q4 2027</strong>. Would you like me to send you the latest availability list?
                        </div>
                     </div>
                  </div>

                  {/* Input Area */}
                  <div className="p-4 bg-black/40 border-t border-white/5">
                     <div className="h-8 w-full bg-zinc-800 rounded-full px-3 flex items-center text-[10px] text-zinc-500">
                        Type a message...
                     </div>
                  </div>
              </div>
              
              <div className="mt-8 flex flex-col gap-3">
                  <Button className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2">
                     <ExternalLink className="h-4 w-4" /> Open Dedicated Chat Page
                  </Button>
                  <p className="text-[10px] text-center text-zinc-600 font-medium">This page is perfect for your Instagram Bio link.</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
