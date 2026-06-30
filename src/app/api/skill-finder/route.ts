import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { skill } = await req.json();

    if (!skill || skill.trim().length === 0) {
      return NextResponse.json(
        { error: "Please enter a skill" },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `A Filipino user described their skill as: "${skill}"

Return ONLY a valid JSON object. No markdown. No explanation. No extra text. Just JSON:

{
  "category": "short category name",
  "description": "2-3 sentences about earning from this skill in Philippines. Provincial Filipino context. Under 60 words.",
  "earning_range": "₱X,XXX–₱XX,XXX/month",
  "income_paths": [
    {
      "title": "Income path title",
      "detail": "One sentence with specific platform or peso amount."
    },
    {
      "title": "Income path title",
      "detail": "One sentence with specific platform or peso amount."
    },
    {
      "title": "Income path title",
      "detail": "One sentence with specific platform or peso amount."
    },
    {
      "title": "Income path title",
      "detail": "One sentence with specific platform or peso amount."
    }
  ],
  "first_step": "One specific action this week. Name exact platform or tool. Not vague.",
  "blueprint_slug": null
}

Rules:
- Exactly 4 income paths always
- Always include peso amounts
- Philippine freelance market focus
- Simple plain English
- JSON only — nothing else
- For "blueprint_slug": if the skill closely relates to one of these existing blueprints, set it to that slug, otherwise null. Available slugs: "canva" (graphic design, Canva, visual design, logo, poster, social media graphics), "cooking" (food, baking, cooking, recipes, catering), "video-editing" (video, editing, reels, YouTube, content creation, Capcut, Premiere), "virtual-assistant" (VA, admin, data entry, email management, scheduling, customer support), "writing" (writing, copywriting, content writing, blogging, articles, proofreading)`,
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
    console.error("Skill finder error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
