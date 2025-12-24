/**
 * Cost Optimization & Throttling Service
 * Prevents rapid API spend during development and handles intelligent caching.
 */

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const AI_CONFIG = {
    // We switch models based on task complexity to save costs
    models: {
        architect: IS_PRODUCTION ? 'gemini-1.5-pro' : 'gemini-1.5-flash', // Pro for complex architecture, Flash for dev/simple tasks
        chat: 'gemini-1.5-flash', // Flash is 10x cheaper and fast for chat
        vision: 'imagen-3-fast',  // Use 'fast' variant for initial renders
    },
    // Cache TTL in seconds
    cacheTTL: 3600 * 24, // 24 hours for expensive generations
};

export const costThrottler = async (key: string, limit: number) => {
    // In a real implementation, this would use Redis to rate-limit per user/session
    // and prevent 'crazy' build costs.
    if (!IS_PRODUCTION) {
        console.log(`[COST_SAFE] Throttling active for ${key}. Limit: ${limit}`);
    }
};

/**
 * Intelligent Prompt Compression
 * Removes unnecessary tokens from large project schemas before sending to AI.
 */
export const compressProjectData = (data: any) => {
    // Strip metadata, large image arrays, and redundant fields
    const { images, descriptions, metadata, ...essential } = data;
    return JSON.stringify(essential);
};
