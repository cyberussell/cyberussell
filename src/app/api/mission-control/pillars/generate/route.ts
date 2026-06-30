import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import Anthropic from "@anthropic-ai/sdk";

const PILLARS_DIR = path.join(process.cwd(), "src/data/pillars");
const SESSION_NAME = "mc-session";

async function isAuth(): Promise<boolean> {
  const jar = await cookies();
  return !!jar.get(SESSION_NAME)?.value;
}

function ensureDir() {
  if (!fs.existsSync(PILLARS_DIR)) fs.mkdirSync(PILLARS_DIR, { recursive: true });
}

const SYSTEM_PROMPT = `You are the official instructional designer for Cyberussell — a guided learning ecosystem that helps Filipinos build practical AI skills, digital skills, freelancing skills, business skills, and online income opportunities.

TEACHING PHILOSOPHY:
Every lesson must answer: Why does this matter? How is this used in real life? How can this help someone earn online or improve their career? What should the learner do immediately after this lesson? Teach transformation, not just information.

CURRICULUM STANDARDS — Every pillar must contain:
1. Overview
2. Target Audience
3. Learning Objectives
4. Prerequisites (if any)
5. Estimated Completion Time
6. Skills Gained
7. Module Breakdown

MODULE STANDARDS — Every module must include:
- Module Title, Learning Objectives, Lessons, Key Concepts, Practical Exercises, AI Activities, ChatGPT Prompts, Claude Prompts, Reflection Questions, Common Mistakes, Module Completion Checklist

LESSON STRUCTURE:
1. Introduction, 2. Why It Matters, 3. Core Concept, 4. Real-Life Example, 5. Guided Walkthrough, 6. AI Practice Activity, 7. Independent Exercise, 8. Reflection, 9. Key Takeaways, 10. Next Steps

LEARNING PRINCIPLES:
- Teach beginners first. Use simple English. Explain jargon before using it. Break complex ideas into small steps. Encourage experimentation. Promote critical thinking. Use AI as a thinking partner, not a replacement. Use Filipino contexts whenever appropriate while keeping examples globally relevant.

AI INTEGRATION: Include activities using ChatGPT, Claude, and Gemini. Provide prompts that work for free-tier users.

QUALITY STANDARDS: Every resource must be beginner-friendly, practical, action-oriented, accurate, up-to-date, easy to navigate, encouraging without unnecessary hype, and designed to produce measurable progress.

COMPLETION: Each pillar concludes with a Final Capstone Project, Skills Acquired, Success Criteria, and Recommended Next Pillar.

You must respond ONLY with valid JSON — no markdown, no explanation, no code fences. Return a single JSON object matching the schema exactly.`;

