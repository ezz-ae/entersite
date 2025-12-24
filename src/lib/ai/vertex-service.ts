import { generateObject, generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { AI_CONFIG } from './cost-optimizer';

/**
 * Vertex AI Marketing Service - COST OPTIMIZED
 */

const IS_PROD = process.env.NODE_ENV === 'production';

export const generateMarketingStrategy = async (projectContext: string) => {
    // Use FLASH for strategy unless in production for final delivery
    const modelId = AI_CONFIG.models.chat; 
    
    const { text } = await generateText({
        model: google(modelId),
        system: `You are a Real Estate Marketing Strategist. Use UAE market context. Be concise.`,
        prompt: `Marketing blueprint for: ${projectContext}.`,
    });
    return text;
};

export const generateSiteStructure = async (prompt: string) => {
    // Use FLASH for rapid structural generation (much cheaper)
    const modelId = AI_CONFIG.models.architect;

    return generateObject({
        model: google(modelId),
        schema: z.object({
            title: z.string(),
            description: z.string(),
            blocks: z.array(z.object({
                type: z.string(),
                data: z.record(z.any())
            }))
        }),
        system: "You are the EntreSite AI Architect. Generate efficient site structures.",
        prompt: `Design a landing page for: "${prompt}".`,
    });
};
