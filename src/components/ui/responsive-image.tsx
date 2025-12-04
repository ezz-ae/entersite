'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Layout } from 'lucide-react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  aspectRatio?: string; // e.g., "16/9", "4/3", "1/1"
  className?: string;
  priority?: boolean;
  fill?: boolean; // Set to true for fill behavior
}

export function ResponsiveImage({
  src,
  alt,
  aspectRatio = "16/9",
  className,
  priority = false,
  fill = false,
}: ResponsiveImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (imageError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted/40 text-muted-foreground rounded-lg overflow-hidden",
          !fill && aspectRatio && `aspect-[${aspectRatio.replace('/','/')}]`,
          fill && "absolute inset-0",
          className
        )}
      >
        <Layout className="h-1/2 w-1/2 opacity-30" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        !fill && aspectRatio && `aspect-[${aspectRatio.replace('/','/')}]`,
        fill && "absolute inset-0",
        className
      )}
    >
      {isLoading && (
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-muted/20 animate-pulse",
            !fill && aspectRatio && `aspect-[${aspectRatio.replace('/','/')}]`
          )}
        >
          <Layout className="h-1/3 w-1/3 text-muted-foreground opacity-20" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={cn("object-cover transition-opacity duration-500", isLoading ? "opacity-0" : "opacity-100")}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  );
}
