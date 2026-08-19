"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";
import { STYLISTS } from "./data";
import { fadeUp } from "./motion";
import StylistProfile from "./StylistProfile";

/**
 * Runs `update` inside a native View Transition when the browser supports it
 * and the visitor hasn't asked for reduced motion; otherwise applies it
 * directly (instant, no morph) — the required graceful fallback.
 */
function withViewTransition(update: () => void) {
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const supportsViewTransitions =
    typeof document !== "undefined" && typeof document.startViewTransition === "function";

  if (prefersReducedMotion || !supportsViewTransitions) {
    update();
    return;
  }

  document.startViewTransition(() => {
    flushSync(update);
  });
}

export default function Stylists() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastOpenedSlug = useRef<string | null>(null);

  const openProfile = useCallback((slug: string) => {
    lastOpenedSlug.current = slug;
    withViewTransition(() => {
      window.history.pushState({ stylist: slug }, "", `#${slug}`);
      setActiveSlug(slug);
    });
  }, []);

  const closeProfile = useCallback(() => {
    if (window.location.hash) {
      window.history.back();
    } else {
      withViewTransition(() => setActiveSlug(null));
    }
  }, []);

  // Deep-link support + browser Back/Forward: the URL hash is the source of
  // truth, so popstate (including the physical Back button) reverses the
  // transition naturally instead of needing bespoke "go back" logic.
  useEffect(() => {
    const initialSlug = window.location.hash.slice(1);
    if (STYLISTS.some((s) => s.slug === initialSlug)) {
      setActiveSlug(initialSlug);
    }

    function onPopState() {
      const slug = window.location.hash.slice(1);
      const match = STYLISTS.find((s) => s.slug === slug);
      withViewTransition(() => setActiveSlug(match ? match.slug : null));
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (activeSlug) {
      closeButtonRef.current?.focus();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
    if (lastOpenedSlug.current) {
      triggerRefs.current.get(lastOpenedSlug.current)?.focus();
    }
  }, [activeSlug]);

  useEffect(() => {
    if (!activeSlug) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeProfile();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeSlug, closeProfile]);

  const activeStylist = STYLISTS.find((s) => s.slug === activeSlug) ?? null;

  return (
    <section id="stylists" className="bg-[#f6f1e9] px-[8%] py-16 md:py-[110px]">
      {/* Per-stylist view-transition timing/easing + artifact prevention.
          Names are per-stylist (unique, stable), so each needs its own
          selector — the View Transitions spec has no wildcard matching. */}
      <style>{`
        ${STYLISTS.map(
          (s) => `
        ::view-transition-group(stylist-portrait-${s.slug}),
        ::view-transition-group(stylist-name-${s.slug}),
        ::view-transition-group(stylist-role-${s.slug}) {
          animation-duration: 700ms;
          animation-timing-function: cubic-bezier(.22, 1, .36, 1);
        }
        ::view-transition-old(stylist-portrait-${s.slug}),
        ::view-transition-new(stylist-portrait-${s.slug}),
        ::view-transition-old(stylist-name-${s.slug}),
        ::view-transition-new(stylist-name-${s.slug}),
        ::view-transition-old(stylist-role-${s.slug}),
        ::view-transition-new(stylist-role-${s.slug}) {
          animation: none;
          mix-blend-mode: normal;
        }
        `
        ).join("\n")}

        ::view-transition-new(stylist-profile-content) {
          animation: stylist-profile-fade-up 450ms cubic-bezier(.22, 1, .36, 1) 160ms both;
        }
        ::view-transition-old(stylist-profile-content) {
          animation: none;
          opacity: 0;
        }
        @keyframes stylist-profile-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          ::view-transition-group(*),
          ::view-transition-old(*),
          ::view-transition-new(*) {
            animation-duration: 0.01ms !important;
            animation-delay: 0s !important;
          }
        }
      `}</style>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-[60px]"
      >
        <div className="font-[family-name:var(--font-playfair)] italic text-[18px] text-[#c9a15a] mb-2.5">
          The people
        </div>
        <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-[32px] md:text-[42px] text-[#241f1a]">
          Our Stylists
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-7 max-w-[1280px] mx-auto">
        {STYLISTS.map((person, i) => {
          const isOpen = activeSlug === person.slug;
          return (
            <motion.div
              key={person.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
            >
              <button
                type="button"
                ref={(el) => {
                  if (el) triggerRefs.current.set(person.slug, el);
                }}
                onClick={() => openProfile(person.slug)}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                className="flex flex-col gap-4 w-full text-left rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a15a]"
              >
                {/* While this stylist's profile is open, the profile overlay
                    owns these view-transition-names — omitting them here
                    avoids two elements sharing one name in the same DOM
                    snapshot (the grid card is hidden behind the overlay
                    anyway). */}
                <div
                  className="relative w-full h-[200px] md:h-[320px]"
                  style={!isOpen ? ({ viewTransitionName: `stylist-portrait-${person.slug}` } as CSSProperties) : undefined}
                >
                  <Image
                    src={person.photo}
                    alt={`${person.name}, ${person.role}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div
                    className="font-[family-name:var(--font-cormorant)] font-semibold text-[18px] md:text-[20px] text-[#241f1a]"
                    style={!isOpen ? ({ viewTransitionName: `stylist-name-${person.slug}` } as CSSProperties) : undefined}
                  >
                    {person.name}
                  </div>
                  <div
                    className="text-[11px] md:text-[12.5px] tracking-[0.5px] uppercase text-[#8a8378] mt-1"
                    style={!isOpen ? ({ viewTransitionName: `stylist-role-${person.slug}` } as CSSProperties) : undefined}
                  >
                    {person.role}
                  </div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {activeStylist && <StylistProfile stylist={activeStylist} onClose={closeProfile} ref={closeButtonRef} />}
    </section>
  );
}
