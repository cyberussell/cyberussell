import { getAllPosts } from "@/lib/blog";
import {
  HERO_SUBTEXT,
  HERO_CTA_BELOW,
  TRUST_BAR_ITEMS,
} from "@/data/content";
import SkillFinderWidget from "./SkillFinderWidget";
import HeroCTA from "./HeroCTA";

const COLOR_MAP: Record<string, string> = { red: "text-[#E8373A]", yellow: "text-[#FFD23F]" };

function renderHeroTitle(raw: string) {
  const parts = raw.split(/(\{(?:red|yellow)\}.*?\{\/(?:red|yellow)\})/g);
  return parts.map((part, i) => {
    const match = part.match(/^\{(red|yellow)\}(.*?)\{\/\1\}$/);
    if (match) return <span key={i} className={COLOR_MAP[match[1]]}>{match[2]}</span>;
    return <span key={i} className="text-white">{part}</span>;
  });
}

export default function Hero() {
  const posts = getAllPosts();
  const latestPost = posts[0] ?? null;
  const featuredPost = posts[1] ?? latestPost;

  return (
    <main id="hero" className="bg-[#0F0F1A] relative flex flex-col flex-grow overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px]"
        style={{ background: "radial-gradient(circle at top right, rgba(232,55,58,0.14), transparent 50%)" }}
      />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pt-16 md:pt-20 pb-12 flex flex-col lg:flex-row gap-12 lg:gap-6 items-start relative z-10">
        {/* Left column */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          {/* Latest article banner */}
          {latestPost && (
            <a
              href={`/blog/${latestPost.slug}`}
              className="group flex items-start gap-3 bg-gradient-to-r from-[#E8373A]/10 to-[#FFD23F]/5 border border-[#E8373A]/20 rounded-xl p-4 hover:border-[#E8373A]/40 transition-all"
            >
              <span className="shrink-0 mt-0.5 bg-[#E8373A] text-white text-[10px] font-bold uppercase tracking-[0.08em] px-2.5 py-1 rounded-md font-[family-name:var(--font-inter)]">
                New
              </span>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="font-[family-name:var(--font-inter)] text-[14px] md:text-[15px] font-bold text-white leading-snug group-hover:text-[#FFD23F] transition-colors line-clamp-2">
                  {latestPost.title}
                </span>
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/40">
                  {latestPost.readTime} · Read now →
                </span>
              </div>
            </a>
          )}

          {featuredPost ? (
            <a href={`/blog/${featuredPost.slug}`} className="group flex flex-col gap-4">
              <h1 className="font-sans text-[34px] md:text-[52px] font-extrabold leading-[1.1] tracking-tight">
                {featuredPost.heroTitle ? renderHeroTitle(featuredPost.heroTitle) : <span className="text-white">{featuredPost.title}</span>}
              </h1>
              <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/65 max-w-[480px] leading-[1.8]">
                {featuredPost.description}
              </p>
            </a>
          ) : (
            <>
              <h1 className="font-sans text-[34px] md:text-[52px] font-extrabold leading-[1.1] tracking-tight">
                <span className="text-white">2.41 million</span>{" "}
                <span className="text-[#E8373A]">Filipinos have no job.</span>
                <br />
                <span className="text-white">Will you be the next one</span>{" "}
                <span className="text-[#FFD23F]">to break free?</span>
              </h1>
              <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/65 max-w-[480px] leading-[1.8]">
                {HERO_SUBTEXT}
              </p>
            </>
          )}

          <HeroCTA ctaBelow={HERO_CTA_BELOW} />
        </div>

        {/* Right column: Skill Finder widget */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <SkillFinderWidget />
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-[#F7F7FB] text-[#0F0F1A] border-t border-b border-black/5 py-5 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-center items-center">
          <span className="font-sans text-[18px] md:text-[22px] font-bold text-center">
            {TRUST_BAR_ITEMS[0]}
          </span>
        </div>
      </div>
    </main>
  );
}
