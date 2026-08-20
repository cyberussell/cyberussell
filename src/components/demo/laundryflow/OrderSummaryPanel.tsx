import { unitLabel } from "./orderCatalog";
import type { CartLine } from "./cart";

function peso(amount: number): string {
  return `₱${amount.toLocaleString("en-PH", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export default function OrderSummaryPanel({
  lines,
  subtotal,
  title = "Your Order",
  emptyMessage = "No items yet — add services to build your order.",
}: {
  lines: CartLine[];
  subtotal: number;
  title?: string;
  emptyMessage?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#F1F5F9] shadow-[0_8px_24px_rgba(15,23,42,0.06)] p-5 md:p-6">
      <h3 className="font-sans font-black text-[16px] text-[#14181F] mb-4">{title}</h3>

      {lines.length === 0 ? (
        <p className="font-[family-name:var(--font-inter)] text-[13.5px] text-[#64748B]">{emptyMessage}</p>
      ) : (
        <ul className="flex flex-col gap-3 mb-4">
          {lines.map((line) => (
            <li key={line.item.id} className="flex items-start justify-between gap-3">
              <div>
                <p className="font-[family-name:var(--font-inter)] font-semibold text-[13.5px] text-[#14181F]">
                  {line.item.name} <span className="text-[#64748B] font-normal">× {line.qty}</span>
                </p>
                <p className="font-[family-name:var(--font-inter)] text-[12px] text-[#64748B]">
                  {peso(line.item.effective_price)} {unitLabel(line.item.unit)}
                </p>
              </div>
              <p className="font-[family-name:var(--font-inter)] font-bold text-[13.5px] text-[#14181F] whitespace-nowrap">
                {peso(line.item.effective_price * line.qty)}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
        <span className="font-[family-name:var(--font-inter)] font-bold text-[14px] text-[#14181F]">Subtotal</span>
        <span className="font-sans font-black text-[20px] text-[#B98900]">{peso(subtotal)}</span>
      </div>
    </div>
  );
}
