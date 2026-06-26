import { INCOME_TIERS, INCOME_STAT_CARDS } from "@/data/content";

export default function Infographic() {
  return (
    <section id="paraan" className="bg-[#0F0F1A] py-12 md:py-[72px] px-6 md:px-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8373A]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#3B82F6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center md:text-left mb-11">
          <div className="text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold tracking-[2.5px] uppercase mb-3">
            THE FULL PICTURE
          </div>
          <h2 className="font-sans text-[26px] md:text-[38px] font-bold text-white mb-4 leading-tight">
            Who Is Earning Online and How Much They Make
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.8]">
            Data-backed. No hype. Every figure has a source.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-[#18181F] border border-white/[0.12] rounded-2xl overflow-hidden shadow-2xl mb-5">
          <div className="bg-[#222230] border-b border-white/[0.12] px-5 md:px-7 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <h3 className="font-sans text-[16px] font-bold text-white">
              Philippine Online Income Landscape · 2025–2026
            </h3>
            <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 italic">
              Sources: PSA · Wise.com · OKGames · Ecomobi · 2025–2026
            </span>
          </div>

          <div className="p-5 md:p-7 flex flex-col gap-2">
            {INCOME_TIERS.map(({ title, subtitle, range, bg, border, textColor }) => (
              <div
                key={title}
                className={`flex flex-col md:flex-row justify-between items-start md:items-center p-[14px] md:px-[18px] rounded-lg border ${bg} ${border} gap-3 md:gap-0 hover:-translate-y-0.5 transition-transform duration-200`}
              >
                <div>
                  <h4 className={`font-[family-name:var(--font-inter)] text-[14px] font-bold ${textColor}`}>{title}</h4>
                  <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/60 mt-1">{subtitle}</p>
                </div>
                <div className={`font-sans text-[18px] font-bold ${textColor} md:text-right shrink-0`}>
                  {range}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-5">
          {INCOME_STAT_CARDS.map(({ value, label, source, color, ...rest }) => (
            <div key={label} className="bg-[#222230] border border-white/5 rounded-[10px] p-4 md:px-[18px] hover:border-white/20 transition-colors">
              <div className={`font-sans text-[24px] font-bold mb-2 ${color}`}>{value}</div>
              <div className="font-[family-name:var(--font-inter)] text-[13px] text-white/80 mb-3 leading-[1.5]">{label}</div>
              <div className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[0.05em]">{source}</div>
              {"cta" in rest && rest.cta && (
                <a href={rest.cta.url} target="_blank" rel="noopener noreferrer sponsored" className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#E8373A] hover:underline mt-2 inline-block">
                  {rest.cta.text}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
