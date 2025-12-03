'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: 'user' | 'agent';
  text: string;
}

interface AgentChatProps {
  initialPrompt?: string;
  onSiteConfigReady: (config: any) => void;
}

export function AgentChat({ initialPrompt, onSiteConfigReady }: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(initialPrompt || "");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(`session-${Math.random().toString(36).substring(7)}`);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial greeting or processing initial prompt
  useEffect(() => {
    if (initialPrompt) {
        handleSend(initialPrompt);
    } else {
        setMessages([{
            id: 'init',
            role: 'agent',
            text: "Hi! I'm your AI Architect. Tell me about the real estate website you want to build."
        }]);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/agents/marketing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId })
      });
      
      const data = await response.json();
      
      // Add agent message
      const agentMsg: Message = { id: (Date.now() + 1).toString(), role: 'agent', text: data.text };
      setMessages(prev => [...prev, agentMsg]);

      // If the agent returns parameters (site config), we're done!
      if (data.parameters && Object.keys(data.parameters).length > 0) {
           // Simulate a small delay before transition for UX
           setTimeout(() => {
               onSiteConfigReady(data.parameters);
           }, 1500);
      }

    } catch (error) {
      console.error("Chat error", error);
      setMessages(prev => [...prev, { 
          id: Date.now().toString(), 
          role: 'agent', 
          text: "I'm having trouble connecting to the server. Let's try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full bg-background border rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-muted/30 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
              <Bot className="h-6 w-6 text-primary" />
          </div>
          <div>
              <h3 className="font-semibold text-sm">AI Architect</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Online
              </p>
          </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10" ref={scrollRef}>
          {messages.map((msg) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                  <Avatar className="w-8 h-8 mt-1 border">
                      {msg.role === 'agent' ? (
                          <div className="w-full h-full bg-primary flex items-center justify-center text-primary-foreground">
                              <Bot className="h-4 w-4" />
                          </div>
                      ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                              <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                      )}
                  </Avatar>
                  
                  <div className={cn(
                      "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                      msg.role === 'user' 
                        ? "bg-primary text-primary-foreground rounded-tr-sm" 
                        : "bg-card border rounded-tl-sm"
                  )}>
                      {msg.text}
                  </div>
              </motion.div>
          ))}
          
          {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 max-w-[85%]">
                  <Avatar className="w-8 h-8 mt-1 border">
                       <div className="w-full h-full bg-primary flex items-center justify-center text-primary-foreground">
                          <Bot className="h-4 w-4" />
                       </div>
                  </Avatar>
                  <div className="bg-card border p-3 rounded-2xl rounded-tl-sm flex items-center gap-1 h-10">
                      <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
              </motion.div>
          )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-background border-t">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex gap-2"
          >
              <Input 
                placeholder="Type your reply..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary"
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="shrink-0">
                  <Send className="h-4 w-4" />
              </Button>
          </form>
      </div>
    </div>
  );
}
