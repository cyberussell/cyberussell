"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[2px]"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(34,211,238,0.35) 48px, rgba(34,211,238,0.35) calc(100% - 48px), transparent)",
      }}
    >
      <div
        ref={barRef}
        className="h-full w-0"
        style={{ background: "#22D3EE", boxShadow: "0 0 12px #22D3EE" }}
      />
    </div>
  );
}
