'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare, Sparkles, FileText, Image as ImageIcon } from 'lucide-react';

export default function AiToolsDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">AI Tools Suite</h1>
                <p className="text-muted-foreground">Automate content, chat, and design with our AI models.</p>
            </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Chat Agent Trainer */}
            <Card className="col-span-full lg:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        AI Chat Agent
                    </CardTitle>
                    <CardDescription>
                        Train your site's chatbot on your specific project data.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="bg-muted/30 rounded-xl p-6 border border-dashed flex flex-col items-center justify-center text-center min-h-[200px]">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <MessageSquare className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-1">Agent Knowledge Base</h3>
                        <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                            Upload brochures, floor plans, and price lists. The AI will answer visitor questions instantly.
                        </p>
                        <Button>Upload Knowledge Documents</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Content Generator */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Copy Generator
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                        <h4 className="font-medium text-sm">Listing Descriptions</h4>
                        <p className="text-xs text-muted-foreground">Generate SEO-optimized property descriptions.</p>
                    </div>
                    <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                        <h4 className="font-medium text-sm">Blog Posts</h4>
                        <p className="text-xs text-muted-foreground">Write market updates and investment guides.</p>
                    </div>
                    <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                        <h4 className="font-medium text-sm">Email Sequences</h4>
                        <p className="text-xs text-muted-foreground">Create nurture campaigns for new leads.</p>
                    </div>
                </CardContent>
            </Card>

            {/* Image Enhancer */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5 text-primary" />
                        Image Enhancer
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <div className="aspect-video bg-black/5 rounded-lg flex items-center justify-center mb-4">
                         <Sparkles className="h-8 w-8 text-muted-foreground" />
                     </div>
                     <Button variant="outline" className="w-full">Enhance Photos</Button>
                </CardContent>
            </Card>
        </div>

      </div>
    </DashboardLayout>
  );
}
