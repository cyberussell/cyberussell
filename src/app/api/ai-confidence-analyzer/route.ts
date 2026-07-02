import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { aiCategories, taskIds, promptTaskIds, promptScenarios, type AICategory } from "@/lib/aiConfidenceTasks";
import { computeCareerMatches } from "@/lib/aiConfidenceCareers";
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
  mcqResults: z
    .array(
      z.object({
        taskId: z.enum(taskIds as [string, ...string[]]),
        category: z.enum(aiCategories as [AICategory, ...AICategory[]]),
        score: z.number().min(0).max(100),
        timeMs: z.number().min(0).max(600000),
      })
    )
    .min(1)
    .max(taskIds.length),
  promptSubmissions: z
    .array(
      z.object({
        taskId: z.enum(promptTaskIds as [string, ...string[]]),
        category: z.enum(aiCategories as [AICategory, ...AICategory[]]),
        prompt: z.string().min(1).max(2000),
        timeMs: z.number().min(0).max(600000),
      })
    )
    .max(promptTaskIds.length),
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
    const { sessionId, name, email, mcqResults, promptSubmissions } = parsed.data;

    // Grade the free-text prompt submissions with Claude, and generate the narrative in the
    // same call. Unlike the MCQ tasks, prompt quality genuinely needs an LLM judge.
    let promptFeedback: { taskId: string; score: number; feedback: string }[] = [];
    let narrative = "";
    let strengths: string[] = [];
    let weaknesses: string[] = [];
    let recommendations: string[] = [];

    const mcqByCategory: Record<AICategory, number[]> = Object.fromEntries(
      aiCategories.map((c) => [c, [] as number[]])
    ) as Record<AICategory, number[]>;
    for (const r of mcqResults) {
      mcqByCategory[r.category].push(Math.round(Math.max(0, Math.min(100, r.score))));
    }
    const mcqSummary = aiCategories
      .filter((c) => mcqByCategory[c].length > 0)
      .map((c) => `${c}: ${Math.round(mcqByCategory[c].reduce((a, b) => a + b, 0) / mcqByCategory[c].length)}% (${mcqByCategory[c].length} scenario question(s))`)
      .join("\n");

    const promptsBlock = promptSubmissions
      .map((p, i) => {
        const scenario = promptScenarios[p.taskId];
        return `Prompt ${i + 1} — ${scenario?.context ?? p.taskId}
Task given to user: "${scenario?.instruction ?? ""}"
Grading rubric: ${scenario?.rubric ?? ""}
User's submitted prompt: "${p.prompt.replace(/"/g, '\\"')}"`;
      })
      .join("\n\n");

    // We match Claude's graded scores back to submissions by array position, not by any
    // id it echoes — LLMs are unreliable at faithfully reproducing opaque identifier
    // strings, and a mismatch here would silently corrupt every downstream score.

    try {
      const message = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1800,
        messages: [
          {
            role: "user",
            content: `You are grading a user's AI Confidence Analyzer results — an assessment of how effectively someone can use AI assistants for real tasks, not trivia.

They also answered ${mcqResults.length} scenario questions (already scored, not yours to change):
${mcqSummary}

Now grade the ${promptSubmissions.length} prompt-writing exercises below, each against its own rubric. Score 0-100 per prompt.

${promptsBlock}

Return ONLY a valid JSON object. No markdown. No explanation. No extra text. Just JSON:

{
  "promptScores": [
    { "score": <0-100>, "feedback": "<one specific sentence on what made it strong or weak>" }
  ],
  "narrative": "2-3 sentence honest summary of their overall AI competency — combining both the scenario questions and the prompts they wrote. Direct, plain English.",
  "strengths": ["3 specific strength statements grounded in their actual scenario scores and prompt quality"],
  "weaknesses": ["3 specific improvement areas grounded in their actual weak scenario categories and/or weak prompts"],
  "recommendations": ["4 specific, actionable next steps — name real prompting techniques or practice drills tied to their weak areas"]
}

Rules:
- promptScores must have EXACTLY ${promptSubmissions.length} entries, in the SAME ORDER as "Prompt 1", "Prompt 2", etc. above — position is how these get matched back, so do not skip, merge, or reorder entries
- Grade prompts strictly against their rubric — a longer prompt that's still vague should NOT score well
- Ground every narrative statement in the actual data given above
- Plain, encouraging, non-judgmental tone — this is for beginners and students
- JSON only — nothing else`,
          },
        ],
      });

      const responseText = message.content[0].type === "text" ? message.content[0].text : "";
      const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      const aiResult = JSON.parse(cleanJson);
      const rawScores: { score?: number; feedback?: string }[] = aiResult.promptScores || [];
      // Match by position, then stamp the canonical taskId — never trust an id Claude echoes.
      promptFeedback = promptSubmissions.map((p, i) => ({
        taskId: p.taskId,
        score: Math.round(Math.max(0, Math.min(100, rawScores[i]?.score ?? 50))),
        feedback: rawScores[i]?.feedback || "Couldn't auto-grade this one — treated as neutral.",
      }));
      narrative = aiResult.narrative || "";
      strengths = aiResult.strengths || [];
      weaknesses = aiResult.weaknesses || [];
      recommendations = aiResult.recommendations || [];
    } catch (aiError) {
      console.error("AI confidence grading error:", aiError);
      promptFeedback = promptSubmissions.map((p) => ({ taskId: p.taskId, score: 50, feedback: "Couldn't auto-grade this one — treated as neutral." }));
    }

    // Merge AI-graded prompt scores into the same category buckets as the MCQ results.
    const byCategory: Record<AICategory, number[]> = Object.fromEntries(
      aiCategories.map((c) => [c, [] as number[]])
    ) as Record<AICategory, number[]>;
    for (const c of aiCategories) byCategory[c].push(...mcqByCategory[c]);

    const promptScoreById = new Map(promptFeedback.map((p) => [p.taskId, p.score]));
    for (const p of promptSubmissions) {
      const score = promptScoreById.get(p.taskId) ?? 50;
      byCategory[p.category].push(score);
    }

    const categoryScores: Record<string, number> = {};
    for (const cat of aiCategories) {
      const scores = byCategory[cat];
      categoryScores[cat] = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    }

    const allScores = [...mcqResults.map((r) => r.score), ...promptSubmissions.map((p) => promptScoreById.get(p.taskId) ?? 50)];
    const overallScore = Math.round(allScores.reduce((a, b) => a + b, 0) / (allScores.length || 1));
    const level = skillLevel(overallScore);
    const careerMatches = computeCareerMatches(categoryScores);

    if (!narrative) {
      const sorted = [...aiCategories].filter((c) => byCategory[c].length > 0).sort((a, b) => categoryScores[b] - categoryScores[a]);
      narrative = `You scored ${overallScore}/100 — ${level} level.`;
      strengths = sorted.slice(0, 3).map((c) => `Strong performance in ${c}`);
      weaknesses = [...sorted].reverse().slice(0, 3).map((c) => `Room to grow in ${c}`);
      recommendations = weaknesses.map((w) => `Practice tasks related to ${w.replace("Room to grow in ", "").toLowerCase()}`);
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
      promptFeedback,
    };

    try {
      const supabase = getAdminClient();
      await supabase.from("ai_confidence_attempts").insert({
        session_id: sessionId,
        name: name || null,
        email: email || null,
        overall_score: overallScore,
        skill_level: level,
        category_scores: categoryScores,
        mcq_results: mcqResults,
        prompt_submissions: promptSubmissions,
        prompt_feedback: promptFeedback,
        strengths,
        weaknesses,
        recommendations,
        career_matches: careerMatches,
      });
    } catch (dbError) {
      console.error("AI confidence save error:", dbError);
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("AI confidence analyzer error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("sessionId");
  if (!sessionId) return NextResponse.json({ attempts: [] });

  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("ai_confidence_attempts")
      .select("id, overall_score, skill_level, created_at")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;
    return NextResponse.json({ attempts: data || [] });
  } catch (error) {
    console.error("AI confidence history error:", error);
    return NextResponse.json({ attempts: [] });
  }
}
