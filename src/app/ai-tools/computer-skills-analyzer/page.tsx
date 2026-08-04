import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ComputerSkillsAnalyzer from "@/components/ComputerSkillsAnalyzer";
import { getToolBySlug } from "@/lib/tools-data";

const tool = getToolBySlug("computer-skills-analyzer")!;

export const metadata: Metadata = {
  title: "AI Computer Skills Analyzer — Hands-On Skills Test | Cyberussell",
  description:
    "13 hands-on simulations that measure your real computer skills — file management, typing, spreadsheets, uploads, word processing. Get an AI score and career matches. Free.",
  alternates: { canonical: "https://www.cyberussell.com/ai-tools/computer-skills-analyzer" },
  openGraph: {
    title: "AI Computer Skills Analyzer — Hands-On Skills Test",
    description:
      "Rename files, sort a spreadsheet, spot the real download button, format text — real simulations, not a quiz. Get your Computer Skills Score and career matches.",
    url: "https://www.cyberussell.com/ai-tools/computer-skills-analyzer",
    siteName: "Cyberussell",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Computer Skills Analyzer — Hands-On Skills Test",
    description:
      "Real simulations, not a quiz. Get your Computer Skills Score, strengths, weaknesses, and career matches.",
    images: ["/api/og"],
  },
};

const SIMULATED_TASKS = [
  "Rename a file correctly",
  "Organize files into the right folders",
  "Spot the real download button (vs. a fake ad)",
  "Sort and filter a spreadsheet",
  "Format text (bold, headings, alignment)",
  "Enter data accurately under time pressure",
];

export default function ComputerSkillsAnalyzerPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cyberussell.com" },
      { "@type": "ListItem", position: 2, name: "AI Tools", item: "https://www.cyberussell.com/tools" },
      { "@type": "ListItem", position: 3, name: "Computer Skills Analyzer", item: "https://www.cyberussell.com/ai-tools/computer-skills-analyzer" },
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
      <main className="min-h-screen bg-[#0F0F1A] px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#4F8EF7]/10 border border-[#4F8EF7]/20 rounded-full px-4 py-1.5 mb-4">
              <span className="text-[#4F8EF7] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
                AI-Powered Assessment
              </span>
            </div>
            <h1 className="font-sans text-[32px] md:text-[42px] font-bold text-white mb-3">
              AI Computer Skills Analyzer
            </h1>
            <p className="font-[family-name:var(--font-inter)] text-[15px] md:text-[16px] text-white/50 max-w-xl mx-auto leading-[1.7]">
              Real hands-on tasks, not a quiz. See how ready your practical computer skills are for online work.
            </p>
          </div>

          <ComputerSkillsAnalyzer />

          {/* What This Covers */}
          <div className="max-w-[760px] mx-auto mt-16">
            <h2 className="font-sans text-[22px] font-bold text-white mb-4">The 13 Hands-On Tasks</h2>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.8] mb-5">
              Unlike a multiple-choice quiz, every task here has you actually perform the action — the kind
              employers check for in entry-level virtual assistant and data entry roles:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SIMULATED_TASKS.map((task) => (
                <div key={task} className="bg-[#18181F] border border-white/[0.08] rounded-lg p-4 font-[family-name:var(--font-inter)] text-[14px] text-white/65">
                  {task}
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
        </div>
      </main>
      <Footer />
    </>
  );
}
