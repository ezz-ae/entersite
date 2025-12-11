import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Zap, Target, BarChart3, ArrowRight, X } from 'lucide-react';
import { GoogleAdsManager } from '@/components/ads/google-ads-manager';

export const metadata: Metadata = {
  title: 'AI Google Ads Manager | EntreSite',
  description: 'Launch high-converting real estate ad campaigns in 90 seconds. No agency required.',
};

export default function GoogleAdsProductPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />
         <div className="container mx-auto px-6 max-w-[1800px] relative z-10 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20 mb-4">
                <Zap className="h-3 w-3" />
                Automated Campaign Manager
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none max-w-4xl mx-auto">
                Stop Burning Budget. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Start Automating Growth.</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Launch expert-level Google Ads campaigns for your real estate projects in seconds. 
                Our AI writes the copy, targets the keywords, and optimizes the bid.
            </p>
            <div className="flex justify-center gap-4 pt-4">
                <Button size="lg" className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]">
                    Start Campaign Now
                </Button>
            </div>
         </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-zinc-950 border-y border-white/5">
          <div className="container mx-auto px-6 max-w-7xl">
              <div className="grid lg:grid-cols-5 gap-12 items-start">
                  <div className="lg:col-span-2 space-y-8 sticky top-24">
                      <h2 className="text-3xl font-bold">The Power of an Agency, <br/> The Speed of AI.</h2>
                      <div className="space-y-6">
                          <Feature 
                            icon={Target} 
                            title="Precision Targeting" 
                            desc="We automatically target high-intent keywords like 'Buy Villa in Dubai' instead of generic terms." 
                          />
                          <Feature 
                            icon={CheckCircle2} 
                            title="Zero Setup Required" 
                            desc="No Google Ads account needed. We handle the billing, pixels, and conversion tracking." 
                          />
                          <Feature 
                            icon={BarChart3} 
                            title="Real-Time ROI" 
                            desc="See exactly how much you spend per lead, not just clicks." 
                          />
                      </div>
                  </div>
                  
                  <div className="lg:col-span-3">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                          {/* We embed the actual component here for a live demo experience */}
                          <div className="p-1 bg-muted/20">
                             <GoogleAdsManager 
                                pageTitle="Luxury Marina Apartments" 
                                pageDescription="3-Bedroom waterfront apartments with 5-year payment plan starting from AED 2.5M."
                             />
                          </div>
                      </div>
                      <p className="text-center text-xs text-zinc-500 mt-4">
                          * Interactive Demo. Try generating ads above.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-black">
          <div className="container mx-auto px-6 max-w-4xl">
              <h2 className="text-3xl font-bold text-center mb-16">Why Automated?</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 text-center">
                      <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <X className="h-6 w-6 text-red-500" />
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-zinc-300">Traditional Agency</h3>
                      <ul className="space-y-3 text-sm text-zinc-500 text-left pl-4">
                          <li className="flex gap-2"><span className="text-red-500">×</span> High management fees (15-20%)</li>
                          <li className="flex gap-2"><span className="text-red-500">×</span> Slow setup (1-2 weeks)</li>
                          <li className="flex gap-2"><span className="text-red-500">×</span> Opaque reporting</li>
                          <li className="flex gap-2"><span className="text-red-500">×</span> Long-term contracts</li>
                      </ul>
                  </div>

                  <div className="p-8 rounded-2xl bg-gradient-to-b from-blue-900/20 to-zinc-900/50 border border-blue-500/20 text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
                      <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="h-6 w-6 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-white">EntreSite Ads</h3>
                      <ul className="space-y-3 text-sm text-zinc-400 text-left pl-4">
                          <li className="flex gap-2"><span className="text-blue-400">✓</span> Zero management fees</li>
                          <li className="flex gap-2"><span className="text-blue-400">✓</span> Instant launch (90 seconds)</li>
                          <li className="flex gap-2"><span className="text-blue-400">✓</span> Live, transparent dashboard</li>
                          <li className="flex gap-2"><span className="text-blue-400">✓</span> Pay as you go</li>
                      </ul>
                  </div>
              </div>
          </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function Feature({ icon: Icon, title, desc }: any) {
    return (
        <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                <Icon className="h-5 w-5 text-blue-400" />
            </div>
            <div>
                <h3 className="font-bold text-lg mb-1 text-white">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}
