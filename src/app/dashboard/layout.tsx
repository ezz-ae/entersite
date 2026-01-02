'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { 
  Home, 
  Settings, 
  Zap,
  Search,
  Instagram,
  Users,
  MessageSquare,
  Mail,
  Smartphone,
  Globe,
  Bell,
  Library,
  LifeBuoy,
  Target,
  Layout,
  Cpu,
  CreditCard,
  Briefcase,
  Megaphone
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { EntrestateLogo } from "@/components/icons";

/**
 * Standardized System Icons & Labels
 */
const mainNavItems = [
    { href: "/dashboard", icon: Home, label: "Overview" },
    { href: "/dashboard/marketing", icon: Megaphone, label: "Marketing Hub" },
    { href: "/dashboard/sites", icon: Layout, label: "Site Assets" },
    { href: "/dashboard/chat-agent", icon: MessageSquare, label: "Chat Experts" },
    { href: "/dashboard/google-ads", icon: Search, label: "Search Ads" },
    { href: "/dashboard/meta-audience", icon: Instagram, label: "Social Ads" },
    { href: "/dashboard/sms-marketing", icon: Smartphone, label: "SMS Broadcast" },
    { href: "/dashboard/email-marketing", icon: Mail, label: "Email Engine" },
    { href: "/dashboard/leads", icon: Users, label: "Lead CRM" },
];

const bottomNavItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/dashboard/sites", icon: Layout, label: "Sites" },
    { href: "/site", icon: Zap, label: "Build" },
    { href: "/dashboard/leads", icon: Users, label: "Leads" },
    { href: "/dashboard/settings", icon: Settings, label: "OS" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen w-full bg-black text-white selection:bg-blue-500/30">
            {/* 1. Desktop Sidebar (Prestige Design) */}
            <aside className="fixed inset-y-0 left-0 z-50 hidden w-24 flex-col border-r border-white/5 bg-zinc-950 sm:flex">
                <div className="flex h-24 items-center justify-center border-b border-white/5">
                    <Link href="/">
                        <EntrestateLogo showText={false} className="scale-75 hover:scale-90 transition-transform duration-500" />
                    </Link>
                </div>
                
                <nav className="flex flex-1 flex-col items-center gap-6 py-10 overflow-y-auto no-scrollbar">
                    <TooltipProvider delayDuration={0}>
                        {mainNavItems.map(item => (
                            <NavItem key={item.href} item={item} />
                        ))}
                    </TooltipProvider>
                </nav>
                
                <div className="mt-auto flex flex-col items-center gap-6 py-10 border-t border-white/5">
                    <TooltipProvider delayDuration={0}>
                         <NavItem item={{ href: "/dashboard/settings", icon: Settings, label: "System Config" }} />
                    </TooltipProvider>
                </div>
            </aside>

            {/* 2. Main Terminal Area */}
            <div className="flex flex-1 flex-col sm:pl-24 pb-24 sm:pb-0">
                 {/* Header Cluster */}
                 <header className="sticky top-0 z-40 flex h-20 items-center gap-4 border-b border-white/5 bg-black/60 backdrop-blur-2xl px-6 md:px-10">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">System OS</span>
                        </div>
                        <div className="h-4 w-px bg-white/10 hidden sm:block" />
                        <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest hidden md:block italic">AE-CLUSTER: DIFC-NODE-01</span>
                    </div>
                    
                    <div className="ml-auto flex items-center gap-4 md:gap-6">
                        <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl bg-zinc-900 border border-white/5">
                            <Cpu className="h-3.5 w-3.5 text-zinc-500" />
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Optimized</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-500 hover:text-white hover:bg-white/5 rounded-2xl relative transition-all group">
                            <Bell className="h-5 w-5 group-hover:scale-110" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-black" />
                        </Button>
                        <UserNav />
                    </div>
                </header>

                <main className="flex-1 p-6 md:p-12 lg:p-16 max-w-[1920px]">
                    {children}
                </main>
            </div>

            {/* 3. Mobile Navigation Bar (The "Bottom OS") */}
            <nav className="fixed bottom-0 left-0 right-0 z-[100] h-20 bg-zinc-950/80 backdrop-blur-2xl border-t border-white/10 flex sm:hidden items-center justify-around px-4 pb-2">
                {bottomNavItems.map((item) => {
                    const isActive = pathname === item.href;
                    const isBuild = item.label === "Build";
                    
                    return (
                        <Link 
                            key={item.href} 
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1.5 transition-all duration-300 relative",
                                isBuild ? "translate-y-[-24px]" : "flex-1"
                            )}
                        >
                            {isBuild ? (
                                <div className="w-16 h-16 rounded-[1.5rem] bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-600/40 border-4 border-black">
                                    <item.icon className="h-7 w-7 text-white" />
                                </div>
                            ) : (
                                <>
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                        isActive ? "bg-white/10 text-white" : "text-zinc-500"
                                    )}>
                                        <item.icon className={cn("h-5 w-5", isActive && "scale-110")} />
                                    </div>
                                    <span className={cn(
                                        "text-[9px] font-black uppercase tracking-widest transition-all",
                                        isActive ? "text-white" : "text-zinc-600"
                                    )}>
                                        {item.label}
                                    </span>
                                </>
                            )}
                            {isActive && !isBuild && (
                                <motion.div 
                                    layoutId="mobile-nav-indicator"
                                    className="absolute -bottom-1 w-1 h-1 bg-blue-500 rounded-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

function NavItem({ item }: { item: { href: string, icon: any, label: string } }) {
    const pathname = usePathname();
    const isActive = pathname === item.href;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link href={item.href} className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500 relative group", 
                    isActive 
                        ? "bg-white text-black shadow-2xl shadow-white/10" 
                        : "text-zinc-600 hover:text-white hover:bg-white/5"
                )}>
                    <item.icon className={cn("h-5 w-5 transition-transform duration-500", isActive ? "scale-110" : "group-hover:scale-110")} />
                    {isActive && (
                        <motion.div 
                            layoutId="active-nav-indicator"
                            className="absolute -right-3 w-1 h-8 bg-blue-600 rounded-l-full shadow-[0_0_15px_rgba(37,99,235,0.6)]"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-zinc-900 border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] ml-4 px-4 py-2 rounded-xl shadow-2xl backdrop-blur-xl">
                {item.label}
            </TooltipContent>
        </Tooltip>
    );
}
