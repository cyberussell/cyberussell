"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, XCircle, Loader2, ChevronRight, AlertCircle } from "lucide-react";

type Question = { id: number; question: string; options: string[] };

const THINK_QUIZ = [
  {
    id: 1,
    question: "What is the main difference between one-shot prompting and multi-turn prompting?",
    options: [
      "One-shot prompts are longer and more detailed",
      "Multi-turn builds on previous answers to go deeper and get more specific results",
      "Multi-turn requires a paid AI subscription",
      "One-shot prompts work better for creative tasks",
    ],
    correct: 1,
  },
  {
    id: 2,
    question: "In the Thinking Partner Mindset, what does a good AI partner do that a search engine does not?",
    options: [
      "Gives faster answers",
      "Shows you advertisements",
      "Asks clarifying questions back to help you think",
      "Searches the web in real time",
    ],
    correct: 2,
  },
  {
    id: 3,
    question: "What is the FIRST step of a deep AI conversation?",
    options: [
      "Ask the most important question immediately",
      "Set context — tell AI who you are and what you are working on",
      "Request a summary of the topic",
      "Ask AI to brainstorm options",
    ],
    correct: 1,
  },
  {
    id: 4,
    question: "Why do big problems feel impossible to solve?",
    options: [
      "They require expensive tools or resources",
      "They are always too complex for AI to help with",
      "They are actually many smaller problems disguised as one",
      "They need expert human advice before AI can help",
    ],
    correct: 2,
  },
  {
    id: 5,
    question: "What is Step 1 of the Problem Decomposition Method?",
    options: [
      "Ask AI to solve the problem immediately",
      "List every possible solution",
      "Find an expert to validate the problem",
      "State the problem in one clear sentence",
    ],
    correct: 3,
  },
  {
    id: 6,
    question: "Why is your first idea rarely your best?",
    options: [
      "First ideas are always wrong and should be discarded",
      "First ideas are the most obvious ones — the best ideas appear after exploring more options",
      "AI cannot understand first ideas without context",
      "First ideas require too much funding to test",
    ],
    correct: 1,
  },
  {
    id: 7,
    question: "What are the 3 dimensions of the idea filtering framework?",
    options: [
      "Speed, Cost, and Quality",
      "Risk, Reward, and Time",
      "Ease, Impact, and Fit",
      "Creativity, Execution, and Market",
    ],
    correct: 2,
  },
  {
    id: 8,
    question: "Which cognitive bias makes us keep investing in something that is not working because of past investment?",
    options: [
      "Confirmation bias",
      "Availability bias",
      "Recency bias",
      "Sunk cost fallacy",
    ],
    correct: 3,
  },
  {
    id: 9,
    question: "In the AI Decision Framework, what does 'steelman' mean?",
    options: [
      "Research the cost of each option thoroughly",
      "Make the strongest possible case for the opposing option",
      "Ask AI to make the final decision for you",
      "Eliminate weak options from consideration",
    ],
    correct: 1,
  },
  {
    id: 10,
    question: "When should you override AI's advice?",
    options: [
      "Whenever you feel like it, since AI is often wrong",
      "Only when AI gives advice about mathematics",
      "When your lived experience directly contradicts generic advice for your specific situation",
      "When the advice takes longer than 5 turns to develop",
    ],
    correct: 2,
  },
];

