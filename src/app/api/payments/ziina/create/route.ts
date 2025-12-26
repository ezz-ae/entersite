import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const {amount} = await req.json();

    const response = await fetch("https://api.sandbox.ziina.com/v1/charges", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.ZIINA_API_KEY}`,
        },
        body: JSON.stringify({
            amount: amount * 100,
            currency: 'AED',
            description: 'Test charge',
            return_url: 'https://www.google.com',
        }),
    });

    const data = await response.json();

    return NextResponse.json(data);
}
