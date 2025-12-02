'use server';
/**
 * @fileOverview Generates Google Ads campaigns from page content.
 *
 * - generateAdsFromPageContent - A function that handles the ad generation process.
 * - GenerateAdsFromPageContentInput - The input type for the generateAdsFromPageContent function.
 * - GenerateAdsFromPageContentOutput - The return type for the generateAdsFromPageContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAdsFromPageContentInputSchema = z.object({
  pageJson: z.string().describe('The JSON representation of the landing page content.'),
  projectName: z.string().describe('The name of the project.'),
  city: z.string().describe('The city where the project is located.'),
  features: z.string().describe('Key features of the project.'),
});
export type GenerateAdsFromPageContentInput = z.infer<typeof GenerateAdsFromPageContentInputSchema>;

const GenerateAdsFromPageContentOutputSchema = z.object({
  headlines: z.array(z.string()).describe('An array of headline options for the Google Ads campaign.'),
  descriptions: z.array(z.string()).describe('An array of description options for the Google Ads campaign.'),
  keywords: z.array(z.string()).describe('An array of keywords for the Google Ads campaign.'),
  suggestedImages: z.array(z.string()).describe('An array of suggested image URLs or placeholders.'),
  campaignJson: z.string().describe('The complete Google Ads campaign JSON ready for API push.'),
});
export type GenerateAdsFromPageContentOutput = z.infer<typeof GenerateAdsFromPageContentOutputSchema>;

export async function generateAdsFromPageContent(input: GenerateAdsFromPageContentInput): Promise<GenerateAdsFromPageContentOutput> {
  return generateAdsFromPageContentFlow(input);
}

const generateAdsPrompt = ai.definePrompt({
  name: 'generateAdsPrompt',
  input: {schema: GenerateAdsFromPageContentInputSchema},
  output: {schema: GenerateAdsFromPageContentOutputSchema},
  prompt: `Generate Google Ads for project {{{projectName}}} in {{{city}}}. Include {{{features}}}.\nOutput:\n- 3 headline options
- 3 description options
- keywords array
- suggested images (URLs or placeholders)
- campaign JSON ready for Google Ads API
Tone: professional, persuasive, conversion-focused.`,
});

const generateAdsFromPageContentFlow = ai.defineFlow(
  {
    name: 'generateAdsFromPageContentFlow',
    inputSchema: GenerateAdsFromPageContentInputSchema,
    outputSchema: GenerateAdsFromPageContentOutputSchema,
  },
  async input => {
    const {output} = await generateAdsPrompt(input);
    return output!;
  }
);
