"use client";

import { useState, useRef, useCallback } from "react";

/* ── Prompt data ─────────────────────────────────────────────────────────── */

type Prompt = {
  id: string;
  label: string;
  text: string;
  note: string;
};

const PROMPTS: Record<string, Prompt> = {
  p1: {
    id: "p1",
    label: "Prompt 1 — The Context Setter",
    text: `I am a Filipino living in [your province]. I have [X] hours per day available to work on an online income. My skills include [list your skills honestly — even simple ones like cooking, sewing, or using Facebook]. I want to earn online but I am not sure where to start. I have a smartphone and [laptop / no laptop]. My internet is [fast / slow / mobile data only]. Based on my specific situation and the current Philippine market in 2026 — what are my 3 most realistic paths to earning online?`,
    note: "Replace the [brackets] with your actual information before sending. The more specific you are, the better Claude's answer will be.",
  },
  p2: {
    id: "p2",
    label: "Prompt 2 — The Direction Finder",
    text: `Based on my context above — research the current online earning landscape for Filipinos in 2026. I want to understand: 1) What is the real employment and income situation in the Philippines right now? Use data from PSA and DOLE where possible. 2) What online income paths are growing in the Philippines? 3) What do most Filipinos get wrong when they try to earn online? 4) What is a realistic income for a Filipino beginner in the first 3 months? Give me honest data — not motivational content.`,
    note: "Send this in the SAME conversation after Prompt 1. Claude already knows your context so it will filter all answers through your specific situation.",
  },
  p3: {
    id: "p3",
    label: "Prompt 3 — The Business Builder",
    text: `I want to build [describe your idea in 1–2 sentences] for [describe your audience]. Help me create a simple, realistic business plan that includes: 1) What exactly I offer — the specific product or service 2) Who my exact audience is — be specific about age, location, situation 3) How I reach them — which platforms and what type of content 4) How I earn — what I charge and when I start charging 5) What I do in the first 30 days to get started. Keep it realistic for a Filipino starting with zero budget. No hype. Be honest about what will take time.`,
    note: "Replace [describe your idea] and [describe your audience] with your specific situation. The more honest you are, the more useful Claude's plan will be.",
  },
  p3b: {
    id: "p3b",
    label: "Bonus Prompt — The Reality Check",
    text: `Be honest with me. What is the biggest mistake someone like me could make with this plan? What is likely to go wrong in the first 30 days? What should I avoid doing that most beginners do wrong?`,
    note: "Send this after the business plan prompt. Claude's honest answer here will save you weeks of wasted effort.",
  },
  p4a: {
    id: "p4a",
    label: "Prompt 4A — Facebook Post",
    text: `Write a Facebook post for my [page / personal profile] about [topic]. My audience is [describe audience]. The tone should be honest and real — not salesy or motivational poster style. Write in simple English that a Filipino in the province can easily understand. The post should make them feel understood — not sold to. End with a question that encourages comments. Do not include hashtags.`,
    note: "Use this for every Facebook post. Change the topic each time. Claude will write it in your voice once it knows your context.",
  },
  p4b: {
    id: "p4b",
    label: "Prompt 4B — PDF Guide Content",
    text: `Create the complete content for a free PDF guide titled "[title]". My audience is Filipino workers in the province who want to earn online. The guide should be: 8–12 pages long, written in simple plain English, based on real data and verified sources, structured with clear headings and sections, and end with one specific action the reader can take today. Include real peso amounts where relevant. No hype. No fake promises. Just honest, useful information.`,
    note: "This is how the Cyberussell free PDF guides were created. Replace [title] with your guide topic.",
  },
  p4c: {
    id: "p4c",
    label: "Prompt 4C — First Client Pitch",
    text: `Write a short, honest message I can send to a potential client for my [service] business. I am a Filipino freelancer starting out with [describe your experience level honestly]. The client is [describe the type of business or person]. The message should be professional but warm — not copy-paste corporate language. It should explain what I offer, why I can help them specifically, and what the next step is. Keep it under 100 words.`,
    note: "Use this to write your first client outreach messages on Facebook, Messenger, or Upwork.",
  },
  p5: {
    id: "p5",
    label: "Prompt 5 — The Market Research Prompt",
    text: `I am building [your product or service] for [your audience]. Help me understand my market: 1) Who exactly is my audience — describe their daily life, their problems, and what they want 2) What are they already trying to solve this problem? What alternatives do they use? 3) Why do those alternatives fail them? 4) What would make my solution different or better? 5) What would they realistically pay for this? Give me honest market analysis — not optimistic projections.`,
    note: "This is the prompt that shaped the Cyberussell positioning — provincial Filipinos, underserved by Metro Manila-centric content, skeptical of \"earn online\" promises, needing data-backed free resources.",
  },
  p5b: {
    id: "p5b",
    label: "Prompt 5B — The Competition Check",
    text: `Who else is doing what I am planning to do for Filipino audiences? What are they doing well? What are they NOT doing that my audience still needs? Where is the gap I can fill that nobody else is filling right now?`,
    note: "Claude will identify the gap in the market that is specifically yours to fill. For Cyberussell — the gap was: data-backed, free, Taglish, provincial-focused online earning guidance. Nobody was doing all four together.",
  },
  p6: {
    id: "p6",
    label: "Prompt 6 — The Daily Direction Prompt",
    text: `I am building [your project name]. Here is my current situation: [describe where you are right now — what's working, what's not, what you're worried about]. My goal this week is [your specific weekly goal]. What is the single most important thing I should do TODAY to move forward? Give me one action — not a list. Just the one thing that matters most right now.`,
    note: "Use this every morning. One prompt. One answer. One action. That consistency is what separates people who build something real from people who stay stuck planning forever.",
  },
};

