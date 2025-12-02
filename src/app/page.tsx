'use client';

import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { EntreSiteLogo } from "@/components/icons";
import { PageBuilder } from "@/components/page-builder";
import { mockPage } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 font-semibold">
             <EntreSiteLogo className="h-6 w-6" />
             <span>EntreSite AI</span>
           </div>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold tracking-tight hidden md:block">{mockPage.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">SEO Settings</Button>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Publish Site</Button>
          <UserNav />
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
          <PageBuilder />
      </main>
    </div>
  );
}
