"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, ArrowRight, CheckSquare, Lightbulb, Trophy } from "lucide-react";

export interface LessonSection {
  heading: string;
  body?: string;
  items?: { title?: string; desc: string }[];
  twoCol?: { left: { label: string; items: string[] }; right: { label: string; items: string[] } };
  cards?: { title: string; body: string; color?: string }[];
  comparison?: { a: { label: string; items: string[] }; b: { label: string; items: string[] } };
}

export interface SkillLessonProps {
  skill: string;
  skillHref: string;
  lessonNum: string;
  lessonTotal: string;
  title: string;
  subtitle: string;
  tags: string[];
  readTime: string;
  objective: string;
  sections: LessonSection[];
  promptText: string;
  checklistItems: string[];
  reflectText: string;
  challengeTitle: string;
  challengeBody: string;
  takeaways: string[];
  nextTitle: string;
  nextHref: string;
  nextMeta: string;
}

const COLOR = "#E8373A";

export default function SkillLessonLayout(p: SkillLessonProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        {/* Breadcrumb */}
        <div className="px-6 md:px-10 pt-10 max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8 flex-wrap">
            <a href="/" className="hover:text-white transition-colors">Home</a><span>/</span>
            <a href="/learn/skills" className="hover:text-white transition-colors">Build Real Skills</a><span>/</span>
            <a href={p.skillHref} className="hover:text-white transition-colors">{p.skill}</a><span>/</span>
            <span className="text-white/60">{p.title}</span>
          </nav>
        </div>

        {/* Header */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]" style={{ backgroundColor: `${COLOR}15`, color: COLOR }}>
              <Wrench size={10} /> Beginner
            </span>
            {p.tags.map(t => (
              <span key={t} className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">{t}</span>
            ))}
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">{p.readTime}</span>
          </div>
          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            {p.skill} · Lesson {p.lessonNum} of {p.lessonTotal}
          </p>
          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">{p.title}</h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">{p.subtitle}</p>
        </section>

        {/* Objective */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="rounded-[14px] p-5" style={{ backgroundColor: `${COLOR}10`, border: `1px solid ${COLOR}30` }}>
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2px] mb-2" style={{ color: COLOR }}>After This Lesson, You Will Be Able To</p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">{p.objective}</p>
          </div>
        </section>

        {/* Content Sections */}
        {p.sections.map((s, i) => (
          <section key={i} className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
            <h2 className="font-sans text-[20px] font-bold text-white mb-4">{s.heading}</h2>
            {s.body && <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9]" dangerouslySetInnerHTML={{ __html: s.body.replace(/\n/g, '<br/><br/>') }} />}
            {s.items && (
              <div className="space-y-3 mt-4">
                {s.items.map((item, j) => (
                  <div key={j} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-5">
                    {item.title && <p className="font-sans text-[15px] font-bold text-white mb-2">{item.title}</p>}
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 leading-[1.7]">{item.desc}</p>
                  </div>
                ))}
              </div>
            )}
            {s.cards && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {s.cards.map((card, j) => (
                  <div key={j} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-5">
                    {card.color ? (
                      <p className="font-sans text-[15px] font-bold mb-2" style={{ color: card.color }}>{card.title}</p>
                    ) : (
                      <p className="font-sans text-[15px] font-bold text-white mb-2">{card.title}</p>
                    )}
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 leading-[1.7]">{card.body}</p>
                  </div>
                ))}
              </div>
            )}
            {s.comparison && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-[#E8373A]/5 border border-[#E8373A]/15 rounded-[14px] p-5">
                  <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#E8373A]/80 uppercase tracking-[1.5px] mb-3">{s.comparison.a.label}</p>
                  <ul className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] space-y-2">{s.comparison.a.items.map(i => <li key={i}>{i}</li>)}</ul>
                </div>
                <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[14px] p-5">
                  <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E]/80 uppercase tracking-[1.5px] mb-3">{s.comparison.b.label}</p>
                  <ul className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] space-y-2">{s.comparison.b.items.map(i => <li key={i}>{i}</li>)}</ul>
                </div>
              </div>
            )}
          </section>
        ))}

        {/* Exercise */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">~10 minutes · ChatGPT or Claude</p>
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mb-4">
              <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-3">Prompt to use</p>
              <p className="font-mono text-[15px] text-[#FFD23F] leading-[1.7]">{p.promptText}</p>
            </div>
            <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[14px] p-5">
              <div className="flex items-center gap-2 mb-3"><CheckSquare size={14} className="text-[#22C55E]" /><span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[1.5px]">Mark Complete</span></div>
              <div className="space-y-2">
                {p.checklistItems.map(item => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded cursor-pointer" />
                    <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reflect */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A78BFA]/5 border border-[#A78BFA]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3"><Lightbulb size={14} className="text-[#A78BFA]" /><span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] uppercase tracking-[1.5px]">Reflect</span></div>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.8]" dangerouslySetInnerHTML={{ __html: p.reflectText }} />
          </div>
        </section>

        {/* Takeaways */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {p.takeaways.map(point => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-[7px] shrink-0" style={{ backgroundColor: COLOR }} />
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Challenge */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3"><Trophy size={14} className="text-[#F59E0B]" /><span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[1.5px]">Challenge</span></div>
            <p className="font-sans text-[16px] font-bold text-white mb-2">{p.challengeTitle}</p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">{p.challengeBody}</p>
          </div>
        </section>

        {/* Next */}
        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">Next Lesson</p>
              <p className="font-sans text-[17px] font-bold text-white">{p.nextTitle}</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">{p.nextMeta}</p>
            </div>
            <a href={p.nextHref} className="inline-flex items-center gap-2 text-white font-bold font-[family-name:var(--font-inter)] text-[15px] px-5 py-3 rounded-xl shrink-0 hover:opacity-90 transition-opacity" style={{ backgroundColor: COLOR }}>
              Next <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
