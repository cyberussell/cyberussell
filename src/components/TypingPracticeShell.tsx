"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import TypingPractice from "./TypingPractice";

const THEME_KEY = "typing-page-theme";

export default function TypingPracticeShell() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light") setIsDark(false);
  }, []);

  function toggleTheme() {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      return next;
    });
  }

  return (
    <main className={`min-h-screen px-4 py-16 md:py-24 transition-colors ${isDark ? "bg-[#0F0F1A]" : "bg-[#F5F5F8]"}`}>
      <div className="max-w-4xl mx-auto mb-10 text-center relative">
        <button
          onClick={toggleTheme}
          aria-label="Toggle light or dark theme"
          className={`absolute right-0 top-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 border text-[11px] font-bold font-[family-name:var(--font-inter)] transition-colors ${
            isDark
              ? "bg-white/[0.05] border-white/[0.1] text-white/50 hover:text-white"
              : "bg-white border-gray-200 text-gray-500 hover:text-gray-900"
          }`}
        >
          {isDark ? <Moon size={13} /> : <Sun size={13} />}
          {isDark ? "Dark" : "Light"}
        </button>

        <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] animate-pulse" />
          <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
            Free Tool
          </span>
        </div>
        <h1 className={`font-sans text-[30px] md:text-[44px] font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
          Typing Practice
        </h1>
        <p className={`font-[family-name:var(--font-inter)] text-[15px] max-w-md mx-auto ${isDark ? "text-white/45" : "text-gray-500"}`}>
          Build speed and accuracy. Keys light up as you type. Track your WPM in real time.
        </p>
      </div>

      {/* Desktop only */}
      <div className="hidden md:block">
        <TypingPractice isDark={isDark} />
      </div>

      {/* Mobile notice */}
      <div className="md:hidden flex flex-col items-center justify-center text-center px-6 py-20 gap-5">
        <div className="text-5xl">⌨️</div>
        <h2 className={`font-sans text-[24px] font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Open this on a desktop</h2>
        <p className={`font-[family-name:var(--font-inter)] text-[15px] max-w-xs leading-[1.8] ${isDark ? "text-white/50" : "text-gray-500"}`}>
          Typing Practice requires a physical keyboard and is best experienced on a laptop or desktop computer.
        </p>
        <a
          href="/tools"
          className="inline-block mt-2 bg-[#FFD23F] text-[#0A0A14] font-[family-name:var(--font-inter)] font-bold text-[14px] px-6 py-3 rounded-xl hover:bg-[#FFD23F]/90 transition-all"
        >
          Browse Other Tools
        </a>
      </div>
    </main>
  );
}
