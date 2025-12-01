import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const apiKey = process.env.V0_API_KEY;

    if (!apiKey) {
      console.error("API key is not defined.");
      return new NextResponse("API key is not defined", { status: 500 });
    }

    const v0ApiResponse = await fetch('https://api.v0.dev/v1/chats', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!v0ApiResponse.ok) {
      const errorBody = await v0ApiResponse.text();
      console.error(`Error from v0 API: ${v0ApiResponse.status} ${v0ApiResponse.statusText}`, errorBody);
      return new NextResponse(errorBody, { status: v0ApiResponse.status });
    }

    const chat = await v0ApiResponse.json();
    return NextResponse.json(chat);
  } catch (error: any) {
    console.error("Error in v0-proxy API route:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
