"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TEXT =
  "Most agencies split design and development into two rooms and a handoff document. I don't. 12+ concept builds shipped under one roof means the animation you approve is the animation that ships — frame for frame, at 60fps, with Lighthouse scores in the high 90s. That's not a tagline. That's the workflow.";

const WORDS = TEXT.split(" ");

export default function Manifesto() {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll("span[data-word]");
      if (!words || words.length === 0) return;

      if (prefersReducedMotion) {
        gsap.set(words, { opacity: 1 });
        return;
      }

      gsap.set(words, { opacity: 0.12 });
      gsap.to(words, {
        opacity: 1,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="px-6 md:px-12 py-28 md:py-40 border-t border-white/10">
      <p
        ref={containerRef}
        className="font-[family-name:var(--font-glyph-sans)] font-medium text-[7vw] sm:text-[5vw] md:text-[2.9vw] leading-[1.25] tracking-[-0.01em] max-w-[1400px]"
      >
        {WORDS.map((word, i) => {
          const isStat = /\d/.test(word);
          return (
            <span key={`${word}-${i}`}>
              <span
                data-word
                className={isStat ? "text-[#D4FF3F] font-[family-name:var(--font-glyph-mono)] font-semibold" : "text-white"}
              >
                {word}
              </span>{" "}
            </span>
          );
        })}
      </p>
    </section>
  );
}
