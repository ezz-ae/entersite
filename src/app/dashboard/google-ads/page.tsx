'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GoogleAdsDashboard } from '@/components/ai-tools/google-ads-dashboard';
import { GoogleAdsManager } from '@/components/ads/google-ads-manager';
import type { StoredMarketingPlan } from '@/lib/marketing-plans';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const GOOGLE_ADS_DRAFT_KEY = 'entrestate-google-ads-draft';

export default function GoogleAdsPage() {
  const [draftPlan, setDraftPlan] = useState<StoredMarketingPlan | null>(null);
  const [showPrefillBanner, setShowPrefillBanner] = useState(false);
  const [prefillResetKey, setPrefillResetKey] = useState(0);
  const [managerFocused, setManagerFocused] = useState(false);
  const managerRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = sessionStorage.getItem(GOOGLE_ADS_DRAFT_KEY);
    if (stored) {
      try {
        const parsedPlan: StoredMarketingPlan = JSON.parse(stored);
        setDraftPlan(parsedPlan);
        setShowPrefillBanner(true);
        toast({
          title: 'Applied marketing plan',
          description: `Loaded ${parsedPlan.response?.parameters?.projectName || 'your AI brief'} into Google Ads Manager.`,
        });
      } catch (error) {
        console.error('Failed to parse Google Ads draft', error);
      } finally {
        sessionStorage.removeItem(GOOGLE_ADS_DRAFT_KEY);
      }
    }
  }, [toast]);

  const handleClearPrefill = useCallback(() => {
    setDraftPlan(null);
    setShowPrefillBanner(false);
    setPrefillResetKey((key) => key + 1);
    setManagerFocused(false);
    toast({
      title: 'Plan cleared',
      description: 'You can now configure this campaign manually.',
    });
  }, [toast]);

  const planContext = useMemo(() => {
    if (!draftPlan) return null;
    const parameters = draftPlan.response?.parameters ?? {};
    const adConfig = parameters.adCampaignConfig ?? {};
    const keywords = adConfig.keywords ?? [];
    return {
      planName: parameters.projectName || 'Entrestate Campaign',
      summary: draftPlan.response?.text || 'Deploy high-intent search ads.',
      location: parameters.locationCity,
      budget: adConfig.budget,
      keywordsCount: keywords.length,
      createdAtLabel: draftPlan.createdAt ? new Date(draftPlan.createdAt).toLocaleString() : undefined,
      payload: {
        id: draftPlan.id,
        summary: draftPlan.response?.text,
        prompt: draftPlan.prompt,
        adCampaignConfig: adConfig,
        locationCity: parameters.locationCity,
        projectName: parameters.projectName,
        audience: draftPlan.audience,
        createdAt: draftPlan.createdAt,
      },
    };
  }, [draftPlan]);

  const pageTitle = planContext?.planName || 'Entrestate Campaign';
  const pageDescription = planContext?.summary || 'Deploy high-intent search ads.';

  useEffect(() => {
    if (planContext && !managerFocused) {
      requestAnimationFrame(() => {
        managerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setManagerFocused(true);
      });
    }
    if (!planContext && managerFocused) {
      setManagerFocused(false);
    }
  }, [planContext, managerFocused]);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {planContext && showPrefillBanner && (
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50/80 px-6 py-5 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-100">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                Applied Marketing Plan
              </div>
              <p className="text-sm text-emerald-800 dark:text-emerald-200">
                Prefilled Google Ads Manager with <span className="font-semibold">{planContext.planName}</span>
                {planContext.createdAtLabel ? ` • ${planContext.createdAtLabel}` : ''}.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {planContext.location && (
                  <Badge className="bg-white/80 text-emerald-700 dark:bg-black/40 dark:text-emerald-100">
                    {planContext.location}
                  </Badge>
                )}
                {typeof planContext.budget === 'number' && (
                  <Badge className="bg-white/80 text-emerald-700 dark:bg-black/40 dark:text-emerald-100">
                    Budget • ${planContext.budget}/day
                  </Badge>
                )}
                {planContext.keywordsCount > 0 && (
                  <Badge className="bg-white/80 text-emerald-700 dark:bg-black/40 dark:text-emerald-100">
                    {planContext.keywordsCount} keywords
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowPrefillBanner(false)}>
                Hide banner
              </Button>
              <Button variant="outline" size="sm" onClick={handleClearPrefill}>
                Clear prefill
              </Button>
            </div>
          </div>
        </div>
      )}
      <GoogleAdsDashboard />
      <div ref={managerRef}>
        <GoogleAdsManager
          pageTitle={pageTitle}
          pageDescription={pageDescription}
          prefillPlan={planContext?.payload}
          prefillResetKey={prefillResetKey}
          onPrefillReset={handleClearPrefill}
          initialTab={planContext ? 'keywords' : 'setup'}
        />
      </div>
    </div>
  );
}
