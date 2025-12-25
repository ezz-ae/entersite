import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

/**
 * Email Engine Backend
 * Connected to Twilio SendGrid.
 */

// Standard naming as per SendGrid documentation
const API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'verified@yourdomain.com';

if (API_KEY) {
    sgMail.setApiKey(API_KEY);
}

export async function POST(req: NextRequest) {
    try {
        const { to, subject, body } = await req.json();

        if (!to || !subject || !body) return NextResponse.json({ error: 'Missing data' }, { status: 400 });

        const msg = {
            to: to,
            from: FROM_EMAIL, // Must be a verified sender in SendGrid
            subject: subject,
            text: body,
            html: `<div style="font-family: sans-serif; line-height: 1.6; color: #333;">${body}</div>`,
        };

        await sgMail.send(msg);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("SendGrid Engine Error:", error.response?.body || error.message);
        return NextResponse.json({ 
            error: 'Failed to send email', 
            details: error.response?.body?.errors || [] 
        }, { status: 500 });
    }
}
