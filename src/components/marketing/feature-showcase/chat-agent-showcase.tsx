'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare, Upload, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function ChatAgentShowcase() {
  return (
    <section className="py-32 bg-background border-t border-border/40">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 text-xs font-medium border border-purple-500/20">
              <Bot className="h-3.5 w-3.5" />
              Your AI Employee
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.05]">
                Deploy a Sales Expert <br/>
                <span className="text-muted-foreground">That Never Sleeps.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Stop losing leads after hours. Our AI Chat Agent acts as a 24/7 sales assistant, answering complex questions about floor plans, payment terms, and ROI using your specific project data.
            </p>
            
            <ul className="space-y-4 pt-4">
                <li className="flex items-start gap-3">
                    <div className="bg-purple-100 p-1 rounded-full text-purple-600 mt-0.5"><CheckCircle className="h-4 w-4" /></div>
                    <span className="font-medium text-foreground/80">Trained on your Brochures & PDFs</span>
                </li>
                <li className="flex items-start gap-3">
                    <div className="bg-purple-100 p-1 rounded-full text-purple-600 mt-0.5"><CheckCircle className="h-4 w-4" /></div>
                    <span className="font-medium text-foreground/80">Captures & Qualifies Leads</span>
                </li>
                <li className="flex items-start gap-3">
                    <div className="bg-purple-100 p-1 rounded-full text-purple-600 mt-0.5"><CheckCircle className="h-4 w-4" /></div>
                    <span className="font-medium text-foreground/80">Escalates to WhatsApp instantly</span>
                </li>
            </ul>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-bl from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50" />
            <div className="relative aspect-[4/3] bg-muted/20 rounded-2xl border border-border/50 flex items-center justify-center p-8 backdrop-blur-sm">
                {/* Mockup of the Chat Agent Dashboard */}
                <Card className="w-full shadow-2xl border-border/50 overflow-hidden bg-background max-w-md mx-auto">
                    <div className="p-4 border-b border-border/50 bg-muted/30">
                        <h4 className="font-bold text-sm flex items-center gap-2 text-foreground">
                            <Bot className="h-4 w-4 text-purple-600" /> Agent Knowledge Base
                        </h4>
                    </div>
                    <div className="p-6 space-y-6">
                       
                       <div className="space-y-3">
                           <div className="p-4 border border-dashed border-border rounded-xl text-center bg-background hover:bg-muted/50 transition-colors cursor-pointer group">
                               <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-background border border-border">
                                   <Upload className="h-5 w-5 text-muted-foreground" />
                               </div>
                               <p className="text-sm font-medium text-foreground">Upload Project Brochure</p>
                               <p className="text-xs text-muted-foreground">PDF, DOCX, or TXT</p>
                           </div>
                       </div>

                       <div className="space-y-3">
                           <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                               <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-600">
                                       <Sparkles className="h-4 w-4" />
                                   </div>
                                   <div>
                                       <p className="text-sm font-semibold text-foreground">Training Complete</p>
                                       <p className="text-[10px] text-muted-foreground">Ready to answer questions.</p>
                                   </div>
                               </div>
                               <CheckCircle className="h-5 w-5 text-green-600" />
                           </div>
                       </div>
                       
                       <div className="space-y-2">
                           <div className="flex gap-2 justify-end">
                               <div className="bg-primary text-primary-foreground text-xs px-3 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">
                                   What is the payment plan for the 3-bedroom villa?
                               </div>
                           </div>
                            <div className="flex gap-2">
                               <div className="bg-muted text-foreground text-xs px-3 py-2 rounded-2xl rounded-tl-sm max-w-[80%]">
                                   The 3-bedroom units have a 60/40 plan: 10% down, 50% during construction, and 40% on handover in Q4 2025.
                               </div>
                           </div>
                       </div>

                    </div>
                </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CheckCircle(props: any) {
    return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
