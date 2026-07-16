import { requireOwnerBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import DashboardShell from '@/components/laundry-management-system/dashboard/DashboardShell'

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { business } = await requireOwnerBusiness()

  return (
    <DashboardShell businessName={business.name} role="owner" basePath="/lms/dashboard" planTier={business.plan_tier}>
      {children}
    </DashboardShell>
  )
}
