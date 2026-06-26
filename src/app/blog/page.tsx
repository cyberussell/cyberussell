import type { Metadata } from "next";
import { getAllPostsWithContent } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogShelfWithReader from "@/components/BlogShelfWithReader";

export const metadata: Metadata = {
  title: "Earn Money Online Philippines — Guides & Tips | Cyberussell",
  description: "Practical, honest articles for Filipinos who want to earn online — written in English and Filipino.",
  alternates: { canonical: "https://www.cyberussell.com/blog" },
  openGraph: {
    title: "Earn Money Online Philippines — Guides & Tips | Cyberussell",
    description: "Practical, honest articles for Filipinos who want to earn online — written in English and Filipino.",
    url: "https://www.cyberussell.com/blog",
    siteName: "Cyberussell",
    images: [{ url: "/blog-og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Earn Money Online Philippines — Guides & Tips | Cyberussell",
    description: "Practical, honest articles for Filipinos who want to earn online — written in English and Filipino.",
    images: ["/blog-og.png"],
  },
};

export default async function BlogPage() {
  const posts = await getAllPostsWithContent();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cyberussell.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.cyberussell.com/blog" },
    ],
  };

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <Navbar />
    <main className="min-h-screen bg-[#0F0F1A] px-6 py-16 md:py-24">
      <div>
        {/* Header */}
        <div className="text-center mb-10 md:mb-6 max-w-3xl mx-auto">
          <p className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[2px] text-white/25 mb-3">
            Guides
          </p>
          <h1 className="font-sans text-[28px] md:text-[42px] font-bold text-white leading-tight">
            Guides for Earning Online
          </h1>
          <p className="hidden md:block font-[family-name:var(--font-inter)] mt-3" style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
            Hover a book to peek, click to read
          </p>
        </div>

        <BlogShelfWithReader posts={posts} />

        {/* Back link */}
        <div className="text-center mt-10">
          <a href="/" className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 hover:text-white transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
