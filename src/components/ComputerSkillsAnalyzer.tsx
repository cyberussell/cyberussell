"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FileText, Image as ImageIcon, FileSpreadsheet, Folder, Bold as BoldIcon } from "lucide-react";
import { csTasks, csCategories, type CSCategory } from "@/lib/computerSkillsTasks";

type Stage = "intro" | "quiz" | "loading" | "results" | "error";
type OS = "windows" | "mac";

type TaskResult = { taskId: string; category: CSCategory; score: number; timeMs: number };

type CareerMatch = {
  slug: string;
  title: string;
  description: string;
  matchPercent: number;
  skillsDemonstrated: CSCategory[];
  skillsToImprove: string[];
  estimatedPrep: string;
  learnMoreHref: string;
};

type Report = {
  overallScore: number;
  skillLevel: string;
  categoryScores: Record<string, number>;
  narrative: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  careerMatches: CareerMatch[];
};

const DAILY_KEY = "csa_daily";
const SESSION_KEY = "csa_session_id";

function getDailyCount(): number {
  try {
    const raw = localStorage.getItem(DAILY_KEY);
    if (!raw) return 0;
    const { count, date } = JSON.parse(raw);
    if (date !== new Date().toISOString().slice(0, 10)) return 0;
    return count;
  } catch {
    return 0;
  }
}

function incrementDailyCount() {
  const today = new Date().toISOString().slice(0, 10);
  const current = getDailyCount();
  localStorage.setItem(DAILY_KEY, JSON.stringify({ count: current + 1, date: today }));
}

