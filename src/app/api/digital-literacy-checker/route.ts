import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { questionBank, categories, type DLCategory } from "@/lib/digitalLiteracyQuestions";
import { computeCareerMatches } from "@/lib/digitalLiteracyCareers";
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
  answers: z
    .array(
      z.object({
        id: z.string(),
        selectedIndex: z.number().int().min(0),
      })
    )
    .min(5)
    .max(questionBank.length),
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
    const { sessionId, name, email, answers } = parsed.data;

    // Recompute scoring server-side against the real question bank — never trust client-sent scores.
    const questionsById = new Map(questionBank.map((q) => [q.id, q]));
    const categoryTotals: Record<DLCategory, { correct: number; total: number }> = Object.fromEntries(
      categories.map((c) => [c, { correct: 0, total: 0 }])
    ) as Record<DLCategory, { correct: number; total: number }>;

    let totalCorrect = 0;
    let totalAnswered = 0;
    const gradedAnswers: { id: string; category: DLCategory; correct: boolean }[] = [];

    for (const a of answers) {
      const q = questionsById.get(a.id);
      if (!q) continue;
      const correct = a.selectedIndex === q.correctIndex;
      categoryTotals[q.category].total += 1;
      if (correct) categoryTotals[q.category].correct += 1;
      totalAnswered += 1;
      if (correct) totalCorrect += 1;
      gradedAnswers.push({ id: a.id, category: q.category, correct });
    }

    if (totalAnswered === 0) {
      return NextResponse.json({ error: "No valid answers received." }, { status: 400 });
    }

    const categoryScores: Record<string, number> = {};
    for (const cat of categories) {
      const { correct, total } = categoryTotals[cat];
      categoryScores[cat] = total > 0 ? Math.round((correct / total) * 100) : 0;
    }

    const overallScore = Math.round((totalCorrect / totalAnswered) * 100);
    const level = skillLevel(overallScore);
    const careerMatches = computeCareerMatches(categoryScores);

    const sortedCategories = [...categories]
      .filter((c) => categoryTotals[c].total > 0)
      .sort((a, b) => categoryScores[b] - categoryScores[a]);
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
            content: `A user just completed a Digital Literacy assessment. Here are their computed results (these numbers are final — do not change them, just explain them):

Overall Score: ${overallScore}/100 (${level})
Category Scores: ${JSON.stringify(categoryScores)}
Strongest Categories: ${topCategories.join(", ")}
Weakest Categories: ${bottomCategories.join(", ")}
Top Career Matches: ${careerMatches.slice(0, 3).map((c) => `${c.title} (${c.matchPercent}%)`).join(", ")}

Return ONLY a valid JSON object. No markdown. No explanation. No extra text. Just JSON:

{
  "narrative": "2-3 sentence encouraging, honest summary of their digital literacy level and what it means for online work readiness. Direct, plain English.",
  "strengths": ["3 specific strength statements grounded in their strongest categories"],
  "weaknesses": ["3 specific improvement areas grounded in their weakest categories"],
  "recommendations": ["4 specific, actionable next steps — name real skills or tools to practice, tied to their weak areas"]
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
      console.error("Digital literacy AI analysis error:", aiError);
      narrative = `You scored ${overallScore}/100 — ${level} level.`;
      strengths = topCategories.map((c) => `Strong performance in ${c}`);
      weaknesses = bottomCategories.map((c) => `Room to grow in ${c}`);
      recommendations = bottomCategories.map((c) => `Practice ${c.toLowerCase()} fundamentals`);
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

    // Best-effort save — don't fail the response if persistence has an issue.
    try {
      const supabase = getAdminClient();
      await supabase.from("digital_literacy_attempts").insert({
        session_id: sessionId,
        name: name || null,
        email: email || null,
        overall_score: overallScore,
        skill_level: level,
        category_scores: categoryScores,
        answers: gradedAnswers,
        strengths,
        weaknesses,
        recommendations,
        career_matches: careerMatches,
      });
    } catch (dbError) {
      console.error("Digital literacy save error:", dbError);
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("Digital literacy checker error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("sessionId");
  if (!sessionId) return NextResponse.json({ attempts: [] });

  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("digital_literacy_attempts")
      .select("id, overall_score, skill_level, created_at")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;
    return NextResponse.json({ attempts: data || [] });
  } catch (error) {
    console.error("Digital literacy history error:", error);
    return NextResponse.json({ attempts: [] });
  }
}
