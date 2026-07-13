import { BookOpen, CheckCircle2, ClipboardList, Clock, DoorClosed, FilePlus, Percent, PhoneOff, Repeat, Truck } from 'lucide-react'
import { requireGroupLeader } from '@/lib/territory-management-system/modules/auth/queries'
import { getBatchForDate } from '@/lib/territory-management-system/modules/assignment/queries'
import { getBatchStats } from '@/lib/territory-management-system/modules/reports/queries'
import { getAssignmentBatchQrDataUrl, getAssignmentBatchUrl } from '@/lib/territory-management-system/modules/assignment/qr'
import { todayInTimezone } from '@/lib/territory-management-system/modules/assignment/date'
import { VISIT_RESULT_LABELS } from '@/lib/territory-management-system/modules/records/schema'
import PageHeader from '@/components/territory-management-system/dashboard/PageHeader'
import StatCard from '@/components/territory-management-system/dashboard/StatCard'
import Card from '@/components/territory-management-system/dashboard/Card'
import PartnershipList from '@/components/territory-management-system/PartnershipList'

export const dynamic = 'force-dynamic'

export default async function GroupLeaderDashboardPage() {
  const { supabase, congregation } = await requireGroupLeader()
  const today = todayInTimezone(congregation.timezone)
  const batch = await getBatchForDate(supabase, congregation.id, today)

  if (!batch) {
    return (
      <div>
        <PageHeader title="Today's Assignment" subtitle={today} />
        <Card className="p-8 text-center text-sm text-slate-400">No assignment has been generated for today yet.</Card>
      </div>
    )
  }

  const stats = await getBatchStats(supabase, congregation.id, batch.id, congregation.timezone)
  if (!stats) return null
  const qrDataUrl = await getAssignmentBatchQrDataUrl(batch.access_token)
  const publicUrl = getAssignmentBatchUrl(batch.access_token)

  return (
    <div className="space-y-8">
      <PageHeader title="Today's Assignment" subtitle={today} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center gap-3 p-6 text-center lg:col-span-1">
          <h2 className="font-semibold text-[#0B1B33]">Assignment QR Code</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrDataUrl} alt="Assignment QR code" className="h-40 w-40" />
          <a href={publicUrl} target="_blank" rel="noopener noreferrer" className="break-all text-xs text-[#2563EB] hover:underline">
            {publicUrl}
          </a>
        </Card>
        <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-3">
          <StatCard icon={ClipboardList} label="Total Contact Records" value={stats.totalRecords} />
          <StatCard icon={CheckCircle2} label="Contact Records Completed" value={stats.completedRecords} />
          <StatCard icon={Clock} label="Remaining Contact Records" value={stats.remainingRecords} />
          <StatCard icon={Percent} label="Completion" value={`${stats.completionPct}%`} />
          <StatCard icon={FilePlus} label="New Contact Records Submitted" value={stats.newRecordsSubmitted} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 font-semibold text-[#0B1B33]">Visit Results</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard icon={ClipboardList} label={VISIT_RESULT_LABELS.initial_visit} value={stats.resultCounts.initial_visit} />
          <StatCard icon={Repeat} label={VISIT_RESULT_LABELS.return_visit} value={stats.resultCounts.return_visit} />
          <StatCard icon={BookOpen} label={VISIT_RESULT_LABELS.bible_study} value={stats.resultCounts.bible_study} />
          <StatCard icon={DoorClosed} label={VISIT_RESULT_LABELS.not_home} value={stats.resultCounts.not_home} />
          <StatCard icon={PhoneOff} label={VISIT_RESULT_LABELS.do_not_call} value={stats.resultCounts.do_not_call} />
          <StatCard icon={Truck} label={VISIT_RESULT_LABELS.moved} value={stats.resultCounts.moved} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 font-semibold text-[#0B1B33]">Partnership Progress</h2>
        <PartnershipList partnerships={stats.partnerships} />
      </div>
    </div>
  )
}
