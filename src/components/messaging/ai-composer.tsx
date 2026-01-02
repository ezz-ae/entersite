'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Send, 
  Loader2, 
  Mail, 
  Smartphone, 
  MessageCircle, 
  ChevronRight,
  Zap,
  Building2,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { generateEmailAction, generateSmsAction } from '@/app/actions/ai';
import { sendEmail } from '@/lib/messaging/emailSender';
import { sendSms } from '@/lib/messaging/smsSender';
import type { ProjectData, SitePage } from '@/lib/types';
import type { MarketingEmailOutput } from '@/ai/flows/generate-marketing-email';
import type { MarketingSmsOutput } from '@/ai/flows/generate-marketing-sms';
import { cn } from '@/lib/utils';

interface AIComposerProps {
  mode: 'email' | 'sms';
  initialProjects?: ProjectData[];
}

export function AIComposer({ mode, initialProjects = [] }: AIComposerProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects);
  const [audienceType, setAudienceType] = useState<string>('INTERNATIONAL_INVESTOR');
  
  const [emailResult, setEmailResult] = useState<MarketingEmailOutput | null>(null);
  const [smsResult, setSmsResult] = useState<MarketingSmsOutput | null>(null);
  const [testRecipient, setTestRecipient] = useState('');

  useEffect(() => {
    if (projects.length === 0) {
      fetch('/api/projects/search?limit=10')
        .then(res => res.json())
        .then(data => setProjects(data.data || []))
        .catch(err => console.error('Failed to load projects for composer', err));
    }
  }, [projects.length]);

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const handleGenerate = async () => {
    if (!selectedProject) return;

    setLoading(true);
    try {
      if (mode === 'email') {
        const result = await generateEmailAction({
          projectName: selectedProject.name,
          developer: selectedProject.developer,
          location: selectedProject.location.area,
          roi: selectedProject.performance.roi,
          handover: selectedProject.handover ? `Q${selectedProject.handover.quarter} ${selectedProject.handover.year}` : 'Ready',
          priceLabel: selectedProject.price.label,
          targetAudience: audienceType as any
        });
        setEmailResult(result);
      } else {
        const result = await generateSmsAction({
          projectName: selectedProject.name,
          developer: selectedProject.developer,
          location: selectedProject.location.area,
          roi: selectedProject.performance.roi,
          handover: selectedProject.handover ? `Q${selectedProject.handover.quarter} ${selectedProject.handover.year}` : 'Ready',
          priceLabel: selectedProject.price.label,
          urgency: 'HIGH'
        });
        setSmsResult(result);
      }
      toast({ title: "Draft Generated", description: `The ${mode} draft is ready for review.` });
    } catch (error) {
      toast({ title: "Generation Error", description: "Failed to create the marketing content.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSendTest = async () => {
    if (!testRecipient) return;
    setSending(true);
    try {
      if (mode === 'email' && emailResult) {
        await sendEmail({ to: testRecipient, subject: emailResult.subject, body: emailResult.bodyHtml });
      } else if (mode === 'sms' && smsResult) {
        await sendSms({ to: testRecipient, message: smsResult.whatsappMessage });
      }
      toast({ title: "Test Sent", description: "The message has been sent successfully." });
    } catch (error: any) {
      toast({ title: "Send Failed", description: error.message, variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="space-y-8">
        <div className="p-8 bg-zinc-900/50 border border-white/5 rounded-[2.5rem] space-y-8 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 text-blue-500">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-white">Marketing Composer</h3>
              <p className="text-zinc-500 text-sm font-medium">Create high-performance {mode} copy instantly.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Anchor Project</label>
              <Select onValueChange={setSelectedProjectId} value={selectedProjectId}>
                <SelectTrigger className="h-14 bg-black/40 border-white/10 rounded-2xl font-semibold tracking-tight text-white">
                  <SelectValue placeholder="SELECT FROM INVENTORY" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-white/10 text-white">
                  {projects.map(p => (
                    <SelectItem key={p.id} value={p.id || ''} className="font-semibold tracking-tight py-3">
                      {p.name} · {p.developer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {mode === 'email' && (
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Target Audience</label>
                <Select onValueChange={setAudienceType} value={audienceType}>
                  <SelectTrigger className="h-14 bg-black/40 border-white/10 rounded-2xl font-semibold tracking-tight text-white">
                    <SelectValue placeholder="CHOOSE AUDIENCE" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-950 border-white/10 text-white">
                    <SelectItem value="INTERNATIONAL_INVESTOR" className="font-semibold py-3">International Investor</SelectItem>
                    <SelectItem value="LOCAL_END_USER" className="font-semibold py-3">Local Resident</SelectItem>
                    <SelectItem value="FLIPPER" className="font-semibold py-3">Property Specialist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button 
              onClick={handleGenerate} 
              disabled={loading || !selectedProjectId}
              className="w-full h-16 bg-white text-black hover:bg-zinc-200 rounded-2xl text-xl font-bold gap-3 shadow-xl transition-all group tracking-tight"
            >
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Sparkles className="h-6 w-6 text-blue-600" />}
              Generate {mode === 'email' ? 'Email' : 'Message'} Draft
            </Button>
          </div>
        </div>

        {(emailResult || smsResult) && (
          <div className="p-8 bg-blue-600/5 border border-blue-500/20 rounded-[2.5rem] space-y-6 animate-in slide-in-from-left-4 duration-500 shadow-sm">
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-white tracking-tight">Send Test Message</h4>
              <p className="text-zinc-500 text-sm font-medium">Verify how it looks on your device before sending to clients.</p>
            </div>
            <div className="flex gap-3">
              <Input 
                placeholder={mode === 'email' ? 'your@email.com' : '+971 5x xxx xxxx'} 
                className="h-14 bg-black/40 border-white/10 rounded-xl font-semibold text-white"
                value={testRecipient}
                onChange={(e) => setTestRecipient(e.target.value)}
              />
              <Button 
                onClick={handleSendTest} 
                disabled={sending}
                className="h-14 px-8 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold gap-2"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Send
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-4">Live Preview</label>
        
        {!emailResult && !smsResult ? (
          <div className="h-[500px] flex flex-col items-center justify-center space-y-4 bg-zinc-900/20 rounded-[3rem] border border-white/5 border-dashed">
            <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center border border-white/5">
              {mode === 'email' ? <Mail className="h-8 w-8 text-zinc-700" /> : <MessageCircle className="h-8 w-8 text-zinc-700" />}
            </div>
            <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-widest">Awaiting Content</p>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-500 h-full">
            {mode === 'email' && emailResult ? (
              <div className="bg-zinc-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl h-full flex flex-col">
                <div className="p-6 bg-black/40 border-b border-white/5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Subject:</span>
                    <span className="text-sm font-semibold text-white">{emailResult.subject}</span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-white p-10">
                  <div className="email-preview" dangerouslySetInnerHTML={{ __html: emailResult.bodyHtml }} />
                </div>
              </div>
            ) : smsResult ? (
              <div className="max-w-[320px] mx-auto">
                 <div className="relative aspect-[9/18.5] bg-zinc-900 rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden flex flex-col">
                    <div className="h-6 w-full flex items-center justify-center">
                       <div className="w-20 h-4 bg-zinc-800 rounded-b-2xl" />
                    </div>
                    <div className="p-4 flex-1">
                      <div className="bg-zinc-800 rounded-2xl rounded-tl-none p-4 text-[11px] text-zinc-100 space-y-2 shadow-xl border border-white/5 font-medium">
                        <div dangerouslySetInnerHTML={{ __html: smsResult.whatsappMessage.replace(/\n/g, '<br/>') }} />
                        <p className="text-blue-400 font-bold underline mt-2">{smsResult.ctaLink}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-black/40 border-t border-white/5 flex items-center gap-2">
                        <div className="h-8 flex-1 bg-zinc-800 rounded-full" />
                        <div className="w-8 h-8 rounded-full bg-blue-600" />
                    </div>
                 </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
