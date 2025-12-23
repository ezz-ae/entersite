'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { EntreSiteLogo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Sparkles, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header 
        className={cn(
            "fixed top-0 z-50 w-full transition-all duration-500",
            isScrolled 
                ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-3" 
                : "bg-transparent border-b border-transparent py-6"
        )}
    >
      <div className="container flex items-center justify-between px-6 max-w-[1800px]">
        
        <div className="flex items-center gap-12 z-50 relative">
            <Link href="/" className="flex items-center space-x-2 group">
                <div className="bg-white text-black p-1.5 rounded-lg group-hover:scale-105 transition-transform">
                    <EntreSiteLogo className="h-5 w-5" />
                </div>
                <span className="font-bold text-xl tracking-tight text-white hidden sm:block">
                EntreSite
                </span>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8">
                <NavItem 
                    label="Product" 
                    isActive={activeDropdown === 'product'} 
                    onMouseEnter={() => setActiveDropdown('product')}
                    onMouseLeave={() => setActiveDropdown(null)}
                >
                    <div className="grid grid-cols-2 w-[500px] gap-2 p-2">
                        <NavCard title="Site Builder" desc="Drag & drop editor" href="/builder" />
                        <NavCard title="Data Engine" desc="3,750+ Projects" href="/discover" />
                        <NavCard title="Ads Manager" desc="Automated campaigns" href="/products/google-ads" />
                        <NavCard title="CRM" desc="Lead management" href="/products/crm" />
                        <NavCard title="Instagram Bot" desc="Auto-reply & growth" href="/products/instagram-bot" />
                        <NavCard title="SMS Marketing" desc="Bulk text campaigns" href="/products/sms-marketing" />
                        <NavCard title="Email Marketing" desc="Newsletter automation" href="/products/email-marketing" />
                    </div>
                </NavItem>
                
                <Link href="/marketing-puzzle" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    Templates
                </Link>
                <Link href="/docs" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    Docs
                </Link>
                <Link href="/blog" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                    Blog
                </Link>
            </nav>
        </div>
        
        <div className="flex items-center gap-4 z-50 relative">
            <Link href="/login" className="hidden sm:block text-sm font-medium text-white hover:opacity-80 transition-opacity">
                Log in
            </Link>
            <Link href="/builder">
                <Button size="sm" className="h-10 rounded-full px-6 text-sm font-semibold bg-white text-black hover:bg-zinc-200 border-0 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]">
                    Start Building
                </Button>
            </Link>
            
            <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden text-white hover:bg-white/10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
            >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black z-40 pt-24 px-6 flex flex-col gap-6 overflow-y-auto"
            >
                <div className="flex flex-col gap-8 pb-10">
                    <div className="space-y-4">
                        <div className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-2">Product</div>
                        <Link href="/builder" className="block text-2xl font-bold text-white hover:text-zinc-300">Site Builder</Link>
                        <Link href="/discover" className="block text-2xl font-bold text-white hover:text-zinc-300">Data Engine</Link>
                        <Link href="/products/google-ads" className="block text-2xl font-bold text-white hover:text-zinc-300">Ads Manager</Link>
                        <Link href="/products/crm" className="block text-2xl font-bold text-white hover:text-zinc-300">CRM</Link>
                        <Link href="/products/instagram-bot" className="block text-2xl font-bold text-white hover:text-zinc-300">Instagram Bot</Link>
                        <Link href="/products/sms-marketing" className="block text-2xl font-bold text-white hover:text-zinc-300">SMS Marketing</Link>
                        <Link href="/products/email-marketing" className="block text-2xl font-bold text-white hover:text-zinc-300">Email Marketing</Link>
                    </div>

                    <div className="space-y-4">
                        <div className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-2">Resources</div>
                        <Link href="/marketing-puzzle" className="block text-2xl font-bold text-white hover:text-zinc-300">Templates</Link>
                        <Link href="/blog" className="block text-2xl font-bold text-white hover:text-zinc-300">Blog</Link>
                        <Link href="/docs" className="block text-2xl font-bold text-white hover:text-zinc-300">Documentation</Link>
                    </div>

                    <div className="pt-8 border-t border-white/10 space-y-4">
                        <Link href="/login" className="block text-center text-lg font-medium text-white py-3 border border-white/20 rounded-xl hover:bg-white/5">
                            Log in
                        </Link>
                        <Link href="/builder" className="block">
                            <Button className="w-full h-14 text-lg font-bold rounded-xl bg-white text-black hover:bg-zinc-200">
                                Start Building Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavItem({ label, children, isActive, onMouseEnter, onMouseLeave }: any) {
    return (
        <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <button className={cn("flex items-center gap-1 text-sm font-medium transition-colors py-4", isActive ? "text-white" : "text-zinc-400 hover:text-white")}>
                {label} <ChevronDown className={cn("h-3 w-3 transition-transform", isActive && "rotate-180")} />
            </button>
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 pt-2"
                    >
                        <div className="bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden p-1">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function NavCard({ title, desc, href }: any) {
    return (
        <Link href={href} className="block p-3 rounded-lg hover:bg-white/5 transition-colors group">
            <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">{title}</div>
            <div className="text-xs text-zinc-500">{desc}</div>
        </Link>
    )
}
