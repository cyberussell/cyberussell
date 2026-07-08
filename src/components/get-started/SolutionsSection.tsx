import Link from "next/link";
import {
  Sparkles,
  Zap,
  Globe,
  TrendingUp,
  AppWindow,
  Wrench,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const SOLUTIONS: { icon: LucideIcon; title: string; desc: string; href: string; color: string }[] = [
  {
    icon: Sparkles,
    title: "AI Consulting",
    desc: "Understand exactly where AI can save you time and money — no hype, just a clear plan built around your business.",
    href: "/services/ai-technology-consulting",
    color: "#E8373A",
  },
  {
    icon: Zap,
    title: "AI Automation",
    desc: "Automate the repetitive work — bookings, follow-ups, replies, data entry — so your team can focus on customers.",
    href: "/services/ai-automation-solutions",
    color: "#FFD23F",
  },
  {
    icon: Globe,
    title: "Business Websites",
    desc: "A fast, modern website that builds trust the moment someone finds you.",
    href: "/services/website-design-development",
    color: "#3B82F6",
  },
  {
    icon: TrendingUp,
    title: "SEO",
    desc: "Show up when local customers search for what you offer.",
    href: "/services/inquire?service=SEO",
    color: "#00C97A",
  },
  {
    icon: AppWindow,
    title: "Web Applications",
    desc: "Custom tools built around how your business actually works, not the other way around.",
    href: "/services/custom-web-applications",
    color: "#E8373A",
  },
  {
    icon: Wrench,
    title: "Technical Solutions",
    desc: "Ongoing technical support and consulting so your systems keep working as you grow.",
    href: "/services/inquire?service=Technical%20Consulting",
    color: "#FFD23F",
  },
];

export default function SolutionsSection() {
  return (
    <section id="solutions" className="bg-[#0F0F1A] px-6 md:px-10 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <span className="block text-[#FFD23F] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-4">
            What We Do
          </span>
          <h2 className="font-sans text-[28px] md:text-[40px] font-bold text-white tracking-tight leading-tight mb-4">
            Practical Solutions, Real Business Outcomes
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[17px] text-white/60 leading-[1.8]">
            We don&apos;t sell technology. We solve business problems — using AI, automation, and
            modern web technology as the tools to get there.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map(({ icon: Icon, title, desc, href, color }) => (
            <Link
              key={title}
              href={href}
              className="group bg-[#18181F] border border-white/[0.08] rounded-2xl p-7 hover:border-white/20 hover:-translate-y-[2px] transition-all duration-300 flex flex-col"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${color}14`, border: `1px solid ${color}28` }}
              >
                <Icon size={20} style={{ color }} strokeWidth={1.8} />
              </div>
              <h3 className="font-[family-name:var(--font-inter)] text-[17px] font-bold text-white mb-2">
                {title}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.75] mb-5 flex-1">
                {desc}
              </p>
              <span className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/50 group-hover:text-white flex items-center gap-1.5 transition-colors">
                Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
