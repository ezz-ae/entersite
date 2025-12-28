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
    MessageSquare, Users, Zap, Send, Phone, Clock, FileText, 
    CheckCircle2, AlertCircle, Sparkles, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from '@/hooks/use-toast';
import { sendSms } from '@/lib/messaging/smsSender';

export function SmsCampaignDashboard() {
    const [message, setMessage] = useState("Hi {Name}, exclusive pre-launch offer for Emaar Beachfront: Pay 10% & Move in. Reply YES for brochure.");
    const [charCount, setCharCount] = useState(message.length);
    const [testNumber, setTestNumber] = useState('+971501234567');
    const [isSending, setIsSending] = useState(false);
    const { toast } = useToast();

    const handleSend = async () => {
        if (!testNumber) {
            toast({ title: 'Add a phone number', description: 'Enter a test recipient before sending.', variant: 'destructive' });
            return;
        }
        try {
            setIsSending(true);
            await sendSms({
                to: testNumber,
                message,
            });
            toast({ title: 'SMS sent', description: `Delivered test SMS to ${testNumber}` });
        } catch (error: any) {
            toast({
                title: 'Failed to send SMS',
                description: error?.message || 'Verify your authentication and Twilio credentials.',
                variant: 'destructive',
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <Card className="w-full h-full bg-background border-0 shadow-none">
            <CardHeader className="px-0 pt-0">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <CardTitle className="text-2xl">SMS Blast Engine</CardTitle>
                        <CardDescription>Send high-converting bulk SMS campaigns with AI personalization.</CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Input
                            value={testNumber}
                            onChange={(e) => setTestNumber(e.target.value)}
                            placeholder="+9715..."
                            className="h-9 w-full sm:w-48"
                        />
                        <Button
                            size="sm"
                            className="gap-2 bg-green-600 hover:bg-green-700"
                            onClick={handleSend}
                            disabled={isSending}
                        >
                            {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            {isSending ? 'Sending...' : 'Send Campaign'}
                        </Button>
                    </div>
                </div>
            </CardHeader>
            
            <CardContent className="px-0 space-y-8">
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                             <Label>Campaign Name</Label>
                             <Input defaultValue="Emaar Beachfront - Cold Leads" />
                        </div>

                        <div className="space-y-2">
                             <div className="flex justify-between">
                                <Label>Message Body</Label>
                                <span className={cn("text-xs", charCount > 160 ? "text-red-500" : "text-muted-foreground")}>
                                    {charCount}/160 characters (1 credit)
                                </span>
                             </div>
                             <Textarea 
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                    setCharCount(e.target.value.length);
                                }}
                                className="min-h-[120px]"
                             />
                             <div className="flex gap-2">
                                 <Badge variant="secondary" className="cursor-pointer hover:bg-muted" onClick={() => setMessage(m => m + "{Name} ")}>+ Name</Badge>
                                 <Badge variant="secondary" className="cursor-pointer hover:bg-muted" onClick={() => setMessage(m => m + "{Project} ")}>+ Project</Badge>
                                 <Badge variant="outline" className="ml-auto cursor-pointer hover:bg-muted gap-1 text-purple-600 border-purple-200">
                                     <Sparkles className="h-3 w-3" /> AI Improve
                                 </Badge>
                             </div>
                        </div>

                        <div className="p-4 bg-muted/30 border rounded-xl space-y-4">
                            <h4 className="font-medium text-sm">Audience Targeting</h4>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label className="font-normal text-muted-foreground">Cold Leads (Not contacted &gt; 30 days)</Label>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="font-normal text-muted-foreground">Investors (Budget &gt; 2M)</Label>
                                    <Switch />
                                </div>
                            </div>
                            <div className="pt-2 text-xs text-muted-foreground">
                                Estimated Recipients: <span className="font-bold text-foreground">1,450</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                         {/* Phone Mockup */}
                         <div className="border-[8px] border-zinc-900 rounded-[2.5rem] overflow-hidden bg-black aspect-[9/18] shadow-2xl relative max-w-[300px] mx-auto">
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-xl z-10" />
                             <div className="h-full bg-white flex flex-col pt-12 pb-8 px-4 relative">
                                 <div className="text-center mb-6">
                                     <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center text-gray-500 font-bold">ES</div>
                                     <p className="text-xs text-gray-400">EntreSite</p>
                                 </div>
                                 
                                 <div className="flex-1 space-y-4">
                                     <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 text-sm text-gray-800 max-w-[85%]">
                                         {message.replace("{Name}", "Ahmed")}
                                         <div className="text-[10px] text-gray-400 mt-1 text-right">10:42 AM</div>
                                     </div>
                                 </div>

                                 <div className="mt-auto border-t pt-3">
                                     <div className="h-8 bg-gray-100 rounded-full" />
                                 </div>
                             </div>
                         </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
