import { Toaster } from 'sonner'
import { requireCustomerAccess } from '@/lib/laundry-management-system/modules/auth/queries'
import CustomerBottomNav from '@/components/laundry-management-system/customer/CustomerBottomNav'

export const dynamic = 'force-dynamic'

export default async function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  await requireCustomerAccess()

  return (
    <div className="min-h-screen bg-[#F0FDFA] pb-24">
      <div className="mx-auto max-w-md px-4 pb-6 pt-6">{children}</div>
      <CustomerBottomNav />
      <Toaster position="top-center" richColors />
    </div>
  )
}
