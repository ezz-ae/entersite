import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Mail, Zap, Target, BarChart3, Users } from 'lucide-react';
import { EmailCampaignDashboard } from '@/components/messaging/email-dashboard';

export const metadata: Metadata = {
  title: 'AI Email Marketing | EntreSite',
  description: 'Design, write, and automate high-converting email newsletters for real estate.',
};

export default function EmailMarketingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />
         <div className="container mx-auto px-6 max-w-[1800px] relative z-10 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20 mb-4">
                <Mail className="h-3 w-3" />
                Automated Newsletter Engine
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none max-w-4xl mx-auto">
                Newsletters that <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Actually Sell.</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Forget generic templates. Our AI analyzes your project data to write hyper-personalized emails that drive viewings and deposits.
            </p>
            <div className="flex justify-center gap-4 pt-4">
                <Button size="lg" className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] border-0">
                    Start Campaign
                </Button>
            </div>
         </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 bg-zinc-950 border-y border-white/5">
          <div className="container mx-auto px-6 max-w-6xl">
              <div className="grid lg:grid-cols-5 gap-12 items-start">
                  <div className="lg:col-span-2 space-y-8 sticky top-24">
                      <h2 className="text-3xl font-bold">Smart Drip <br/> Campaigns.</h2>
                      <div className="space-y-6">
                          <Feature 
                            icon={Zap} 
                            title="AI Copywriting" 
                            desc="Generate compelling subject lines and body copy based on your specific project USP." 
                          />
                          <Feature 
                            icon={Users} 
                            title="Audience Segmentation" 
                            desc="Automatically segment leads by budget, interest, and engagement level." 
                          />
                          <Feature 
                            icon={BarChart3} 
                            title="Performance Analytics" 
                            desc="Track opens, clicks, and bookings in real-time. Optimize with A/B testing." 
                          />
                      </div>
                  </div>
                  
                  <div className="lg:col-span-3">
                      <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 p-1">
                          <div className="bg-background rounded-xl overflow-hidden">
                             <EmailCampaignDashboard />
                          </div>
                      </div>
                      <p className="text-center text-xs text-zinc-500 mt-4">
                          * Interactive Demo. Try editing the email above.
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
