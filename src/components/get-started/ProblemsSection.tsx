import {
  ClipboardList,
  LayoutTemplate,
  Search,
  UserX,
  BrainCircuit,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const PROBLEMS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: ClipboardList,
    title: "Too much manual work",
    desc: "Your team spends hours a week on tasks that software could handle automatically.",
  },
  {
    icon: LayoutTemplate,
    title: "Outdated website",
    desc: "Your website doesn't reflect how good your business actually is — and customers notice.",
  },
  {
    icon: Search,
    title: "Low online visibility",
    desc: "People are searching for what you offer, but they can't find you.",
  },
  {
    icon: UserX,
    title: "Missed customer opportunities",
    desc: "Slow replies and no-shows quietly cost you sales every week.",
  },
  {
    icon: BrainCircuit,
    title: "No AI strategy",
    desc: "Everyone's talking about AI, but no one's shown you how it applies to your business.",
  },
  {
    icon: Workflow,
    title: "Inefficient workflows",
    desc: "Your systems weren't built to grow with you, so everything feels harder than it should.",
  },
];

export default function ProblemsSection() {
  return (
    <section id="problems" className="bg-[#111118] px-6 md:px-10 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <span className="block text-[#E8373A] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-4">
            If This Sounds Familiar
          </span>
          <h2 className="font-sans text-[28px] md:text-[40px] font-bold text-white tracking-tight leading-tight mb-4">
            Problems We Solve
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[17px] text-white/60 leading-[1.8]">
            Most small businesses aren&apos;t losing money because they&apos;re doing something
            wrong — they&apos;re losing time and customers because their tools haven&apos;t caught up.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROBLEMS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-[#18181F] border border-white/[0.08] rounded-2xl p-6 hover:border-white/20 hover:-translate-y-[2px] transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#E8373A]/10 border border-[#E8373A]/20 flex items-center justify-center mb-5">
                <Icon size={20} className="text-[#E8373A]" strokeWidth={1.8} />
              </div>
              <h3 className="font-[family-name:var(--font-inter)] text-[16px] font-bold text-white mb-2">
                {title}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.75]">
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 max-w-xl mx-auto mb-5 leading-[1.8]">
            You don&apos;t need more hours in the day. You need the right systems doing the work
            for you. That&apos;s where Cyberussell comes in.
          </p>
          <a
            href="#solutions"
            className="inline-block font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#FFD23F] hover:text-[#FFD23F]/80 transition-colors"
          >
            ↓ See how we solve it
          </a>
        </div>
      </div>
    </section>
  );
}
