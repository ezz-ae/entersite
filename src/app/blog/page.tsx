import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | EntreSite AI',
  description: 'Insights and guides on real estate web development and marketing.',
};

const POSTS = [
  {
    id: 'future-of-proptech',
    title: 'The Future of PropTech: AI-Driven Websites',
    excerpt: 'How artificial intelligence is revolutionizing the way developers and agents build their digital presence.',
    author: 'Sarah Jenkins',
    date: 'Oct 12, 2025',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'high-conversion-landing-pages',
    title: 'Anatomy of a High-Conversion Landing Page',
    excerpt: 'We analyzed 500+ successful real estate campaigns to find the perfect block structure.',
    author: 'David Chen',
    date: 'Oct 08, 2025',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'seo-for-real-estate',
    title: 'SEO for Real Estate: Beyond the Basics',
    excerpt: 'Keywords, meta tags, and content strategies that actually rank in 2025.',
    author: 'Maria Rodriguez',
    date: 'Sep 28, 2025',
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'google-ads-strategy',
    title: 'Scaling Your Lead Gen with Google Ads',
    excerpt: 'Why most agents fail at paid search, and how automation can fix it.',
    author: 'James Wilson',
    date: 'Sep 15, 2025',
    category: 'Ads',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Market Insights</h1>
            <p className="text-lg text-muted-foreground">
                Strategies, guides, and industry news for the modern real estate professional.
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POSTS.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="group">
                    <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="aspect-video relative overflow-hidden">
                            <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Placeholder while loading */}
                            <img 
                                src={post.image} 
                                alt={post.title} 
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                            <Badge className="absolute top-4 left-4 bg-background/90 text-foreground hover:bg-background">{post.category}</Badge>
                        </div>
                        <CardContent className="p-6 flex flex-col h-full">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {post.date}
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {post.author}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                                {post.excerpt}
                            </p>
                            <div className="mt-auto flex items-center text-sm font-medium text-primary">
                                Read Article <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>

      </div>
    </main>
  );
}
