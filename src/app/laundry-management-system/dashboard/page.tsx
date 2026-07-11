import { requireOwnerBusiness } from '@/lib/laundry-management-system/auth'
import { signOut } from '../actions'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const { business } = await requireOwnerBusiness()

  return (
    <div className="min-h-screen bg-[#050816] px-4 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-white/40">Welcome to</p>
            <h1 className="text-2xl font-bold">{business.name}</h1>
          </div>
          <form action={signOut}>
            <button type="submit" className="text-sm text-white/40 hover:text-[#38BDF8] transition">
              Log out
            </button>
          </form>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-white/60">
            Your business account is set up. Branches, staff, services, and order tracking are coming
            in the next build phase.
          </p>
        </div>
      </div>
    </div>
  )
}
