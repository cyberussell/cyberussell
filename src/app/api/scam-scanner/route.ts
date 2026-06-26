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
        { error: "Daily limit reached. Come back tomorrow for 10 more free scans." },
        { status: 429 }
      );
    }

    const { text } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Please paste a job posting or opportunity description." },
        { status: 400 }
      );
    }

    if (text.trim().length > 5000) {
      return NextResponse.json(
        { error: "Text too long. Keep it under 5,000 characters." },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: `You are an expert at identifying online job scams and fraudulent opportunities, with deep knowledge of scam patterns in the Philippines. Analyze the following job posting or opportunity description and return ONLY a valid JSON object. No markdown. No explanation. No extra text. Just JSON.

The text to analyze:
"${text.trim().replace(/"/g, '\\"')}"

Return this exact JSON structure:

{
  "riskLevel": "HIGH RISK" | "SUSPICIOUS" | "PROCEED WITH CAUTION" | "LOOKS LEGITIMATE",
  "riskScore": <number 0-100, where 100 is definitely a scam>,
  "redFlags": [
    "<specific red flag found in the text — quote or reference the actual words used>"
  ],
  "yellowFlags": [
    "<warning sign that isn't conclusive but worth noting>"
  ],
  "greenFlags": [
    "<legitimate indicator found in the text>"
  ],
  "analysis": "<3-5 sentences explaining your assessment in Taglish (mix of Tagalog and English). Be specific — reference actual phrases from the posting. Explain WHY certain things are red flags. Write directly to the user.>",
  "scamType": "<if it matches a known scam pattern, name it (e.g. 'Task-Based Scam', 'Pyramid Scheme', 'Phishing', 'Advance Fee Scam'). If not a clear match, use 'Unknown Pattern' or 'Not a Scam Pattern'>",
  "advice": "<2-3 sentences of specific actionable advice in Taglish. What should they do next? Be direct.>"
}

Scoring guide:
- 80-100 (HIGH RISK): Multiple strong scam indicators — upfront payment required, unrealistic income claims, no real company identity, recruitment-based earning, asks for passwords/PINs
- 60-79 (SUSPICIOUS): Several warning signs — vague job description, pressure tactics, too-good-to-be-true promises, unverifiable company
- 30-59 (PROCEED WITH CAUTION): Some concerns but not conclusive — missing details, unusual payment terms, limited company info
- 0-29 (LOOKS LEGITIMATE): Clear job description, real company, reasonable pay, standard hiring process

Be thorough but honest. Not everything is a scam. If the posting looks legitimate, say so. If there isn't enough information to judge, flag that. Always ground your assessment in specific details from the text.

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
    console.error("Scam scanner error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
