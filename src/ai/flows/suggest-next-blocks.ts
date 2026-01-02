'use server';
/**
 * @fileOverview An AI agent that suggests the next best blocks to add to a website page.
 *
 * - suggestNextBlocks - A function that suggests the next best blocks to add to a website page based on the current blocks and the overall site type.
 * - SuggestNextBlocksInput - The input type for the suggestNextBlocks function.
 * - SuggestNextBlocksOutput - The return type for the suggestNextBlocks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { SuggestNextBlocksInputSchema, SuggestNextBlocksOutputSchema } from '@/types/block-suggestions';

export type { SuggestNextBlocksInput, SuggestNextBlocksOutput } from '@/types/block-suggestions';

export async function suggestNextBlocks(input: SuggestNextBlocksInput): Promise<SuggestNextBlocksOutput> {
  const result = await suggestNextBlocksFlow(input);
  // The AI model will return JSON strings, so we need to parse them.
  return result.map(item => ({
      ...item,
      defaultContent: JSON.parse(item.defaultContent || '{}'),
      recommendedStyleOverrides: JSON.parse(item.recommendedStyleOverrides || '{}'),
  }));
}

const prompt = ai.definePrompt({
  name: 'suggestNextBlocksPrompt',
  input: {schema: SuggestNextBlocksInputSchema},
  output: {schema: SuggestNextBlocksOutputSchema},
  prompt: `User has created a landing page with the following blocks: {{{currentBlocks}}}.\nSite type: "{{{siteType}}}", brand: "{{{brand}}}", primary color: "{{{primaryColor}}}".\nSuggest 5 next blocks to maintain high conversion. For each suggestion provide:\n- blockId\n- order\n- defaultContent as a JSON string with placeholders: %PROJECT_NAME%, %CITY%, %PRICE%, %DEVELOPER%\n- recommendedStyleOverrides as a JSON string. For example, for a hero block, you could suggest: '{"backgroundImage": "https://images.unsplash.com/photo-1512453979798-5ea904ac66de"}'\n- adsReady boolean\n- seoReady boolean\nOutput strictly as a valid JSON array. Ensure all content fields are proper JSON strings.`,
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
