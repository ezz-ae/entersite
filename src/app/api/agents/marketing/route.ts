import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// NOTE: The expensive Dialogflow CX client has been removed to prevent charges.
// The agent response is now mocked.

const agentResponseSchema = z.object({
  siteType: z.enum(['roadshow', 'developer-focus', 'partner-launch', 'full-company', 'freelancer', 'map-focused', 'ads-launch', 'agent-portfolio', 'custom']).optional(),
  pageTitle: z.string().optional(),
  projectName: z.string().optional(),
  developerName: z.string().optional(),
  locationCity: z.string().optional(),
  brandColor: z.string().optional(),
  logoUrl: z.string().optional(),
  adCampaignConfig: z.object({
    budget: z.number().optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
  blocks: z.array(z.object({
    type: z.string(),
    data: z.record(z.any()).optional()
  })).optional(),
});


export async function POST(req: NextRequest) {
    // DEV MODE: Always return mock data to prevent charges.
    // This was the source of high Vertex AI costs.
    const mockConfig = {
      siteType: 'full-company',
      pageTitle: 'Luxury Portfolio Generated',
      projectName: 'Marina Residences',
      developerName: 'Emaar',
      brandColor: '#D4AF37', // Gold
      blocks: [
        { type: 'hero', data: { headline: "Your AI-Crafted Luxury Site", subtext: "Generated instantly by EntreSite AI." } },
        { type: 'listing-grid', data: { headline: "Featured Marina Residences" } },
        { type: 'cta-form', data: { headline: "Book Your Exclusive Tour" } }
      ]
    };
    
    return NextResponse.json({ 
      text: "(Mock Agent): I'm simulating the agent response to prevent further charges. The live agent has been disconnected.",
      parameters: mockConfig,
      isEndInteraction: true
    });
}
