"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, XCircle, Loader2, ChevronRight, AlertCircle } from "lucide-react";

type Question = { id: number; question: string; options: string[] };

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is the 4-part ChatGPT prompt formula?",
    options: [
      "Role, Task, Context, Format",
      "Ask, Clarify, Repeat, Confirm",
      "Who, What, When, Why",
      "Intro, Body, Example, Conclusion",
    ],
  },
  {
    id: 2,
    question: "What does ChatGPT Memory do?",
    options: [
      "Backs up your conversations to the cloud",
      "Remembers things about you across conversations so you do not have to repeat yourself",
      "Memorizes every website you visit",
      "Records your voice conversations for playback",
    ],
  },
  {
    id: 3,
    question: "What is the best use of ChatGPT Voice Mode for a Filipino beginner?",
    options: [
      "Translating documents from Filipino to English",
      "Searching the internet hands-free",
      "Practicing English conversation and thinking through problems hands-free",
      "Recording meetings and transcribing them automatically",
    ],
  },
  {
    id: 4,
    question: "What does ChatGPT Canvas allow you to do that regular chat does not?",
    options: [
      "Generate images with DALL-E",
      "Write and edit a document side-by-side with AI",
      "Run Python code in the browser",
      "Browse the internet in real time",
    ],
  },
  {
    id: 5,
    question: "What makes Claude special compared to ChatGPT for document work?",
    options: [
      "Claude has a built-in camera and microphone",
      "Claude only works with Filipino-language documents",
      "Claude can handle extremely long documents and shows outputs in a separate Artifact panel",
      "Claude connects directly to Google Drive for automatic syncing",
    ],
  },
  {
    id: 6,
    question: "What is a Claude Project used for?",
    options: [
      "Managing your social media calendar",
      "Storing custom instructions and files so Claude always has context about who you are",
      "Downloading Claude to use it offline",
      "Creating AI-generated videos from text",
    ],
  },
  {
    id: 7,
    question: "What can a complete beginner use Claude Code for without knowing how to program?",
    options: [
      "Building native iOS and Android apps",
      "Writing spreadsheet formulas, simple automations, and basic templates",
      "Training custom AI models from scratch",
      "Setting up cloud servers and databases",
    ],
  },
  {
    id: 8,
    question: "Which AI is best integrated with Google Workspace tools like Gmail, Docs, and Sheets?",
    options: [
      "ChatGPT",
      "Claude",
      "Gemini",
      "Copilot",
    ],
  },
  {
    id: 9,
    question: "What makes Gemini Deep Research different from a regular AI answer?",
    options: [
      "It uses a larger font so it is easier to read",
      "It translates answers into Filipino automatically",
      "It actually searches the internet and compiles a report with real sources",
      "It only answers questions about Google products",
    ],
  },
  {
    id: 10,
    question: "When should you use Gemini with Search instead of regular Gemini?",
    options: [
      "When you want the AI to make up creative stories",
      "When you need current, real-time information like prices, news, or local data",
      "When you want faster responses without internet connection",
      "When you are writing long documents and need a co-writer",
    ],
  },
];

const CORRECT_ANSWERS: Record<number, number> = {
  1: 0, // Role, Task, Context, Format
  2: 1, // Remembers things about you
  3: 2, // Practicing English conversation
  4: 1, // Write and edit document side-by-side
  5: 2, // Claude can handle extremely long documents
  6: 1, // Storing custom instructions and files
  7: 1, // Writing spreadsheet formulas
  8: 2, // Gemini
  9: 2, // Searches internet and compiles report
  10: 1, // Current, real-time information
};

const PASS_SCORE = 75;

