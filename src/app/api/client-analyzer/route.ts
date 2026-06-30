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
        { error: "Daily limit reached. Come back tomorrow for 10 more free analyses." },
        { status: 429 }
      );
    }

    const { text } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Please paste a client conversation." },
        { status: 400 }
      );
    }

    if (text.trim().length > 8000) {
      return NextResponse.json(
        { error: "Text too long. Keep it under 8,000 characters." },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 3000,
      messages: [
        {
          role: "user",
          content: `You are an expert Freelance Client Behavior Analyst specializing in identifying communication patterns, red flags, professionalism, and working styles from client conversations. Your goal is NOT to determine absolute truth — instead, estimate the likelihood of personality traits based on available evidence.

Analyze the following client conversation and return ONLY a valid JSON object. No markdown. No explanation. No extra text. Just JSON.

The conversation to analyze:
"${text.trim().replace(/"/g, '\\"')}"

Return this exact JSON structure:

{
  "clientProfile": {
    "professionalismScore": <number 0-100>,
    "trustScore": <number 0-100>,
    "budgetLevel": "Low Budget" | "Fair Budget" | "Premium Client",
    "decisionSpeed": "Very Slow" | "Moderate" | "Fast",
    "communicationStyle": "<one or two words, e.g. Friendly, Corporate, Micromanager, Demanding, Respectful, Unclear, Passive Aggressive, Highly Organized, Flexible>"
  },
  "personalityTraits": [
    { "trait": "<trait name>", "confidence": <number 0-100>, "evidence": "<brief quote or observation from the conversation>" }
  ],
  "redFlags": [
    "<specific warning sign found — quote or reference actual words used>"
  ],
  "greenFlags": [
    "<positive indicator found — quote or reference actual words used>"
  ],
  "psychologicalRead": "<3-4 sentences interpreting what this client is probably thinking and what motivates their communication style. Use hedging language: likely, appears, may indicate, suggests. Never diagnose personality disorders or label anyone as toxic.>",
  "responseStrategy": {
    "shouldNegotiate": { "answer": true | false, "reason": "<why>" },
    "shouldRequestMilestone": { "answer": true | false, "reason": "<why>" },
    "shouldAvoid": { "answer": true | false, "reason": "<why>" },
    "shouldIncreaseRate": { "answer": true | false, "reason": "<why>" },
    "shouldDecline": { "answer": true | false, "reason": "<why>" }
  },
  "suggestedReply": "<a ready-to-send reply message that matches the client's communication style and addresses key concerns. Professional, warm, and strategic.>"
}

For personalityTraits, always assess these (plus any others that are relevant):
- Micromanager
- Scope Creep Risk
- Ghosting Risk
- Late Payment Risk
- Long-Term Client Potential
- Values Quality
- Values Cheap Pricing
- Urgency Level

Scoring guide for professionalismScore:
- 80-100: Clear scope, respectful tone, organized communication
- 60-79: Mostly professional with minor gaps
- 40-59: Some concerning patterns but workable
- 0-39: Disorganized, disrespectful, or unreasonable

Scoring guide for trustScore:
- 80-100: Transparent about budget, timeline, and expectations
- 60-79: Generally trustworthy with some vague areas
- 40-59: Several trust concerns
- 0-39: Multiple red flags suggesting unreliability

Be thorough but fair. Not every client is bad. If the client seems great, say so. Always ground your assessment in specific details from the conversation. Use hedging language — never claim certainty.

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
    console.error("Client analyzer error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
