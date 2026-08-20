"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, CalendarCheck, Smartphone } from "lucide-react";
import {
  CLINIC,
  fetchAppointmentServices,
  fetchAppointmentStaff,
  formatPeso,
  staffCanPerform,
  type AppointmentService,
  type AppointmentStaffMember,
} from "./data";
import { fadeUp } from "./motion";

type Slot = { startsAt: string; endsAt: string; staffId: string; staffName: string; label: string };

function dateKey(iso: string) {
  return iso.slice(0, 10);
}
function formatDateChip(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export default function Booking() {
  const [services, setServices] = useState<AppointmentService[] | null>(null);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState("");

  const [allStaff, setAllStaff] = useState<AppointmentStaffMember[] | null>(null);
  const [staffError, setStaffError] = useState<string | null>(null);
  const [staffFilter, setStaffFilter] = useState("");

  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchAppointmentServices()
      .then((data) => {
        if (cancelled) return;
        setServices(data);
        if (data.length > 0) setServiceId(data[0].id);
      })
      .catch(() => {
        if (!cancelled) setServicesError("Couldn't load services right now.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchAppointmentStaff()
      .then((data) => {
        if (!cancelled) setAllStaff(data);
      })
      .catch(() => {
        if (!cancelled) setStaffError("Couldn't load dentists right now.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const eligibleStaff = useMemo(
    () => (allStaff ?? []).filter((s) => !serviceId || staffCanPerform(s, serviceId)),
    [allStaff, serviceId]
  );
  const eligibleServices = useMemo(() => {
    const staffMember = (allStaff ?? []).find((s) => s.id === staffFilter);
    if (!staffMember || staffMember.serviceIds === null) return services ?? [];
    return (services ?? []).filter((svc) => staffMember.serviceIds!.includes(svc.id));
  }, [services, allStaff, staffFilter]);

  // Two-way sync: picking a service narrows the dentist list, and picking a
  // dentist narrows the service list. Each effect only reacts to its own
  // trigger, and always resolves to a mutually valid pair so they settle
  // instead of fighting each other.
  useEffect(() => {
    if (!allStaff || !serviceId) return;
    const stillValid = allStaff.some((s) => s.id === staffFilter && staffCanPerform(s, serviceId));
    if (!stillValid) {
      const firstEligible = allStaff.find((s) => staffCanPerform(s, serviceId));
      setStaffFilter(firstEligible?.id ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId, allStaff]);

  useEffect(() => {
    if (!services || !staffFilter) return;
    const staffMember = (allStaff ?? []).find((s) => s.id === staffFilter);
    if (!staffMember || staffMember.serviceIds === null) return;
    const stillValid = staffMember.serviceIds.includes(serviceId);
    if (!stillValid) {
      const firstEligible = services.find((svc) => staffMember.serviceIds!.includes(svc.id));
      if (firstEligible) setServiceId(firstEligible.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffFilter, allStaff, services]);

  useEffect(() => {
    if (!serviceId) return;
    let cancelled = false;
    setLoadingSlots(true);
    setSlotsError(null);
    setSelectedSlot(null);

    fetch(`/appointments/api/book?business=${CLINIC.appointmentBusinessSlug}&service=${serviceId}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) {
          setSlotsError(data.error);
          setSlots([]);
        } else {
          setSlots(data.slots ?? []);
        }
      })
      .catch(() => {
        if (!cancelled) setSlotsError("Couldn't load available times. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });

    return () => {
      cancelled = true;
    };
  }, [serviceId]);

  const filteredSlots = useMemo(
    () => (slots ?? []).filter((s) => s.staffId === staffFilter),
    [slots, staffFilter]
  );

  const dates = useMemo(() => {
    const seen = new Map<string, string>();
    for (const s of filteredSlots) {
      const key = dateKey(s.startsAt);
      if (!seen.has(key)) seen.set(key, s.startsAt);
    }
    return Array.from(seen.entries()).slice(0, 8);
  }, [filteredSlots]);

  useEffect(() => {
    if (dates.length === 0) {
      setSelectedDate(null);
    } else if (!dates.some(([key]) => key === selectedDate)) {
      setSelectedDate(dates[0][0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dates]);

  const timesForSelectedDate = useMemo(
    () => filteredSlots.filter((s) => dateKey(s.startsAt) === selectedDate),
    [filteredSlots, selectedDate]
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedSlot) return;
    setStatus("submitting");
    setSubmitError(null);
    try {
      const res = await fetch("/appointments/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessSlug: CLINIC.appointmentBusinessSlug,
          serviceId,
          staffId: selectedSlot.staffId,
          startsAt: selectedSlot.startsAt,
          fullName,
          phone,
          note: note || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch {
      setSubmitError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  function resetBooking() {
    setSelectedSlot(null);
    setFullName("");
    setPhone("");
    setNote("");
    setStatus("idle");
    setSubmitError(null);
  }

  return (
    <section id="booking" className="px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-[520px] mx-auto mb-12">
          <span className="block text-[#0D9488] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-3">
            Book a Visit
          </span>
          <h2 className="font-sans text-[28px] md:text-[38px] font-extrabold text-[#0B1220] leading-tight tracking-tight mb-3">
            Let&apos;s get your smile sorted.
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-[#0B1220]/55 leading-[1.7]">
            Book online in under a minute — this connects straight to our live appointment calendar.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
          className="flex-1 bg-white border border-[#0B1220]/[0.07] rounded-3xl p-6 md:p-10 shadow-[0_20px_60px_rgba(11,18,32,0.06)]"
        >
          <AnimatePresence>
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center py-10 gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-[#0D9488]/10 flex items-center justify-center"
                >
                  <CheckCircle2 size={32} className="text-[#0D9488]" />
                </motion.div>
                <h3 className="font-sans text-[20px] font-bold text-[#0B1220]">You&apos;re booked!</h3>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#0B1220]/55 max-w-[360px]">
                  {selectedSlot?.staffName} will see you{" "}
                  {selectedSlot && `${formatDateChip(selectedSlot.startsAt)} at ${formatTime(selectedSlot.startsAt)}`}. A
                  confirmation was sent to the clinic — bring this up when you arrive.
                </p>
                <button
                  onClick={resetBooking}
                  className="mt-2 font-[family-name:var(--font-inter)] text-[13px] font-semibold text-[#0D9488] hover:underline"
                >
                  Book another appointment
                </button>
              </motion.div>
            ) : servicesError || staffError ? (
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#e04f3c] py-10 text-center">
                {servicesError ?? staffError}
              </p>
            ) : !services || !allStaff ? (
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#0B1220]/45 py-10 text-center">
                Loading services…
              </p>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[family-name:var(--font-inter)] text-[12px] font-semibold text-[#0B1220]/60">Service</label>
                    <select
                      value={serviceId}
                      onChange={(e) => setServiceId(e.target.value)}
                      className="border border-[#0B1220]/[0.12] rounded-xl px-4 py-3 text-[14px] font-[family-name:var(--font-inter)] text-[#0B1220] focus:outline-none focus:border-[#0D9488] transition-colors"
                    >
                      {eligibleServices.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} — {formatPeso(s.price)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[family-name:var(--font-inter)] text-[12px] font-semibold text-[#0B1220]/60">Dentist</label>
                    <select
                      value={staffFilter}
                      onChange={(e) => setStaffFilter(e.target.value)}
                      disabled={eligibleStaff.length === 0}
                      className="border border-[#0B1220]/[0.12] rounded-xl px-4 py-3 text-[14px] font-[family-name:var(--font-inter)] text-[#0B1220] focus:outline-none focus:border-[#0D9488] transition-colors disabled:opacity-50"
                    >
                      {eligibleStaff.length === 0 ? (
                        <option>No dentist offers this service</option>
                      ) : (
                        eligibleStaff.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <label className="font-[family-name:var(--font-inter)] text-[12px] font-semibold text-[#0B1220]/60 mb-2 block">Date</label>
                  {loadingSlots ? (
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#0B1220]/45">Loading availability…</p>
                  ) : slotsError ? (
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#e04f3c]">{slotsError}</p>
                  ) : dates.length === 0 ? (
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#0B1220]/45">No upcoming availability for this selection.</p>
                  ) : (
                    <>
                      <div className="flex gap-2 flex-wrap mb-4">
                        {dates.map(([key, iso]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => {
                              setSelectedDate(key);
                              setSelectedSlot(null);
                            }}
                            className={`px-3.5 py-2 rounded-full border font-[family-name:var(--font-inter)] text-[12.5px] transition-colors ${
                              selectedDate === key
                                ? "border-[#0D9488] bg-[#0D9488]/10 text-[#0D9488] font-semibold"
                                : "border-[#0B1220]/[0.12] text-[#0B1220]/55 hover:border-[#0D9488]/40"
                            }`}
                          >
                            {formatDateChip(iso)}
                          </button>
                        ))}
                      </div>

                      <label className="font-[family-name:var(--font-inter)] text-[12px] font-semibold text-[#0B1220]/60 mb-2 block">Time</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timesForSelectedDate.map((slot) => (
                          <button
                            key={slot.startsAt}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2.5 rounded-xl border font-[family-name:var(--font-inter)] text-[13px] text-center transition-colors ${
                              selectedSlot?.startsAt === slot.startsAt
                                ? "border-[#0D9488] bg-[#0D9488]/10 text-[#0D9488] font-semibold"
                                : "border-[#0B1220]/[0.12] text-[#0B1220]/70 hover:border-[#0D9488]/40"
                            }`}
                          >
                            {formatTime(slot.startsAt)}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {selectedSlot && (
                  <div className="grid grid-cols-1 gap-5 mb-5">
                    <p className="font-[family-name:var(--font-inter)] text-[12.5px] text-[#0B1220]/55">
                      With <span className="text-[#0D9488] font-semibold">{selectedSlot.staffName}</span>,{" "}
                      {formatDateChip(selectedSlot.startsAt)} at {formatTime(selectedSlot.startsAt)}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-[family-name:var(--font-inter)] text-[12px] font-semibold text-[#0B1220]/60">Full Name</label>
                        <input
                          required
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Juan Dela Cruz"
                          className="border border-[#0B1220]/[0.12] rounded-xl px-4 py-3 text-[14px] font-[family-name:var(--font-inter)] text-[#0B1220] focus:outline-none focus:border-[#0D9488] transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-[family-name:var(--font-inter)] text-[12px] font-semibold text-[#0B1220]/60">Phone Number</label>
                        <input
                          required
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="09XX XXX XXXX"
                          pattern="^09[0-9 \-]{9,11}$"
                          className="border border-[#0B1220]/[0.12] rounded-xl px-4 py-3 text-[14px] font-[family-name:var(--font-inter)] text-[#0B1220] focus:outline-none focus:border-[#0D9488] transition-colors"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-[family-name:var(--font-inter)] text-[12px] font-semibold text-[#0B1220]/60">Message (optional)</label>
                      <textarea
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Tell us a bit about your concern..."
                        className="border border-[#0B1220]/[0.12] rounded-xl px-4 py-3 text-[14px] font-[family-name:var(--font-inter)] text-[#0B1220] focus:outline-none focus:border-[#0D9488] transition-colors resize-none"
                      />
                    </div>
                  </div>
                )}

                {submitError && (
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#e04f3c] mb-4">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={!selectedSlot || status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#FF6B57] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3.5 rounded-full hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <CalendarCheck size={17} />
                  {status === "submitting" ? "Booking…" : "Confirm Booking"}
                </button>
                <div className="mt-3.5 text-center font-[family-name:var(--font-inter)] text-[11px] text-[#0B1220]/35">
                  Real booking — this creates an actual appointment for Bright Smiles Dental Studio.
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={2}
          className="lg:w-[260px] bg-white border border-[#0B1220]/[0.07] rounded-3xl p-6 md:p-8 shadow-[0_20px_60px_rgba(11,18,32,0.06)] flex flex-col items-center text-center justify-center gap-4"
        >
          <span className="w-10 h-10 rounded-full bg-[#0D9488]/10 flex items-center justify-center">
            <Smartphone size={18} className="text-[#0D9488]" />
          </span>
          <div>
            <p className="font-sans text-[15px] font-bold text-[#0B1220]">Book on your phone</p>
            <p className="font-[family-name:var(--font-inter)] text-[12.5px] text-[#0B1220]/50 mt-1">
              Scan to open this booking page on your mobile.
            </p>
          </div>
          <div className="relative w-[140px] h-[140px] rounded-xl overflow-hidden border border-[#0B1220]/[0.08]">
            <Image
              src="/demo/luma-dental/photos/booking-qr.png"
              alt="QR code to book an appointment at Bright Smiles Dental Studio"
              fill
              sizes="140px"
              className="object-contain"
            />
          </div>
        </motion.div>
        </div>

        <p className="text-center font-[family-name:var(--font-inter)] text-[12px] text-[#0B1220]/35 mt-5">
          Prefer to call? {CLINIC.phone} &middot; {CLINIC.hours}
        </p>
      </div>
    </section>
  );
}
