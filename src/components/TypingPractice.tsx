"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { RotateCcw, Trophy, Zap, Target, Clock, ChevronDown, Lock, Sparkles, Star } from "lucide-react";

// ─── Passages ──────────────────────────────────────────────────────────────────

const PASSAGES = {
  easy: [
    "The quick brown fox jumps over the lazy dog near the big blue river.",
    "Learning to type fast will save you time every single day at work.",
    "A good skill can open many doors and help you earn more money online.",
    "Practice every day and you will see your speed improve very quickly.",
    "Filipinos who learn to type well can find more jobs and earn higher pay.",
  ],
  medium: [
    "Typing speed is one of the most valuable skills for any remote worker or virtual assistant working online today.",
    "The ability to type quickly and accurately allows you to complete more tasks in less time, which means higher earnings.",
    "Many online jobs in the Philippines require a typing speed of at least 40 words per minute to qualify.",
    "Consistent daily practice is the fastest way to improve your typing speed and reduce the number of errors you make.",
    "Virtual assistants, data entry specialists, and content writers all benefit greatly from having fast and accurate typing skills.",
  ],
  hard: [
    "Developing exceptional typing proficiency requires disciplined practice, attention to proper finger placement, and a commitment to accuracy over raw speed.",
    "Professional typists position their fingers on the home row keys — A, S, D, F for the left hand and J, K, L, and semicolon for the right hand.",
    "Touch typing, the technique of typing without looking at the keyboard, allows skilled typists to maintain eye contact with their screen and work more efficiently.",
    "Keyboard shortcuts, combined with fast typing speed, can dramatically increase productivity for professionals working in data entry, transcription, or content creation fields.",
    "Filipino freelancers who achieve a typing speed above 60 words per minute with 95 percent accuracy are considered highly competitive in the global remote work marketplace.",
  ],
};

type Difficulty = "easy" | "medium" | "hard";

// ─── Keyboard Layout ───────────────────────────────────────────────────────────

const ROWS: string[][] = [
  ["`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace"],
  ["Tab","q","w","e","r","t","y","u","i","o","p","[","]","\\"],
  ["Caps","a","s","d","f","g","h","j","k","l",";","'","Enter"],
  ["LShift","z","x","c","v","b","n","m",",",".","/","RShift"],
  ["Space"],
];

const WIDE_KEYS: Record<string, string> = {
  Backspace:"w-16", Tab:"w-12", Caps:"w-14", Enter:"w-16",
  LShift:"w-20", RShift:"w-20", Space:"w-64 md:w-80",
};

const KEY_LABELS: Record<string, string> = {
  Backspace:"⌫", Tab:"⇥", Caps:"⇪", Enter:"↵", LShift:"⇧", RShift:"⇧", Space:"",
};

// Left hand keys (typed with left hand in touch typing)
const LEFT_KEYS = new Set(["`","1","2","3","4","5","q","w","e","r","t","a","s","d","f","g","z","x","c","v","b"]);
const RIGHT_KEYS = new Set(["6","7","8","9","0","-","=","y","u","i","o","p","[","]","\\","h","j","k","l",";","'","n","m",",",".","/","backspace","enter"]);
const PUNCT_CHARS = new Set([".",",",";",":","!","?","'","\"","-","_","(",")","[","]","/","\\","@","#","$","%","^","&","*"]);

function eventKeyToDisplay(key: string): string {
  const map: Record<string, string> = {
    " ":"Space","Backspace":"Backspace","Tab":"Tab","CapsLock":"Caps","Enter":"Enter","Shift":"LShift",
  };
  return map[key] ?? key.toLowerCase();
}

// ─── LocalStorage helpers ──────────────────────────────────────────────────────

function getPersonalBest(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem("typing-pb") || "0", 10);
}

function savePersonalBest(wpm: number) {
  const pb = getPersonalBest();
  if (wpm > pb) localStorage.setItem("typing-pb", String(wpm));
}

function saveDailySession(wpm: number, accuracy: number) {
  if (typeof window === "undefined") return;
  const today = new Date().toDateString();
  const raw = localStorage.getItem("typing-sessions");
  const sessions: { date: string; wpm: number; accuracy: number }[] = raw ? JSON.parse(raw) : [];
  sessions.push({ date: today, wpm, accuracy });
  // Keep last 60 sessions max
  localStorage.setItem("typing-sessions", JSON.stringify(sessions.slice(-60)));
}

