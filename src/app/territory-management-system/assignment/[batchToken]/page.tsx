import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createAdminSupabase } from '@/lib/territory-management-system/supabase-server'
import { getBatchByToken } from '@/lib/territory-management-system/modules/assignment/queries'
import PartnershipCard from '@/components/territory-management-system/publisher/PartnershipCard'
import AssignmentEndedNotice from '@/components/territory-management-system/publisher/AssignmentEndedNotice'
import BatchLandingBottomMenu from '@/components/territory-management-system/publisher/BatchLandingBottomMenu'

export const dynamic = 'force-dynamic'

export default async function BatchLandingPage({ params }: { params: Promise<{ batchToken: string }> }) {
  const { batchToken } = await params
  const supabase = createAdminSupabase()
  const batch = await getBatchByToken(supabase, batchToken)
  if (!batch) notFound()
  if (batch.expired) return <AssignmentEndedNotice />

  return (
    <div className="min-h-screen bg-[#F3F8FF] px-4 pb-24 pt-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-xl font-bold text-[#0B1B33]">Today&apos;s Assignment</h1>
        <p className="mt-1 text-center text-sm text-slate-500">
          {batch.assignment_date} — {batch.territories.map((t) => t.name).join(', ') || '—'}
        </p>
        <p className="mt-4 text-center text-sm text-slate-500">Select your Partner below.</p>
        <div className="mt-4 space-y-3">
          {batch.partnerships.map((p) => (
            <PartnershipCard key={p.id} partnership={p} batchToken={batchToken} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href={`/territory-management-system/assignment/${batchToken}/progress`}
            className="text-sm font-medium text-[#2563EB] hover:underline"
          >
            View Today&apos;s Assignment Progress
          </Link>
        </div>
      </div>

      <BatchLandingBottomMenu batchToken={batchToken} />
    </div>
  )
}
