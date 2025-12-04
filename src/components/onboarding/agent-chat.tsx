'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Loader2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AgentChatProps {
  initialPrompt: string;
  onSiteConfigReady: (config: any) => void;
}

export function AgentChat({ initialPrompt, onSiteConfigReady }: AgentChatProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Start the conversation
    setIsLoading(true);
    setMessages([{ role: 'user', content: `My goal is: "${initialPrompt}"` }]);
    
    // Simulate initial agent message based on prompt
    setTimeout(() => {
      let welcomeText = "Great! I can help with that. To get started, I just need a few details. What's the name of your brand or company?";
      if(initialPrompt.toLowerCase().includes('luxury')) {
          welcomeText = "An excellent choice. To craft a luxury brand, we'll need a distinctive name. What shall we call it?";
      }
      setMessages(prev => [...prev, { role: 'agent', content: welcomeText }]);
      setIsLoading(false);
    }, 1500);

  }, [initialPrompt]);
  
  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a hack to get the viewport element from the Radix ScrollArea
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const response = await fetch('/api/agents/marketing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: input,
                sessionId: 'onboarding-session' 
            }),
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        
        const data = await response.json();

        const agentMessage = { role: 'agent', content: data.text };
        setMessages(prev => [...prev, agentMessage]);

        // This is the CRITICAL part: check if the agent is done and has the payload
        if (data.isEndInteraction) {
            // Give a final confirmation message
            setMessages(prev => [...prev, { role: 'agent', content: "Perfect! I have everything I need. Generating your site now..." }]);
            
            // Wait a moment, then call the final onComplete function
            setTimeout(() => {
                onSiteConfigReady(data.parameters); // This contains the final site structure
            }, 2000);

        }

    } catch (error) {
        console.error("Agent chat error:", error);
        setMessages(prev => [...prev, { role: 'agent', content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-muted/20">
      <div className="p-6 border-b text-center">
        <h2 className="text-xl font-bold">Configure Your Site with AI</h2>
        <p className="text-sm text-muted-foreground">Chat with our AI agent to finalize your website details.</p>
      </div>

      <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
        <div className="space-y-6">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
              >
                {msg.role === 'agent' && (
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5" />
                  </div>
                )}
                <div
                  className={`max-w-md rounded-2xl p-4 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-background shadow-sm rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
                 {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5" />
                </div>
                <div className="max-w-md rounded-2xl p-4 text-sm bg-background shadow-sm rounded-bl-none">
                    <Loader2 className="h-5 w-5 animate-spin" />
                </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background">
        <div className="flex items-center gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                }
            }}
            placeholder="Type your response..."
            className="flex-1 resize-none h-12"
            rows={1}
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !input} className="h-12 w-12">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
