'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
    MapPin, 
    Store, 
    Star, 
    MessageSquare, 
    BarChart3, 
    Settings, 
    CheckCircle2, 
    Loader2, 
    ArrowRight,
    Search,
    Globe,
    Phone,
    Image as ImageIcon,
    Target,
    Zap,
    TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function GoogleMyBusinessManager() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('setup');
  const [isLoading, setIsLoading] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Real Estate Agency');
  const [verificationStatus, setVerificationStatus] = useState<'unverified' | 'pending' | 'verified'>('unverified');
  
  // Mock Data
  const [reviews] = useState([
      { author: "James Wilson", rating: 5, text: "Excellent service finding our villa in Palm Jumeirah.", time: "2 days ago" },
      { author: "Sarah Al-Maktoum", rating: 5, text: "Very professional team. Highly recommended.", time: "1 week ago" },
  ]);

  const [stats] = useState({
      views: 1250,
      calls: 48,
      directions: 156,
      websiteClicks: 320
  });

  const handleVerify = () => {
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
          setVerificationStatus('pending');
          toast({ title: "Verification Request Sent", description: "Google is reviewing your business profile." });
      }, 2000);
  };

  const handleLaunchLocalAd = () => {
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
          toast({ title: "Local Ad Live", description: "Your business is now promoted in Google Maps." });
      }, 2000);
  };

  return (
    <Card className="w-full h-full border-0 shadow-none bg-transparent">
        <CardHeader className="px-0 pt-0 pb-10">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <CardTitle className="text-4xl font-bold tracking-tight text-white uppercase">Google My Business</CardTitle>
                    <CardDescription className="text-zinc-500 font-medium text-lg">Manage your local presence and Maps visibility.</CardDescription>
                </div>
                <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 text-blue-500"><MapPin className="h-5 w-5" /></div>
                    <div className="w-10 h-10 rounded-xl bg-green-600/10 flex items-center justify-center border border-green-500/20 text-green-500"><Store className="h-5 w-5" /></div>
                </div>
            </div>
        </CardHeader>
        
        <CardContent className="px-0 space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-10 bg-zinc-950 p-1.5 rounded-[1.5rem] border border-white/10">
                    <TabsTrigger value="setup" className="rounded-xl h-12 font-bold uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">1. Setup & Verify</TabsTrigger>
                    <TabsTrigger value="manage" className="rounded-xl h-12 font-bold uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">2. Manage</TabsTrigger>
                    <TabsTrigger value="advertise" className="rounded-xl h-12 font-bold uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-black">3. Local Ads</TabsTrigger>
                </TabsList>

                {/* TAB 1: SETUP */}
                <TabsContent value="setup" className="space-y-8 mt-0">
                    <div className="grid lg:grid-cols-2 gap-10">
                         <div className="p-10 bg-zinc-900/40 border border-white/5 rounded-[3rem] space-y-6">
                            <h3 className="text-xl font-bold text-white">Business Profile</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Business Name</Label>
                                    <Input 
                                        placeholder="e.g. Luxury Estates Dubai" 
                                        className="h-14 bg-black/40 border-white/10 rounded-2xl font-medium text-white"
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Category</Label>
                                    <Input 
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="h-14 bg-black/40 border-white/10 rounded-2xl font-medium text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Address</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                                        <Input placeholder="Search location..." className="pl-12 h-14 bg-black/40 border-white/10 rounded-2xl font-medium text-white" />
                                    </div>
                                </div>
                            </div>
                            <Button 
                                onClick={handleVerify} 
                                disabled={isLoading || verificationStatus !== 'unverified'}
                                className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-xl"
                            >
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : verificationStatus === 'verified' ? "Verified" : verificationStatus === 'pending' ? "Pending Review" : "Verify Business"}
                            </Button>
                         </div>

                         {/* Preview */}
                         <div className="bg-white text-black p-6 rounded-[2rem] shadow-2xl space-y-6 h-fit">
                            <div className="space-y-4 border-b border-gray-100 pb-6">
                                <h4 className="text-xl font-bold">{businessName || "Your Business Name"}</h4>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="font-bold text-orange-500">5.0</span>
                                    <div className="flex"><Star className="h-3 w-3 fill-orange-500 text-orange-500" /><Star className="h-3 w-3 fill-orange-500 text-orange-500" /><Star className="h-3 w-3 fill-orange-500 text-orange-500" /><Star className="h-3 w-3 fill-orange-500 text-orange-500" /><Star className="h-3 w-3 fill-orange-500 text-orange-500" /></div>
                                    <span>(12)</span>
                                    <span>•</span>
                                    <span>{category}</span>
                                </div>
                                <div className="flex gap-4 text-blue-600 text-sm font-bold">
                                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-blue-50 w-20"><Globe className="h-5 w-5" /> Website</div>
                                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-blue-50 w-20"><MapPin className="h-5 w-5" /> Directions</div>
                                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-blue-50 w-20"><Phone className="h-5 w-5" /> Call</div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <MapPin className="h-4 w-4" />
                                    <span>DIFC, Gate Avenue, Dubai, UAE</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Clock className="h-4 w-4" />
                                    <span className="text-green-600 font-bold">Open</span>
                                    <span>• Closes 6PM</span>
                                </div>
                            </div>
                         </div>
                    </div>
                </TabsContent>

                {/* TAB 2: MANAGE */}
                <TabsContent value="manage" className="space-y-8 mt-0">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <MetricCard label="Search Views" value={stats.views} icon={Search} trend="+12%" />
                        <MetricCard label="Calls" value={stats.calls} icon={Phone} trend="+5%" />
                        <MetricCard label="Direction Requests" value={stats.directions} icon={MapPin} trend="+8%" />
                        <MetricCard label="Website Clicks" value={stats.websiteClicks} icon={MousePointerClick} trend="+15%" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                         <Card className="lg:col-span-2 bg-zinc-900/40 border border-white/5 rounded-[2.5rem]">
                            <CardHeader className="p-8">
                                <CardTitle className="text-xl font-bold">Recent Reviews</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 pt-0 space-y-6">
                                {reviews.map((review, i) => (
                                    <div key={i} className="pb-6 border-b border-white/5 last:border-0 last:pb-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="font-bold text-white">{review.author}</p>
                                            <span className="text-xs text-zinc-500">{review.time}</span>
                                        </div>
                                        <div className="flex gap-1 mb-2">
                                            {[...Array(5)].map((_, j) => (
                                                <Star key={j} className={cn("h-3 w-3", j < review.rating ? "text-orange-500 fill-orange-500" : "text-zinc-700")} />
                                            ))}
                                        </div>
                                        <p className="text-sm text-zinc-400 leading-relaxed">{review.text}</p>
                                        <div className="mt-4">
                                            <Button variant="outline" size="sm" className="rounded-xl h-8 text-xs border-white/10 hover:bg-white hover:text-black">Reply</Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                         </Card>
                         
                         <div className="space-y-6">
                            <Card className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem]">
                                <CardContent className="p-8 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500"><ImageIcon className="h-6 w-6" /></div>
                                        <div>
                                            <h4 className="font-bold text-white">Photos</h4>
                                            <p className="text-xs text-zinc-500">Showcase your office</p>
                                        </div>
                                    </div>
                                    <Button className="w-full rounded-xl bg-zinc-800 hover:bg-zinc-700">Add Photos</Button>
                                </CardContent>
                            </Card>
                            <Card className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem]">
                                <CardContent className="p-8 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-green-600/10 flex items-center justify-center text-green-500"><MessageSquare className="h-6 w-6" /></div>
                                        <div>
                                            <h4 className="font-bold text-white">Posts</h4>
                                            <p className="text-xs text-zinc-500">Update customers</p>
                                        </div>
                                    </div>
                                    <Button className="w-full rounded-xl bg-zinc-800 hover:bg-zinc-700">Create Post</Button>
                                </CardContent>
                            </Card>
                         </div>
                    </div>
                </TabsContent>

                {/* TAB 3: LOCAL ADS */}
                <TabsContent value="advertise" className="space-y-8 mt-0">
                    <div className="p-12 bg-zinc-900/50 rounded-[3rem] border border-white/5 text-center space-y-8">
                         <div className="mx-auto w-20 h-20 bg-blue-600/10 rounded-[2rem] flex items-center justify-center border border-blue-500/20 shadow-2xl">
                             <Target className="h-10 w-10 text-blue-500" />
                         </div>
                         <div className="space-y-3">
                             <h3 className="text-3xl font-bold tracking-tight text-white uppercase">Promote on Maps</h3>
                             <p className="text-zinc-500 max-w-lg mx-auto leading-relaxed">Drive local foot traffic and calls. Your ad will appear at the top of Google Maps search results.</p>
                         </div>
                         <div className="max-w-md mx-auto space-y-6 text-left">
                             <div className="bg-zinc-950 p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-black font-bold text-xs">AD</div>
                                <div>
                                    <p className="font-bold text-white">Sponsored Pin</p>
                                    <p className="text-xs text-zinc-500">Appears for "Real Estate Dubai"</p>
                                </div>
                             </div>
                             <Button onClick={handleLaunchLocalAd} disabled={isLoading} className="w-full h-16 bg-blue-600 hover:bg-blue-700 rounded-2xl text-xl font-bold gap-3 shadow-xl transition-all group uppercase tracking-tight">
                                 {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Zap className="h-6 w-6 group-hover:scale-110" />} Launch Local Ad
                             </Button>
                         </div>
                    </div>
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
  );
}

function MetricCard({ label, value, icon: Icon, trend }: any) {
    return (
        <div className="p-6 rounded-[2rem] bg-zinc-900/40 border border-white/5 flex flex-col justify-between hover:border-blue-500/30 transition-all">
            <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</p>
                <div className="p-2 rounded-xl bg-white/5 text-zinc-500"><Icon className="h-4 w-4" /></div>
            </div>
            <div>
                <p className="text-3xl font-bold text-white tracking-tight uppercase">{value}</p>
                <div className="flex items-center gap-2 mt-2"><TrendingUp className="h-3 w-3 text-green-500" /><span className="text-[10px] font-bold uppercase tracking-tight text-green-500">{trend}</span></div>
            </div>
        </div>
    )
}
