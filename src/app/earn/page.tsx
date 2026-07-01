"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, Users, Rocket, ArrowRight, Loader2, Copy, Check, ChevronLeft, Sparkles, BookOpen } from "lucide-react";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

async function renderMarkdown(text: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(text);
  return result.toString();
}

// ─── Types ───────────────────────────────────────────────────────────────────

type Path = "hired" | "clients" | "business" | null;
type Step = { id: string; title: string; desc: string; fields: Field[] };
type Field = { key: string; label: string; placeholder: string; type?: "textarea" };

// ─── Workflow Definitions ─────────────────────────────────────────────────────

const WORKFLOWS: Record<string, { color: string; steps: Step[] }> = {
  hired: {
    color: "#60A5FA",
    steps: [
      {
        id: "resume", title: "Build Your Resume", desc: "Answer a few questions. AI will write your resume — ready to send.",
        fields: [
          { key: "name", label: "Your full name", placeholder: "e.g. Maria Santos" },
          { key: "role", label: "Job title you're applying for", placeholder: "e.g. Virtual Assistant, Social Media Manager" },
          { key: "skills", label: "Your top skills", placeholder: "e.g. Canva, Excel, customer service, writing" },
          { key: "experience", label: "Your work experience", placeholder: "e.g. 2 years as a store cashier, managed social media for a friend's business", type: "textarea" },
          { key: "education", label: "Your education", placeholder: "e.g. BS Business Administration, STI College 2022" },
        ],
      },
      {
        id: "linkedin", title: "Set Up Your LinkedIn", desc: "AI writes your full LinkedIn profile — headline, bio, and what to post first.",
        fields: [
          { key: "name", label: "Your full name", placeholder: "e.g. Maria Santos" },
          { key: "role", label: "Your target role or industry", placeholder: "e.g. Freelance VA, Remote Customer Support" },
          { key: "skills", label: "Your top skills", placeholder: "e.g. email management, data entry, Canva" },
          { key: "experience", label: "Brief background", placeholder: "e.g. Fresh grad, 1 year BPO experience", type: "textarea" },
          { key: "goal", label: "What you want from LinkedIn", placeholder: "e.g. Get hired as a remote VA in 3 months" },
        ],
      },
      {
        id: "cover_letter", title: "Write a Cover Letter", desc: "Tell AI the job and company. It writes a cover letter that stands out.",
        fields: [
          { key: "name", label: "Your name", placeholder: "e.g. Maria Santos" },
          { key: "role", label: "Job you're applying for", placeholder: "e.g. Social Media Manager" },
          { key: "company", label: "Company name (optional)", placeholder: "e.g. Accenture, or leave blank" },
          { key: "skills", label: "Most relevant skills for this job", placeholder: "e.g. content creation, scheduling, analytics" },
          { key: "motivation", label: "Why do you want this role?", placeholder: "e.g. I want to work remotely and use my creative skills", type: "textarea" },
        ],
      },
      {
        id: "interview", title: "Practice for Interviews", desc: "Get the top questions for your role — with model answers you can study.",
        fields: [
          { key: "role", label: "Job role you're interviewing for", placeholder: "e.g. Virtual Assistant" },
          { key: "industry", label: "Industry or company type", placeholder: "e.g. US-based startup, BPO, local company" },
          { key: "experience", label: "Your experience level", placeholder: "e.g. fresh grad, 1 year experience, career changer" },
        ],
      },
    ],
  },
  clients: {
    color: "#34D399",
    steps: [
      {
        id: "portfolio", title: "Build Your Portfolio", desc: "No paid clients yet? No problem. AI creates your portfolio strategy from scratch.",
        fields: [
          { key: "name", label: "Your name", placeholder: "e.g. Juan dela Cruz" },
          { key: "skill", label: "Your main skill or service", placeholder: "e.g. graphic design, copywriting, web development" },
          { key: "experience", label: "Your experience level", placeholder: "e.g. self-taught, 6 months practice, studied design" },
          { key: "clients", label: "Who do you want to work with?", placeholder: "e.g. small Filipino businesses, US startups, e-commerce brands" },
        ],
      },
      {
        id: "freelance_profile", title: "Write Your Freelance Profile", desc: "AI writes your complete Upwork, Fiverr, or OnlineJobs.ph profile.",
        fields: [
          { key: "name", label: "Your name", placeholder: "e.g. Juan dela Cruz" },
          { key: "service", label: "Service you're offering", placeholder: "e.g. social media management, video editing" },
          { key: "skills", label: "Specific skills and tools you use", placeholder: "e.g. CapCut, Premiere Pro, Instagram, TikTok" },
          { key: "experience", label: "Your experience", placeholder: "e.g. edited videos for friends, managed family business FB page", type: "textarea" },
          { key: "rate", label: "Desired rate (optional)", placeholder: "e.g. ₱500/hour or $10/hour" },
        ],
      },
      {
        id: "proposal", title: "Write a Winning Proposal", desc: "Paste the client's job post. AI writes a proposal that gets replies.",
        fields: [
          { key: "name", label: "Your name", placeholder: "e.g. Juan dela Cruz" },
          { key: "service", label: "Your service", placeholder: "e.g. social media management" },
          { key: "job_description", label: "What the client needs (paste their job post)", placeholder: "e.g. Looking for a VA to manage emails and calendar...", type: "textarea" },
          { key: "experience", label: "Your most relevant experience", placeholder: "e.g. managed social media for 3 local businesses" },
          { key: "rate", label: "Your rate for this project", placeholder: "e.g. ₱5,000/month or $200 fixed" },
        ],
      },
      {
        id: "pricing", title: "Set Your Rates", desc: "AI builds your pricing strategy — starter rate, packages, and when to raise prices.",
        fields: [
          { key: "service", label: "Your service", placeholder: "e.g. graphic design, VA work, copywriting" },
          { key: "experience", label: "Your experience level", placeholder: "e.g. beginner, 6 months, 2 years" },
          { key: "market", label: "Your target market", placeholder: "e.g. Filipino SMEs, US clients, e-commerce brands" },
          { key: "time", label: "How long does a typical project take?", placeholder: "e.g. 3-5 hours per project, 20 hrs/month" },
        ],
      },
    ],
  },
  business: {
    color: "#F472B6",
    steps: [
      {
        id: "business_idea", title: "Validate Your Idea", desc: "Tell AI your business idea. It will tell you honestly if it will work — and how to test it.",
        fields: [
          { key: "idea", label: "Your business idea", placeholder: "e.g. selling homemade chili garlic online, teaching Canva to small businesses", type: "textarea" },
          { key: "budget", label: "Starting budget (PHP)", placeholder: "e.g. 2000, 5000, 10000" },
          { key: "time", label: "Hours you can dedicate per week", placeholder: "e.g. 5 hours, weekends only, full-time" },
          { key: "skills", label: "Your relevant skills", placeholder: "e.g. cooking, design, social media, customer service" },
          { key: "location", label: "Where you're based", placeholder: "e.g. Cebu, Metro Manila, province" },
        ],
      },
      {
        id: "brand", title: "Create Your Brand", desc: "AI builds your brand identity — name, tagline, colors, voice, and logo concept.",
        fields: [
          { key: "name", label: "Business name (or leave blank for suggestions)", placeholder: "e.g. Lola's Kitchen or leave blank" },
          { key: "type", label: "Type of business", placeholder: "e.g. online food shop, freelance design studio, tutoring service" },
          { key: "customers", label: "Who are your customers?", placeholder: "e.g. Filipino moms, small business owners, students" },
          { key: "personality", label: "How should your brand feel?", placeholder: "e.g. fun and friendly, premium and professional, warm and local" },
        ],
      },
      {
        id: "landing_page", title: "Write Your Landing Page", desc: "AI writes complete copy for your website or Facebook page — ready to publish.",
        fields: [
          { key: "business", label: "Your business name", placeholder: "e.g. Lola's Kitchen" },
          { key: "offer", label: "What you're selling", placeholder: "e.g. homemade chili garlic in 3 sizes" },
          { key: "customer", label: "Who it's for", placeholder: "e.g. Filipino foodies who want authentic homemade condiments" },
          { key: "benefit", label: "The main benefit", placeholder: "e.g. real homemade taste, no preservatives, made fresh every batch" },
          { key: "price", label: "Your price", placeholder: "e.g. ₱120 per bottle, free delivery within Cebu" },
        ],
      },
      {
        id: "marketing", title: "Launch Your Marketing", desc: "AI creates your 30-day marketing plan — content calendar, post ideas, and how to get your first customers.",
        fields: [
          { key: "business", label: "Your business", placeholder: "e.g. Lola's Kitchen — homemade chili garlic" },
          { key: "platform", label: "Where you'll market", placeholder: "e.g. Facebook, TikTok, Instagram" },
          { key: "customer", label: "Your target customer", placeholder: "e.g. Filipino food lovers, 25-45, Cebu area" },
          { key: "budget", label: "Monthly marketing budget (PHP, 0 = organic only)", placeholder: "e.g. 0, 500, 2000" },
        ],
      },
    ],
  },
};

