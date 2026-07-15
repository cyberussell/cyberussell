'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  BookMarked,
  BookOpen,
  CheckCircle2,
  CircleSlash,
  ClipboardList,
  Clock,
  DoorClosed,
  FilePlus,
  HelpCircle,
  Home,
  LayoutDashboard,
  Percent,
  PhoneOff,
  Repeat,
  TrendingUp,
  Truck,
  Users,
  XCircle,
  type LucideIcon,
} from 'lucide-react'
import type { BatchStats } from '@/lib/territory-management-system/modules/reports/queries'
import { VISIT_RESULT_LABELS } from '@/lib/territory-management-system/modules/records/schema'
import { deleteGroupLeaderAssignmentAction } from '@/app/territory-management-system/actions/group-leader'
import StatCard from '@/components/territory-management-system/dashboard/StatCard'
import Card from '@/components/territory-management-system/dashboard/Card'
import ConfirmDeleteButton from '@/components/territory-management-system/dashboard/ConfirmDeleteButton'
import PartnershipList from '@/components/territory-management-system/PartnershipList'
import VisitResultBarChart from '@/components/territory-management-system/VisitResultBarChart'
import AssignmentForm from '@/components/territory-management-system/AssignmentForm'

type Tab = 'home' | 'dashboard' | 'results' | 'progress'

const TABS: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'results', label: 'Visits', icon: ClipboardList },
  { id: 'progress', label: 'Partners', icon: Users },
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

  // Once every Ministry Partner has either finished their assigned records or ended early,
  // there's nothing left to scan for — the QR card gives way to a same-day results summary
  // instead. The batch itself isn't deleted (Reports/history still need it); it naturally stops
  // working the next day via the existing assignment_date/isBatchExpired midnight cutoff.
  const allPartnersDone = stats.partnerships.length > 0 && stats.partnerships.every((p) => p.completedCount >= p.recordCount)

  const router = useRouter()
  // `stats` (and everything else here) is fetched once per Server Component render and passed
  // down as a prop — switching between Home/Dashboard/Visit Results/Ministry Partner is pure
  // client-side tab state, nothing here ever refetches on its own. Without this, a publisher
  // syncing a visit while the Group Leader already has this page open would never show up until
  // a manual browser reload. router.refresh() re-runs the page's Server Component and pushes
  // fresh props down without losing the selected tab (that's local state, untouched by this).
  useEffect(() => {
    const interval = setInterval(() => router.refresh(), 30000)
    function handleVisibility() {
      if (document.visibilityState === 'visible') router.refresh()
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [router])

  return (
    <div className="pb-24 sm:pb-0">
      {/* Desktop/tablet: sticky top tab bar. Hidden below `sm` in favor of the fixed bottom bar. */}
      <nav
        className="sticky top-0 z-10 mb-6 hidden gap-2 rounded-2xl border border-blue-100/60 bg-white/95 p-2 shadow-sm backdrop-blur sm:flex"
        aria-label="Assignment sections"
      >
        {TABS.map((t) => (
          <button key={t.id} type="button" onClick={() => setTab(t.id)} className={`${base} ${tab === t.id ? active : inactive}`}>
            {t.label}
          </button>
        ))}
      </nav>

      {/* Mobile: fixed bottom icon bar, like a native app tab bar. Hidden at `sm` and up. */}
      <nav
        className="fixed inset-x-0 bottom-0 z-20 flex border-t border-blue-100/60 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-1px_8px_rgba(15,23,42,0.06)] backdrop-blur sm:hidden"
        aria-label="Assignment sections"
      >
        {TABS.map((t) => {
          const Icon = t.icon
          const isActive = tab === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-semibold leading-tight transition ${
                isActive ? 'text-[#2563EB]' : 'text-slate-400'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} aria-hidden />
              {t.label}
            </button>
          )
        })}
      </nav>

      {tab === 'home' && (
        <div className="space-y-8">
          {allPartnersDone ? (
            <Card className="relative p-6">
              <ConfirmDeleteButton
                action={deleteGroupLeaderAssignmentAction.bind(null, batchId)}
                confirmMessage="Delete today's assignment? Publishers who scanned the QR code will lose access."
                ariaLabel="Delete Assignment"
                className="absolute right-4 top-4 text-red-400 hover:text-red-600"
              />
              <h2 className="text-center font-semibold text-[#0B1B33]">
                {stats.partnerships.length} ministry partner{stats.partnerships.length === 1 ? '' : 's'} completed today
              </h2>
              {stats.territories.length > 0 && (
                <p className="mt-1 text-center text-xs text-slate-400">
                  Territories worked: {stats.territories.map((t) => t.name).join(', ')}
                </p>
              )}
              <div className="mt-6">
                <VisitResultBarChart resultCounts={stats.resultCounts} />
              </div>
            </Card>
          ) : (
            <Card className="relative flex flex-col items-center gap-3 p-6 text-center">
              <ConfirmDeleteButton
                action={deleteGroupLeaderAssignmentAction.bind(null, batchId)}
                confirmMessage="Delete today's assignment? Publishers who scanned the QR code will lose access."
                ariaLabel="Delete Assignment"
                className="absolute right-4 top-4 text-red-400 hover:text-red-600"
              />
              <h2 className="font-semibold text-[#0B1B33]">Assignment QR Code</h2>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="Assignment QR code" className="h-80 w-80 sm:h-40 sm:w-40" />
              <a href={publicUrl} target="_blank" rel="noopener noreferrer" className="break-all text-xs text-[#2563EB] hover:underline">
                {publicUrl}
              </a>
              <p className="text-xs text-slate-400">Valid for today only — a new one is needed tomorrow.</p>
            </Card>
          )}

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
          <StatCard icon={BookOpen} label="Bible Studies in the Area" value={stats.activeBibleStudies} />
        </div>
      )}

      {tab === 'results' && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard icon={ClipboardList} label={VISIT_RESULT_LABELS.initial_visit} value={stats.resultCounts.initial_visit} />
          <StatCard icon={Repeat} label={VISIT_RESULT_LABELS.return_visit} value={stats.resultCounts.return_visit} />
          <StatCard icon={BookMarked} label={VISIT_RESULT_LABELS.started_bible_study} value={stats.resultCounts.started_bible_study} />
          <StatCard icon={BookOpen} label={VISIT_RESULT_LABELS.bible_study} value={stats.resultCounts.bible_study} />
          <StatCard icon={TrendingUp} label={VISIT_RESULT_LABELS.progressing} value={stats.resultCounts.progressing} />
          <StatCard icon={XCircle} label={VISIT_RESULT_LABELS.discontinued} value={stats.resultCounts.discontinued} />
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
