'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Bot, Zap, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatWidgetBlockProps {
  agentName?: string;
  welcomeMessage?: string;
}

export function ChatWidgetBlock({
  agentName = "Market Advisor",
  welcomeMessage = "Hi! I'm your Entrestate AI. I've analyzed 3,750+ projects. How can I help you today?"
}: ChatWidgetBlockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'agent', text: string}[]>([
      { role: 'agent', text: welcomeMessage }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
      if (!input.trim() || isLoading) return;
      
      const userText = input;
      setMessages(prev => [...prev, { role: 'user', text: userText }]);
      setInput("");
      setIsLoading(true);
      
      try {
          const response = await fetch('/api/bot/main/chat', {
              method: 'POST',
              body: JSON.stringify({ message: userText, context: 'web_widget' }),
              headers: { 'Content-Type': 'application/json' }
          });
          
          if (response.ok) {
              const data = await response.json();
              setMessages(prev => [...prev, { role: 'agent', text: data.reply }]);
          } else {
              throw new Error("Chat failed");
          }
      } catch (e) {
          setMessages(prev => [...prev, { role: 'agent', text: "I'm currently updating my market database. Please try again in a moment." }]);
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="bg-zinc-950 border border-white/10 rounded-[2rem] shadow-2xl w-[380px] overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500 flex flex-col h-[550px] backdrop-blur-3xl">
            {/* Header */}
            <div className="bg-blue-600 p-6 flex items-center justify-between text-white relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h4 className="font-bold text-base leading-none mb-1 text-white">{agentName}</h4>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest opacity-80">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live Intelligence
                        </div>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-white/10 text-white rounded-full border-none" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                </Button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar bg-black/20">
                {messages.map((msg, i) => (
                    <div key={i} className={cn("flex", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                        <div className={cn(
                            "max-w-[85%] rounded-[1.5rem] px-5 py-3 text-sm leading-relaxed",
                            msg.role === 'user' 
                            ? "bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-900/20 font-medium" 
                            : "bg-zinc-900 text-zinc-100 border border-white/5 rounded-tl-none"
                        )}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-zinc-900 border border-white/5 rounded-[1.5rem] rounded-tl-none px-5 py-3">
                            <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-zinc-950 border-t border-white/5">
                <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-2 border border-white/5 group focus-within:border-blue-500/50 transition-all">
                    <input 
                        placeholder="Ask about prices, ROI, or areas..." 
                        className="flex-1 bg-transparent border-0 focus:ring-0 text-sm text-white placeholder:text-zinc-600 px-3 h-10 outline-none"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button 
                        onClick={handleSend}
                        disabled={isLoading}
                        className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </div>
                <div className="mt-4 flex items-center justify-center gap-4 text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                    <span className="flex items-center gap-1.5"><Sparkles className="h-3 w-3 text-blue-500" /> Powered by Vertex</span>
                    <span className="flex items-center gap-1.5"><Zap className="h-3 w-3 text-orange-500" /> Verified Data</span>
                </div>
            </div>
        </div>
      )}

      <button 
        className="h-16 w-16 rounded-[2rem] shadow-[0_0_50px_-10px_rgba(59,130,246,0.6)] bg-blue-600 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group relative overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <X className="h-8 w-8 relative z-10" /> : <MessageCircle className="h-8 w-8 relative z-10" />}
      </button>
    </div>
  );
}
