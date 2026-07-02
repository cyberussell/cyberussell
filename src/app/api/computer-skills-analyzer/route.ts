import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { csCategories, taskIds, type CSCategory } from "@/lib/computerSkillsTasks";
import { computeCareerMatches } from "@/lib/computerSkillsCareers";
import { getAdminClient } from "@/lib/supabaseAdmin";

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

const submitSchema = z.object({
  sessionId: z.string().min(8).max(100),
  name: z.string().max(80).optional(),
  email: z.string().email().max(160).optional(),
  results: z
    .array(
      z.object({
        taskId: z.enum(taskIds as [string, ...string[]]),
        category: z.enum(csCategories as [CSCategory, ...CSCategory[]]),
        score: z.number().min(0).max(100),
        timeMs: z.number().min(0).max(600000),
      })
    )
    .min(3)
    .max(taskIds.length),
});

function skillLevel(score: number): string {
  if (score >= 90) return "Expert";
  if (score >= 75) return "Advanced";
  if (score >= 60) return "Job Ready";
  if (score >= 40) return "Competent";
  if (score >= 20) return "Developing";
  return "Beginner";
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Daily limit reached. Come back tomorrow for 10 more free checks." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = submitSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
    }
    const { sessionId, name, email, results } = parsed.data;

    // Recompute all aggregates server-side from the raw per-task results — never trust a client-sent total.
    const byCategory: Record<CSCategory, number[]> = Object.fromEntries(
      csCategories.map((c) => [c, [] as number[]])
    ) as Record<CSCategory, number[]>;

    for (const r of results) {
      byCategory[r.category].push(Math.round(Math.max(0, Math.min(100, r.score))));
    }

    const categoryScores: Record<string, number> = {};
    for (const cat of csCategories) {
      const scores = byCategory[cat];
      categoryScores[cat] = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    }

    const allScores = results.map((r) => Math.round(Math.max(0, Math.min(100, r.score))));
    const overallScore = Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length);
    const level = skillLevel(overallScore);
    const careerMatches = computeCareerMatches(categoryScores);

    const attemptedCategories = csCategories.filter((c) => byCategory[c].length > 0);
    const sortedCategories = [...attemptedCategories].sort((a, b) => categoryScores[b] - categoryScores[a]);
    const topCategories = sortedCategories.slice(0, 3);
    const bottomCategories = [...sortedCategories].reverse().slice(0, 3);

    let strengths: string[] = [];
    let weaknesses: string[] = [];
    let recommendations: string[] = [];
    let narrative = "";

    try {
      const message = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1200,
        messages: [
          {
            role: "user",
            content: `A user just completed a Computer Skills Analyzer — a hands-on assessment of practical computer skills (file management, typing, spreadsheets, uploads/downloads, word processing, OS navigation), not a knowledge quiz. Here are their computed results (these numbers are final — do not change them, just explain them):

Overall Score: ${overallScore}/100 (${level})
Category Scores: ${JSON.stringify(categoryScores)}
Strongest Categories: ${topCategories.join(", ")}
Weakest Categories: ${bottomCategories.join(", ")}
Top Career Matches: ${careerMatches.slice(0, 3).map((c) => `${c.title} (${c.matchPercent}%)`).join(", ")}

Return ONLY a valid JSON object. No markdown. No explanation. No extra text. Just JSON:

{
  "narrative": "2-3 sentence honest workplace-readiness summary — what this score means for their ability to do real remote/office computer work today. Direct, plain English.",
  "strengths": ["3 specific strength statements grounded in their strongest categories"],
  "weaknesses": ["3 specific improvement areas grounded in their weakest categories"],
  "recommendations": ["4 specific, actionable next steps — name real skills, tools, or practice drills tied to their weak areas"]
}

Rules:
- Ground every statement in the actual category names and scores given above
- Plain, encouraging, non-judgmental tone — this is for beginners and students
- No generic filler like "keep practicing" — be specific
- JSON only — nothing else`,
          },
        ],
      });

      const responseText = message.content[0].type === "text" ? message.content[0].text : "";
      const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      const aiResult = JSON.parse(cleanJson);
      narrative = aiResult.narrative || "";
      strengths = aiResult.strengths || [];
      weaknesses = aiResult.weaknesses || [];
      recommendations = aiResult.recommendations || [];
    } catch (aiError) {
      console.error("Computer skills AI analysis error:", aiError);
      narrative = `You scored ${overallScore}/100 — ${level} level.`;
      strengths = topCategories.map((c) => `Strong performance in ${c}`);
      weaknesses = bottomCategories.map((c) => `Room to grow in ${c}`);
      recommendations = bottomCategories.map((c) => `Practice ${c.toLowerCase()} tasks`);
    }

    const report = {
      overallScore,
      skillLevel: level,
      categoryScores,
      narrative,
      strengths,
      weaknesses,
      recommendations,
      careerMatches,
    };

    try {
      const supabase = getAdminClient();
      await supabase.from("computer_skills_attempts").insert({
        session_id: sessionId,
        name: name || null,
        email: email || null,
        overall_score: overallScore,
        skill_level: level,
        category_scores: categoryScores,
        task_results: results,
        strengths,
        weaknesses,
        recommendations,
        career_matches: careerMatches,
      });
    } catch (dbError) {
      console.error("Computer skills save error:", dbError);
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("Computer skills analyzer error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("sessionId");
  if (!sessionId) return NextResponse.json({ attempts: [] });

  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("computer_skills_attempts")
      .select("id, overall_score, skill_level, created_at")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;
    return NextResponse.json({ attempts: data || [] });
  } catch (error) {
    console.error("Computer skills history error:", error);
    return NextResponse.json({ attempts: [] });
  }
}
