'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface ChatWidgetBlockProps {
  agentName?: string;
  agentImageId?: string;
  welcomeMessage?: string;
  whatsappNumber?: string;
}

export function ChatWidgetBlock({
  agentName = "Sarah - Real Estate Expert",
  agentImageId = "user-avatar-1",
  welcomeMessage = "Hi there! 👋 I can help you find the best investment properties in Dubai. Ask me anything!",
  whatsappNumber = "+971500000000"
}: ChatWidgetBlockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'agent', text: string}[]>([
      { role: 'agent', text: welcomeMessage }
  ]);
  const [input, setInput] = useState("");

  const agentImage = PlaceHolderImages.find(p => p.id === agentImageId);

  const handleSend = () => {
      if (!input.trim()) return;
      setMessages([...messages, { role: 'user', text: input }]);
      setInput("");
      
      // Simulate AI response
      setTimeout(() => {
          setMessages(prev => [...prev, { role: 'agent', text: "That's a great question! Based on current market trends, off-plan properties in Dubai South are showing the highest appreciation potential." }]);
      }, 1000);
  };

  const openWhatsapp = () => {
      window.open(`https://wa.me/${whatsappNumber.replace('+', '')}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="bg-background border rounded-2xl shadow-2xl w-[350px] overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 flex flex-col h-[500px]">
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between text-primary-foreground">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                            {agentImage && <Image src={agentImage.imageUrl} alt={agentName} width={agentImage.width} height={agentImage.height} className="object-cover" />}
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-primary"></div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm">{agentName}</h4>
                        <p className="text-[10px] opacity-80">Online Now</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/20 text-white" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-muted/20 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                            msg.role === 'user' 
                            ? 'bg-primary text-primary-foreground rounded-tr-none' 
                            : 'bg-white border rounded-tl-none shadow-sm'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-background border-t">
                <div className="flex gap-2">
                    <Input 
                        placeholder="Type a message..." 
                        className="flex-1"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <Button size="icon" onClick={handleSend}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2 text-xs gap-2" onClick={openWhatsapp}>
                    <MessageCircle className="h-3 w-3 text-green-600" />
                    Continue on WhatsApp
                </Button>
            </div>
        </div>
      )}

      <Button 
        size="lg" 
        className="h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 transition-transform hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}
