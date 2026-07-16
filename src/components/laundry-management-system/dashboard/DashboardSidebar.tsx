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
  Sparkles,
  Tags,
} from 'lucide-react'
import { signOut } from '@/app/lms/actions/auth'
import { hasPermission, type Permission } from '@/lib/laundry-management-system/modules/auth/permissions'
import type { BusinessRole } from '@/lib/laundry-management-system/modules/auth/queries'
import { hasFeature, PLANS, type FeatureFlag } from '@/lib/laundry-management-system/modules/billing/entitlements'
import type { PlanTier } from '@/lib/laundry-management-system/modules/tenant/types'
import Avatar from './Avatar'

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
    { label: 'Service Catalog', href: `${basePath}/catalog`, icon: Tags, permission: 'manage_service_catalog' },
    { label: 'Staff', href: `${basePath}/staff`, icon: UserCog, permission: 'manage_staff' },
    { label: 'Reports', href: `${basePath}/reports`, icon: BarChart3, permission: 'view_financial_reports' },
    { label: 'Activity', href: `${basePath}/activity`, icon: History, permission: 'view_activity_log' },
    { label: 'Settings', href: `${basePath}/settings`, icon: SettingsIcon, permission: 'change_business_settings' },
  ]
}

export default function DashboardSidebar({
  businessName,
  role = 'owner',
  basePath = '/lms/dashboard',
  planTier = 'essential',
  mobileOpen = false,
  onClose,
}: {
  businessName: string
  role?: BusinessRole
  basePath?: string
  planTier?: PlanTier
  mobileOpen?: boolean
  onClose?: () => void
}) {
  const pathname = usePathname()
  const navItems = buildNavItems(basePath).filter((item) => hasPermission(role, item.permission))

  return (
    <>
      {mobileOpen && (
        <div
          role="presentation"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64 shrink-0 flex-col border-r border-teal-100/60 bg-white transition-transform duration-200 lg:sticky lg:top-0 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
      <div className="flex items-center gap-3 border-b border-teal-100/60 px-6 py-5">
        <Avatar name={businessName} size="md" />
        <div className="min-w-0">
          <p className="line-clamp-2 text-sm font-semibold leading-tight text-[#0B1B33]" title={businessName}>
            {businessName}
          </p>
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
              onClick={onClose}
              className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                active
                  ? 'bg-gradient-to-r from-[#0D9488] to-[#22D3EE] text-white shadow-[0_4px_12px_-2px_rgba(13,148,136,0.35)]'
                  : 'text-slate-600 hover:bg-[#CCFBF1] hover:text-[#0B1B33]'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1">{item.label}</span>
              {locked && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${
                    active ? 'bg-white/20 text-white' : 'bg-[#CCFBF1] text-[#0D9488]'
                  }`}
                >
                  PRO
                </span>
              )}
            </Link>
          )
        })}
      </nav>
      {role === 'owner' && planTier === 'essential' && (
        <div className="mx-3 mb-3 rounded-3xl bg-gradient-to-br from-[#0D9488] to-[#22D3EE] p-4 text-white">
          <Sparkles className="h-5 w-5" />
          <p className="mt-2 text-sm font-semibold">Upgrade to {PLANS.professional.name}</p>
          <p className="mt-1 text-xs text-white/80">
            Unlock pickup, delivery, priority queue &amp; more for ₱{PLANS.professional.priceMonthly.toLocaleString('en-PH')}/mo.
          </p>
          <Link
            href="/lms#pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold transition hover:bg-white/25"
          >
            See pricing
          </Link>
        </div>
      )}
      <form action={signOut} className="border-t border-teal-100/60 p-3">
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-[#CCFBF1] hover:text-[#0B1B33]"
        >
          <LogOut className="h-5 w-5" />
          Log out
        </button>
      </form>
      </aside>
    </>
  )
}
