'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Phone, Mail, Clock, Send, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CtaFormBlockProps {
  headline?: string;
  subtext?: string;
}

export function CtaFormBlock({ 
    headline = "Schedule a Private Viewing", 
    subtext = "Our experts are ready to assist you in finding your dream property." 
}: CtaFormBlockProps) {
  return (
    <section className="relative py-32 overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-black/5 dark:border-white/5">
          <div className="grid lg:grid-cols-2">
            
            {/* Left Side: Context */}
            <div className="p-12 lg:p-16 flex flex-col justify-between relative bg-primary/5 dark:bg-primary/10">
              <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/50 border border-black/5 text-xs font-medium mb-6 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Available for Consultation
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground leading-[1.1]">{headline}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">{subtext}</p>
                </motion.div>
                
                <div className="space-y-8 pt-8">
                    {[
                        { icon: Phone, title: "Direct Line", val: "+971 4 123 4567" },
                        { icon: Mail, title: "Email Us", val: "vip@entresite.ai" },
                        { icon: Clock, title: "Working Hours", val: "Mon - Sun: 9am - 8pm" }
                    ].map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 border border-black/5">
                                <item.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-foreground/80">{item.title}</h4>
                                <p className="text-base font-medium text-foreground">{item.val}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-black/5 dark:border-white/5">
                  <p className="text-sm text-muted-foreground">
                      Prefer WhatsApp? <a href="#" className="underline hover:text-primary font-medium">Chat with us now</a>
                  </p>
              </div>
            </div>

            {/* Right Side: Intelligent Form */}
            <div className="p-12 lg:p-16 bg-background">
                <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">First Name</Label>
                            <Input id="firstName" placeholder="John" className="h-12 bg-muted/30 border-muted-foreground/10 focus:bg-background transition-colors rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Last Name</Label>
                            <Input id="lastName" placeholder="Doe" className="h-12 bg-muted/30 border-muted-foreground/10 focus:bg-background transition-colors rounded-xl" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" className="h-12 bg-muted/30 border-muted-foreground/10 focus:bg-background transition-colors rounded-xl" />
                    </div>
                    <div className="space-y-2">
                         <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Phone Number</Label>
                         <Input id="phone" type="tel" placeholder="+971..." className="h-12 bg-muted/30 border-muted-foreground/10 focus:bg-background transition-colors rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Message</Label>
                        <Textarea id="message" placeholder="I'm interested in..." className="min-h-[140px] bg-muted/30 border-muted-foreground/10 focus:bg-background transition-colors rounded-xl resize-none p-4" />
                    </div>
                    <Button type="button" size="lg" className="w-full h-14 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]">
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
