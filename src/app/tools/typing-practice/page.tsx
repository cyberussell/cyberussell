import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TypingPracticeShell from "@/components/TypingPracticeShell";
import { getToolBySlug } from "@/lib/tools-data";

const tool = getToolBySlug("typing-practice")!;

export const metadata: Metadata = {
  title: "Typing Practice — Free Typing Speed Test with Keyboard | Cyberussell",
  description: "Practice typing with a full interactive keyboard. Track your WPM, accuracy, and time. Free, no sign-up required.",
  alternates: { canonical: "https://www.cyberussell.com/tools/typing-practice" },
  openGraph: {
    title: "Typing Practice — Free Typing Speed Test | Cyberussell",
    description: "Practice typing with a full interactive keyboard. Track WPM, accuracy, and time. Free.",
    url: "https://www.cyberussell.com/tools/typing-practice",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Typing Practice — Free Typing Speed Test | Cyberussell",
    description: "Practice typing with a full interactive keyboard. Track WPM, accuracy, and time.",
  },
};

export default function TypingPracticePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cyberussell.com" },
      { "@type": "ListItem", position: 2, name: "AI Tools", item: "https://www.cyberussell.com/tools" },
      { "@type": "ListItem", position: 3, name: "Typing Practice", item: "https://www.cyberussell.com/tools/typing-practice" },
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&display=swap" rel="stylesheet" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <TypingPracticeShell />

      <div className="bg-[#0F0F1A] px-6 md:px-10 pb-24">
        {/* FAQ */}
        <div className="max-w-[760px] mx-auto mt-6">
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

      <Footer />
    </>
  );
}
