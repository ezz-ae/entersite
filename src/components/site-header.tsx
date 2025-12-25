'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { 
  Sparkles, 
  User, 
  Menu, 
  X, 
  ArrowRight, 
  Layout, 
  Globe, 
  Bot, 
  Target,
  Home,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EntrestateLogo } from './icons';
import { Button } from './ui/button';

/**
 * THE GLOBAL NAVIGATION TRUTH
 * All app routing is managed through this central configuration.
 */

const NAV_LINKS = [
    { href: "/trending", label: "Market Experts", icon: Bot },
    { href: "/discover", label: "Project Data", icon: Globe },
    { href: "/blog", label: "Blog", icon: Layers },
    { href: "/docs", label: "System Docs", icon: Layout },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 z-[100] w-full transition-all duration-500",
        isScrolled 
          ? "h-16 bg-black/80 backdrop-blur-2xl border-b border-white/10" 
          : "h-24 bg-transparent border-b border-transparent"
      )}
    >
      <div className="container h-full flex items-center justify-between px-6 max-w-[1800px]">
        
        {/* Identity */}
        <div className="flex items-center gap-12">
          <Link href="/" className="group flex items-center gap-2">
            <EntrestateLogo />
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-white",
                  pathname === link.href ? "text-white" : "text-zinc-500"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hidden sm:block">
                <Button className="h-12 px-8 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-white/10 group">
                    Start Now <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
            </Link>
            
            <div className="hidden lg:block h-6 w-px bg-white/10 mx-2" />
            
            <Link href="/profile" className="hidden lg:block">
                <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full text-zinc-500 hover:text-white hover:bg-white/5">
                    <User className="h-5 w-5" />
                </Button>
            </Link>

            {/* Mobile Toggle */}
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 rounded-xl bg-white/5 text-zinc-400 hover:text-white transition-all"
            >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
        </div>
      </div>

      {/* Mobile Menu - The Truth Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 top-0 z-[110] bg-black p-8 lg:hidden flex flex-col justify-between"
          >
            <div className="space-y-12">
                <div className="flex justify-between items-center">
                    <EntrestateLogo />
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-white/5 text-white"><X className="h-6 w-6" /></button>
                </div>
                
                <nav className="flex flex-col gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-4xl font-black tracking-tighter transition-all flex items-center gap-4",
                                pathname === link.href ? "text-white" : "text-zinc-800"
                            )}
                        >
                            <link.icon className={cn("h-8 w-8", pathname === link.href ? "text-blue-600" : "text-zinc-900")} />
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/dashboard" className="text-4xl font-black tracking-tighter text-blue-600 flex items-center gap-4">
                         <Target className="h-8 w-8" /> Command Center
                    </Link>
                </nav>
            </div>

            <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                <Link href="/dashboard">
                    <Button className="w-full h-16 rounded-[2rem] bg-white text-black font-black text-xl shadow-2xl">
                        Start Now
                    </Button>
                </Link>
                <Link href="/profile">
                    <Button variant="outline" className="w-full h-16 rounded-[2rem] border-white/10 bg-white/5 text-white font-black text-xl">
                        Profile
                    </Button>
                </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
