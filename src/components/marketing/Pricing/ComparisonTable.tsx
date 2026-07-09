import { Check } from "lucide-react";
import { COMPARISON_ROWS, type CellValue } from "./comparisonTable.data";

function Cell({ value }: { value: CellValue }) {
  if (value === true) {
    return <Check size={18} className="mx-auto text-[#FF7A1A]" strokeWidth={2.5} />;
  }
  if (value === false) {
    return <span className="text-white/20">—</span>;
  }
  return (
    <span className="font-[family-name:var(--font-inter)] text-[13px] font-semibold text-white/80">
      {value}
    </span>
  );
}

export default function ComparisonTable() {
  return (
    <div className="mt-16">
      <h3 className="mb-6 text-center font-sans text-[22px] font-bold text-white md:text-[26px]">
        Compare Plans
      </h3>
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <th className="px-5 py-4 font-[family-name:var(--font-inter)] text-[12px] font-bold uppercase tracking-[1px] text-white/50">
                Capability
              </th>
              <th className="px-5 py-4 text-center font-sans text-[14px] font-bold text-white">
                Starter
              </th>
              <th className="px-5 py-4 text-center font-sans text-[14px] font-bold text-[#FF7A1A]">
                Growth
              </th>
              <th className="px-5 py-4 text-center font-sans text-[14px] font-bold text-white">
                Business Platform
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row, i) => (
              <tr key={row.label} className={i % 2 === 1 ? "bg-white/[0.015]" : undefined}>
                <td className="px-5 py-3.5 font-[family-name:var(--font-inter)] text-[13.5px] text-white/70">
                  {row.label}
                </td>
                <td className="px-5 py-3.5 text-center">
                  <Cell value={row.starter} />
                </td>
                <td className="px-5 py-3.5 text-center">
                  <Cell value={row.growth} />
                </td>
                <td className="px-5 py-3.5 text-center">
                  <Cell value={row.businessPlatform} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
