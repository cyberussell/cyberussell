"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, XCircle, Loader2, ChevronRight, AlertCircle } from "lucide-react";

type Question = { id: number; question: string; options: string[] };

export default function AssessmentPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean; correct: number; total: number; results: { id: number; correct: boolean; correctAnswer: number }[] } | null>(null);
  const [error, setError] = useState("");
  const [learnerName, setLearnerName] = useState("");

  useEffect(() => {
    // Check auth
    fetch("/api/learner/auth").then((r) => r.json()).then((d) => {
      if (!d.learner) { window.location.href = "/learn/foundations/complete"; return; }
      setLearnerName(d.learner.name);
      // If already passed, redirect to congratulations
      if (d.learner.completed_pillars?.includes("foundations")) {
        window.location.href = "/learn/foundations/congratulations";
      }
    });
    // Load questions
    fetch("/api/learner/assessment").then((r) => r.json()).then((d) => {
      if (d.questions) setQuestions(d.questions);
    });
  }, []);

  async function handleSubmit() {
    if (Object.keys(answers).length < questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }
    setSubmitting(true); setError("");
    const res = await fetch("/api/learner/assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: Object.entries(answers).map(([id, answer]) => ({ id: Number(id), answer })) }),
    });
    const data = await res.json();
    if (res.ok) {
      setResult(data);
      if (data.passed) {
        setTimeout(() => { window.location.href = "/learn/foundations/congratulations"; }, 2000);
      }
    } else {
      setError(data.error || "Submission failed. Please try again.");
      setSubmitting(false);
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
            <div className="inline-flex items-center gap-2 bg-[#4F8EF7]/10 border border-[#4F8EF7]/20 rounded-full px-4 py-1.5 mb-4">
              <span className="text-[#4F8EF7] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">Final Assessment</span>
            </div>
            <h1 className="font-sans text-[28px] md:text-[36px] font-bold text-white mb-2">AI Foundations</h1>
            {learnerName && <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40">Good luck, {learnerName}!</p>}

            {/* Progress */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/40">{answered} of {total} answered</span>
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/30">Pass: 80%</span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-[#4F8EF7] rounded-full transition-all duration-300" style={{ width: `${(answered / total) * 100}%` }} />
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
                          className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${selected ? "border-[#4F8EF7]/60 bg-[#4F8EF7]/[0.08]" : "border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.02]"}`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected ? "border-[#4F8EF7] bg-[#4F8EF7]" : "border-white/20"}`}>
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
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[15px] font-bold hover:bg-[#FFD23F]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
                  <Loader2 size={20} className="text-[#FFD23F] animate-spin mx-auto mt-4" />
                </>
              ) : (
                <>
                  <XCircle size={56} className="text-[#E8373A] mx-auto mb-4" strokeWidth={1.5} />
                  <h2 className="font-sans text-[24px] font-bold text-white mb-2">Not Quite Yet</h2>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 mb-2">Score: <span className="text-[#E8373A] font-bold text-[20px]">{result.score}%</span> — Need 80% to pass</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mb-6">Review the guides and try again. You got this!</p>
                  <div className="flex gap-3 justify-center">
                    <a href="/learn/foundations" className="px-5 py-2.5 rounded-xl border border-white/[0.10] font-[family-name:var(--font-inter)] text-[13px] text-white/60 hover:text-white/80 transition-colors">Review Guides</a>
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
