"use client";

import { applyScrollReveal, gsap, useGsapScope } from "./useGsap";

const STACK = [
  "Claude API",
  "Google OAuth 2.0",
  "Gmail API",
  "Google Calendar API",
  "Google Drive API",
  "Next.js API routes",
  "GSAP + ScrollTrigger",
  "Vercel",
];

export default function TechStack() {
  const scopeRef = useGsapScope<HTMLElement>((scope) => {
    applyScrollReveal(scope.querySelectorAll("[data-reveal]"));
    gsap.fromTo(
      scope.querySelectorAll("[data-badge]"),
      { opacity: 0, y: 14, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.045,
        scrollTrigger: { trigger: scope.querySelector("[data-badges]"), start: "top 88%" },
      }
    );
  }, []);

  return (
    <section ref={scopeRef} className="px-6 md:px-[clamp(24px,6vw,88px)] py-[100px]">
      <div data-reveal className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#4B5265] mb-6">
        Built with
      </div>
      <div data-badges className="flex flex-wrap gap-[10px] max-w-[900px]">
        {STACK.map((item) => (
          <span
            key={item}
            data-badge
            className="font-mono text-[13px] px-[13px] py-[7px] rounded-full border border-[#22D3EE]/40 text-[#67E8F9]"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
