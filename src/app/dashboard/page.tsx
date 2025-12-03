import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Globe, ArrowUpRight, Users, DollarSign, MousePointerClick } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard title="Total Revenue" value="$45,231.89" trend="+20.1%" icon={DollarSign} />
            <StatsCard title="Active Leads" value="2,345" trend="+15%" icon={Users} />
            <StatsCard title="Site Visits" value="12,344" trend="+4%" icon={Globe} />
            <StatsCard title="Ad Clicks" value="843" trend="+8%" icon={MousePointerClick} />
        </div>

        {/* Recent Activity & Projects */}
        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Live Projects */}
            <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Live Projects</CardTitle>
                    <Button variant="outline" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {[
                            { name: "Dubai Luxury Launch", status: "Live", url: "entresite.ai/p/dubai-lux", views: "1.2k" },
                            { name: "Emaar Portfolio", status: "Building", url: "-", views: "-" },
                            { name: "Agent Personal Site", status: "Live", url: "entresite.ai/p/sarah-agent", views: "450" },
                        ].map((project, i) => (
                            <div key={i} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                                <div>
                                    <p className="font-medium">{project.name}</p>
                                    <p className="text-sm text-muted-foreground">{project.url}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className={`text-xs px-2 py-1 rounded-full ${project.status === 'Live' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {project.status}
                                    </div>
                                    <div className="text-sm font-medium text-right w-16">
                                        {project.views} <span className="text-xs text-muted-foreground font-normal">views</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* System Status / Notifications */}
            <Card>
                <CardHeader>
                    <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                            <Activity className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-medium">All Systems Operational</p>
                            <p className="text-xs text-muted-foreground">Last check: 2 mins ago</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase">Recent Actions</h4>
                        <div className="text-sm space-y-3">
                            <div className="flex justify-between">
                                <span>Published "Dubai Luxury"</span>
                                <span className="text-muted-foreground text-xs">2h ago</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Updated SEO Settings</span>
                                <span className="text-muted-foreground text-xs">5h ago</span>
                            </div>
                            <div className="flex justify-between">
                                <span>New Lead: John D.</span>
                                <span className="text-muted-foreground text-xs">1d ago</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

      </div>
    </DashboardLayout>
  );
}

function StatsCard({ title, value, trend, icon: Icon }: any) {
    return (
        <Card>
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <h3 className="text-2xl font-bold mt-2">{value}</h3>
                    <p className="text-xs text-green-600 mt-1 flex items-center">
                        {trend} <ArrowUpRight className="h-3 w-3 ml-0.5" />
                        <span className="text-muted-foreground ml-1">from last month</span>
                    </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Icon className="h-6 w-6" />
                </div>
            </CardContent>
        </Card>
    )
}
