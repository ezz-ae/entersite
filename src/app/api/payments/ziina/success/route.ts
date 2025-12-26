import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const {chargeId} = await req.json();

    const response = await fetch(`https://api.sandbox.ziina.com/v1/charges/${chargeId}`,
        {
            headers: {
                'Authorization': `Bearer ${process.env.ZIINA_API_KEY}`,
            },
        });

    const data = await response.json();

    return NextResponse.json(data);
}
