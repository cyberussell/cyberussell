"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Minus, Plus, X, ArrowRight, AlertCircle, Truck, Clock, Radar } from "lucide-react";
import { LMS_BUSINESS_SLUG, CATEGORY_META, CATEGORY_ORDER, unitLabel, type CatalogItem, type CatalogResponse } from "./orderCatalog";
import { cartSubtotal, saveCart, type CartLine } from "./cart";
import OrderSummaryPanel from "./OrderSummaryPanel";
import { fadeUp } from "./motion";

const PERKS = [
  { label: "Free Pickup & Delivery within 3km", icon: Truck },
  { label: "Same-Day Service Available", icon: Clock },
  { label: "Live Order Tracking", icon: Radar },
];

function peso(amount: number): string {
  return `₱${amount.toLocaleString("en-PH", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export default function BuildOrder() {
  const router = useRouter();
  const [data, setData] = useState<CatalogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qtyById, setQtyById] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`/lms/api/catalog?business=${encodeURIComponent(LMS_BUSINESS_SLUG)}`)
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error ?? "Couldn't load the price list.");
        return body as CatalogResponse;
      })
      .then((body) => {
        if (!cancelled) setData(body);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const grouped = useMemo(() => {
    if (!data) return [];
    return CATEGORY_ORDER.map((category) => ({
      category,
      items: data.items.filter((item) => item.category === category),
    })).filter((group) => group.items.length > 0);
  }, [data]);

  const lines: CartLine[] = useMemo(() => {
    if (!data) return [];
    return data.items
      .filter((item) => (qtyById[item.id] ?? 0) > 0)
      .map((item) => ({ item, qty: qtyById[item.id] }));
  }, [data, qtyById]);

  const subtotal = cartSubtotal(lines);

  const setQty = (item: CatalogItem, qty: number) => {
    setQtyById((prev) => ({ ...prev, [item.id]: Math.max(0, qty) }));
  };

  const handleContinue = () => {
    saveCart(lines);
    router.push("/demo/laundryflow/book-a-pickup");
  };

  return (
    <section className="px-6 pt-10 md:pt-14 pb-28 lg:pb-16">
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-3xl mx-auto text-center mb-10">
        <p className="font-[family-name:var(--font-inter)] text-[11px] font-black tracking-[2px] text-[#B98900] mb-2.5">BUILD YOUR ORDER</p>
        <h1 className="font-sans font-black text-[28px] md:text-[36px] text-[#14181F] leading-[1.1] mb-3.5">Pick Your Services</h1>
        <p className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.7] text-[#14181F]/60">
          Real prices, pulled live from {data?.business.name ?? "our"} price list. Add quantities, then schedule your pickup.
        </p>
      </motion.div>

      {loading && (
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[132px] rounded-2xl bg-[#F1F5F9] animate-pulse" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="max-w-md mx-auto text-center bg-white rounded-2xl border border-[#F1F5F9] shadow-[0_8px_24px_rgba(15,23,42,0.06)] p-8">
          <AlertCircle size={28} className="text-red-500 mx-auto mb-3" />
          <p className="font-[family-name:var(--font-inter)] font-semibold text-[14px] text-[#14181F] mb-1">Couldn&apos;t load the price list</p>
          <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#64748B]">{error}</p>
        </div>
      )}

      {!loading && !error && data && (
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.6fr_360px] gap-10 items-start">
          <div className="flex flex-col gap-6">
            <div className="overflow-x-auto rounded-2xl border border-[#F1F5F9] shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr className="bg-[#FFC629]">
                    <th className="text-left font-sans font-black text-[11px] tracking-[1px] text-[#14181F] px-5 py-3.5">Service</th>
                    <th className="text-left font-sans font-black text-[11px] tracking-[1px] text-[#14181F] px-5 py-3.5">Price</th>
                    <th className="text-left font-sans font-black text-[11px] tracking-[1px] text-[#14181F] px-5 py-3.5">Quantity</th>
                    <th className="text-right font-sans font-black text-[11px] tracking-[1px] text-[#14181F] px-5 py-3.5">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {grouped.map((group) => {
                    const meta = CATEGORY_META[group.category];
                    return (
                      <Fragment key={group.category}>
                        <tr className="bg-[#FAFAF8]">
                          <td colSpan={4} className="px-5 py-2.5 border-t border-[#F1F5F9]">
                            <div className="flex items-center gap-2">
                              <meta.icon size={14} className="text-[#B98900]" />
                              <span className="font-sans font-black text-[12.5px] text-[#14181F]">{meta.label}</span>
                            </div>
                          </td>
                        </tr>
                        {group.items.map((item) => {
                          const qty = qtyById[item.id] ?? 0;
                          return (
                            <tr key={item.id} className="border-t border-[#F1F5F9]">
                              <td className="px-5 py-4 align-top">
                                <div className="flex items-start gap-2.5">
                                  {qty > 0 ? (
                                    <button
                                      type="button"
                                      onClick={() => setQty(item, 0)}
                                      aria-label={`Remove ${item.name} from order`}
                                      className="mt-0.5 w-5 h-5 shrink-0 rounded-full flex items-center justify-center text-[#94A3B8] hover:text-[#14181F] hover:bg-[#F1F5F9] transition-colors"
                                    >
                                      <X size={13} />
                                    </button>
                                  ) : (
                                    <span className="w-5 shrink-0" />
                                  )}
                                  <div>
                                    <p className="font-sans font-black text-[14px] text-[#0F172A]">{item.name}</p>
                                    {item.on_promo && (
                                      <span className="inline-block mt-1 text-[10.5px] font-bold text-white bg-[#B98900] rounded-full px-2 py-0.5">
                                        On Promo
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4 align-top whitespace-nowrap">
                                <p className="font-sans font-black text-[14px] text-[#B98900]">{peso(item.effective_price)}</p>
                                <p className="text-[11px] font-normal text-[#64748B]">{unitLabel(item.unit)}</p>
                              </td>
                              <td className="px-5 py-4 align-top">
                                <div className="flex items-center gap-2.5">
                                  <button
                                    type="button"
                                    onClick={() => setQty(item, qty - 1)}
                                    disabled={qty === 0}
                                    aria-label={`Remove one ${item.name}`}
                                    className="w-7 h-7 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center disabled:opacity-40 hover:border-[#FFC629] transition-colors"
                                  >
                                    <Minus size={12} className="text-[#14181F]" />
                                  </button>
                                  <span className="w-5 text-center font-sans font-black text-[14px] text-[#14181F]">{qty}</span>
                                  <button
                                    type="button"
                                    onClick={() => setQty(item, qty + 1)}
                                    aria-label={`Add one ${item.name}`}
                                    className="w-7 h-7 rounded-full bg-[#FFC629] flex items-center justify-center hover:opacity-90 transition-opacity"
                                  >
                                    <Plus size={12} className="text-[#14181F]" />
                                  </button>
                                </div>
                              </td>
                              <td className="px-5 py-4 align-top text-right whitespace-nowrap">
                                <span className="font-sans font-black text-[14px] text-[#14181F]">
                                  {qty > 0 ? peso(item.effective_price * qty) : "—"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {PERKS.map((perk) => (
                <div key={perk.label} className="flex items-center gap-2">
                  <perk.icon size={16} className="text-[#B98900]" />
                  <span className="font-[family-name:var(--font-inter)] text-[12.5px] font-semibold text-[#14181F]/70">{perk.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block sticky top-28">
            <OrderSummaryPanel lines={lines} subtotal={subtotal} onContinue={handleContinue} />
          </div>
        </div>
      )}

      {!loading && !error && data && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-[#E2E8F0] px-6 py-4 flex items-center justify-between gap-4 shadow-[0_-8px_24px_rgba(15,23,42,0.08)]">
          <div>
            <p className="font-[family-name:var(--font-inter)] text-[11px] text-[#64748B]">Subtotal</p>
            <p className="font-sans font-black text-[18px] text-[#14181F]">{peso(subtotal)}</p>
          </div>
          <button
            type="button"
            onClick={handleContinue}
            disabled={lines.length === 0}
            className="inline-flex items-center gap-2 bg-[#FFC629] text-[#14181F] font-[family-name:var(--font-inter)] font-bold text-[14px] px-6 py-3 rounded-full disabled:opacity-40 transition-all"
          >
            Schedule Pickup <ArrowRight size={15} />
          </button>
        </div>
      )}
    </section>
  );
}
