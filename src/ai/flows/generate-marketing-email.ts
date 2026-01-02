import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateMarketingEmailInputSchema = z.object({
  projectName: z.string(),
  developer: z.string(),
  location: z.string(),
  roi: z.number().optional(),
  handover: z.string().optional(),
  priceLabel: z.string().optional(),
  targetAudience: z.enum(['INTERNATIONAL_INVESTOR', 'LOCAL_END_USER', 'FLIPPER']).default('INTERNATIONAL_INVESTOR'),
});

export type GenerateMarketingEmailInput = z.infer<typeof GenerateMarketingEmailInputSchema>;

const MarketingEmailOutputSchema = z.object({
  subject: z.string().max(100),
  previewText: z.string().max(150),
  bodyHtml: z.string().describe('The email body in high-end HTML format suitable for luxury real estate.'),
  ctaLabel: z.string(),
});

export type MarketingEmailOutput = z.infer<typeof MarketingEmailOutputSchema>;

const generateEmailPrompt = ai.definePrompt({
  name: 'generateEmailPrompt',
  input: { schema: GenerateMarketingEmailInputSchema },
  output: { schema: MarketingEmailOutputSchema },
  prompt: `
    You are an elite real estate marketing strategist for the UAE market.
    Draft a high-conversion, professional marketing email for:
    Project: {{projectName}} by {{developer}}
    Location: {{location}}
    ROI: {{roi}}% 
    Handover: {{handover}}
    Price Starting: {{priceLabel}}
    Target: {{targetAudience}}

    Rules:
    - Tone: Exclusive, knowledgeable, and urgency-driven but elegant.
    - Focus on the ROI and Capital Appreciation if targeting investors.
    - Focus on lifestyle and amenities if targeting end-users.
    - Include a clear CTA to "Download Inventory" or "Book Private Tour".
    - The bodyHtml should use clean inline CSS with a dark-theme "EntreSite OS" aesthetic (black background, white/zinc text, blue accents).
    - Avoid spammy words like "Guarantee", "Cheap", "Buy now". Use "Secure your unit", "Private viewing".
    - Output strictly as JSON.
  `,
});

export const generateMarketingEmail = ai.defineFlow(
  {
    name: 'generateMarketingEmail',
    inputSchema: GenerateMarketingEmailInputSchema,
    outputSchema: MarketingEmailOutputSchema,
  },
  async (input) => {
    const { output } = await generateEmailPrompt(input);
    if (!output) throw new Error('Failed to generate marketing email');
    return output;
  }
);
