'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  BookMarked,
  BookOpen,
  CheckCircle2,
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
  Sparkles,
  TrendingUp,
  Truck,
  Users,
  XCircle,
  type LucideIcon,
} from 'lucide-react'
import type { BatchStats } from '@/lib/territory-management-system/modules/reports/queries'
import { VISIT_RESULT_LABELS } from '@/lib/territory-management-system/modules/records/schema'
import { deleteGroupLeaderAssignmentAction, endPartnershipAction } from '@/app/territory-management-system/actions/group-leader'
import StatCard from '@/components/territory-management-system/dashboard/StatCard'
import Card from '@/components/territory-management-system/dashboard/Card'
import ConfirmDeleteButton from '@/components/territory-management-system/dashboard/ConfirmDeleteButton'
import PartnershipList from '@/components/territory-management-system/PartnershipList'
import VisitResultBarChart from '@/components/territory-management-system/VisitResultBarChart'
import AssignmentForm from '@/components/territory-management-system/AssignmentForm'
import OverflowAssignmentForm from '@/components/territory-management-system/OverflowAssignmentForm'

type Tab = 'home' | 'dashboard' | 'results' | 'progress'

const TABS: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'results', label: 'Visits', icon: ClipboardList },
  { id: 'progress', label: 'Partners', icon: Users },
]

// One entry per batch this Group Leader owns today — a Group Leader can now have more than one
// (see 023_multiple_batches_per_group_leader.sql), e.g. an original batch plus one or more
// overflow batches generated for extra publishers later the same day.
export interface BatchView {
  batchId: string
  qrDataUrl: string
  publicUrl: string
  requestedPartnershipCount: number
  // True for a batch generated via "Generate Overflow Assignment" (see
  // 024_batch_is_overflow.sql) — drives both the switcher label and the QR card's own heading.
  isOverflow: boolean
  stats: BatchStats
}

