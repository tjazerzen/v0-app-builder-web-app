import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getAnalysis(beforeCode: any, afterCode: any, promptHistory: any) {
    const systemPrompt = `
      You are an expert code reviewer. Your task is to analyze the "before" and "after" code states of a project, taking into account the user's entire prompt history. 
      Identify and list any new code, logic, styling, or structural changes in the "after" code that were NOT explicitly requested in the prompts. 
      Focus on inferred features, design choices, or functionality that the AI generated on its own.
      Present your findings as a clear, concise list. If no ambiguous changes are found, state that.

      The "Before" code is the code before the last prompt.
      The "After" code is the code after the last prompt.
      The "Prompt History" is the history of prompts that the user has given.
    `;

    const userMessage = `
      Here is the user's prompt history:
      --- PROMPT HISTORY START ---
      ${JSON.stringify(promptHistory, null, 2)}
      --- PROMPT HISTORY END ---

      Here is the code BEFORE the last prompt:
      --- BEFORE CODE START ---
      ${JSON.stringify(beforeCode, null, 2)}
      --- BEFORE CODE END ---

      And here is the code AFTER the last prompt:
      --- AFTER CODE START ---
      ${JSON.stringify(afterCode, null, 2)}
      --- AFTER CODE END ---

      Your job is analyze if there has been any ambiguouities introduced in the difference between the "Before" and "After" code.
    `;
    
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userMessage },
            ],
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Error calling OpenAI:", error);
        return "Could not retrieve analysis due to an error.";
    }
}

export async function POST(request: Request) {
    try {
        const { previousFiles, afterFiles, promptHistory } = await request.json();
        
        const analysis = await getAnalysis(previousFiles, afterFiles, promptHistory);

        return NextResponse.json({ analysis });

    } catch (error: any) {
        console.error("Error in analyze API route:", error);
        return new NextResponse("Internal Server Error in analysis", { status: 500 });
    }
}
