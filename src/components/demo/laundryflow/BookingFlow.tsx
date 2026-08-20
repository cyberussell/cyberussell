"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, ShieldCheck, Truck } from "lucide-react";
import { BOOKING_SERVICES, BOOKING_TIME_SLOTS } from "./data";

const STEPS = ["Contact", "Service", "Details"];

const TRUST = [
  { icon: ShieldCheck, title: "Safe & Sanitized", sub: "Expert cleaning with premium detergents." },
  { icon: Clock, title: "On-time Pickup", sub: "We value your time as much as you do." },
  { icon: Truck, title: "Free Delivery", sub: "Free delivery for orders within 3km." },
];

type FormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  address: string;
  date: string;
  time: string;
  notes: string;
};

const INITIAL_FORM: FormData = {
  name: "",
  phone: "",
  email: "",
  service: BOOKING_SERVICES[0].key,
  address: "",
  date: "",
  time: "",
  notes: "",
};

export default function BookingFlow() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const confirmed = step === 4;

  const update = (field: keyof FormData, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep((s) => Math.min(s + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="px-6 pt-12 md:pt-16 pb-16 md:pb-20">
      <div className="max-w-md md:max-w-2xl mx-auto">
        {!confirmed && (
          <div className="mb-10">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#E2E8F0] -z-10 -translate-y-1/2" />
              <motion.div
                className="absolute top-1/2 left-0 h-0.5 bg-[#FFC629] -z-10 -translate-y-1/2"
                initial={false}
                animate={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              {STEPS.map((label, i) => {
                const n = i + 1;
                const active = n <= step;
                return (
                  <div key={label} className="flex flex-col items-center gap-2 bg-[#FFF8E1] px-1">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-sans font-black text-[13px] transition-colors ${
                        active ? "bg-[#FFC629] text-[#14181F]" : "bg-[#E2E8F0] text-[#64748B]"
                      }`}
                    >
                      {n}
                    </div>
                    <span className={`font-[family-name:var(--font-inter)] text-[11px] font-bold ${active ? "text-[#B98900]" : "text-[#64748B]"}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(15,23,42,0.06)] border border-[#F1F5F9] overflow-hidden">
          <AnimatePresence mode="wait">
            {confirmed ? (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 md:p-10 text-center flex flex-col items-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-[#FFF3CC] text-[#14181F] flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="font-sans font-black text-[28px] text-[#14181F] mb-3">Booking Confirmed!</h2>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#64748B] max-w-sm mb-10 leading-relaxed">
                  Thank you for choosing Aling Maria, {form.name.split(" ")[0] || "friend"}! We&apos;ve received your request. One of our couriers
                  will contact you shortly for pickup.
                </p>
                <Link
                  href="/demo/laundryflow"
                  className="bg-[#FFC629] text-[#14181F] font-[family-name:var(--font-inter)] font-bold text-[14px] px-8 py-3.5 rounded-full hover:opacity-90 transition-all"
                >
                  Back to Home
                </Link>
              </motion.div>
            ) : (
              <motion.form
                key={step}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 md:p-8"
              >
                {step === 1 && (
                  <>
                    <h2 className="font-sans font-black text-[24px] text-[#0F172A] mb-2">Hello! Who&apos;s this?</h2>
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#64748B] mb-8">
                      We&apos;ll use these details to keep you updated on your laundry&apos;s journey.
                    </p>
                    <div className="space-y-5">
                      <Field label="Full Name">
                        <input
                          type="text"
                          required
                          placeholder="e.g. Carla Mendoza"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Phone Number">
                        <input
                          type="tel"
                          required
                          placeholder="09XX XXX XXXX"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Email Address (Optional)">
                        <input
                          type="email"
                          placeholder="carla@example.com"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                    </div>
                    <div className="mt-10 flex justify-end">
                      <NextButton label="Next: Service" />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="font-sans font-black text-[24px] text-[#0F172A] mb-2">Select Your Service</h2>
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#64748B] mb-8">Choose the care your clothes deserve.</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {BOOKING_SERVICES.map((s) => {
                        const selected = form.service === s.key;
                        return (
                          <label key={s.key} className="relative cursor-pointer">
                            <input
                              type="radio"
                              name="service"
                              value={s.key}
                              checked={selected}
                              onChange={() => update("service", s.key)}
                              className="sr-only"
                            />
                            <div
                              className={`p-5 rounded-xl border-2 flex flex-col gap-3 transition-all ${
                                selected ? "border-[#FFC629] bg-[#FFF8E1]" : "border-[#E2E8F0] hover:border-[#FFC629]/50"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="w-10 h-10 rounded-full bg-[#FFF3CC] text-[#14181F] flex items-center justify-center">
                                  <s.icon size={18} />
                                </span>
                                {selected && <CheckCircle2 size={18} className="text-[#B98900]" />}
                              </div>
                              <div>
                                <p className="font-sans font-black text-[15px] text-[#0F172A]">{s.service}</p>
                                <p className="font-[family-name:var(--font-inter)] text-[12.5px] text-[#64748B] mt-0.5">{s.desc}</p>
                                <p className="font-sans font-black text-[18px] text-[#B98900] mt-3">
                                  {s.price}
                                  <span className="text-[12px] font-normal text-[#64748B]"> {s.unit}</span>
                                </p>
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                    <div className="mt-10 flex justify-between">
                      <BackButton onClick={() => setStep(1)} />
                      <NextButton label="Next: Details" />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="font-sans font-black text-[24px] text-[#0F172A] mb-2">When and Where?</h2>
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#64748B] mb-8">
                      We offer free pickup within 3km of our branches.
                    </p>
                    <div className="space-y-5">
                      <Field label="Pickup Address">
                        <textarea
                          required
                          rows={3}
                          placeholder="Street, Barangay, City, Landmark"
                          value={form.address}
                          onChange={(e) => update("address", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="Preferred Date">
                          <input
                            type="date"
                            required
                            value={form.date}
                            onChange={(e) => update("date", e.target.value)}
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Preferred Time">
                          <select required value={form.time} onChange={(e) => update("time", e.target.value)} className={inputClass}>
                            <option value="">Select a slot</option>
                            {BOOKING_TIME_SLOTS.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>
                      <Field label="Notes for Courier">
                        <input
                          type="text"
                          placeholder="e.g. Near the yellow gate"
                          value={form.notes}
                          onChange={(e) => update("notes", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                    </div>
                    <div className="mt-10 flex justify-between">
                      <BackButton onClick={() => setStep(2)} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-[#14181F] text-white font-[family-name:var(--font-inter)] font-bold text-[14px] px-7 py-3.5 rounded-full hover:opacity-90 transition-all"
                      >
                        Confirm Pickup
                        <CheckCircle2 size={17} />
                      </button>
                    </div>
                  </>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {!confirmed && (
          <div className="mt-10 grid sm:grid-cols-3 gap-6 text-center">
            {TRUST.map((t) => (
              <div key={t.title} className="flex flex-col items-center gap-2">
                <t.icon size={24} className="text-[#B98900]" />
                <p className="font-sans font-black text-[13px] text-[#0F172A]">{t.title}</p>
                <p className="font-[family-name:var(--font-inter)] text-[11.5px] text-[#64748B]">{t.sub}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-[#FFF8E1] font-[family-name:var(--font-inter)] text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#FFC629] focus:ring-4 focus:ring-[#FFC629]/20 transition-all";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-[family-name:var(--font-inter)] text-[13px] font-bold text-[#0F172A] mb-2">{label}</label>
      {children}
    </div>
  );
}

function NextButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="inline-flex items-center gap-2 bg-[#FFC629] text-[#14181F] font-[family-name:var(--font-inter)] font-bold text-[14px] px-7 py-3.5 rounded-full hover:opacity-90 transition-all"
    >
      {label}
      <ArrowRight size={16} />
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 text-[#64748B] font-[family-name:var(--font-inter)] font-bold text-[14px] px-4 py-3.5 rounded-full hover:bg-[#F1F5F9] transition-all"
    >
      <ArrowLeft size={16} />
      Back
    </button>
  );
}
