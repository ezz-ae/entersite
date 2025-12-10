'use server';
/**
 * @fileOverview An AI agent that suggests the next best blocks to add to a website page.
 *
 * - suggestNextBlocks - A function that suggests the next best blocks to add to a website page based on the current blocks and the overall site type.
 * - SuggestNextBlocksInput - The input type for the suggestNextBlocks function.
 * - SuggestNextBlocksOutput - The return type for the suggestNextBlocks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestNextBlocksInputSchema = z.object({
  currentBlocks: z.array(z.string()).describe('The list of block IDs currently on the page.'),
  siteType: z.string().describe('The type of site being built (e.g., developer launch, roadshow).'),
  brand: z.string().describe('The brand of the site (e.g., LuxuryHomes).'),
  primaryColor: z.string().describe('The primary color of the brand in hex format (e.g., #002F4B).'),
});

export type SuggestNextBlocksInput = z.infer<typeof SuggestNextBlocksInputSchema>;

const SuggestNextBlocksOutputSchema = z.array(
  z.object({
    blockId: z.string().describe('The ID of the suggested block.'),
    order: z.number().describe('The order in which the block should be placed on the page.'),
    defaultContent: z.string().describe('A JSON string representing the default content for the block, with placeholders for dynamic data.'),
    recommendedStyleOverrides: z.string().optional().describe('A JSON string representing recommended style overrides for the block, if needed.'),
    adsReady: z.boolean().describe('Whether the block is ready for ads.'),
    seoReady: z.boolean().describe('Whether the block is ready for SEO.'),
  })
);

export type SuggestNextBlocksOutput = z.infer<typeof SuggestNextBlocksOutputSchema>;

export async function suggestNextBlocks(input: SuggestNextBlocksInput): Promise<SuggestNextBlocksOutput> {
  const result = await suggestNextBlocksFlow(input);
  // The AI model will return JSON strings, so we need to parse them.
  return result.map(item => ({
      ...item,
      defaultContent: JSON.parse(item.defaultContent || '{}'),
      recommendedStyleOverrides: item.recommendedStyleOverrides ? JSON.parse(item.recommendedStyleOverrides) : undefined,
  }));
}

const prompt = ai.definePrompt({
  name: 'suggestNextBlocksPrompt',
  input: {schema: SuggestNextBlocksInputSchema},
  output: {schema: SuggestNextBlocksOutputSchema},
  prompt: `User has created a landing page with the following blocks: {{{currentBlocks}}}.\nSite type: "{{{siteType}}}", brand: "{{{brand}}}", primary color: "{{{primaryColor}}}".\nSuggest 5 next blocks to maintain high conversion. For each suggestion provide:\n- blockId\n- order\n- defaultContent as a JSON string with placeholders: %PROJECT_NAME%, %CITY%, %PRICE%, %DEVELOPER%\n- recommendedStyleOverrides as a JSON string if needed\n- adsReady boolean\n- seoReady boolean\nOutput strictly as a valid JSON array. Ensure all content fields are proper JSON strings.`,
});

const suggestNextBlocksFlow = ai.defineFlow(
  {
    name: 'suggestNextBlocksFlow',
    inputSchema: SuggestNextBlocksInputSchema,
    outputSchema: SuggestNextBlocksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
