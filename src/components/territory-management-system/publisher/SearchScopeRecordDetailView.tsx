'use client'

import { MapPin } from 'lucide-react'
import type { TerritoryRecordWithLocation } from '@/lib/territory-management-system/modules/records/types'
import type { TerritoryStructure } from '@/lib/territory-management-system/modules/territory/types'
import RecommendCorrectionForm, { type CorrectionFields } from './RecommendCorrectionForm'

// Read-only detail for a record found in an overflow batch's search area (see
// SearchScopeRecordsList) — deliberately narrower than PublisherRecordDetailView: no visit
// logging, no Pass/Mark as Moved, since this record was never assigned to this partnership.
// The only action is recommending a correction (Plus Code, or now Barangay/Section/Block too) if
// the pin/location is wrong, which is the one thing that actually prevents a duplicate entry for
// the same household.
export default function SearchScopeRecordDetailView({
  record,
  territories,
  editable,
  submitting,
  onRecommendCorrection,
}: {
  record: TerritoryRecordWithLocation
  // Every congregation territory, for RecommendCorrectionForm's Barangay picker — same as
  // PublisherRecordDetailView's own `territories` prop.
  territories: TerritoryStructure[]
  // False while viewing another Ministry Partner's assignment (readOnly) or after this
  // partnership's own ministry session has ended — same gating PublisherRecordDetailView
  // applies to its own editing controls.
  editable: boolean
  submitting: boolean
  onRecommendCorrection: (fields: CorrectionFields) => void
}) {
  const mapsUrl = record.plus_code
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(record.plus_code)}`
    : null

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_0_18px_-3px_rgba(148,163,184,0.6)]">
        <span className="inline-block rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">Read only</span>
        <h1 className="mt-2 font-semibold text-[#0B1B33]">
          {record.address || record.resident_name || record.plus_code || 'Unlabeled record'}
          {record.unit ? `, ${record.unit}` : ''}
        </h1>
        <p className="mt-1 text-sm text-slate-500">Blk {record.block?.label ?? '—'}</p>
        {record.resident_name && <p className="mt-2 text-sm text-slate-600">{record.resident_name}</p>}
        {record.do_not_call && <p className="mt-2 text-sm font-medium text-red-500">Do Not Call</p>}
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-blue-100 bg-white py-2.5 text-sm font-semibold text-[#2563EB] hover:border-[#38BDF8]/40 hover:bg-blue-50"
          >
            <MapPin className="h-4 w-4" />
            Open in Google Maps
          </a>
        )}
      </div>

      {editable ? (
        <>
          <RecommendCorrectionForm
            currentPlusCode={record.plus_code ?? ''}
            currentTerritoryId={record.territory_id}
            currentSectionId={record.section_id}
            currentBlockId={record.block_id}
            currentHouseholdMembers={record.household_members}
            territories={territories}
            submitting={submitting}
            onSubmit={onRecommendCorrection}
            initialOpen
          />
          <p className="text-center text-xs text-slate-500">
            This record isn&apos;t assigned to your partnership — you can only recommend a location fix, not edit it directly.
          </p>
        </>
      ) : (
        <p className="text-center text-sm text-slate-500">Viewing only — nothing here can be changed from this device.</p>
      )}
    </div>
  )
}
