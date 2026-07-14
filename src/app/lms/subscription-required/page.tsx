import { redirect } from 'next/navigation'
import { CircleAlert, Clock } from 'lucide-react'
import { resolveBlockedBusiness } from '@/lib/laundry-management-system/modules/auth/queries'
import { getSubscriptionBlock } from '@/lib/laundry-management-system/modules/billing/subscription'
import { AuthHeader, AuthFooter } from '@/components/laundry-management-system/AuthChrome'
import { signOut } from '@/app/lms/actions/auth'

export const dynamic = 'force-dynamic'

const ROLE_DASHBOARD: Record<'owner' | 'staff', string> = {
  owner: '/lms/dashboard',
  staff: '/lms/staff/dashboard',
}

export default async function SubscriptionRequiredPage() {
  const resolved = await resolveBlockedBusiness()
  if (!resolved) redirect('/lms/login')
  const { business, role } = resolved

  // Landed here with nothing actually blocking the business anymore (e.g. a
  // stale bookmark from before Russell reactivated it) — send them on rather
  // than show a confusing "blocked" screen for an account that isn't blocked.
  const block = getSubscriptionBlock(business)
  if (!block) redirect(ROLE_DASHBOARD[role])

  const isSuspended = block === 'suspended'

  return (
    <div className="flex min-h-screen flex-col bg-[#050816]">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          {isSuspended ? (
            <CircleAlert className="mx-auto mb-4 h-10 w-10 text-red-400" aria-hidden />
          ) : (
            <Clock className="mx-auto mb-4 h-10 w-10 text-amber-300" aria-hidden />
          )}
          <h1 className="text-xl font-bold text-white">
            {isSuspended ? 'This account is suspended' : 'Your free trial has ended'}
          </h1>
          <p className="mt-2 text-sm text-white/50">
            {isSuspended
              ? `${business.name}'s subscription is currently suspended. Contact your account manager to reactivate it.`
              : `${business.name}'s 14-day trial ended. Contact your account manager to continue on a paid plan.`}
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href="https://www.cyberussell.com/services/inquire"
              className="rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Contact us to reactivate
            </a>
            <form action={signOut}>
              <button
                type="submit"
                className="w-full rounded-lg border border-white/10 py-2.5 text-sm font-medium text-white/60 transition hover:border-white/20 hover:text-white"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </main>
      <AuthFooter />
    </div>
  )
}
