'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Globe, 
  Megaphone, 
  Users, 
  Bot, 
  Image as ImageIcon, 
  CreditCard, 
  Settings, 
  LogOut, 
  Palette,
  Briefcase
} from 'lucide-react';
import { EntreSiteLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Sites', href: '/dashboard/sites', icon: Globe },
    { name: 'Marketing & Ads', href: '/dashboard/marketing', icon: Megaphone },
    { name: 'CRM & Leads', href: '/dashboard/leads', icon: Users },
    { name: 'AI Tools', href: '/dashboard/ai-tools', icon: Bot },
    { name: 'Assets', href: '/dashboard/assets', icon: ImageIcon },
    { name: 'Brand Kit', href: '/dashboard/brand', icon: Palette },
    { name: 'Team', href: '/dashboard/team', icon: Users },
    { name: 'Jobs', href: '/admin/jobs', icon: Briefcase },
  ];
  
  const bottomNavigation = [
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-muted/20 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r flex flex-col fixed inset-y-0 z-50">
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/" className="flex items-center gap-2">
            <EntreSiteLogo className="h-6 w-6 text-foreground" />
            <span className="font-bold text-lg">EntreSite</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t space-y-1">
            {bottomNavigation.map((item) => {
                 const isActive = pathname === item.href;
                 return (
                   <Link
                     key={item.name}
                     href={item.href}
                     className={cn(
                       "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                       isActive 
                         ? "bg-muted text-foreground" 
                         : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                     )}
                   >
                     <item.icon className="h-4 w-4" />
                     {item.name}
                   </Link>
                 );
            })}
            
             <div className="!mt-4 bg-muted/50 p-3 rounded-lg flex items-center gap-3">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">John Doe</p>
                    <p className="text-xs text-muted-foreground truncate">Pro Plan</p>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-500 hover:bg-red-500/10">
                  <LogOut className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-w-0">
        <div className="p-6 lg:p-8 mx-auto w-full max-w-7xl">
            {children}
        </div>
      </main>
    </div>
  );
}
