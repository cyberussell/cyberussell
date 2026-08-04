import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PromptForge from "@/components/PromptForge";
import { getToolBySlug } from "@/lib/tools-data";

const tool = getToolBySlug("prompt-forge")!;

export const metadata: Metadata = {
  title: "Prompt Trainer — Learn to Write Better AI Prompts | Cyberussell",
  description:
    "Free AI-powered tool that scores your prompts, explains what's weak, and gives you specific tips to improve. Powered by Claude AI.",
  alternates: { canonical: "https://www.cyberussell.com/tools/prompt-forge" },
  openGraph: {
    title: "Prompt Trainer — Learn to Write Better AI Prompts",
    description:
      "Paste any prompt. Get an AI-powered score, detailed breakdown, and specific tips to improve — free.",
    url: "https://www.cyberussell.com/tools/prompt-forge",
    siteName: "Cyberussell",
    images: [{ url: "/og/og-prompt-forge.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Paste your prompt",
    desc: "Any draft, even a lazy one-liner. There's no wrong way to start.",
  },
  {
    step: "2",
    title: "AI scores 6 dimensions",
    desc: "Claude AI grades clarity, specificity, context, constraints, output structure, and creativity potential — each 0–100.",
  },
  {
    step: "3",
    title: "Get a rewrite and tips",
    desc: "You get a Prompt Power Score, a plain-language assessment, and specific tips to upgrade your next prompt.",
  },
];

const PROMPT_QUALITIES = [
  { name: "Clarity", desc: "The AI shouldn't have to guess what you're asking for." },
  { name: "Specificity", desc: "Concrete details beat vague requests — name the topic, audience, and goal." },
  { name: "Context", desc: "Background info (who it's for, why, what's been tried) shapes a better answer." },
  { name: "Constraints", desc: "Length, tone, format, or things to avoid — constraints narrow the AI toward what you actually want." },
  { name: "Output Structure", desc: "Telling the AI how to format the answer (list, table, steps) saves you rework." },
  { name: "Creativity Potential", desc: "Prompts that leave room for the AI to contribute ideas, not just fill in blanks." },
];

export default function PromptForgePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cyberussell.com" },
      { "@type": "ListItem", position: 2, name: "AI Tools", item: "https://www.cyberussell.com/tools" },
      { "@type": "ListItem", position: 3, name: "Prompt Trainer", item: "https://www.cyberussell.com/tools/prompt-forge" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="px-6 md:px-10 py-10 pb-24 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase text-[#E8373A] bg-[#E8373A]/8 border border-[#E8373A]/25 px-3 py-1 rounded-full mb-4 font-[family-name:var(--font-inter)]">
            Free Tool
          </div>
          <h1 className="font-sans text-[32px] md:text-[42px] font-bold text-white leading-[1.1] mb-3">
            Turn weak prompts into{" "}
            <span className="text-[#FFD23F]">strong</span> instructions.
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[15px] md:text-[16px] text-white/60 leading-[1.6]">
            Paste anything — even a lazy one-liner. Claude AI scores it,
            explains exactly what&apos;s wrong, and tells you how to fix it.
            10 free analyses per day.
          </p>
        </div>
        <PromptForge />

        {/* How It Works */}
        <div className="max-w-[760px] mx-auto mt-16">
          <h2 className="font-sans text-[22px] font-bold text-white mb-6">How the Prompt Trainer Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.step} className="bg-[#18181F] border border-white/[0.08] rounded-xl p-5">
                <div className="text-[#FFD23F] font-sans text-[13px] font-bold mb-2">Step {s.step}</div>
                <h3 className="font-sans text-[15px] font-bold text-white mb-2">{s.title}</h3>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.7]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What Makes a Strong Prompt */}
        <div className="max-w-[760px] mx-auto mt-14">
          <h2 className="font-sans text-[22px] font-bold text-white mb-4">
            What Makes a Strong AI Prompt
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.8] mb-5">
            The Prompt Trainer scores every prompt across these six dimensions — the same ones that separate a
            vague one-liner from a prompt that gets you a genuinely useful answer:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROMPT_QUALITIES.map((q) => (
              <div key={q.name} className="bg-[#18181F] border border-white/[0.08] rounded-lg p-4">
                <h3 className="font-sans text-[14px] font-bold text-white mb-1.5">{q.name}</h3>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.7]">
                  {q.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-[760px] mx-auto mt-14">
          <h2 className="font-sans text-[22px] font-bold text-white mb-5">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {tool.faq.map((item, i) => (
              <div key={i} className="bg-[#18181F] border border-white/[0.08] rounded-xl p-5">
                <h3 className="font-sans text-[15px] font-bold text-white mb-2">{item.question}</h3>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
