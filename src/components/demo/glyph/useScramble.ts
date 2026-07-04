"use client";

import { useState, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function useScramble(text: string) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const raf = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    setDisplay(text);
    frame.current = 0;
  }, [text]);

  const start = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    frame.current = 0;
    const totalFrames = 18;

    const tick = () => {
      frame.current += 1;
      const progress = frame.current / totalFrames;
      const revealCount = Math.floor(progress * text.length);

      const next = text
        .split("")
        .map((char, i) => {
          if (char === " " || char === "@" || char === ".") return char;
          if (i < revealCount) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(next);

      if (frame.current < totalFrames) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    raf.current = requestAnimationFrame(tick);
  }, [text]);

  return { display, start, stop };
}
