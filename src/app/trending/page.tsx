import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Bot, Building, List, Pyramid, Rocket, Tent, Milestone } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Trending Templates | EntreSite AI',
  description: 'Browse professionally designed, AI-powered website templates for the real estate industry.',
};

const TEMPLATES = [
    {
        title: "AI-Powered Company Hub",
        icon: <Bot className="h-6 w-6 text-indigo-400" />,
        description: "A complete corporate site with ChatGPT-style search to browse all 3,750+ projects in your database.",
        price: "Premium",
        imageUrl: "https://images.unsplash.com/photo-1556761175-577380e25f2b?auto=format&fit=crop&q=80&w=1200",
        tags: ["AI Search", "Full Website", "Lead Gen"]
    },
    {
        title: "New Project Launchpad",
        icon: <Rocket className="h-6 w-6 text-rose-400" />,
        description: "A high-conversion landing page designed to launch a single new project with maximum impact.",
        price: "Standard",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
        tags: ["Landing Page", "Off-Plan", "Countdown"]
    },
    {
        title: "Ultimate Listing Portal",
        icon: <List className="h-6 w-6 text-green-400" />,
        description: "A full-featured website to list, filter, and display your entire portfolio of properties with maps.",
        price: "Premium",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
        tags:["Listings", "Map Search", "Filters"]
    },
    {
        title: "Developer Showcase",
        icon: <Pyramid className="h-6 w-6 text-amber-400" />,
        description: "A multi-project landing page focused on a specific developer like Emaar or DAMAC.",
        price: "Standard",
        imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea904ac66de?auto=format&fit=crop&q=80&w=1200",
        tags: ["Developer Focus", "Portfolio", "Branding"]
    },
    {
        title: "Single Property Website",
        icon: <Tent className="h-6 w-6 text-cyan-400" />,
        description: "A beautiful, immersive single-page site to market a signature villa or a unique property.",
        price: "Standard",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
        tags: ["Single Listing", "Luxury", "Gallery"]
    },
    {
        title: "Roadshow Landing Page",
        icon: <Milestone className="h-6 w-6 text-purple-400" />,
        description: "Promote your international sales events and capture registrations with this event-focused template.",
        price: "Standard",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-17e6fc48db44?auto=format&fit=crop&q=80&w=1200",
        tags: ["Events", "International", "RSVP"]
    }
];

export default function TrendingPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter">Instant Real Estate Websites</h1>
            <p className="text-lg text-muted-foreground">
                Choose a battle-tested template and let our AI customize it to your brand and projects in seconds.
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEMPLATES.map((template, i) => (
                <Card key={i} className="group flex flex-col border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden">
                         <Image 
                            src={template.imageUrl}
                            alt={template.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                         <Badge className="absolute top-4 right-4 text-xs font-bold" variant={template.price === 'Premium' ? 'default' : 'secondary'}>
                            {template.price}
                         </Badge>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center border">
                                {template.icon}
                            </div>
                            <h3 className="text-xl font-bold">{template.title}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 flex-1">
                            {template.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {template.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                        </div>
                        <Button className="w-full mt-auto h-11 text-base font-semibold group-hover:bg-primary/90 transition-colors">
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>

      </div>
    </main>
  );
}