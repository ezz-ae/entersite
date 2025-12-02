import Image from 'next/image';
import { MapPin, Bed, Bath, AreaChart } from 'lucide-react';
import type { Project } from '@/lib/types';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ListingGridBlockProps {
  headline: string;
  subtext: string;
  projects: Project[];
}

export function ListingGridBlock({ headline, subtext, projects }: ListingGridBlockProps) {
  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">{headline}</h2>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">{subtext}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
              <div className="relative h-56 w-full">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover"
                  data-ai-hint="luxury property"
                />
                 <Badge variant="secondary" className="absolute top-3 right-3">{project.features.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <h3 className="text-xl font-semibold truncate">{project.title}</h3>
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPin className="mr-1.5" />
                <span>{project.city}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Bed />
                    <span>{project.features.beds}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath />
                    <span>{project.features.baths}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <AreaChart />
                    <span>{project.features.area.toLocaleString()} sqft</span>
                  </div>
                </div>
              </div>
               <div className="pt-2">
                <p className="text-2xl font-bold text-primary">
                  {project.currency} {project.price.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
