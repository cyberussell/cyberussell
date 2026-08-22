"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function ensureRegistered() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scopes a GSAP timeline/ScrollTrigger setup to a ref's subtree and reverts
 * it automatically on unmount. No-ops entirely under prefers-reduced-motion
 * so sections just render in their resting state.
 */
export function useGsapScope<T extends HTMLElement>(
  setup: (scope: T) => void,
  deps: unknown[] = []
) {
  const scopeRef = useRef<T | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !scopeRef.current) return;
    ensureRegistered();
    const ctx = gsap.context(() => setup(scopeRef.current as T), scopeRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}

/** Fades+lifts every matched element in on scroll — the shared reveal used across sections. */
export function applyScrollReveal(els: NodeListOf<Element> | Element[]) {
  els.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      }
    );
  });
}

export { gsap };
