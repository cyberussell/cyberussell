import { getAllPosts } from "@/lib/blog";
import {
  HERO_SUBTEXT,
} from "@/data/content";
import { getAllCareers } from "@/lib/careers/data";
import SkillFinderWidget from "./SkillFinderWidget";
import HeroCTA from "./HeroCTA";

export default function Hero() {
  const posts = getAllPosts();
  const latestPost = posts[0] ?? null;
  const careerSlugs = getAllCareers().map((c) => c.slug);

  return (
    <main id="hero" className="bg-[#0F0F1A] relative flex flex-col flex-grow overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px]"
        style={{ background: "radial-gradient(circle at top right, rgba(232,55,58,0.14), transparent 50%)" }}
      />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pt-16 md:pt-20 pb-12 flex flex-col lg:flex-row gap-12 lg:gap-6 items-start relative z-10">
        {/* Left column */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="font-sans text-[34px] md:text-[52px] font-extrabold leading-[1.1] tracking-tight">
            <span className="text-white">You have a skill.</span>
            <br />
            <span className="text-[#FFD23F]">Find out how to earn from it</span>{" "}
            <span className="text-[#E8373A]">online.</span>
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/65 max-w-[480px] leading-[1.8]">
            {HERO_SUBTEXT}
          </p>

          <HeroCTA />

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
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/55">
                  {latestPost.readTime} · Read now →
                </span>
              </div>
            </a>
          )}
        </div>

        {/* Right column: Skill Finder widget */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <SkillFinderWidget careerSlugs={careerSlugs} />
        </div>
      </div>

    </main>
  );
}
