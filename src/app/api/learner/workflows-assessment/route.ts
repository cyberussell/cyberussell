import { NextRequest, NextResponse } from "next/server";
import { getSession, saveLearner } from "@/lib/learnerAuth";

const PASSING_SCORE = 75;

const WORKFLOWS_QUIZ = [
  {
    id: 1,
    question: "What is the main advantage of using multiple AI tools in a workflow instead of just one?",
    options: [
      "It's cheaper than using one tool",
      "Each tool does what it's best at, producing better overall results",
      "It's faster to use multiple tools",
      "Multiple tools are required by most job sites",
    ],
    correct: 1,
  },
  {
    id: 2,
    question: "In the Website Creation Workflow, which AI tool is best for writing all the website copy?",
    options: ["Gemini", "ChatGPT", "Claude", "Google Docs AI"],
    correct: 2,
  },
  {
    id: 3,
    question: "In the Business Planning Workflow, which AI is used to research the market with real internet sources?",
    options: ["Claude", "ChatGPT", "Gemini Deep Research", "Microsoft Copilot"],
    correct: 2,
  },
  {
    id: 4,
    question: "Why use two different AIs for resume creation instead of just one?",
    options: [
      "One AI is for free users and one is for paid users",
      "Each AI has different strengths — ChatGPT for structure and ideas, Claude for polished writing",
      "It's required by job application sites",
      "To make the resume longer and more detailed",
    ],
    correct: 1,
  },
  {
    id: 5,
    question: "In the Content Creation Workflow, what does ChatGPT do and what does Claude do?",
    options: [
      "ChatGPT writes posts, Claude edits them",
      "ChatGPT generates post ideas, Claude writes the actual complete captions",
      "ChatGPT posts to social media, Claude tracks analytics",
      "Both AI tools do exactly the same thing",
    ],
    correct: 1,
  },
  {
    id: 6,
    question: "What is the FIRST step in the Freelancing Proposal Workflow — before using any AI?",
    options: [
      "Open ChatGPT immediately and start drafting",
      "Read the job post carefully and identify the client's real problem",
      "Write your proposal manually first as a draft",
      "Check what your competitors' proposals look like",
    ],
    correct: 1,
  },
  {
    id: 7,
    question: "In the Deep Research Workflow, what is Claude's specific role?",
    options: [
      "Finding current facts from the internet with real sources",
      "Drawing charts and graphs from the data",
      "Synthesizing all research into a clear, organized summary",
      "Sending the research report by email",
    ],
    correct: 2,
  },
  {
    id: 8,
    question: "What makes the Learning New Skills Workflow more effective than watching YouTube tutorials?",
    options: [
      "It's completely free to use",
      "AI adapts explanations to your pace and lets you practice immediately with real projects from your life",
      "It uses videos that are easier to understand",
      "YouTube tutorials are actually better for learning",
    ],
    correct: 1,
  },
  {
    id: 9,
    question: "In the Programming Workflow, what should you do if the code Claude wrote produces an error?",
    options: [
      "Give up and hire a professional developer",
      "Ask Gemini to delete the code and start over",
      "Copy the exact error message and describe it to ChatGPT — it explains what went wrong in plain language",
      "Restart your computer and try running the code again",
    ],
    correct: 2,
  },
  {
    id: 10,
    question: "In the Decision Making Workflow, who makes the final decision?",
    options: [
      "ChatGPT — it has the most complete analysis",
      "Claude — it steelmanned all the options",
      "Gemini — it has the most current facts",
      "You — AI only informs and clarifies the decision",
    ],
    correct: 3,
  },
];

export async function GET() {
  return NextResponse.json({ questions: WORKFLOWS_QUIZ.map((q) => ({ id: q.id, question: q.question, options: q.options })) });
}

export async function POST(req: NextRequest) {
  const learner = await getSession();
  if (!learner) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { answers } = await req.json();
  if (!answers || !Array.isArray(answers)) return NextResponse.json({ error: "Answers required" }, { status: 400 });

  const pillar = "workflows";

  let correct = 0;
  const results = WORKFLOWS_QUIZ.map((q) => {
    const given = answers.find((a: { id: number; answer: number }) => a.id === q.id)?.answer;
    const isCorrect = given === q.correct;
    if (isCorrect) correct++;
    return { id: q.id, correct: isCorrect, correctAnswer: q.correct };
  });

  const score = Math.round((correct / WORKFLOWS_QUIZ.length) * 100);
  const passed = score >= PASSING_SCORE;

  if (passed) {
    learner.assessment_scores[pillar] = score;
    if (!learner.completed_pillars.includes(pillar)) learner.completed_pillars.push(pillar);

    const badgeExists = learner.badges.find((b: { id: string }) => b.id === "workflows-badge");
    if (!badgeExists) {
      learner.badges.push({ id: "workflows-badge", name: "Workflow Bida", earned_at: new Date().toISOString() });
    }

    const certExists = learner.certificates.find((c: { id: string }) => c.id === "workflows-cert");
    if (!certExists) {
      learner.certificates.push({ id: "workflows-cert", name: "Cyberussell AI Workflows Certificate", earned_at: new Date().toISOString() });
    }

    await saveLearner(learner);
  }

  return NextResponse.json({ score, passed, correct, total: WORKFLOWS_QUIZ.length, results });
}
