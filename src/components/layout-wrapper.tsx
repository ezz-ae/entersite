'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isEditor = pathname?.startsWith('/builder');
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <>
      {(!isEditor && !isDashboard) && <SiteHeader />}
      <div className="min-h-screen">
          {children}
      </div>
      {(!isEditor && !isDashboard) && <SiteFooter />}
    </>
  );
}
