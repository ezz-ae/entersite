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
