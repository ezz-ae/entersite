import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { MessageSquare, Zap, Target, BarChart3, Smartphone } from 'lucide-react';
import { SmsCampaignDashboard } from '@/components/messaging/sms-dashboard';

export const metadata: Metadata = {
  title: 'AI SMS Marketing | EntreSite',
  description: 'Send high-converting bulk SMS campaigns with AI personalization. Reach clients instantly.',
};

export default function SmsMarketingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-green-500/30 font-sans">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black pointer-events-none" />
         <div className="container mx-auto px-6 max-w-[1800px] relative z-10 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20 mb-4">
                <Smartphone className="h-3 w-3" />
                Direct-to-Phone Marketing
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none max-w-4xl mx-auto">
                98% Open Rates. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Instantly.</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Bypass the inbox. Reach your leads where they are looking. 
                Our AI writes personalized SMS blasts that get replies, not opt-outs.
            </p>
            <div className="flex justify-center gap-4 pt-4">
                <Button size="lg" className="h-14 px-8 rounded-full bg-green-600 hover:bg-green-500 text-white font-semibold text-lg shadow-[0_0_40px_-10px_rgba(34,197,94,0.5)] border-0">
                    Send First Campaign
                </Button>
            </div>
         </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 bg-zinc-950 border-y border-white/5">
          <div className="container mx-auto px-6 max-w-6xl">
              <div className="grid lg:grid-cols-5 gap-12 items-start">
                  <div className="lg:col-span-2 space-y-8 sticky top-24">
                      <h2 className="text-3xl font-bold">The Power of <br/> Personal Connection.</h2>
                      <div className="space-y-6">
                          <Feature 
                            icon={Zap} 
                            title="AI Personalization" 
                            desc="Don't send generic blasts. Our AI inserts names, project details, and tailored offers automatically." 
                          />
                          <Feature 
                            icon={Target} 
                            title="Smart Segmentation" 
                            desc="Target leads who visited your site but didn't buy, or re-engage cold prospects from months ago." 
                          />
                          <Feature 
                            icon={BarChart3} 
                            title="Live Delivery Tracking" 
                            desc="Know exactly who received your message and who clicked your link in real-time." 
                          />
                      </div>
                  </div>
                  
                  <div className="lg:col-span-3">
                      <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 p-1">
                          <div className="bg-background rounded-xl overflow-hidden">
                             <SmsCampaignDashboard />
                          </div>
                      </div>
                      <p className="text-center text-xs text-zinc-500 mt-4">
                          * Interactive Demo. Try customizing the message above.
                      </p>
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
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20">
                <Icon className="h-5 w-5 text-green-400" />
            </div>
            <div>
                <h3 className="font-bold text-lg mb-1 text-white">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}
