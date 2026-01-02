'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Phone, Mail, Clock, Send, ArrowRight, Loader2, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { captureLead } from "@/lib/leads";
import { useCampaignAttribution } from "@/hooks/useCampaignAttribution";

interface CtaFormBlockProps {
  headline?: string;
  subtext?: string;
  tenantId?: string;
  projectName?: string;
  siteId?: string;
}

export function CtaFormBlock({ 
    headline = "INITIALIZE PRIVATE INQUIRY", 
  subtext = "Direct connection to specialized property advisors. Response within 60 minutes.",
  tenantId = "public",
  projectName = "Asset Inquiry",
  siteId,
}: CtaFormBlockProps) {
  const { toast } = useToast();
  const attribution = useCampaignAttribution();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
        await captureLead({
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone: formData.phone,
            project: projectName || 'Asset Inquiry',
            source: 'cta-form-block',
            context: { page: 'cta-form', buttonId: 'cta-form-submit', service: 'viewing' },
            metadata: { message: formData.message, siteId },
            attribution: attribution ?? undefined,
            tenantId,
            siteId,
        });

        setIsSubmitted(true);
        toast({
            title: "Inquiry Logged",
            description: "Asset request has been synchronized with the advisor node.",
        });
    } catch (error) {
        console.error("Lead submission error:", error);
        toast({
            title: "Transmission Error",
            description: "Failed to synchronize request. Please retry.",
            variant: "destructive"
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-32 bg-black text-white selection:bg-white/10">
      
      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="max-w-6xl mx-auto bg-zinc-950 rounded-[3rem] shadow-2xl overflow-hidden border border-white/5">
          <div className="grid lg:grid-cols-2">
            
            {/* Left Side: Institutional Context */}
            <div className="p-16 flex flex-col justify-between relative bg-zinc-900/30 border-r border-white/5">
              <div className="space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black border border-white/5 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-8 shadow-inner">
                        <ShieldCheck className="h-3.5 w-3.5" /> Advisor Cluster Active
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic mb-6 leading-none">{headline}</h2>
                    <p className="text-xl text-zinc-500 font-light leading-relaxed">{subtext}</p>
                </motion.div>
                
                <div className="space-y-8 pt-4">
                    {[
                        { icon: Phone, title: "Direct Line", val: "+971 4 123 4567" },
                        { icon: Mail, title: "Email Node", val: "vip@entresite.ai" },
                        { icon: Clock, title: "Operations", val: "24/7 Global Access" }
                    ].map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-6 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center shadow-xl group-hover:scale-105 transition-all duration-500">
                                <item.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none mb-1.5">{item.title}</h4>
                                <p className="text-lg font-bold text-white tracking-tight uppercase italic">{item.val}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
              </div>

              <div className="mt-16 pt-10 border-t border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 flex items-center gap-2">
                      <Zap className="h-3 w-3 text-blue-500" /> WhatsApp Direct: <span className="text-white hover:underline cursor-pointer">Start Chat</span>
                  </p>
              </div>
            </div>

            {/* Right Side: Professional Form */}
            <div className="p-16 bg-black relative min-h-[700px]">
                <AnimatePresence mode="wait">
                    {isSubmitted ? (
                        <motion.div 
                            key="success"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="h-full flex flex-col items-center justify-center text-center space-y-8"
                        >
                            <div className="w-24 h-24 bg-white text-black rounded-3xl flex items-center justify-center shadow-2xl">
                                <CheckCircle2 className="h-12 w-12" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-4xl font-black italic uppercase tracking-tighter">Inquiry Logged</h3>
                                <p className="text-zinc-500 font-medium max-w-sm mx-auto">Asset request synchronized. A senior advisor node will respond within 60 minutes.</p>
                            </div>
                            <Button variant="outline" className="rounded-2xl px-10 h-14 border-white/10 hover:bg-white hover:text-black font-black uppercase tracking-widest text-[10px] transition-all" onClick={() => setIsSubmitted(false)}>
                                Reset Inquiry Node
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.form 
                            key="form"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1 italic">First Name</Label>
                                    <Input 
                                        required 
                                        className="h-14 bg-zinc-900 border-white/5 focus:border-white/20 transition-all rounded-xl font-bold uppercase italic text-lg"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1 italic">Last Name</Label>
                                    <Input 
                                        required 
                                        className="h-14 bg-zinc-900 border-white/5 focus:border-white/20 transition-all rounded-xl font-bold uppercase italic text-lg"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1 italic">Professional Email</Label>
                                <Input 
                                    type="email" 
                                    required 
                                    className="h-14 bg-zinc-900 border-white/5 focus:border-white/20 transition-all rounded-xl font-bold italic text-lg"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div className="space-y-3">
                                 <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1 italic">Phone Number</Label>
                                 <Input 
                                    required 
                                    placeholder="+971..." 
                                    className="h-14 bg-zinc-900 border-white/5 focus:border-white/20 transition-all rounded-xl font-bold italic text-lg"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                 />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1 italic">Inquiry Details</Label>
                                <Textarea 
                                    className="min-h-[160px] bg-zinc-900 border-white/5 focus:border-white/20 transition-all rounded-xl resize-none p-6 font-medium text-zinc-400"
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                />
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <Checkbox id="terms" required className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black" />
                                <label
                                    htmlFor="terms"
                                    className="text-[10px] font-bold uppercase tracking-tight text-zinc-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    I AGREE TO THE INSTITUTIONAL PRIVACY FRAMEWORK.
                                </label>
                            </div>

                            <Button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full h-20 text-2xl font-black bg-white text-black hover:bg-zinc-200 rounded-2xl shadow-2xl transition-all uppercase italic tracking-tighter gap-4"
                            >
                                {isSubmitting ? <Loader2 className="h-8 w-8 animate-spin" /> : "Transmit Request"}
                                {!isSubmitting && <ArrowRight className="h-6 w-6" />}
                            </Button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
