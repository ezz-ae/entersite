import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, BrainCircuit, TrendingUp, BarChart3, ArrowUpRight, Activity, MapPin, Globe, Mail } from 'lucide-react';
import { BlogPostCard } from '@/components/marketing/blog-post-card';
import { fetchBlogPosts, BlogPost } from '@/server/content';
import { shouldUseRemoteContent } from '@/server/remote-config';

const MARKET_PULSE_DATA = [
  { area: 'Dubai Marina', roi: '7.8%', growth: '+12.4%', sentiment: 'Bullish' },
  { area: 'Palm Jumeirah', roi: '5.2%', growth: '+28.1%', sentiment: 'Extreme' },
  { area: 'Business Bay', roi: '8.1%', growth: '+9.2%', sentiment: 'Stable' },
  { area: 'Dubai Hills', roi: '6.4%', growth: '+18.5%', sentiment: 'Bullish' },
  { area: 'Creek Harbour', roi: '7.2%', growth: '+15.8%', sentiment: 'Growth' },
];

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: 'uae-market-2025',
    title: 'UAE Real Estate 2025: The Rise of Autonomous Sales Nodes',
    excerpt: 'How data-driven automation is turning local brokerages into global investment engines.',
    author: 'Sarah Jenkins',
    date: 'Oct 12, 2025',
    category: 'Analysis',
    icon: 'BrainCircuit',
    slug: 'uae-market-2025',
  },
  {
    id: 'brochure-to-conversion',
    title: 'Precision Engineering: PDF Brochures to High-Yield Portals',
    excerpt: 'The science behind our automated architect engine and why it drives conversion for luxury off-plan.',
    author: 'David Chen',
    date: 'Oct 08, 2025',
    category: 'Productivity',
    icon: 'Zap',
    slug: 'brochure-to-conversion',
  },
  {
    id: 'meta-lookalike-strategy',
    title: 'Leveraging 3,750+ Data Nodes for Social Precision',
    excerpt: 'A deep dive into how EntreSite builds custom audiences for high-intent off-plan launches.',
    author: 'James Wilson',
    date: 'Sep 15, 2025',
    category: 'Marketing',
    icon: 'Activity',
    slug: 'meta-lookalike-strategy',
  },
  {
    id: 'luxury-branding-2025',
    title: 'The Aesthetic of Trust: Branding for Ultra-High-Net-Worth Leads',
    excerpt: 'Why minimalist, high-contrast design is the primary driver for trust in the digital real estate space.',
    author: 'Elena Rossi',
    date: 'Aug 28, 2025',
    category: 'Design',
    icon: 'Sparkles',
    slug: 'luxury-branding-2025',
  },
  {
    id: 'roi-tracking-engine',
    title: 'Real-Time ROI: Moving Beyond Static Spreadsheet Pitching',
    excerpt: 'How live market data integration creates more persuasive sales conversations for modern agents.',
    author: 'Marcus Thorne',
    date: 'Aug 12, 2025',
    category: 'Finance',
    icon: 'BarChart3',
    slug: 'roi-tracking-engine',
  },
  {
    id: 'dubai-growth-corridors',
    title: 'The New Silk Road: Dubai South and the Al Maktoum Expansion',
    excerpt: 'Analyzing the next decade of capital appreciation in the world’s fastest-growing aviation hub.',
    author: 'Sarah Jenkins',
    date: 'Jul 30, 2025',
    category: 'Market Data',
    icon: 'MapPin',
    slug: 'dubai-growth-corridors',
  }
];

export default async function BlogPage() {
  const canUseRemote = shouldUseRemoteContent;
  const posts = canUseRemote ? (await fetchBlogPosts()) : [];
  const data = posts.length > 0 ? posts : DEFAULT_POSTS;

  return (
    <main className="min-h-screen bg-black text-white py-40">
      <div className="container mx-auto px-6 max-w-[1800px]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/5 pb-16 gap-12">
            <div className="max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-bold uppercase tracking-widest">
                    <TrendingUp className="h-3 w-3" /> Market Intelligence
                </div>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase italic">
                    Market <br/>
                    <span className="text-zinc-600">Insights.</span>
                </h1>
                <p className="text-2xl text-zinc-400 font-light leading-relaxed">
                    Institutional-grade analysis, product engineering updates, and strategic guides for the UAE real estate elite.
                </p>
            </div>
            <div className="flex gap-4">
                <Card className="px-8 py-6 rounded-[2rem] bg-zinc-900/50 border border-white/5 backdrop-blur-xl">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1 leading-none">Global Articles</p>
                    <p className="text-3xl font-black text-white italic">124+</p>
                </Card>
                <Card className="px-8 py-6 rounded-[2rem] bg-zinc-900/50 border border-white/5 backdrop-blur-xl">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1 leading-none">Active Readers</p>
                    <p className="text-3xl font-black text-white italic">8.2K</p>
                </Card>
            </div>
        </div>

        {/* Market Pulse Grid */}
        <div className="mb-32 space-y-10">
            <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Live Market Pulse Node</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {MARKET_PULSE_DATA.map((item, i) => (
                    <Card key={i} className="bg-zinc-900/30 border-white/5 rounded-[2rem] p-8 hover:border-blue-500/30 transition-all group">
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4">{item.area}</p>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-[9px] font-bold text-zinc-500 uppercase">Avg ROI</span>
                                <span className="text-xl font-black text-emerald-500 italic">{item.roi}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-[9px] font-bold text-zinc-500 uppercase">1Y Growth</span>
                                <span className="text-xl font-black text-blue-500 italic">{item.growth}</span>
                            </div>
                            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[8px] font-black text-zinc-700 uppercase tracking-tighter">Sentiment</span>
                                <Badge className="bg-blue-600/10 text-blue-400 border-none text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">{item.sentiment}</Badge>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {data.map((post, i) => (
                <BlogPostCard key={post.id} post={post} index={i} />
            ))}
        </div>

        {/* Newsletter Callout */}
        <section className="mt-40 p-20 rounded-[4rem] bg-zinc-900 border border-white/5 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Globe className="h-96 w-96 text-white" />
            </div>
            <div className="max-w-2xl relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-[1.5rem] bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-600/20">
                    <Mail className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase italic">Join the <br/>Intelligence.</h2>
                <p className="text-xl text-zinc-400 font-medium">Weekly market synthesis, autonomous strategy guides, and architectural previews delivered to your node.</p>
            </div>
            <div className="w-full lg:w-auto relative z-10 flex flex-col sm:flex-row gap-4">
                <input 
                    placeholder="ENTER NODE EMAIL" 
                    className="h-20 px-10 rounded-2xl bg-black border border-white/10 text-white placeholder:text-zinc-700 text-lg w-full lg:w-96 focus:outline-none focus:border-blue-500/50 font-bold tracking-tight italic uppercase"
                />
                <button className="h-20 px-16 rounded-2xl bg-white text-black font-black text-2xl uppercase tracking-tighter italic hover:bg-zinc-200 transition-all shadow-2xl">
                    Subscribe
                </button>
            </div>
        </section>

      </div>
    </main>
  );
}
