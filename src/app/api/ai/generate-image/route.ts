import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from 'ai';
import { google } from '@ai-sdk/google';

/**
 * Image Generation Service (Imagen via Vertex AI)
 * NO CACHE - Direct API Call to Imagen
 */

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        if (!prompt) return NextResponse.json({ error: 'Prompt required' }, { status: 400 });

        // Direct call to Imagen 3 via AI SDK
        // This will always call the API and incur costs as requested
        const { image } = await generateImage({
            model: google.image('imagen-3.0-generate-001'),
            prompt: `High-end architectural photography, ${prompt}, luxury real estate, 8k resolution, cinematic lighting`,
        });

        return NextResponse.json({ url: image.url });
    } catch (error) {
        console.error("Imagen API Error:", error);
        // Fallback to high-quality project imagery if API fails or quota hit
        return NextResponse.json({ 
            url: "https://firebasestorage.googleapis.com/v0/b/studio-7730943652-a28e0.firebasestorage.app/o/U10759_EXT_ZED739.webp?alt=media&token=be7418eb-0f7f-4df3-8c89-8fa5b070a7aa" 
        });
    }
}
