'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface TeamMember {
  name: string;
  role: string;
  imageId: string;
  bio?: string;
}

interface TeamBlockProps {
  headline?: string;
  subtext?: string;
  members?: TeamMember[];
}

export function TeamBlock({
  headline = "Meet Our Experts",
  subtext = "Our team of seasoned professionals is dedicated to guiding you through every step of your real estate journey.",
  members = [
      { name: "Sarah Jenkins", role: "Senior Consultant", imageId: "user-avatar-1", bio: "Specializing in luxury penthouses with over 10 years of experience." },
      { name: "David Chen", role: "Investment Advisor", imageId: "user-avatar-2", bio: "Expert in high-yield property investments and portfolio management." },
      { name: "Maria Rodriguez", role: "Sales Director", imageId: "user-avatar-3", bio: "Leading our sales strategies with a focus on client satisfaction." },
      { name: "James Wilson", role: "Property Manager", imageId: "user-avatar", bio: "Ensuring your assets are maintained to the highest standards." }
  ]
}: TeamBlockProps) {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{headline}</h2>
          <p className="text-lg text-muted-foreground">{subtext}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => {
            const memberImage = PlaceHolderImages.find(p => p.id === member.imageId);
            return (
              <div key={index} className="bg-background rounded-xl overflow-hidden shadow-sm border group hover:shadow-md transition-all duration-300">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  {memberImage && (
                    <Image
                      src={memberImage.imageUrl}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                       <div className="flex gap-4 text-white">
                           <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/20 hover:text-white rounded-full">
                               <Linkedin className="h-4 w-4" />
                           </Button>
                           <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/20 hover:text-white rounded-full">
                               <Twitter className="h-4 w-4" />
                           </Button>
                           <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/20 hover:text-white rounded-full">
                               <Instagram className="h-4 w-4" />
                           </Button>
                       </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-sm font-medium text-primary mb-3">{member.role}</p>
                  {member.bio && (
                      <p className="text-xs text-muted-foreground line-clamp-2">{member.bio}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
