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
        { error: "Daily limit reached. Come back tomorrow for 10 more free bios." },
        { status: 429 }
      );
    }

    const { skills, experience, platform, tone } = await req.json();

    if (!skills || skills.trim().length === 0) {
      return NextResponse.json(
        { error: "Please enter your skills." },
        { status: 400 }
      );
    }

    if (skills.trim().length > 3000) {
      return NextResponse.json(
        { error: "Too long. Keep it under 3,000 characters." },
        { status: 400 }
      );
    }

    const platformGuide: Record<string, string> = {
      upwork: `Upwork profile overview. Format: 2-3 short paragraphs. Start with a strong opening line about the value you bring (not "Hi, I'm..."). Include specific skills, tools, and results. End with a call to action. Upwork bios that perform well are specific, confident, and under 300 words.`,
      onlinejobsph: `OnlineJobs.ph profile bio. Format: straightforward, professional, 2-3 paragraphs. Filipino employers on OJP value reliability, English proficiency, and specific experience. Mention availability, timezone flexibility, and tools you know. Keep it under 250 words.`,
      fiverr: `Fiverr seller description. Format: short, punchy, benefit-focused. First line should hook the buyer. Use short paragraphs or bullet points. Mention turnaround time and what makes you different. Fiverr bios should be under 200 words and feel approachable.`,
      linkedin: `LinkedIn About/Summary section. Format: professional but personable, 2-3 paragraphs. Start with what you do and who you help. Include key achievements or skills. End with what you're looking for. Keep it under 300 words.`,
      general: `General freelancer bio that works across platforms. Format: 2-3 paragraphs, professional but approachable. Highlight top skills, experience, and what you can deliver. Under 250 words.`,
    };

    const toneGuide: Record<string, string> = {
      professional: "Use a professional, confident tone. No slang. Polished but not stiff.",
      friendly: "Use a warm, approachable tone. Conversational but still competent. Show personality.",
      bold: "Use a bold, confident tone. Strong statements. Stand out from the crowd. No hedging.",
    };

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: `You are an expert freelancer profile writer who specializes in helping Filipino freelancers create compelling bios that win clients. Generate a freelancer profile bio and return ONLY a valid JSON object. No markdown. No explanation. No extra text. Just JSON.

User's input:
Skills and experience: "${skills.trim().replace(/"/g, '\\"')}"
${experience ? `Additional context: "${experience.trim().replace(/"/g, '\\"')}"` : ""}

Platform: ${platformGuide[platform] || platformGuide.general}

Tone: ${toneGuide[tone] || toneGuide.professional}

Return this exact JSON structure:

{
  "bio": "<the complete profile bio, ready to copy-paste. Use line breaks (\\n\\n) between paragraphs>",
  "headline": "<a short 5-10 word professional headline/title for their profile>",
  "tips": [
    "<specific tip to make their profile even stronger — reference what they wrote>",
    "<second tip>",
    "<third tip>"
  ],
  "keywords": ["<relevant keyword for the platform>", "<keyword>", "<keyword>", "<keyword>", "<keyword>"],
  "strength": "<one sentence about what's strongest in their background that they should emphasize more>"
}

Rules:
- NEVER start with "Hi, I'm..." or "Hello, my name is..." — those waste the most valuable line
- NEVER use clichés like "passionate", "dedicated", "hardworking" without proof
- Be specific — mention tools, platforms, numbers, and results when possible
- If they gave minimal info, work with what they have but note in tips what they should add
- Write in English (this is for international clients)
- Make every sentence earn its place — no filler

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
    console.error("Bio generator error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
