"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Wrench,
  PenLine,
  ShoppingBag,
  Handshake,
  BarChart3,
  Map,
  Settings,
  LogOut,
  GraduationCap,
  Briefcase,
} from "lucide-react";

const NAV = [
  { label: "Dashboard", href: "/mission-control", icon: LayoutDashboard, active: true },
  { label: "Career Blueprints", href: "/mission-control/blueprints", icon: BookOpen, active: true },
  { label: "Learning System", href: "/mission-control/learning-system", icon: GraduationCap, active: true },
  { label: "Service Catalog", href: "/mission-control/service-catalog", icon: Briefcase, active: true },
  { label: "Guides", href: "#", icon: FileText, active: false },
  { label: "AI Tools", href: "#", icon: Wrench, active: false },
  { label: "Blog", href: "#", icon: PenLine, active: false },
  { label: "Digital Products", href: "#", icon: ShoppingBag, active: false },
  { label: "Affiliates", href: "#", icon: Handshake, active: false },
  { label: "Analytics", href: "#", icon: BarChart3, active: false },
  { label: "Roadmap", href: "/mission-control/roadmap", icon: Map, active: true },
  { label: "Settings", href: "#", icon: Settings, active: false },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/mission-control/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.push("/mission-control/login");
  }

  return (
    <aside className="w-[240px] h-screen bg-[#0e0e18] border-r border-white/[0.06] flex flex-col shrink-0 sticky top-0">
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <h2 className="font-sans text-[15px] font-bold text-white">Mission Control</h2>
        <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 mt-0.5">Cyberussell</p>
      </div>

      <nav className="flex-1 py-3 px-3 overflow-y-auto">
        {NAV.map(({ label, href, icon: Icon, active }) => {
          const isActive = active && (href === "/mission-control" ? pathname === href : pathname.startsWith(href));
          return (
            <a
              key={label}
              href={active ? href : undefined}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg mb-0.5 font-[family-name:var(--font-inter)] text-[13px] transition-colors ${
                isActive
                  ? "bg-white/[0.08] text-white font-medium"
                  : active
                    ? "text-white/50 hover:text-white/70 hover:bg-white/[0.04]"
                    : "text-white/20 cursor-default"
              }`}
            >
              <Icon size={16} strokeWidth={1.8} />
              {label}
              {!active && (
                <span className="ml-auto font-[family-name:var(--font-inter)] text-[9px] text-white/15 uppercase tracking-wide">Soon</span>
              )}
            </a>
          );
        })}
      </nav>

      <div className="px-3 py-3 border-t border-white/[0.06]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg w-full font-[family-name:var(--font-inter)] text-[13px] text-white/40 hover:text-white/60 hover:bg-white/[0.04] transition-colors"
        >
          <LogOut size={16} strokeWidth={1.8} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
