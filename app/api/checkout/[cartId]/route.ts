import { getUserToken } from "@/app/Helpers/getUserToken";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ cartId: string }> }) {
    const token = await getUserToken();
    const { cartId } = await params;
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.get('url');
    const body = await req.json();

    const response = await fetch(`${process.env.API_URL}/orders/checkout-session/${cartId}?url=${url}`, {
        method: "POST",
        headers: {
            token: token as string,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data);
}