/* ── Step data ───────────────────────────────────────────────────────────── */

type StepNav = { num: number; label: string };

const STEP_NAVS: StepNav[] = [
  { num: 1, label: "1. What is Claude" },
  { num: 2, label: "2. First Prompt" },
  { num: 3, label: "3. Find Direction" },
  { num: 4, label: "4. Build Strategy" },
  { num: 5, label: "5. Create Content" },
  { num: 6, label: "6. Research Market" },
  { num: 7, label: "7. Daily Habit" },
];

/* ── Reusable sub-components ─────────────────────────────────────────────── */

function PromptBlock({
  prompt,
  copied,
  onCopy,
}: {
  prompt: Prompt;
  copied: boolean;
  onCopy: (id: string, text: string) => void;
}) {
  return (
    <div className="bg-[#222230] border border-[#3B82F6]/30 rounded-[10px] overflow-hidden my-4">
      <div className="bg-[#3B82F6]/10 px-4 py-2.5 flex items-center justify-between border-b border-[#3B82F6]/20">
        <span className="text-[11px] font-semibold text-[#60A5FA] tracking-[1px] uppercase">
          {prompt.label}
        </span>
        <button
          onClick={() => onCopy(prompt.id, prompt.text)}
          className={`text-[11px] font-semibold px-3 py-1 rounded-[5px] transition-all ${
            copied
              ? "bg-[#00C97A]/15 border border-[#00C97A]/30 text-[#00C97A]"
              : "bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#60A5FA] hover:bg-[#3B82F6]/25"
          }`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="px-4 py-3.5 text-[13px] text-white/85 leading-[1.75] font-mono whitespace-pre-wrap">
        {prompt.text}
      </div>
      <div className="px-4 py-2 pb-3 text-[11px] text-white/35 italic">
        {prompt.note}
      </div>
    </div>
  );
}

function WhatHappens({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#00C97A]/[0.06] border border-[#00C97A]/20 rounded-[10px] p-3.5 px-[18px] my-3.5">
      <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#00C97A] mb-1.5">
        What happens when you send this
      </div>
      <div className="text-[13px] text-white/60 leading-[1.7]">{children}</div>
    </div>
  );
}

function TipBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#FFD23F]/[0.06] border border-[#FFD23F]/20 rounded-[10px] p-3.5 px-[18px] my-3.5">
      <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#FFD23F] mb-1.5">
        {title}
      </div>
      <div className="text-[13px] text-white/60 leading-[1.7]">{children}</div>
    </div>
  );
}

function WarnBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#E8373A]/[0.06] border border-[#E8373A]/20 rounded-[10px] p-3.5 px-[18px] my-3.5">
      <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#E8373A] mb-1.5">
        {title}
      </div>
      <div className="text-[13px] text-white/60 leading-[1.7]">{children}</div>
    </div>
  );
}

function StepHeader({
  num,
  label,
  title,
}: {
  num: number;
  label: string;
  title: string;
}) {
  return (
    <div className="flex items-start gap-4 mb-5">
      <div className="w-12 h-12 rounded-full bg-[#E8373A] text-white font-sans text-lg font-extrabold flex items-center justify-center shrink-0">
        {num}
      </div>
      <div>
        <div className="text-[10px] font-semibold tracking-[2px] uppercase text-[#E8373A] mb-0.5">
          {label}
        </div>
        <h2 className="font-sans text-[22px] font-extrabold text-white leading-[1.15]">
          {title}
        </h2>
      </div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-white/60 font-[family-name:var(--font-inter)] text-[15px] leading-[1.78] mb-4">
      {children}
    </p>
  );
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="text-white">{children}</strong>;
}

function StepsList({ items }: { items: React.ReactNode[] }) {
  return (
    <div className="flex flex-col my-3">
      {items.map((item, i) => (
        <div
          key={i}
          className={`flex items-start gap-3 py-2.5 ${i < items.length - 1 ? "border-b border-white/10" : ""}`}
        >
          <div className="w-6 h-6 rounded-full bg-[#E8373A] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
            {i + 1}
          </div>
          <div className="text-[13px] text-white/60 leading-[1.65] flex-1">
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}

function NavButtons({
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
}: {
  onPrev?: () => void;
  onNext: () => void;
  prevLabel?: string;
  nextLabel: string;
}) {
  return (
    <div className="flex gap-2 mt-7 pt-5 border-t border-white/10">
      {onPrev && (
        <button
          onClick={onPrev}
          className="flex-1 bg-transparent border border-white/15 text-white/60 py-3 rounded-lg text-[13px] font-medium hover:text-white hover:border-white/30 transition-all"
        >
          {prevLabel}
        </button>
      )}
      <button
        onClick={onNext}
        className={`${onPrev ? "flex-[2]" : "flex-1"} bg-[#E8373A] text-white border-none py-3 rounded-lg text-[14px] font-semibold hover:bg-[#FF4A4D] transition-colors`}
      >
        {nextLabel}
      </button>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */

export default function ClaudeGuide() {
  const [currentStep, setCurrentStep] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const goStep = useCallback((n: number) => {
    setCurrentStep(n);
    navRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleCopy = useCallback((id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  const pb = (id: string) => (
    <PromptBlock
      prompt={PROMPTS[id]}
      copied={copiedId === id}
      onCopy={handleCopy}
    />
  );

  return (
    <div className="max-w-[860px] mx-auto">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div className="pb-10 border-b border-white/10">
        <div className="text-[10px] font-semibold tracking-[2.5px] uppercase text-[#E8373A] mb-2.5 font-[family-name:var(--font-inter)]">
          Free Step-by-Step Guide · Cyberussell · 2026
        </div>
        <h1 className="font-sans text-[clamp(26px,5vw,42px)] font-extrabold text-white leading-[1.08] tracking-tight mb-3.5">
          How to Use Claude AI
          <br />
          to Start Earning Online —
          <br />
          <span className="text-[#FFD23F]">A Real Filipino&apos;s Guide</span>
        </h1>
        <p className="text-white/60 font-[family-name:var(--font-inter)] text-[16px] leading-[1.75] max-w-[600px] mb-6">
          Everything is easy when you know how to use and prompt Claude
          correctly. This guide shows you the exact steps — with real prompts
          you can copy and use right now.
        </p>

        {/* Russell card */}
        <div className="bg-[#18181F] border border-white/15 rounded-xl p-[18px] px-5 mb-7 flex gap-4 items-start max-sm:flex-col">
          <div className="w-12 h-12 rounded-full bg-[#E8373A]/15 border-2 border-[#E8373A]/30 flex items-center justify-center font-sans text-lg font-extrabold text-[#E8373A] shrink-0">
            R
          </div>
          <div>
            <div className="text-[14px] font-semibold text-white mb-0.5">
              Russell — Cyberussell
            </div>
            <div className="text-[12px] text-white/35">
              Vibe coder · Isabela, Cagayan Valley · Province of the Philippines
            </div>
            <div className="text-[13px] text-white/60 leading-[1.65] mt-2 italic">
              &quot;I built a complete website, a business strategy, 5 free
              guides, a Skill Finder tool, and a full content plan in one day.
              The tool that made all of it possible was Claude AI. This guide is
              the honest story of how — with the actual prompts I used.&quot;
            </div>
          </div>
        </div>

        {/* What you'll get */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2">
          {[
            { icon: "📋", text: "7 steps with real prompts you can copy" },
            { icon: "🇵🇭", text: "Built for Filipinos — provincial context throughout" },
            { icon: "💰", text: "Focus on business strategy and earning — not just AI theory" },
            { icon: "🆓", text: "Works with Claude's free plan — no paid subscription needed" },
          ].map((item) => (
            <div
              key={item.text}
              className="bg-[#18181F] border border-white/10 rounded-lg p-3 px-3.5 flex items-start gap-2"
            >
              <span className="text-[16px] shrink-0 mt-px">{item.icon}</span>
              <span className="text-[12px] text-white/60 leading-[1.5]">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Step nav ──────────────────────────────────────────────────── */}
      <div ref={navRef} className="flex gap-1 flex-wrap pt-6 border-b border-white/10">
        {STEP_NAVS.map((s) => (
          <button
            key={s.num}
            onClick={() => goStep(s.num)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium border whitespace-nowrap transition-all ${
              currentStep === s.num
                ? "bg-[#E8373A] border-[#E8373A] text-white"
                : "bg-transparent border-white/10 text-white/35 hover:text-white hover:border-white/15"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ── Progress bar ──────────────────────────────────────────────── */}
      <div className="h-[3px] bg-white/10 rounded-full mt-4 mb-7">
        <div
          className="h-full bg-[#E8373A] rounded-full transition-[width] duration-300"
          style={{ width: `${(currentStep / 7) * 100}%` }}
        />
      </div>

      {/* ── Steps ─────────────────────────────────────────────────────── */}

      {/* STEP 1 */}
      {currentStep === 1 && (
        <div>
          <StepHeader num={1} label="Step 1 of 7" title="What is Claude — and why it's different" />
          <P>
            Claude is an AI assistant made by Anthropic. But calling it &quot;just an AI
            assistant&quot; is like calling a carenderia &quot;just a food place.&quot; It
            undersells what it actually does.
          </P>
          <P>
            Here is what makes Claude different from a Google search or a YouTube
            tutorial: <B>Claude has a conversation with you.</B> It remembers what you
            said earlier in the same conversation. It asks follow-up questions. It
            adjusts its answers based on your specific situation — not a generic
            Filipino, but you specifically.
          </P>
          <P>
            When Russell used Claude to build Cyberussell — he didn&apos;t just ask one
            question. He had a long conversation that went from research, to
            strategy, to content, to business model, to revenue plan. Claude was
            like having a business consultant, a researcher, a writer, and a
            strategist all in one — available at any time, for free.
          </P>
          <TipBlock title="The most important thing to understand">
            Claude does not replace your skill or your judgment. It multiplies
            them. The quality of what Claude gives you depends entirely on the
            quality of what you tell it. That is what this guide teaches — how to
            talk to Claude so it gives you useful, specific, actionable answers.
          </TipBlock>

          {/* Sub-header: How to get started */}
          <div className="flex items-start gap-4 mt-6 mb-3.5">
            <div className="w-9 h-9 rounded-full bg-[#222230] border border-white/15 flex items-center justify-center text-[14px] shrink-0">
              📱
            </div>
            <div>
              <div className="text-[10px] font-semibold tracking-[2px] uppercase text-[#E8373A] mb-0.5">
                How to get started
              </div>
              <h3 className="font-sans text-[17px] font-extrabold text-white leading-[1.15]">
                Create your free Claude account
              </h3>
            </div>
          </div>

          <StepsList
            items={[
              <>Go to <B>claude.ai</B> on your phone or laptop</>,
              <>Click <B>&quot;Sign up&quot;</B> — use your Google account for fastest signup</>,
              <>You&apos;re in. The free plan gives you access to Claude Sonnet — the same model that powers the Cyberussell Skill Finder tool</>,
              <>On free plan you get around <B>10–20 conversations per day</B> — more than enough to start</>,
            ]}
          />

          {/* Screenshot placeholder */}
          <div className="bg-[#18181F] border border-dashed border-white/15 rounded-[10px] py-8 px-5 text-center my-3.5">
            <div className="text-[32px] mb-2">🖥️</div>
            <div className="text-[13px] text-white/35">claude.ai — sign up page</div>
            <div className="text-[11px] text-white/20 mt-1">
              Go here on your phone or laptop · Free account · No credit card
            </div>
          </div>

          <WarnBlock title="Common mistake">
            Most people open Claude and type &quot;how do I earn money online
            Philippines&quot; — and get a very generic answer. That is not how to use
            Claude effectively. The next step shows you the right way to start.
          </WarnBlock>

          <NavButtons onNext={() => goStep(2)} nextLabel="Step 2: The First Prompt →" />
        </div>
      )}

      {/* STEP 2 */}
      {currentStep === 2 && (
        <div>
          <StepHeader num={2} label="Step 2 of 7" title="The First Prompt — Give Claude Your Context" />
          <P>
            The biggest mistake people make with Claude is asking generic questions
            and getting generic answers. The fix is simple:{" "}
            <B>tell Claude who you are before you ask anything.</B>
          </P>
          <P>
            Think of it like calling a doctor. If you call and say &quot;I have pain&quot; —
            the doctor can&apos;t help much. If you say &quot;I am a 34-year-old woman, I
            have chest pain on the left side that started this morning after
            exercise&quot; — now the doctor can actually help. Claude works the same
            way.
          </P>
          <P>
            The first message you send to Claude should establish your context.
            Here is the exact prompt Russell used at the start of the Cyberussell
            project:
          </P>
          {pb("p1")}
          <WhatHappens>
            Claude will give you 3 specific income path recommendations based on
            YOUR situation — not a generic Filipino, but you specifically. Each
            recommendation will explain why it fits you, what you need to start,
            and a realistic earning range. This is your starting point for
            everything that follows.
          </WhatHappens>
          <TipBlock title="Russell's actual context when he started">
            &quot;I am a Filipino living in Isabela, Cagayan Valley. I am a
            self-taught vibe coder who builds web apps using AI tools. I want to
            help provincial Filipinos earn online using skills they already have.
            My audience is people in the province who scroll Facebook and TikTok
            all day and don&apos;t know their skill is worth money.&quot; — That one
            context message shaped the entire Cyberussell direction.
          </TipBlock>
          <NavButtons
            onPrev={() => goStep(1)}
            prevLabel="← Back"
            onNext={() => goStep(3)}
            nextLabel="Step 3: Find Your Direction →"
          />
        </div>
      )}

      {/* STEP 3 */}
      {currentStep === 3 && (
        <div>
          <StepHeader num={3} label="Step 3 of 7" title="Find Your Direction Using Claude" />
          <P>
            Once Claude knows who you are — the next step is to use it to research
            your market. This is where most people waste time on YouTube or Google
            getting conflicting information. Claude gives you one clear, organized
            answer based on your specific situation.
          </P>
          <P>
            This is the prompt Russell used to research the Philippine labor market
            and find the direction for Cyberussell:
          </P>
          {pb("p2")}
          <WhatHappens>
            A research-backed breakdown of the Philippine online earning landscape
            — unemployment data, growing platforms, common mistakes, and realistic
            income ranges. This is the same research that became the foundation of
            the Cyberussell website. What took Russell hours to compile manually,
            Claude organizes in minutes.
          </WhatHappens>
          <TipBlock title="How to go deeper">
            After Claude answers — ask follow-up questions. &quot;Tell me more about
            option 2.&quot; &quot;What are the risks of that path?&quot; &quot;What would a beginner
            in Isabela specifically need to start this?&quot; Each follow-up builds a
            more complete picture. This is where Claude becomes genuinely powerful
            — in the conversation, not the single prompt.
          </TipBlock>
          <WarnBlock title="Important">
            Claude&apos;s knowledge has a cutoff date. For the most current Philippine
            statistics — ask Claude to tell you what it knows and then verify the
            key numbers on PSA.gov.ph or DOLE.gov.ph. Always cite your sources
            when you use data publicly.
          </WarnBlock>
          <NavButtons
            onPrev={() => goStep(2)}
            prevLabel="← Back"
            onNext={() => goStep(4)}
            nextLabel="Step 4: Build Your Strategy →"
          />
        </div>
      )}

      {/* STEP 4 */}
      {currentStep === 4 && (
        <div>
          <StepHeader num={4} label="Step 4 of 7" title="Build Your Business Strategy with Claude" />
          <P>
            Most Filipinos who want to earn online have a vague idea but no clear
            plan. Claude can turn a vague idea into a complete business strategy in
            one conversation — for free.
          </P>
          <P>
            This is the exact type of prompt Russell used to build the Cyberussell
            business model — from a rough idea into a complete system with revenue
            model, content plan, and launch strategy:
          </P>
          {pb("p3")}
          <WhatHappens>
            A complete, structured business plan specific to your idea and your
            audience. This is not a template — it is built around what you told
            Claude in the first two steps. Russell used this type of conversation
            to design the entire Cyberussell trust ladder: free PDFs → email
            capture → premium PDF → subscription.
          </WhatHappens>
          <TipBlock title="The follow-up that changes everything">
            After Claude gives you the plan — ask: &quot;What is the single biggest
            mistake I could make with this plan?&quot; Claude will tell you the honest
            risk. That answer is often more valuable than the plan itself.
          </TipBlock>
          {pb("p3b")}
          <NavButtons
            onPrev={() => goStep(3)}
            prevLabel="← Back"
            onNext={() => goStep(5)}
            nextLabel="Step 5: Create Content →"
          />
        </div>
      )}

      {/* STEP 5 */}
      {currentStep === 5 && (
        <div>
          <StepHeader num={5} label="Step 5 of 7" title="Use Claude to Create Your First Income Content" />
          <P>
            Once you have your direction and your plan — Claude becomes your
            content team. One person. Zero budget. Claude can write your Facebook
            posts, your PDF guides, your website copy, your service descriptions,
            and your first pitch to clients.
          </P>
          <P>
            Here are the exact content prompts Russell used to create the
            Cyberussell content — all in one day:
          </P>
          {pb("p4a")}
          {pb("p4b")}
          {pb("p4c")}
          <WhatHappens>
            Claude does not write for you — it writes with you. The first draft it
            gives you is a starting point. Read it, change what doesn&apos;t sound like
            you, keep what works. After 3–4 rounds of this, Claude starts to
            understand your voice and the drafts get better every time.
          </WhatHappens>
          <NavButtons
            onPrev={() => goStep(4)}
            prevLabel="← Back"
            onNext={() => goStep(6)}
            nextLabel="Step 6: Research Your Market →"
          />
        </div>
      )}

      {/* STEP 6 */}
      {currentStep === 6 && (
        <div>
          <StepHeader num={6} label="Step 6 of 7" title="Use Claude to Research Your Market" />
          <P>
            Before you spend weeks building something — use Claude to research
            whether people actually want it. This is the step most people skip —
            and it&apos;s why most online businesses fail.
          </P>
          <P>
            Claude can help you understand your audience, your competition, your
            pricing, and your positioning — all before you spend a single peso.
          </P>
          {pb("p5")}
          {pb("p5b")}
          <WhatHappens>
            Clarity on exactly who you are for and what makes you different. This
            is the foundation of all your content, your messaging, and your
            offers. Russell used this research to write the tagline &quot;Diskarte mo,
            Pera mo&quot; and position Cyberussell as the only free, data-backed,
            provincial Filipino earning guide.
          </WhatHappens>
          <NavButtons
            onPrev={() => goStep(5)}
            prevLabel="← Back"
            onNext={() => goStep(7)}
            nextLabel="Step 7: The Daily Habit →"
          />
        </div>
      )}

      {/* STEP 7 */}
      {currentStep === 7 && (
        <div>
          <StepHeader num={7} label="Step 7 of 7" title="The Daily Claude Habit That Keeps You Moving" />
          <P>
            The biggest problem when building something online is not knowing what
            to do next. Every day there are a hundred things you could work on —
            and most people either do everything poorly or do nothing at all.
          </P>
          <P>
            Claude solves this with one simple daily prompt. Russell uses this
            every morning to decide what to do that day:
          </P>
          {pb("p6")}
          <TipBlock title="The most powerful follow-up">
            After Claude gives you your one action — ask: &quot;Why this one
            specifically? What happens if I do everything else except this?&quot;
            Claude&apos;s answer will show you the logic behind the priority.
            Understanding the why makes you better at prioritizing on your own
            over time.
          </TipBlock>

          {/* Prompt library summary */}
          <div className="bg-[#18181F] border border-white/15 rounded-xl overflow-hidden my-5">
            <div className="bg-[#FFD23F]/[0.08] px-5 py-3.5 border-b border-[#FFD23F]/15">
              <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[#FFD23F] mb-0.5">
                Complete Prompt Library
              </div>
              <div className="text-[13px] text-white/60">
                All 7 prompts from this guide — your Claude starter kit
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="flex flex-col gap-1.5">
                {[
                  "Prompt 1 — Context Setter: Tell Claude who you are",
                  "Prompt 2 — Direction Finder: Research your market",
                  "Prompt 3 — Business Builder: Build your strategy",
                  "Prompt 3B — Reality Check: Find the risks",
                  "Prompt 4A — Facebook Post: Write your content",
                  "Prompt 4B — PDF Guide: Create your free resource",
                  "Prompt 4C — Client Pitch: Write your first outreach",
                  "Prompt 5 — Market Research: Understand your audience",
                  "Prompt 5B — Competition Check: Find your gap",
                  "Prompt 6 — Daily Direction: Know what to do today",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-[13px] text-white/60 leading-[1.6]">
                    <span className="text-[#00C97A] shrink-0 mt-0.5 text-[14px]">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Final message */}
          <div className="bg-[#18181F] border border-white/15 rounded-xl overflow-hidden mb-3.5">
            <div className="bg-[#00C97A]/[0.08] px-5 py-3.5 border-b border-[#00C97A]/15">
              <div className="text-[13px] font-semibold text-[#00C97A]">
                You now have everything you need to start
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="text-[14px] text-white/60 leading-[1.75] mb-3.5">
                Russell built Cyberussell — a complete website, business strategy,
                5 free guides, an AI-powered Skill Finder tool, and a full content
                plan — using exactly these prompts. Not in a month. In one day.
              </p>
              <p className="text-[14px] text-white/60 leading-[1.75] mb-3.5">
                The difference between people who earn online and people who
                don&apos;t is not talent, not capital, and not location. It is the
                willingness to start — with what you have, where you are, right
                now.
              </p>
              <p className="text-[14px] text-white leading-[1.75] font-medium">
                Go to claude.ai. Create your free account. Send Prompt 1. That is
                your first step. Everything else follows from there.
              </p>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-2 flex-wrap mt-4">
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-[2] min-w-[160px] bg-[#E8373A] text-white py-[13px] rounded-lg text-[14px] font-semibold text-center block"
            >
              Open Claude AI → Free Account
            </a>
            <a
              href="/guides/8-ways"
              className="flex-1 min-w-[120px] bg-[#18181F] text-white/60 border border-white/15 py-[13px] rounded-lg text-[13px] font-medium text-center block"
            >
              8 Ways to Earn →
            </a>
          </div>

          <div className="text-[10px] text-white/20 mt-4 italic">
            Guide by Russell · Cyberussell · Isabela, Cagayan Valley, Philippines
            · cyberussell.com · June 2026
          </div>

          <NavButtons
            onPrev={() => goStep(6)}
            prevLabel="← Back to Step 6"
            onNext={() => goStep(1)}
            nextLabel="Start Over from Step 1"
          />
        </div>
      )}
    </div>
  );
}
