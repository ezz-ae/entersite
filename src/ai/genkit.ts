import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { firebase } from '@genkit-ai/firebase';
import { db } from '@/firebase/server'; // Import server-side Firestore

const isProduction = process.env.NODE_ENV === 'production';

export const ai = genkit({
  plugins: [googleAI(), firebase({ firestore: db })],
  model: isProduction ? 'googleai/gemini-pro' : 'dev/gemini-pro',
});
