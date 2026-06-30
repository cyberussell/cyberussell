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

    const body = await req.json();
    const { service, experience, level, hasPortfolio, clientCountry, clientType, complexity, hours, deadline, revisionsIncluded, niche, similarProjects } = body;

    if (!service || !service.trim()) {
      return NextResponse.json({ error: "Please enter your service." }, { status: 400 });
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 3000,
      messages: [
        {
          role: "user",
          content: `You are an international freelance pricing consultant with expertise in Upwork, Fiverr, OnlineJobs.ph, direct clients, agencies, and Philippine freelancing. Recommend FAIR pricing based on market value — not simply the highest possible price.

Freelancer Profile:
- Service: ${service}
- Years of experience: ${experience}
- Skill level: ${level}
- Portfolio available: ${hasPortfolio ? "Yes" : "No"}
- Client country: ${clientCountry}
- Client type: ${clientType}
- Project complexity: ${complexity}
- Estimated hours: ${hours}
- Deadline: ${deadline}
- Revisions included: ${revisionsIncluded}
- Specializes in niche: ${niche || "None specified"}
- Completed similar projects before: ${similarProjects ? "Yes" : "No"}

Return ONLY a valid JSON object. No markdown. No explanation. No extra text. Just JSON.

{
  "marketAnalysis": {
    "philippines": { "low": <number>, "mid": <number>, "high": <number> },
    "global": { "low": <number>, "mid": <number>, "high": <number> },
    "premiumAgencies": { "low": <number>, "mid": <number>, "high": <number> }
  },
  "recommendedRate": {
    "hourly": {
      "minimum": <number>,
      "recommended": <number>,
      "premium": <number>
    },
    "projectPrice": {
      "minimum": <number>,
      "recommended": <number>,
      "premium": <number>
    },
    "rushPrice": <number>
  },
  "negotiation": {
    "strategy": "<2-3 sentence overall negotiation approach>",
    "tooExpensive": "<what to say when client says 'too expensive'>",
    "lowerRate": "<what to say when client says 'can you lower your rate?'>",
    "smallBudget": "<what to say when client says 'we have a small budget'>"
  },
  "profitability": {
    "score": "<Low Profit|Medium Profit|High Profit>",
    "explanation": "<why this score>"
  },
  "clientRisk": {
    "riskLevel": "<Low|Medium|High>",
    "warnings": [
      "<specific risk if price is too low — e.g. high revision risk, scope creep, low ROI, burnout>"
    ]
  },
  "priceJustification": "<a professional 3-4 sentence explanation the freelancer can send to justify the rate to the client>",
  "upsellIdeas": [
    { "service": "<upsell service name>", "reason": "<why this adds value>" }
  ]
}

Rules:
- All currency values in USD
- Base rates on REAL 2024-2025 market data for this service
- Factor in the freelancer's experience, portfolio, niche, and client type
- Project price = hourly recommended × estimated hours
- Rush price = project price × 1.3 to 1.5 depending on deadline urgency
- Be honest — if the freelancer is a beginner, don't recommend expert rates
- Never recommend exploiting clients
- Never encourage race-to-the-bottom pricing
- Suggest 3-5 specific upsell ideas relevant to their service
- Include 2-4 specific client risk warnings

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
    console.error("Freelance pricing error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
