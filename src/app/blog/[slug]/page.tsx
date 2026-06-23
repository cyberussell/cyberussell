import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ShareButtons from "@/components/ShareButtons";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Cyberussell`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.cyberussell.com/blog/${slug}`,
      type: "article",
      images: [{ url: slug === "how-to-earn-money-online-philippines-beginners" ? "/blog-og-skill-price.jpg" : "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [slug === "how-to-earn-money-online-philippines-beginners" ? "/blog-og-skill-price.jpg" : "/og-image.jpg"],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#0F0F1A] px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        {/* Meta */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border font-[family-name:var(--font-inter)] ${
              post.lang === "fil"
                ? "text-[#FFD23F] bg-[#FFD23F]/10 border-[#FFD23F]/20"
                : "text-[#00C97A] bg-[#00C97A]/10 border-[#00C97A]/20"
            }`}>
              {post.lang === "fil" ? "Filipino" : "English"}
            </span>
            <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/35">
              {new Date(post.date).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/35">· {post.readTime}</span>
          </div>

          <h1 className="font-sans text-[26px] md:text-[38px] font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8]">
            {post.description}
          </p>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/10 mb-8" />

        {/* Content */}
        <div
          className="prose-cyberussell"
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/10">
          {post.tags.map((tag) => (
            <span key={tag} className="font-[family-name:var(--font-inter)] text-[11px] text-white/35 bg-white/5 px-2.5 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        <ShareButtons slug={slug} title={post.title} />

        {/* CTA */}
        <div className="mt-10 bg-[#18181F] border border-white/[0.12] rounded-2xl p-6 text-center">
          <p className="font-sans text-[18px] font-bold text-white mb-2">Ready to find your income path?</p>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 mb-5">Use the free Skill Finder — type any skill and get your personalized income plan.</p>
          <a href="/#skill-finder" className="inline-block bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 px-8 rounded-lg hover:opacity-90 transition-all">
            Try the Skill Finder →
          </a>
        </div>

        {/* Nav */}
        <div className="flex justify-between mt-8">
          <a href="/blog" className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 hover:text-white transition-colors">
            ← All Articles
          </a>
          <a href="/" className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 hover:text-white transition-colors">
            cyberussell.com →
          </a>
        </div>
      </div>
    </main>
  );
}
