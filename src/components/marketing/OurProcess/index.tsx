const STEPS = [
  {
    n: "01",
    title: "Discovery",
    desc: "We start with a conversation about your business, your goals, and what's slowing you down — mapping pages, workflows, or automations before any work begins.",
  },
  {
    n: "02",
    title: "Strategy",
    desc: "You get a clear plan for what to build first and why, scoped in writing before a single line of code is written.",
  },
  {
    n: "03",
    title: "Design",
    desc: "Mobile-first design paired with content and structure built around your brand, your customers, and how they'll actually use it.",
  },
  {
    n: "04",
    title: "Development",
    desc: "Build on a fast, modern stack — website, application, or automation — with regular check-ins along the way.",
  },
  {
    n: "05",
    title: "Testing",
    desc: "Real-world scenario testing and a round of revisions to catch issues before anything goes live.",
  },
  {
    n: "06",
    title: "Launch",
    desc: "Deployment, handover, and training so you're set up to run things yourself — plus support after launch.",
  },
];

export default function OurProcess() {
  return (
    <section className="bg-gradient-to-b from-[#07070B] via-[#0B0E1C] to-[#07070B] px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <span className="mb-4 block font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] text-[#FF7A1A]">
            How It Works
          </span>
          <h2 className="mb-4 font-sans text-[28px] font-bold leading-tight tracking-tight text-white md:text-[40px]">
            A Simple, Straightforward Process
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[16px] leading-[1.8] text-white/60 md:text-[17px]">
            Six clear steps from first conversation to launch — no confusing jargon, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
          {STEPS.map(({ n, title, desc }, i) => (
            <div key={n} className="relative flex flex-col">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-sans text-[24px] font-extrabold text-[#FF7A1A]">{n}</span>
                {i < STEPS.length - 1 && (
                  <span className="hidden h-px flex-1 bg-white/[0.12] lg:block" aria-hidden="true" />
                )}
              </div>
              <h3 className="mb-2 font-[family-name:var(--font-inter)] text-[16px] font-bold text-white">
                {title}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[14px] leading-[1.75] text-white/55">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
