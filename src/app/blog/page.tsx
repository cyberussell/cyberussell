import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog — Cyberussell | Earn Online Philippines",
  description: "Practical guides for Filipinos who want to earn money online. Tips, platforms, and honest advice — in English and Filipino.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-[#0F0F1A] px-6 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Blog
            </span>
          </div>
          <h1 className="font-sans text-[28px] md:text-[42px] font-bold text-white mb-4 leading-tight">
            Guides & Tips for Earning Online
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8]">
            Practical, honest articles for Filipinos who want to earn online — written in English and Filipino.
          </p>
        </div>

        {/* Posts */}
        <div className="flex flex-col gap-5">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-[#18181F] border border-white/[0.12] rounded-2xl p-6 md:p-8 hover:border-white/25 hover:-translate-y-[2px] transition-all duration-200 block"
            >
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border font-[family-name:var(--font-inter)] ${
                  post.lang === "fil"
                    ? "text-[#FFD23F] bg-[#FFD23F]/10 border-[#FFD23F]/20"
                    : "text-[#00C97A] bg-[#00C97A]/10 border-[#00C97A]/20"
                }`}>
                  {post.lang === "fil" ? "Filipino" : "English"}
                </span>
                <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/30">
                  {new Date(post.date).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}
                </span>
                <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/30">
                  · {post.readTime}
                </span>
              </div>
              <h2 className="font-sans text-[18px] md:text-[22px] font-bold text-white mb-2 leading-snug">
                {post.title}
              </h2>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.8] mb-4">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="font-[family-name:var(--font-inter)] text-[11px] text-white/35 bg-white/5 px-2.5 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        {/* Back link */}
        <div className="text-center mt-12">
          <a href="/" className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 hover:text-white transition-colors">
            ← Back to cyberussell.com
          </a>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
