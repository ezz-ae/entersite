import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Book, Code, Layers, Zap, Rocket, Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Documentation | EntreSite AI',
  description: 'Learn how to use EntreSite AI to build and scale your real estate business.',
};

const SECTIONS = [
    {
        title: "Getting Started",
        icon: <Rocket className="h-6 w-6 text-blue-500" />,
        items: [
            "Quick Start Guide",
            "Understanding the Interface",
            "Setting up your Brand Kit",
            "Connecting your Domain"
        ]
    },
    {
        title: "Building Pages",
        icon: <Layers className="h-6 w-6 text-purple-500" />,
        items: [
            "Working with Blocks",
            "Managing Pages & Navigation",
            "Using AI Generation",
            "Mobile Responsiveness"
        ]
    },
    {
        title: "Marketing Tools",
        icon: <Zap className="h-6 w-6 text-yellow-500" />,
        items: [
            "Google Ads Manager",
            "SEO Best Practices",
            "Lead Capture Forms",
            "Analytics Dashboard"
        ]
    },
    {
        title: "Advanced",
        icon: <Code className="h-6 w-6 text-green-500" />,
        items: [
            "Custom CSS/JS",
            "API Integrations",
            "Webhooks",
            "White Labeling"
        ]
    }
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
                <div className="font-bold text-2xl flex items-center gap-2">
                    <Book className="h-6 w-6" />
                    Docs
                </div>
                <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start font-semibold">Overview</Button>
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground">Tutorials</Button>
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground">API Reference</Button>
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground">Changelog</Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-12">
                <section className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Welcome to EntreSite Docs</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Your complete guide to building, launching, and scaling real estate websites with our AI-powered operating system.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-6">
                    {SECTIONS.map((section, i) => (
                        <Card key={i} className="border-0 shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-muted rounded-lg">
                                        {section.icon}
                                    </div>
                                    <h3 className="font-bold text-lg">{section.title}</h3>
                                </div>
                                <ul className="space-y-2">
                                    {section.items.map((item, j) => (
                                        <li key={j}>
                                            <a href="#" className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-border" />
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <section className="bg-muted/30 p-8 rounded-2xl border">
                    <h3 className="text-2xl font-bold mb-4">Need help?</h3>
                    <p className="text-muted-foreground mb-6">
                        Can't find what you're looking for? Our support team is here to assist you 24/7.
                    </p>
                    <div className="flex gap-4">
                        <Button>Contact Support</Button>
                        <Button variant="outline">Join Community</Button>
                    </div>
                </section>
            </div>
        </div>

      </div>
    </main>
  );
}
