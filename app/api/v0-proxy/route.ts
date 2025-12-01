import { NextResponse } from 'next/server';
import { createClient as createV0Client } from 'v0-sdk';

export async function POST(request: Request) {
  try {
    const { message, chatId } = await request.json();
    const apiKey = process.env.V0_API_KEY;

    if (!apiKey) {
      console.error("V0_API_KEY is not defined.");
      return new NextResponse("V0_API_KEY is not defined", { status: 500 });
    }

    const v0 = createV0Client({ apiKey });

    let v0Response;
    if (chatId) {
      // This is a follow-up message
      v0Response = await v0.chats.sendMessage({
        chatId,
        message,
      });
    } else {
      // This is the initial message to create a new chat
      v0Response = await v0.chats.create({
        message,
      });
    }

    return NextResponse.json(v0Response);

  } catch (error: any) {
    console.error("Error in v0-proxy API route:", error);
    const status = error.status || 500;
    const message = error.message || "Internal Server Error";
    return new NextResponse(message, { status });
  }
}
