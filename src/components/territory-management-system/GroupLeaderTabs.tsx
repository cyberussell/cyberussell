'use client'

import { useState } from 'react'
import {
  BookOpen,
  CheckCircle2,
  CircleSlash,
  ClipboardList,
  Clock,
  DoorClosed,
  FilePlus,
  HelpCircle,
  Percent,
  PhoneOff,
  Repeat,
  Truck,
} from 'lucide-react'
import type { BatchStats } from '@/lib/territory-management-system/modules/reports/queries'
import { VISIT_RESULT_LABELS } from '@/lib/territory-management-system/modules/records/schema'
import { deleteGroupLeaderAssignmentAction } from '@/app/territory-management-system/actions/group-leader'
import StatCard from '@/components/territory-management-system/dashboard/StatCard'
import Card from '@/components/territory-management-system/dashboard/Card'
import ConfirmDeleteButton from '@/components/territory-management-system/dashboard/ConfirmDeleteButton'
import PartnershipList from '@/components/territory-management-system/PartnershipList'
import AssignmentForm from '@/components/territory-management-system/AssignmentForm'

type Tab = 'home' | 'dashboard' | 'results' | 'progress'

const TABS: { id: Tab; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'results', label: 'Visit Results' },
  { id: 'progress', label: 'Ministry Partner' },
]

export default function GroupLeaderTabs({
  batchId,
  qrDataUrl,
  publicUrl,
  activeTerritories,
  stats,
}: {
  batchId: string
  qrDataUrl: string
  publicUrl: string
  activeTerritories: { id: string; name: string; approvedCount: number }[]
  stats: BatchStats
}) {
  const [tab, setTab] = useState<Tab>('home')
  const base = 'flex-1 rounded-xl px-2 py-3 text-center text-sm font-semibold leading-tight transition'
  const active = 'bg-[#2563EB] text-white'
  const inactive = 'bg-blue-50 text-[#2563EB] hover:bg-blue-100'

  return (
    <div>
      <nav
        className="sticky top-0 z-10 mb-6 flex gap-2 rounded-2xl border border-blue-100/60 bg-white/95 p-2 shadow-sm backdrop-blur"
        aria-label="Assignment sections"
      >
        {TABS.map((t) => (
          <button key={t.id} type="button" onClick={() => setTab(t.id)} className={`${base} ${tab === t.id ? active : inactive}`}>
            {t.label}
          </button>
        ))}
      </nav>

      {tab === 'home' && (
        <div className="space-y-8">
          <Card className="relative flex flex-col items-center gap-3 p-6 text-center">
            <ConfirmDeleteButton
              action={deleteGroupLeaderAssignmentAction.bind(null, batchId)}
              confirmMessage="Delete today's assignment? Publishers who scanned the QR code will lose access."
              ariaLabel="Delete Assignment"
              className="absolute right-4 top-4 text-red-400 hover:text-red-600"
            />
            <h2 className="font-semibold text-[#0B1B33]">Assignment QR Code</h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt="Assignment QR code" className="h-40 w-40" />
            <a href={publicUrl} target="_blank" rel="noopener noreferrer" className="break-all text-xs text-[#2563EB] hover:underline">
              {publicUrl}
            </a>
            <p className="text-xs text-slate-400">Valid for today only — a new one is needed tomorrow.</p>
          </Card>

          <div className="mx-auto max-w-md text-center">
            <h2 className="mb-4 font-semibold text-[#0B1B33]">Regenerate Assignment</h2>
            <AssignmentForm territories={activeTerritories} hasExistingBatch={true} />
          </div>
        </div>
      )}

      {tab === 'dashboard' && (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <StatCard icon={ClipboardList} label="Total Contact Records" value={stats.totalRecords} />
          <StatCard icon={CheckCircle2} label="Contact Records Completed" value={stats.completedRecords} />
          <StatCard icon={Clock} label="Remaining Contact Records" value={stats.remainingRecords} />
          <StatCard icon={Percent} label="Completion" value={`${stats.completionPct}%`} />
          <StatCard icon={FilePlus} label="New Contact Records Submitted" value={stats.newRecordsSubmitted} />
        </div>
      )}

      {tab === 'results' && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard icon={ClipboardList} label={VISIT_RESULT_LABELS.initial_visit} value={stats.resultCounts.initial_visit} />
          <StatCard icon={Repeat} label={VISIT_RESULT_LABELS.return_visit} value={stats.resultCounts.return_visit} />
          <StatCard icon={BookOpen} label={VISIT_RESULT_LABELS.bible_study} value={stats.resultCounts.bible_study} />
          <StatCard icon={DoorClosed} label={VISIT_RESULT_LABELS.not_home} value={stats.resultCounts.not_home} />
          <StatCard icon={PhoneOff} label={VISIT_RESULT_LABELS.do_not_call} value={stats.resultCounts.do_not_call} />
          <StatCard icon={Truck} label={VISIT_RESULT_LABELS.moved} value={stats.resultCounts.moved} />
          <StatCard icon={HelpCircle} label={VISIT_RESULT_LABELS.other} value={stats.resultCounts.other} />
          <StatCard icon={CircleSlash} label={VISIT_RESULT_LABELS.undone} value={stats.resultCounts.undone} />
        </div>
      )}

      {tab === 'progress' && <PartnershipList partnerships={stats.partnerships} />}
    </div>
  )
}
