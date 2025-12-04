'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { EntreSiteLogo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Layout, FileText, Book, User, Sparkles, Compass } from 'lucide-react';

export function SiteHeader() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/discover", label: "Discover" },
    { href: "/blog", label: "Blog" },
    { href: "/docs", label: "Docs" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <EntreSiteLogo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              EntreSite
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === link.href ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-between md:justify-end">
            <div className="md:hidden">
                <Link href="/" className="flex items-center space-x-2">
                    <EntreSiteLogo className="h-6 w-6" />
                </Link>
            </div>
            
            <div className="flex items-center space-x-2">
                <Link href="/builder">
                    <Button size="sm" className="h-9 rounded-full px-4 text-sm shadow-sm">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Launch App
                    </Button>
                </Link>
            </div>
        </div>
      </div>
    </header>
  );
}
