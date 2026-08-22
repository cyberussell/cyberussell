"use client";

import { applyScrollReveal, gsap, useGsapScope } from "./useGsap";
import { PipelineStageCard } from "./PipelineStageCard";

const STEPS = [
  {
    n: "01",
    title: "Lead lands",
    body: "A form fill, a reply, a note pasted in. The agent reads the raw text and pulls out who, what and how urgent.",
    tool: "Claude API",
  },
  {
    n: "02",
    title: "Reply goes out",
    body: "It drafts in your voice, checks the ask against what you actually offer, and sends the email itself.",
    tool: "Gmail API",
  },
  {
    n: "03",
    title: "Meeting booked",
    body: "It reads your real availability, proposes a slot inside it, and writes the event with the lead invited.",
    tool: "Google Calendar API",
  },
  {
    n: "04",
    title: "Record filed",
    body: "A document lands in the right folder with the transcript, the decision and the next touch date.",
    tool: "Google Drive API",
  },
];

export default function HowItWorks() {
  const scopeRef = useGsapScope<HTMLElement>((scope) => {
    applyScrollReveal(scope.querySelectorAll("[data-reveal]"));

    const cards = scope.querySelectorAll("[data-step]");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.16,
        scrollTrigger: { trigger: scope.querySelector("[data-steps-grid]"), start: "top 78%" },
      }
    );
    const bars = scope.querySelectorAll("[data-step-bar]");
    gsap.fromTo(
      bars,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.16,
        delay: 0.25,
        scrollTrigger: { trigger: scope.querySelector("[data-steps-grid]"), start: "top 78%" },
      }
    );
  }, []);

  return (
    <section
      id="how"
      ref={scopeRef}
      className="px-6 md:px-[clamp(24px,6vw,88px)] py-[110px]"
      style={{ background: "linear-gradient(180deg, transparent, rgba(16,20,31,0.55), transparent)" }}
    >
      <div data-reveal className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#4B5265] mb-5">
        How it works
      </div>
      <h2
        data-reveal
        className="font-[family-name:var(--font-syne)] font-bold text-[clamp(28px,4.4vw,48px)] tracking-[-0.025em] max-w-[22ch] mb-14 text-[#E7EAF2]"
      >
        Four handoffs, no human in the middle.
      </h2>
      <div data-steps-grid className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(230px,1fr))] max-w-[1180px]">
        {STEPS.map((step) => (
          <PipelineStageCard
            key={step.n}
            n={step.n}
            title={step.title}
            body={step.body}
            tool={step.tool}
            status="done"
            showStatusIcon={false}
          />
        ))}
      </div>
    </section>
  );
}
