"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, XCircle, Loader2, ChevronRight, AlertCircle } from "lucide-react";

type Question = { id: number; question: string; options: string[] };

const MISSIONS_QUIZ = [
  {
    id: 1,
    question: "What is the most important thing that makes an AI Mission different from a regular lesson?",
    options: ["Missions are shorter and easier", "Missions end with a real, tangible deliverable you can actually use", "Missions require no AI tools", "Missions are only for advanced learners"],
    correct: 1,
  },
  {
    id: 2,
    question: "When writing a professional resume with AI, what should you always do BEFORE using AI to write?",
    options: ["Collect your job history, skills, and accomplishments to give AI accurate raw material", "Ask AI to invent work experience", "Use the longest resume template available", "Skip the summary section to save space"],
    correct: 0,
  },
  {
    id: 3,
    question: "What is the single most critical element of a high-converting landing page?",
    options: ["A long list of features", "A clear headline that immediately communicates the value to the visitor", "Animations and video backgrounds", "As many colors as possible"],
    correct: 1,
  },
  {
    id: 4,
    question: "When writing a freelance proposal with AI, what makes it stand out from generic ones?",
    options: ["Making it as long as possible", "Personalizing it to the client's specific problem and demonstrating you understand their situation", "Using formal business language throughout", "Copying successful proposals from the internet"],
    correct: 1,
  },
  {
    id: 5,
    question: "What is the correct way to research a business idea using AI?",
    options: ["Ask AI if the business idea is good and trust the answer completely", "Use AI to research competitors, validate demand, and identify potential problems — then verify findings", "Skip research and launch immediately", "Only ask one AI tool for its opinion"],
    correct: 1,
  },
  {
    id: 6,
    question: "For a 30-day social media content calendar, what is the BEST approach with AI?",
    options: ["Let AI write all 30 posts in one prompt without any input", "Define your niche, audience, content pillars, and posting goals first — then use AI to generate ideas within that framework", "Post randomly and see what works", "Only create content on weekdays"],
    correct: 1,
  },
  {
    id: 7,
    question: "When designing a logo with AI image tools, what should you prepare BEFORE generating?",
    options: ["Nothing — just type 'make a logo' and use whatever comes out", "A clear brief: business name, industry, style preferences, colors, and what the brand should feel like", "A hand-drawn sketch that AI will automatically digitize", "A list of other logos you want to copy"],
    correct: 1,
  },
  {
    id: 8,
    question: "What makes a 1,000-word AI-assisted blog article rank well on Google?",
    options: ["Using AI to write it as fast as possible with no editing", "Targeting a specific keyword, providing genuine value, and editing the AI draft to add your real insights and voice", "Making it as long as possible regardless of quality", "Copying competitor articles and rewording them"],
    correct: 1,
  },
  {
    id: 9,
    question: "What is the 'Missions' philosophy of learning?",
    options: ["Study theory first, then maybe apply it someday", "Learn by doing — complete real tasks with real outcomes, not just consume information", "Watch tutorials until you feel ready", "Memorize best practices before attempting anything"],
    correct: 1,
  },
  {
    id: 10,
    question: "After completing all 7 AI Missions, what is the most valuable outcome?",
    options: ["A certificate that proves you watched all the videos", "A portfolio of 7 real completed deliverables that demonstrate your ability to get things done with AI", "A score on a leaderboard", "Access to more video lessons"],
    correct: 1,
  },
];

