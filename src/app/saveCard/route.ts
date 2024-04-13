import SaveCard from "@/lib/utils/db";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    try {
        const data = await request.json();
        SaveCard(data.image, data.document);
        return NextResponse.json(data)
    } catch (error) {
        console.log(error)
    }
}