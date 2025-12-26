import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const {orderID} = await req.json();

    const response = await fetch(`https://api.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
        },
    });

    const data = await response.json();

    return NextResponse.json(data);
}
