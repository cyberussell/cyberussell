import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIConfidenceAnalyzer from "@/components/AIConfidenceAnalyzer";
import { getToolBySlug } from "@/lib/tools-data";

const tool = getToolBySlug("ai-confidence-analyzer")!;

export const metadata: Metadata = {
  title: "AI Confidence Analyzer — Real AI Skills Test | Cyberussell",
  description:
    "Write real prompts graded by AI, spot a hallucination, compare AI responses — a practical test of how well you actually use AI, not trivia. Get your score and career matches. Free.",
  alternates: { canonical: "https://www.cyberussell.com/ai-tools/ai-confidence-analyzer" },
  openGraph: {
    title: "AI Confidence Analyzer — Real AI Skills Test",
    description:
      "Write real prompts graded by AI, spot a hallucination, compare AI responses. Get your AI Confidence Score and career matches.",
    url: "https://www.cyberussell.com/ai-tools/ai-confidence-analyzer",
    siteName: "Cyberussell",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Confidence Analyzer — Real AI Skills Test",
    description:
      "Not trivia — real tasks. Get your AI Confidence Score, strengths, weaknesses, and career matches.",
    images: ["/api/og"],
  },
};

const TASK_CATEGORIES = [
  "Writing prompts that get graded by AI in real time",
  "Spotting a hallucination in an AI-generated answer",
  "Comparing two AI responses for reliability",
  "Navigating scenarios around responsible AI use",
];

export default function AIConfidenceAnalyzerPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cyberussell.com" },
      { "@type": "ListItem", position: 2, name: "AI Tools", item: "https://www.cyberussell.com/tools" },
      { "@type": "ListItem", position: 3, name: "AI Confidence Analyzer", item: "https://www.cyberussell.com/ai-tools/ai-confidence-analyzer" },
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
              AI Confidence Analyzer
            </h1>
            <p className="font-[family-name:var(--font-inter)] text-[15px] md:text-[16px] text-white/50 max-w-xl mx-auto leading-[1.7]">
              Real tasks, not trivia. See how well you actually use AI — and get your prompts graded.
            </p>
          </div>

          <AIConfidenceAnalyzer />

          {/* What This Covers */}
          <div className="max-w-[760px] mx-auto mt-16">
            <h2 className="font-sans text-[22px] font-bold text-white mb-4">What the 11 Tasks Cover</h2>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.8] mb-5">
              This isn&apos;t a multiple-choice quiz about AI trivia — every task has you actually use AI the way
              you would on the job:
            </p>
            <div className="flex flex-col gap-3">
              {TASK_CATEGORIES.map((c) => (
                <div key={c} className="bg-[#18181F] border border-white/[0.08] rounded-lg p-4 font-[family-name:var(--font-inter)] text-[14px] text-white/65">
                  {c}
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
