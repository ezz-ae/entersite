'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Globe, Mail, Megaphone, Search, User } from 'lucide-react';

// --- Service Configuration ---
const SERVICES = [
  {
    key: 'website',
    title: 'AI Websites',
    description: 'Generate a complete, conversion-focused website in minutes.',
    icon: Globe,
    href: '/website'
  },
  {
    key: 'sms-campaign',
    title: 'SMS Campaigns',
    description: 'Launch targeted SMS blasts that get opened and drive action.',
    icon: Megaphone,
    href: '/sms-campaign'
  },
   {
    key: 'ai-market-expert',
    title: 'AI Market Expert',
    description: 'Get real-time strategic insights on any market or competitor.',
    icon: Bot,
    href: '/ai-market-expert'
  },
  {
    key: 'email-campaign',
    title: 'Email Campaigns',
    description: 'Automated email sequences to nurture leads and retain customers.',
    icon: Mail,
    href: '/email-campaign'
  },
  {
    key: 'google-ads',
    title: 'Google Ads',
    description: 'Create and manage high-ROI Google Ad campaigns effortlessly.',
    icon: Search,
    href: '/google-ads'
  },
  {
    key: 'meta-lead-gen',
    title: 'Meta Lead Generation',
    description: 'Run powerful lead generation campaigns on Facebook and Instagram.',
    icon: User,
    href: '/meta-lead-gen'
  },
];

// --- Home Page Component ---
export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400 mb-4">Your AI Co-Pilot for Growth</h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto">Select a service to begin. Our intelligent system will guide you from idea to execution in record time.</p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service) => (
            <ServiceCard key={service.key} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Sub-component: ServiceCard ---
function ServiceCard({ service }: { service: typeof SERVICES[0] }) {
  const Icon = service.icon;
  return (
    <Link href={service.href} passHref>
      <div className="h-full bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col hover:bg-zinc-800/80 hover:border-blue-500/80 transition-all duration-300 group cursor-pointer">
        <div className="mb-4">
          <Icon className="h-8 w-8 text-zinc-400 group-hover:text-blue-400 transition-colors" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
        <p className="text-zinc-400 flex-grow">{service.description}</p>
        <div className="text-blue-500 font-semibold flex items-center mt-6 group-hover:text-blue-400 transition-colors">
          Get Started <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
