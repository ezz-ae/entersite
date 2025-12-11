'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Lock, ArrowRight, Loader2 } from 'lucide-react';

export function LeadInterestFormBlock({
  headline = "Register Your Interest",
  subtext = "Get exclusive access to floor plans and pricing before the public launch."
}: { headline?: string, subtext?: string }) {
  
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false);
      setStep(3); // Go to OTP verification
  };

  const handleVerifyOtp = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false);
      setStep(4); // Success
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <Card className="border-0 shadow-2xl overflow-hidden rounded-3xl bg-zinc-900 text-white">
            <div className="grid md:grid-cols-2">
                
                {/* Visual Side */}
                <div className="relative p-12 flex flex-col justify-center bg-gradient-to-br from-indigo-900 to-black">
                    <div className="space-y-6 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium border border-indigo-500/30">
                            <Lock className="h-3 w-3" /> Secure Registration
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight">{headline}</h2>
                        <p className="text-zinc-400">{subtext}</p>
                        
                        <div className="space-y-4 pt-4">
                             {["Priority Unit Selection", "Pre-Launch Pricing", "0% Commission"].map((item, i) => (
                                 <div key={i} className="flex items-center gap-3">
                                     <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                         <CheckCircle2 className="h-4 w-4 text-green-400" />
                                     </div>
                                     <span className="text-sm font-medium">{item}</span>
                                 </div>
                             ))}
                        </div>
                    </div>
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
                </div>

                {/* Form Side */}
                <div className="p-12 bg-zinc-950 flex flex-col justify-center">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                             <div>
                                 <h4 className="text-lg font-semibold mb-1">What are you looking for?</h4>
                                 <p className="text-xs text-zinc-500">Help us customize your offer.</p>
                             </div>
                             <div className="grid grid-cols-2 gap-3">
                                 {["Investment", "End Use"].map((opt) => (
                                     <Button key={opt} variant="outline" className="border-zinc-800 hover:bg-zinc-800 hover:text-white text-zinc-400 h-12 justify-start px-4">
                                         {opt}
                                     </Button>
                                 ))}
                             </div>
                             <div className="space-y-3">
                                 <Label>Budget Range</Label>
                                 <select className="w-full h-12 bg-zinc-900 border border-zinc-800 rounded-md px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500">
                                     <option>AED 1M - 2M</option>
                                     <option>AED 2M - 5M</option>
                                     <option>AED 5M+</option>
                                 </select>
                             </div>
                             <Button className="w-full h-12 bg-white text-black hover:bg-zinc-200" onClick={() => setStep(2)}>
                                 Continue <ArrowRight className="ml-2 h-4 w-4" />
                             </Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                            <div>
                                 <h4 className="text-lg font-semibold mb-1">Your Details</h4>
                                 <p className="text-xs text-zinc-500">We'll send a verification code.</p>
                             </div>
                             <div className="space-y-4">
                                 <div className="space-y-2">
                                     <Label>Full Name</Label>
                                     <Input className="bg-zinc-900 border-zinc-800 h-12" placeholder="John Doe" />
                                 </div>
                                 <div className="space-y-2">
                                     <Label>Mobile Number</Label>
                                     <Input 
                                        className="bg-zinc-900 border-zinc-800 h-12" 
                                        placeholder="+971 50 000 0000" 
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                     />
                                 </div>
                             </div>
                             <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleSendOtp} disabled={loading}>
                                 {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Code"}
                             </Button>
                             <Button variant="ghost" className="w-full text-zinc-500" onClick={() => setStep(1)}>Back</Button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                             <div className="text-center">
                                 <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                                     <Lock className="h-5 w-5 text-indigo-400" />
                                 </div>
                                 <h4 className="text-lg font-semibold mb-1">Verify Number</h4>
                                 <p className="text-xs text-zinc-500">Enter the 4-digit code sent to {phone}</p>
                             </div>
                             
                             <div className="flex justify-center gap-3">
                                 {[1, 2, 3, 4].map((i) => (
                                     <Input key={i} className="w-12 h-14 text-center text-xl bg-zinc-900 border-zinc-800 font-mono" maxLength={1} />
                                 ))}
                             </div>

                             <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white" onClick={handleVerifyOtp} disabled={loading}>
                                 {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify & Submit"}
                             </Button>
                             <p className="text-xs text-center text-zinc-500 cursor-pointer hover:text-white">Resend Code</p>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="text-center space-y-6 animate-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-500">
                                <CheckCircle2 className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">Success!</h3>
                                <p className="text-zinc-400 mt-2">Your interest has been registered. An agent will contact you shortly.</p>
                            </div>
                            <Button variant="outline" className="w-full border-zinc-800 text-white hover:bg-zinc-900">Return to Home</Button>
                        </div>
                    )}
                </div>
            </div>
        </Card>
      </div>
    </section>
  );
}
