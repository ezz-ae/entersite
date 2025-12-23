import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Instagram, Zap, MessageCircle, BarChart3 } from 'lucide-react';
import { InstagramBotDashboard } from '@/components/social/instagram-bot-dashboard';

export const metadata: Metadata = {
  title: 'AI Instagram Growth | EntreSite',
  description: 'Automate your real estate Instagram. Auto-reply to DMs, comment on leads, and grow your following with AI.',
};

export default function InstagramBotPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-pink-500/30 font-sans">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-black to-black pointer-events-none" />
         <div className="container mx-auto px-6 max-w-[1800px] relative z-10 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-medium border border-pink-500/20 mb-4">
                <Instagram className="h-3 w-3" />
                Social Growth Engine
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none max-w-4xl mx-auto">
                Your AI Social Media <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">Sales Team.</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Never miss a lead in your DMs. Our AI Agent replies instantly, qualifies prospects, and schedules viewings 24/7 directly from Instagram.
            </p>
            <div className="flex justify-center gap-4 pt-4">
                <Button size="lg" className="h-14 px-8 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold text-lg shadow-[0_0_40px_-10px_rgba(236,72,153,0.5)] border-0">
                    Connect Instagram
                </Button>
            </div>
         </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 bg-zinc-950 border-y border-white/5">
          <div className="container mx-auto px-6 max-w-6xl">
              <div className="grid lg:grid-cols-5 gap-12 items-start">
                  <div className="lg:col-span-2 space-y-8 sticky top-24">
                      <h2 className="text-3xl font-bold">Turn Followers <br/> into Buyers.</h2>
                      <div className="space-y-6">
                          <Feature 
                            icon={MessageCircle} 
                            title="Instant DM Replies" 
                            desc="Stop making leads wait. Send brochures and pricing immediately when someone asks." 
                          />
                          <Feature 
                            icon={Zap} 
                            title="Comment Automation" 
                            desc="Automatically DM users who comment specific keywords like 'Price' or 'Details'." 
                          />
                          <Feature 
                            icon={BarChart3} 
                            title="Competitor Targeting" 
                            desc="Ethically engage with followers of other real estate accounts to grow your reach." 
                          />
                      </div>
                  </div>
                  
                  <div className="lg:col-span-3">
                      <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 p-1">
                          <div className="bg-background rounded-xl overflow-hidden">
                             <InstagramBotDashboard />
                          </div>
                      </div>
                      <p className="text-center text-xs text-zinc-500 mt-4">
                          * Live preview. Configure your bot settings above.
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
            <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0 border border-pink-500/20">
                <Icon className="h-5 w-5 text-pink-400" />
            </div>
            <div>
                <h3 className="font-bold text-lg mb-1 text-white">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}
