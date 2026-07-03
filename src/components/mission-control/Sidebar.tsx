"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Map,
  Settings,
  LogOut,
  GraduationCap,
  Briefcase,
  ClipboardList,
} from "lucide-react";

const NAV = [
  { label: "Dashboard", href: "/mission-control", icon: LayoutDashboard },
  { label: "Career Blueprints", href: "/mission-control/blueprints", icon: BookOpen },
  { label: "Learning System", href: "/mission-control/learning-system", icon: GraduationCap },
  { label: "Service Catalog", href: "/mission-control/service-catalog", icon: Briefcase },
  { label: "Client Intake", href: "/mission-control/client-intake", icon: ClipboardList },
  { label: "Roadmap", href: "/mission-control/roadmap", icon: Map },
  { label: "Settings", href: "/mission-control/settings", icon: Settings },
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
        {NAV.map(({ label, href, icon: Icon }) => {
          const isActive = href === "/mission-control" ? pathname === href : pathname.startsWith(href);
          return (
            <a
              key={label}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg mb-0.5 font-[family-name:var(--font-inter)] text-[13px] transition-colors ${
                isActive
                  ? "bg-white/[0.08] text-white font-medium"
                  : "text-white/50 hover:text-white/70 hover:bg-white/[0.04]"
              }`}
            >
              <Icon size={16} strokeWidth={1.8} />
              {label}
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
