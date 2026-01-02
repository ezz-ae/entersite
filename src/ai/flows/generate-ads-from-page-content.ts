
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateAdsInputSchema, GenerateAdsOutputSchema } from '@/types/ads';

export type { GenerateAdsInput, GenerateAdsOutput } from '@/types/ads';

const generateAdsPrompt = ai.definePrompt({
  name: 'generateAdsPrompt',
  input: { schema: GenerateAdsInputSchema },
  output: { schema: GenerateAdsOutputSchema },
  prompt: `
    You are an expert Google Ads Strategist for the Dubai Real Estate market.
    Analyze this project:
    Title: {{pageTitle}}
    Description: {{pageDescription}}
    Target Audience: {{targetAudience}}
    Location: {{location}}
    USPs: {{usp}}

    Generate a high-performing Google Search Campaign structure.
    Include 4 distinct variations based on different psychological triggers:
    1. ROI_FOCUSED (Yields, Appreciation, Tax-free)
    2. LIFESTYLE_FOCUSED (Amenities, Views, Neighborhood)
    3. URGENCY_FOCUSED (Launch price, Limited units, "Register Now")
    4. LUXURY_FOCUSED (Exclusivity, Design, Branded residences)

    Ensure all headlines are < 30 chars and descriptions < 90 chars.
    Provide negative keywords to avoid low-intent traffic (e.g., "cheap", "jobs", "rent").
    Suggest 4 sitelink extensions.
    Estimate a realistic CPC for Dubai real estate in 2024/2025.
    Output strictly as JSON.
  `,
});

export const generateAdsFromPageContent = ai.defineFlow(
  {
    name: 'generateAdsFromPageContent',
    inputSchema: GenerateAdsInputSchema,
    outputSchema: GenerateAdsOutputSchema,
  },
  async (input) => {
    const { output } = await generateAdsPrompt(input);
    if (!output) throw new Error('Failed to generate ads from AI');
    return output;
  }
);
