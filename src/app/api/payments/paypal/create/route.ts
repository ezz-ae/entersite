import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const {amount} = await req.json();

    const response = await fetch("https://api.sandbox.paypal.com/v2/checkout/orders", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: amount,
                    },
                },
            ],
        }),
    });

    const data = await response.json();

    return NextResponse.json(data);
}
