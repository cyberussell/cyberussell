"use client";

import { useState } from "react";
import { QUESTIONS, type Answers } from "@/lib/discovery/questions";
import type { DiscoveryResult } from "@/lib/discovery/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DiscoveryQuestion from "@/components/discovery/DiscoveryQuestion";
import DiscoveryLoading from "@/components/discovery/DiscoveryLoading";
import DiscoveryResults from "@/components/discovery/DiscoveryResults";
import type { Metadata } from "next";

export default function DiscoverPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<DiscoveryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isQuestions = step < QUESTIONS.length;
  const currentQuestion = isQuestions ? QUESTIONS[step] : null;

  function handleSelect(questionId: string, optionId: string, type: "single" | "multi", maxSelections?: number) {
    setAnswers((prev) => {
      const current = prev[questionId] ?? [];
      if (type === "single") {
        return { ...prev, [questionId]: [optionId] };
      }
      if (optionId === "none") {
        return { ...prev, [questionId]: ["none"] };
      }
      const withoutNone = current.filter((id) => id !== "none");
      if (withoutNone.includes(optionId)) {
        return { ...prev, [questionId]: withoutNone.filter((id) => id !== optionId) };
      }
      const updated = [...withoutNone, optionId];
      if (maxSelections && updated.length > maxSelections) {
        return { ...prev, [questionId]: updated.slice(-maxSelections) };
      }
      return { ...prev, [questionId]: updated };
    });
  }

  function handleNext() {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      submitAnswers();
    }
  }

  function handleBack() {
    if (step > 0) setStep(step - 1);
  }

  async function submitAnswers() {
    setLoading(true);
    setError(null);
    setStep(QUESTIONS.length);
    try {
      const res = await fetch("/api/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleRetry() {
    setError(null);
    submitAnswers();
  }

  function handleRestart() {
    setStep(0);
    setAnswers({});
    setResult(null);
    setError(null);
    setLoading(false);
  }

  const canAdvance = currentQuestion ? (answers[currentQuestion.id]?.length ?? 0) > 0 : false;
  const minutesLeft = Math.max(1, Math.ceil(((QUESTIONS.length - step) / QUESTIONS.length) * 3));

  return (
    <>
      <Navbar />
      <main className="bg-[#0F0F1A] min-h-screen">
        {isQuestions && currentQuestion && (
          <DiscoveryQuestion
            question={currentQuestion}
            selected={answers[currentQuestion.id] ?? []}
            onSelect={(optionId) => handleSelect(currentQuestion.id, optionId, currentQuestion.type, currentQuestion.maxSelections)}
            onNext={handleNext}
            onBack={step > 0 ? handleBack : undefined}
            canAdvance={canAdvance}
            step={step + 1}
            totalSteps={QUESTIONS.length}
            minutesLeft={minutesLeft}
          />
        )}

        {!isQuestions && loading && <DiscoveryLoading />}

        {!isQuestions && error && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-[#E8373A] mb-4">{error}</p>
            <button onClick={handleRetry} className="bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[14px] py-3 px-8 rounded-xl hover:bg-[#FF4A4D] transition-colors">
              Try Again
            </button>
          </div>
        )}

        {!isQuestions && result && !loading && (
          <DiscoveryResults result={result} onRestart={handleRestart} />
        )}
      </main>
      {result && <Footer />}
    </>
  );
}
