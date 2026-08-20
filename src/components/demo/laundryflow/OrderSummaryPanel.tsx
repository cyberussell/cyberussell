import { ArrowRight } from "lucide-react";
import type { CartLine } from "./cart";

function peso(amount: number): string {
  return `₱${amount.toLocaleString("en-PH", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export default function OrderSummaryPanel({
  lines,
  subtotal,
  title = "Order Summary",
  emptyMessage = "No items yet — add services to build your order.",
  onContinue,
}: {
  lines: CartLine[];
  subtotal: number;
  title?: string;
  emptyMessage?: string;
  onContinue?: () => void;
}) {
  const itemCount = lines.reduce((sum, line) => sum + line.qty, 0);

  return (
    <div className="bg-white rounded-2xl border border-[#F1F5F9] shadow-[0_8px_24px_rgba(15,23,42,0.06)] p-5 md:p-6">
      <h3 className="font-sans font-black text-[16px] text-[#14181F] mb-4">{title}</h3>

      {lines.length === 0 ? (
        <p className="font-[family-name:var(--font-inter)] text-[13.5px] text-[#64748B] mb-4">{emptyMessage}</p>
      ) : (
        <div className="flex flex-col gap-2.5 mb-4">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-inter)] text-[13.5px] text-[#64748B]">Items</span>
            <span className="font-[family-name:var(--font-inter)] font-semibold text-[13.5px] text-[#14181F]">{itemCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-inter)] text-[13.5px] text-[#64748B]">Sub Total</span>
            <span className="font-[family-name:var(--font-inter)] font-semibold text-[13.5px] text-[#14181F]">{peso(subtotal)}</span>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between mb-5">
        <span className="font-[family-name:var(--font-inter)] font-bold text-[14px] text-[#14181F]">Total</span>
        <span className="font-sans font-black text-[20px] text-[#B98900]">{peso(subtotal)}</span>
      </div>

      {onContinue && (
        <button
          type="button"
          onClick={onContinue}
          disabled={lines.length === 0}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#14181F] text-white font-[family-name:var(--font-inter)] font-bold text-[14px] px-7 py-3.5 rounded-full hover:opacity-90 disabled:opacity-40 transition-all"
        >
          Continue to Schedule Pickup <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
