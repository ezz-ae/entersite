'use server';
/**
 * @fileOverview An AI agent that generates Google Ads campaigns from page content.
 *
 * - generateAdsFromPageContent - A function that generates ad copy.
 * - GenerateAdsInput - The input type for the function.
 * - GenerateAdsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateAdsInputSchema = z.object({
  pageTitle: z.string().describe('The title of the page or project.'),
  pageDescription: z.string().describe('A brief description of the page content or project details.'),
});
export type GenerateAdsInput = z.infer<typeof GenerateAdsInputSchema>;

export const GenerateAdsOutputSchema = z.object({
  headlines: z.array(z.string()).length(3).describe('Three catchy, high-conversion headlines for a Google Ad. Max 30 characters each.'),
  descriptions: z.array(z.string()).length(2).describe('Two compelling descriptions for the ad body. Max 90 characters each.'),
  keywords: z.array(z.string()).describe('A list of 5-10 high-intent keywords relevant to the content.'),
});
export type GenerateAdsOutput = z.infer<typeof GenerateAdsOutputSchema>;

export async function generateAdsFromPageContent(input: GenerateAdsInput): Promise<GenerateAdsOutput> {
    return generateAdsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAdsPrompt',
  input: {schema: GenerateAdsInputSchema},
  output: {schema: GenerateAdsOutputSchema},
  prompt: `You are a Google Ads expert specializing in real estate.
Based on the following page content, generate a complete ad campaign.

Page Title: {{{pageTitle}}}
Page Description: {{{pageDescription}}}

Generate exactly 3 headlines (max 30 characters), 2 descriptions (max 90 characters), and 5-10 relevant keywords.
Prioritize keywords that indicate high purchase intent for real estate in Dubai (e.g., "buy villa dubai", "off-plan emaar", "dubai luxury property investment").
Ensure the output is a valid JSON object.`,
});

const generateAdsFlow = ai.defineFlow(
  {
    name: 'generateAdsFlow',
    inputSchema: GenerateAdsInputSchema,
    outputSchema: GenerateAdsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
