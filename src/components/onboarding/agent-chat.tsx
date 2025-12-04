'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface AgentChatProps {
  initialPrompt?: string;
  onSiteConfigReady: (config: any) => void;
}

export function AgentChat({ initialPrompt, onSiteConfigReady }: AgentChatProps) {
  const [prompt, setPrompt] = useState(initialPrompt || "");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(`session-${Math.random().toString(36).substring(7)}`);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/agents/marketing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, sessionId })
      });
      
      const data = await response.json();

      // If the agent returns parameters (site config), we're done!
      if (data.parameters && Object.keys(data.parameters).length > 0) {
           // Simulate a small delay before transition for UX
           setTimeout(() => {
               onSiteConfigReady(data.parameters);
           }, 1500);
      } else {
          // If we get a follow-up question, we can handle it here if needed
          // For now, we assume it generates on the first try
          console.log("Agent response:", data.text);
      }

    } catch (error) {
      console.error("Agent error", error);
      // You could show a toast or an error message here
    } finally {
      // Don't set loading to false immediately, as we'll transition away on success
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full bg-card border rounded-2xl shadow-xl overflow-hidden p-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">Describe Your Vision</h3>
          <p className="text-sm text-muted-foreground">The AI will generate a site structure based on your prompt.</p>
        </div>
      </div>

      <div className="relative flex-1">
        <Textarea
          placeholder="I want to build a luxury landing page for a new Emaar project in Dubai Marina, focusing on high ROI for international investors..."
          className="w-full h-full text-base p-4 resize-none border-0 focus-visible:ring-0 bg-muted/30 placeholder:text-muted-foreground/50 rounded-xl"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
        {isLoading && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-xl">
                <div className="flex items-center gap-2 text-muted-foreground font-medium">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating site plan...
                </div>
            </div>
        )}
      </div>

      <div className="mt-4">
        <Button 
            size="lg" 
            className="w-full h-12 text-base font-semibold"
            disabled={isLoading || !prompt.trim()}
            onClick={handleGenerate}
        >
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Site
        </Button>
      </div>
    </div>
  );
}