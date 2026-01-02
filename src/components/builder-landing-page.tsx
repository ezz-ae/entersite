'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  ShieldCheck,
  Loader2,
  Cpu,
  Zap,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { generateSiteAction } from '@/app/actions/ai';

interface BuilderLandingPageProps {
  onStartWithAI: (initialPrompt: string) => void;
  onChooseTemplate: () => void;
  onGeneratedData?: (data: any) => void;
}

export function BuilderLandingPage({ onStartWithAI, onChooseTemplate, onGeneratedData }: BuilderLandingPageProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusText, setStatusText] = useState("Reading Brochure...");

  const handleUpload = async () => {
    setIsUploading(true);
    
    // Stage 1: Extraction Simulation
    setStatusText("Finding Project Details...");
    for (let i = 0; i <= 40; i += 2) {
        setUploadProgress(i);
        await new Promise(r => setTimeout(r, 50));
    }

    // Stage 2: Synthesis Call
    setStatusText("Designing Your Website...");
    try {
        const result = await generateSiteAction("Built from institutional real estate brochure: High ROI, luxury amenities, off-plan launch.");
        
        for (let i = 41; i <= 100; i += 5) {
            setUploadProgress(i);
            await new Promise(r => setTimeout(r, 100));
        }

        setTimeout(() => {
            if (onGeneratedData) {
                onGeneratedData(result);
            } else {
                onStartWithAI("Built from brochure");
            }
        }, 500);

    } catch (error) {
        console.error("Builder Upload failed:", error);
        setIsUploading(false);
        setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-6 selection:bg-white/10 overflow-hidden">
        
        {/* Subtle Background Node */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_30%,_rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />

        <AnimatePresence>
            {isUploading && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center p-8"
                >
                    <div className="max-w-md w-full space-y-12 text-center">
                         <div className="relative mx-auto w-24 h-24">
                            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse" />
                            <Loader2 className="h-24 w-24 text-blue-500 animate-spin relative z-10" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Sparkles className="h-8 w-8 text-blue-400" />
                            </div>
                         </div>
                         
                         <div className="space-y-6">
                            <h2 className="text-4xl font-bold tracking-tight text-white leading-none">
                                {statusText}
                            </h2>
                            <div className="space-y-3">
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <motion.div 
                                        className="h-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.6)]"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${uploadProgress}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                                    <span>AI Engine Active</span>
                                    <span>{uploadProgress}% Done</span>
                                </div>
                            </div>
                         </div>
                         <p className="text-zinc-500 font-medium text-sm leading-relaxed max-w-xs mx-auto">
                            We're turning your PDF into a high-converting marketing website.
                         </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="w-full max-w-xl text-center space-y-12 relative z-10">
            
            <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-[9px] font-bold uppercase tracking-[0.4em] text-blue-400 mx-auto">
                    <Zap className="h-3 w-3" /> Marketing Made Easy
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-none uppercase">
                    Launch Your <br />
                    <span className="text-zinc-600">Project.</span>
                </h1>
                <p className="text-lg text-zinc-500 font-medium leading-relaxed max-w-md mx-auto">
                    Upload your project brochure and let our AI create your complete marketing website instantly.
                </p>
            </div>
            
            <div 
                onClick={handleUpload}
                className={cn(
                    "relative group border border-white/10 rounded-[2.5rem] p-16 transition-all duration-700 cursor-pointer overflow-hidden shadow-2xl",
                    "bg-zinc-950 hover:bg-zinc-900/80 hover:border-white/20"
                )}
            >
                <div className="flex flex-col items-center gap-10">
                    <div className="w-20 h-20 rounded-2xl bg-white text-black flex items-center justify-center shadow-2xl group-hover:scale-105 transition-all duration-700">
                        <UploadCloud className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-xl font-bold tracking-tight text-white uppercase">Click to Upload Brochure</p>
                        <p className="text-zinc-600 font-bold uppercase text-[9px] tracking-widest leading-none">Instant PDF to Website Creator</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-blue-500" /> Auto-Create Content</span>
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-blue-500" /> Capture Leads</span>
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <button 
                    onClick={onChooseTemplate}
                    className="text-zinc-600 font-bold uppercase text-[10px] tracking-[0.3em] hover:text-white transition-all border-b border-zinc-800 pb-1"
                >
                    Or build manually with templates
                </button>
            </div>
        </div>
    </div>
  )
}
