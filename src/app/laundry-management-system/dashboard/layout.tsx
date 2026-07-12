import { Toaster } from 'sonner'
import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import DashboardSidebar from '@/components/laundry-management-system/dashboard/DashboardSidebar'

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { business } = await requireOwnerBusiness()

  return (
    <div className="flex min-h-screen bg-[#F3F8FF]">
      <DashboardSidebar
        businessName={business.name}
        role="owner"
        basePath="/laundry-management-system/dashboard"
        planTier={business.plan_tier}
      />
      <main className="flex-1 overflow-x-hidden px-6 py-8 sm:px-10">{children}</main>
      <Toaster position="bottom-right" richColors />
    </div>
  )
}
