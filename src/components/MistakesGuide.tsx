"use client";

import { useState, useRef } from "react";

type Mistake = {
  number: number;
  label: string;
  title: string;
  quote: string;
  paragraphs: string[];
  stat: { value: string; text: string; source: string };
  story: { text: string; attribution: string };
  fix: { title: string; text: string; steps: string[] };
  selfCheck: string[];
};

const mistakes: Mistake[] = [
  {
    number: 1,
    label: "THE SHINY OBJECT TRAP",
    title: "Jumping from one opportunity to another",
    quote: "\"Subukan mo 'to! Kumikita daw sila ng ₱10,000 a week!\"",
    paragraphs: [
      "This is the #1 reason Filipinos fail at earning online. Hindi dahil walang opportunity — sobra-sobra nga ang opportunity. Ang problema ay every week may bago: dropshipping this week, affiliate marketing next week, crypto the week after.",
      "Kapag hindi ka kumita in 2 weeks, lilipat ka na sa next \"hot\" opportunity. Walang nangyayari kasi walang opportunity ang gumagana sa 2 weeks.",
    ],
    stat: {
      value: "73%",
      text: "ng mga bagong online sellers sa Shopee ay nag-quit within 3 months",
      source: "Shopee Seller Survey, 2025",
    },
    story: {
      text: "\"Nag-try ako ng affiliate marketing, dropshipping, online tutoring, crypto trading, at freelance writing — lahat sa loob ng 6 months. Wala akong kinita kasi hindi ko binigyan ng enough time ang kahit isa.\"",
      attribution: "— Mark, 28, Tuguegarao City",
    },
    fix: {
      title: "Pumili ng ISA at i-commit ng 90 days",
      text: "Hindi mo kailangan ng perfect na choice. Kailangan mo ng consistent na effort sa isang direction.",
      steps: [
        "Pumili ng ISANG income path (use our Skill Finder)",
        "Commit to it for 90 days minimum",
        "Track your progress weekly",
        "Hindi pwedeng mag-switch hanggang 90 days",
        "After 90 days, evaluate with data — hindi feelings",
      ],
    },
    selfCheck: [
      "Nag-try ka ba ng 3+ different online income methods in the last 6 months?",
      "Nag-quit ka ba sa isang method bago mag-90 days?",
      "Nali-lure ka ba ng \"success stories\" ng ibang method habang may ginagawa ka na?",
    ],
  },
  {
    number: 2,
    label: "THE PREPARATION TRAP",
    title: "Over-preparing and never starting",
    quote: "\"Mag-aaral muna ako nang maigi bago mag-start...\"",
    paragraphs: [
      "Ito ang masking ng takot bilang pagiging \"responsible.\" Bibili ka ng online course, manonood ng 50 YouTube tutorials, magre-research ng 3 weeks — pero hindi ka pa rin mag-start.",
      "The truth: walang amount of preparation ang makakapag-prepare sa'yo para sa reality ng actual work. Ang pinaka-effective na learning ay learning by doing.",
    ],
    stat: {
      value: "68%",
      text: "ng mga bumili ng online courses ay hindi natapos ang course",
      source: "Online Course Completion Study, 2024",
    },
    story: {
      text: "\"Bumili ako ng ₱15,000 worth of online courses about freelancing. Pinanood ko lahat. Pero 6 months later wala pa rin akong first client kasi hindi ko sinubukan mag-apply.\"",
      attribution: "— Jena, 24, Santiago City",
    },
    fix: {
      title: "Start before you feel ready",
      text: "Ang goal mo sa first week ay hindi kumita. Ang goal mo ay mag-start.",
      steps: [
        "Set a START DATE — this week, hindi \"next month\"",
        "Do the smallest possible action today (create an account, send one application)",
        "Learn WHILE doing, hindi learn THEN do",
        "Give yourself permission to be bad at first",
        "Your first client/sale will teach you more than 10 courses",
      ],
    },
    selfCheck: [
      "May online course ka ba na hindi pa natapos?",
      "Nag-research ka ba ng more than 2 weeks without taking action?",
      "Naghihintay ka ba ng \"perfect time\" para mag-start?",
    ],
  },
  {
    number: 3,
    label: "THE FREE-ONLY TRAP",
    title: "Refusing to invest anything in your business",
    quote: "\"Ayoko mag-gastos — libre lang dapat lahat.\"",
    paragraphs: [
      "Understandable ang mentality na ito — maraming Pilipino ang tight ang budget. Pero ang reality ay kahit ang online business ay may cost. Hindi mo kailangang gumastos ng malaki, pero ang zero investment usually means zero results.",
      "Ang pinaka-common na \"hidden cost\" na hindi pinapansin: TIME. Kung gagastos ka ng 20 hours doing something manually na may ₱500 tool na gagawin sa 2 hours — mas mahal pa ang libre.",
    ],
    stat: {
      value: "₱2,500",
      text: "average na ginastos ng successful Filipino freelancers sa first 3 months (internet, tools, portfolio)",
      source: "PH Freelancer Survey, 2025",
    },
    story: {
      text: "\"Hindi ako gumastos ng kahit piso sa first 6 months ko. Ang result: walang decent portfolio, walang professional email, walang tools. Nung nag-invest ako ng ₱1,500 sa Canva Pro at domain name, nag-double ang clients ko in one month.\"",
      attribution: "— Angel, 31, Ilagan City",
    },
    fix: {
      title: "Budget ₱500–₱2,500 for your first 3 months",
      text: "Hindi mo kailangang gumastos ng malaki. Pero strategic na small investment ay kailangan.",
      steps: [
        "Internet load: ₱500–₱1,000/month (non-negotiable)",
        "One professional tool: ₱500–₱1,000 (Canva Pro, domain name, or email)",
        "The rest — free tools muna (Google Docs, Canva Free, free portfolio sites)",
        "Reinvest your first earnings into better tools",
        "Track every peso as a business expense",
      ],
    },
    selfCheck: [
      "Gumagamit ka ba ng phone data lang instead of WiFi?",
      "Walang ka ba professional email (Gmail na may real name)?",
      "Hindi ka ba gumastos ng kahit ₱500 sa online business mo in the last 3 months?",
    ],
  },
  {
    number: 4,
    label: "THE ISOLATION TRAP",
    title: "Trying to figure out everything alone",
    quote: "\"Kaya ko 'to mag-isa. Hindi ko kailangan ng tulong.\"",
    paragraphs: [
      "Online earning feels like a solo activity — pero ang mga nag-su-succeed ay may support system. Hindi kailangan ng expensive mentor o coaching program. Kailangan mo lang ng 2-3 people na nasa same journey as you.",
      "Walang accountability kapag mag-isa ka. Walang mag-co-correct ng mistakes mo. Walang mag-mo-motivate sa'yo kapag mahirap.",
    ],
    stat: {
      value: "3.5x",
      text: "mas likely na mag-succeed ang freelancers na may accountability partner o small group",
      source: "Freelancer Success Patterns, 2025",
    },
    story: {
      text: "\"1 year akong nag-try mag-isa — walang nangyari. Nung sumali ako sa isang small Discord group ng Filipino freelancers, nag-land ako ng first client ko in 3 weeks. Hindi dahil sila ang nagbigay ng client — dahil may nag-push sa akin na mag-apply kahit hindi pa perfect ang profile ko.\"",
      attribution: "— Kevin, 26, Cauayan City",
    },
    fix: {
      title: "Find 2-3 people on the same journey",
      text: "Hindi mo kailangan ng mentor na ₱50,000 ang fee. Kailangan mo ng kapwa beginner na kasabay mong natututo.",
      steps: [
        "Join ONE Filipino freelancer community (Facebook group or Discord)",
        "Find 2-3 people at your same level — not gurus",
        "Set a weekly check-in (even just chat)",
        "Share wins AND failures — accountability works both ways",
        "Avoid paid \"masterminds\" until you're earning consistently",
      ],
    },
    selfCheck: [
      "Wala ka bang kahit isang tao na kausap about online earning journey mo?",
      "Nag-quit ka ba dahil walang nag-encourage sa'yo?",
      "Hindi ka ba nag-ask ng tulong kahit na stuck ka na?",
    ],
  },
  {
    number: 5,
    label: "THE COMPARISON TRAP",
    title: "Comparing your day 1 to someone else's day 365",
    quote: "\"Bakit siya kumikita na, ako hindi pa?\"",
    paragraphs: [
      "Social media shows the highlight reel. Ang makikita mo ay \"I earned ₱50,000 this month from freelancing!\" — pero hindi mo makikita ang 6 months na walang kita, ang 50+ rejected applications, ang mga gabing nagduda sila sa sarili nila.",
      "Comparison kills more online businesses than scams do. Kapag nag-compare ka sa success ng iba, nawawala ang motivation mo kasi feeling mo nag-fail ka — kahit normal lang ang pace mo.",
    ],
    stat: {
      value: "6–12 months",
      text: "average na timeline bago kumita ng consistent income ang Filipino freelancer",
      source: "PH Freelancer Income Report, 2025",
    },
    story: {
      text: "\"Every time may mag-post sa Facebook group na \"first ₱10K ko!\" gusto ko mag-quit kasi 3 months na ako wala pa ring kita. Ang hindi ko alam — yung nag-post nun, 8 months din siyang walang kita bago mag-succeed.\"",
      attribution: "— Diana, 29, Roxas, Isabela",
    },
    fix: {
      title: "Track YOUR progress, not theirs",
      text: "Ang tanging comparison na valid ay ikaw ngayon vs. ikaw last month.",
      steps: [
        "Unfollow accounts that make you feel behind",
        "Keep a simple weekly log: what did I learn? What did I do?",
        "Celebrate small wins — first application sent, first reply received",
        "Remember: most \"overnight success\" stories took 6-12 months",
        "Your timeline is valid. Wala kang karera kundi sarili mo.",
      ],
    },
    selfCheck: [
      "Nag-quit ka ba o na-discourage dahil sa success post ng iba?",
      "Nag-compare ka ba ng income mo sa isang taong mas matagal na sa field?",
      "Feeling mo ba na \"late\" ka na para mag-start?",
    ],
  },
];