export default function MissionsAssessmentPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean; correct: number; total: number } | null>(null);
  const [error, setError] = useState("");
  const [learnerName, setLearnerName] = useState("");

  useEffect(() => {
    fetch("/api/learner/auth").then((r) => r.json()).then((d) => {
      if (!d.learner) { window.location.href = "/learn/missions"; return; }
      setLearnerName(d.learner.name);
      if (d.learner.completed_pillars?.includes("missions")) {
        window.location.href = "/learn/missions/congratulations";
      }
    });
    setQuestions(MISSIONS_QUIZ.map((q) => ({ id: q.id, question: q.question, options: q.options })));
  }, []);

  async function handleSubmit() {
    if (Object.keys(answers).length < questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }
    setSubmitting(true); setError("");

    let correct = 0;
    MISSIONS_QUIZ.forEach((q) => {
      if (answers[q.id] === q.correct) correct++;
    });
    const score = Math.round((correct / MISSIONS_QUIZ.length) * 100);
    const passed = score >= 75;

    if (passed) {
      try {
        await fetch("/api/learner/assessment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers: Object.entries(answers).map(([id, answer]) => ({ id: Number(id), answer })),
            pillar: "missions",
            score,
            passed,
            badgeName: "Mission Complete Bida",
            certName: "Cyberussell AI Missions Certificate",
          }),
        });
      } catch {
        // non-blocking
      }
    }

    setResult({ score, passed, correct, total: MISSIONS_QUIZ.length });
    setSubmitting(false);
    if (passed) setTimeout(() => { window.location.href = "/learn/missions/congratulations"; }, 2000);
  }

  const answered = Object.keys(answers).length;
  const total = questions.length;

  if (!questions.length) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#0F0F1A] flex items-center justify-center">
          <Loader2 size={28} className="text-white/20 animate-spin" />
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] px-6 py-16">
        <div className="max-w-2xl mx-auto">

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-4">
              <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">Final Assessment — Pillar 6</span>
            </div>
            <h1 className="font-sans text-[28px] md:text-[36px] font-bold text-white mb-2">AI Missions</h1>
            {learnerName && <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40">Good luck, {learnerName}!</p>}

            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/40">{answered} of {total} answered</span>
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/30">Pass: 75%</span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-[#FFD23F] rounded-full transition-all duration-300" style={{ width: `${(answered / total) * 100}%` }} />
              </div>
            </div>
          </div>

          {!result && (
            <div className="space-y-6">
              {questions.map((q, qi) => (
                <div key={q.id} className="bg-[#14141e] border border-white/[0.06] rounded-2xl p-6">
                  <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/25 uppercase tracking-[1px] mb-2">Question {qi + 1}</p>
                  <p className="font-sans text-[16px] font-semibold text-white mb-4 leading-relaxed">{q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, oi) => {
                      const selected = answers[q.id] === oi;
                      return (
                        <button
                          key={oi}
                          onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                          className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${selected ? "border-[#FFD23F]/60 bg-[#FFD23F]/[0.08]" : "border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.02]"}`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected ? "border-[#FFD23F] bg-[#FFD23F]" : "border-white/20"}`}>
                            {selected && <div className="w-2 h-2 rounded-full bg-[#0a0a12]" />}
                          </div>
                          <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/80">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {error && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <AlertCircle size={15} className="text-red-400 shrink-0" />
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-red-400">{error}</p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting || answered < total}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[15px] font-bold hover:bg-[#FFD23F]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? <><Loader2 size={17} className="animate-spin" /> Submitting...</> : <><ChevronRight size={17} strokeWidth={2.5} /> Submit Assessment</>}
              </button>
            </div>
          )}

          {result && (
            <div className="bg-[#14141e] border border-white/[0.06] rounded-2xl p-8 text-center">
              {result.passed ? (
                <>
                  <CheckCircle size={56} className="text-[#00C97A] mx-auto mb-4" strokeWidth={1.5} />
                  <h2 className="font-sans text-[28px] font-bold text-white mb-2">You Passed! 🎉</h2>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 mb-4">Score: <span className="text-[#00C97A] font-bold text-[20px]">{result.score}%</span> — {result.correct}/{result.total} correct</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35">Redirecting to your achievement page...</p>
                  <Loader2 size={20} className="text-[#FFD23F] animate-spin mx-auto mt-4" />
                </>
              ) : (
                <>
                  <XCircle size={56} className="text-[#E8373A] mx-auto mb-4" strokeWidth={1.5} />
                  <h2 className="font-sans text-[24px] font-bold text-white mb-2">Not Quite Yet</h2>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 mb-2">Score: <span className="text-[#E8373A] font-bold text-[20px]">{result.score}%</span> — Need 75% to pass</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mb-6">Review the missions and try again. You got this!</p>
                  <div className="flex gap-3 justify-center">
                    <a href="/learn/missions" className="px-5 py-2.5 rounded-xl border border-white/[0.10] font-[family-name:var(--font-inter)] text-[13px] text-white/60 hover:text-white/80 transition-colors">Review Missions</a>
                    <button onClick={() => { setResult(null); setAnswers({}); }} className="px-5 py-2.5 rounded-xl bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-[#FFD23F]/90 transition-colors">Try Again</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
