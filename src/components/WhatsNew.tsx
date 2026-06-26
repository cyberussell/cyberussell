const updates = [
  {
    label: "New Tool",
    title: "Bio Generator — AI writes your freelancer profile bio",
    href: "/tools/bio-generator",
    color: "#E8373A",
  },
  {
    label: "New Tool",
    title: "Scam Scanner — AI-powered job scam detector",
    href: "/tools/scam-scanner",
    color: "#FFD23F",
  },
  {
    label: "New Tool",
    title: "Prompt Trainer — score and improve your AI prompts",
    href: "/tools/prompt-forge",
    color: "#00C97A",
  },
];

export default function WhatsNew() {
  return (
    <section className="bg-[#0F0F1A] w-full px-6 md:px-10 py-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-sans text-[18px] font-bold text-white/40 mb-4 tracking-tight">
          What&apos;s New
        </h2>
        <div className="flex flex-col gap-2">
          {updates.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-center gap-3 py-2 hover:opacity-80 transition-opacity"
            >
              <span
                className="shrink-0 text-[10px] font-bold font-[family-name:var(--font-inter)] tracking-[0.08em] uppercase px-2.5 py-1 rounded-md"
                style={{ backgroundColor: item.color + "18", color: item.color }}
              >
                {item.label}
              </span>
              <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 group-hover:text-white/80 transition-colors truncate">
                {item.title}
              </span>
              <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/20 shrink-0 ml-auto">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