export default function ThinkAssessmentPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean; correct: number; total: number; results: { id: number; correct: boolean; correctAnswer: number }[] } | null>(null);
  const [error, setError] = useState("");
  const [learnerName, setLearnerName] = useState("");

  useEffect(() => {
    fetch("/api/learner/auth").then((r) => r.json()).then((d) => {
      if (!d.learner) { window.location.href = "/learn/think/complete"; return; }
      setLearnerName(d.learner.name);
      if (d.learner.completed_pillars?.includes("think")) {
        window.location.href = "/learn/think/congratulations";
      }
    });
    setQuestions(THINK_QUIZ.map((q) => ({ id: q.id, question: q.question, options: q.options })));
  }, []);

  async function handleSubmit() {
    if (Object.keys(answers).length < questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }
    setSubmitting(true); setError("");

    // Score locally
    let correct = 0;
    const results = THINK_QUIZ.map((q) => {
      const given = answers[q.id];
      const isCorrect = given === q.correct;
      if (isCorrect) correct++;
      return { id: q.id, correct: isCorrect, correctAnswer: q.correct };
    });
    const score = Math.round((correct / THINK_QUIZ.length) * 100);
    const passed = score >= 75;

    if (passed) {
      // Save to server
      try {
        await fetch("/api/learner/assessment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers: Object.entries(answers).map(([id, answer]) => ({ id: Number(id), answer })),
            pillar: "think",
            score,
            passed,
            badgeName: "Thinking Bida",
            certName: "Cyberussell Think with AI Certificate",
          }),
        });
      } catch {
        // non-blocking
      }
    }

    setResult({ score, passed, correct, total: THINK_QUIZ.length, results });
    setSubmitting(false);

    if (passed) {
      setTimeout(() => { window.location.href = "/learn/think/congratulations"; }, 2000);
    }
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

          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-[#A78BFA]/10 border border-[#A78BFA]/20 rounded-full px-4 py-1.5 mb-4">
              <span className="text-[#A78BFA] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">Final Assessment</span>
            </div>
            <h1 className="font-sans text-[28px] md:text-[36px] font-bold text-white mb-2">Think with AI</h1>
            {learnerName && <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40">Good luck, {learnerName}!</p>}

            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/40">{answered} of {total} answered</span>
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/30">Pass: 75%</span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-[#A78BFA] rounded-full transition-all duration-300" style={{ width: `${(answered / total) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Questions */}
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
                          className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${selected ? "border-[#A78BFA]/60 bg-[#A78BFA]/[0.08]" : "border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.02]"}`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected ? "border-[#A78BFA] bg-[#A78BFA]" : "border-white/20"}`}>
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
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#A78BFA] text-white font-[family-name:var(--font-inter)] text-[15px] font-bold hover:bg-[#A78BFA]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? <><Loader2 size={17} className="animate-spin" /> Submitting...</> : <><ChevronRight size={17} strokeWidth={2.5} /> Submit Assessment</>}
              </button>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="bg-[#14141e] border border-white/[0.06] rounded-2xl p-8 text-center">
              {result.passed ? (
                <>
                  <CheckCircle size={56} className="text-[#00C97A] mx-auto mb-4" strokeWidth={1.5} />
                  <h2 className="font-sans text-[28px] font-bold text-white mb-2">You Passed! 🎉</h2>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 mb-4">Score: <span className="text-[#00C97A] font-bold text-[20px]">{result.score}%</span> — {result.correct}/{result.total} correct</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35">Redirecting to your achievement page...</p>
                  <Loader2 size={20} className="text-[#A78BFA] animate-spin mx-auto mt-4" />
                </>
              ) : (
                <>
                  <XCircle size={56} className="text-[#E8373A] mx-auto mb-4" strokeWidth={1.5} />
                  <h2 className="font-sans text-[24px] font-bold text-white mb-2">Not Quite Yet</h2>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 mb-2">Score: <span className="text-[#E8373A] font-bold text-[20px]">{result.score}%</span> — Need 75% to pass</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mb-6">Review the guides and try again. You got this!</p>
                  <div className="flex gap-3 justify-center">
                    <a href="/learn/think" className="px-5 py-2.5 rounded-xl border border-white/[0.10] font-[family-name:var(--font-inter)] text-[13px] text-white/60 hover:text-white/80 transition-colors">Review Guides</a>
                    <button onClick={() => { setResult(null); setAnswers({}); }} className="px-5 py-2.5 rounded-xl bg-[#A78BFA] text-white font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-[#A78BFA]/90 transition-colors">Try Again</button>
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
