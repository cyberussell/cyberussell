"use client";

import { useState, useEffect } from "react";

export default function StickyBottomBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="#hero"
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}
      style={{ height: 56, boxShadow: "0 -4px 20px rgba(232,55,58,0.4)" }}
    >
      ↑ Find your earning path — Free, No Sign-up
    </a>
  );
}
