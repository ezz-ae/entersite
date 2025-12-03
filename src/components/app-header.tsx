'use client';

import { usePathname } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';

export function AppHeader() {
  const pathname = usePathname();

  // Define routes where the main site header should be hidden
  const hiddenHeaderRoutes = [
    '/builder',
    '/dashboard',
    '/admin',
    '/profile',
  ];

  const shouldHideHeader = hiddenHeaderRoutes.some(route => pathname.startsWith(route));

  if (shouldHideHeader) {
    return null;
  }

  return <SiteHeader />;
}
