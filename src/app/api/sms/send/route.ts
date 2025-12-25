import { NextRequest, NextResponse } from 'next/server';

/**
 * SMS VIP Broadcast Engine
 * Connected to Twilio/SMS Provider.
 */

const ACCOUNT_SID = process.env.SMS_PROVIDER_API_KEY;
const AUTH_TOKEN = process.env.SMS_PROVIDER_SECRET;
const FROM_NUMBER = '+1234567890'; // Replace with verified Entrestate sender number

export async function POST(req: NextRequest) {
    try {
        const { to, message } = await req.json();

        if (!to || !message) return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });

        // Real Twilio API Call
        const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${ACCOUNT_SID}:${AUTH_TOKEN}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                To: to,
                From: FROM_NUMBER,
                Body: message,
            }),
        });

        const data = await response.json();

        return NextResponse.json({ success: response.ok, data });
    } catch (error) {
        console.error("SMS Engine Error:", error);
        return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
    }
}
