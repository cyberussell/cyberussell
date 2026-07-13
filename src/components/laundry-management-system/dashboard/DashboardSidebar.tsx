'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Boxes,
  UserCog,
  BarChart3,
  Settings as SettingsIcon,
  LogOut,
  PackageCheck,
  Truck,
  Zap,
  History,
} from 'lucide-react'
import { signOut } from '@/app/laundry-management-system/actions/auth'
import { hasPermission, type Permission } from '@/lib/laundry-management-system/modules/auth/permissions'
import type { BusinessRole } from '@/lib/laundry-management-system/modules/auth/queries'
import { hasFeature, type FeatureFlag } from '@/lib/laundry-management-system/modules/billing/entitlements'
import type { PlanTier } from '@/lib/laundry-management-system/modules/tenant/types'

function buildNavItems(
  basePath: string
): { label: string; href: string; icon: typeof LayoutDashboard; permission: Permission; feature?: FeatureFlag }[] {
  return [
    { label: 'Dashboard', href: basePath, icon: LayoutDashboard, permission: 'view_dashboard' },
    { label: 'Orders', href: `${basePath}/orders`, icon: ClipboardList, permission: 'view_assigned_orders' },
    { label: 'Pickup', href: `${basePath}/pickup`, icon: PackageCheck, permission: 'manage_pickup', feature: 'feature_pickup_delivery' },
    { label: 'Delivery', href: `${basePath}/delivery`, icon: Truck, permission: 'manage_delivery', feature: 'feature_pickup_delivery' },
    { label: 'Priority Queue', href: `${basePath}/priority-queue`, icon: Zap, permission: 'view_priority_queue', feature: 'feature_priority_queue' },
    { label: 'Customers', href: `${basePath}/customers`, icon: Users, permission: 'view_customers' },
    { label: 'Inventory', href: `${basePath}/inventory`, icon: Boxes, permission: 'manage_inventory' },
    { label: 'Staff', href: `${basePath}/staff`, icon: UserCog, permission: 'manage_staff' },
    { label: 'Reports', href: `${basePath}/reports`, icon: BarChart3, permission: 'view_financial_reports' },
    { label: 'Activity', href: `${basePath}/activity`, icon: History, permission: 'view_activity_log' },
    { label: 'Settings', href: `${basePath}/settings`, icon: SettingsIcon, permission: 'change_business_settings' },
  ]
}

export default function DashboardSidebar({
  businessName,
  role = 'owner',
  basePath = '/laundry-management-system/dashboard',
  planTier = 'essential',
}: {
  businessName: string
  role?: BusinessRole
  basePath?: string
  planTier?: PlanTier
}) {
  const pathname = usePathname()
  const navItems = buildNavItems(basePath).filter((item) => hasPermission(role, item.permission))

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-blue-100/60 bg-white">
      <div className="flex items-center gap-3 border-b border-blue-100/60 px-6 py-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-sm font-bold text-white">
          {businessName.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#0B1B33]">{businessName}</p>
          <p className="text-xs text-slate-400">{role === 'owner' ? 'Owner' : 'Staff'}</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const active = item.href === basePath ? pathname === item.href : pathname.startsWith(item.href)
          const locked = item.feature ? !hasFeature({ plan_tier: planTier }, item.feature) : false
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white shadow-[0_4px_12px_-2px_rgba(37,99,235,0.35)]'
                  : 'text-slate-600 hover:bg-[#F0F6FF] hover:text-[#0B1B33]'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1">{item.label}</span>
              {locked && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${
                    active ? 'bg-white/20 text-white' : 'bg-[#F0F6FF] text-[#2563EB]'
                  }`}
                >
                  PRO
                </span>
              )}
            </Link>
          )
        })}
      </nav>
      <form action={signOut} className="border-t border-blue-100/60 p-3">
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-[#F0F6FF] hover:text-[#0B1B33]"
        >
          <LogOut className="h-5 w-5" />
          Log out
        </button>
      </form>
    </aside>
  )
}
