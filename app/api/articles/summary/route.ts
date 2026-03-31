import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ message: "OPENAI_API_KEY is not configured." }, { status: 400 });
  }

  const { title, description, content } = (await request.json()) as {
    title: string;
    description?: string;
    content?: string;
  };

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const completion = await client.responses.create({
    model: "gpt-4.1-mini",
    input: `Summarize this news story in 3 concise bullet points.\n\nTitle: ${title}\nDescription: ${description || ""}\nContent: ${content || ""}`
  });

  return NextResponse.json({
    summary: completion.output_text
  });
}
