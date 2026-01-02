
import { z } from 'zod';

export const GenerateAdsInputSchema = z.object({
  pageTitle: z.string().describe('The title of the landing page.'),
  pageDescription: z.string().describe('The description or content of the landing page.'),
  targetAudience: z.string().optional().describe('Specific audience to target.'),
  location: z.string().optional().describe('Geographic location for the campaign.'),
  usp: z.array(z.string()).optional().describe('Unique selling points.'),
});

export type GenerateAdsInput = z.infer<typeof GenerateAdsInputSchema>;

export const AdVariationSchema = z.object({
  id: z.string(),
  strategy: z.enum(['ROI_FOCUSED', 'LIFESTYLE_FOCUSED', 'URGENCY_FOCUSED', 'LUXURY_FOCUSED']),
  headlines: z.array(z.string().max(30)).min(3).describe('headlines for Google Search Ads (max 30 chars)'),
  descriptions: z.array(z.string().max(90)).min(2).describe('descriptions for Google Search Ads (max 90 chars)'),
});

export const KeywordGroupSchema = z.object({
  category: z.string(),
  keywords: z.array(z.string()),
});

export const GenerateAdsOutputSchema = z.object({
  variations: z.array(AdVariationSchema),
  keywordGroups: z.array(KeywordGroupSchema),
  estimatedCpc: z.number(),
  negativeKeywords: z.array(z.string()).describe('Keywords to exclude to save budget'),
  sitelinks: z.array(z.object({
    text: z.string().max(25),
    description: z.string().max(35)
  })).describe('Sitelink extensions for higher CTR'),
});

export type GenerateAdsOutput = z.infer<typeof GenerateAdsOutputSchema>;
