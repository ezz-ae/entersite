import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { firebase } from '@genkit-ai/firebase';
import { db } from '@/firebase/server';

const isProduction = process.env.NODE_ENV === 'production';

// In development, use a mock AI provider to avoid real API calls and costs.
// In production, it will use the actual Google AI provider.
export const ai = genkit({
  plugins: [googleAI(), firebase({ firestore: db })],
  model: isProduction ? 'googleai/gemini-pro' : 'dev/gemini-pro',
});
