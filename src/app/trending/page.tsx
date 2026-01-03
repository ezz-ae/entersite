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
  Target,
  MessageCircle,
  Users,
  BarChart3,
  Globe,
  Clock,
  ShieldCheck,
  Cpu,
  TrendingUp
} from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export default function TrendingPage() {
  const [step, setStep] = useState(1);
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
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsPublishing(false);
    setStep(4);
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-pink-500/30 overflow-x-hidden">
      
      {/* 1. HIGH CONVERSION HERO */}
      <section className="relative pt-40 pb-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-pink-600/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-600/10 border border-pink-500/20 text-pink-500 text-[10px] font-bold uppercase tracking-[0.3em] mx-auto">
                    <Zap className="h-3.5 w-3.5" />
                    Trending Technology
                  </div>
                  
                  <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] text-white">
                      Automate your <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 italic">Instagram Sales.</span>
                  </h1>
                  
                  <p className="text-zinc-500 text-2xl md:text-3xl max-w-3xl mx-auto font-light leading-relaxed">
                      Deploy a 24/7 AI Real Estate Expert to your Instagram DMs. Convert followers into leads while you sleep.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                      <Button 
                        onClick={() => document.getElementById('activation-flow')?.scrollIntoView({ behavior: 'smooth' })}
                        className="h-20 px-12 rounded-full bg-white text-black font-black text-xl hover:scale-105 transition-all shadow-[0_0_50px_-10px_rgba(255,255,255,0.5)]"
                      >
                          Deploy Expert Agent <ArrowRight className="ml-2 h-6 w-6" />
                      </Button>
                      <button 
                        onClick={() => document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' })}
                        className="h-20 px-12 rounded-full border border-white/5 bg-white/5 text-white font-bold text-xl hover:bg-white/10 transition-all"
                      >
                          View Capabilities
                      </button>
                  </div>

                  <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40">
                      <div className="flex flex-col items-center gap-2">
                          <p className="text-4xl font-black text-white">2s</p>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Response Time</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                          <p className="text-4xl font-black text-white">3.5x</p>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Lead Volume</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                          <p className="text-4xl font-black text-white">100%</p>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">DM Coverage</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                          <p className="text-4xl font-black text-white">0</p>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Missed Inquiries</p>
                      </div>
                  </div>
              </motion.div>
          </div>
      </section>

      {/* 2. CAPABILITIES SECTION */}
      <section id="capabilities" className="py-40 bg-zinc-950 border-y border-white/5">
          <div className="container mx-auto px-6 max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  <div className="space-y-12">
                      <div className="space-y-6">
                          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-white">Not just a chatbot. <br/><span className="text-zinc-600">A Sales Professional.</span></h2>
                          <p className="text-zinc-500 text-xl font-light leading-relaxed">
                              Our AI agents are trained on the latest market data and your specific project inventory. They don't just "chat"—they qualify and convert.
                          </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <FeatureItem 
                            icon={Globe}
                            title="Multi-Language"
                            desc="Speaks 40+ languages natively. Close deals with international investors in their own tongue."
                          />
                          <FeatureItem 
                            icon={BarChart3}
                            title="Live Data Integration"
                            desc="Synced with Entrestate's 3,750+ UAE projects. Accurate prices, ROI, and availability."
                          />
                          <FeatureItem 
                            icon={Target}
                            title="Instant Qualification"
                            desc="Asks the right questions to determine budget, timeframe, and intent before notifying you."
                          />
                          <FeatureItem 
                            icon={MessageCircle}
                            title="WhatsApp Sync"
                            desc="Automatically pushes qualified leads directly to your private WhatsApp for the final close."
                          />
                      </div>
                  </div>

                  <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-[3rem] blur-3xl opacity-20 animate-pulse" />
                      <Card className="relative bg-zinc-900 border-white/10 rounded-[3rem] overflow-hidden p-8 shadow-2xl">
                          <div className="space-y-6">
                              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                  <div className="w-12 h-12 rounded-full bg-pink-600/20 flex items-center justify-center">
                                      <Instagram className="h-6 w-6 text-pink-500" />
                                  </div>
                                  <div>
                                      <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Live Interaction Simulation</p>
                                      <h4 className="text-lg font-bold text-white">Prospective Investor DM</h4>
                                  </div>
                              </div>
                              
                              <div className="space-y-4 font-medium">
                                  <div className="flex justify-start">
                                      <div className="bg-zinc-800 p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm text-zinc-200">
                                          "Hi! I saw the post about the new Dubai Creek project. What is the starting price and when is handover?"
                                      </div>
                                  </div>
                                  <div className="flex justify-end">
                                      <div className="bg-pink-600 p-4 rounded-2xl rounded-tr-none max-w-[80%] text-sm text-white shadow-lg">
                                          "Hello! That's Emaar's latest launch. Prices start from AED 1.8M with a 2027 handover. We have some exclusive corner units available. Would you like me to send the full payment plan to your WhatsApp?"
                                      </div>
                                  </div>
                                  <div className="flex justify-start">
                                      <div className="bg-zinc-800 p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm text-zinc-200">
                                          "Yes please, my number is +44 7723..."
                                      </div>
                                  </div>
                                  <div className="flex justify-end">
                                      <div className="bg-green-600 p-4 rounded-2xl rounded-tr-none max-w-[80%] text-sm text-white flex items-center gap-2 shadow-lg">
                                          <Check className="h-4 w-4" /> Lead Captured & Synced
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </Card>
                  </div>
              </div>
          </div>
      </section>

      {/* 3. ACTIVATION FLOW SECTION */}
      <section id="activation-flow" className="py-40 bg-black relative">
          <div className="container mx-auto px-6 max-w-4xl">
              <div className="text-center mb-20 space-y-4">
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">Instant <span className="italic text-zinc-600">Activation.</span></h2>
                  <p className="text-zinc-500 text-xl">Deploy your expert in under 5 minutes. No coding required.</p>
              </div>

              <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-3xl rounded-[3rem] overflow-hidden shadow-2xl relative">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
                      <motion.div 
                          className="h-full bg-gradient-to-r from-pink-600 to-orange-600"
                          initial={{ width: '25%' }}
                          animate={{ width: `${(step / 4) * 100}%` }}
                      />
                  </div>

                  <CardContent className="p-12 md:p-20">
                      <AnimatePresence mode="wait">
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
                                      <h2 className="text-4xl font-bold text-white">1. Connect Instagram</h2>
                                      <p className="text-zinc-500 text-lg">Grant Entrestate permission to automate your sales conversations via official Meta API.</p>
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
                                              className="h-14 bg-black/40 border-white/10 rounded-xl text-white"
                                              value={agentName}
                                              onChange={(e) => setAgentName(e.target.value)}
                                          />
                                      </div>
                                      <div className="space-y-2">
                                          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Company Mission</label>
                                          <Textarea 
                                              placeholder="We specialize in off-plan villas in Dubai South. Focus on Palm Jumeirah luxury rentals." 
                                              className="min-h-[120px] bg-black/40 border-white/10 rounded-xl resize-none text-white"
                                          />
                                      </div>
                                      <Button 
                                          onClick={nextStep}
                                          className="h-16 px-12 rounded-2xl bg-white text-black font-black text-xl w-full shadow-lg"
                                      >
                                          Review & Activate <ArrowRight className="ml-2 h-6 w-6" />
                                      </Button>
                                  </div>
                              </motion.div>
                          )}

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
                                      <h2 className="text-4xl font-bold text-white">3. Final Activation</h2>
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
                                                      purchase_units: [{ amount: { value: "20.00", currency_code: "USD" } }],
                                                      intent: "CAPTURE"
                                                  });
                                              }}
                                              onApprove={handlePublish}
                                          />
                                      </PayPalScriptProvider>
                                      <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Instant Activation after payment</p>
                                  </div>
                              </motion.div>
                          )}

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
                                  <h2 className="text-5xl font-black tracking-tighter text-white">Your Agent is Live!</h2>
                                  <p className="text-zinc-500 text-xl font-light">
                                      Instagram DMs for your account are now being handled by <strong>{agentName || 'your expert'}</strong>.
                                  </p>
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
          </div>
      </section>

      {/* 4. TRUST & SECURITY */}
      <section className="py-20 bg-zinc-950">
          <div className="container mx-auto px-6 max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <TrustItem 
                    icon={ShieldCheck}
                    title="Official Meta API"
                    desc="We use secure, approved Meta Graph API connections. Your account is always safe and compliant."
                  />
                  <TrustItem 
                    icon={Clock}
                    title="24/7 Availability"
                    desc="Investors from different time zones get instant answers while you rest. Never miss a midnight lead again."
                  />
                  <TrustItem 
                    icon={Cpu}
                    title="Continuous Learning"
                    desc="The agent gets smarter with every interaction, learning from your specific sales style and updated project data."
                  />
              </div>
          </div>
      </section>

      {/* 5. FOOTER CTA */}
      <section className="py-40 border-t border-white/5">
          <div className="container mx-auto px-6 text-center space-y-12">
              <h2 className="text-6xl font-black tracking-tighter text-white uppercase italic">Stop Missing <br/><span className="text-zinc-600">Sales.</span></h2>
              <p className="text-zinc-500 text-2xl font-light max-w-2xl mx-auto">
                  Every second your Instagram DM goes unanswered, an investor moves to the next agent. Start your automation today.
              </p>
              <Button 
                onClick={() => document.getElementById('activation-flow')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-24 px-20 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-black text-3xl shadow-2xl shadow-pink-900/40 transition-all hover:scale-105"
              >
                  Start Automation Now
              </Button>
          </div>
      </section>

    </main>
  );
}

function FeatureItem({ icon: Icon, title, desc }: any) {
    return (
        <div className="space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-pink-500/30 transition-all">
                <Icon className="h-6 w-6 text-zinc-400 group-hover:text-pink-500 transition-colors" />
            </div>
            <h4 className="text-xl font-bold text-white">{title}</h4>
            <p className="text-sm text-zinc-500 leading-relaxed font-light">{desc}</p>
        </div>
    )
}

function TrustItem({ icon: Icon, title, desc }: any) {
    return (
        <div className="p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 space-y-4">
            <Icon className="h-8 w-8 text-blue-500" />
            <h4 className="text-lg font-bold text-white">{title}</h4>
            <p className="text-sm text-zinc-500 font-light leading-relaxed">{desc}</p>
        </div>
    )
}
