'use server';
/**
 * @fileOverview An SEO metadata generation AI agent.
 *
 * - generateSeoMetadata - A function that handles the generation of SEO metadata.
 * - GenerateSeoMetadataInput - The input type for the generateSeoMetadata function.
 * - GenerateSeoMetadataOutput - The return type for the generateSeoMetadata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoMetadataInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  city: z.string().describe('The city where the project is located.'),
  price: z.number().describe('The price of the project.'),
  developer: z.string().describe('The developer of the project.'),
  features: z.string().describe('The features of the project.'),
});
export type GenerateSeoMetadataInput = z.infer<typeof GenerateSeoMetadataInputSchema>;

const GenerateSeoMetadataOutputSchema = z.object({
  seoTitle: z.string().describe('The SEO title for the listing.'),
  seoDescription: z.string().describe('The SEO description for the listing.'),
  ogTitle: z.string().describe('The Open Graph title for the listing.'),
  ogDescription: z.string().describe('The Open Graph description for the listing.'),
  jsonLd: z.string().describe('The JSON-LD for the RealEstateListing schema.'),
});
export type GenerateSeoMetadataOutput = z.infer<typeof GenerateSeoMetadataOutputSchema>;

export async function generateSeoMetadata(input: GenerateSeoMetadataInput): Promise<GenerateSeoMetadataOutput> {
  return generateSeoMetadataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoMetadataPrompt',
  input: {schema: GenerateSeoMetadataInputSchema},
  output: {schema: GenerateSeoMetadataOutputSchema},
  prompt: `Produce SEO-friendly title, description, Open Graph (OG) title and description, and JSON-LD for RealEstateListing schema using the following information:\n\nProject Name: {{{projectName}}}\nCity: {{{city}}}\nPrice: {{{price}}}\nDeveloper: {{{developer}}}\nFeatures: {{{features}}}\n\nEnsure canonical URLs are correct.\n\nOutput the results as a JSON object.`,
});

const generateSeoMetadataFlow = ai.defineFlow(
  {
    name: 'generateSeoMetadataFlow',
    inputSchema: GenerateSeoMetadataInputSchema,
    outputSchema: GenerateSeoMetadataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
