<<<<<<< HEAD
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { firebase } from '@genkit-ai/firebase';
import { db } from '@/firebase/server'; // Import server-side Firestore
=======
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
>>>>>>> parent of a4cc956 (all)

const isProduction = process.env.NODE_ENV === 'production';

export const ai = genkit({
  plugins: [googleAI()],
  model: isProduction ? 'googleai/gemini-2.5-flash' : 'dev/gemini-2.5-flash',
});