function getSessionId(): string {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

function similarityScore(target: string, typed: string): number {
  const t = target.toLowerCase().trim().split(/\s+/);
  const u = typed.toLowerCase().trim().split(/\s+/);
  if (u.length === 0 || typed.trim().length === 0) return 0;
  let matches = 0;
  const len = Math.max(t.length, u.length) || 1;
  for (let i = 0; i < Math.min(t.length, u.length); i++) {
    if (t[i] === u[i]) matches++;
  }
  return Math.round((matches / len) * 100);
}

const levelColors: Record<string, { color: string; bg: string; border: string }> = {
  Beginner: { color: "#E8373A", bg: "rgba(232,55,58,0.08)", border: "rgba(232,55,58,0.25)" },
  Developing: { color: "#FF6B35", bg: "rgba(255,107,53,0.08)", border: "rgba(255,107,53,0.25)" },
  Competent: { color: "#FFD23F", bg: "rgba(255,210,63,0.08)", border: "rgba(255,210,63,0.25)" },
  "Job Ready": { color: "#4F8EF7", bg: "rgba(79,142,247,0.08)", border: "rgba(79,142,247,0.25)" },
  Advanced: { color: "#00C97A", bg: "rgba(0,201,122,0.08)", border: "rgba(0,201,122,0.25)" },
  Expert: { color: "#00C97A", bg: "rgba(0,201,122,0.08)", border: "rgba(0,201,122,0.25)" },
};

type OnComplete = (score: number, timeMs: number) => void;

// ---------- Task components ----------

function TypingTask({ onComplete }: { onComplete: OnComplete }) {
  const target = "Please send the signed contract to the client before end of day.";
  const [typed, setTyped] = useState("");
  const startRef = useRef<number | null>(null);

  const submit = () => {
    const timeMs = startRef.current ? Date.now() - startRef.current : 0;
    const accuracy = similarityScore(target, typed);
    const speedBonus = timeMs === 0 ? 40 : timeMs < 20000 ? 100 : timeMs < 45000 ? 70 : timeMs < 90000 ? 40 : 15;
    const score = Math.round(accuracy * 0.7 + speedBonus * 0.3);
    onComplete(Math.max(0, Math.min(100, score)), timeMs);
  };

  return (
    <div>
      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 mb-4">
        Type the sentence below exactly as shown. Speed and accuracy both count.
      </p>
      <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mb-4">
        <p className="font-sans text-[16px] text-white font-medium">{target}</p>
      </div>
      <textarea
        value={typed}
        onChange={(e) => {
          if (startRef.current === null) startRef.current = Date.now();
          setTyped(e.target.value);
        }}
        placeholder="Start typing here..."
        className="w-full min-h-[90px] resize-none bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] text-white font-[family-name:var(--font-inter)] text-[15px] p-4 placeholder:text-white/20 focus:outline-none focus:border-[#4F8EF7]/40 transition-colors"
      />
      <button
        onClick={submit}
        disabled={!typed.trim()}
        className="w-full mt-4 bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[15px] font-bold py-4 rounded-[10px] hover:bg-[#FFD23F]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Check Typing
      </button>
    </div>
  );
}

function CopyPasteTask({ onComplete }: { onComplete: OnComplete }) {
  const reference = "Invoice #4521 — Due June 30";
  const [pasted, setPasted] = useState("");
  const startRef = useRef<number | null>(null);

  const submit = () => {
    const timeMs = startRef.current ? Date.now() - startRef.current : 0;
    const exact = pasted.trim() === reference.trim();
    const score = exact ? 100 : similarityScore(reference, pasted);
    onComplete(score, timeMs);
  };

  return (
    <div>
      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 mb-4">
        Select and copy the reference text below, then paste it exactly into the box.
      </p>
      <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mb-4 select-all">
        <p className="font-sans text-[16px] text-white font-medium">{reference}</p>
      </div>
      <input
        type="text"
        value={pasted}
        onChange={(e) => {
          if (startRef.current === null) startRef.current = Date.now();
          setPasted(e.target.value);
        }}
        placeholder="Paste it here..."
        className="w-full bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] text-white font-[family-name:var(--font-inter)] text-[15px] p-4 placeholder:text-white/20 focus:outline-none focus:border-[#4F8EF7]/40 transition-colors"
      />
      <button
        onClick={submit}
        disabled={!pasted.trim()}
        className="w-full mt-4 bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[15px] font-bold py-4 rounded-[10px] hover:bg-[#FFD23F]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Check Paste
      </button>
    </div>
  );
}

function RenameFileTask({ onComplete }: { onComplete: OnComplete }) {
  const target = "Client_Proposal_Final.docx";
  const [name, setName] = useState("Untitled Document.docx");
  const startRef = useRef<number>(Date.now());

  const submit = () => {
    const timeMs = Date.now() - startRef.current;
    const norm = (s: string) => s.trim().toLowerCase();
    const exact = norm(name) === norm(target);
    const partial = !exact && norm(name).includes("client") && norm(name).includes("proposal");
    onComplete(exact ? 100 : partial ? 50 : 0, timeMs);
  };

  return (
    <div>
      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 mb-4">
        Rename this file to <span className="text-white font-semibold">{target}</span>
      </p>
      <div className="flex items-center gap-3 bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mb-4">
        <FileText size={22} className="text-[#4F8EF7] shrink-0" />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 bg-transparent text-white font-[family-name:var(--font-inter)] text-[15px] focus:outline-none border-b border-transparent focus:border-[#4F8EF7]/40"
        />
      </div>
      <button
        onClick={submit}
        className="w-full bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[15px] font-bold py-4 rounded-[10px] hover:bg-[#FFD23F]/90 transition-colors"
      >
        Rename &amp; Continue
      </button>
    </div>
  );
}

const ORGANIZE_FILES = [
  { id: "invoice", name: "invoice.pdf", icon: FileText, folder: "Documents" },
  { id: "photo", name: "team-photo.jpg", icon: ImageIcon, folder: "Images" },
  { id: "budget", name: "budget.xlsx", icon: FileSpreadsheet, folder: "Spreadsheets" },
  { id: "notes", name: "notes.txt", icon: FileText, folder: "Documents" },
  { id: "logo", name: "logo.png", icon: ImageIcon, folder: "Images" },
] as const;
const ORGANIZE_FOLDERS = ["Documents", "Images", "Spreadsheets"] as const;

function OrganizeFilesTask({ onComplete }: { onComplete: OnComplete }) {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const startRef = useRef<number>(Date.now());

  const allPlaced = Object.keys(placements).length === ORGANIZE_FILES.length;

  const placeFile = (folder: string) => {
    if (!selectedFile) return;
    setPlacements((p) => ({ ...p, [selectedFile]: folder }));
    setSelectedFile(null);
  };

  const submit = () => {
    const timeMs = Date.now() - startRef.current;
    const correct = ORGANIZE_FILES.filter((f) => placements[f.id] === f.folder).length;
    onComplete(Math.round((correct / ORGANIZE_FILES.length) * 100), timeMs);
  };

  return (
    <div>
      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 mb-4">
        Tap a file, then tap the folder it belongs in. Place all 5 files.
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {ORGANIZE_FILES.map((f) => {
          const Icon = f.icon;
          const placedIn = placements[f.id];
          return (
            <button
              key={f.id}
              onClick={() => !placedIn && setSelectedFile(f.id)}
              disabled={!!placedIn}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-[8px] border text-left transition-all ${
                placedIn
                  ? "border-[#00C97A]/30 bg-[#00C97A]/[0.06] opacity-60"
                  : selectedFile === f.id
                  ? "border-[#4F8EF7]/60 bg-[#4F8EF7]/[0.08]"
                  : "border-white/[0.08] hover:border-white/[0.16]"
              }`}
            >
              <Icon size={16} className="text-white/50 shrink-0" />
              <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/80">{f.name}</span>
              {placedIn && <span className="font-[family-name:var(--font-inter)] text-[11px] text-[#00C97A]">→ {placedIn}</span>}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {ORGANIZE_FOLDERS.map((folder) => (
          <button
            key={folder}
            onClick={() => placeFile(folder)}
            disabled={!selectedFile}
            className="flex flex-col items-center gap-1.5 p-4 rounded-[10px] border border-white/[0.08] hover:border-[#4F8EF7]/40 hover:bg-[#4F8EF7]/[0.05] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Folder size={22} className="text-[#FFD23F]" />
            <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/70">{folder}</span>
          </button>
        ))}
      </div>
      <button
        onClick={submit}
        disabled={!allPlaced}
        className="w-full bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[15px] font-bold py-4 rounded-[10px] hover:bg-[#FFD23F]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}

function ScenarioTask({
  question,
  options,
  correctIndex,
  onComplete,
}: {
  question: string;
  options: string[];
  correctIndex: number;
  onComplete: OnComplete;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const startRef = useRef<number>(Date.now());

  const submit = () => {
    if (selected === null) return;
    const timeMs = Date.now() - startRef.current;
    onComplete(selected === correctIndex ? 100 : 0, timeMs);
  };

  return (
    <div>
      <p className="font-sans text-[16px] font-semibold text-white mb-5 leading-relaxed">{question}</p>
      <div className="space-y-2.5 mb-6">
        {options.map((opt, oi) => {
          const isSelected = selected === oi;
          return (
            <button
              key={oi}
              onClick={() => setSelected(oi)}
              className={`w-full flex items-center gap-3 p-4 rounded-[10px] border text-left transition-all ${
                isSelected
                  ? "border-[#4F8EF7]/60 bg-[#4F8EF7]/[0.08]"
                  : "border-white/[0.08] hover:border-white/[0.16] hover:bg-white/[0.02]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected ? "border-[#4F8EF7] bg-[#4F8EF7]" : "border-white/20"
                }`}
              >
                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/80">{opt}</span>
            </button>
          );
        })}
      </div>
      <button
        onClick={submit}
        disabled={selected === null}
        className="w-full bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[15px] font-bold py-4 rounded-[10px] hover:bg-[#FFD23F]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}

function SpotDownloadTask({ onComplete }: { onComplete: OnComplete }) {
  const [picked, setPicked] = useState<string | null>(null);
  const startRef = useRef<number>(Date.now());

  const choose = (id: string) => setPicked(id);
  const submit = () => {
    if (!picked) return;
    const timeMs = Date.now() - startRef.current;
    onComplete(picked === "real" ? 100 : 0, timeMs);
  };

  return (
    <div>
      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 mb-4">
        Your client emailed you a contract. Which button actually downloads their attachment?
      </p>
      <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mb-4 space-y-3">
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40">Subject: Signed Contract Attached</p>
        <button
          onClick={() => choose("decoy1")}
          className={`w-full text-left px-4 py-3 rounded-[8px] font-bold text-[13px] transition-all ${
            picked === "decoy1" ? "ring-2 ring-[#4F8EF7]" : ""
          } bg-gradient-to-r from-orange-500 to-red-500 text-white`}
        >
          ⬇️ DOWNLOAD NOW — Claim Your Free Reward!
        </button>
        <button
          onClick={() => choose("real")}
          className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-[8px] border transition-all ${
            picked === "real" ? "border-[#4F8EF7]/60 bg-[#4F8EF7]/[0.08]" : "border-white/[0.08] hover:border-white/[0.16]"
          }`}
        >
          <FileText size={18} className="text-[#4F8EF7]" />
          <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/80">Contract_Signed.pdf (245 KB) — Download</span>
        </button>
        <button
          onClick={() => choose("decoy2")}
          className={`w-full text-left px-4 py-3 rounded-[8px] font-bold text-[13px] transition-all border-2 border-dashed border-yellow-500 ${
            picked === "decoy2" ? "ring-2 ring-[#4F8EF7]" : ""
          } bg-yellow-500/10 text-yellow-300`}
        >
          Download Manager Required — Click to Install
        </button>
      </div>
      <button
        onClick={submit}
        disabled={!picked}
        className="w-full bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[15px] font-bold py-4 rounded-[10px] hover:bg-[#FFD23F]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}

const UPLOAD_CHOICES = [
  { id: "resume", name: "Resume_2026.pdf", icon: FileText },
  { id: "grocery", name: "Grocery_List.txt", icon: FileText },
  { id: "photo", name: "Vacation_Photo.jpg", icon: ImageIcon },
  { id: "notes", name: "Old_Meeting_Notes.docx", icon: FileText },
] as const;

function UploadFileTask({ onComplete }: { onComplete: OnComplete }) {
  const [picked, setPicked] = useState<string | null>(null);
  const startRef = useRef<number>(Date.now());

  const submit = () => {
    if (!picked) return;
    const timeMs = Date.now() - startRef.current;
    onComplete(picked === "resume" ? 100 : 0, timeMs);
  };

  return (
    <div>
      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 mb-4">
        A client asked you to upload your resume. Choose the correct file.
      </p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {UPLOAD_CHOICES.map((f) => {
          const Icon = f.icon;
          const isSelected = picked === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setPicked(f.id)}
              className={`flex items-center gap-2 p-3 rounded-[8px] border text-left transition-all ${
                isSelected ? "border-[#4F8EF7]/60 bg-[#4F8EF7]/[0.08]" : "border-white/[0.08] hover:border-white/[0.16]"
              }`}
            >
              <Icon size={16} className="text-white/50 shrink-0" />
              <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/80">{f.name}</span>
            </button>
          );
        })}
      </div>
      <button
        onClick={submit}
        disabled={!picked}
        className="w-full bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[15px] font-bold py-4 rounded-[10px] hover:bg-[#FFD23F]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Upload Selected File
      </button>
    </div>
  );
}

function BoldTextTask({ onComplete }: { onComplete: OnComplete }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<number>(Date.now());
  const [checked, setChecked] = useState(false);

  const submit = () => {
    const timeMs = Date.now() - startRef.current;
    const html = editorRef.current?.innerHTML.toLowerCase() || "";
    const isBold = html.includes("<b>") || html.includes("<strong>") || html.includes("font-weight");
    setChecked(true);
    onComplete(isBold ? 100 : 0, timeMs);
  };

  return (
    <div>
      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 mb-4">
        Select the word <span className="text-white font-semibold">URGENT</span> below and make it bold — use the Bold
        button or Ctrl/Cmd+B.
      </p>
      <div className="flex gap-2 mb-2">
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => document.execCommand("bold")}
          className="w-9 h-9 flex items-center justify-center rounded-[6px] bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
          aria-label="Bold"
        >
          <BoldIcon size={15} />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mb-4 text-white font-[family-name:var(--font-inter)] text-[15px] leading-[1.7] focus:outline-none focus:border-[#4F8EF7]/40 min-h-[70px]"
      >
        Please review this contract. This section is URGENT and needs your signature today.
      </div>
      {checked && (
        <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 mb-3">
          Recorded. Click Continue below when you&apos;re ready — or check again if you want to retry.
        </p>
      )}
      <button
        onClick={submit}
        className="w-full bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[15px] font-bold py-4 rounded-[10px] hover:bg-[#FFD23F]/90 transition-colors"
      >
        Check Formatting
      </button>
    </div>
  );
}

const SORT_DATA = [
  { name: "Ana", sales: 4200 },
  { name: "Ben", sales: 1800 },
  { name: "Carla", sales: 6100 },
  { name: "Dado", sales: 3300 },
  { name: "Elena", sales: 2500 },
];

function SortTableTask({ onComplete }: { onComplete: OnComplete }) {
  const [rows, setRows] = useState(SORT_DATA);
  const startRef = useRef<number>(Date.now());

  const sortBySales = () => setRows((r) => [...r].sort((a, b) => b.sales - a.sales));
  const sortByName = () => setRows((r) => [...r].sort((a, b) => a.name.localeCompare(b.name)));

  const submit = () => {
    const timeMs = Date.now() - startRef.current;
    const correctOrder = [...SORT_DATA].sort((a, b) => b.sales - a.sales).map((r) => r.name);
    const currentOrder = rows.map((r) => r.name);
    const matches = correctOrder.every((name, i) => name === currentOrder[i]);
    onComplete(matches ? 100 : 0, timeMs);
  };

  return (
    <div>
      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 mb-4">
        Sort this table by Sales, highest to lowest. Click a column header to sort by it.
      </p>
      <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] overflow-hidden mb-4">
        <div className="grid grid-cols-2">
          <button
            onClick={sortByName}
            className="text-left px-4 py-2.5 font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/50 uppercase tracking-[0.05em] border-b border-white/[0.08] hover:bg-white/[0.03]"
          >
            Name
          </button>
          <button
            onClick={sortBySales}
            className="text-left px-4 py-2.5 font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/50 uppercase tracking-[0.05em] border-b border-white/[0.08] hover:bg-white/[0.03]"
          >
            Sales
          </button>
        </div>
        {rows.map((r) => (
          <div key={r.name} className="grid grid-cols-2 border-b border-white/[0.04] last:border-0">
            <span className="px-4 py-2.5 font-[family-name:var(--font-inter)] text-[13px] text-white/70">{r.name}</span>
            <span className="px-4 py-2.5 font-[family-name:var(--font-inter)] text-[13px] text-white/70">
              ₱{r.sales.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      <button
        onClick={submit}
        className="w-full bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[15px] font-bold py-4 rounded-[10px] hover:bg-[#FFD23F]/90 transition-colors"
      >
        Check Sort
      </button>
    </div>
  );
}

function DataEntryTask({ onComplete }: { onComplete: OnComplete }) {
  const record = { name: "Maria Santos", email: "maria.santos@example.com", phone: "0917-123-4567" };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const startRef = useRef<number | null>(null);

  const track = () => {
    if (startRef.current === null) startRef.current = Date.now();
  };

  const submit = () => {
    const timeMs = startRef.current ? Date.now() - startRef.current : 0;
    let correct = 0;
    if (name.trim().toLowerCase() === record.name.toLowerCase()) correct++;
    if (email.trim().toLowerCase() === record.email.toLowerCase()) correct++;
    if (phone.replace(/\D/g, "") === record.phone.replace(/\D/g, "")) correct++;
    onComplete(Math.round((correct / 3) * 100), timeMs);
  };

  return (
    <div>
      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 mb-4">
        Enter this contact record into the fields below, exactly as shown.
      </p>
      <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mb-4 space-y-1">
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white"><span className="text-white/40">Name:</span> {record.name}</p>
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white"><span className="text-white/40">Email:</span> {record.email}</p>
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white"><span className="text-white/40">Phone:</span> {record.phone}</p>
      </div>
      <div className="space-y-2.5 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => { track(); setName(e.target.value); }}
          placeholder="Name"
          className="w-full bg-[#0F0F1A] border border-white/[0.08] rounded-[8px] text-white font-[family-name:var(--font-inter)] text-[14px] p-3 placeholder:text-white/20 focus:outline-none focus:border-[#4F8EF7]/40"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => { track(); setEmail(e.target.value); }}
          placeholder="Email"
          className="w-full bg-[#0F0F1A] border border-white/[0.08] rounded-[8px] text-white font-[family-name:var(--font-inter)] text-[14px] p-3 placeholder:text-white/20 focus:outline-none focus:border-[#4F8EF7]/40"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => { track(); setPhone(e.target.value); }}
          placeholder="Phone"
          className="w-full bg-[#0F0F1A] border border-white/[0.08] rounded-[8px] text-white font-[family-name:var(--font-inter)] text-[14px] p-3 placeholder:text-white/20 focus:outline-none focus:border-[#4F8EF7]/40"
        />
      </div>
      <button
        onClick={submit}
        disabled={!name.trim() && !email.trim() && !phone.trim()}
        className="w-full bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[15px] font-bold py-4 rounded-[10px] hover:bg-[#FFD23F]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Submit Entry
      </button>
    </div>
  );
}

// ---------- Main component ----------

export default function ComputerSkillsAnalyzer() {
  const [stage, setStage] = useState<Stage>("intro");
  const [os, setOs] = useState<OS>("windows");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [taskIndex, setTaskIndex] = useState(0);
  const [results, setResults] = useState<TaskResult[]>([]);
  const [error, setError] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [remaining, setRemaining] = useState(10);

  useEffect(() => {
    setRemaining(10 - getDailyCount());
  }, []);

  const currentTask = stage === "quiz" ? csTasks[taskIndex] : null;
  const totalTasks = csTasks.length;

  const startQuiz = useCallback(() => {
    if (remaining <= 0) {
      setError("Daily limit reached. Come back tomorrow for 10 more free checks.");
      return;
    }
    setTaskIndex(0);
    setResults([]);
    setError("");
    setStage("quiz");
  }, [remaining]);

  const submitReport = useCallback(
    async (finalResults: TaskResult[]) => {
      setStage("loading");
      try {
        const res = await fetch("/api/computer-skills-analyzer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: getSessionId(),
            name: name.trim() || undefined,
            email: email.trim() || undefined,
            results: finalResults,
          }),
        });

        if (res.status === 429) {
          setError("Daily limit reached. Come back tomorrow for 10 more free checks.");
          setStage("intro");
          return;
        }
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data.error || "Something went wrong. Please try again.");
          setStage("error");
          return;
        }

        const data: Report = await res.json();
        setReport(data);
        incrementDailyCount();
        setRemaining((r) => r - 1);
        setStage("results");
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "tool_used", {
            event_category: "tools",
            event_label: "computer-skills-analyzer",
            value: 1,
          });
        }
      } catch {
        setError("Network error. Please check your connection and try again.");
        setStage("error");
      }
    },
    [name, email]
  );

  const handleTaskComplete = useCallback(
    (score: number, timeMs: number) => {
      if (!currentTask) return;
      const newResults = [...results, { taskId: currentTask.id, category: currentTask.category, score, timeMs }];
      setResults(newResults);
      if (taskIndex >= totalTasks - 1) {
        submitReport(newResults);
      } else {
        setTaskIndex((i) => i + 1);
      }
    },
    [currentTask, results, taskIndex, totalTasks, submitReport]
  );

  const restart = () => {
    setStage("intro");
    setReport(null);
    setResults([]);
    setTaskIndex(0);
    setError("");
  };

  // ---------- Intro ----------
  if (stage === "intro") {
    return (
      <div className="max-w-[640px] mx-auto">
        <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 md:p-8">
          <h3 className="font-sans text-[20px] font-bold text-white mb-2">Test your practical computer skills</h3>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7] mb-5">
            13 hands-on activities across 6 skill areas — rename files, organize folders, sort a spreadsheet, format
            text, enter data, and more. Not a quiz — real simulations. Takes 8–12 minutes.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {csCategories.map((c) => (
              <span
                key={c}
                className="font-[family-name:var(--font-inter)] text-[12px] text-white/55 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mb-5">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 mb-2">Which do you use most?</p>
            <div className="grid grid-cols-2 gap-2">
              {(["windows", "mac"] as OS[]).map((o) => (
                <button
                  key={o}
                  onClick={() => setOs(o)}
                  className={`py-3 rounded-[8px] border font-[family-name:var(--font-inter)] text-[13px] font-bold capitalize transition-all ${
                    os === o
                      ? "border-[#4F8EF7]/60 bg-[#4F8EF7]/[0.08] text-[#4F8EF7]"
                      : "border-white/[0.08] text-white/50 hover:border-white/[0.16]"
                  }`}
                >
                  {o === "windows" ? "Windows" : "Mac"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 mb-5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] text-white font-[family-name:var(--font-inter)] text-[14px] p-3.5 placeholder:text-white/20 focus:outline-none focus:border-[#4F8EF7]/40 transition-colors"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional — to save your results)"
              className="w-full bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] text-white font-[family-name:var(--font-inter)] text-[14px] p-3.5 placeholder:text-white/20 focus:outline-none focus:border-[#4F8EF7]/40 transition-colors"
            />
          </div>

          {error && (
            <div className="mb-4 bg-[#E8373A]/8 border border-[#E8373A]/20 rounded-[8px] px-4 py-3">
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#ff9b9b]">{error}</p>
            </div>
          )}

          <button
            onClick={startQuiz}
            className="w-full bg-[#4F8EF7] hover:bg-[#4F8EF7]/90 text-white font-sans text-[15px] font-bold py-4 rounded-[10px] transition-all"
          >
            Start Assessment
          </button>
          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/25 text-center mt-3">
            {remaining} free checks left today · No account required
          </p>
        </div>
      </div>
    );
  }

  // ---------- Quiz ----------
  if (stage === "quiz" && currentTask) {
    const progressPct = Math.round((taskIndex / totalTasks) * 100);
    return (
      <div className="max-w-[640px] mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/40">
              {currentTask.category} · Task {taskIndex + 1} of {totalTasks}
            </span>
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1px] text-white/30">
              {currentTask.title}
            </span>
          </div>
          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4F8EF7] rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 md:p-7">
          {currentTask.id === "type-speed" && <TypingTask key={currentTask.id} onComplete={handleTaskComplete} />}
          {currentTask.id === "copy-paste" && <CopyPasteTask key={currentTask.id} onComplete={handleTaskComplete} />}
          {currentTask.id === "rename-file" && <RenameFileTask key={currentTask.id} onComplete={handleTaskComplete} />}
          {currentTask.id === "organize-files" && <OrganizeFilesTask key={currentTask.id} onComplete={handleTaskComplete} />}
          {currentTask.id === "zip-scenario" && (
            <ScenarioTask
              key={currentTask.id}
              question="You need to email 8 files to a client, but their inbox keeps rejecting messages with multiple attachments. What's the best solution?"
              options={[
                "Send 8 separate emails, one file each",
                "Compress all 8 files into a single ZIP file and attach that",
                "Print the files and mail them physically",
                "Ask the client to lower their email security settings",
              ]}
              correctIndex={1}
              onComplete={handleTaskComplete}
            />
          )}
          {currentTask.id === "spot-download" && <SpotDownloadTask key={currentTask.id} onComplete={handleTaskComplete} />}
          {currentTask.id === "upload-file" && <UploadFileTask key={currentTask.id} onComplete={handleTaskComplete} />}
          {currentTask.id === "window-switch" && (
            <ScenarioTask
              key={currentTask.id}
              question="You're working in 6 different windows and need to quickly jump back to your email. What's the fastest way?"
              options={
                os === "windows"
                  ? [
                      "Click each window one by one until you find it",
                      "Press Alt+Tab to cycle through open windows",
                      "Restart your computer",
                      "Right-click the desktop and choose 'Find Window'",
                    ]
                  : [
                      "Click each window one by one until you find it",
                      "Press Cmd+Tab to cycle through open apps",
                      "Restart your computer",
                      "Right-click the desktop and choose 'Find Window'",
                    ]
              }
              correctIndex={1}
              onComplete={handleTaskComplete}
            />
          )}
          {currentTask.id === "screenshot-shortcut" && (
            <ScenarioTask
              key={currentTask.id}
              question="You need to grab a screenshot of just one error message, not your whole screen. What's the best method?"
              options={
                os === "windows"
                  ? [
                      "Press Print Screen and paste the whole screen",
                      "Press Windows+Shift+S to snip just that area",
                      "Take a photo of your screen with your phone",
                      "Retype the error message manually",
                    ]
                  : [
                      "Press Cmd+Shift+3 to capture the whole screen",
                      "Press Cmd+Shift+4 to select and capture just that area",
                      "Take a photo of your screen with your phone",
                      "Retype the error message manually",
                    ]
              }
              correctIndex={1}
              onComplete={handleTaskComplete}
            />
          )}
          {currentTask.id === "bold-text" && <BoldTextTask key={currentTask.id} onComplete={handleTaskComplete} />}
          {currentTask.id === "docs-feature" && (
            <ScenarioTask
              key={currentTask.id}
              question="You're co-writing a document with a client in Google Docs and want to propose edits without directly changing their original text — like Word's 'Track Changes'. What should you use?"
              options={["Comments only", "Suggesting mode", "Delete and retype the section", "Send a separate email with your changes"]}
              correctIndex={1}
              onComplete={handleTaskComplete}
            />
          )}
          {currentTask.id === "sort-table" && <SortTableTask key={currentTask.id} onComplete={handleTaskComplete} />}
          {currentTask.id === "data-entry" && <DataEntryTask key={currentTask.id} onComplete={handleTaskComplete} />}
        </div>

        <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/20 text-center mt-4">
          {results.length} of {totalTasks} tasks completed
        </p>
      </div>
    );
  }

  // ---------- Loading ----------
  if (stage === "loading") {
    return (
      <div className="max-w-[640px] mx-auto flex flex-col items-center justify-center py-20">
        <span className="w-8 h-8 rounded-full border-2 border-white/15 border-t-[#4F8EF7] animate-spin mb-4" />
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50">
          Analyzing your results with AI...
        </p>
      </div>
    );
  }

  // ---------- Error ----------
  if (stage === "error") {
    return (
      <div className="max-w-[640px] mx-auto text-center py-16">
        <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 mb-6">
          {error || "Something went wrong."}
        </p>
        <button
          onClick={restart}
          className="bg-white/5 border border-white/10 text-white/65 font-[family-name:var(--font-inter)] text-[13px] font-bold px-5 py-3 rounded-[8px] hover:bg-white/10 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ---------- Results ----------
  if (stage === "results" && report) {
    const style = levelColors[report.skillLevel] || levelColors["Competent"];
    const circumference = 2 * Math.PI * 82;
    const gaugeOffset = circumference - (report.overallScore / 100) * circumference;

    return (
      <div className="max-w-[760px] mx-auto">
        {/* Score Card */}
        <div className="rounded-[14px] p-6 md:p-8 mb-6 border" style={{ backgroundColor: style.bg, borderColor: style.border }}>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="relative w-[180px] h-[180px] shrink-0 mx-auto md:mx-0">
              <svg width="180" height="180" viewBox="0 0 200 200" className="-rotate-90">
                <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
                <circle
                  cx="100"
                  cy="100"
                  r="82"
                  fill="none"
                  stroke={style.color}
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={gaugeOffset}
                  className="transition-all duration-1000 ease-out"
                  style={{ filter: `drop-shadow(0 0 10px ${style.color}50)` }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-sans text-[38px] font-bold" style={{ color: style.color }}>
                  {report.overallScore}
                </span>
                <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/30 uppercase tracking-[0.08em]">
                  / 100
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="font-sans text-[12px] font-bold tracking-[2px] uppercase mb-2" style={{ color: style.color }}>
                Computer Skills Level
              </div>
              <h2 className="font-sans text-[28px] md:text-[32px] font-bold mb-3" style={{ color: style.color }}>
                {report.skillLevel}
              </h2>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.7]">
                {report.narrative}
              </p>
            </div>
          </div>
        </div>

        {/* Category Scores */}
        <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-6">
          <h3 className="font-sans text-[16px] font-bold text-white mb-4">Skill Breakdown</h3>
          <div className="space-y-3.5">
            {csCategories.map((cat) => {
              const score = report.categoryScores[cat] ?? 0;
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/70">{cat}</span>
                    <span className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/50">{score}%</span>
                  </div>
                  <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${score}%`, backgroundColor: score >= 70 ? "#00C97A" : score >= 40 ? "#FFD23F" : "#E8373A" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths / Weaknesses */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#00C97A]/5 border border-[#00C97A]/20 rounded-[10px] p-5">
            <h3 className="font-sans text-[15px] font-bold text-[#00C97A] mb-3">Strengths</h3>
            <ul className="space-y-2">
              {report.strengths.map((s, i) => (
                <li key={i} className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 flex items-start gap-2">
                  <span className="text-[#00C97A] mt-0.5 shrink-0">&#x2714;</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/20 rounded-[10px] p-5">
            <h3 className="font-sans text-[15px] font-bold text-[#FFD23F] mb-3">Areas to Improve</h3>
            <ul className="space-y-2">
              {report.weaknesses.map((w, i) => (
                <li key={i} className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 flex items-start gap-2">
                  <span className="text-[#FFD23F] mt-0.5 shrink-0">&#x26A0;</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-[#222230] border border-white/[0.08] rounded-[10px] p-5 mb-6">
          <h3 className="font-sans text-[16px] font-bold text-white mb-3">Improvement Plan</h3>
          <ol className="space-y-2">
            {report.recommendations.map((r, i) => (
              <li key={i} className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 flex items-start gap-2.5">
                <span className="text-white/30 font-bold shrink-0">{i + 1}.</span>
                {r}
              </li>
            ))}
          </ol>
        </div>

        {/* Career Matches */}
        <div className="mb-6">
          <h3 className="font-sans text-[16px] font-bold text-white mb-4">Careers That Match Your Skills</h3>
          <div className="space-y-3">
            {report.careerMatches.map((career) => (
              <div key={career.slug} className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h4 className="font-sans text-[16px] font-bold text-white">{career.title}</h4>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-0.5">{career.description}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="font-sans text-[22px] font-bold text-[#4F8EF7]">{career.matchPercent}%</span>
                    <p className="font-[family-name:var(--font-inter)] text-[10px] text-white/30 uppercase tracking-[0.05em]">match</p>
                  </div>
                </div>
                {career.skillsDemonstrated.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {career.skillsDemonstrated.map((s) => (
                      <span key={s} className="font-[family-name:var(--font-inter)] text-[11px] text-[#00C97A] bg-[#00C97A]/10 border border-[#00C97A]/20 px-2.5 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
                  <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/40">
                    Prep time: <span className="text-white/60 font-semibold">{career.estimatedPrep}</span>
                  </span>
                  <a
                    href={career.learnMoreHref}
                    className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-[#4F8EF7] hover:underline"
                  >
                    Learn more &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 flex-wrap mb-12">
          <button
            onClick={restart}
            className="bg-[#4F8EF7]/10 border border-[#4F8EF7]/25 text-[#4F8EF7] font-[family-name:var(--font-inter)] text-[13px] font-bold px-5 py-3 rounded-[8px] hover:bg-[#4F8EF7]/20 transition-colors"
          >
            Retake Assessment
          </button>
          <a
            href="/tools"
            className="bg-white/5 border border-white/10 text-white/65 font-[family-name:var(--font-inter)] text-[13px] font-bold px-5 py-3 rounded-[8px] hover:bg-white/10 transition-colors"
          >
            Explore More Tools
          </a>
        </div>
      </div>
    );
  }

  return null;
}
