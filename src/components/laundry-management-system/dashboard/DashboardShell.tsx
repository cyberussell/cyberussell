'use client'

import { useState } from 'react'
import { Toaster } from 'sonner'
import DashboardSidebar from './DashboardSidebar'
import TopBar from './TopBar'
import type { BusinessRole } from '@/lib/laundry-management-system/modules/auth/queries'
import type { PlanTier } from '@/lib/laundry-management-system/modules/tenant/types'

// Owns the one piece of client state (is the mobile nav drawer open) shared
// between the sidebar and the top bar's hamburger button — both layouts
// (owner + staff) render this instead of wiring the two up separately.
export default function DashboardShell({
  businessName,
  role,
  basePath,
  planTier,
  children,
}: {
  businessName: string
  role: BusinessRole
  basePath: string
  planTier: PlanTier
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#F0FDFA]">
      <DashboardSidebar
        businessName={businessName}
        role={role}
        basePath={basePath}
        planTier={planTier}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <main className="flex-1 overflow-x-hidden">
        <TopBar businessName={businessName} role={role === 'owner' ? 'owner' : 'staff'} onMenuClick={() => setMobileOpen(true)} />
        <div className="px-6 py-8 sm:px-10">{children}</div>
      </main>
      <Toaster position="bottom-right" richColors />
    </div>
  )
}
