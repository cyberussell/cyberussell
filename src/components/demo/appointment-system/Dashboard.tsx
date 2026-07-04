"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Settings,
  Plus,
  X,
  Clock3,
  MapPin,
  Phone,
} from "lucide-react";
import { fadeUp } from "./motion";

const SIDEBAR = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: CalendarDays, label: "Calendar" },
  { icon: Users, label: "Clients" },
  { icon: Settings, label: "Settings" },
];

const TODAY = [
  { time: "9:00 AM", name: "Maria Santos", type: "Cleaning", status: "Confirmed" },
  { time: "10:30 AM", name: "James Cruz", type: "Consultation", status: "Confirmed" },
  { time: "1:00 PM", name: "Ana Reyes", type: "Follow-up", status: "Pending" },
];

const STATS = [
  { label: "Today", value: "8" },
  { label: "This Week", value: "34" },
  { label: "Cancellations", value: "2" },
  { label: "New Clients", value: "6" },
];

export default function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <section id="dashboard" className="px-6 md:px-10 py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-[560px] mb-14">
          <span className="block text-[#3B5BFF] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-3">
            Professional Dashboard
          </span>
          <h2 className="font-sans text-[28px] md:text-[38px] font-extrabold text-[#0B1220] leading-tight tracking-tight">
            Everything a professional needs, at a glance.
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative bg-[#FAFBFF] border border-[#0B1220]/[0.07] rounded-3xl shadow-[0_30px_80px_rgba(11,18,32,0.08)] overflow-hidden grid grid-cols-1 md:grid-cols-[200px_1fr]"
        >
          {/* Sidebar */}
          <div className="bg-white border-r border-[#0B1220]/[0.06] p-5 flex md:flex-col gap-1 overflow-x-auto">
            {SIDEBAR.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl shrink-0 ${
                  item.active ? "bg-[#3B5BFF]/10 text-[#3B5BFF]" : "text-[#0B1220]/45"
                }`}
              >
                <item.icon size={16} />
                <span className="font-[family-name:var(--font-inter)] text-[13px] font-semibold whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Main panel */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-sans text-[18px] font-bold text-[#0B1220]">Today&apos;s Appointments</h3>
              <button className="inline-flex items-center gap-1.5 bg-[#3B5BFF] text-white font-[family-name:var(--font-inter)] font-bold text-[12.5px] py-2 px-4 rounded-full hover:opacity-90 transition-all">
                <Plus size={14} />
                New Appointment
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white border border-[#0B1220]/[0.06] rounded-2xl p-4">
                  <p className="font-sans text-[22px] font-extrabold text-[#0B1220]">{s.value}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[11.5px] text-[#0B1220]/45 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Appointment list */}
            <div className="bg-white border border-[#0B1220]/[0.06] rounded-2xl divide-y divide-[#0B1220]/[0.05] mb-6">
              {TODAY.map((appt) => (
                <button
                  key={appt.name}
                  onClick={() => setDrawerOpen(true)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-[#FAFBFF] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#14B8A6]/10 flex items-center justify-center shrink-0">
                    <Clock3 size={15} className="text-[#14B8A6]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-[14px] font-bold text-[#0B1220] truncate">{appt.name}</p>
                    <p className="font-[family-name:var(--font-inter)] text-[12px] text-[#0B1220]/45">
                      {appt.time} · {appt.type}
                    </p>
                  </div>
                  <span
                    className={`font-[family-name:var(--font-inter)] text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                      appt.status === "Confirmed" ? "bg-[#14B8A6]/10 text-[#0F9488]" : "bg-[#F4B740]/15 text-[#B8790A]"
                    }`}
                  >
                    {appt.status}
                  </span>
                </button>
              ))}
            </div>

            {/* Mini calendar strip */}
            <div className="bg-white border border-[#0B1220]/[0.06] rounded-2xl p-4">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#0B1220]/40 uppercase tracking-[1.5px] mb-3">
                Upcoming — This Week
              </p>
              <div className="grid grid-cols-7 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                  <div key={day} className="flex flex-col items-center gap-1.5">
                    <span className="font-[family-name:var(--font-inter)] text-[10px] text-[#0B1220]/35">{day}</span>
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-sans text-[12px] font-bold ${
                        i === 2 ? "bg-[#3B5BFF] text-white" : "bg-[#FAFBFF] text-[#0B1220]/60"
                      }`}
                    >
                      {12 + i}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Appointment details drawer */}
          <AnimatePresence>
            {drawerOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-0 right-0 h-full w-full sm:w-[300px] bg-white border-l border-[#0B1220]/[0.08] shadow-2xl p-6 z-20"
              >
                <div className="flex items-center justify-between mb-6">
                  <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#0B1220]/40 uppercase tracking-[1.5px]">
                    Appointment Details
                  </p>
                  <button onClick={() => setDrawerOpen(false)} className="text-[#0B1220]/40 hover:text-[#0B1220]">
                    <X size={18} />
                  </button>
                </div>
                <h4 className="font-sans text-[18px] font-bold text-[#0B1220] mb-1">Maria Santos</h4>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#0B1220]/45 mb-6">Cleaning · 9:00 AM</p>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <MapPin size={15} className="text-[#3B5BFF]" />
                    <span className="font-[family-name:var(--font-inter)] text-[13px] text-[#0B1220]/65">BGC Office</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={15} className="text-[#3B5BFF]" />
                    <span className="font-[family-name:var(--font-inter)] text-[13px] text-[#0B1220]/65">0917 123 4567</span>
                  </div>
                </div>

                <button className="w-full mt-8 bg-[#0B1220] text-white font-[family-name:var(--font-inter)] font-bold text-[13px] py-3 rounded-full hover:opacity-90 transition-all">
                  Reschedule
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
