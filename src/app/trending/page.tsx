'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Instagram, 
  Bot, 
  ArrowRight, 
  Zap, 
  Sparkles, 
  CreditCard,
  Check,
  Loader2,
  ExternalLink,
  Target // Import Target specifically
} from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function TrendingPage() {
  const [step, setStep] = useState(1); // 1: Connect, 2: Create, 3: Pay/Publish
  const [isConnecting, setIsConnecting] = useState(false);
  const [agentName, setAgentName] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const nextStep = () => setStep(step + 1);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
        setIsConnecting(false);
        nextStep();
    }, 1500);
  }

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
        setIsPublishing(false);
        setStep(4); // Success State
    }, 2000);
  }

  return (
    <main className="min-h-screen bg-black text-white py-40 px-6">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header Section */}
        <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-600/10 border border-pink-500/20 text-pink-500 text-[10px] font-bold uppercase tracking-widest">
                <Zap className="h-3 w-3" /> Trending: AI Sales Agent
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
                Turn your Instagram <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">into an Expert.</span>
            </h1>
            <p className="text-2xl text-zinc-500 font-light max-w-2xl mx-auto">
                Convert your direct messages into a high-performing real estate sales engine in 5 minutes.
            </p>
        </div>

        {/* The 5-Minute Flow UI */}
        <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-3xl rounded-[3rem] overflow-hidden shadow-2xl relative">
            
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
                <motion.div 
                    className="h-full bg-gradient-to-r from-pink-600 to-orange-600"
                    initial={{ width: '25%' }}
                    animate={{ width: `${(step / 4) * 100}%` }}
                />
            </div>

            <CardContent className="p-12 md:p-20">
                <AnimatePresence mode="wait">
                    
                    {/* Step 1: Connect Instagram */}
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-12 text-center"
                        >
                            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center mx-auto shadow-2xl shadow-pink-500/20">
                                <Instagram className="h-12 w-12 text-white" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl font-bold">1. Connect Instagram</h2>
                                <p className="text-zinc-500 text-lg">Grant Entrestate permission to automate your sales conversations.</p>
                            </div>
                            <Button 
                                onClick={handleConnect}
                                disabled={isConnecting}
                                className="h-16 px-12 rounded-2xl bg-white text-black font-black text-xl hover:bg-zinc-200 transition-all w-full md:w-auto"
                            >
                                {isConnecting ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : "Authorize Meta Agent"}
                            </Button>
                        </motion.div>
                    )}

                    {/* Step 2: Create Branded Agent */}
                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                                <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                                    <Bot className="h-8 w-8" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-white leading-none mb-2">2. Your Branded Agent</h2>
                                    <p className="text-zinc-500 font-medium">Define your agent's name and company focus.</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Expert Name</label>
                                    <Input 
                                        placeholder="e.g. David from Downtown Realty" 
                                        className="h-14 bg-black/40 border-white/10 rounded-xl"
                                        value={agentName}
                                        onChange={(e) => setAgentName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Company Mission</label>
                                    <Textarea 
                                        placeholder="We specialize in off-plan villas in Dubai South. Always capture WhatsApp numbers for serious investors." 
                                        className="min-h-[120px] bg-black/40 border-white/10 rounded-xl resize-none"
                                    />
                                </div>
                                <Button 
                                    onClick={nextStep}
                                    className="h-16 px-12 rounded-2xl bg-white text-black font-black text-xl w-full"
                                >
                                    Review & Activate <ArrowRight className="ml-2 h-6 w-6" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Pay & Publish */}
                    {step === 3 && (
                        <motion.div 
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-12 text-center"
                        >
                            <div className="w-24 h-24 rounded-[2rem] bg-zinc-800 flex items-center justify-center mx-auto border border-white/10">
                                <CreditCard className="h-12 w-12 text-zinc-500" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl font-bold">3. Final Activation</h2>
                                <p className="text-zinc-500 text-lg">One-time setup fee for your 24/7 Expert Agent.</p>
                                <div className="pt-6">
                                    <span className="text-7xl font-black text-white">$20</span>
                                    <span className="text-zinc-500 font-bold uppercase tracking-widest ml-2">USD</span>
                                </div>
                            </div>

                            <div className="max-w-sm mx-auto space-y-6">
                                <PayPalScriptProvider options={{ clientId: "test", currency: "USD" }}>
                                    <PayPalButtons 
                                        style={{ layout: "vertical", shape: "pill", color: "white", label: "pay" }} 
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [{ amount: { value: "20.00" } }],
                                                intent: "CAPTURE"
                                            });
                                        }}
                                        onApprove={handlePublish}
                                    />
                                </PayPalScriptProvider>
                                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Instant Publication after payment</p>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Success State */}
                    {step === 4 && (
                        <motion.div 
                            key="step4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-12 text-center py-10"
                        >
                            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                                <Check className="h-12 w-12 text-white stroke-[4px]" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-5xl font-black tracking-tighter">Your Agent is Live!</h2>
                                <p className="text-zinc-400 text-xl font-light">
                                    Instagram DMs are now being handled by <strong>{agentName || 'your expert'}</strong>.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/dashboard">
                                    <Button className="h-14 px-10 rounded-2xl bg-white text-black font-bold text-lg w-full sm:w-auto">
                                        Go to Dashboard
                                    </Button>
                                </Link>
                                <Button variant="outline" className="h-14 px-10 rounded-2xl border-white/10 bg-white/5 text-white font-bold text-lg w-full sm:w-auto">
                                    View Live Chat <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </CardContent>
        </Card>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
            <BenefitItem icon={Zap} title="Instant Response" desc="Replies in < 2 seconds." />
            <BenefitItem icon={Sparkles} title="UAE Data" desc="Knows all 3,750+ projects." />
            <BenefitItem icon={Target} title="Lead Capture" desc="Auto-sync to your CRM." />
        </div>

      </div>
    </main>
  );
}

function BenefitItem({ icon: Icon, title, desc }: any) {
    return (
        <div className="flex items-center gap-4 bg-zinc-900/30 p-6 rounded-[2rem] border border-white/5">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-400">
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <h4 className="font-bold text-white leading-tight">{title}</h4>
                <p className="text-xs text-zinc-500 mt-1">{desc}</p>
            </div>
        </div>
    )
}
