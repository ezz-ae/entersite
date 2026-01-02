'use server';

import { generateAdsFromPageContent, GenerateAdsInput } from '@/ai/flows/generate-ads-from-page-content';
import { suggestNextBlocks, SuggestNextBlocksInput } from '@/ai/flows/suggest-next-blocks';

/**
 * Server action to generate Google Ads from page content.
 * This function is executed only on the server.
 */
export async function generateGoogleAdsAction(input: GenerateAdsInput) {
  try {
    const output = await generateAdsFromPageContent(input);
    return output;
  } catch (error) {
    console.error('Error generating Google Ads:', error);
    throw new Error('Failed to generate ads from AI');
  }
}

/**
 * Server action to suggest the next best blocks for a page.
 * This function is executed only on the server.
 */
export async function suggestNextBlocksAction(input: SuggestNextBlocksInput) {
  try {
    const suggestions = await suggestNextBlocks(input);
    return suggestions;
  } catch (error) {
    console.error('Error suggesting next blocks:', error);
    throw new Error('Failed to get AI block suggestions');
  }
}
