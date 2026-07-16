import { requireStaffAccess } from '@/lib/laundry-management-system/modules/auth/queries'
import DashboardShell from '@/components/laundry-management-system/dashboard/DashboardShell'

export const dynamic = 'force-dynamic'

export default async function StaffDashboardLayout({ children }: { children: React.ReactNode }) {
  const { business } = await requireStaffAccess()

  return (
    <DashboardShell businessName={business.name} role="staff" basePath="/lms/staff/dashboard" planTier={business.plan_tier}>
      {children}
    </DashboardShell>
  )
}
