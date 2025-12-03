'use client';

import React from 'react';
import Link from 'next/link';
import { EntreSiteLogo } from '@/components/icons';
import { Twitter, Linkedin, Github, Instagram, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black text-zinc-400">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Column 1: Brand & Socials */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 text-white">
              <EntreSiteLogo className="h-6 w-6" />
              <span className="font-bold text-lg">EntreSite AI</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-6">
              The operating system for real estate growth. Build, market, and scale your property business with AI.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={Twitter} />
              <SocialLink href="#" icon={Linkedin} />
              <SocialLink href="#" icon={Instagram} />
              <SocialLink href="#" icon={Github} />
            </div>
          </div>
          
          {/* Column 2: Product */}
          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wider uppercase text-xs">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/builder" className="hover:text-white transition-colors">Builder</Link></li>
              <li><Link href="/marketing-puzzle" className="hover:text-white transition-colors">Templates</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wider uppercase text-xs">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Community Forum</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">API Status</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wider uppercase text-xs">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Legal</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
             <h4 className="font-semibold text-white mb-4 tracking-wider uppercase text-xs">Stay up to date</h4>
             <p className="text-sm mb-4">Get the latest news, product updates, and real estate insights.</p>
             <form className="flex gap-2">
                 <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-zinc-900 border-zinc-700 h-10 text-white placeholder:text-zinc-500"
                 />
                 <Button size="icon" className="bg-white text-black hover:bg-zinc-200 h-10 w-10">
                     <ArrowRight className="h-4 w-4" />
                 </Button>
             </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} EntreSite AI, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon }: { href: string, icon: any }) {
  return (
    <Link href={href} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors">
      <Icon className="h-4 w-4" />
    </Link>
  )
}