export default function GroupLeaderTabs({
  batches,
  activeTerritories,
  todaysTerritories,
}: {
  batches: BatchView[]
  activeTerritories: { id: string; name: string; barangayName: string; approvedCount: number }[]
  todaysTerritories: { id: string; name: string; barangayName: string }[]
}) {
  const [tab, setTab] = useState<Tab>('home')
  // Home tab's Generate/Regenerate toggle — deliberately starts at null (neither shown), even
  // right after a page refresh, so the tab opens clean instead of always stacking both forms.
  const [assignmentAction, setAssignmentAction] = useState<'generate' | 'regenerate' | null>(null)
  const [selectedBatchId, setSelectedBatchId] = useState(batches[0]?.batchId)
  const selected = batches.find((b) => b.batchId === selectedBatchId) ?? batches[0]
  const { batchId, qrDataUrl, publicUrl, requestedPartnershipCount, isOverflow, stats } = selected

  // The "Visits" tab shows each result's count as of when this device first opened this batch's
  // dashboard, plus a live delta badge (see StatCard) for whatever's changed since then. Kept in
  // localStorage (not just component state) keyed by batchId — a batch is a new one every day,
  // so this naturally resets each morning with no extra logic — because relying on component
  // state alone meant a plain page reload (as opposed to the in-place router.refresh() poll)
  // silently reset the baseline to the just-loaded numbers, making the delta permanently read 0.
  const baselineStorageKey = `tms_gl_result_baseline_${batchId}`
  const [resultBaseline, setResultBaseline] = useState(stats.resultCounts)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem(baselineStorageKey)
    if (stored) {
      try {
        setResultBaseline(JSON.parse(stored))
        return
      } catch {
        // Falls through to re-seed below if the stored value was somehow corrupt.
      }
    }
    setResultBaseline(stats.resultCounts)
    window.localStorage.setItem(baselineStorageKey, JSON.stringify(stats.resultCounts))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchId])

  // Records fill sequentially, so a shortfall of approved records caps the actual partnership
  // count below what was requested (see engine.ts's calculateAssignment) instead of blocking
  // generation outright — this surfaces that gap after the fact too, in case it wasn't noticed
  // on the form before generating.
  const shortfallPartnerships = Math.max(0, requestedPartnershipCount - stats.partnerships.length)
  const base = 'flex-1 rounded-xl px-2 py-3 text-center text-sm font-semibold leading-tight transition'
  const active = 'bg-[#2563EB] text-white'
  const inactive = 'bg-blue-50 text-[#2563EB] hover:bg-blue-100'

  // Once every Ministry Partner has either finished their assigned records or ended early,
  // there's nothing left to scan for — the QR card gives way to a same-day results summary
  // instead. The batch itself isn't deleted (Reports/history still need it); it naturally stops
  // working the next day via the existing assignment_date/isBatchExpired midnight cutoff.
  //
  // completedCount >= recordCount is vacuously true for a zero-record ("searching a fresh
  // territory") partnership the instant the batch is created — before anyone has even claimed
  // it — which made the QR never show at all for a zero-record territory. finished_at/
  // ended_early_at (set only when a publisher actually reaches Sync & Finish or ends early) are
  // the real "genuinely done" signal and take priority; the record-count check still covers a
  // normal partnership whose publisher never explicitly finishes (closes the tab, say).
  const allPartnersDone =
    stats.partnerships.length > 0 &&
    stats.partnerships.every(
      (p) => Boolean(p.finished_at) || Boolean(p.ended_early_at) || (p.recordCount > 0 && p.completedCount >= p.recordCount)
    )

  // Label for the batch switcher — "Assignment" for the original, "Overflow" for an overflow
  // batch (numbered "Overflow 2", "Overflow 3"... only once there's more than one, since a
  // Group Leader can generate more than one overflow batch the same day).
  let overflowSeen = 0
  const batchLabel = (b: BatchView) => {
    if (!b.isOverflow) return 'Assignment'
    overflowSeen += 1
    return overflowSeen === 1 ? 'Overflow' : `Overflow ${overflowSeen}`
  }

  const router = useRouter()
  // `stats` (and everything else here) is fetched once per Server Component render and passed
  // down as a prop — switching between Home/Dashboard/Visit Results/Ministry Partner (and now
  // between batches) is pure client-side state, nothing here ever refetches on its own. Without
  // this, a publisher syncing a visit while the Group Leader already has this page open would
  // never show up until a manual browser reload. router.refresh() re-runs the page's Server
  // Component and pushes fresh props down without losing the selected tab/batch (that's local
  // state, untouched by this).
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
      {batches.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Today's assignment batches">
          {batches.map((b) => (
            <button
              key={b.batchId}
              type="button"
              onClick={() => setSelectedBatchId(b.batchId)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                b.batchId === batchId ? 'bg-[#2563EB] text-white' : 'bg-blue-50 text-[#2563EB] hover:bg-blue-100'
              }`}
            >
              {batchLabel(b)}
            </button>
          ))}
        </div>
      )}

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
              <span className={`flex items-center justify-center rounded-full p-1.5 transition ${isActive ? 'bg-blue-50' : ''}`}>
                <Icon className={isActive ? 'h-6 w-6' : 'h-5 w-5'} strokeWidth={isActive ? 2.75 : 2} aria-hidden />
              </span>
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
                confirmMessage="Delete this assignment? Publishers who scanned the QR code will lose access."
                ariaLabel="Delete Assignment"
                className="absolute right-4 top-4 text-red-400 hover:text-red-600"
              />
              <h2 className="text-center font-semibold text-[#0B1B33]">
                {stats.partnerships.length} ministry partner{stats.partnerships.length === 1 ? '' : 's'} completed today
              </h2>
              {stats.territories.length > 0 && (
                <p className="mt-1 text-center text-xs text-slate-600">
                  Territories worked: {stats.territories.map((t) => t.name).join(', ')}
                </p>
              )}
              <div className="mt-6">
                <VisitResultBarChart resultCounts={stats.resultCounts} />
              </div>
            </Card>
          ) : (
            <Card
              className={`relative flex flex-col items-center gap-3 p-6 text-center ${
                isOverflow ? 'border-black bg-black' : ''
              }`}
            >
              <ConfirmDeleteButton
                action={deleteGroupLeaderAssignmentAction.bind(null, batchId)}
                confirmMessage="Delete this assignment? Publishers who scanned the QR code will lose access."
                ariaLabel="Delete Assignment"
                className={isOverflow ? 'absolute right-4 top-4 text-red-400 hover:text-red-300' : 'absolute right-4 top-4 text-red-400 hover:text-red-600'}
              />
              <h2 className={`font-semibold ${isOverflow ? 'text-white' : 'text-[#0B1B33]'}`}>
                {isOverflow ? 'Overflow QR Code' : 'Assignment QR Code'}
              </h2>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="Assignment QR code" className="h-80 w-80 sm:h-40 sm:w-40" />
              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`break-all text-xs hover:underline ${isOverflow ? 'text-[#60A5FA]' : 'text-[#2563EB]'}`}
              >
                {publicUrl}
              </a>
              <p className={`text-xs ${isOverflow ? 'text-white' : 'text-slate-600'}`}>
                Valid for today only — a new one is needed tomorrow.
              </p>
            </Card>
          )}

          {shortfallPartnerships > 0 && (
            <div className="mx-auto max-w-md rounded-lg border border-amber-200 bg-amber-50 p-4 text-center text-sm text-amber-700">
              {shortfallPartnerships} fewer partnership{shortfallPartnerships === 1 ? '' : 's'} were created than requested —
              there weren&apos;t enough approved records in the selected territories. Generate an overflow assignment below if
              more publishers than expected showed up.
            </div>
          )}

          <div className="mx-auto max-w-md text-center">
            {/* Simple view: a toggle instead of always stacking both forms — neither is shown
                until the Group Leader deliberately picks one, including right after a refresh
                (no default selection), so the Home tab stays uncluttered day to day. */}
            <div className="inline-flex rounded-full bg-blue-50 p-1">
              <button
                type="button"
                onClick={() => setAssignmentAction((a) => (a === 'regenerate' ? null : 'regenerate'))}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  assignmentAction === 'regenerate' ? 'bg-[#2563EB] text-white' : 'text-[#2563EB] hover:bg-blue-100'
                }`}
              >
                Regenerate
              </button>
              {todaysTerritories.length > 0 && (
                <button
                  type="button"
                  onClick={() => setAssignmentAction((a) => (a === 'generate' ? null : 'generate'))}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    assignmentAction === 'generate' ? 'bg-[#2563EB] text-white' : 'text-[#2563EB] hover:bg-blue-100'
                  }`}
                >
                  Generate Overflow
                </button>
              )}
            </div>

            {assignmentAction === 'generate' && todaysTerritories.length > 0 && (
              <div className="mt-4">
                <h2 className="mb-1 font-semibold text-[#0B1B33]">Generate Overflow Assignment</h2>
                <p className="mb-4 text-xs text-slate-500">
                  For extra publishers when a territory has more people than the original assignment had room for. Adds a new,
                  separate QR code — today&apos;s existing assignment(s) are untouched.
                </p>
                <OverflowAssignmentForm territories={todaysTerritories} />
              </div>
            )}

            {assignmentAction === 'regenerate' && (
              <div className="mt-4">
                <h2 className="mb-4 font-semibold text-[#0B1B33]">Regenerate Assignment</h2>
                <p className="mb-4 text-xs text-slate-500">
                  Replaces every one of today&apos;s assignments (all batches) with a brand new one.
                </p>
                <AssignmentForm territories={activeTerritories} hasExistingBatch={true} />
              </div>
            )}
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
          {(
            [
              ['initial_visit', ClipboardList],
              ['return_visit', Repeat],
              ['potential_bible_study', Sparkles],
              ['started_bible_study', BookMarked],
              ['bible_study', BookOpen],
              ['progressing', TrendingUp],
              ['discontinued', XCircle],
              ['not_home', DoorClosed],
              ['do_not_call', PhoneOff],
              ['moved', Truck],
              ['other', HelpCircle],
            ] as const
          ).map(([key, Icon]) => (
            <StatCard
              key={key}
              icon={Icon}
              label={VISIT_RESULT_LABELS[key]}
              value={resultBaseline[key]}
              delta={stats.resultCounts[key] - resultBaseline[key]}
            />
          ))}
        </div>
      )}

      {tab === 'progress' && <PartnershipList partnerships={stats.partnerships} onEndPartnership={endPartnershipAction} />}
    </div>
  )
}
