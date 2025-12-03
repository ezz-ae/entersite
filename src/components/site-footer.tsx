'use client';

import React from 'react';
import Link from 'next/link';
import { EntreSiteLogo } from '@/components/icons';
import { Twitter, Linkedin, Github, Instagram, ArrowRight, MapPin, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SiteFooter() {
  return (
    <footer className="border-t border-border/5 bg-background/50 text-muted-foreground">
      <div className="container mx-auto max-w-[1600px] px-8 py-24">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 pb-16 border-b border-border/50">
            <div className="max-w-md space-y-6">
                <Link href="/" className="flex items-center gap-2 text-foreground transition-opacity hover:opacity-80">
                  <EntreSiteLogo className="h-8 w-8" />
                  <span className="font-bold text-xl tracking-tight">EntreSite</span>
                </Link>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The enterprise operating system for real estate growth. 
                  Automate your digital presence, manage campaigns, and scale your portfolio with AI.
                </p>
                <div className="flex gap-4 pt-2">
                  <SocialLink href="#" icon={Twitter} />
                  <SocialLink href="#" icon={Linkedin} />
                  <SocialLink href="#" icon={Instagram} />
                  <SocialLink href="#" icon={Github} />
                </div>
            </div>

            <div className="w-full lg:w-[400px] space-y-4 bg-muted/30 p-8 rounded-2xl border border-border/50">
                 <h4 className="font-semibold text-foreground tracking-tight text-lg">Join our newsletter</h4>
                 <p className="text-sm mb-4 text-muted-foreground">Market insights, product updates, and developer resources delivered weekly.</p>
                 <form className="flex flex-col gap-3">
                     <Input 
                        type="email" 
                        placeholder="work@company.com" 
                        className="bg-background border-border h-12 rounded-xl"
                     />
                     <Button className="h-12 w-full rounded-xl text-base font-medium shadow-sm">
                         Subscribe
                         <ArrowRight className="ml-2 h-4 w-4" />
                     </Button>
                 </form>
                 <p className="text-xs text-muted-foreground/70 pt-2">By subscribing, you agree to our Privacy Policy.</p>
            </div>
        </div>

        {/* Middle Section: Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-16">
          
          <div className="space-y-6">
            <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/builder" className="hover:text-primary transition-colors flex items-center gap-2">Site Builder <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded font-bold">NEW</span></Link></li>
              <li><Link href="/marketing-puzzle" className="hover:text-primary transition-colors">Template Library</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">CMS Integration</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Analytics Dashboard</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Google Ads Manager</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Enterprise Security</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">Use Cases</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="#" className="hover:text-primary transition-colors">Real Estate Developers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Brokerage Firms</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Property Management</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Marketing Agencies</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Freelance Agents</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">Developers</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">API Reference</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">SDKs & Tools</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Status Page</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Open Source</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Customers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Brand Kit</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-6">
             <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">Contact</h4>
             <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 flex-shrink-0 text-foreground" />
                    <span>123 Innovation Drive,<br/>Dubai Internet City,<br/>Dubai, UAE</span>
                </li>
                <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 flex-shrink-0 text-foreground" />
                    <a href="mailto:hello@entresite.ai" className="hover:text-foreground">hello@entresite.ai</a>
                </li>
                <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0 text-foreground" />
                    <a href="tel:+97140000000" className="hover:text-foreground">+971 4 000 0000</a>
                </li>
             </ul>
          </div>

        </div>
        
        {/* Bottom Section: Copyright & Legal */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium">
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
            <p>&copy; {new Date().getFullYear()} EntreSite AI, Inc.</p>
            <span className="hidden md:inline text-muted-foreground/30">•</span>
            <p className="text-muted-foreground">Built in Dubai, for the World.</p>
          </div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon }: { href: string, icon: any }) {
  return (
    <Link href={href} className="w-10 h-10 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300">
      <Icon className="h-5 w-5" />
    </Link>
  )
}
