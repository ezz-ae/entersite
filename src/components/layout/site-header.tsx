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
        
        <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center space-x-2 group z-50 relative">
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
                    <div className="grid grid-cols-2 w-[400px] gap-2 p-2">
                        <NavCard title="Site Builder" desc="Drag & drop editor" href="/builder" />
                        <NavCard title="Data Engine" desc="3,750+ Projects" href="/discover" />
                        <NavCard title="Ads Manager" desc="Automated campaigns" href="/products/google-ads" />
                        <NavCard title="CRM" desc="Lead management" href="/products/crm" />
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
        
        <div className="flex items-center gap-4">
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
                className="lg:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "100vh" }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute top-0 left-0 w-full bg-black z-40 pt-24 px-6 flex flex-col gap-6 overflow-hidden"
            >
                <Link href="/builder" className="text-2xl font-bold text-white">Product</Link>
                <Link href="/discover" className="text-2xl font-bold text-white">Data</Link>
                <Link href="/marketing-puzzle" className="text-2xl font-bold text-white">Templates</Link>
                <Link href="/blog" className="text-2xl font-bold text-white">Blog</Link>
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
