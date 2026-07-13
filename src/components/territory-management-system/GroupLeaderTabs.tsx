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
import StatCard from '@/components/territory-management-system/dashboard/StatCard'
import PartnershipList from '@/components/territory-management-system/PartnershipList'

type Tab = 'dashboard' | 'results' | 'progress'

const TABS: { id: Tab; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'results', label: 'Visit Results' },
  { id: 'progress', label: 'Ministry Partner Progress' },
]

// The QR code and Regenerate Assignment stay put on the page (the two things a Group Leader
// actually needs to act on) — everything else lives behind this fixed tab bar instead of one
// long scroll, per Russell's request.
export default function GroupLeaderTabs({ stats }: { stats: BatchStats }) {
  const [tab, setTab] = useState<Tab>('dashboard')
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