export async function POST(req: NextRequest) {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  ensureDir();

  const body = await req.json();
  const { name, description, difficulty, estimated_duration, target_audience, learning_outcome, type = "pillar", pillar_slug, context } = body;

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  if (type === "pillar") {
    const slug = name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const filePath = path.join(PILLARS_DIR, `${slug}.json`);
    if (fs.existsSync(filePath)) {
      return NextResponse.json({ error: "A pillar with this name already exists. Choose a different name." }, { status: 409 });
    }

    const userPrompt = `Generate a complete learning pillar for the Cyberussell ecosystem.

Pillar Name: ${name}
Description: ${description}
Difficulty: ${difficulty}
Estimated Duration: ${estimated_duration}
Target Audience: ${target_audience}
Learning Outcome: ${learning_outcome}

Return ONLY this JSON structure (no markdown, no explanation):
{
  "overview": "2-3 paragraph overview of the pillar",
  "learning_objectives": ["objective 1", "objective 2", "...up to 6"],
  "skills_gained": ["skill 1", "skill 2", "...up to 8"],
  "modules": [
    {
      "id": "module-1",
      "title": "Module Title",
      "description": "Module description",
      "lessons": [
        { "id": "lesson-1-1", "title": "Lesson Title", "summary": "One sentence summary" }
      ],
      "key_concepts": ["concept 1", "concept 2"],
      "practical_exercises": ["exercise 1", "exercise 2"],
      "ai_activities": ["activity 1", "activity 2"],
      "chatgpt_prompts": ["prompt 1", "prompt 2"],
      "claude_prompts": ["prompt 1", "prompt 2"],
      "reflection_questions": ["question 1", "question 2"],
      "common_mistakes": ["mistake 1", "mistake 2"],
      "checklist": ["item 1", "item 2"]
    }
  ],
  "capstone_project": {
    "title": "Capstone Project Title",
    "description": "Capstone description",
    "deliverables": ["deliverable 1", "deliverable 2"],
    "success_criteria": ["criterion 1", "criterion 2"]
  },
  "quiz_outline": {
    "total_questions": 20,
    "topics": ["topic 1", "topic 2"]
  },
  "certificate_requirements": ["requirement 1", "requirement 2", "requirement 3"],
  "bida_badge": {
    "name": "Badge Name",
    "description": "What this badge represents",
    "criteria": ["criterion 1", "criterion 2", "criterion 3"]
  },
  "recommended_next_pillar": "Name of the next pillar to take"
}

Generate 3-5 modules. Each module should have 3-5 lessons. Make everything practical and Filipino-context-aware.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const rawText = message.content[0].type === "text" ? message.content[0].text : "";
    let generated: Record<string, unknown>;
    try {
      generated = JSON.parse(rawText);
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/);
      if (!match) return NextResponse.json({ error: "AI returned invalid JSON" }, { status: 500 });
      generated = JSON.parse(match[0]);
    }

    const pillar = {
      slug,
      name,
      description,
      difficulty,
      estimated_duration,
      target_audience,
      learning_outcome,
      _status: "draft",
      generated_at: new Date().toISOString(),
      ...generated,
    };

    fs.writeFileSync(filePath, JSON.stringify(pillar, null, 2), "utf-8");
    return NextResponse.json({ ok: true, slug, pillar });
  }

  if (type === "module" && pillar_slug) {
    const filePath = path.join(PILLARS_DIR, `${pillar_slug}.json`);
    if (!fs.existsSync(filePath)) return NextResponse.json({ error: "Pillar not found" }, { status: 404 });
    const pillar = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const userPrompt = `Generate a new module for this pillar: "${pillar.name}"
Context: ${context || "Add a new module that fits the pillar's curriculum"}

Return ONLY this JSON:
{
  "id": "module-${Date.now()}",
  "title": "Module Title",
  "description": "Module description",
  "lessons": [
    { "id": "lesson-${Date.now()}-1", "title": "Lesson Title", "summary": "One sentence summary" }
  ],
  "key_concepts": ["concept 1", "concept 2"],
  "practical_exercises": ["exercise 1", "exercise 2"],
  "ai_activities": ["activity 1", "activity 2"],
  "chatgpt_prompts": ["prompt 1", "prompt 2"],
  "claude_prompts": ["prompt 1", "prompt 2"],
  "reflection_questions": ["question 1", "question 2"],
  "common_mistakes": ["mistake 1", "mistake 2"],
  "checklist": ["item 1", "item 2"]
}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const rawText = message.content[0].type === "text" ? message.content[0].text : "";
    let newModule: Record<string, unknown>;
    try {
      newModule = JSON.parse(rawText);
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/);
      if (!match) return NextResponse.json({ error: "AI returned invalid JSON" }, { status: 500 });
      newModule = JSON.parse(match[0]);
    }

    pillar.modules = [...(pillar.modules || []), newModule];
    fs.writeFileSync(filePath, JSON.stringify(pillar, null, 2), "utf-8");
    return NextResponse.json({ ok: true, module: newModule });
  }

  if (type === "quiz" && pillar_slug) {
    const filePath = path.join(PILLARS_DIR, `${pillar_slug}.json`);
    if (!fs.existsSync(filePath)) return NextResponse.json({ error: "Pillar not found" }, { status: 404 });
    const pillar = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const userPrompt = `Generate a complete quiz for: "${pillar.name}"
Context: ${context || "Full pillar assessment"}

Return ONLY this JSON:
{
  "title": "Quiz Title",
  "description": "Quiz description",
  "total_questions": 20,
  "questions": [
    {
      "id": 1,
      "question": "Question text?",
      "type": "multiple_choice",
      "options": ["A", "B", "C", "D"],
      "correct_answer": "A",
      "explanation": "Why this is correct"
    }
  ]
}
Generate 10 questions. Mix multiple choice and true/false.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const rawText = message.content[0].type === "text" ? message.content[0].text : "";
    let quiz: Record<string, unknown>;
    try {
      quiz = JSON.parse(rawText);
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/);
      if (!match) return NextResponse.json({ error: "AI returned invalid JSON" }, { status: 500 });
      quiz = JSON.parse(match[0]);
    }

    pillar.quiz = quiz;
    fs.writeFileSync(filePath, JSON.stringify(pillar, null, 2), "utf-8");
    return NextResponse.json({ ok: true, quiz });
  }

  if (type === "worksheet" && pillar_slug) {
    const filePath = path.join(PILLARS_DIR, `${pillar_slug}.json`);
    if (!fs.existsSync(filePath)) return NextResponse.json({ error: "Pillar not found" }, { status: 404 });
    const pillar = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const userPrompt = `Generate a practical worksheet for: "${pillar.name}"
Context: ${context || "Hands-on practice worksheet"}

Return ONLY this JSON:
{
  "title": "Worksheet Title",
  "description": "What learners will practice",
  "sections": [
    {
      "title": "Section Title",
      "instructions": "What to do",
      "exercises": [
        { "prompt": "Exercise prompt", "space": "lines needed (short/medium/long)" }
      ]
    }
  ],
  "reflection_prompts": ["prompt 1", "prompt 2"],
  "completion_checklist": ["item 1", "item 2"]
}
Generate 3-4 sections with 2-3 exercises each.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const rawText = message.content[0].type === "text" ? message.content[0].text : "";
    let worksheet: Record<string, unknown>;
    try {
      worksheet = JSON.parse(rawText);
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/);
      if (!match) return NextResponse.json({ error: "AI returned invalid JSON" }, { status: 500 });
      worksheet = JSON.parse(match[0]);
    }

    pillar.worksheet = worksheet;
    fs.writeFileSync(filePath, JSON.stringify(pillar, null, 2), "utf-8");
    return NextResponse.json({ ok: true, worksheet });
  }

  if (type === "cheat_sheet" && pillar_slug) {
    const filePath = path.join(PILLARS_DIR, `${pillar_slug}.json`);
    if (!fs.existsSync(filePath)) return NextResponse.json({ error: "Pillar not found" }, { status: 404 });
    const pillar = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const userPrompt = `Generate a printable cheat sheet for: "${pillar.name}"
Context: ${context || "Key concepts and quick reference"}

Return ONLY this JSON:
{
  "title": "Cheat Sheet Title",
  "tagline": "One line tagline",
  "sections": [
    {
      "title": "Section Title",
      "items": [
        { "term": "Term or concept", "definition": "Quick definition or tip" }
      ]
    }
  ],
  "quick_tips": ["tip 1", "tip 2", "tip 3"],
  "key_prompts": ["prompt 1", "prompt 2"],
  "remember": "One memorable takeaway"
}
Generate 4-5 sections with 4-6 items each. Make it scannable.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const rawText = message.content[0].type === "text" ? message.content[0].text : "";
    let cheatSheet: Record<string, unknown>;
    try {
      cheatSheet = JSON.parse(rawText);
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/);
      if (!match) return NextResponse.json({ error: "AI returned invalid JSON" }, { status: 500 });
      cheatSheet = JSON.parse(match[0]);
    }

    pillar.cheat_sheet = cheatSheet;
    fs.writeFileSync(filePath, JSON.stringify(pillar, null, 2), "utf-8");
    return NextResponse.json({ ok: true, cheat_sheet: cheatSheet });
  }

  if (type === "certificate" && pillar_slug) {
    const filePath = path.join(PILLARS_DIR, `${pillar_slug}.json`);
    if (!fs.existsSync(filePath)) return NextResponse.json({ error: "Pillar not found" }, { status: 404 });
    const pillar = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const userPrompt = `Generate certificate details for completing: "${pillar.name}"

Return ONLY this JSON:
{
  "title": "Certificate Title",
  "credential_name": "e.g. Certified AI Fundamentals Graduate",
  "description": "What this certificate represents",
  "requirements": ["requirement 1", "requirement 2"],
  "skills_certified": ["skill 1", "skill 2"],
  "validity": "How long it is valid or 'Lifetime'",
  "issuer": "Cyberussell Learning System"
}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const rawText = message.content[0].type === "text" ? message.content[0].text : "";
    let certificate: Record<string, unknown>;
    try {
      certificate = JSON.parse(rawText);
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/);
      if (!match) return NextResponse.json({ error: "AI returned invalid JSON" }, { status: 500 });
      certificate = JSON.parse(match[0]);
    }

    pillar.certificate = certificate;
    fs.writeFileSync(filePath, JSON.stringify(pillar, null, 2), "utf-8");
    return NextResponse.json({ ok: true, certificate });
  }

  if (type === "bida_badge" && pillar_slug) {
    const filePath = path.join(PILLARS_DIR, `${pillar_slug}.json`);
    if (!fs.existsSync(filePath)) return NextResponse.json({ error: "Pillar not found" }, { status: 404 });
    const pillar = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const userPrompt = `Generate a Bida Badge definition for completing: "${pillar.name}"
"Bida" means hero/star in Filipino. This badge celebrates achievement.

Return ONLY this JSON:
{
  "name": "Badge Name (e.g. AI Bida)",
  "tagline": "Short motivational tagline in Filipino/English mix",
  "description": "What this badge means to the learner",
  "icon_concept": "Describe the badge icon concept",
  "color": "Badge color theme",
  "criteria": ["criterion 1", "criterion 2", "criterion 3"],
  "celebration_message": "Congratulations message in Filipino/English mix"
}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const rawText = message.content[0].type === "text" ? message.content[0].text : "";
    let badge: Record<string, unknown>;
    try {
      badge = JSON.parse(rawText);
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/);
      if (!match) return NextResponse.json({ error: "AI returned invalid JSON" }, { status: 500 });
      badge = JSON.parse(match[0]);
    }

    pillar.bida_badge = badge;
    fs.writeFileSync(filePath, JSON.stringify(pillar, null, 2), "utf-8");
    return NextResponse.json({ ok: true, bida_badge: badge });
  }

  if (type === "prompt_library" && pillar_slug) {
    const filePath = path.join(PILLARS_DIR, `${pillar_slug}.json`);
    if (!fs.existsSync(filePath)) return NextResponse.json({ error: "Pillar not found" }, { status: 404 });
    const pillar = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const userPrompt = `Generate a prompt library for learners studying: "${pillar.name}"

Return ONLY this JSON:
{
  "title": "Prompt Library Title",
  "description": "How to use this library",
  "categories": [
    {
      "name": "Category Name",
      "prompts": [
        { "title": "Prompt title", "prompt": "The actual prompt text", "use_case": "When to use this" }
      ]
    }
  ]
}
Generate 4 categories with 3-4 prompts each. Include ChatGPT, Claude, and Gemini-friendly prompts.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const rawText = message.content[0].type === "text" ? message.content[0].text : "";
    let library: Record<string, unknown>;
    try {
      library = JSON.parse(rawText);
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/);
      if (!match) return NextResponse.json({ error: "AI returned invalid JSON" }, { status: 500 });
      library = JSON.parse(match[0]);
    }

    pillar.prompt_library = library;
    fs.writeFileSync(filePath, JSON.stringify(pillar, null, 2), "utf-8");
    return NextResponse.json({ ok: true, prompt_library: library });
  }

  return NextResponse.json({ error: "Unknown generation type" }, { status: 400 });
}
