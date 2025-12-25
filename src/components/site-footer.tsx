'use client';

import React from 'react';
import Link from 'next/link';
import { EntrestateLogo } from '@/components/icons';
import { Twitter, Linkedin, Instagram, ArrowUpRight, Github } from 'lucide-react';

/**
 * THE GLOBAL FOOTER TRUTH
 * Connected to the central source of truth for navigation.
 */

const PRODUCT_LINKS = [
    { href: "/builder", label: "Architect" },
    { href: "/dashboard/chat-agent", label: "Chat Expert" },
    { href: "/dashboard/google-ads", label: "Ads Sync" },
    { href: "/dashboard/meta-audience", label: "Audience Pro" },
];

const RESOURCE_LINKS = [
    { href: "/discover", label: "Project Engine" },
    { href: "/blog", label: "Intelligence Blog" },
    { href: "/docs", label: "System Manual" },
    { href: "/trending", label: "Expert Marketplace" },
];

export function SiteFooter() {
  return (
    <footer className="bg-black text-white border-t border-white/5 pb-12 pt-40">
      <div className="container mx-auto px-6 max-w-[1800px]">
        
        {/* Dynamic Watermark */}
        <div className="mb-40 overflow-hidden">
            <h2 className="text-[22vw] font-black leading-none tracking-tighter text-white/5 select-none -mb-[0.15em] whitespace-nowrap">
                ENTRESTATE
            </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-16 md:gap-8 border-t border-white/5 pt-20">
          
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-5 flex flex-col justify-between">
            <div className="space-y-10">
                <Link href="/" className="hover:opacity-80 transition-opacity w-fit block">
                  <EntrestateLogo />
                </Link>
                <p className="text-zinc-500 max-w-sm leading-relaxed text-xl font-light">
                  The first AI Operating System designed specifically for the real estate industry. <br/>
                  Built to automate your growth.
                </p>
                <div className="flex gap-8">
                  <SocialLink href="#" icon={Twitter} />
                  <SocialLink href="#" icon={Linkedin} />
                  <SocialLink href="#" icon={Instagram} />
                </div>
            </div>
          </div>

          {/* Connected Menus */}
          <div className="col-span-1 md:col-span-2 space-y-10">
            <h4 className="font-black text-[10px] text-zinc-600 uppercase tracking-[0.4em]">Products</h4>
            <ul className="space-y-5 text-zinc-400 font-bold uppercase text-[10px] tracking-widest">
              {PRODUCT_LINKS.map(link => (
                <li key={link.href}>
                    <Link href={link.href} className="hover:text-blue-500 transition-colors flex items-center gap-2 group">
                        {link.label} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-10">
            <h4 className="font-black text-[10px] text-zinc-600 uppercase tracking-[0.4em]">Resources</h4>
            <ul className="space-y-5 text-zinc-400 font-bold uppercase text-[10px] tracking-widest">
              {RESOURCE_LINKS.map(link => (
                <li key={link.href}>
                    <Link href={link.href} className="hover:text-white transition-colors flex items-center gap-2 group">
                        {link.label} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Copyright */}
          <div className="col-span-2 md:col-span-3 flex flex-col justify-end items-end text-right mt-20 md:mt-0">
             <div className="space-y-3">
                 <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Headquarters</p>
                 <p className="text-white text-sm font-black">DIFC Innovation Hub</p>
                 <p className="text-zinc-600 text-sm font-medium">Dubai, United Arab Emirates</p>
             </div>
             <div className="mt-16 text-zinc-800 text-[9px] font-black uppercase tracking-[0.6em]">
                 © 2025 Entrestate OS v2.0
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon }: { href: string, icon: any }) {
  return (
    <Link href={href} className="text-zinc-700 hover:text-white transition-all hover:scale-110">
      <Icon className="h-6 w-6" strokeWidth={2.5} />
    </Link>
  )
}
