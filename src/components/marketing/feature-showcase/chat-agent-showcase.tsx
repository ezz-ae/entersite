'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare, Upload } from 'lucide-react';

export function ChatAgentShowcase() {
  return (
    <section className="py-24 bg-muted/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <Badge variant="outline" className="border-purple-500/20 bg-purple-500/5 text-purple-700">
              Your AI Employee
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Deploy an AI Agent Trained on Your Data</h2>
            <p className="text-lg text-muted-foreground">
              Stop losing leads after hours. Our AI Chat Agent acts as a 24/7 sales assistant, answering complex visitor questions about your specific projects, payment plans, and availability.
            </p>
            <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Train on PDFs, URLs, and text</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Captures lead information</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Escalates to human agents via WhatsApp</li>
            </ul>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] bg-muted/30 rounded-2xl border flex items-center justify-center p-8">
                {/* Mockup of the Chat Agent Dashboard */}
                <Card className="w-full shadow-xl">
                    <div className="p-4 border-b">
                        <h4 className="font-bold text-sm flex items-center gap-2">
                            <Bot className="h-4 w-4" /> Agent Training
                        </h4>
                    </div>
                    <div className="p-4 space-y-4">
                       <div className="p-4 border-2 border-dashed rounded-lg text-center bg-background">
                           <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                           <p className="text-sm font-medium">Upload Project Brochure.pdf</p>
                       </div>
                       <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                           <p className="text-sm text-green-800 font-medium">Training Complete</p>
                           <CheckCircle className="h-5 w-5 text-green-600" />
                       </div>
                    </div>
                </Card>
            </div>
          </div>
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
