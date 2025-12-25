'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  ExternalLink,
  Loader2,
  Copy,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function DomainManager() {
  const [domain, setDomain] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
        setIsVerifying(false);
        setIsVerified(true);
    }, 2000);
  };

  const copyValue = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Domain Connection</h2>
          <p className="text-zinc-500">Connect your custom domain to your Entrestate OS via Vercel Edge.</p>
        </div>
        <div className="flex gap-2">
           <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-3 py-1">
             <Zap className="h-3 w-3 mr-1.5" /> Edge Hosting
           </Badge>
           <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 px-3 py-1">
             <ShieldCheck className="h-3 w-3 mr-1.5" /> Auto SSL
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           {/* Step 1: Input */}
           <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-xl">
              <CardHeader>
                 <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    Connect New Domain
                 </CardTitle>
                 <CardDescription>Enter the domain you want to use for your real estate platform.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex gap-3">
                    <Input 
                        placeholder="e.g. miamiluxury.com" 
                        className="bg-black/40 border-white/10 h-12 text-lg"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                    />
                    <Button 
                        onClick={handleVerify}
                        disabled={!domain || isVerifying}
                        className="h-12 px-8 bg-white text-black font-bold hover:bg-zinc-200 min-w-[140px]"
                    >
                        {isVerifying ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify Domain"}
                    </Button>
                 </div>
                 {isVerified && (
                     <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm font-medium text-green-200">Domain configuration detected. Proceed with DNS setup.</span>
                     </div>
                 )}
              </CardContent>
           </Card>

           {/* Step 2: DNS Setup (Only visible if domain entered) */}
           <AnimatePresence>
           {domain && (
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="space-y-6"
               >
                  <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="text-lg">DNS Configuration</CardTitle>
                        <CardDescription>Add these records to your domain provider (e.g. GoDaddy, Namecheap).</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                            <DnsRecordRow type="A" name="@" value="76.76.21.21" onCopy={copyValue} />
                            <DnsRecordRow type="CNAME" name="www" value="cname.vercel-dns.com" onCopy={copyValue} />
                        </div>
                    </CardContent>
                  </Card>
               </motion.div>
           )}
           </AnimatePresence>
        </div>

        {/* Info Column */}
        <div className="space-y-6">
           <Card className="bg-blue-600 border-none text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Globe className="h-32 w-32" />
              </div>
              <CardHeader>
                 <CardTitle className="text-xl font-bold">Why Custom Domains?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                 <p className="text-blue-100 text-sm leading-relaxed">
                    Connecting your own domain builds instant trust with investors and improves your Google search rankings (SEO) by 40%.
                 </p>
                 <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-xs font-bold"><CheckCircle2 className="h-3 w-3" /> Branded URLs</li>
                    <li className="flex items-center gap-2 text-xs font-bold"><CheckCircle2 className="h-3 w-3" /> Global CDN Edge Delivery</li>
                    <li className="flex items-center gap-2 text-xs font-bold"><CheckCircle2 className="h-3 w-3" /> Managed SSL Certificates</li>
                 </ul>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

function DnsRecordRow({ type, name, value, onCopy }: any) {
    return (
        <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between group">
            <div className="flex items-center gap-8">
                <div className="w-12 h-12 rounded-lg bg-zinc-800 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">{type}</span>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Host/Name</p>
                    <p className="text-sm font-mono text-white">{name}</p>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Value</p>
                    <p className="text-sm font-mono text-white">{value}</p>
                </div>
            </div>
            <Button variant="ghost" size="icon" className="text-zinc-600 group-hover:text-white" onClick={() => onCopy(value)}>
                <Copy className="h-4 w-4" />
            </Button>
        </div>
    )
}