export default function AITeamAssessmentPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean; correct: number; total: number } | null>(null);
  const [error, setError] = useState("");
  const [learnerName, setLearnerName] = useState("");
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    fetch("/api/learner/auth").then((r) => r.json()).then((d) => {
      if (!d.learner) {
        window.location.href = "/learn/ai-team/complete";
        return;
      }
      setLearnerName(d.learner.name);
      if (d.learner.completed_pillars?.includes("ai-team")) {
        window.location.href = "/learn/ai-team/congratulations";
      }
      setAuthChecked(true);
    });
  }, []);

  async function handleSubmit() {
    if (Object.keys(answers).length < QUESTIONS.length) {
      setError("Please answer all questions before submitting.");
      return;
    }
    setSubmitting(true);
    setError("");

    // Calculate score client-side
    let correct = 0;
    QUESTIONS.forEach((q) => {
      if (answers[q.id] === CORRECT_ANSWERS[q.id]) correct++;
    });
    const score = Math.round((correct / QUESTIONS.length) * 100);
    const passed = score >= PASS_SCORE;

    // Submit to API
    try {
      const res = await fetch("/api/learner/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pillar: "ai-team",
          badgeName: "AI Team Bida",
          certName: "Cyberussell AI Team Certificate",
          score,
          passed,
          answers: Object.entries(answers).map(([id, answer]) => ({ id: Number(id), answer })),
        }),
      });
      const data = await res.json();
      if (!res.ok && data.error) {
        // Non-blocking — show result anyway
        console.error(data.error);
      }
    } catch {
      // Non-blocking
    }

    setResult({ score, passed, correct, total: QUESTIONS.length });
    setSubmitting(false);

    if (passed) {
      setTimeout(() => {
        window.location.href = "/learn/ai-team/congratulations";
      }, 2000);
    }
  }

  const answered = Object.keys(answers).length;
  const total = QUESTIONS.length;

  if (!authChecked) {
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
            <div className="inline-flex items-center gap-2 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-full px-4 py-1.5 mb-4">
              <span className="text-[#22C55E] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">Final Assessment</span>
            </div>
            <h1 className="font-sans text-[28px] md:text-[36px] font-bold text-white mb-2">Meet Your AI Team</h1>
            {learnerName && <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40">Good luck, {learnerName}!</p>}

            {/* Progress */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/40">{answered} of {total} answered</span>
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/30">Pass: {PASS_SCORE}%</span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-[#22C55E] rounded-full transition-all duration-300" style={{ width: `${(answered / total) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Questions */}
          {!result && (
            <div className="space-y-6">
              {QUESTIONS.map((q, qi) => (
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
                          className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${selected ? "border-[#22C55E]/60 bg-[#22C55E]/[0.08]" : "border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.02]"}`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected ? "border-[#22C55E] bg-[#22C55E]" : "border-white/20"}`}>
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
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#22C55E] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[15px] font-bold hover:bg-[#22C55E]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
                  <CheckCircle size={56} className="text-[#22C55E] mx-auto mb-4" strokeWidth={1.5} />
                  <h2 className="font-sans text-[28px] font-bold text-white mb-2">You Passed! 🎉</h2>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 mb-4">Score: <span className="text-[#22C55E] font-bold text-[20px]">{result.score}%</span> — {result.correct}/{result.total} correct</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35">Redirecting to your achievement page...</p>
                  <Loader2 size={20} className="text-[#22C55E] animate-spin mx-auto mt-4" />
                </>
              ) : (
                <>
                  <XCircle size={56} className="text-[#E8373A] mx-auto mb-4" strokeWidth={1.5} />
                  <h2 className="font-sans text-[24px] font-bold text-white mb-2">Not Quite Yet</h2>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 mb-2">Score: <span className="text-[#E8373A] font-bold text-[20px]">{result.score}%</span> — Need {PASS_SCORE}% to pass</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mb-6">Review the guides and try again. You got this!</p>
                  <div className="flex gap-3 justify-center">
                    <a href="/learn/ai-team" className="px-5 py-2.5 rounded-xl border border-white/[0.10] font-[family-name:var(--font-inter)] text-[13px] text-white/60 hover:text-white/80 transition-colors">Review Guides</a>
                    <button onClick={() => { setResult(null); setAnswers({}); }} className="px-5 py-2.5 rounded-xl bg-[#22C55E] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-[#22C55E]/90 transition-colors">Try Again</button>
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
