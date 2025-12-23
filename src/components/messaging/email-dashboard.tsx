'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
    Mail, Users, Zap, Send, Sparkles, BarChart3, 
    MousePointerClick, Eye, Clock, Calendar, Image as ImageIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

export function EmailCampaignDashboard() {
    const [subject, setSubject] = useState("Exclusive Pre-Launch: Riverside Apartments");
    const [body, setBody] = useState("Hi {Name},\n\nI wanted to personally invite you to the private viewing of Riverside Apartments this weekend.\n\nThis project offers:\n- 8% ROI Guaranteed\n- 5-Year Payment Plan\n- Prices starting from AED 1.2M\n\nSlots are limited. Click below to book yours.\n\nBest,\nSarah");

    return (
        <Card className="w-full h-full bg-background border-0 shadow-none">
            <CardHeader className="px-0 pt-0">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-2xl">AI Email Architect</CardTitle>
                        <CardDescription>Design high-converting newsletters and drip campaigns in minutes.</CardDescription>
                    </div>
                    <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <Send className="h-4 w-4" /> Send Test
                    </Button>
                </div>
            </CardHeader>
            
            <CardContent className="px-0">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Editor Side */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                             <Label>Campaign Name</Label>
                             <Input defaultValue="Weekly Newsletter - High Net Worth" />
                        </div>

                        <div className="space-y-2">
                             <div className="flex justify-between items-center">
                                <Label>Subject Line</Label>
                                <Badge variant="outline" className="text-[10px] text-green-600 border-green-200 bg-green-50">
                                    Score: 92/100
                                </Badge>
                             </div>
                             <div className="relative">
                                 <Input 
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="pr-24"
                                 />
                                 <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="absolute right-1 top-1 h-7 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                    onClick={() => setSubject("🔥 8% ROI: Riverside Launch Invite")}
                                 >
                                     <Sparkles className="h-3 w-3 mr-1" /> Optimize
                                 </Button>
                             </div>
                        </div>

                        <div className="space-y-2">
                             <Label>Email Content</Label>
                             <div className="border rounded-xl bg-card overflow-hidden focus-within:ring-2 focus-within:ring-ring">
                                 <div className="flex items-center gap-1 p-2 border-b bg-muted/30">
                                     <Button variant="ghost" size="icon" className="h-7 w-7 rounded"><span className="font-bold">B</span></Button>
                                     <Button variant="ghost" size="icon" className="h-7 w-7 rounded"><span className="italic">I</span></Button>
                                     <div className="w-px h-4 bg-border mx-1" />
                                     <Button variant="ghost" size="icon" className="h-7 w-7 rounded"><ImageIcon className="h-3 w-3" /></Button>
                                     <div className="w-px h-4 bg-border mx-1" />
                                     <Badge variant="secondary" className="cursor-pointer hover:bg-white text-[10px]" onClick={() => setBody(b => b.replace("{Name}", "Ahmed"))}>Personalize</Badge>
                                 </div>
                                 <Textarea 
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    className="min-h-[250px] border-0 focus-visible:ring-0 rounded-none p-4 font-mono text-sm leading-relaxed"
                                 />
                             </div>
                        </div>
                    </div>

                    {/* Preview & Stats Side */}
                    <div className="space-y-6">
                        <div className="bg-white text-black rounded-xl border shadow-sm overflow-hidden">
                            <div className="bg-gray-100 p-3 border-b flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-400" />
                                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                <div className="w-2 h-2 rounded-full bg-green-400" />
                                <div className="text-xs text-gray-500 ml-2">Preview</div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="border-b pb-4 mb-4">
                                    <h2 className="text-xl font-bold">{subject}</h2>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">ES</div>
                                        <div>
                                            <p className="text-sm font-semibold">Sarah from EntreSite</p>
                                            <p className="text-xs text-gray-500">To: Ahmed Al-Mansouri</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-800 whitespace-pre-wrap font-sans">
                                    {body.replace("{Name}", "Ahmed")}
                                </div>
                                <div className="pt-4">
                                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Book Viewing Slot</Button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <MetricCard label="Est. Open Rate" value="42%" sub="Industry Avg: 18%" icon={Eye} />
                            <MetricCard label="Est. Click Rate" value="12%" sub="High Intent" icon={MousePointerClick} />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function MetricCard({ label, value, sub, icon: Icon, highlight }: any) {
    return (
        <div className={cn("p-4 rounded-xl border flex flex-col justify-between bg-card")}>
            <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
                <Icon className={cn("h-4 w-4 text-muted-foreground")} />
            </div>
            <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{sub}</p>
            </div>
        </div>
    )
}
