"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, XCircle, Loader2, ChevronRight, AlertCircle } from "lucide-react";

type Question = { id: number; question: string; options: string[] };

const SKILLS_QUIZ = [
  {
    id: 1,
    question: "What is the MOST important first step when building a website with AI?",
    options: ["Choose a color palette", "Plan your site structure, goals, and content before touching any tool", "Pick a domain name", "Install a website builder immediately"],
    correct: 1,
  },
  {
    id: 2,
    question: "What does SEO stand for and what is its primary goal?",
    options: ["Site Engine Optimization — make your site load faster", "Search Engine Optimization — help your pages rank higher in search results", "Social Engagement Optimization — grow social media followers", "Site Error Output — reduce website errors"],
    correct: 1,
  },
  {
    id: 3,
    question: "When creating social media graphics with AI tools, what should you always prioritize?",
    options: ["Using as many colors as possible", "Visual consistency with your brand identity and clear communication", "Adding maximum text to every graphic", "Using only photos, never illustrations"],
    correct: 1,
  },
  {
    id: 4,
    question: "What is the key difference between writing and copywriting?",
    options: ["Writing is longer; copywriting is shorter", "Writing informs or entertains; copywriting is designed to persuade and drive a specific action", "Copywriting is for websites only; writing is for books", "There is no real difference — they are the same skill"],
    correct: 1,
  },
  {
    id: 5,
    question: "Which of the following is the BEST strategy for building a content calendar with AI?",
    options: ["Ask AI to generate 100 random ideas and pick the best ones", "Define your audience, goals, and content pillars first — then use AI to fill the calendar", "Post whatever AI generates without editing", "Only create content when you feel inspired"],
    correct: 1,
  },
  {
    id: 6,
    question: "In video editing, what does AI help most with?",
    options: ["Deciding the story you want to tell", "Automating repetitive tasks like captions, cuts, and background removal", "Filming the actual video footage", "Choosing the subject matter of your video"],
    correct: 1,
  },
  {
    id: 7,
    question: "What is the most critical mistake in digital marketing that AI can help you avoid?",
    options: ["Creating too much content", "Marketing without a defined target audience or clear message", "Using email marketing", "Having a website"],
    correct: 1,
  },
  {
    id: 8,
    question: "When using AI to help you code, what is your most important responsibility?",
    options: ["Run the code immediately without reading it", "Understand what the code does and verify it works correctly before deploying", "Only use AI for front-end code", "Never modify AI-generated code"],
    correct: 1,
  },
  {
    id: 9,
    question: "What is automation best used for?",
    options: ["Creative thinking and decision-making", "Tasks that are repetitive, rule-based, and happen frequently", "One-time complex projects", "Tasks that require emotional intelligence"],
    correct: 1,
  },
  {
    id: 10,
    question: "Which skill is considered the foundation for ALL other digital skills in this program?",
    options: ["Video editing", "Programming", "Learning how to use AI tools effectively as a co-creator", "Graphic design"],
    correct: 2,
  },
];

export default function SkillsAssessmentPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean; correct: number; total: number } | null>(null);
  const [error, setError] = useState("");
  const [learnerName, setLearnerName] = useState("");

  useEffect(() => {
    fetch("/api/learner/auth").then((r) => r.json()).then((d) => {
      if (!d.learner) { window.location.href = "/learn/skills"; return; }
      setLearnerName(d.learner.name);
      if (d.learner.completed_pillars?.includes("skills")) {
        window.location.href = "/learn/skills/congratulations";
      }
    });
    setQuestions(SKILLS_QUIZ.map((q) => ({ id: q.id, question: q.question, options: q.options })));
  }, []);

  async function handleSubmit() {
    if (Object.keys(answers).length < questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }
    setSubmitting(true); setError("");

    let correct = 0;
    SKILLS_QUIZ.forEach((q) => {
      if (answers[q.id] === q.correct) correct++;
    });
    const score = Math.round((correct / SKILLS_QUIZ.length) * 100);
    const passed = score >= 75;

    if (passed) {
      try {
        await fetch("/api/learner/assessment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers: Object.entries(answers).map(([id, answer]) => ({ id: Number(id), answer })),
            pillar: "skills",
            score,
            passed,
            badgeName: "Digital Skills Bida",
            certName: "Cyberussell Digital Skills Certificate",
          }),
        });
      } catch {
        // non-blocking
      }
    }

    setResult({ score, passed, correct, total: SKILLS_QUIZ.length });
    setSubmitting(false);
    if (passed) setTimeout(() => { window.location.href = "/learn/skills/congratulations"; }, 2000);
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
            <div className="inline-flex items-center gap-2 bg-[#FB923C]/10 border border-[#FB923C]/20 rounded-full px-4 py-1.5 mb-4">
              <span className="text-[#FB923C] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">Final Assessment — Pillar 5</span>
            </div>
            <h1 className="font-sans text-[28px] md:text-[36px] font-bold text-white mb-2">Digital Skills</h1>
            {learnerName && <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40">Good luck, {learnerName}!</p>}

            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/40">{answered} of {total} answered</span>
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/30">Pass: 75%</span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-[#FB923C] rounded-full transition-all duration-300" style={{ width: `${(answered / total) * 100}%` }} />
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
                          className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${selected ? "border-[#FB923C]/60 bg-[#FB923C]/[0.08]" : "border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.02]"}`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected ? "border-[#FB923C] bg-[#FB923C]" : "border-white/20"}`}>
                            {selected && <div className="w-2 h-2 rounded-full bg-white" />}
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
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#FB923C] text-white font-[family-name:var(--font-inter)] text-[15px] font-bold hover:bg-[#FB923C]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
                  <Loader2 size={20} className="text-[#FB923C] animate-spin mx-auto mt-4" />
                </>
              ) : (
                <>
                  <XCircle size={56} className="text-[#E8373A] mx-auto mb-4" strokeWidth={1.5} />
                  <h2 className="font-sans text-[24px] font-bold text-white mb-2">Not Quite Yet</h2>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 mb-2">Score: <span className="text-[#E8373A] font-bold text-[20px]">{result.score}%</span> — Need 75% to pass</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mb-6">Review the skill tracks and try again. You got this!</p>
                  <div className="flex gap-3 justify-center">
                    <a href="/learn/skills" className="px-5 py-2.5 rounded-xl border border-white/[0.10] font-[family-name:var(--font-inter)] text-[13px] text-white/60 hover:text-white/80 transition-colors">Review Skills</a>
                    <button onClick={() => { setResult(null); setAnswers({}); }} className="px-5 py-2.5 rounded-xl bg-[#FB923C] text-white font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-[#FB923C]/90 transition-colors">Try Again</button>
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
