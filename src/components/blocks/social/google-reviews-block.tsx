'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function GoogleReviewsBlock({
  headline = "VERIFIED INVESTOR SENTIMENT",
  rating = "4.9",
  reviewCount = "128",
}: { headline?: string, rating?: string, reviewCount?: string }) {
  
  return (
    <section className="py-32 bg-black text-white selection:bg-white/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-24 space-y-8">
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 bg-zinc-900 border border-white/5 px-6 py-2.5 rounded-full shadow-2xl"
            >
                <Image src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" width={18} height={18} />
                <span className="font-black text-[10px] uppercase tracking-[0.3em] text-zinc-400">Institutional Trust</span>
                <div className="w-px h-4 bg-white/10 mx-1" />
                <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="h-3 w-3 fill-white text-white" />
                    ))}
                </div>
                <span className="text-[10px] font-black text-white italic">{rating}</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none max-w-4xl">
                {headline}
            </h2>
            
            <p className="text-zinc-500 font-medium tracking-widest text-[10px] uppercase">
                Synchronized with Google Cloud Business API ({reviewCount} Verified Signals)
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {[
                { name: "Sarah Johnson", date: "2 days ago", text: "The system provided unparalleled precision for my off-plan entry. The data nodes were perfectly calibrated.", type: "Portfolio Strategy" },
                { name: "Mohammed Al-Fayed", date: "1 week ago", text: "Institutional-grade service and deep market knowledge. The autonomous engine handled the complexity seamlessly.", type: "Asset Acquisition" },
                { name: "David Chen", date: "3 weeks ago", text: "Professional execution from initialization to final handover. The digital portal experience is world-class.", type: "Market Analysis" },
            ].map((review, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                >
                    <Card className="border border-white/5 bg-zinc-950/50 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden group hover:border-white/20 transition-all duration-500">
                        <CardContent className="p-10 space-y-8">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center font-black italic text-lg shadow-2xl">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-sm uppercase tracking-tight text-white">{review.name}</h4>
                                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">{review.date}</p>
                                    </div>
                                </div>
                                <ShieldCheck className="h-5 w-5 text-zinc-800 group-hover:text-white transition-colors" />
                            </div>
                            
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <Star key={star} className="h-3 w-3 fill-white text-white" />
                                ))}
                            </div>
                            
                            <p className="text-lg text-zinc-400 font-light leading-relaxed italic">
                                "{review.text}"
                            </p>
                            
                            <div className="pt-6 border-t border-white/5">
                                <Badge className="bg-white/5 text-zinc-500 border-white/10 uppercase text-[8px] font-black tracking-[0.2em] px-3 py-1.5 rounded-full group-hover:text-white transition-colors">
                                    Logic: {review.type}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
