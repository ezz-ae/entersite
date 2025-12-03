'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, CreditCard, Bell, LogOut, Building, ShieldCheck } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="min-h-screen bg-muted/20 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

        <div className="grid md:grid-cols-[250px_1fr] gap-8">
            {/* Sidebar */}
            <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start gap-2 bg-background shadow-sm font-medium">
                    <User className="h-4 w-4" /> Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:bg-background">
                    <Building className="h-4 w-4" /> Company
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:bg-background">
                    <CreditCard className="h-4 w-4" /> Billing
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:bg-background">
                    <Bell className="h-4 w-4" /> Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:bg-background">
                    <ShieldCheck className="h-4 w-4" /> Security
                </Button>
                <div className="pt-4 mt-4 border-t">
                    <Button variant="ghost" className="w-full justify-start gap-2 text-red-600 hover:text-red-600 hover:bg-red-50">
                        <LogOut className="h-4 w-4" /> Log out
                    </Button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-6">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                                <Button variant="outline" size="sm">Change Avatar</Button>
                                <p className="text-xs text-muted-foreground mt-2">JPG, GIF or PNG. Max size of 800K</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" defaultValue="John" disabled={!isEditing} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" defaultValue="Doe" disabled={!isEditing} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" defaultValue="john.doe@example.com" disabled />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Input id="bio" defaultValue="Real Estate Developer based in Dubai." disabled={!isEditing} />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            {isEditing ? (
                                <>
                                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                                    <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                                </>
                            ) : (
                                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Subscription Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg border">
                            <div>
                                <p className="font-medium">Pro Plan</p>
                                <p className="text-sm text-muted-foreground">$29/month • Renews on Nov 15, 2025</p>
                            </div>
                            <Button variant="outline">Manage Subscription</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </main>
  );
}
