import { NextRequest, NextResponse } from 'next/server';

/**
 * Vercel Domain Automation Backend
 * Dynamically configures domains and SSL certificates.
 */

const VERCEL_TOKEN = process.env.VERCEL_API_TOKEN;
const PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const TEAM_ID = process.env.VERCEL_TEAM_ID;

export async function POST(req: NextRequest) {
    try {
        const { domain } = await req.json();

        if (!domain) return NextResponse.json({ error: 'Domain is required' }, { status: 400 });

        // Add domain to Vercel Project
        const response = await fetch(`https://api.vercel.com/v9/projects/${PROJECT_ID}/domains${TEAM_ID ? `?teamId=${TEAM_ID}` : ''}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${VERCEL_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: domain }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: data.error || 'Failed to add domain' }, { status: response.status });
        }

        return NextResponse.json({ 
            success: true, 
            config: {
                aRecord: "76.76.21.21",
                cname: "cname.vercel-dns.com"
            }
        });
    } catch (error) {
        console.error("Vercel API Error:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
