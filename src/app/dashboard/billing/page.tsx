'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Check, AlertCircle, Download } from 'lucide-react';

export default function BillingDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>

        <div className="grid lg:grid-cols-3 gap-8">
            {/* Current Plan */}
            <Card className="lg:col-span-2">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>Current Plan</CardTitle>
                            <CardDescription>You are on the Pro Plan.</CardDescription>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">$29</span>
                        <span className="text-muted-foreground">/month</span>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>AI Credits</span>
                            <span className="font-medium">2,400 / 5,000</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[48%]" />
                        </div>
                    </div>

                     <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Published Sites</span>
                            <span className="font-medium">2 / 10</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[20%]" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t pt-6 flex gap-4">
                    <Button>Upgrade Plan</Button>
                    <Button variant="outline">Cancel Subscription</Button>
                </CardFooter>
            </Card>

            {/* Payment Method */}
            <Card>
                <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="bg-muted p-2 rounded">
                            <CreditCard className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-sm">Visa ending in 4242</p>
                            <p className="text-xs text-muted-foreground">Expires 12/2028</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-600">Edit</Button>
                    </div>
                    <Button variant="outline" className="w-full">Add New Card</Button>
                </CardContent>
            </Card>
        </div>

        {/* Invoice History */}
        <Card>
            <CardHeader>
                <CardTitle>Invoice History</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="space-y-1">
                    {[
                        { id: "INV-001", date: "Oct 01, 2025", amount: "$29.00", status: "Paid" },
                        { id: "INV-002", date: "Sep 01, 2025", amount: "$29.00", status: "Paid" },
                        { id: "INV-003", date: "Aug 01, 2025", amount: "$29.00", status: "Paid" },
                    ].map((inv) => (
                        <div key={inv.id} className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg transition-colors">
                            <div className="flex items-center gap-4">
                                <FileIcon className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium text-sm">{inv.date}</p>
                                    <p className="text-xs text-muted-foreground">{inv.id}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="font-medium">{inv.amount}</span>
                                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">{inv.status}</Badge>
                                <Button variant="ghost" size="icon">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}

function FileIcon(props: any) {
    return (
        <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
    )
}
