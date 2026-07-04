"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { WORK } from "./data";

type Project = (typeof WORK)[number];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      if (!trackRef.current || !sectionRef.current) return;
      const track = trackRef.current;

      const setup = () => {
        const distance = track.scrollWidth - track.clientWidth;
        return gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      };

      const tween = setup();
      return () => tween.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative border-t border-white/10 overflow-hidden">
      <div className="px-6 md:px-12 pt-16 pb-8 flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-glyph-mono)] text-[11px] uppercase tracking-[0.15em] text-white/45">
          Selected Work
        </h2>
        <span className="font-[family-name:var(--font-glyph-mono)] text-[11px] uppercase tracking-[0.15em] text-white/45">
          {WORK.length} projects
        </span>
      </div>
      <div
        ref={trackRef}
        className="flex gap-6 md:gap-10 px-6 md:px-12 pb-16 md:pb-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-none md:h-[68vh] md:items-center will-change-transform"
      >
        {WORK.map((project) => (
          <WorkCard key={project.index} project={project} />
        ))}
      </div>
    </section>
  );
}

function WorkCard({ project }: { project: Project }) {
  const clickable = Boolean(project.href);
  const Wrapper = clickable ? "a" : "div";

  return (
    <Wrapper
      {...(clickable
        ? { href: project.href!, target: "_blank", rel: "noopener noreferrer" }
        : {})}
      data-cursor={clickable ? "View" : "Soon"}
      className="group shrink-0 snap-start w-[85vw] sm:w-[420px] md:w-[36vw] lg:w-[30vw] flex flex-col"
    >
      <div
        className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10"
        style={{
          background: `radial-gradient(circle at 30% 20%, hsl(${project.hue} / 0.55), transparent 60%), radial-gradient(circle at 80% 80%, hsl(${project.hue} / 0.3), transparent 55%), #111114`,
        }}
      >
        <div className="absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(45deg,#fff_0,#fff_1px,transparent_1px,transparent_10px)]" />
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <span className="font-[family-name:var(--font-glyph-serif)] italic text-[13vw] sm:text-[80px] text-white/10 select-none">
            {project.index}
          </span>
        </div>
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={16} className="text-white" />
        </div>
        <span className="absolute bottom-4 left-4 font-[family-name:var(--font-glyph-mono)] text-[10px] uppercase tracking-[0.1em] text-white/70 bg-black/30 backdrop-blur px-2.5 py-1 rounded-full">
          {project.year}
        </span>
      </div>
      <div className="pt-5 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-[family-name:var(--font-glyph-sans)] font-bold text-[19px] text-white leading-snug">
            {project.title}
          </h3>
        </div>
        <p className="font-[family-name:var(--font-glyph-mono)] text-[10px] uppercase tracking-[0.1em] text-[#D4FF3F]/80">
          {project.category}
        </p>
        <p className="font-[family-name:var(--font-glyph-sans)] text-[13px] text-white/50 leading-[1.6] pt-1">
          {project.description}
        </p>
      </div>
    </Wrapper>
  );
}
