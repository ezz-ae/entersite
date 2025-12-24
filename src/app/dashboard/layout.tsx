'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Bell, Home, LineChart, Package, Package2, Settings, ShoppingCart, Users, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

const mainNavItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/sites", icon: Package, label: "Sites" },
    { href: "/dashboard/leads", icon: ShoppingCart, label: "Leads" },
    { href: "/dashboard/marketing", icon: LineChart, label: "Marketing" },
];

const secondaryNavItems = [
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <Link href="#" className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
                         <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <TooltipProvider>
                        {mainNavItems.map(item => (
                            <NavItem key={item.href} item={item} />
                        ))}
                    </TooltipProvider>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                    <TooltipProvider>
                         {secondaryNavItems.map(item => (
                            <NavItem key={item.href} item={item} />
                        ))}
                    </TooltipProvider>
                </nav>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                 <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    {/* This space can be used for breadcrumbs or page titles if needed */}
                    <div className="ml-auto flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                        <Link href="/builder" passHref>
                            <Button size="sm" className="h-8 gap-1">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">New Site</span>
                            </Button>
                        </Link>
                    </div>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

function NavItem({ item }: { item: typeof mainNavItems[0] }) {
    const pathname = usePathname();
    const isActive = pathname === item.href;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link href={item.href} className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8", isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground")}>
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
    );
}
