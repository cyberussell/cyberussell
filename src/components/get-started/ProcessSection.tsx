const STEPS = [
  { n: "01", title: "Consultation", desc: "We start with a conversation about your business, your goals, and where you're losing time or money." },
  { n: "02", title: "Strategy", desc: "You get a clear, practical plan — what to build, automate, or fix first, and why." },
  { n: "03", title: "Build", desc: "We design and develop your solution using modern, reliable technology." },
  { n: "04", title: "Launch", desc: "Your website, automation, or application goes live — tested and ready for real customers." },
  { n: "05", title: "Support", desc: "We stay involved after launch, so things keep running smoothly as your business grows." },
];

export default function ProcessSection() {
  return (
    <section id="process" className="bg-[#111118] px-6 md:px-10 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <span className="block text-[#E8373A] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-4">
            How It Works
          </span>
          <h2 className="font-sans text-[28px] md:text-[40px] font-bold text-white tracking-tight leading-tight mb-4">
            A Simple, Straightforward Process
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[17px] text-white/60 leading-[1.8]">
            No confusing jargon, no surprises — just five clear steps from first conversation to
            ongoing support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
          {STEPS.map(({ n, title, desc }, i) => (
            <div key={n} className="relative flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-sans text-[22px] font-extrabold text-[#FFD23F]">{n}</span>
                {i < STEPS.length - 1 && (
                  <span className="hidden lg:block flex-1 h-px bg-white/[0.12]" aria-hidden="true" />
                )}
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
      </div>
    </section>
  );
}