export default function MistakesGuide() {
  const [activeMistake, setActiveMistake] = useState(1);
  const [selfChecks, setSelfChecks] = useState<Record<string, boolean>>({});
  const tabsRef = useRef<HTMLDivElement>(null);

  const current = mistakes[activeMistake - 1];

  const toggleCheck = (key: string) => {
    setSelfChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const goTo = (n: number) => {
    setActiveMistake(n);
    tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="max-w-[780px] mx-auto">
      {/* Tab Navigation */}
      <div ref={tabsRef} className="flex gap-2 mb-8 flex-wrap">
        {mistakes.map((m) => (
          <button
            key={m.number}
            onClick={() => goTo(m.number)}
            className={`px-4 py-2.5 rounded-[8px] font-[family-name:var(--font-inter)] text-[13px] font-bold transition-all ${
              activeMistake === m.number
                ? "bg-[#E8373A] text-white"
                : "bg-white/5 text-white/55 hover:bg-white/10 hover:text-white/60"
            }`}
          >
            #{m.number}
          </button>
        ))}
      </div>

      {/* Mistake Content */}
      <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] overflow-hidden">
        {/* Header */}
        <div className="bg-[#E8373A]/8 border-b border-[#E8373A]/20 p-6">
          <div className="font-[family-name:var(--font-inter)] text-[10px] font-bold tracking-[2.5px] uppercase text-[#E8373A] mb-2">
            MISTAKE #{current.number} · {current.label}
          </div>
          <h2 className="font-sans text-[22px] md:text-[28px] font-bold text-white leading-tight mb-3">
            {current.title}
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 italic">
            {current.quote}
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Paragraphs */}
          {current.paragraphs.map((p, i) => (
            <p key={i} className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.85]">
              {p}
            </p>
          ))}

          {/* Data Card */}
          <div className="bg-[#E8373A]/5 border border-[#E8373A]/15 rounded-[10px] p-5">
            <div className="font-sans text-[32px] font-bold text-[#E8373A] mb-1">
              {current.stat.value}
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7] mb-2">
              {current.stat.text}
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/30">
              {current.stat.source}
            </p>
          </div>

          {/* Story Card */}
          <div className="border-l-[3px] border-[#FFD23F] pl-5 py-1">
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 leading-[1.85] italic mb-2">
              {current.story.text}
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/35">
              {current.story.attribution}
            </p>
          </div>

          {/* Fix Card */}
          <div className="bg-[#00C97A]/5 border border-[#00C97A]/20 rounded-[10px] p-5">
            <h3 className="font-sans text-[18px] font-bold text-[#00C97A] mb-2">
              The Fix: {current.fix.title}
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 leading-[1.7] mb-4">
              {current.fix.text}
            </p>
            <ol className="space-y-2">
              {current.fix.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="bg-[#00C97A]/20 text-[#00C97A] font-[family-name:var(--font-inter)] text-[12px] font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Self-Check */}
          <div className="bg-[#222230] border border-white/[0.06] rounded-[10px] p-5">
            <h3 className="font-sans text-[16px] font-bold text-white mb-3">
              Self-Check: Ikaw ba ito?
            </h3>
            <div className="space-y-2">
              {current.selfCheck.map((item, i) => {
                const key = `${current.number}-${i}`;
                const checked = selfChecks[key] || false;
                return (
                  <button
                    key={key}
                    onClick={() => toggleCheck(key)}
                    className="w-full text-left flex items-start gap-3 p-3 rounded-[8px] border transition-all"
                    style={{
                      backgroundColor: checked ? "rgba(255,210,63,0.06)" : "transparent",
                      borderColor: checked ? "rgba(255,210,63,0.2)" : "rgba(255,255,255,0.06)",
                    }}
                  >
                    <span
                      className="mt-0.5 w-5 h-5 rounded-[4px] border-2 flex items-center justify-center shrink-0 transition-colors"
                      style={{
                        borderColor: checked ? "#FFD23F" : "rgba(255,255,255,0.15)",
                        backgroundColor: checked ? "#FFD23F" : "transparent",
                      }}
                    >
                      {checked && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#0F0F1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 leading-[1.6]">
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4">
            {activeMistake > 1 ? (
              <button
                onClick={() => goTo(activeMistake - 1)}
                className="bg-white/5 border border-white/10 text-white/65 font-[family-name:var(--font-inter)] text-[13px] font-bold px-5 py-3 rounded-[8px] hover:bg-white/10 transition-colors"
              >
                ← Mistake #{activeMistake - 1}
              </button>
            ) : (
              <div />
            )}
            {activeMistake < 5 ? (
              <button
                onClick={() => goTo(activeMistake + 1)}
                className="bg-[#E8373A] text-white font-[family-name:var(--font-inter)] text-[13px] font-bold px-5 py-3 rounded-[8px] hover:bg-[#E8373A]/90 transition-colors"
              >
                Mistake #{activeMistake + 1} →
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Final CTA (only on mistake 5) */}
      {activeMistake === 5 && (
        <div className="mt-10 bg-[#00C97A]/5 border border-[#00C97A]/20 rounded-[12px] p-6 text-center">
          <h3 className="font-sans text-[22px] font-bold text-white mb-3">
            Alam mo na ang mistakes. Ready ka na ba?
          </h3>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.8] mb-5 max-w-[500px] mx-auto">
            Gamitin ang Skill Finder para malaman kung anong online income path
            ang best fit sa skills at situation mo — libre, walang sign-up.
          </p>
          <a
            href="/#skill-finder"
            className="inline-block bg-[#00C97A] text-[#0F0F1A] font-sans text-[14px] font-bold px-6 py-3.5 rounded-[8px] hover:bg-[#00C97A]/90 transition-colors"
          >
            Find My Skill — Free
          </a>
        </div>
      )}
    </div>
  );
}
