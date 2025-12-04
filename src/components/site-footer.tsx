'use client';

import React from 'react';
import Link from 'next/link';
import { EntreSiteLogo } from '@/components/icons';
import { Twitter, Linkedin, Github, Instagram } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="bg-black text-white border-t border-white/10 pb-12 pt-24">
      <div className="container mx-auto px-6 max-w-[1800px]">
        
        {/* Big Statement */}
        <div className="mb-24">
            <h2 className="text-[12vw] font-bold leading-none tracking-tighter text-white/10 select-none">
                ENTRESITE
            </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 md:gap-8 border-t border-white/10 pt-12">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 flex flex-col justify-between h-full">
            <div className="space-y-6">
                <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity w-fit">
                  <EntreSiteLogo className="h-8 w-8" />
                  <span className="font-bold text-xl">EntreSite AI</span>
                </Link>
                <p className="text-zinc-500 max-w-xs leading-relaxed">
                  The operating system for real estate. <br/>
                  Build. Market. Scale.
                </p>
            </div>
            <div className="flex gap-4 mt-8 md:mt-0">
              <SocialLink href="#" icon={Twitter} />
              <SocialLink href="#" icon={Linkedin} />
              <SocialLink href="#" icon={Instagram} />
              <SocialLink href="#" icon={Github} />
            </div>
          </div>

          {/* Links Columns - Minimalist */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-wider">Product</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/builder" className="hover:text-white transition-colors">Builder</Link></li>
              <li><Link href="/discover" className="hover:text-white transition-colors">Data Engine</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Ads Manager</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">CRM</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-6">
            <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-6">
            <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2 flex flex-col justify-end">
             <div className="h-full flex items-end">
                 <span className="text-zinc-600 text-xs font-mono">
                     © 2025 EntreSite Inc.
                 </span>
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon }: { href: string, icon: any }) {
  return (
    <Link href={href} className="text-zinc-500 hover:text-white transition-colors">
      <Icon className="h-5 w-5" />
    </Link>
  )
}
