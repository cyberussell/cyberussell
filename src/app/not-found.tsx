import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — Cyberussell",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0F0F1A] flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-6">
        <span className="font-sans text-[80px] md:text-[100px] font-extrabold text-white/10 leading-none select-none">
          404
        </span>
      </div>

      <h1 className="font-sans text-[26px] md:text-[36px] font-bold text-white mb-4 leading-tight">
        This page doesn&apos;t exist.
      </h1>
      <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 max-w-[400px] leading-[1.8] mb-10">
        But your income path does. Head back and use the free Skill Finder to find it.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <a
          href="/"
          className="bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 px-8 rounded-lg hover:opacity-90 transition-all"
        >
          ← Back to Homepage
        </a>
        <a
          href="/#skill-finder"
          className="bg-[#18181F] border border-white/10 text-white/70 font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 px-8 rounded-lg hover:border-white/30 hover:text-white transition-all"
        >
          Try the Skill Finder
        </a>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-5">
        {[
          { label: "Blog", href: "/blog" },
          { label: "Free Downloads", href: "/#downloads" },
          { label: "Find Work", href: "/platforms" },
          { label: "Contact", href: "/contact" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="font-[family-name:var(--font-inter)] text-[14px] text-white/35 hover:text-white transition-colors"
          >
            {label}
          </a>
        ))}
      </div>
    </main>
  );
}
