'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DomainManager } from '@/components/dashboard/settings/domain-manager';
import { Settings, Globe, Shield, Bell } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10 px-6 max-w-[1800px]">
      <div className="mb-12 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center">
            <Settings className="h-6 w-6 text-zinc-400" />
        </div>
        <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">System Settings</h1>
            <p className="text-xl text-muted-foreground font-light">Configure your infrastructure and domains.</p>
        </div>
      </div>

      <Tabs defaultValue="domain" className="space-y-10">
        <div className="border-b border-white/5">
            <TabsList className="bg-transparent h-auto p-0 gap-8">
                <TabsTrigger value="domain" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none pb-4 px-0 h-auto text-lg font-medium transition-all gap-2 text-zinc-500 data-[state=active]:text-white">
                    <Globe className="h-5 w-5" /> Domain Connection
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none pb-4 px-0 h-auto text-lg font-medium transition-all gap-2 text-zinc-500 data-[state=active]:text-white">
                    <Shield className="h-5 w-5" /> Security & SSL
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none pb-4 px-0 h-auto text-lg font-medium transition-all gap-2 text-zinc-500 data-[state=active]:text-white">
                    <Bell className="h-5 w-5" /> Webhooks
                </TabsTrigger>
            </TabsList>
        </div>

        <TabsContent value="domain">
          <DomainManager />
        </TabsContent>
        
        <TabsContent value="security" className="h-40 flex items-center justify-center text-zinc-600 font-mono text-xs uppercase tracking-widest bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
            Automated via Vercel Edge
        </TabsContent>
      </Tabs>
    </div>
  );
}