const PATH_CONFIG = [
  {
    id: "hired" as Path,
    icon: Briefcase,
    color: "#60A5FA",
    title: "Get Hired",
    desc: "Prepare your resume, LinkedIn profile, interview skills, and job applications with AI.",
    steps: ["Resume", "LinkedIn", "Cover Letter", "Interview Prep"],
  },
  {
    id: "clients" as Path,
    icon: Users,
    color: "#34D399",
    title: "Get Clients",
    desc: "Build your portfolio, freelance profiles, proposals, pricing, and client communication with AI.",
    steps: ["Portfolio", "Freelance Profile", "Proposal", "Pricing"],
  },
  {
    id: "business" as Path,
    icon: Rocket,
    color: "#F472B6",
    title: "Start a Business",
    desc: "Validate your idea, create your brand, marketing, pricing, and launch your first business with AI.",
    steps: ["Idea Validation", "Brand Identity", "Landing Page", "Marketing Plan"],
  },
];

// ─── Step Form Component ──────────────────────────────────────────────────────

function StepForm({
  step,
  color,
  stepIndex,
  totalSteps,
  onGenerate,
  onNext,
  onBack,
  isLast,
}: {
  step: Step;
  color: string;
  stepIndex: number;
  totalSteps: number;
  onGenerate: (inputs: Record<string, string>) => Promise<string>;
  onNext: () => void;
  onBack: () => void;
  isLast: boolean;
}) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [renderedHtml, setRenderedHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!output) { setRenderedHtml(""); return; }
    renderMarkdown(output).then(setRenderedHtml);
  }, [output]);

  const allFilled = step.fields.every((f) => inputs[f.key]?.trim());

  async function handleGenerate() {
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const result = await onGenerate(inputs);
      setOutput(result);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      {/* Step header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold font-[family-name:var(--font-inter)]" style={{ backgroundColor: `${color}20`, color }}>
          {stepIndex + 1}
        </div>
        <div>
          <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2px]" style={{ color }}>
            Step {stepIndex + 1} of {totalSteps}
          </p>
          <h3 className="font-sans text-[20px] font-bold text-white">{step.title}</h3>
        </div>
      </div>
      <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-relaxed">{step.desc}</p>

      {/* Fields */}
      {!output && (
        <div className="space-y-4">
          {step.fields.map((field) => (
            <div key={field.key}>
              <label className="block font-[family-name:var(--font-inter)] text-[13px] font-semibold text-white/70 mb-1.5">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  rows={3}
                  placeholder={field.placeholder}
                  value={inputs[field.key] || ""}
                  onChange={(e) => setInputs((p) => ({ ...p, [field.key]: e.target.value }))}
                  className="w-full bg-[#0F0F1A] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-white/20 font-[family-name:var(--font-inter)] resize-none"
                />
              ) : (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={inputs[field.key] || ""}
                  onChange={(e) => setInputs((p) => ({ ...p, [field.key]: e.target.value }))}
                  className="w-full bg-[#0F0F1A] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-white/20 font-[family-name:var(--font-inter)]"
                />
              )}
            </div>
          ))}

          {error && <p className="font-[family-name:var(--font-inter)] text-[13px] text-red-400">{error}</p>}

          <button
            onClick={handleGenerate}
            disabled={!allFilled || loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-[family-name:var(--font-inter)] text-[14px] font-bold transition-all disabled:opacity-40"
            style={{ backgroundColor: color, color: "#0F0F1A" }}
          >
            {loading ? <><Loader2 size={15} className="animate-spin" /> Generating...</> : <><Sparkles size={15} /> Generate with AI</>}
          </button>
        </div>
      )}

      {/* Output */}
      {output && (
        <div className="space-y-4">
          <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2px]" style={{ color }}>
                Your {step.title}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/40 hover:text-white transition-colors"
              >
                {copied ? <><Check size={13} className="text-green-400" /> Copied</> : <><Copy size={13} /> Copy</>}
              </button>
            </div>
            <div
              className="font-[family-name:var(--font-inter)] text-[13px] text-white/75 leading-[1.8] prose-earn"
              dangerouslySetInnerHTML={{ __html: renderedHtml || output }}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { setOutput(""); setInputs({}); }}
              className="flex-1 py-3 rounded-xl border border-white/[0.08] font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/50 hover:text-white hover:border-white/20 transition-all"
            >
              ← Redo
            </button>
            <button
              onClick={onNext}
              className="flex-1 py-3 rounded-xl font-[family-name:var(--font-inter)] text-[14px] font-bold transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: color, color: "#0F0F1A" }}
            >
              {isLast ? "All Done! 🎉" : <>Next Step <ArrowRight size={14} /></>}
            </button>
          </div>
        </div>
      )}

      {/* Back nav */}
      {!output && stepIndex > 0 && (
        <button onClick={onBack} className="font-[family-name:var(--font-inter)] text-[13px] text-white/30 hover:text-white/60 transition-colors">
          ← Previous step
        </button>
      )}
    </div>
  );
}

