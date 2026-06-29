import { ArrowRight, Search, Compass, BookOpen } from "lucide-react";
import { getAllCareers } from "@/lib/careers/data";

export default function ChoosePath() {
  const careers = getAllCareers();

  return (
    <section className="bg-[#111118] py-14 md:py-20 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] mb-4 block">
            Where Do You Want to Start?
          </span>
          <h2 className="font-sans text-[28px] md:text-[40px] font-bold text-white leading-tight mb-4">
            Choose your path.
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/45 max-w-[480px] mx-auto leading-[1.7]">
            Every journey starts differently. Pick the one that feels right.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {/* Path 1: I know my skill */}
          <a
            href="/careers"
            className="group relative bg-[#18181F] border border-white/[0.08] rounded-2xl p-7 md:p-8 flex flex-col gap-4 hover:border-[#FFD23F]/25 hover:-translate-y-[2px] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FFD23F]/10 border border-[#FFD23F]/20 flex items-center justify-center">
              <Search size={22} className="text-[#FFD23F]" strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="font-sans text-[20px] md:text-[22px] font-bold text-white mb-2 group-hover:text-[#FFD23F] transition-colors">
                I already know my skill
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 leading-[1.7]">
                Browse {careers.length} Career Blueprints with step-by-step roadmaps, income paths, and tools for skills like Writing, Canva, Video Editing, and more.
              </p>
            </div>
            <div className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[13px] font-bold text-[#FFD23F]/70 group-hover:text-[#FFD23F] transition-colors mt-auto">
              Browse Career Blueprints
              <ArrowRight size={15} strokeWidth={2.5} />
            </div>
          </a>

          {/* Path 2: I don't know */}
          <a
            href="/discover"
            className="group relative bg-[#18181F] border border-white/[0.08] rounded-2xl p-7 md:p-8 flex flex-col gap-4 hover:border-[#E8373A]/25 hover:-translate-y-[2px] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-[#E8373A]/10 border border-[#E8373A]/20 flex items-center justify-center">
              <Compass size={22} className="text-[#E8373A]" strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="font-sans text-[20px] md:text-[22px] font-bold text-white mb-2 group-hover:text-[#E8373A] transition-colors">
                I don&apos;t know where to start
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 leading-[1.7]">
                Answer 6 quick questions and discover hidden skills you didn&apos;t know you had. We&apos;ll match you with the best Career Blueprint for you.
              </p>
            </div>
            <div className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[13px] font-bold text-[#E8373A]/70 group-hover:text-[#E8373A] transition-colors mt-auto">
              Discover Your Best Skill
              <ArrowRight size={15} strokeWidth={2.5} />
            </div>
          </a>
        </div>

        {/* Explore more */}
        <div className="flex items-center justify-center">
          <a
            href="/#downloads"
            className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[13px] text-white/30 hover:text-white/50 transition-colors"
          >
            <BookOpen size={14} strokeWidth={2} />
            Or explore free guides and tools below
          </a>
        </div>
      </div>
    </section>
  );
}
