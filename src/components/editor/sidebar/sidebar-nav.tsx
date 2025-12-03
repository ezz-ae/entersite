'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Layout, 
  FileText, 
  Settings, 
  Palette, 
  Globe, 
  BarChart, 
  Layers 
} from 'lucide-react';

interface SidebarNavProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export function SidebarNav({ activeView, setActiveView }: SidebarNavProps) {
  const navItems = [
    { id: 'pages', icon: FileText, label: 'Pages' },
    { id: 'blocks', icon: Layout, label: 'Add Blocks' },
    { id: 'layers', icon: Layers, label: 'Navigator' },
    { id: 'theme', icon: Palette, label: 'Theme' },
    { id: 'seo', icon: Globe, label: 'SEO & Meta' },
    { id: 'analytics', icon: BarChart, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-16 md:w-20 border-r bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center py-6 h-full z-20">
      <div className="flex-1 space-y-4">
        {navItems.map((item) => (
          <div key={item.id} className="relative group flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveView(item.id)}
              className={cn(
                "h-10 w-10 md:h-12 md:w-12 rounded-xl transition-all duration-200",
                activeView === item.id 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 md:h-6 md:w-6" />
            </Button>
            
            {/* Tooltip */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
