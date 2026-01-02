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
  FileText,
  BarChart3,
  Users,
  ShieldCheck,
  Smartphone,
  ArrowRight
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function ExpertChatConfig() {
  const [copied, setCopied] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [agentName, setAgentName] = useState('Sarah');
  const [companyFocus, setCompanyFocus] = useState('');

  const snippet = `<script src="https://cdn.entrestate.ai/chat.js" data-agent="agent_772"></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConnectInstagram = () => {
    setIsConnecting(true);
    setTimeout(() => {
        setIsConnecting(false);
        setIsConnected(true);
    }, 2000);
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* 1. Enhanced Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-blue-600/10 text-blue-500 border-blue-500/20 px-2 py-0 h-5 text-[9px] font-bold uppercase tracking-widest">Active Module</Badge>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white">Chat Experts</h2>
            <p className="text-zinc-500 font-medium">Automate your project inquiries and lead qualification 24/7.</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Market Intel Sync</p>
                <p className="text-sm font-bold text-green-500">3,754 Projects Loaded</p>
            </div>
            <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 font-bold h-12 px-6">
                <Plus className="h-4 w-4 mr-2" /> New Agent
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Config Area */}
        <div className="lg:col-span-2 space-y-8">
            
            <Tabs defaultValue="identity" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-zinc-950 p-1.5 rounded-[1.5rem] border border-white/10">
                    <TabsTrigger value="identity" className="rounded-xl h-10 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">1. Identity</TabsTrigger>
                    <TabsTrigger value="knowledge" className="rounded-xl h-10 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">2. Knowledge</TabsTrigger>
                    <TabsTrigger value="deploy" className="rounded-xl h-10 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">3. Deploy</TabsTrigger>
                </TabsList>

                {/* TAB 1: IDENTITY */}
                <TabsContent value="identity" className="space-y-6 mt-0">
                    <Card className="bg-zinc-900/30 border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm">
                        <CardHeader className="p-10 pb-4">
                            <CardTitle className="text-xl font-bold flex items-center gap-3 text-white">
                                <Users className="h-5 w-5 text-blue-500" />
                                Agent Personality
                            </CardTitle>
                            <CardDescription className="text-zinc-500 font-medium">Define your AI's name and how it should represent your brand.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-10 pt-0 space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Expert Name</label>
                                    <Input 
                                        placeholder="e.g. Sarah from Downtown Realty" 
                                        className="bg-black/40 border-white/10 h-14 font-medium text-white rounded-xl focus:border-blue-500/50"
                                        value={agentName}
                                        onChange={(e) => setAgentName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Native Language</label>
                                    <div className="h-14 bg-black/40 border border-white/10 rounded-xl flex items-center px-5 text-sm font-bold text-zinc-400">
                                        Multi-Language (Arabic & English)
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Sales Focus & Tone</label>
                                <Textarea 
                                    placeholder="e.g. Focus on luxury villas in Palm Jumeirah. Be professional yet energetic. Always prioritize high-ROI investor inquiries." 
                                    className="bg-black/40 border-white/10 min-h-[140px] resize-none font-medium text-white rounded-xl p-6 focus:border-blue-500/50"
                                    value={companyFocus}
                                    onChange={(e) => setCompanyFocus(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TAB 2: KNOWLEDGE */}
                <TabsContent value="knowledge" className="space-y-6 mt-0">
                    <Card className="bg-zinc-900/30 border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm">
                        <CardHeader className="p-10 pb-4">
                            <CardTitle className="text-xl font-bold flex items-center gap-3 text-white">
                                <BrainCircuit className="h-5 w-5 text-blue-500" />
                                Project Intel
                            </CardTitle>
                            <CardDescription className="text-zinc-500 font-medium">Upload project brochures or spreadsheets to train the AI on your inventory.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-10 pt-0 space-y-8">
                            <div className="p-16 rounded-[2rem] border-2 border-dashed border-white/5 bg-black/20 flex flex-col items-center justify-center gap-6 group hover:border-blue-500/30 hover:bg-black/40 transition-all cursor-pointer shadow-inner">
                                <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform border border-blue-500/20">
                                    <FileText className="h-8 w-8" />
                                </div>
                                <div className="text-center space-y-1">
                                    <p className="text-lg font-bold text-white">Click to Upload Project PDF</p>
                                    <p className="text-sm font-medium text-zinc-600">The AI will extract specs, prices, and floor plans.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <KnowledgeStat icon={ShieldCheck} label="Verified Accuracy" value="98.2%" />
                                <KnowledgeStat icon={Zap} label="Extraction Speed" value="< 5s" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TAB 3: DEPLOY */}
                <TabsContent value="deploy" className="space-y-6 mt-0">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Instagram Channel */}
                        <Card className={cn(
                            "bg-zinc-900/30 border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm transition-all border",
                            isConnected ? "border-green-500/20 bg-green-500/5" : "hover:border-white/10"
                        )}>
                            <CardContent className="p-8 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className="w-14 h-14 rounded-2xl bg-pink-600/10 flex items-center justify-center text-pink-500 border border-pink-500/20 shadow-lg shadow-pink-900/10">
                                        <Instagram className="h-7 w-7" />
                                    </div>
                                    {isConnected && <Badge className="bg-green-500 text-white font-bold h-6 px-3">Live</Badge>}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xl font-bold text-white">Instagram DM</h4>
                                    <p className="text-sm text-zinc-500 font-medium leading-relaxed">Automate leads from your stories and direct messages.</p>
                                </div>
                                <Button 
                                    onClick={handleConnectInstagram}
                                    disabled={isConnecting || isConnected}
                                    className={cn(
                                        "w-full h-14 font-bold rounded-xl text-sm uppercase tracking-widest",
                                        isConnected ? "bg-zinc-800 text-zinc-500" : "bg-white text-black hover:bg-zinc-200 shadow-xl shadow-white/5"
                                    )}
                                >
                                    {isConnecting ? <Loader2 className="h-5 w-5 animate-spin" /> : isConnected ? "System Synced" : "Authorize Agent"}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Web Widget Channel */}
                        <Card className="bg-zinc-900/30 border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm hover:border-white/10 transition-all border">
                            <CardContent className="p-8 space-y-6">
                                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-lg shadow-blue-900/10">
                                    <Globe className="h-7 w-7" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xl font-bold text-white">Web Widget</h4>
                                    <p className="text-sm text-zinc-500 font-medium leading-relaxed">Embed a floating chat bubble on your property websites.</p>
                                </div>
                                <div className="pt-2">
                                    <div className="bg-black/40 p-3 rounded-xl font-mono text-[10px] text-zinc-500 truncate border border-white/5 mb-3">
                                        {snippet}
                                    </div>
                                    <Button variant="outline" className="w-full h-12 border-white/10 bg-white/5 font-bold text-xs uppercase tracking-widest gap-2 rounded-xl" onClick={copyToClipboard}>
                                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                        {copied ? "Copied" : "Copy Script"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Bottom Alert / Stats */}
            <div className="p-8 rounded-[2.5rem] bg-blue-600/5 border border-blue-500/10 flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 text-blue-500">
                    <BarChart3 className="h-6 w-6" />
                </div>
                <div className="flex-1">
                    <p className="text-sm font-bold text-white">Efficiency Insight</p>
                    <p className="text-xs text-zinc-500 font-medium">Agents reduce missed midnight inquiries by <span className="text-blue-400">100%</span> across the UAE.</p>
                </div>
            </div>
        </div>

        {/* Live Mobile Preview Side Panel */}
        <div className="space-y-6">
          <div className="sticky top-24">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-6 text-center">Live Interface Preview</p>
              
              <div className="relative mx-auto w-[290px] aspect-[9/18.5] bg-zinc-950 rounded-[3.5rem] border-[10px] border-zinc-900 shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
                  {/* Top Notch */}
                  <div className="h-8 w-full flex items-center justify-center bg-zinc-900/50">
                     <div className="w-24 h-5 bg-zinc-900 rounded-b-[1.5rem]" />
                  </div>

                  {/* Chat UI */}
                  <div className="flex-1 p-5 space-y-5 overflow-y-auto no-scrollbar">
                     <div className="flex justify-start">
                        <div className="max-w-[90%] bg-zinc-900 rounded-2xl rounded-tl-none p-4 text-[12px] text-zinc-200 font-medium shadow-sm border border-white/5">
                           Hi! I'm {agentName || 'your expert'}. I'm synced with 3,750+ projects. What area are you interested in?
                        </div>
                     </div>
                     <div className="flex justify-end">
                        <div className="max-w-[80%] bg-blue-600 rounded-2xl rounded-tr-none p-4 text-[12px] text-white shadow-xl font-semibold">
                           Handover for Palm Jebel Ali?
                        </div>
                     </div>
                     <div className="flex justify-start">
                        <div className="max-w-[90%] bg-zinc-900 rounded-2xl rounded-tl-none p-4 text-[12px] text-zinc-200 font-medium shadow-sm border border-white/5">
                           Nakheel's Palm Jebel Ali villas start handover in <strong>Q4 2027</strong>. Should I send the full brochure to your WhatsApp?
                        </div>
                     </div>
                  </div>

                  {/* Input Simulation */}
                  <div className="p-5 bg-black/60 border-t border-white/5">
                     <div className="h-10 w-full bg-zinc-900 rounded-full px-4 flex items-center text-xs text-zinc-600 font-medium">
                        Ask a project question...
                     </div>
                  </div>
              </div>
              
              <div className="mt-10 flex flex-col gap-4">
                  <Button className="w-full h-14 rounded-2xl bg-white text-black hover:bg-zinc-100 font-bold gap-3 shadow-xl transition-all">
                     <Smartphone className="h-5 w-5" /> View Project Landing Page
                  </Button>
                  <p className="text-[10px] text-center text-zinc-600 font-bold uppercase tracking-widest">Autonomous Sync: DIFC-NODE-01</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KnowledgeStat({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-zinc-500" />
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</span>
            </div>
            <span className="text-sm font-bold text-white font-mono">{value}</span>
        </div>
    )
}
