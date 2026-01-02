'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  featureName?: string;
}

export function PaymentModal({ open, onOpenChange, onSuccess, featureName = "Pro Features" }: PaymentModalProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentSuccess = async (details: any) => {
    setIsProcessing(true);
    try {
        // Here you would verify the payment with your backend
        // await fetch('/api/billing/verify', { ... })
        
        toast({
            title: "Upgrade Successful!",
            description: "Welcome to Entrestate Pro. All features are now unlocked.",
        });
        
        if (onSuccess) onSuccess();
        onOpenChange(false);
        router.refresh();
    } catch (error) {
        toast({
            title: "Payment Error",
            description: "Something went wrong. Please try again.",
            variant: "destructive"
        });
    } finally {
        setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-950 border-white/10 text-white rounded-[2rem] p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-900 p-8 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
             <div className="relative z-10 space-y-4">
                 <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-md border border-white/20">
                     <Zap className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                 </div>
                 <DialogTitle className="text-3xl font-bold tracking-tight text-white">Upgrade to Pro</DialogTitle>
                 <DialogDescription className="text-blue-100 font-medium text-base">
                     Unlock {featureName} and launch unlimited campaigns.
                 </DialogDescription>
             </div>
        </div>

        <div className="p-8 space-y-8">
            <div className="space-y-4">
                <BenefitItem text="Launch Unlimited Sites & Ads" />
                <BenefitItem text="Access Real-Time Market Data" />
                <BenefitItem text="Deploy AI Sales Agents" />
                <BenefitItem text="Remove Entrestate Branding" />
            </div>

            <div className="text-center space-y-1">
                <p className="text-4xl font-bold tracking-tight text-white">$19 <span className="text-lg text-zinc-500 font-medium">/ month</span></p>
                <p className="text-xs text-zinc-500 font-medium">Cancel anytime. Secure payment.</p>
            </div>

            <div className="min-h-[150px]">
                <PayPalScriptProvider options={{ clientId: "test", currency: "USD" }}>
                     <PayPalButtons 
                        style={{ layout: "vertical", shape: "pill", color: "blue", label: "subscribe" }} 
                        createSubscription={(data, actions) => {
                            return actions.subscription.create({
                                'plan_id': 'P-3RX065706M3469222L5IFM4I' // Replace with your actual Plan ID
                            });
                        }}
                        onApprove={async (data, actions) => {
                            await handlePaymentSuccess(data);
                        }}
                     />
                </PayPalScriptProvider>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                <ShieldCheck className="h-3 w-3" /> Encrypted & Secure
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function BenefitItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span className="text-sm font-medium text-zinc-300">{text}</span>
        </div>
    )
}
