"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { RotateCcw, Trophy, Zap, Target, Clock, ChevronDown } from "lucide-react";

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
  Backspace: "w-16",
  Tab:       "w-12",
  Caps:      "w-14",
  Enter:     "w-16",
  LShift:    "w-20",
  RShift:    "w-20",
  Space:     "w-64 md:w-80",
};

const KEY_LABELS: Record<string, string> = {
  Backspace: "⌫",
  Tab:       "⇥",
  Caps:      "⇪",
  Enter:     "↵",
  LShift:    "⇧",
  RShift:    "⇧",
  Space:     "",
};

// Map DOM event.key values → our keyboard key strings
function eventKeyToDisplay(key: string): string {
  const map: Record<string, string> = {
    " ": "Space",
    "Backspace": "Backspace",
    "Tab": "Tab",
    "CapsLock": "Caps",
    "Enter": "Enter",
    "Shift": "LShift", // simplified — both shifts light up together
  };
  return map[key] ?? key.toLowerCase();
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────

function Stat({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string | number; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-5 py-3 min-w-[80px]">
      <Icon size={15} style={{ color }} strokeWidth={1.8} />
      <span className="font-sans text-[22px] font-bold text-white leading-none">{value}</span>
      <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/30 uppercase tracking-[1.5px]">{label}</span>
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
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const passage = PASSAGES[difficulty][passageIndex];

  // Focus hidden input on mount
  useEffect(() => { inputRef.current?.focus(); }, []);

  // Timer
  useEffect(() => {
    if (startTime && !done) {
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 500);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTime, done]);

  // WPM calculation
  useEffect(() => {
    if (startTime && typed.length > 0) {
      const minutes = (Date.now() - startTime) / 60000;
      const words = typed.trim().split(/\s+/).length;
      setWpm(Math.round(words / minutes));
    }
  }, [typed, startTime]);

  const accuracy = typed.length === 0 ? 100 : Math.round(
    (typed.split("").filter((ch, i) => ch === passage[i]).length / typed.length) * 100
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (done) return;

    const display = eventKeyToDisplay(e.key);
    setActiveKey(display);
    if (display === "LShift" || e.key === "Shift") setActiveKey("RShift"); // light both

    // Flash error on wrong char
    const next = passage[typed.length];
    if (e.key.length === 1 && e.key !== next) {
      setErrorKey(display);
      setTimeout(() => setErrorKey(null), 300);
    }
  }, [done, typed, passage]);

  const handleKeyUp = useCallback(() => {
    setActiveKey(null);
  }, []);

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
    if (done) return;
    if (!startTime) setStartTime(Date.now());

    // Only allow typing up to passage length
    if (value.length > passage.length) return;

    setTyped(value);

    if (value === passage) {
      setDone(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }

  function reset(newDiff?: Difficulty, newIdx?: number) {
    setTyped("");
    setDone(false);
    setStartTime(null);
    setElapsed(0);
    setWpm(0);
    setActiveKey(null);
    const d = newDiff ?? difficulty;
    const idx = newIdx ?? (passageIndex + 1) % PASSAGES[d].length;
    setDifficulty(d);
    setPassageIndex(idx);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  // ── Keyboard key renderer ────────────────────────────────────────────────────
  function renderKey(key: string) {
    const isActive = activeKey === key || (key === "LShift" && activeKey === "RShift") || (key === "RShift" && activeKey === "LShift");
    const isError = errorKey === key;
    const label = KEY_LABELS[key] ?? key.toUpperCase();
    const widthClass = WIDE_KEYS[key] ?? "w-9";

    return (
      <div
        key={key}
        className={`
          ${widthClass} h-10 rounded-lg flex items-center justify-center
          font-[family-name:var(--font-inter)] text-[11px] font-bold select-none
          border transition-all duration-75 shrink-0
          ${isError
            ? "bg-red-500/30 border-red-400/60 text-red-300 scale-95"
            : isActive
            ? "bg-[#FFD23F]/25 border-[#FFD23F]/60 text-[#FFD23F] scale-95"
            : "bg-white/[0.04] border-white/[0.08] text-white/50"
          }
        `}
      >
        {label}
      </div>
    );
  }

  // ── Character renderer ───────────────────────────────────────────────────────
  function renderPassage() {
    return passage.split("").map((char, i) => {
      let cls = "text-white/30"; // upcoming
      if (i < typed.length) {
        cls = typed[i] === char ? "text-[#34D399]" : "text-red-400 bg-red-500/20 rounded";
      } else if (i === typed.length) {
        cls = "text-white border-b-2 border-[#FFD23F]";
      }
      // Render space as a non-breaking space so it doesn't collapse
      const display = char === " " ? " " : char;
      return (
        <span key={i} className={cls} style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: "22px", lineHeight: "2.2" }}>
          {display}
        </span>
      );
    });
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4" onClick={() => inputRef.current?.focus()}>

      {/* Hidden input that captures all keystrokes */}
      <input
        ref={inputRef}
        value={typed}
        onChange={handleInput}
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        tabIndex={-1}
      />

      {/* ── Stats ── */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <Stat icon={Zap} label="WPM" value={wpm} color="#FFD23F" />
        <Stat icon={Target} label="Accuracy" value={`${accuracy}%`} color="#34D399" />
        <Stat icon={Clock} label="Time" value={formatTime(elapsed)} color="#60A5FA" />
        <Stat icon={Trophy} label="Chars" value={typed.length} color="#F472B6" />
      </div>

      {/* ── Difficulty selector ── */}
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
                <button
                  key={d}
                  onClick={(e) => { e.stopPropagation(); reset(d, 0); setShowDropdown(false); }}
                  className={`w-full text-left px-4 py-2.5 font-[family-name:var(--font-inter)] text-[13px] font-bold transition-colors ${difficulty === d ? "text-[#FFD23F] bg-[#FFD23F]/05" : "text-white/50 hover:text-white hover:bg-white/[0.04]"}`}
                >
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Text passage ── */}
      {!done ? (
        <div className="bg-[#111118] border border-white/[0.07] rounded-2xl p-6 md:p-8 mb-8 cursor-text relative">
          <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {renderPassage()}
          </div>
          <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/20 mt-4 text-center">
            Click here and start typing
          </p>
        </div>
      ) : (
        <div className="bg-[#111118] border border-[#34D399]/30 rounded-2xl p-8 mb-8 text-center">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="font-sans text-[24px] font-bold text-white mb-1">
            {wpm >= 60 ? "Excellent!" : wpm >= 40 ? "Great job!" : "Well done!"}
          </h3>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 mb-5">
            {wpm} WPM · {accuracy}% accuracy · {formatTime(elapsed)}
          </p>
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 bg-[#FFD23F] hover:bg-[#FFD23F]/90 text-[#0A0A14] font-[family-name:var(--font-inter)] text-[14px] font-bold px-6 py-3 rounded-xl transition-all"
          >
            <RotateCcw size={14} /> Try Again
          </button>
        </div>
      )}

      {/* ── Keyboard ── */}
      <div className="bg-[#111118] border border-white/[0.06] rounded-2xl p-4 md:p-6 overflow-x-auto">
        <div className="flex flex-col gap-1.5 items-center min-w-[580px]">
          {ROWS.map((row, ri) => (
            <div key={ri} className="flex gap-1.5 justify-center w-full">
              {row.map((key) => renderKey(key))}
            </div>
          ))}
        </div>
      </div>

      {/* Reset */}
      <div className="flex justify-center mt-5">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[13px] text-white/30 hover:text-white transition-colors"
        >
          <RotateCcw size={13} /> New passage
        </button>
      </div>

    </div>
  );
}
