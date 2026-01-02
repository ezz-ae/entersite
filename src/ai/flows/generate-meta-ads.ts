import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateMetaAdsInputSchema = z.object({
  pageTitle: z.string(),
  pageDescription: z.string(),
  location: z.string().optional(),
});

const MetaAdVariationSchema = z.object({
  id: z.string(),
  primaryText: z.string().max(125).describe('The main text that appears above the image on Facebook/Instagram.'),
  headline: z.string().max(40).describe('The bold headline that appears next to the CTA button.'),
  description: z.string().max(30).describe('Additional context below the headline.'),
  cta: z.enum(['LEARN_MORE', 'BOOK_NOW', 'SIGN_UP', 'CONTACT_US']),
});

const GenerateMetaAdsOutputSchema = z.object({
  variations: z.array(MetaAdVariationSchema),
  targetInterests: z.array(z.string()).describe('Suggested Meta interest categories for real estate.'),
  estimatedCpm: z.number().describe('Estimated cost per 1,000 impressions in AED.'),
});

export type GenerateMetaAdsOutput = z.infer<typeof GenerateMetaAdsOutputSchema>;

const generateMetaAdsPrompt = ai.definePrompt({
  name: 'generateMetaAdsPrompt',
  input: { schema: GenerateMetaAdsInputSchema },
  output: { schema: GenerateMetaAdsOutputSchema },
  prompt: `
    You are an expert Meta Ads Strategist (Facebook/Instagram) specializing in UAE Real Estate.
    Project: {{pageTitle}}
    Context: {{pageDescription}}
    Location: {{location}}

    Generate 3 high-converting Meta Ad variations.
    Each must include:
    1. Primary Text (Hook-driven, use emojis, < 125 chars)
    2. Headline (Urgency or Benefit, < 40 chars)
    3. Description (Social proof or key feature, < 30 chars)
    4. Appropriate CTA.

    Also suggest 5 Meta Interest categories (e.g., "Luxury real estate", "Investment") to target.
    Estimate CPM for luxury real estate in Dubai/UAE.
    Output strictly as JSON.
  `,
});

export const generateMetaAdsFromPageContent = ai.defineFlow(
  {
    name: 'generateMetaAdsFromPageContent',
    inputSchema: GenerateMetaAdsInputSchema,
    outputSchema: GenerateMetaAdsOutputSchema,
  },
  async (input) => {
    const { output } = await generateMetaAdsPrompt(input);
    if (!output) throw new Error('Failed to generate Meta ads from AI');
    return output;
  }
);
