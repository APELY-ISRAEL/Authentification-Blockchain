import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {

  try {
    const requestData = await request.json();
    console.log(requestData);
      //SaveCard(data.image,data.document);
return NextResponse.json(requestData)
  } catch (error) {
    return NextResponse.error();
  }
}