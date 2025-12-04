'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const PROJECTS = [
    {
        id: 'full-company',
        title: "Off-Plan Brokerage",
        category: "Full Website",
        developer: "Multi-Developer",
        bgColor: "from-blue-900 to-sky-700",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/the-palace-downtown-dubai-view-from-the-poolside-900.jpg?alt=media&token=45ef0994-1111-4f85-a500-c470c85c3785",
        imageOnHover: true,
    },
    {
        id: 'template-damac-islands',
        title: "Damac Islands Launch",
        category: "Lead Gen",
        developer: "Damac",
        bgColor: "from-purple-900 to-indigo-700",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/DAMAC_Islands-Gallery-00.jpg?alt=media&token=c51b483f-dd32-42ce-85e5-b06beb78c41f",
        imageOnHover: true,
    },
    {
        id: 'template-listing-portal',
        title: "Market Data Portal",
        category: "Search Engine",
        developer: "All Projects",
        bgColor: "from-emerald-900 to-green-700",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/U10759_EXT_ZED739.webp?alt=media&token=be7418eb-0f7f-4df3-8c89-8fa5b070a7aa",
        imageOnHover: true,
    },
    {
        id: 'template-palm-jebel-ali',
        title: "Palm Jebel Ali",
        category: "Luxury Landing",
        developer: "Nakheel",
        bgColor: "from-rose-900 to-pink-700",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/palm_jebel_ali_cover.webp?alt=media&token=c20196a1-a0b2-4dce-af15-f7d31735fba0",
        imageOnHover: true,
    },
    {
        id: 'template-dubai-roadshow',
        title: "Dubai Roadshow Event",
        category: "Event",
        developer: "Dubai Holding",
        bgColor: "from-amber-900 to-yellow-700",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/images.jpeg?alt=media&token=bbb2903e-7751-4d53-9fab-42163541dd5c",
        imageOnHover: true,
    }
];

export function ReadyBuilds() {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6 max-w-[1800px]">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-border/40 pb-12">
            <div className="max-w-3xl space-y-6">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1]">
                    Enterprise-Grade <br/>
                    <span className="text-muted-foreground">Architectures.</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                    Don't start from scratch. Deploy battle-tested, conversion-optimized portals pre-loaded with verified project data.
                </p>
            </div>
            <Button variant="outline" className="gap-2 rounded-full h-12 px-8 text-base mb-2">
                Explore All Templates <ArrowRight className="h-4 w-4" />
            </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {PROJECTS.map((project, i) => (
                <Link key={project.id} href={`/builder?template=${project.id}`}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="group cursor-pointer"
                    >
                        <div className={`relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-gradient-to-br ${project.bgColor} border border-white/10 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]`}>
                            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                            {project.imageUrl && (
                                <Image 
                                    src={project.imageUrl} 
                                    alt={project.title}
                                    fill
                                    className={`object-cover transition-opacity duration-300 ${project.imageOnHover ? 'opacity-0 group-hover:opacity-100' : ''}`}
                                    sizes="(max-width: 768px) 100vw, 20vw"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            
                            <div className="absolute top-5 left-5 flex flex-col gap-2">
                                <Badge className="bg-white/10 text-white backdrop-blur-md border-white/20 shadow-sm px-3 py-1.5 text-xs font-medium">
                                    {project.category}
                                </Badge>
                            </div>

                            <div className="absolute bottom-5 left-5 right-5">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="font-bold text-2xl text-white leading-tight mb-1">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-white/70 font-medium mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        By {project.developer}
                                    </p>
                                    <Button size="sm" className="rounded-full bg-white text-black hover:bg-white/90 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 font-semibold h-10">
                                        Deploy This Build
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>

      </div>
    </section>
  );
}

function BgGridPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
    </svg>
  )
}
