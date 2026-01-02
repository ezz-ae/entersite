'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MetaAdsManager } from '@/components/ads/meta-ads-manager';
import { AudienceBuilderTool } from '@/components/ai-tools/audience-builder-tool';
import type { StoredMarketingPlan } from '@/lib/marketing-plans';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Users, Zap } from 'lucide-react';

const META_ADS_DRAFT_KEY = 'entrestate-meta-ads-draft';

export default function MetaAudiencePage() {
  const [draftPlan, setDraftPlan] = useState<StoredMarketingPlan | null>(null);
  const [showPrefillBanner, setShowPrefillBanner] = useState(false);
  const [prefillResetKey, setPrefillResetKey] = useState(0);
  const [managerFocused, setManagerFocused] = useState(false);
  const managerRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = sessionStorage.getItem(META_ADS_DRAFT_KEY);
    if (stored) {
      try {
        const parsedPlan: StoredMarketingPlan = JSON.parse(stored);
        setDraftPlan(parsedPlan);
        setShowPrefillBanner(true);
        toast({
          title: 'Meta Strategy Loaded',
          description: `Imported AI brief for ${parsedPlan.response?.parameters?.projectName || 'your project'} into Meta Ads Manager.`,
        });
      } catch (error) {
        console.error('Failed to parse Meta Ads draft', error);
      } finally {
        sessionStorage.removeItem(META_ADS_DRAFT_KEY);
      }
    }
  }, [toast]);

  const handleClearPrefill = useCallback(() => {
    setDraftPlan(null);
    setShowPrefillBanner(false);
    setPrefillResetKey((key) => key + 1);
    setManagerFocused(false);
    toast({
      title: 'Strategy Reset',
      description: 'You can now configure your social campaign from scratch.',
    });
  }, [toast]);

  const planContext = useMemo(() => {
    if (!draftPlan) return null;
    const parameters = draftPlan.response?.parameters ?? {};
    return {
      planName: parameters.projectName || 'Social Launch Campaign',
      summary: draftPlan.response?.text || 'Targeting high-value leads on FB/IG.',
      location: parameters.locationCity,
      audience: draftPlan.audience || 'Luxury Real Estate Investors',
      createdAtLabel: draftPlan.createdAt ? new Date(draftPlan.createdAt).toLocaleString() : undefined,
    };
  }, [draftPlan]);

  useEffect(() => {
    if (planContext && !managerFocused) {
      requestAnimationFrame(() => {
        managerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setManagerFocused(true);
      });
    }
  }, [planContext, managerFocused]);

  return (
    <div className="space-y-16 pb-20 animate-in fade-in duration-700">
      
      {planContext && showPrefillBanner && (
        <div className="rounded-[2rem] border border-pink-500/20 bg-pink-500/5 px-8 py-6 text-white backdrop-blur-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-pink-500">
                <Sparkles className="h-4 w-4" />
                AI Orchestration Active
              </div>
              <p className="text-xl font-bold tracking-tight">
                Imported <span className="text-pink-400 italic uppercase">{planContext.planName}</span> Strategy
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {planContext.location && (
                  <Badge className="bg-white/5 text-zinc-300 border-white/10 uppercase text-[10px] font-bold tracking-widest px-3 py-1">
                    {planContext.location}
                  </Badge>
                )}
                <Badge className="bg-white/5 text-zinc-300 border-white/10 uppercase text-[10px] font-bold tracking-widest px-3 py-1">
                  <Users className="h-3 w-3 mr-1.5" /> {planContext.audience}
                </Badge>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white uppercase font-black text-[10px] tracking-widest" onClick={() => setShowPrefillBanner(false)}>
                Dismiss
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl border-white/10 bg-white/5 text-zinc-300 uppercase font-black text-[10px] tracking-widest px-6" onClick={handleClearPrefill}>
                Reset Strategy
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Audience Intelligence Tool */}
      <div className="space-y-6">
          <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
                  <Users className="h-5 w-5 text-blue-500" />
              </div>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">Audience Synthesis</h2>
          </div>
          <AudienceBuilderTool />
      </div>

      {/* 2. Meta Ads Manager */}
      <div ref={managerRef} className="pt-12 border-t border-white/5">
        <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-2xl bg-pink-600/10 flex items-center justify-center border border-pink-500/20 text-pink-500">
                <Zap className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Campaign Execution</h2>
        </div>
        <MetaAdsManager
          pageTitle={planContext?.planName || 'Real Estate Launch'}
          pageDescription={planContext?.summary || 'Targeting high-net-worth investors in the UAE.'}
          initialLocation={planContext?.location || 'Dubai, UAE'}
        />
      </div>
    </div>
  );
}
