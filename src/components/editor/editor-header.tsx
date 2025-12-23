'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { EntreSiteLogo } from "@/components/icons";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { ChevronsUpDown, Monitor, Smartphone, Tablet, Rocket, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SitePage } from '@/lib/types';

interface EditorHeaderProps {
  onPreview: () => void;
  onPublish: () => void;
  onDeviceChange: (device: 'desktop' | 'tablet' | 'mobile') => void;
  activePage?: SitePage;
}

export function EditorHeader({ 
  onPreview, 
  onPublish, 
  onDeviceChange,
  activePage
}: EditorHeaderProps) {
  const [device, setDevice] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleDeviceChange = (newDevice: 'desktop' | 'tablet' | 'mobile') => {
    setDevice(newDevice);
    onDeviceChange(newDevice);
  }

  return (
    <header className="h-16 flex-shrink-0 bg-zinc-900 border-b border-white/10 flex items-center justify-between px-4 z-50">
      
      {/* Left Side */}
      <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
              <EntreSiteLogo className="h-5 w-5" />
          </Link>
      </div>

      {/* Center: Page & Device Controls */}
      <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 p-1 bg-zinc-800 border border-white/10 rounded-lg">
              <DeviceButton 
                  label="Desktop" 
                  icon={Monitor} 
                  isActive={device === 'desktop'} 
                  onClick={() => handleDeviceChange('desktop')} 
              />
              <DeviceButton 
                  label="Tablet" 
                  icon={Tablet} 
                  isActive={device === 'tablet'} 
                  onClick={() => handleDeviceChange('tablet')} 
              />
              <DeviceButton 
                  label="Mobile" 
                  icon={Smartphone} 
                  isActive={device === 'mobile'} 
                  onClick={() => handleDeviceChange('mobile')} 
              />
          </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-white/5 gap-2" onClick={onPreview}>
              <Eye className="h-4 w-4"/>
              Preview
          </Button>
          <Button 
            size="sm" 
            className="bg-green-600 hover:bg-green-700 text-white font-semibold gap-2 shadow-sm"
            onClick={onPublish}
          >
              <Rocket className="h-4 w-4"/>
              Publish
          </Button>
          <UserNav />
      </div>
    </header>
  );
}

const DeviceButton = ({ label, icon: Icon, isActive, onClick }: any) => (
    <button 
        onClick={onClick} 
        aria-label={`Switch to ${label} view`}
        className={cn(
            "p-2 rounded-md transition-colors",
            isActive 
                ? "bg-white/10 text-white"
                : "text-zinc-400 hover:bg-white/5"
        )}
    >
        <Icon className="h-4 w-4" />
    </button>
)
