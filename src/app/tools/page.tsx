import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free AI & Business Tools — Cyberussell",
  description:
    "Free tools to help Filipino freelancers and small businesses earn more online. Coming soon.",
};

const tools = [
  {
    title: "Prompt Trainer",
    desc: "Score your AI prompts, see what's weak, and get upgraded versions for Claude, ChatGPT, and Gemini.",
    href: "/tools/prompt-forge",
    tag: "AI Prompts",
  },
  {
    title: "Scam Scanner",
    desc: "Paste any job posting or online opportunity. AI detects red flags and scam patterns common in the Philippines.",
    href: "/tools/scam-scanner",
    tag: "Safety",
  },
];

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] px-6 md:px-10 py-10 pb-24 max-w-7xl mx-auto">
        <h1 className="text-white text-[28px] md:text-[36px] font-bold mb-2">
          Free AI & Business Tools
        </h1>
        <p className="text-white/45 text-[15px] md:text-[16px] max-w-lg leading-relaxed mb-10 font-[family-name:var(--font-inter)]">
          Free tools to help Filipino freelancers and small businesses work smarter with AI.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 hover:border-white/20 transition-all group"
            >
              <span className="inline-block text-[11px] font-bold font-[family-name:var(--font-inter)] tracking-[0.08em] uppercase text-[#E8373A] bg-[#E8373A]/8 border border-[#E8373A]/20 px-2.5 py-1 rounded-full mb-3">
                {tool.tag}
              </span>
              <h2 className="text-white text-[18px] font-bold mb-2 group-hover:text-[#FFD23F] transition-colors">
                {tool.title}
              </h2>
              <p className="text-white/40 text-[14px] leading-[1.6] font-[family-name:var(--font-inter)]">
                {tool.desc}
              </p>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
