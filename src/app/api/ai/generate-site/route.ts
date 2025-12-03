import { NextRequest, NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { fullCompanyTemplate } from '@/lib/templates'; // Fallback

// We define a schema that matches our SiteTemplate structure broadly
// For simplicity, we will ask AI to return a list of block types and some basic settings
const siteSchema = z.object({
  siteType: z.enum(['roadshow', 'developer-focus', 'partner-launch', 'full-company', 'freelancer', 'map-focused', 'ads-launch']),
  pageTitle: z.string(),
  blocks: z.array(z.object({
    type: z.string(),
    data: z.record(z.any()).optional()
  })),
  themeColor: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    // If no API key is configured, return mock response
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        // console.warn("No Gemini API Key found. Returning mock data.");
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Return a mock structure based on keywords
        const isLuxury = prompt.toLowerCase().includes('luxury');
        const isLaunch = prompt.toLowerCase().includes('launch');
        
        return NextResponse.json({
            siteType: isLaunch ? 'ads-launch' : 'full-company',
            pageTitle: isLuxury ? 'Luxury Living' : 'Real Estate Portfolio',
            blocks: [
                { type: isLaunch ? 'launch-hero' : 'hero', data: { headline: isLuxury ? "Exquisite Waterfront Living" : "Find Your Dream Home" } },
                { type: 'stats', data: {} },
                { type: 'listing-grid', data: {} },
                { type: 'cta-form', data: {} }
            ]
        });
    }

    const result = await generateObject({
      model: google('gemini-1.5-flash'),
      schema: siteSchema,
      prompt: `
        You are an expert real estate web designer.
        Generate a website structure based on this user prompt: "${prompt}".
        
        Available block types: 
        hero, launch-hero, coming-soon-hero, hero-lead-form, 
        listing-grid, listing-grid-map, featured-listing, 
        project-detail, floor-plan, features, 
        offer, banner-cta, cta-grid, cta-form, newsletter, 
        roadshow, team, map, gallery, video, split-content, 
        city-guide, testimonial, stats, partners, developers-list, 
        faq, chat-widget, blog-grid, mortgage-calculator, roi-calculator, payment-plan, contact-details.

        Choose the best sequence of blocks to maximize conversion.
        Provide a headline for the hero block.
      `,
    });

    return NextResponse.json(result.object);

  } catch (error) {
    console.error('AI Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate site' }, { status: 500 });
  }
}
