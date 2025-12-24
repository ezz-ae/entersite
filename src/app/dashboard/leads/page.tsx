'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Filter, Search, Mail, Phone } from 'lucide-react';

export default function LeadsDashboardPage() {
  return (
      <div className="space-y-8">
        
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Leads & CRM</h1>
                <p className="text-muted-foreground">Manage and export your potential clients.</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" /> Export CSV
                </Button>
                <Button>Connect CRM</Button>
            </div>
        </div>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center gap-2 flex-1">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search leads..." className="pl-9 h-10" />
                    </div>
                    <Button variant="outline" size="icon" className="h-10 w-10">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Interest</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[
                            { name: "Ahmed Al-Mansouri", email: "ahmed@gmail.com", phone: "+971 50...", interest: "Luxury Villa", source: "Google Ads", date: "2h ago", status: "New" },
                            { name: "Sarah Johnson", email: "sarah.j@outlook.com", phone: "+44 7...", interest: "Off-Plan Investment", source: "Direct", date: "5h ago", status: "Contacted" },
                            { name: "Michael Chen", email: "m.chen@tech.com", phone: "+1 415...", interest: "Downtown Apartment", source: "Facebook", date: "1d ago", status: "Qualified" },
                            { name: "Elena Petrova", email: "elena@mail.ru", phone: "+7 9...", interest: "Waterfront", source: "Google Ads", date: "2d ago", status: "New" },
                        ].map((lead, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{lead.name}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</span>
                                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {lead.phone}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{lead.interest}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="text-xs font-normal">{lead.source}</Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground text-sm">{lead.date}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={
                                        lead.status === 'New' ? 'bg-blue-500' : 
                                        lead.status === 'Contacted' ? 'bg-yellow-500' : 'bg-green-500'
                                    }>
                                        {lead.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

      </div>
  );
}
