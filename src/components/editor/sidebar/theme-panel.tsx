'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Palette, Type, Layout, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { useTheme as useNextTheme } from 'next-themes';

interface ThemePanelProps {
  onClose: () => void;
}

const THEME_COLORS = [
    { id: 'modern', label: 'Modern Teal', color: '#002F4B' },
    { id: 'luxury', label: 'Luxury Gold', color: '#D4AF37' },
    { id: 'corporate', label: 'Trust Blue', color: '#3B82F6' },
    { id: 'emerald', label: 'Emerald', color: '#10B981' },
    { id: 'ruby', label: 'Ruby Red', color: '#F43F5E' },
    { id: 'royal', label: 'Royal Purple', color: '#A855F7' },
    { id: 'black', label: 'Mono Black', color: '#000000' },
];

const FONTS = [
    { id: 'inter', label: 'Inter (Modern)' },
    { id: 'playfair', label: 'Playfair (Serif)' },
    { id: 'roboto', label: 'Roboto (Geometric)' },
];

export function ThemePanel({ onClose }: ThemePanelProps) {
  const { setBrandColor } = useTheme();
  const { theme, setTheme: setMode } = useNextTheme();

  return (
    <div className="w-80 border-l bg-background h-full flex flex-col z-20 shadow-[-10px_0_30px_-10px_rgba(0,0,0,0.1)] absolute right-0 top-0 bottom-0">
      <div className="h-14 border-b flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-2">
             <Palette className="h-4 w-4 text-primary" />
             <h3 className="font-semibold text-sm uppercase tracking-wider">Theme Settings</h3>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-8">
            
            {/* Color Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <Palette className="h-3 w-3" /> Brand Color
                </div>
                
                <div className="grid grid-cols-4 gap-3">
                    {THEME_COLORS.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => setBrandColor(c.color)}
                            className="group relative aspect-square rounded-full border-2 border-muted hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            style={{ backgroundColor: c.color }}
                            title={c.label}
                        >
                            <span className="sr-only">{c.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Mode Section */}
            <div className="space-y-4">
                 <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <Layout className="h-3 w-3" /> Appearance
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Button 
                        variant={theme === 'light' ? 'default' : 'outline'} 
                        onClick={() => setMode('light')}
                        className="gap-2 justify-start"
                    >
                        <Sun className="h-4 w-4" /> Light
                    </Button>
                    <Button 
                        variant={theme === 'dark' ? 'default' : 'outline'} 
                        onClick={() => setMode('dark')}
                        className="gap-2 justify-start"
                    >
                        <Moon className="h-4 w-4" /> Dark
                    </Button>
                </div>
            </div>

            {/* Typography Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <Type className="h-3 w-3" /> Typography
                </div>
                
                <div className="space-y-2">
                    {FONTS.map((font) => (
                        <div 
                            key={font.id} 
                            className="p-3 border rounded-lg hover:bg-muted cursor-pointer transition-colors flex items-center justify-between group"
                        >
                            <span className="text-sm">{font.label}</span>
                            {font.id === 'inter' && <div className="w-2 h-2 bg-primary rounded-full" />}
                        </div>
                    ))}
                </div>
                 <p className="text-xs text-muted-foreground mt-2">
                    Fonts are applied globally to headings and body text.
                </p>
            </div>

        </div>
      </ScrollArea>
    </div>
  );
}
