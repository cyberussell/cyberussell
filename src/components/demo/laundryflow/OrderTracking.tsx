"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { ORDER_TRACKING } from "./data";
import { fadeUp } from "./motion";
import BrowserWindow from "./BrowserWindow";

const FLOW: string[] = ["received", "sorting", "washing", "drying", "folding", "ready_for_pickup"];

const STATUS_LABELS: Record<string, string> = {
  received: "Received",
  sorting: "Sorting",
  washing: "Washing",
  drying: "Drying",
  folding: "Folding",
  ready_for_pickup: "Ready for Pickup",
  out_for_delivery: "Out for Delivery",
  completed: "Completed",
  cancelled: "Cancelled",
};

type StatusHistoryEntry = { status: string; changed_at: string };

type TrackedOrder = {
  order_number: string;
  service_label: string;
  amount: number;
  currency: string;
  status: string;
  status_history: StatusHistoryEntry[];
};

function formatTime(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function Stepper({ status, history }: { status: string; history: StatusHistoryEntry[] }) {
  if (status === "cancelled") {
    return (
      <div className="rounded-xl bg-red-50 text-red-700 text-[14px] font-semibold px-4 py-3">This order was cancelled.</div>
    );
  }

  const currentIdx = FLOW.indexOf(status);
  const pastFlow = currentIdx === -1; // out_for_delivery / completed — the whole shop flow is done

  return (
    <div>
      {FLOW.map((key, i) => {
        const done = pastFlow || i < currentIdx;
        const active = !pastFlow && i === currentIdx;
        const dotBg = active ? "#FFC629" : done ? "#FFF3CC" : "#F1F5F9";
        const dotColor = active ? "#14181F" : done ? "#B98900" : "#94A3B8";
        const lineColor = done || active ? "#FFE9A3" : "#F1F5F9";
        const labelColor = active ? "#B98900" : done ? "#14181F" : "#94A3B8";
        const entry = history.find((h) => h.status === key);
        return (
          <div key={key} className="flex gap-3.5">
            <div className="flex flex-col items-center">
              <span
                className="w-[26px] h-[26px] rounded-full shrink-0 flex items-center justify-center text-[13px] font-bold"
                style={{ background: dotBg, color: dotColor }}
              >
                {done ? "✓" : i + 1}
              </span>
              <span className="w-[2px] flex-1 min-h-[22px]" style={{ background: lineColor }} />
            </div>
            <div className="pb-6">
              <div className="text-[14px] font-bold" style={{ color: labelColor }}>
                {STATUS_LABELS[key]}
              </div>
              <div className="text-[12px] text-[#94A3B8]">{entry ? formatTime(entry.changed_at) : done || active ? "" : "Pending"}</div>
            </div>
          </div>
        );
      })}

      {(status === "out_for_delivery" || status === "completed") && (
        <div
          className="rounded-xl text-[14px] font-bold px-4 py-3"
          style={{ background: status === "completed" ? "#DCFCE7" : "#FFF3CC", color: status === "completed" ? "#15803D" : "#B98900" }}
        >
          {STATUS_LABELS[status]}
        </div>
      )}
    </div>
  );
}

export default function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackedOrder | null>(null);

  const currentIdx = ORDER_TRACKING.steps.findIndex((s) => s.label === ORDER_TRACKING.currentStep);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/lms/api/track?orderNumber=${encodeURIComponent(orderNumber.trim())}&phone=${encodeURIComponent(phone.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setResult(null);
      } else {
        setResult(data);
      }
    } catch {
      setError("Couldn't reach the tracking system. Please try again.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="dashboard" className="bg-[#FFF8E1] px-6 py-16 md:py-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center max-w-xl mx-auto mb-10"
      >
        <p className="font-[family-name:var(--font-inter)] text-[11px] font-black tracking-[2px] text-[#B98900] mb-2.5">{ORDER_TRACKING.eyebrow}</p>
        <h2 className="font-sans font-black text-[28px] md:text-[32px] text-[#14181F] mb-3">{ORDER_TRACKING.heading}</h2>
        <p className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.7] text-[#14181F]/60">{ORDER_TRACKING.body}</p>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1} className="max-w-3xl mx-auto">
        <BrowserWindow url={ORDER_TRACKING.demoUrl}>
          <div className="p-6 md:p-9">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-end gap-3 mb-7">
              <div className="flex-1">
                <label htmlFor="track-order-number" className="block text-[12px] font-bold text-[#14181F]/70 mb-1.5">
                  Order Number
                </label>
                <input
                  id="track-order-number"
                  name="orderNumber"
                  autoComplete="off"
                  required
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. ORD-000041"
                  className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-white text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#FFC629] focus:ring-4 focus:ring-[#FFC629]/20 transition-all"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="track-order-phone" className="block text-[12px] font-bold text-[#14181F]/70 mb-1.5">
                  Phone Number
                </label>
                <input
                  id="track-order-phone"
                  name="phone"
                  autoComplete="tel"
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09XX XXX XXXX"
                  className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-white text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#FFC629] focus:ring-4 focus:ring-[#FFC629]/20 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 bg-[#14181F] text-white font-bold text-[14px] px-6 py-3 rounded-lg hover:opacity-90 disabled:opacity-60 transition-all shrink-0"
              >
                <Search size={16} />
                {loading ? "Checking…" : "Track"}
              </button>
            </form>

            {error && <p className="text-[13.5px] font-semibold text-red-600 mb-6">{error}</p>}

            <div className="flex justify-between items-start mb-7">
              <div>
                <div className="text-[12px] text-[#64748B]">Order</div>
                <div className="font-sans text-[20px] font-black text-[#14181F]">{result?.order_number ?? ORDER_TRACKING.orderNumber}</div>
              </div>
              <div className="text-right">
                <div className="text-[12px] text-[#64748B]">Service</div>
                <div className="font-[family-name:var(--font-inter)] text-[14px] font-semibold text-[#14181F]">
                  {result?.service_label ?? ORDER_TRACKING.orderService}
                </div>
              </div>
            </div>

            {result ? (
              <Stepper status={result.status} history={result.status_history} />
            ) : (
              <div>
                {ORDER_TRACKING.steps.map((step, i) => {
                  const done = i < currentIdx;
                  const active = i === currentIdx;
                  const dotBg = active ? "#FFC629" : done ? "#FFF3CC" : "#F1F5F9";
                  const dotColor = active ? "#14181F" : done ? "#B98900" : "#94A3B8";
                  const lineColor = done || active ? "#FFE9A3" : "#F1F5F9";
                  const labelColor = active ? "#B98900" : done ? "#14181F" : "#94A3B8";
                  return (
                    <div key={step.label} className="flex gap-3.5">
                      <div className="flex flex-col items-center">
                        <span
                          className="w-[26px] h-[26px] rounded-full shrink-0 flex items-center justify-center text-[13px] font-bold"
                          style={{ background: dotBg, color: dotColor }}
                        >
                          {done ? "✓" : i + 1}
                        </span>
                        <span className="w-[2px] flex-1 min-h-[22px]" style={{ background: lineColor }} />
                      </div>
                      <div className="pb-6">
                        <div className="text-[14px] font-bold" style={{ color: labelColor }}>
                          {step.label}
                        </div>
                        <div className="text-[12px] text-[#94A3B8]">{step.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </BrowserWindow>

        <p className="font-[family-name:var(--font-inter)] text-[12.5px] text-[#14181F]/45 text-center mt-4">
          This is a real order lookup — try order number{" "}
          <span className="font-bold text-[#14181F]/70">{ORDER_TRACKING.demoOrderNumber}</span>, phone{" "}
          <span className="font-bold text-[#14181F]/70">{ORDER_TRACKING.demoPhone}</span>
        </p>
      </motion.div>
    </section>
  );
}
