import { generateObject, generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod';

/**
 * Entrestate Master Intelligence Layer
 * COST OPTIMIZED: Uses 1.5 Flash for speed/cost, Pro for complex architecture.
 */

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

const google = createGoogleGenerativeAI({
  apiKey: API_KEY,
});

// Model Tiering Logic: 
// 1.5 FLASH is 10x cheaper and sufficient for marketing/chat.
// 1.5 PRO is used only for the heavy "Site Architect" structure.
const FLASH_MODEL = 'gemini-1.5-flash';
const PRO_MODEL = 'gemini-1.5-pro';

export const generateSiteStructure = async (prompt: string) => {
    return generateObject({
        model: google(PRO_MODEL), // Pro for the core architecture
        schema: z.object({
            title: z.string(),
            description: z.string(),
            blocks: z.array(z.object({
                type: z.enum([
                    'hero', 'launch-hero', 'stats', 'listing-grid', 
                    'chat-agent', 'sms-lead', 'roi-calculator', 
                    'gallery', 'faq', 'contact-details'
                ]),
                data: z.record(z.any())
            })),
            seo: z.object({
                title: z.string(),
                description: z.string(),
                keywords: z.array(z.string())
            })
        }),
        system: `You are the Entrestate AI Architect. Design high-converting real estate landing pages.
                 Always include a chat-agent and an sms-lead block.`,
        prompt: `Design a high-fidelity landing page for: "${prompt}"`,
    });
};

export const generateMarketingCopy = async (context: string) => {
    // USE FLASH for marketing copy - much faster and extremely cheap
    const { text } = await generateText({
        model: google(FLASH_MODEL),
        system: "You are a world-class real estate copywriter. Be concise.",
        prompt: `Write 3 ad headlines and 2 descriptions for: ${context}.`,
    });
    return text;
};
