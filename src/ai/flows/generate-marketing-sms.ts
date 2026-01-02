import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateMarketingSmsInputSchema = z.object({
  projectName: z.string(),
  developer: z.string(),
  location: z.string(),
  roi: z.number().optional(),
  handover: z.string().optional(),
  priceLabel: z.string().optional(),
  urgency: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
});

export type GenerateMarketingSmsInput = z.infer<typeof GenerateMarketingSmsInputSchema>;

const MarketingSmsOutputSchema = z.object({
  message: z.string().max(160).describe('The SMS content, optimized for high click-through rates.'),
  whatsappMessage: z.string().max(800).describe('A longer version for WhatsApp with formatting and emojis.'),
  ctaLink: z.string(),
});

export type MarketingSmsOutput = z.infer<typeof MarketingSmsOutputSchema>;

const generateSmsPrompt = ai.definePrompt({
  name: 'generateSmsPrompt',
  input: { schema: GenerateMarketingSmsInputSchema },
  output: { schema: MarketingSmsOutputSchema },
  prompt: `
    You are an expert real estate copywriter specializing in short-form mobile marketing for the UAE.
    Create a punchy SMS and WhatsApp message for:
    Project: {{projectName}} by {{developer}}
    Location: {{location}}
    ROI: {{roi}}% 
    Handover: {{handover}}
    Price: {{priceLabel}}
    Urgency Level: {{urgency}}

    Guidelines:
    - SMS must be under 160 characters (1 segment).
    - WhatsApp version can be longer, include line breaks, bold text, and relevant emojis (🏗️, 📈, 💎).
    - Tone: Urgent, exclusive, and professional.
    - Use "Payment plan available" if relevant.
    - Include a CTA like "Reply for info" or "Click to view".
    - Output strictly as JSON.
  `,
});

export const generateMarketingSms = ai.defineFlow(
  {
    name: 'generateMarketingSms',
    inputSchema: GenerateMarketingSmsInputSchema,
    outputSchema: MarketingSmsOutputSchema,
  },
  async (input) => {
    const { output } = await generateSmsPrompt(input);
    if (!output) throw new Error('Failed to generate marketing SMS');
    return output;
  }
);
