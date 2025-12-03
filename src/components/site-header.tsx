'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { EntreSiteLogo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Sparkles, User } from 'lucide-react';

export function SiteHeader() {
  const pathname = usePathname();
  
  const navLinks = [
    { href: "/trending", label: "Trending" },
    { href: "/blog", label: "Blog" },
    { href: "/docs", label: "Docs" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <EntreSiteLogo className="h-6 w-6 text-white" />
            <span className="hidden font-bold text-white sm:inline-block">
              EntreSite AI
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-white/80",
                  pathname?.startsWith(link.href) ? "text-white" : "text-white/60"
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
                    <EntreSiteLogo className="h-6 w-6 text-white" />
                    <span className="font-bold text-white">EntreSite</span>
                </Link>
            </div>
            
            <div className="flex items-center space-x-2">
                <Link href="/builder">
                    <Button size="sm" variant="secondary" className="h-8 rounded-full px-4 text-xs">
                        <Sparkles className="mr-2 h-3 w-3" />
                        Launch App
                    </Button>
                </Link>
                <Link href="/profile">
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-white/70 hover:text-white hover:bg-white/10">
                        <User className="h-4 w-4" />
                        <span className="sr-only">Profile</span>
                    </Button>
                </Link>
            </div>
        </div>
      </div>
    </header>
  );
}
