"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import {
  BOOK_WITH_STYLIST_EVENT,
  SALON,
  fetchAppointmentServices,
  fetchAppointmentStaff,
  formatPeso,
  staffCanPerform,
  type AppointmentService,
  type AppointmentStaffMember,
} from "./data";
import { fadeUp } from "./motion";

// Kept as a display toggle (not deleted) so a future per-tenant config could
// flip panels without re-deriving this from scratch.
type BookingDisplay = "both" | "widget-only" | "qr-only";
const BOOKING_DISPLAY = "both" as BookingDisplay;
const showWidget = BOOKING_DISPLAY !== "qr-only";
const showQr = BOOKING_DISPLAY !== "widget-only";

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

  // Every staff member, each carrying which services they're restricted to
  // (or unrestricted). Fetched once — cross-filtering both dropdowns off
  // this single list (see eligibleServices/eligibleStaff below) keeps the
  // two directions in sync without racing separate per-direction fetches.
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
        if (!cancelled) setStaffError("Couldn't load stylists right now.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // "Book with X" on a stylist's profile preselects them here.
  useEffect(() => {
    function onBookWithStylist(e: Event) {
      const staffId = (e as CustomEvent<string>).detail;
      if (staffId) setStaffFilter(staffId);
    }
    window.addEventListener(BOOK_WITH_STYLIST_EVENT, onBookWithStylist);
    return () => window.removeEventListener(BOOK_WITH_STYLIST_EVENT, onBookWithStylist);
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

  // Two-way sync: picking a service narrows the stylist list, and picking a
  // stylist narrows the service list. Each effect only reacts to its own
  // trigger (not to the other's corrections), and always resolves to a pair
  // that's mutually valid — so they settle instead of fighting each other.
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
    if (!staffMember || staffMember.serviceIds === null) return; // unrestricted, any serviceId is fine
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

    fetch(`/appointments/api/book?business=${SALON.appointmentBusinessSlug}&service=${serviceId}`)
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
    return Array.from(seen.entries()).slice(0, 6);
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
          businessSlug: SALON.appointmentBusinessSlug,
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
    <section id="book" className="bg-[#141110] px-[8%] py-16 md:py-[110px]">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-14"
      >
        <div className="font-[family-name:var(--font-playfair)] italic text-[18px] text-[#c9a15a] mb-2.5">
          Ready for a change?
        </div>
        <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-[32px] md:text-[42px] text-[#f8f4ec] mb-4">
          Book Your Appointment
        </h2>
        <p className="text-[14px] md:text-[15px] text-[#b9b2a4] font-light max-w-[480px] mx-auto">
          Schedule online in under a minute, or scan the code in-salon — both connect straight to our live
          appointment calendar.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        custom={1}
        className="flex flex-col md:flex-row max-w-[1080px] mx-auto bg-[#1c1815] border border-[rgba(201,161,90,0.25)]"
      >
        {showWidget && (
          <div className="p-7 md:p-11 md:flex-[1.3]">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[12px] tracking-[1.5px] uppercase text-[#c9a15a]">Booking Widget</span>
              <span className="hidden sm:inline font-mono text-[10.5px] tracking-[1px] text-[#8a8378]">
                live via cyberussell.com/appointments
              </span>
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center text-center py-10 gap-4">
                <div className="w-14 h-14 rounded-full bg-[#c9a15a]/15 flex items-center justify-center">
                  <CheckCircle2 size={26} className="text-[#c9a15a]" />
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] font-semibold text-[22px] text-[#f8f4ec]">
                  You&apos;re booked!
                </h3>
                <p className="text-[13.5px] text-[#b9b2a4] max-w-[320px]">
                  {selectedSlot?.staffName} will see you{" "}
                  {selectedSlot && `${formatDateChip(selectedSlot.startsAt)} at ${formatTime(selectedSlot.startsAt)}`}. A
                  confirmation was sent to the salon — bring this up when you arrive.
                </p>
                <button
                  onClick={resetBooking}
                  className="mt-2 text-[13px] font-semibold text-[#c9a15a] hover:underline"
                >
                  Book another appointment
                </button>
              </div>
            ) : servicesError || staffError ? (
              <p className="text-[13px] text-[#e08a6b]">{servicesError ?? staffError}</p>
            ) : !services || !allStaff ? (
              <p className="text-[13px] text-[#8a8378]">Loading services…</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] tracking-[1px] uppercase text-[#8a8378] mb-2">Service</label>
                    <select
                      value={serviceId}
                      onChange={(e) => setServiceId(e.target.value)}
                      className="w-full px-3.5 py-3 bg-[#141110] border border-white/[0.12] text-[#e6e1d6] text-[14px] focus:outline-none focus:border-[#c9a15a]"
                    >
                      {eligibleServices.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} — {formatPeso(s.price)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[1px] uppercase text-[#8a8378] mb-2">Stylist</label>
                    <select
                      value={staffFilter}
                      onChange={(e) => setStaffFilter(e.target.value)}
                      disabled={eligibleStaff.length === 0}
                      className="w-full px-3.5 py-3 bg-[#141110] border border-white/[0.12] text-[#e6e1d6] text-[14px] focus:outline-none focus:border-[#c9a15a] disabled:opacity-50"
                    >
                      {eligibleStaff.length === 0 ? (
                        <option>No stylist offers this service</option>
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

                <div className="mb-[22px]">
                  <label className="block text-[11px] tracking-[1px] uppercase text-[#8a8378] mb-2">Date</label>
                  {loadingSlots ? (
                    <p className="text-[13px] text-[#8a8378]">Loading availability…</p>
                  ) : slotsError ? (
                    <p className="text-[13px] text-[#e08a6b]">{slotsError}</p>
                  ) : dates.length === 0 ? (
                    <p className="text-[13px] text-[#8a8378]">No upcoming availability for this selection.</p>
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
                            className={`px-3 py-2 border text-[12.5px] transition-colors ${
                              selectedDate === key
                                ? "border-[#c9a15a] text-[#c9a15a]"
                                : "border-white/[0.15] text-[#8a8378] hover:border-white/30"
                            }`}
                          >
                            {formatDateChip(iso)}
                          </button>
                        ))}
                      </div>

                      <label className="block text-[11px] tracking-[1px] uppercase text-[#8a8378] mb-2">Time</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timesForSelectedDate.map((slot) => (
                          <button
                            key={slot.startsAt}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2.5 border text-[13px] text-center transition-colors ${
                              selectedSlot?.startsAt === slot.startsAt
                                ? "border-[#c9a15a] text-[#c9a15a] bg-[#c9a15a]/[0.06]"
                                : "border-white/[0.12] text-[#b9b2a4] hover:border-white/25"
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-[22px]">
                    <p className="sm:col-span-2 text-[12.5px] text-[#8a8378]">
                      With <span className="text-[#c9a15a]">{selectedSlot.staffName}</span>,{" "}
                      {formatDateChip(selectedSlot.startsAt)} at {formatTime(selectedSlot.startsAt)}
                    </p>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] tracking-[1px] uppercase text-[#8a8378] mb-2">
                        Full name
                      </label>
                      <input
                        required
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Juan Dela Cruz"
                        className="w-full px-3.5 py-3 bg-[#141110] border border-white/[0.12] text-[#e6e1d6] text-[14px] placeholder:text-[#6f6a60] focus:outline-none focus:border-[#c9a15a]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] tracking-[1px] uppercase text-[#8a8378] mb-2">
                        Mobile number
                      </label>
                      <input
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="09XX XXX XXXX"
                        pattern="^09[0-9 \-]{9,11}$"
                        className="w-full px-3.5 py-3 bg-[#141110] border border-white/[0.12] text-[#e6e1d6] text-[14px] placeholder:text-[#6f6a60] focus:outline-none focus:border-[#c9a15a]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] tracking-[1px] uppercase text-[#8a8378] mb-2">
                        Note (optional)
                      </label>
                      <textarea
                        rows={2}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Anything the stylist should know?"
                        className="w-full px-3.5 py-3 bg-[#141110] border border-white/[0.12] text-[#e6e1d6] text-[14px] placeholder:text-[#6f6a60] focus:outline-none focus:border-[#c9a15a] resize-none"
                      />
                    </div>
                  </div>
                )}

                {submitError && <p className="text-[13px] text-[#e08a6b] mb-4">{submitError}</p>}

                <button
                  type="submit"
                  disabled={!selectedSlot || status === "submitting"}
                  className="w-full text-center py-[15px] bg-[#c9a15a] text-[#141110] text-[13px] tracking-[1.5px] uppercase font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#e0be82] transition-colors"
                >
                  {status === "submitting" ? "Booking…" : "Confirm Booking"}
                </button>
                <div className="mt-3.5 text-[11px] text-[#6f6a60] text-center">
                  Real booking — this creates an actual appointment for Ganda Beauty Salon.
                </div>
              </form>
            )}
          </div>
        )}

        {showQr && (
          <div
            className={`p-7 md:p-11 flex flex-col items-center justify-center text-center bg-[#181410] md:flex-1 ${
              showWidget ? "md:border-l border-[rgba(201,161,90,0.25)] border-t md:border-t-0" : ""
            }`}
          >
            <span className="text-[12px] tracking-[1.5px] uppercase text-[#c9a15a] mb-5">Walk-In? Scan to Book</span>
            <div className="relative w-[168px] h-[168px] border-8 border-[#f8f4ec] mb-[18px]">
              <Image
                src="/demo/ganda-beauty-salon/photos/booking-qr.png"
                alt="QR code to Ganda Beauty Salon's live booking page"
                fill
                sizes="168px"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
