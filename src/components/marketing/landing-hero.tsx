'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, 
  Loader2,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Cpu,
  Target,
  ArrowRightCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { captureLead } from '@/lib/leads';
import { useCampaignAttribution } from '@/hooks/useCampaignAttribution';
import { Button } from '@/components/ui/button';

const SITE_TYPES = [
    "Landing Pages",
    "Listing Sites",
    "Broker Portals",
    "Single Units",
    "Sales Events"
];

export function LandingHero() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [typeIndex, setTypeIndex] = useState(0);
  const router = useRouter();
  const attribution = useCampaignAttribution();

  useEffect(() => {
    const interval = setInterval(() => {
      setTypeIndex((prev) => (prev + 1) % SITE_TYPES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulateUpload = async () => {
    try {
      await captureLead({
        source: 'landing-hero',
        project: 'Brochure Upload Simulation',
        context: { page: 'landing', buttonId: 'hero-upload', service: 'builder' },
        attribution: attribution ?? undefined,
        tenantId: 'public',
      });
    } catch (error) {
      console.error('Failed to capture lead', error);
    }
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          router.push('/builder?method=upload');
        }, 500);
      }
    }, 100);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white selection:bg-blue-500 selection:text-white py-12 md:py-20 overflow-hidden">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-[0.05]" />
          <div className="absolute top-0 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/10 blur-[100px] md:blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-600/10 blur-[100px] md:blur-[150px] rounded-full animate-pulse" />
      </div>

      <div className="container relative z-10 max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center">
        
        <div className="w-full flex flex-col items-center space-y-8 md:space-y-16">
            
            {/* Status Badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 backdrop-blur-sm shadow-[0_0_20px_rgba(37,99,235,0.1)]"
            >
                <Sparkles className="h-3.5 w-3.5" /> Site Architect v2.0 Live
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4 md:space-y-8 text-center max-w-5xl">
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[1] text-white uppercase">
                   PDF TO <br/>
                   <div className="min-h-[1.1em] relative flex items-center justify-center mt-2 md:mt-4">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={SITE_TYPES[typeIndex]}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 drop-shadow-[0_0_30px_rgba(37,99,235,0.3)] block w-full px-4"
                            >
                                {SITE_TYPES[typeIndex]}
                            </motion.span>
                        </AnimatePresence>
                   </div>
                </h1>
                <p className="text-zinc-500 text-base md:text-xl lg:text-2xl max-w-2xl mx-auto font-medium leading-relaxed px-4">
                    Convert brochures into <span className="text-white">sales engines</span> in seconds. Automated structure and AI copy instantly.
                </p>
            </div>

            {/* The Dropzone / Action Area */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="w-full max-w-2xl flex flex-col items-center px-4"
            >
                <div 
                    onClick={handleSimulateUpload}
                    className={cn(
                        "relative group w-full p-8 md:p-16 border border-white/10 rounded-[2.5rem] md:rounded-[4rem] flex flex-col items-center justify-center transition-all duration-700 cursor-pointer overflow-hidden",
                        isUploading 
                            ? "bg-zinc-900 border-blue-500/50" 
                            : "bg-zinc-950/50 hover:bg-zinc-900/40 hover:border-white/20 shadow-[0_20px_60px_-20px_rgba(0,0,0,1)]"
                    )}
                >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <AnimatePresence mode="wait">
                        {!isUploading ? (
                            <motion.div 
                                key="idle"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="flex flex-col items-center gap-6 md:gap-10 text-center relative z-10"
                            >
                                <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] bg-white text-black flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all duration-700 group-hover:scale-110 group-hover:rotate-3">
                                    <UploadCloud className="h-8 w-8 md:h-10 md:w-10" />
                                </div>
                                <div className="space-y-2 md:space-y-4">
                                    <p className="text-2xl md:text-4xl font-bold tracking-tight text-white uppercase">Select Project PDF</p>
                                    <p className="hidden sm:block text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-widest">Deploy Automated Sales Hub</p>
                                </div>
                                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
                                    <BadgeItem label="AI Content" />
                                    <BadgeItem label="Leads" />
                                    <BadgeItem label="Instant" />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="uploading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full max-w-sm flex flex-col items-center gap-8 md:gap-12 relative z-10"
                            >
                                <div className="space-y-4 md:space-y-6 w-full text-center">
                                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-2">
                                        <span className="animate-pulse">Building Assets</span>
                                        <span className="font-mono">{uploadProgress}%</span>
                                    </div>
                                    <div className="h-1.5 md:h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <motion.div 
                                            className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 animate-pulse">Designing Hub</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Bottom Navigation */}
                <div className="mt-8 md:mt-16">
                    <Link href="/builder">
                        <button className="group flex items-center gap-3 text-zinc-600 hover:text-white transition-all font-bold uppercase text-[10px] tracking-widest">
                            Skip to Templates
                            <ArrowRightCircle className="h-4 w-4 text-zinc-800 group-hover:text-blue-500 transition-colors" />
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
      </div>

    </section>
  );
}

function BadgeItem({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <CheckCircle2 className="h-3 w-3 text-blue-500" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">{label}</span>
        </div>
    )
}

function CheckCircle2(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}
