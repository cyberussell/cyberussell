'use client'

import { useState } from 'react'
import { Anton } from 'next/font/google'
import { ArrowRightLeft, MapPin, PencilLine, Truck } from 'lucide-react'
import type { PartnershipRecordDetail } from '@/lib/territory-management-system/modules/assignment/types'
import type { SyncQueueItem } from '@/lib/territory-management-system/modules/offline/db'
import { VISIT_RESULT_LABELS } from '@/lib/territory-management-system/modules/records/schema'
import VisitHistoryList from '@/components/territory-management-system/VisitHistoryList'
import VisitResultBadge from '@/components/territory-management-system/VisitResultBadge'
import TerritoryMapViewer from '@/components/territory-management-system/TerritoryMapViewer'
import Card from '@/components/territory-management-system/dashboard/Card'
import PublisherVisitLogForm from './PublisherVisitLogForm'
import MoveRecordForm from './MoveRecordForm'
import MarkMovedForm, { type MovedRecordFields } from './MarkMovedForm'
import RecommendCorrectionForm, { type CorrectionFields } from './RecommendCorrectionForm'

// A heavy, condensed display face just for the "Nth Record to Visit" header — deliberately not
// mixed into the site's normal Syne/Inter body faces (see root layout.tsx), since this is a
// one-off, one-line label rather than running text.
const anton = Anton({ subsets: ['latin'], weight: '400', display: 'swap' })

// 1 -> "1st", 2 -> "2nd", 3 -> "3rd", 4 -> "4th", 11-13 -> "11th"/"12th"/"13th" (the standard
// English ordinal-suffix exception for the teens).
function ordinal(n: number): string {
  const v = n % 100
  if (v >= 11 && v <= 13) return `${n}th`
  switch (n % 10) {
    case 1:
      return `${n}st`
    case 2:
      return `${n}nd`
    case 3:
      return `${n}rd`
    default:
      return `${n}th`
  }
}

// Full-card tone driven by the record's latest logged visit result — a glance-level warning
// (Do Not Call), good-news highlight (Bible Study), or moved-out flag that's more visible than
// a small badge alone. Deliberately its own local mapping rather than records/schema.ts's shared
// VISIT_RESULT_STYLES (that one backs badge pills everywhere else and stays violet for Bible
// Study there) — this card's full-panel treatment is a distinct, one-off UX request.
function cardToneClass(latestResult: string | undefined): string {
  if (latestResult === 'do_not_call') return 'border-red-300 bg-red-50'
  if (latestResult === 'bible_study' || latestResult === 'progressing') return 'border-emerald-300 bg-emerald-50'
  if (latestResult === 'moved') return 'border-amber-300 bg-amber-50'
  return 'border-gray-300 bg-white'
}

