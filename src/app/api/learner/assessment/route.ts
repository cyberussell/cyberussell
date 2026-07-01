import { NextRequest, NextResponse } from "next/server";
import { getSession, saveLearner } from "@/lib/learnerAuth";

const PASSING_SCORE = 80;

// AI Foundations — 10 questions covering all 7 guides
const FOUNDATIONS_QUIZ = [
  {
    id: 1,
    question: "What is the most accurate description of how AI language models work?",
    options: ["They think and reason like humans", "They predict the next most likely word based on patterns in training data", "They search the internet for answers", "They have a database of facts they look up"],
    correct: 1,
  },
  {
    id: 2,
    question: "Which of the following is AI consistently GOOD at?",
    options: ["Knowing today's news without internet access", "Remembering details from your previous conversations", "Drafting first versions of written content", "Verifying whether facts are currently true"],
    correct: 2,
  },
  {
    id: 3,
    question: "AI failure is best described as:",
    options: ["Random and unpredictable", "Predictable — it fails in consistent, identifiable patterns", "Only happening when the internet is down", "Only happening with complex math problems"],
    correct: 1,
  },
  {
    id: 4,
    question: "Why does AI 'hallucinate' (make things up)?",
    options: ["It has a bug in the code", "It is trained to always give an answer, so it generates plausible-sounding text even when uncertain", "It is lying intentionally", "It runs out of memory"],
    correct: 1,
  },
  {
    id: 5,
    question: "What is the ONE most important rule for dealing with AI hallucinations?",
    options: ["Use a more expensive AI model", "Always verify AI outputs before acting on important information", "Ask the AI the same question twice", "Use shorter prompts"],
    correct: 1,
  },
  {
    id: 6,
    question: "When choosing between ChatGPT, Claude, and Gemini, the BEST approach is:",
    options: ["Always use the most popular one", "Only use free versions", "Match the tool to the task — each has different strengths", "Use all three simultaneously for every task"],
    correct: 2,
  },
  {
    id: 7,
    question: "A well-structured prompt includes which FOUR elements?",
    options: ["Role, Context, Task, and Format", "Length, Tone, Keywords, and Subject", "Question, Answer, Follow-up, and Conclusion", "Introduction, Body, Conclusion, and Summary"],
    correct: 0,
  },
  {
    id: 8,
    question: "Which of these should you NEVER share with an AI chatbot?",
    options: ["The topic of a blog post you're writing", "Your client's personal data, passwords, or sensitive business information", "A general description of your job role", "A recipe you want to improve"],
    correct: 1,
  },
  {
    id: 9,
    question: "AI is LEAST reliable for tasks that require:",
    options: ["Summarizing long documents", "Generating creative writing ideas", "Real-time, up-to-date factual accuracy about current events", "Rewriting text in a different tone"],
    correct: 2,
  },
  {
    id: 10,
    question: "What is the most important mindset when working with AI?",
    options: ["Trust AI completely — it knows more than you", "Use AI as a thinking partner while applying your own judgment to verify outputs", "Avoid AI because it makes too many mistakes", "Only use AI for tasks you already know how to do yourself"],
    correct: 1,
  },
];

export async function GET() {
  return NextResponse.json({ questions: FOUNDATIONS_QUIZ.map((q) => ({ id: q.id, question: q.question, options: q.options })) });
}

export async function POST(req: NextRequest) {
  const learner = await getSession();
  if (!learner) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { answers, pillar = "foundations" } = await req.json();
  if (!answers || !Array.isArray(answers)) return NextResponse.json({ error: "Answers required" }, { status: 400 });

  let correct = 0;
  const results = FOUNDATIONS_QUIZ.map((q) => {
    const given = answers.find((a: { id: number; answer: number }) => a.id === q.id)?.answer;
    const isCorrect = given === q.correct;
    if (isCorrect) correct++;
    return { id: q.id, correct: isCorrect, correctAnswer: q.correct };
  });

  const score = Math.round((correct / FOUNDATIONS_QUIZ.length) * 100);
  const passed = score >= PASSING_SCORE;

  if (passed) {
    learner.assessment_scores[pillar] = score;
    if (!learner.completed_pillars.includes(pillar)) learner.completed_pillars.push(pillar);

    const badgeExists = learner.badges.find((b) => b.id === `${pillar}-badge`);
    if (!badgeExists) {
      learner.badges.push({ id: `${pillar}-badge`, name: "AI Foundations Explorer", earned_at: new Date().toISOString() });
    }

    const certExists = learner.certificates.find((c) => c.id === `${pillar}-cert`);
    if (!certExists) {
      learner.certificates.push({ id: `${pillar}-cert`, name: "Cyberussell AI Foundations Certificate", earned_at: new Date().toISOString() });
    }

    await saveLearner(learner);
  }

  return NextResponse.json({ score, passed, correct, total: FOUNDATIONS_QUIZ.length, results });
}
