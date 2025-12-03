'use client';

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatarId: string;
}

interface TestimonialBlockProps {
  headline?: string;
  subtext?: string;
  testimonials?: Testimonial[];
}

export function TestimonialBlock({
  headline = "Trusted by the Best",
  subtext = "Hear what our clients have to say about their experience with us.",
  testimonials = [
    {
      quote: "Working with this team was a game-changer. Their AI-powered platform helped us launch our project website in record time, and the lead quality has been outstanding.",
      author: "Fatima Al-Marzouqi",
      role: "CEO, Prestige Properties",
      avatarId: "user-avatar-1",
    },
    {
      quote: "The automated Google Ads campaigns are incredibly effective. We saw a 200% increase in qualified leads within the first month. Highly recommended for any serious developer.",
      author: "Johnathan Smith",
      role: "Marketing Director, Skyline Developments",
      avatarId: "user-avatar-2",
    },
    {
      quote: "As a boutique agency, we need to be agile. EntreSite allowed us to compete with the big players, giving us a professional web presence without the huge overhead.",
      author: "Chen Wei",
      role: "Founder, Urban Nest Realty",
      avatarId: "user-avatar-3",
    },
  ],
}: TestimonialBlockProps) {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight">{headline}</h2>
          <p className="text-lg text-muted-foreground mt-4">{subtext}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => {
            const avatar = PlaceHolderImages.find(
              (img) => img.id === testimonial.avatarId
            );
            return (
              <div
                key={i}
                className="bg-card p-8 rounded-2xl shadow-sm border flex flex-col"
              >
                <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                </div>
                <p className="text-muted-foreground italic mb-6 flex-grow">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  {avatar && (
                    <Avatar>
                      <AvatarImage
                        src={avatar.imageUrl}
                        alt={testimonial.author}
                        data-ai-hint={avatar.imageHint}
                      />
                      <AvatarFallback>
                        {testimonial.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
