'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EntreSiteLogo } from '@/components/icons';
import { 
  Eye, 
  Rocket, 
  ChevronLeft, 
  Monitor, 
  Smartphone, 
  Tablet 
} from 'lucide-react';

interface EditorHeaderProps {
    onPreview: () => void;
    onPublish: () => void;
    onDeviceChange: (device: 'desktop' | 'tablet' | 'mobile') => void;
}

export function EditorHeader({ onPreview, onPublish, onDeviceChange }: EditorHeaderProps) {
  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-4 z-30">
      
      {/* Left: Back & Branding */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-5 w-5" />
        </Link>
        <div className="h-6 w-px bg-border" />
        <div className="flex items-center gap-2">
            <EntreSiteLogo className="h-5 w-5" />
            <span className="font-bold text-sm">Editor</span>
        </div>
      </div>

      {/* Center: Device Toggle */}
      <div className="hidden md:flex items-center bg-muted/50 p-1 rounded-lg">
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded hover:bg-background shadow-sm transition-all" onClick={() => onDeviceChange('desktop')}>
              <Monitor className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded hover:bg-background shadow-sm transition-all" onClick={() => onDeviceChange('tablet')}>
              <Tablet className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded hover:bg-background shadow-sm transition-all" onClick={() => onDeviceChange('mobile')}>
              <Smartphone className="h-4 w-4" />
          </Button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2" onClick={onPreview}>
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Preview</span>
          </Button>
          <Button size="sm" className="gap-2 bg-primary text-primary-foreground shadow-sm" onClick={onPublish}>
              <Rocket className="h-4 w-4" />
              Publish
          </Button>
      </div>

    </header>
  );
}
