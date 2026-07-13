'use client'

import Link from 'next/link'

// Large, always-visible navigation for the publisher workspace — replaces the old scattered
// small text back-links (easier to read/tap for older users). "Record a Visit" only appears
// once a record is actually open, since there's nothing to record a visit against otherwise.
export default function PublisherTopMenu({
  batchToken,
  view,
  onGoToRecords,
  onGoToVisitForm,
}: {
  batchToken: string
  view: 'list' | 'detail' | 'addRecord'
  onGoToRecords: () => void
  onGoToVisitForm: () => void
}) {
  const base = 'flex flex-1 items-center justify-center rounded-xl px-3 py-3.5 text-center text-base font-semibold leading-tight transition'
  const active = 'bg-[#2563EB] text-white'
  const inactive = 'bg-blue-50 text-[#2563EB] hover:bg-blue-100'

  return (
    <nav className="flex gap-2 rounded-2xl border border-blue-100/60 bg-white p-2 shadow-sm" aria-label="Workspace navigation">
      <Link href={`/territory-management-system/assignment/${batchToken}`} className={`${base} ${inactive}`}>
        All Ministry Partners
      </Link>
      <button type="button" onClick={onGoToRecords} className={`${base} ${view === 'list' ? active : inactive}`}>
        Assigned Records
      </button>
      {view === 'detail' && (
        <button type="button" onClick={onGoToVisitForm} className={`${base} ${active}`}>
          Record a Visit
        </button>
      )}
    </nav>
  )
}
