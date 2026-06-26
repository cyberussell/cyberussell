import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const DAILY_LIMIT = 10;
const ipCounts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipCounts.get(ip);
  if (!entry || now > entry.resetAt) {
    ipCounts.set(ip, { count: 1, resetAt: now + 86400000 });
    return true;
  }
  if (entry.count >= DAILY_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Daily limit reached. Come back tomorrow for 10 more free forges." },
        { status: 429 }
      );
    }

    const { prompt } = await req.json();

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Please enter a prompt" },
        { status: 400 }
      );
    }

    if (prompt.trim().length > 2000) {
      return NextResponse.json(
        { error: "Prompt too long. Keep it under 2000 characters." },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are a prompt engineering expert. Analyze the following AI prompt and return ONLY a valid JSON object. No markdown. No explanation. No extra text. Just JSON.

The prompt to analyze:
"${prompt.trim().replace(/"/g, '\\"')}"

Return this exact JSON structure:

{
  "overall": <number 0-100>,
  "clarity": <number 0-100>,
  "specificity": <number 0-100>,
  "context": <number 0-100>,
  "constraints": <number 0-100>,
  "structure": <number 0-100>,
  "creativity": <number 0-100>,
  "assessment": "<3-5 sentences explaining what's strong and weak about this prompt, written directly to the user. Be specific about what they did well and what's missing. If the prompt is gibberish or nonsensical, say so directly — don't pretend it has any valid structure. Use plain English, no jargon.>",
  "tips": [
    "<specific actionable tip to improve this prompt — reference what they actually wrote>",
    "<second specific tip>",
    "<third specific tip>"
  ]
}

Scoring guide:
- 0-20: Gibberish, nonsensical, or completely empty of useful instruction
- 20-40: Has a vague idea but missing almost everything (context, specificity, format)
- 40-60: Functional but generic — the AI would have to guess most details
- 60-80: Good prompt with clear intent, some context, and partial constraints
- 80-100: Excellent — clear task, audience, constraints, format, and specificity

Be honest and harsh with scores. A one-liner like "write me something about marketing" should score 15-25, not 40+. Gibberish should score under 10. Only score 80+ if the prompt genuinely has role, context, task, constraints, and output format.

JSON only — nothing else.`,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    const cleanJson = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(cleanJson);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Prompt forge error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
