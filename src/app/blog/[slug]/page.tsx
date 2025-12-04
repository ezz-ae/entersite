'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/site-footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real app, we'd fetch data based on params.slug
  // For now, we'll render a generic high-quality article template
  const authorImage = PlaceHolderImages.find(p => p.id === 'user-avatar-4');
  const coverImage = PlaceHolderImages.find(p => p.id === 'blog-cover-1');
  
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      
      <article className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
            
            <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Insights
            </Link>

            <div className="space-y-6 mb-12">
                <div className="flex gap-2">
                    <Badge variant="secondary" className="rounded-md">Technology</Badge>
                    <Badge variant="outline" className="rounded-md">Real Estate</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                    The Future of PropTech: AI-Driven Websites
                </h1>
                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <div className="flex items-center gap-4">
                        {authorImage && (
                            <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                                <Image src={authorImage.imageUrl} alt="Author" width={authorImage.width} height={authorImage.height} />
                            </div>
                        )}
                        <div className="text-sm">
                            <p className="font-medium text-foreground">Sarah Jenkins</p>
                            <p className="text-muted-foreground">Oct 12, 2025 • 5 min read</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {coverImage && (
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 bg-muted">
                    <Image 
                        src={coverImage.imageUrl} 
                        alt="Blog Cover" 
                        fill 
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                    />
                </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                <p className="lead text-xl text-foreground font-medium">
                    The real estate industry is on the cusp of a major transformation. Artificial intelligence is no longer just a buzzword; it's building the digital infrastructure of tomorrow's top agencies.
                </p>
                <p>
                    For decades, building a high-converting real estate website meant hiring expensive agencies, waiting months for development, and struggling with clunky CMS platforms. Today, AI agents can architect, design, and deploy enterprise-grade portals in minutes.
                </p>
                
                <h3>The Shift from Templates to Intelligence</h3>
                <p>
                    Traditional website builders rely on static templates. You pick a layout, swap images, and hope it works. AI-driven platforms like EntreSite take a different approach. They understand the <em>content</em> first.
                </p>
                <ul>
                    <li><strong>Context Awareness:</strong> The AI knows the difference between a "Luxury Villa" and an "Affordable Studio" and adjusts the design hierarchy accordingly.</li>
                    <li><strong>Data Integration:</strong> Instead of empty placeholders, the system pulls real market data—prices, amenities, location highlights—instantly.</li>
                    <li><strong>Automated Conversion:</strong> Lead forms are not just placed randomly; they are injected at high-intent scroll depths calculated by machine learning models.</li>
                </ul>

                <h3>Why Speed Wins in Real Estate</h3>
                <p>
                    In a hot market like Dubai, inventory moves fast. If you wait two weeks to launch a landing page for a new Emaar project, you've missed the wave. AI enables "Instant Deployment," allowing agents to capture leads the moment a project is announced.
                </p>
                
                <blockquote>
                    "The speed of execution is the new currency in real estate marketing. AI gives every agent the power of a full tech team."
                </blockquote>

                <p>
                    As we move into 2026, we expect to see a consolidation of tools. The "Operating System" model—where ads, sites, and CRM live under one roof—will become the standard for high-growth teams.
                </p>
            </div>

        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
