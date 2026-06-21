import { Search, Lightbulb, BarChart2, Heart, type LucideIcon } from "lucide-react";

type TimelineItem = {
  Icon: LucideIcon;
  iconColor: string;
  dotBg: string;
  dotBorder: string;
  label: string;
  bold: string;
  text: string;
};

const timeline: TimelineItem[] = [
  {
    Icon: Search,
    iconColor: "rgba(255,255,255,0.5)",
    dotBg: "rgba(255,255,255,0.08)",
    dotBorder: "rgba(255,255,255,0.12)",
    label: "Before",
    bold: "Looking for the right business.",
    text: "I tried everything — job platforms, apps, tools. Failing over and over again.",
  },
  {
    Icon: Lightbulb,
    iconColor: "#FFD23F",
    dotBg: "rgba(255,210,63,0.10)",
    dotBorder: "rgba(255,210,63,0.20)",
    label: "Discovery",
    bold: "I found AI tools.",
    text: "Not coding — learning how to use Claude and other tools to help myself and other people.",
  },
  {
    Icon: BarChart2,
    iconColor: "#E8373A",
    dotBg: "rgba(232,55,58,0.10)",
    dotBorder: "rgba(232,55,58,0.20)",
    label: "Started",
    bold: "Researched real data.",
    text: "PSA, DOLE, and actual Filipino freelancers — not YouTube gurus — became my sources of truth.",
  },
  {
    Icon: Heart,
    iconColor: "#00C97A",
    dotBg: "rgba(0,201,122,0.10)",
    dotBorder: "rgba(0,201,122,0.20)",
    label: "Today",
    bold: "Sharing it all.",
    text: "Cyberussell is the research, the lessons learned, and the right direction — for Filipinos in the province like us.",
  },
];

export default function AboutStory() {
  return (
    <section id="tungkol" className="bg-[#0F0F1A] py-12 md:py-[72px] px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[52px]">
          {/* Left: Narrative */}
          <div className="flex flex-col gap-6">
            <span className="text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px]">
              THE STORY
            </span>
            <h2 className="font-[family-name:var(--font-syne)] text-[28px] md:text-[32px] font-bold text-white leading-[1.2]">
              &ldquo;I made mistakes for 7 years.
              <br />
              <span className="text-[#E8373A]">Don&apos;t repeat them.&rdquo;</span>
            </h2>
            <div className="flex flex-col gap-[12px] font-[family-name:var(--font-inter)] text-[17px] text-white/55 leading-[1.8]">
              <p>
                Cyberussell was not built to make money. It was built because I
                could not find a resource for Filipinos like me — from the
                province, no technology degree, no connections in the industry.
              </p>
              <p>
                Everything I learned came from trial, failure, and hundreds of
                hours of research. This website is the resource I wished I had
                — free, simple, and based on real data.
              </p>
              <p>
                The goal is simple. If one Filipino finds the right way to earn
                online because of something they read here — this is already a
                success.
              </p>
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="flex flex-col pt-6 md:pt-0">
            {timeline.map(({ Icon, iconColor, dotBg, dotBorder, label, bold, text }, i) => (
              <div key={label} className="relative grid grid-cols-[44px_1fr] gap-4 pb-6">
                {/* Connector line */}
                {i < timeline.length - 1 && (
                  <div
                    className="absolute w-[2px]"
                    style={{ left: 21, top: 44, bottom: 0, background: "rgba(255,255,255,0.08)" }}
                  />
                )}

                {/* Dot */}
                <div
                  className="flex items-center justify-center shrink-0 relative z-10"
                  style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: dotBg, border: `2px solid ${dotBorder}` }}
                >
                  <Icon size={20} color={iconColor} strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="pt-[10px]">
                  <span className="block text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-widest mb-1">
                    {label}
                  </span>
                  <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.8]">
                    <b className="text-white font-bold">{bold}</b> {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
