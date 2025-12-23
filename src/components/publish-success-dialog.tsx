'use client';

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy, ExternalLink, Globe, Loader2, Share2, Twitter, Linkedin } from "lucide-react";
import { useToast } from "@/components/ui/toaster";
import { publishSite } from "@/lib/publish-service";
import type { SitePage } from '@/lib/types';
import confetti from 'canvas-confetti';

interface PublishSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  page: SitePage;
}

export function PublishSuccessDialog({ 
    open, 
    onOpenChange,
    page
}: PublishSuccessDialogProps) {
  const { toast } = useToast();
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [publishedUrl, setPublishedUrl] = React.useState("");

  React.useEffect(() => {
      if (open && !publishedUrl) {
          handlePublish();
      }
  }, [open]);

  const handlePublish = async () => {
      setIsPublishing(true);
      try {
          const result = await publishSite(page);
          setPublishedUrl(result.publishedUrl);
          
          // Trigger confetti on success
          const duration = 3 * 1000;
          const animationEnd = Date.now() + duration;
          const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

          const random = (min: number, max: number) => Math.random() * (max - min) + min;

          const interval: any = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
              return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } });
          }, 250);

      } catch (error) {
          console.error("Failed to publish", error);
          toast({
              title: "Error",
              description: "Failed to publish site. Please try again.",
              variant: "destructive"
          });
      } finally {
          setIsPublishing(false);
      }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(publishedUrl);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center p-8 overflow-hidden">
        
        {isPublishing ? (
            <div className="py-16 space-y-6">
                <div className="relative mx-auto w-24 h-24">
                    <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-3 border-t-4 border-primary/40 rounded-full animate-spin reverse"></div>
                    <Globe className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse" />
                </div>
                <div>
                    <h3 className="text-xl font-bold">Publishing your site...</h3>
                    <p className="text-muted-foreground mt-2">Optimizing assets and generating SSL.</p>
                </div>
            </div>
        ) : (
            <div className="animate-in fade-in zoom-in duration-500">
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100/50">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-center">You're Live!</DialogTitle>
                    <DialogDescription className="text-center text-base mt-2 max-w-xs mx-auto">
                        Your real estate site is now published and ready to convert visitors.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-8 space-y-6">
                    <div className="bg-muted p-1 rounded-xl border flex items-center">
                        <div className="flex-1 px-4 py-2 text-sm font-mono text-left truncate text-muted-foreground">
                            {publishedUrl}
                        </div>
                        <Button size="sm" onClick={handleCopy} className="rounded-lg h-9">
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full h-12 text-base" onClick={() => window.open(publishedUrl, '_blank')}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit Site
                        </Button>
                        <Button className="w-full h-12 text-base bg-green-600 hover:bg-green-700 text-white" onClick={() => {}}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                        </Button>
                    </div>
                    
                    <div className="flex justify-center gap-4 pt-2">
                        <Button variant="ghost" size="icon" className="rounded-full hover:text-blue-400 hover:bg-blue-50">
                            <Twitter className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full hover:text-blue-700 hover:bg-blue-50">
                            <Linkedin className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                
                <div className="mt-8 pt-6 border-t">
                    <Button variant="link" className="text-muted-foreground" onClick={() => onOpenChange(false)}>
                        Back to Editor
                    </Button>
                </div>
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
