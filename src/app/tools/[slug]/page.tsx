import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tools, getToolBySlug, getRelatedTools } from "@/lib/tools-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: tool.seo.title,
    description: tool.seo.description,
    alternates: { canonical: `https://www.cyberussell.com/tools/${tool.slug}` },
    openGraph: {
      title: tool.seo.title,
      description: tool.seo.description,
      url: `https://www.cyberussell.com/tools/${tool.slug}`,
      siteName: "Cyberussell",
      images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.seo.title,
      description: tool.seo.description,
      images: ["/og-image.jpg?v=2"],
    },
  };
}

const STATUS_STYLES: Record<string, string> = {
  Free: "text-[#00C97A] bg-[#00C97A]/10 border-[#00C97A]/20",
  Beta: "text-[#FFD23F] bg-[#FFD23F]/10 border-[#FFD23F]/20",
  Premium: "text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/20",
  "Coming Soon": "text-white/40 bg-white/5 border-white/10",
};

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const related = getRelatedTools(tool.relatedTools);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cyberussell.com" },
      { "@type": "ListItem", position: 2, name: "AI Tools", item: "https://www.cyberussell.com/tools" },
      { "@type": "ListItem", position: 3, name: tool.name, item: `https://www.cyberussell.com/tools/${tool.slug}` },
    ],
  };

  const faqSchema = tool.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  } : null;

  const isComingSoon = tool.status === "Coming Soon";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <div className="max-w-3xl mx-auto px-6 md:px-10 pt-10 pb-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/tools" className="hover:text-white transition-colors">AI Tools</a>
            <span>/</span>
            <span className="text-white/60">{tool.name}</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[40px]">{tool.icon}</span>
              <span
                className={`font-[family-name:var(--font-inter)] text-[11px] font-bold border px-2.5 py-1 rounded-full ${STATUS_STYLES[tool.status]}`}
              >
                {tool.status}
              </span>
            </div>
            <span className="inline-block text-[10px] font-bold font-[family-name:var(--font-inter)] tracking-[0.08em] uppercase text-[#E8373A] bg-[#E8373A]/8 border border-[#E8373A]/20 px-2.5 py-1 rounded-full mb-3">
              {tool.category}
            </span>
            <h1 className="font-sans text-[32px] md:text-[42px] font-bold text-white mb-4 leading-tight">
              {tool.name}
            </h1>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/65 leading-[1.8]">
              {tool.longDescription}
            </p>
          </div>

          {/* CTA */}
          {isComingSoon ? (
            <div className="bg-[#18181F] border border-white/[0.08] rounded-xl p-6 mb-10 text-center">
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 mb-3">
                This tool is coming soon. Join the newsletter to get notified when it launches.
              </p>
              <a
                href="/#subscribe"
                className="inline-block bg-[#FFD23F] text-[#0F0F1A] font-bold font-[family-name:var(--font-inter)] text-[14px] px-6 py-3 rounded-lg hover:opacity-90 transition-all"
              >
                Notify Me When It Launches
              </a>
            </div>
          ) : (
            <a
              href={tool.ctaUrl}
              className="inline-block bg-[#E8373A] text-white font-bold font-[family-name:var(--font-inter)] text-[15px] px-8 py-3.5 rounded-lg hover:opacity-90 transition-all mb-10"
            >
              {tool.ctaLabel}
            </a>
          )}

          {/* FAQ */}
          {tool.faq.length > 0 && (
            <section className="mb-10">
              <h2 className="font-sans text-[22px] font-bold text-white mb-5">
                Frequently Asked Questions
              </h2>
              <div className="flex flex-col gap-4">
                {tool.faq.map((item, i) => (
                  <div key={i} className="bg-[#18181F] border border-white/[0.08] rounded-xl p-5">
                    <h3 className="font-sans text-[15px] font-bold text-white mb-2">
                      {item.question}
                    </h3>
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Tools */}
          {related.length > 0 && (
            <section className="mb-10">
              <h2 className="font-sans text-[20px] font-bold text-white mb-4">
                Related AI Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map((rt) => (
                  <a
                    key={rt.slug}
                    href={`/tools/${rt.slug}`}
                    className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-4 hover:border-white/20 transition-all group flex items-center gap-3"
                  >
                    <span className="text-[22px]">{rt.icon}</span>
                    <div>
                      <p className="text-white text-[14px] font-bold group-hover:text-[#FFD23F] transition-colors">
                        {rt.name}
                      </p>
                      <p className="text-white/40 text-[12px] font-[family-name:var(--font-inter)]">
                        {rt.category}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Related Guides */}
          {tool.relatedGuides.length > 0 && (
            <section className="mb-10">
              <h2 className="font-sans text-[20px] font-bold text-white mb-4">
                Related Guides
              </h2>
              <div className="flex flex-col gap-2">
                {tool.relatedGuides.map((g, i) => (
                  <a
                    key={i}
                    href={g.href}
                    className="font-[family-name:var(--font-inter)] text-[14px] text-[#FFD23F] hover:text-white transition-colors"
                  >
                    📖 {g.label} →
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Related Articles */}
          {tool.relatedArticles.length > 0 && (
            <section className="mb-10">
              <h2 className="font-sans text-[20px] font-bold text-white mb-4">
                Related Articles
              </h2>
              <div className="flex flex-col gap-2">
                {tool.relatedArticles.map((a, i) => (
                  <a
                    key={i}
                    href={a.href}
                    className="font-[family-name:var(--font-inter)] text-[14px] text-[#FFD23F] hover:text-white transition-colors"
                  >
                    📄 {a.label} →
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Back link */}
          <div className="border-t border-white/[0.08] pt-8">
            <a
              href="/tools"
              className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 hover:text-white transition-colors"
            >
              ← Back to All AI Tools
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