function getDailyAverage(): number {
  if (typeof window === "undefined") return 0;
  const today = new Date().toDateString();
  const raw = localStorage.getItem("typing-sessions");
  const sessions: { date: string; wpm: number }[] = raw ? JSON.parse(raw) : [];
  const todays = sessions.filter((s) => s.date === today);
  if (todays.length === 0) return 0;
  return Math.round(todays.reduce((sum, s) => sum + s.wpm, 0) / todays.length);
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────

function Stat({ icon: Icon, label, value, color, sub }: {
  icon: React.ElementType; label: string; value: string | number; color: string; sub?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-4 py-3 min-w-[76px]">
      <Icon size={14} style={{ color }} strokeWidth={1.8} />
      <span className="font-sans text-[20px] font-bold text-white leading-none">{value}</span>
      <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/30 uppercase tracking-[1.5px] text-center">{label}</span>
      {sub && <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/20">{sub}</span>}
    </div>
  );
}

// ─── Heatmap Keyboard ─────────────────────────────────────────────────────────

function HeatmapKeyboard({ mistakeMap }: { mistakeMap: Record<string, number> }) {
  const max = Math.max(...Object.values(mistakeMap), 1);

  function keyColor(key: string): { bg: string; border: string; text: string } {
    const k = key.toLowerCase();
    const count = mistakeMap[k] ?? 0;
    if (count === 0) return { bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.3)", text: "#34D399" };
    const ratio = count / max;
    if (ratio < 0.35) return { bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.3)", text: "#FBB724" };
    if (ratio < 0.65) return { bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.3)", text: "#F97316" };
    return { bg: "rgba(239,68,68,0.18)", border: "rgba(239,68,68,0.45)", text: "#EF4444" };
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-1.5 items-center min-w-[580px]">
        {ROWS.map((row, ri) => (
          <div key={ri} className="flex gap-1.5 justify-center w-full">
            {row.map((key) => {
              const { bg, border, text } = keyColor(key);
              const widthClass = WIDE_KEYS[key] ?? "w-9";
              const label = KEY_LABELS[key] ?? key.toUpperCase();
              return (
                <div
                  key={key}
                  className={`${widthClass} h-10 rounded-lg flex items-center justify-center font-[family-name:var(--font-inter)] text-[11px] font-bold select-none border shrink-0 transition-colors`}
                  style={{ backgroundColor: bg, borderColor: border, color: text }}
                >
                  {label}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Results Screen ───────────────────────────────────────────────────────────

function ResultsScreen({
  wpm, accuracy, elapsed, typed, passage,
  mistakeMap, errorCount, correctedCount,
  onReset,
}: {
  wpm: number; accuracy: number; elapsed: number; typed: string; passage: string;
  mistakeMap: Record<string, number>; errorCount: number; correctedCount: number;
  onReset: () => void;
}) {
  const pb = getPersonalBest();
  const dailyAvg = getDailyAverage();
  const isNewPB = wpm >= pb && wpm > 0;

  // Punctuation accuracy
  const punctChars = passage.split("").map((c, i) => ({ c, i })).filter(({ c }) => PUNCT_CHARS.has(c));
  const punctCorrect = punctChars.filter(({ c, i }) => typed[i] === c).length;
  const punctAccuracy = punctChars.length > 0 ? Math.round((punctCorrect / punctChars.length) * 100) : 100;

  // Hand accuracy
  let leftAttempted = 0, leftCorrect = 0, rightAttempted = 0, rightCorrect = 0;
  passage.split("").forEach((char, i) => {
    const k = char.toLowerCase();
    if (LEFT_KEYS.has(k)) {
      leftAttempted++;
      if (typed[i] === char) leftCorrect++;
    } else if (RIGHT_KEYS.has(k)) {
      rightAttempted++;
      if (typed[i] === char) rightCorrect++;
    }
  });
  const leftAcc = leftAttempted > 0 ? Math.round((leftCorrect / leftAttempted) * 100) : 100;
  const rightAcc = rightAttempted > 0 ? Math.round((rightCorrect / rightAttempted) * 100) : 100;

  // Weak keys — top 5 most missed
  const weakKeys = Object.entries(mistakeMap)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([k]) => k.toUpperCase());

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="text-center">
        <div className="text-4xl mb-2">{wpm >= 60 ? "🏆" : wpm >= 40 ? "🎯" : "💪"}</div>
        <h3 className="font-sans text-[24px] font-bold text-white">
          {isNewPB ? "New Personal Best!" : wpm >= 60 ? "Excellent!" : wpm >= 40 ? "Great job!" : "Keep going!"}
        </h3>
        {isNewPB && (
          <span className="inline-block mt-1 font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] bg-[#FFD23F]/10 border border-[#FFD23F]/25 rounded-full px-3 py-1">
            ⭐ New Personal Best
          </span>
        )}
      </div>

      {/* ── Speed & Core Stats ── */}
      <div>
        <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[2px] mb-3">Speed & Accuracy</p>
        <div className="flex flex-wrap gap-2 justify-center">
          <Stat icon={Zap}    label="WPM"         value={wpm}             color="#FFD23F" />
          <Stat icon={Target} label="Accuracy"     value={`${accuracy}%`} color="#34D399" />
          <Stat icon={Target} label="Punctuation"  value={`${punctAccuracy}%`} color="#60A5FA" />
          <Stat icon={Clock}  label="Time"         value={formatTime(elapsed)} color="#A78BFA" />
          <Stat icon={Trophy} label="Personal Best" value={`${Math.max(pb, wpm)} wpm`} color="#F472B6" />
          <Stat icon={Zap}    label="Daily Avg"    value={`${dailyAvg || wpm} wpm`} color="#FB923C" />
        </div>
      </div>

      {/* ── Detailed Stats ── */}
      <div>
        <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[2px] mb-3">Session Details</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: "Characters typed", value: typed.length },
            { label: "Errors made",      value: errorCount },
            { label: "Corrections",      value: correctedCount },
            { label: "Words",            value: typed.trim().split(/\s+/).length },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 text-center">
              <p className="font-sans text-[18px] font-bold text-white">{value}</p>
              <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Typing Heatmap ── */}
      <div>
        <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[2px] mb-3">Typing Heatmap</p>

        {/* Hand accuracy */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: "Left Hand", value: leftAcc, color: "#60A5FA" },
            { label: "Right Hand", value: rightAcc, color: "#34D399" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/50">{label}</span>
                <span className="font-sans text-[16px] font-bold" style={{ color }}>{value}%</span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, backgroundColor: color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Keyboard heatmap */}
        <div className="bg-[#111118] border border-white/[0.06] rounded-2xl p-4">
          <HeatmapKeyboard mistakeMap={mistakeMap} />
          <div className="flex items-center justify-center gap-4 mt-3">
            {[
              { color: "#34D399", label: "Clean" },
              { color: "#FBB724", label: "Some errors" },
              { color: "#F97316", label: "Trouble" },
              { color: "#EF4444", label: "Weak key" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
                <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/35">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weak keys */}
        {weakKeys.length > 0 && (
          <div className="mt-3">
            <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 mb-2">Weak keys to practice:</p>
            <div className="flex flex-wrap gap-2">
              {weakKeys.map((k) => (
                <span key={k} className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-1.5">
                  {k}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── AI Mistake Analysis — Coming Soon ── */}
      <div className="relative rounded-2xl border border-white/[0.08] overflow-hidden">
        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-[2px] bg-[#0F0F1A]/60 z-10 flex flex-col items-center justify-center gap-3 px-6">
          <div className="flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/25 rounded-full px-4 py-1.5">
            <Lock size={12} className="text-[#FFD23F]" />
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[2px]">Coming Soon — Premium</span>
          </div>
          <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 text-center max-w-xs">
            AI-powered mistake analysis with personalized drill exercises. Launching soon for premium members.
          </p>
        </div>

        {/* Preview content (blurred behind) */}
        <div className="p-5 select-none pointer-events-none">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={15} className="text-[#FFD23F]" />
            <span className="font-sans text-[16px] font-bold text-white">AI Mistake Analysis</span>
            <div className="flex gap-0.5 ml-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-[#FFD23F] fill-[#FFD23F]" />)}
            </div>
          </div>
          <div className="space-y-2">
            {[
              "You frequently miss punctuation keys — try daily comma and period drills.",
              "Your right pinky is weak — practice ; and ' key exercises.",
              "You slow down on long words — focus on rhythm, not speed.",
              "Suggested drill: type the alphabet 3× daily focusing on home row.",
            ].map((line, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[#FFD23F] text-[14px] mt-0.5">→</span>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40">{line}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onReset}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#FFD23F] hover:bg-[#FFD23F]/90 text-[#0A0A14] font-[family-name:var(--font-inter)] text-[14px] font-bold py-3.5 rounded-xl transition-all"
        >
          <RotateCcw size={14} /> Try Again
        </button>
        <button
          onClick={onReset}
          className="flex-1 py-3.5 rounded-xl border border-white/[0.08] font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/50 hover:text-white hover:border-white/20 transition-all"
        >
          New Passage
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function TypingPractice() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [passageIndex, setPassageIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mistakeMap, setMistakeMap] = useState<Record<string, number>>({});
  const [errorCount, setErrorCount] = useState(0);
  const [correctedCount, setCorrectedCount] = useState(0);
  const [finalWpm, setFinalWpm] = useState(0);
  const [finalAccuracy, setFinalAccuracy] = useState(0);
  const [finalElapsed, setFinalElapsed] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const typedRef = useRef("");
  const startTimeRef = useRef<number | null>(null);

  const passage = PASSAGES[difficulty][passageIndex];

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (startTime && !done) {
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 500);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTime, done]);

  useEffect(() => {
    if (startTime && typed.length > 0) {
      const minutes = (Date.now() - startTime) / 60000;
      const words = typed.trim().split(/\s+/).length;
      setWpm(Math.round(words / Math.max(minutes, 0.01)));
    }
  }, [typed, startTime]);

  const accuracy = typed.length === 0 ? 100 : Math.round(
    (typed.split("").filter((ch, i) => ch === passage[i]).length / typed.length) * 100
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (done) return;
    const display = eventKeyToDisplay(e.key);
    setActiveKey(display === "LShift" || display === "RShift" ? "LShift" : display);

    const currentTyped = typedRef.current;
    const next = passage[currentTyped.length];

    if (e.key === "Backspace" && currentTyped.length > 0) {
      // Check if the char being deleted was wrong
      const prevChar = passage[currentTyped.length - 1];
      if (currentTyped[currentTyped.length - 1] !== prevChar) {
        setCorrectedCount((c) => c + 1);
      }
      return;
    }

    if (e.key.length === 1 && next !== undefined && e.key !== next) {
      const k = e.key.toLowerCase();
      setMistakeMap((m) => ({ ...m, [k]: (m[k] ?? 0) + 1 }));
      setErrorCount((c) => c + 1);
      setErrorKey(display);
      setTimeout(() => setErrorKey(null), 300);
    }
  }, [done, passage]);

  const handleKeyUp = useCallback(() => { setActiveKey(null); }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (done || value.length > passage.length) return;
    if (!startTimeRef.current) {
      const now = Date.now();
      startTimeRef.current = now;
      setStartTime(now);
    }
    typedRef.current = value;
    setTyped(value);

    if (value === passage) {
      if (timerRef.current) clearInterval(timerRef.current);
      const finishTime = Date.now();
      const minutes = (finishTime - (startTimeRef.current ?? finishTime)) / 60000;
      const exactElapsed = Math.floor((finishTime - (startTimeRef.current ?? finishTime)) / 1000);
      const words = value.trim().split(/\s+/).length;
      const finalW = Math.round(words / Math.max(minutes, 0.01));
      const finalA = Math.round((value.split("").filter((c, i) => c === passage[i]).length / value.length) * 100);
      setElapsed(exactElapsed);
      setFinalElapsed(exactElapsed);
      setFinalWpm(finalW);
      setFinalAccuracy(finalA);
      savePersonalBest(finalW);
      saveDailySession(finalW, finalA);
      setDone(true);
    }
  }

  function reset(newDiff?: Difficulty) {
    if (timerRef.current) clearInterval(timerRef.current);
    const d = newDiff ?? difficulty;
    const idx = (passageIndex + 1) % PASSAGES[d].length;
    setTyped(""); typedRef.current = "";
    startTimeRef.current = null;
    setDone(false); setStartTime(null); setElapsed(0); setWpm(0);
    setActiveKey(null); setErrorKey(null); setMistakeMap({});
    setErrorCount(0); setCorrectedCount(0); setFinalWpm(0); setFinalAccuracy(0);
    setDifficulty(d); setPassageIndex(idx);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  function renderKey(key: string) {
    const isActive = activeKey === key || (key === "RShift" && activeKey === "LShift");
    const isError = errorKey === key;
    const label = KEY_LABELS[key] ?? key.toUpperCase();
    const widthClass = WIDE_KEYS[key] ?? "w-9";
    return (
      <div
        key={key}
        className={`${widthClass} h-10 rounded-lg flex items-center justify-center font-[family-name:var(--font-inter)] text-[11px] font-bold select-none border transition-all duration-75 shrink-0 ${
          isError ? "bg-red-500/30 border-red-400/60 text-red-300 scale-95"
          : isActive ? "bg-[#FFD23F]/25 border-[#FFD23F]/60 text-[#FFD23F] scale-95"
          : "bg-white/[0.04] border-white/[0.08] text-white/50"
        }`}
      >
        {label}
      </div>
    );
  }

  function renderPassage() {
    const cursorPos = typed.length;

    // Find current word boundaries
    let wordStart = cursorPos;
    while (wordStart > 0 && passage[wordStart - 1] !== " ") wordStart--;
    let wordEnd = wordStart;
    while (wordEnd < passage.length && passage[wordEnd] !== " ") wordEnd++;

    const charStyle = {
      fontFamily: "'Roboto Mono', monospace",
      fontSize: "25px",
      lineHeight: "1.8",
      letterSpacing: "0.02em",
      fontWeight: 500,
    };

    return passage.split("").map((char, i) => {
      const isTyped = i < cursorPos;
      const isCurrent = i === cursorPos;
      const inCurrentWord = i >= wordStart && i < wordEnd;

      let color: string;
      let bg: string | undefined;

      if (isTyped) {
        color = typed[i] === char ? "#16A34A" : "#DC2626";
      } else if (inCurrentWord) {
        color = "#111827";
        bg = "#FFE082";
      } else {
        color = "#9CA3AF";
      }

      return (
        <span
          key={i}
          className={isCurrent ? "typing-cursor" : undefined}
          style={{ ...charStyle, color, backgroundColor: bg }}
        >
          {char === " " ? " " : char}
        </span>
      );
    });
  }

  if (done) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4">
        <ResultsScreen
          wpm={finalWpm} accuracy={finalAccuracy} elapsed={finalElapsed}
          typed={typed} passage={passage}
          mistakeMap={mistakeMap} errorCount={errorCount} correctedCount={correctedCount}
          onReset={() => reset()}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4" onClick={() => inputRef.current?.focus()}>
      <input
        ref={inputRef} value={typed} onChange={handleInput}
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} tabIndex={-1}
      />

      {/* Live stats */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <Stat icon={Zap}    label="WPM"      value={wpm}             color="#FFD23F" />
        <Stat icon={Target} label="Accuracy"  value={`${accuracy}%`} color="#34D399" />
        <Stat icon={Clock}  label="Time"      value={formatTime(elapsed)} color="#60A5FA" />
        <Stat icon={Trophy} label="Chars"     value={typed.length}   color="#F472B6" />
      </div>

      {/* Difficulty selector */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setShowDropdown(!showDropdown); }}
            className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2 font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/60 hover:text-white transition-colors"
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            <ChevronDown size={13} />
          </button>
          {showDropdown && (
            <div className="absolute top-full mt-1 left-0 bg-[#18181F] border border-white/[0.1] rounded-xl overflow-hidden z-10 w-36">
              {(["easy","medium","hard"] as Difficulty[]).map((d) => (
                <button key={d} onClick={(e) => { e.stopPropagation(); reset(d); setShowDropdown(false); }}
                  className={`w-full text-left px-4 py-2.5 font-[family-name:var(--font-inter)] text-[13px] font-bold transition-colors ${difficulty === d ? "text-[#FFD23F] bg-[#FFD23F]/05" : "text-white/50 hover:text-white hover:bg-white/[0.04]"}`}>
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Text passage */}
      <div className="max-w-[820px] mx-auto w-full mb-8">
        <div className="bg-[#FAFAFA] border border-gray-200 rounded-2xl p-6 md:p-10 cursor-text">
          <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {renderPassage()}
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] text-gray-400">
              Click here and start typing
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[11px] text-gray-400">
              {typed.length}/{passage.length} · Finish to see Heatmap & Stats
            </p>
          </div>
        </div>
      </div>

      {/* Live keyboard */}
      <div className="bg-[#111118] border border-white/[0.06] rounded-2xl p-4 md:p-6 overflow-x-auto">
        <div className="flex flex-col gap-1.5 items-center min-w-[580px]">
          {ROWS.map((row, ri) => (
            <div key={ri} className="flex gap-1.5 justify-center w-full">
              {row.map((key) => renderKey(key))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <button onClick={() => reset()}
          className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[13px] text-white/30 hover:text-white transition-colors">
          <RotateCcw size={13} /> New passage
        </button>
      </div>
    </div>
  );
}
