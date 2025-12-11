import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {dev} from '@genkit-ai/dev-local';

const isProduction = process.env.NODE_ENV === 'production';

// In development, use a mock AI provider to avoid real API calls and costs.
// In production, it will use the actual Google AI provider.
export const ai = genkit({
  plugins: [isProduction ? googleAI() : dev()],
  model: isProduction ? 'googleai/gemini-2.5-flash' : 'dev/gemini-2.5-flash',
});