// ─── Workflow View ────────────────────────────────────────────────────────────

function WorkflowView({ pathId, onBack }: { pathId: string; onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  const workflow = WORKFLOWS[pathId];
  const config = PATH_CONFIG.find((p) => p.id === pathId)!;
  const steps = workflow.steps;
  const color = workflow.color;

  async function generate(inputs: Record<string, string>) {
    const res = await fetch("/api/earn/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step: steps[currentStep].id, inputs }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.output as string;
  }

  if (done) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="font-sans text-[28px] font-bold text-white">You did it!</h2>
        <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 max-w-md mx-auto leading-relaxed">
          You now have a complete set of assets to {config.title.toLowerCase()}. Save everything you generated and take action today.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <button onClick={() => { setCurrentStep(0); setDone(false); }} className="px-6 py-3 rounded-xl border border-white/[0.08] font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/60 hover:text-white hover:border-white/20 transition-all">
            Start Over
          </button>
          <button onClick={onBack} className="px-6 py-3 rounded-xl font-[family-name:var(--font-inter)] text-[14px] font-bold transition-all" style={{ backgroundColor: color, color: "#0F0F1A" }}>
            Choose Another Path
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/[0.06]">
        <button onClick={onBack} className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors text-white/40 hover:text-white">
          <ChevronLeft size={18} />
        </button>
        <div>
          <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2px] mb-0.5" style={{ color }}>
            {config.title}
          </p>
          <div className="flex items-center gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === currentStep ? "24px" : "8px",
                  backgroundColor: i <= currentStep ? color : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <StepForm
        key={currentStep}
        step={steps[currentStep]}
        color={color}
        stepIndex={currentStep}
        totalSteps={steps.length}
        onGenerate={generate}
        onNext={() => {
          if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
          else setDone(true);
        }}
        onBack={() => setCurrentStep(currentStep - 1)}
        isLast={currentStep === steps.length - 1}
      />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function EarnPage() {
  const [selectedPath, setSelectedPath] = useState<Path>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">

        {!selectedPath ? (
          <>
            {/* Hero */}
            <section className="px-6 md:px-10 pt-20 pb-12 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] animate-pulse" />
                <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">Earn</span>
              </div>
              <h1 className="font-sans text-[36px] md:text-[54px] font-bold text-white mb-5 leading-tight">
                Prepare for the<br />
                <span className="text-[#FFD23F]">Real World</span>
              </h1>
              <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[18px] text-white/50 max-w-lg mx-auto leading-[1.8]">
                You learned how AI works. Now use it to become job-ready, client-ready, or business-ready — with AI as your personal career coach.
              </p>
            </section>

            {/* Three Cards */}
            <section className="px-6 md:px-10 pb-24 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PATH_CONFIG.map((path) => {
                  const Icon = path.icon;
                  return (
                    <button
                      key={path.id}
                      onClick={() => setSelectedPath(path.id)}
                      className="bg-[#18181F] border border-white/[0.08] rounded-[16px] p-6 text-left hover:border-white/20 hover:bg-[#1e1e2a] transition-all group flex flex-col overflow-visible"
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all" style={{ backgroundColor: `${path.color}15` }}>
                        <Icon size={22} style={{ color: path.color }} strokeWidth={1.8} />
                      </div>
                      <h2 className="font-sans text-[20px] font-bold text-white mb-2 group-hover:text-[#FFD23F] transition-colors">
                        {path.title}
                      </h2>
                      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.6] flex-1 mb-5">
                        {path.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {path.steps.map((s) => (
                          <span key={s} className="font-[family-name:var(--font-inter)] text-[11px] text-white/35 bg-white/[0.04] border border-white/[0.06] rounded-full px-2.5 py-1">
                            {s}
                          </span>
                        ))}
                      </div>
                      <div
                        className="w-full py-3 rounded-xl font-[family-name:var(--font-inter)] text-[14px] font-bold text-center flex items-center justify-center gap-2 transition-all"
                        style={{ backgroundColor: `${path.color}15`, color: path.color }}
                      >
                        Prepare Me <ArrowRight size={14} />
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="text-center font-[family-name:var(--font-inter)] text-[13px] text-white/25 mt-8">
                Every step is AI-assisted. You answer questions. AI builds your assets.
              </p>

              {/* Suggested reading */}
              <div className="mt-10 border-t border-white/[0.06] pt-8">
                <p className="text-center font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/25 uppercase tracking-[2px] mb-4">
                  Not sure which path is right for you?
                </p>
                <a
                  href="/guides/8-ways"
                  className="flex items-center gap-4 bg-[#18181F] border border-white/[0.08] rounded-2xl p-5 hover:border-[#FFD23F]/30 hover:bg-[#1e1e2a] transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#FFD23F]/10 flex items-center justify-center shrink-0">
                    <BookOpen size={20} className="text-[#FFD23F]" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-[15px] font-bold text-white group-hover:text-[#FFD23F] transition-colors">
                      8 Ways to Earn Online as a Filipino
                    </p>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mt-0.5">
                      Real income data, exact tools, and honest reality checks for 8 proven paths.
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-white/25 group-hover:text-[#FFD23F] transition-colors shrink-0" />
                </a>
              </div>
            </section>
          </>
        ) : (
          <section className="px-6 md:px-10 pt-12 pb-24 max-w-2xl mx-auto">
            <WorkflowView pathId={selectedPath} onBack={() => setSelectedPath(null)} />
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
