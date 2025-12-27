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
  Check,
  Search,
  ShoppingCart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export function DomainManager() {
  const [domain, setDomain] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Domain search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[] | null>(null);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
        setIsVerifying(false);
        setIsVerified(true);
        toast({ title: "DNS Connected", description: "Your domain is now pointed to Entrestate OS." });
    }, 2000);
  };

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
        setIsSearching(false);
        setSearchResults([
            { name: `\${searchQuery}.com`, price: "AED 45/yr", status: 'available' },
            { name: `\${searchQuery}.ae`, price: "AED 120/yr", status: 'available' },
            { name: `\${searchQuery}.estate`, price: "AED 90/yr", status: 'available' },
        ]);
    }, 1500);
  };

  const copyValue = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white uppercase italic">Domain Infrastructure</h2>
          <p className="text-zinc-500">Manage your global identity and edge delivery nodes.</p>
        </div>
        <div className="flex gap-2">
           <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-3 py-1">
             <Zap className="h-3 w-3 mr-1.5" /> Edge Node: DXB-1
           </Badge>
           <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 px-3 py-1">
             <ShieldCheck className="h-3 w-3 mr-1.5" /> Auto SSL Active
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
           
           {/* Section 1: Register New */}
           <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8 pb-4">
                 <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <ShoppingCart className="h-6 w-6 text-orange-500" />
                    Register New Asset
                 </CardTitle>
                 <CardDescription>Secure a new domain for your project. Auto-configured instantly.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                 <div className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600" />
                        <Input 
                            placeholder="Find your perfect real estate domain..." 
                            className="bg-black/40 border-white/10 h-14 pl-12 text-lg rounded-2xl text-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button 
                        onClick={handleSearch}
                        disabled={!searchQuery || isSearching}
                        className="h-14 px-8 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl min-w-[140px]"
                    >
                        {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : "Search"}
                    </Button>
                 </div>

                 <AnimatePresence>
                    {searchResults && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-3 pt-4"
                        >
                            {searchResults.map((res) => (
                                <div key={res.name} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl hover:border-orange-500/30 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                            <Check className="h-5 w-5 text-green-500" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">{res.name}</p>
                                            <p className="text-xs text-zinc-500">Instant registration available</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-mono text-sm text-zinc-400">{res.price}</span>
                                        <Button size="sm" className="bg-white text-black font-bold h-9 rounded-xl px-4">Buy Now</Button>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                 </AnimatePresence>
              </CardContent>
           </Card>

           {/* Section 2: External Domain */}
           <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8 pb-4">
                 <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <Globe className="h-6 w-6 text-blue-500" />
                    Connect External Domain
                 </CardTitle>
                 <CardDescription>Already own a domain? Point it to our edge network nodes.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                 <div className="flex gap-3">
                    <Input 
                        placeholder="e.g. miamiluxury.com" 
                        className="bg-black/40 border-white/10 h-14 text-lg rounded-2xl text-white"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                    />
                    <Button 
                        onClick={handleVerify}
                        disabled={!domain || isVerifying}
                        className="h-14 px-8 bg-white text-black font-bold rounded-2xl min-w-[140px]"
                    >
                        {isVerifying ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify DNS"}
                    </Button>
                 </div>
                 
                 {domain && (
                     <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 pt-4 border-t border-white/5"
                     >
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Required DNS Records</p>
                        <div className="grid grid-cols-1 gap-3">
                            <DnsRecordRow type="A" name="@" value="76.76.21.21" onCopy={copyValue} />
                            <DnsRecordRow type="CNAME" name="www" value="cname.entresite-dns.com" onCopy={copyValue} />
                        </div>
                     </motion.div>
                 )}
              </CardContent>
           </Card>
        </div>

        {/* Info Column */}
        <div className="space-y-8">
           <Card className="bg-blue-600 border-none text-white overflow-hidden rounded-[2.5rem] relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Globe className="h-40 w-40" />
              </div>
              <CardHeader className="p-8">
                 <CardTitle className="text-2xl font-bold italic uppercase">Global Edge</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6 relative z-10">
                 <p className="text-blue-100 text-lg font-light leading-relaxed">
                    Custom domains on Entrestate OS are served through our proprietary edge cache, ensuring sub-50ms load times globally.
                 </p>
                 <div className="space-y-4 pt-4 border-t border-blue-500">
                    <FeatureItem text="Lighthouse Score: 98+" />
                    <FeatureItem text="Global CDN (35 Locations)" />
                    <FeatureItem text="Managed SSL Termination" />
                    <FeatureItem text="DDoS Protection Level 4" />
                 </div>
              </CardContent>
           </Card>

           <div className="p-8 rounded-[2.5rem] bg-zinc-900 border border-white/5">
                <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">System Status</h4>
                <div className="space-y-4">
                    <StatusLine label="Registry API" status="Online" color="green" />
                    <StatusLine label="Edge Nodes" status="Operational" color="green" />
                    <StatusLine label="DNS Resolver" status="Healthy" color="green" />
                </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function DnsRecordRow({ type, name, value, onCopy }: any) {
    return (
        <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between group hover:border-blue-500/20 transition-all">
            <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex flex-col items-center justify-center border border-white/5">
                    <span className="text-[10px] font-black text-blue-500 uppercase">{type}</span>
                </div>
                <div className="flex gap-10">
                    <div>
                        <p className="text-[8px] font-black text-zinc-600 uppercase mb-1 tracking-widest">Host</p>
                        <p className="text-sm font-mono text-white">{name}</p>
                    </div>
                    <div>
                        <p className="text-[8px] font-black text-zinc-600 uppercase mb-1 tracking-widest">Value</p>
                        <p className="text-sm font-mono text-white truncate max-w-[120px]">{value}</p>
                    </div>
                </div>
            </div>
            <Button variant="ghost" size="icon" className="text-zinc-600 group-hover:text-white" onClick={() => onCopy(value)}>
                <Copy className="h-4 w-4" />
            </Button>
        </div>
    )
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 text-xs font-bold">
            <CheckCircle2 className="h-4 w-4 text-blue-300" />
            <span className="uppercase tracking-widest">{text}</span>
        </div>
    )
}

function StatusLine({ label, status, color }: any) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">{label}</span>
            <div className="flex items-center gap-2">
                <div className={cn("w-1.5 h-1.5 rounded-full", color === 'green' ? "bg-green-500" : "bg-orange-500")} />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">{status}</span>
            </div>
        </div>
    )
}
