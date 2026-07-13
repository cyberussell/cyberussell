'use client'

import { useState } from 'react'
import { BookOpen, CheckCircle2, ClipboardList, Clock, DoorClosed, FilePlus, Percent, PhoneOff, Repeat, Truck } from 'lucide-react'
import type { ReportStats } from '@/lib/territory-management-system/modules/reports/queries'
import { VISIT_RESULT_LABELS } from '@/lib/territory-management-system/modules/records/schema'
import FilterPills from '@/components/territory-management-system/dashboard/FilterPills'
import StatCard from '@/components/territory-management-system/dashboard/StatCard'

type Period = 'daily' | 'weekly' | 'monthly'

const PERIODS: { label: string; value: Period }[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
]

export default function ReportsView({ daily, weekly, monthly }: { daily: ReportStats; weekly: ReportStats; monthly: ReportStats }) {
  const [period, setPeriod] = useState<Period>('daily')
  const stats = { daily, weekly, monthly }[period]

  return (
    <div className="space-y-6">
      <FilterPills options={PERIODS} active={period} onChange={setPeriod} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard icon={ClipboardList} label="Total Contact Records" value={stats.totalRecords} />
        <StatCard icon={CheckCircle2} label="Completed" value={stats.completedRecords} />
        <StatCard icon={Clock} label="Remaining" value={stats.remainingRecords} />
        <StatCard icon={Percent} label="Completion" value={`${stats.completionPct}%`} />
        <StatCard icon={FilePlus} label="New Contact Records Submitted" value={stats.newRecordsSubmitted} />
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
    </div>
  )
}