export default function PublisherRecordDetailView({
  assigned,
  pendingVisits,
  readOnly,
  sessionEnded,
  saving,
  siblingPartnerships,
  moving,
  markingMoved,
  recommendingCorrection,
  mapUrl,
  onLogVisit,
  onMoveRecord,
  onUpdateMoved,
  onRecommendRemoval,
  onRecommendCorrection,
}: {
  assigned: PartnershipRecordDetail
  pendingVisits: SyncQueueItem[]
  // True while viewing another Ministry Partner's assignment from this device — address,
  // badges, and full visit history still show, but there's nothing here to log or edit.
  readOnly: boolean
  // True once this partnership's own ministry session has ended (finished normally or ended
  // early) — same "viewable, not editable" treatment as readOnly, but for your own session
  // rather than someone else's.
  sessionEnded: boolean
  // True while a just-submitted visit is being saved/synced — disables the form and shows a
  // spinner so a slow connection doesn't look like a missed tap.
  saving: boolean
  siblingPartnerships: { id: string; name: string }[]
  moving: boolean
  // True while either "Mark as Moved" path (Update Contact Record / Recommend for Admin
  // Removal) is being saved/synced.
  markingMoved: boolean
  // True while the "Correction" (Recommend a Correction) form is being saved/synced.
  recommendingCorrection: boolean
  // The record's own territory map — resolved by the parent (preferring an offline-cached
  // blob over the live URL, same as the workspace list view's Territory Map(s) section).
  // Undefined/empty when the territory has no map uploaded, or hasn't been resolved yet.
  mapUrl?: string
  onLogVisit: (visitedAt: string, result: string, notes: string) => void
  onMoveRecord: (destinationPartnershipId: string) => void
  onUpdateMoved: (fields: MovedRecordFields) => void
  onRecommendRemoval: (reason: string) => void
  onRecommendCorrection: (fields: CorrectionFields) => void
}) {
  const mapsUrl = assigned.record.plus_code
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(assigned.record.plus_code)}`
    : null
  const latestResult = assigned.visits[0]?.result
  const editable = !readOnly && !sessionEnded
  // Mobile only (see the sm:hidden/hidden sm:block split below) — desktop has room to show both
  // "Pass to Another Partner" and "Mark as Moved" fully expanded at once, but on a phone that's
  // a lot of scrolling past two big cards to reach Record a Visit. Collapsed behind a two-button
  // row instead; tapping one reveals its panel in place of the row.
  const [mobileAction, setMobileAction] = useState<'none' | 'move' | 'moved' | 'correction'>('none')
  const movedFields = {
    address: assigned.record.address,
    unit: assigned.record.unit,
    residentName: assigned.record.resident_name,
    plusCode: assigned.record.plus_code ?? '',
    notes: assigned.record.notes,
  }

  return (
    <div className="space-y-6">
      <div
        className={`rounded-2xl border p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_0_18px_-3px_rgba(148,163,184,0.6)] ${cardToneClass(latestResult)}`}
      >
        <p className={`${anton.className} mb-2 text-xl uppercase tracking-wide text-[#0B1B33]`}>
          {ordinal(assigned.sequence)} Record to Visit
        </p>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h1 className="font-semibold text-[#0B1B33]">
            {assigned.record.address || assigned.record.plus_code || 'Unlabeled record'}
            {assigned.record.unit ? `, ${assigned.record.unit}` : ''}
          </h1>
          <VisitResultBadge result={assigned.visits[0]?.result ?? 'initial_visit'} />
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Sec {assigned.record.section?.label ?? '—'} / Blk {assigned.record.block?.label ?? '—'}
        </p>
        {assigned.record.resident_name && <p className="mt-2 text-sm text-slate-600">{assigned.record.resident_name}</p>}
        {assigned.record.household_members != null && (
          <p className="mt-2 text-sm text-slate-500">
            Household members: {assigned.record.household_members}
          </p>
        )}
        {assigned.record.notes && <p className="mt-2 text-sm text-slate-500">{assigned.record.notes}</p>}
        {assigned.record.do_not_call && <p className="mt-2 text-sm font-medium text-red-500">Do Not Call</p>}
        {assigned.passed_from_name && (
          <p className="mt-2 text-sm font-medium text-amber-600">
            Passed by {assigned.passed_from_name}
            {assigned.passed_from_at ? ` on ${new Date(assigned.passed_from_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : ''}
          </p>
        )}
        {(mapsUrl || mapUrl) && (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-100 bg-white py-2.5 text-sm font-semibold text-[#2563EB] hover:border-[#38BDF8]/40 hover:bg-blue-50"
              >
                <MapPin className="h-4 w-4" />
                Open in Google Maps
              </a>
            )}
            {mapUrl && (
              <TerritoryMapViewer mapImageUrl={mapUrl} territoryName={assigned.record.territory?.name ?? 'Territory'} variant="button" />
            )}
          </div>
        )}
      </div>

      {editable && !assigned.completed_at && (
        <>
          {/* Desktop/tablet: all forms fully expanded, plenty of room */}
          <div className="hidden space-y-6 sm:block">
            <MoveRecordForm siblingPartnerships={siblingPartnerships} moving={moving} onMove={onMoveRecord} />
            <MarkMovedForm initial={movedFields} submitting={markingMoved} onUpdate={onUpdateMoved} onRecommend={onRecommendRemoval} />
            <RecommendCorrectionForm
              currentPlusCode={assigned.record.plus_code ?? ''}
              submitting={recommendingCorrection}
              onSubmit={onRecommendCorrection}
            />
          </div>

          {/* Mobile: collapsed behind a three-button row until one is tapped */}
          <div className="sm:hidden">
            {mobileAction === 'none' && (
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setMobileAction('move')}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-blue-100 bg-white py-2.5 text-sm font-semibold text-[#2563EB] transition hover:border-[#38BDF8]/40"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  Pass
                </button>
                <button
                  type="button"
                  onClick={() => setMobileAction('moved')}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 py-2.5 text-sm font-semibold text-amber-700 transition hover:border-amber-300"
                >
                  <Truck className="h-4 w-4" />
                  Moved
                </button>
                <button
                  type="button"
                  onClick={() => setMobileAction('correction')}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-blue-100 bg-white py-2.5 text-sm font-semibold text-[#2563EB] transition hover:border-[#38BDF8]/40"
                >
                  <PencilLine className="h-4 w-4" />
                  Correction
                </button>
              </div>
            )}
            {mobileAction === 'move' && (
              <div className="space-y-3">
                <button type="button" onClick={() => setMobileAction('none')} className="text-xs font-medium text-slate-400 hover:underline">
                  ‹ Back
                </button>
                <MoveRecordForm siblingPartnerships={siblingPartnerships} moving={moving} onMove={onMoveRecord} />
              </div>
            )}
            {mobileAction === 'moved' && (
              <div className="space-y-3">
                <button type="button" onClick={() => setMobileAction('none')} className="text-xs font-medium text-slate-400 hover:underline">
                  ‹ Back
                </button>
                <MarkMovedForm
                  initialMode="choose"
                  initial={movedFields}
                  submitting={markingMoved}
                  onUpdate={onUpdateMoved}
                  onRecommend={onRecommendRemoval}
                />
              </div>
            )}
            {mobileAction === 'correction' && (
              <div className="space-y-3">
                <button type="button" onClick={() => setMobileAction('none')} className="text-xs font-medium text-slate-400 hover:underline">
                  ‹ Back
                </button>
                <RecommendCorrectionForm
                  currentPlusCode={assigned.record.plus_code ?? ''}
                  submitting={recommendingCorrection}
                  onSubmit={onRecommendCorrection}
                  initialOpen
                />
              </div>
            )}
          </div>
        </>
      )}

      {editable && (
        <div id="record-a-visit-form">
          <PublisherVisitLogForm
            latestResult={latestResult}
            doNotCall={assigned.record.do_not_call}
            saving={saving}
            onLogVisit={onLogVisit}
          />
        </div>
      )}

      {!readOnly && pendingVisits.length > 0 && (
        <div>
          <h2 className="mb-3 font-semibold text-[#0B1B33]">Pending Sync</h2>
          <div className="space-y-2">
            {pendingVisits.map((v) => (
              <Card key={v.id} className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#0B1B33]">
                    {VISIT_RESULT_LABELS[v.payload.result as keyof typeof VISIT_RESULT_LABELS] ?? v.payload.result}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      v.status === 'failed' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {v.status === 'failed' ? 'Failed' : 'Queued'}
                  </span>
                </div>
                {v.payload.notes && <p className="mt-1 text-sm text-slate-500">{v.payload.notes}</p>}
                {v.error && <p className="mt-1 text-xs text-red-500">{v.error}</p>}
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-3 font-semibold text-[#0B1B33]">Visit History</h2>
        <VisitHistoryList visits={assigned.visits} />
      </div>
    </div>
  )
}
