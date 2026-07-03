import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const AVAILABLE_BLUEPRINTS = [
  "writing",
  "canva",
  "cooking",
  "video-editing",
  "virtual-assistant",
  "customer-support",
  "social-media-management",
  "bookkeeping",
  "lead-generation",
  "appointment-setting",
  "seo",
  "wordpress",
  "shopify",
  "graphic-design",
  "ai-automation",
];

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();
    if (!answers) return NextResponse.json({ error: "Answers required" }, { status: 400 });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `You are a career discovery advisor for Filipinos who want to earn online. A visitor just completed a guided interview. Analyze their answers and discover hidden transferable skills they may not realize they have.

INTERVIEW ANSWERS:
${JSON.stringify(answers, null, 2)}

AVAILABLE CAREER BLUEPRINTS (only recommend from this list):
${AVAILABLE_BLUEPRINTS.join(", ")}

Return ONLY valid JSON. No markdown. No explanation. No extra text.

{
  "hidden_skills": [
    { "name": "Skill name", "why": "One sentence explaining why their answer reveals this skill. Reference their specific answer. Use simple English." }
  ],
  "strengths": [
    { "name": "Strength name", "score": 85 }
  ],
  "career_matches": [
    {
      "slug": "slug from available list",
      "skill": "Display name",
      "match_score": 92,
      "why_it_fits": "2 sentences explaining the match based on their specific answers.",
      "beginner_income": "₱X,XXX–₱XX,XXX/month",
      "difficulty": "Beginner-friendly",
      "time_to_first_income": "X–X weeks"
    }
  ],
  "recommended_slug": "the best matching slug",
  "todays_mission": [
    { "task": "Specific action step they can do today" }
  ],
  "estimated_mission_time": "30 minutes"
}

Rules:
- Identify 4–6 hidden skills from their answers. Be specific — reference what they selected.
- Show 4–6 strengths with scores between 70–95.
- Recommend exactly 3 career matches from the available list, sorted by match score.
- The recommended_slug should be the highest-scoring match.
- Today's mission should have 3 tasks related to the recommended career.
- All income amounts in Philippine pesos.
- Simple English. No jargon.
- Be encouraging but honest.
- JSON only.`,
        },
      ],
    });

    const responseText = message.content[0].type === "text" ? message.content[0].text : "";
    const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    const result = JSON.parse(cleanJson);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Discovery error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
