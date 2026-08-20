"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Minus, Plus, ArrowRight, AlertCircle, Truck, Clock, Radar } from "lucide-react";
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
          <div className="flex flex-col gap-10">
            {grouped.map((group) => {
              const meta = CATEGORY_META[group.category];
              return (
                <div key={group.category}>
                  <div className="flex items-center gap-2.5 mb-4">
                    <meta.icon size={18} className="text-[#B98900]" />
                    <h2 className="font-sans font-black text-[18px] text-[#14181F]">{meta.label}</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {group.items.map((item) => {
                      const qty = qtyById[item.id] ?? 0;
                      return (
                        <div
                          key={item.id}
                          className={`p-5 rounded-xl border-2 transition-all ${
                            qty > 0 ? "border-[#FFC629] bg-[#FFF8E1]" : "border-[#E2E8F0]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div>
                              <p className="font-sans font-black text-[15px] text-[#0F172A]">{item.name}</p>
                              {item.on_promo && (
                                <span className="inline-block mt-1 text-[10.5px] font-bold text-white bg-[#B98900] rounded-full px-2 py-0.5">
                                  On Promo
                                </span>
                              )}
                            </div>
                            <p className="font-sans font-black text-[16px] text-[#B98900] whitespace-nowrap">
                              {peso(item.effective_price)}
                              <span className="block text-[11px] font-normal text-[#64748B] text-right">{unitLabel(item.unit)}</span>
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-[family-name:var(--font-inter)] text-[12px] text-[#64748B]">Quantity</span>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => setQty(item, qty - 1)}
                                disabled={qty === 0}
                                aria-label={`Remove one ${item.name}`}
                                className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center disabled:opacity-40 hover:border-[#FFC629] transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-6 text-center font-sans font-black text-[15px] text-[#14181F]">{qty}</span>
                              <button
                                type="button"
                                onClick={() => setQty(item, qty + 1)}
                                aria-label={`Add one ${item.name}`}
                                className="w-8 h-8 rounded-full bg-[#FFC629] flex items-center justify-center hover:opacity-90 transition-opacity"
                              >
                                <Plus size={14} className="text-[#14181F]" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
              {PERKS.map((perk) => (
                <div key={perk.label} className="flex items-center gap-2">
                  <perk.icon size={16} className="text-[#B98900]" />
                  <span className="font-[family-name:var(--font-inter)] text-[12.5px] font-semibold text-[#14181F]/70">{perk.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-4 sticky top-28">
            <OrderSummaryPanel lines={lines} subtotal={subtotal} />
            <button
              type="button"
              onClick={handleContinue}
              disabled={lines.length === 0}
              className="inline-flex items-center justify-center gap-2 bg-[#14181F] text-white font-[family-name:var(--font-inter)] font-bold text-[14px] px-7 py-3.5 rounded-full hover:opacity-90 disabled:opacity-40 transition-all"
            >
              Continue to Schedule Pickup <ArrowRight size={16} />
            </button>
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
