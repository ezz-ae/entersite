'use client';

import React from "react";
import { Button } from "@/components/ui/button";

// Map Block Placeholder
export function MapBlock({ headline = "Explore the Location" }: { headline?: string }) {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">{headline}</h2>
          <p className="text-muted-foreground">Discover the neighborhood and nearby amenities.</p>
        </div>
        <div className="w-full h-[400px] bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-muted-foreground/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/USA_location_map.svg')] bg-cover opacity-20 group-hover:opacity-30 transition-opacity blur-[1px]"></div>
             <div className="z-10 text-center">
                 <p className="text-lg font-medium text-muted-foreground mb-4">Interactive Map Component</p>
                 <Button variant="secondary">View Full Map</Button>
             </div>
        </div>
      </div>
    </section>
  );
}

// Testimonial Block Placeholder
export function TestimonialBlock({ headline = "What Our Clients Say" }: { headline?: string }) {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
         <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{headline}</h2>
          <p className="text-muted-foreground">Hear from our satisfied homeowners and investors.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-background p-8 rounded-xl shadow-sm border relative">
              <div className="text-4xl text-primary/20 font-serif absolute top-4 left-6">"</div>
              <p className="text-muted-foreground mb-6 relative z-10 italic">
                "This was the best investment decision I've ever made. The team was incredibly professional and guided me through every step."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-muted overflow-hidden relative">
                     {/* Placeholder Avatar */}
                     <div className="absolute inset-0 bg-primary/20 flex items-center justify-center text-primary font-bold">
                         U{i}
                     </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Client Name {i}</h4>
                  <p className="text-xs text-muted-foreground">Homeowner, Dubai</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
