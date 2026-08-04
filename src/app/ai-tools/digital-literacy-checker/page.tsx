import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DigitalLiteracyChecker from "@/components/DigitalLiteracyChecker";
import { getToolBySlug } from "@/lib/tools-data";

const tool = getToolBySlug("digital-literacy-checker")!;

export const metadata: Metadata = {
  title: "AI Digital Literacy Checker — Free Skills Assessment | Cyberussell",
  description:
    "Test your digital literacy across internet, email, cloud files, video calls, and online security. Get an AI-powered score, strengths, weaknesses, and career matches. Free.",
  alternates: { canonical: "https://www.cyberussell.com/ai-tools/digital-literacy-checker" },
  openGraph: {
    title: "AI Digital Literacy Checker — Free Skills Assessment",
    description:
      "Answer questions that adapt to your skill level. Get your Digital Literacy Score, a personalized breakdown, and the online careers that match you best.",
    url: "https://www.cyberussell.com/ai-tools/digital-literacy-checker",
    siteName: "Cyberussell",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Digital Literacy Checker — Free Skills Assessment",
    description:
      "Answer questions that adapt to your skill level. Get your Digital Literacy Score and see which online careers match you best.",
    images: ["/api/og"],
  },
};

const SKILL_AREAS = [
  "Internet browsing and search",
  "Email — sending, attachments, etiquette",
  "Cloud files (Google Drive, uploads/downloads)",
  "Video calls (Zoom, Google Meet)",
  "Password and account security",
  "Basic troubleshooting",
];

export default function DigitalLiteracyCheckerPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cyberussell.com" },
      { "@type": "ListItem", position: 2, name: "AI Tools", item: "https://www.cyberussell.com/tools" },
      { "@type": "ListItem", position: 3, name: "Digital Literacy Checker", item: "https://www.cyberussell.com/ai-tools/digital-literacy-checker" },
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
              AI Digital Literacy Checker
            </h1>
            <p className="font-[family-name:var(--font-inter)] text-[15px] md:text-[16px] text-white/50 max-w-xl mx-auto leading-[1.7]">
              Find out how ready you are for online work — and which careers fit your current skills.
            </p>
          </div>

          <DigitalLiteracyChecker />

          {/* What This Covers */}
          <div className="max-w-[760px] mx-auto mt-16">
            <h2 className="font-sans text-[22px] font-bold text-white mb-4">What This Assessment Covers</h2>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.8] mb-5">
              Questions adapt to your skill level as you answer, across these areas:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SKILL_AREAS.map((area) => (
                <div key={area} className="bg-[#18181F] border border-white/[0.08] rounded-lg p-4 font-[family-name:var(--font-inter)] text-[14px] text-white/65">
                  {area}
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
