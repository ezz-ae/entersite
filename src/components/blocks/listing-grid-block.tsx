import Image from 'next/image';
import { MapPin } from 'lucide-react';
import type { ProjectData } from '@/lib/types';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';

interface ListingGridBlockProps {
  headline: string;
  subtext: string;
  projects: ProjectData[];
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
                  src={project.images?.[0] || 'https://picsum.photos/seed/property-placeholder/800/600'}
                  alt={project.name}
                  fill
                  className="object-cover"
                  data-ai-hint="luxury property"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <h3 className="text-xl font-semibold truncate">{project.name}</h3>
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPin className="mr-1.5" />
                <span>{project.location.city}</span>
              </div>
               <div className="pt-2">
                <p className="text-2xl font-bold text-primary">
                  {project.price.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
