'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { PartyPopper, Plus, RefreshCw } from 'lucide-react'
import type { PartnershipRecordDetail, PartnershipWorkspace } from '@/lib/territory-management-system/modules/assignment/types'
import type { TerritoryStructure } from '@/lib/territory-management-system/modules/territory/types'
import type { SyncQueueItem } from '@/lib/territory-management-system/modules/offline/db'
import { downloadAssignment, getLocalMapImageUrl, isDownloaded } from '@/lib/territory-management-system/modules/offline/download'
import { enqueue, listQueue } from '@/lib/territory-management-system/modules/offline/queue'
import { flushQueue } from '@/lib/territory-management-system/modules/offline/sync'
import { useOnlineStatus } from '@/lib/territory-management-system/modules/offline/useOnlineStatus'
import { getClaimedPartnershipToken, setClaimedPartnershipToken } from '@/lib/territory-management-system/modules/offline/claim'
import TerritoryMapViewer from '@/components/territory-management-system/TerritoryMapViewer'
import PublisherBottomMenu from './PublisherBottomMenu'
import PartnershipRenameForm from './PartnershipRenameForm'
import AssignedRecordsList from './AssignedRecordsList'
import PublisherRecordDetailView from './PublisherRecordDetailView'
import PublisherRecordForm, { type NewPublisherRecordPayload } from './PublisherRecordForm'
import PublisherNoteForm from './PublisherNoteForm'

type View =
  | { name: 'list' }
  | { name: 'detail'; recordId: string }
  | { name: 'addRecord' }
  | { name: 'note' }
  | { name: 'sync' }
  | { name: 'done' }

// The offline-first app shell: everything after the initial server-rendered load happens as
// in-memory view-state changes here, never a new Next.js page navigation — that's what makes
// the rest of the day's session work with zero network once this has mounted once online.
export default function PublisherWorkspaceApp({
  batchToken,
  partnershipToken,
  initialWorkspace,
  territoryStructures,
}: {
  batchToken: string
  partnershipToken: string
  initialWorkspace: PartnershipWorkspace
  territoryStructures: TerritoryStructure[]
}) {
  const [workspace, setWorkspace] = useState(initialWorkspace)
  const [view, setView] = useState<View>({ name: 'list' })
  const [downloaded, setDownloaded] = useState(false)
  const [savingVisit, setSavingVisit] = useState(false)
  const [movingRecord, setMovingRecord] = useState(false)
  const [sendingNote, setSendingNote] = useState(false)
  const [markingMoved, setMarkingMoved] = useState(false)
  const [queue, setQueue] = useState<SyncQueueItem[]>([])
  const [syncing, setSyncing] = useState(false)
  const [mapUrls, setMapUrls] = useState<Record<string, string>>({})
  const online = useOnlineStatus()
  // Several call sites can each decide "we're online, sync now" in quick succession (a form
  // submit's own trigger, plus the reconnect effect) — without this, two overlapping
  // flushQueue() runs could both pick up the same still-queued item and submit it twice. A
  // ref survives across renders without retriggering effects, unlike state.
  const syncingRef = useRef(false)

  // Which ONE partnership this device is bound to for today's batch — resolved synchronously
  // from localStorage on first render (a lazy initializer, not an effect) so a device that's
  // already bound elsewhere renders read-only immediately, with no flash of full editing access.
  const [deviceClaim, setDeviceClaim] = useState<string | null>(() =>
    typeof window !== 'undefined' ? getClaimedPartnershipToken(batchToken) : null
  )
  // A device with no claim yet, opening a partnership someone else in the pair already named,
  // is joining it — not claiming a second one — so it silently binds here too.
  useEffect(() => {
    if (deviceClaim) return
    if (initialWorkspace.claimed_at) {
      setClaimedPartnershipToken(batchToken, partnershipToken)
      setDeviceClaim(partnershipToken)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const readOnly = deviceClaim !== null && deviceClaim !== partnershipToken
  // Once this partnership's own ministry session has ended (normally finished or ended early),
  // the record detail view stays fully viewable (address, map, visit history) but the editing
  // controls (Record a Visit, Mark as Moved, Pass to Another Partner) go away — there's nothing
  // left to log for the day.
  const sessionEnded = Boolean(workspace.finished_at || workspace.ended_early_at)

  const refreshQueue = useCallback(async () => {
    setQueue(await listQueue(partnershipToken))
  }, [partnershipToken])

  useEffect(() => {
    isDownloaded(partnershipToken).then(setDownloaded)
    refreshQueue()
  }, [partnershipToken, refreshQueue])

  // Prefer a locally cached map blob (works offline, and skips a refetch even when online);
  // fall back to the live URL until a download has happened. Keyed off the territory ids
  // themselves (not the array reference, which changes on every workspace update) so this
  // doesn't re-run — and re-create + leak blob URLs — on every unrelated state change.
  const territoryIdsKey = workspace.territories.map((t) => t.id).join(',')
  useEffect(() => {
    let cancelled = false
    const createdUrls: string[] = []

    async function resolveMaps() {
      const entries = await Promise.all(
        workspace.territories.map(async (t) => {
          const local = await getLocalMapImageUrl(t.id)
          if (local) createdUrls.push(local)
          return [t.id, local ?? t.map_image_url ?? ''] as const
        })
      )
      if (!cancelled) setMapUrls(Object.fromEntries(entries.filter(([, url]) => url)))
    }
    resolveMaps()

    return () => {
      cancelled = true
      createdUrls.forEach((url) => URL.revokeObjectURL(url))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [territoryIdsKey])

  const handleSync = useCallback(async () => {
    if (syncingRef.current) return
    syncingRef.current = true
    setSyncing(true)
    try {
      const result = await flushQueue(partnershipToken)
      await refreshQueue()
      if (result.synced > 0) toast.success(`${result.synced} item(s) synced.`)
      if (result.failed > 0) toast.error(`${result.failed} item(s) failed to sync — see the pending list below.`)
      // result.stillPending (a connectivity blip, not a rejection) is deliberately silent —
      // it'll retry automatically next time, no need to alarm the publisher over it.
    } finally {
      syncingRef.current = false
      setSyncing(false)
    }
  }, [partnershipToken, refreshQueue])

  // Automatic synchronization the moment connectivity returns.
  useEffect(() => {
    if (online) {
      listQueue(partnershipToken).then((items) => {
        if (items.some((i) => i.status === 'pending')) handleSync()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online])

  const pendingCount = queue.filter((q) => q.status === 'pending' || q.status === 'syncing').length
  const failedCount = queue.filter((q) => q.status === 'failed').length

  // Once on the Sync screen, the moment nothing is left pending or failed, the session is done.
  useEffect(() => {
    if (view.name === 'sync' && pendingCount === 0 && failedCount === 0) setView({ name: 'done' })
  }, [view.name, pendingCount, failedCount])

  async function handleDownload() {
    await downloadAssignment(partnershipToken, workspace)
    setDownloaded(true)
    toast.success('Downloaded — ready for offline use.')
  }

  async function handleRename(name: string) {
    const claiming = !workspace.claimed_at
    setWorkspace((w) => ({ ...w, name, claimed_at: w.claimed_at ?? new Date().toISOString() }))
    if (claiming) {
      setClaimedPartnershipToken(batchToken, partnershipToken)
      setDeviceClaim(partnershipToken)
    }
    await enqueue(partnershipToken, 'rename', { partnershipToken, name })
    await refreshQueue()
    if (online) handleSync()
  }

  async function handleLogVisit(recordId: string, visitedAt: string, result: string, notes: string) {
    setSavingVisit(true)
    try {
      const updatedRecords = workspace.records.map((r) =>
        r.record.id === recordId ? { ...r, completed_at: r.completed_at ?? new Date().toISOString() } : r
      )
      setWorkspace((w) => ({ ...w, records: updatedRecords }))
      await enqueue(partnershipToken, 'visit', { partnershipToken, recordId, visitedAt, result, notes })
      await refreshQueue()
      if (online) await handleSync()
      goToNextRecord(recordId, updatedRecords)
    } finally {
      setSavingVisit(false)
    }
  }

  // Passes a record to a different Ministry Partner — unlike logging a visit, the record simply
  // leaves this partnership's list entirely (it isn't "completed" here, it's someone else's now).
  async function handleMoveRecord(recordId: string, destinationPartnershipId: string) {
    setMovingRecord(true)
    try {
      await enqueue(partnershipToken, 'moveRecord', { partnershipToken, recordId, destinationPartnershipId })
      await refreshQueue()
      if (online) await handleSync()
      const remainingRecords = workspace.records.filter((r) => r.record.id !== recordId)
      setWorkspace((w) => ({ ...w, records: remainingRecords }))
      toast.success('Moved to another Ministry Partner.')
      const next = [...remainingRecords].sort((a, b) => a.sequence - b.sequence).find((r) => !r.completed_at)
      setView(next ? { name: 'detail', recordId: next.record.id } : { name: 'list' })
      window.scrollTo({ top: 0, behavior: 'auto' })
    } finally {
      setMovingRecord(false)
    }
  }

  // Both "Mark as Moved" paths behave like logging a visit (completes the record, advances to
  // the next one) — they just route through updatePublisherRecordAction/recommendRemovalAction
  // instead of logPublisherVisitAction directly (those two also log the underlying 'moved'
  // visit themselves, server-side).
  async function handleUpdateMoved(recordId: string, fields: { address: string; unit: string; residentName: string; plusCode: string; notes: string }) {
    setMarkingMoved(true)
    try {
      const updatedRecords = workspace.records.map((r) =>
        r.record.id === recordId ? { ...r, completed_at: r.completed_at ?? new Date().toISOString() } : r
      )
      setWorkspace((w) => ({ ...w, records: updatedRecords }))
      await enqueue(partnershipToken, 'updateRecord', { partnershipToken, recordId, ...fields })
      await refreshQueue()
      if (online) await handleSync()
      toast.success('Contact record updated.')
      goToNextRecord(recordId, updatedRecords)
    } finally {
      setMarkingMoved(false)
    }
  }

  async function handleRecommendRemoval(recordId: string, reason: string) {
    setMarkingMoved(true)
    try {
      const updatedRecords = workspace.records.map((r) =>
        r.record.id === recordId ? { ...r, completed_at: r.completed_at ?? new Date().toISOString() } : r
      )
      setWorkspace((w) => ({ ...w, records: updatedRecords }))
      await enqueue(partnershipToken, 'recommendRemoval', { partnershipToken, recordId, reason })
      await refreshQueue()
      if (online) await handleSync()
      toast.success('Recommendation sent to the Admin.')
      goToNextRecord(recordId, updatedRecords)
    } finally {
      setMarkingMoved(false)
    }
  }

  // After logging a visit, jump straight to the next record still needing one instead of
  // making the publisher go back to the list and pick it themselves. "Next" means the next
  // incomplete record after this one in assigned sequence order, wrapping to check earlier
  // records too (in case one was left incomplete out of order). Falls back to the list — which
  // already shows the "All assigned records are done!" banner — once nothing is left.
  function goToNextRecord(fromRecordId: string, records: PartnershipRecordDetail[]) {
    const sorted = [...records].sort((a, b) => a.sequence - b.sequence)
    const currentIndex = sorted.findIndex((r) => r.record.id === fromRecordId)
    const next =
      sorted.slice(currentIndex + 1).find((r) => !r.completed_at) ?? sorted.slice(0, currentIndex).find((r) => !r.completed_at)
    setView(next ? { name: 'detail', recordId: next.record.id } : { name: 'list' })
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  async function handleAddRecord(payload: NewPublisherRecordPayload) {
    await enqueue(partnershipToken, 'addRecord', { partnershipToken, ...payload })
    await refreshQueue()
    setView({ name: 'list' })
    toast.success('Contact record queued for submission.')
    if (online) handleSync()
  }

  function goToSync() {
    setView({ name: 'sync' })
    if (online) handleSync()
  }

  // Both the normal "Sync & Finish" path and "End My Ministry Early" route through the note
  // screen first — it's genuinely optional (Skip goes straight to Sync), not a required step.
  function goToNote() {
    setView({ name: 'note' })
  }

  // Marks the partnership genuinely finished (see finishPartnershipAction) — the actual "end of
  // ministry" signal the Group Leader's all-done detection and the Record a Visit panel's
  // read-only gating both depend on. Fires from both note-screen handlers below, since both
  // Sync & Finish and End Early route through this same screen.
  async function handleFinish() {
    const now = new Date().toISOString()
    setWorkspace((w) => ({ ...w, finished_at: w.finished_at ?? now }))
    await enqueue(partnershipToken, 'finish', { partnershipToken })
    await refreshQueue()
  }

  async function handleSendNote(note: string) {
    setSendingNote(true)
    try {
      await enqueue(partnershipToken, 'note', { partnershipToken, note })
      await handleFinish()
      await refreshQueue()
      if (online) await handleSync()
    } finally {
      setSendingNote(false)
      goToSync()
    }
  }

  async function handleSkipNote() {
    await handleFinish()
    if (online) await handleSync()
    goToSync()
  }

  async function handleTerminate() {
    const now = new Date().toISOString()
    setWorkspace((w) => ({
      ...w,
      ended_early_at: w.ended_early_at ?? now,
      records: w.records.map((r) => (r.completed_at ? r : { ...r, completed_at: now })),
    }))
    await enqueue(partnershipToken, 'terminate', { partnershipToken })
    await refreshQueue()
    goToNote()
  }

  function scrollToVisitForm() {
    document.getElementById('record-a-visit-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const selected = view.name === 'detail' ? (workspace.records.find((r) => r.record.id === view.recordId) ?? null) : null
  const pendingVisitsForSelected =
    view.name === 'detail' ? queue.filter((q) => q.type === 'visit' && q.payload.recordId === view.recordId) : []
  // Deliberately requires at least one real assigned record — a "searching a fresh territory"
  // partnership (zero assigned records) should NOT auto-surface "All assigned records are
  // done! Sync & Finish" the instant it's claimed, since the whole point is spending the
  // allotted time adding new contact records, which can keep happening throughout the session.
  // "End My Ministry Early" is the only way that kind of partnership finishes for the day.
  const allDone = workspace.records.length > 0 && workspace.records.every((r) => r.completed_at)
  // Only hide a territory's map when it genuinely has no section/block structure at all — a
  // defensive guard, not the normal zero-records case (a fresh territory still has real
  // sections/blocks from the moment it's created; TerritoryMapViewer just has nothing useful to
  // render without them).
  const territoriesWithStructure = new Set(
    territoryStructures.filter((s) => s.sections.length > 0).map((s) => s.id)
  )
  const showSessionChrome = view.name !== 'note' && view.name !== 'sync' && view.name !== 'done'

  return (
    <div className="min-h-screen bg-[#F3F8FF] px-4 pb-24 pt-8">
      {/* Saving indicator lives here, floating at the top of the screen — not on the "Log
          Visit" button itself — so it's visible the instant the view jumps to the next record. */}
      {savingVisit && (
        <div className="fixed inset-x-0 top-4 z-30 flex justify-center px-4">
          <div className="flex items-center gap-2 rounded-full bg-[#0B1B33] px-4 py-2.5 text-sm font-semibold text-white shadow-lg">
            <RefreshCw className="h-4 w-4 animate-spin text-[#38BDF8]" />
            Saving your visit…
          </div>
        </div>
      )}

      <div className="mx-auto max-w-lg space-y-6">
        {readOnly && (view.name === 'list' || view.name === 'detail') && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center text-sm font-medium text-amber-700 shadow-sm">
            Viewing {workspace.name}&apos;s assignment — read only.
          </div>
        )}

        {view.name === 'list' && !readOnly && !workspace.claimed_at && (
          <>
            <div className="rounded-2xl border-2 border-black bg-[#E2E8F2] p-4 text-center text-sm text-slate-600 shadow-sm">
              Enter your name(s) below to begin — your assigned contact records will appear once saved.
            </div>
            <PartnershipRenameForm currentName={workspace.name} onRename={handleRename} />
          </>
        )}

        {view.name === 'list' && (readOnly || workspace.claimed_at) && (
          <>
            {!readOnly && <PartnershipRenameForm currentName={workspace.name} onRename={handleRename} />}

            {(() => {
              const mappableTerritories = workspace.territories.filter((t) => mapUrls[t.id] && territoriesWithStructure.has(t.id))
              return (
                mappableTerritories.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="font-semibold text-[#0B1B33]">Territory Map{mappableTerritories.length > 1 ? 's' : ''}</h2>
                    {mappableTerritories.map((t) => (
                      <div key={t.id}>
                        <p className="mb-1 text-xs text-slate-500">{t.name}</p>
                        <TerritoryMapViewer mapImageUrl={mapUrls[t.id]} territoryName={t.name} />
                      </div>
                    ))}
                  </div>
                )
              )
            })()}

            {!readOnly && allDone && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center shadow-sm">
                <p className="text-sm font-semibold text-emerald-700">All assigned records are done!</p>
                <button
                  type="button"
                  onClick={goToNote}
                  className="mt-3 w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Sync &amp; Finish
                </button>
              </div>
            )}

            {workspace.records.length > 0 ? (
              <div>
                <h2 className="mb-3 font-semibold text-[#0B1B33]">Assigned Contact Records</h2>
                <AssignedRecordsList
                  records={workspace.records}
                  failedRecordIds={new Set(queue.filter((q) => q.status === 'failed' && q.payload.recordId).map((q) => q.payload.recordId))}
                  onSelect={(recordId) => setView({ name: 'detail', recordId })}
                />
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-black bg-[#E2E8F2] p-4 text-center shadow-sm">
                <p className="text-sm font-semibold text-[#0B1B33]">This territory has no records yet.</p>
                <p className="mt-1 text-sm text-slate-500">
                  Searching the area and adding new contact records is today&apos;s activity.
                </p>
              </div>
            )}

            {!readOnly && territoryStructures.length > 0 && (
              <button
                type="button"
                onClick={() => setView({ name: 'addRecord' })}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-100 bg-white py-2.5 text-sm font-medium text-[#2563EB] hover:border-[#38BDF8]/40"
              >
                <Plus className="h-4 w-4" />
                Add a New Contact Record
              </button>
            )}

            {!readOnly && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("End your ministry early? All unfinished records will be marked as undone."))
                    handleTerminate()
                }}
                className="w-full rounded-lg border border-red-200 bg-white py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50"
              >
                End My Ministry Early
              </button>
            )}
          </>
        )}

        {view.name === 'detail' && selected && (
          <PublisherRecordDetailView
            assigned={selected}
            pendingVisits={pendingVisitsForSelected}
            readOnly={readOnly}
            sessionEnded={sessionEnded}
            saving={savingVisit}
            siblingPartnerships={workspace.siblingPartnerships}
            moving={movingRecord}
            markingMoved={markingMoved}
            onLogVisit={(visitedAt, result, notes) => handleLogVisit(selected.record.id, visitedAt, result, notes)}
            onMoveRecord={(destinationPartnershipId) => handleMoveRecord(selected.record.id, destinationPartnershipId)}
            onUpdateMoved={(fields) => handleUpdateMoved(selected.record.id, fields)}
            onRecommendRemoval={(reason) => handleRecommendRemoval(selected.record.id, reason)}
          />
        )}

        {view.name === 'addRecord' && (
          <PublisherRecordForm territories={territoryStructures} onSubmit={handleAddRecord} onCancel={() => setView({ name: 'list' })} />
        )}

        {view.name === 'note' && <PublisherNoteForm sending={sendingNote} onSend={handleSendNote} onSkip={handleSkipNote} />}

        {view.name === 'sync' && (
          <div className="rounded-2xl border-2 border-black bg-[#E2E8F2] p-6 text-center shadow-sm">
            <h2 className="font-semibold text-[#0B1B33]">Syncing your work…</h2>
            <p className="mt-1 text-sm text-slate-500">
              {pendingCount > 0
                ? `${pendingCount} item(s) waiting to sync.`
                : failedCount > 0
                  ? `${failedCount} item(s) failed to sync.`
                  : 'All synced.'}
            </p>
            {!online && (
              <p className="mt-2 text-xs text-amber-600">You&apos;re offline — this will sync automatically once you&apos;re back online.</p>
            )}
            <button
              type="button"
              onClick={handleSync}
              disabled={syncing || !online}
              className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
            >
              {syncing ? 'Syncing…' : 'Sync Now'}
            </button>
          </div>
        )}

        {view.name === 'done' && (
          <div className="rounded-2xl border-2 border-black bg-[#E2E8F2] p-8 text-center shadow-sm">
            <PartyPopper className="mx-auto h-12 w-12 text-[#2563EB]" />
            <h2 className="mt-4 text-lg font-semibold text-[#0B1B33]">Thank you for your service today!</h2>
            <p className="mt-2 text-sm text-slate-500">Your work has been saved.</p>
            <blockquote className="mt-6 border-t border-blue-100/60 pt-6 text-base font-bold italic text-[#0B1B33]">
              &ldquo;Go, therefore, and make disciples of people of all the nations, baptizing them in the name of the Father
              and of the Son and of the holy spirit, teaching them to observe all the things I have commanded you. And look! I
              am with you all the days until the conclusion of the system of things.&rdquo;
            </blockquote>
            <p className="mt-2 text-sm font-medium text-slate-500">Matthew 28:19, 20</p>
            {workspace.congregationName && (
              <p className="mt-6 text-sm font-semibold text-[#2563EB]">{workspace.congregationName}</p>
            )}
          </div>
        )}
      </div>

      <PublisherBottomMenu
        batchToken={batchToken}
        view={view.name === 'note' || view.name === 'sync' || view.name === 'done' ? 'list' : view.name}
        onGoToRecords={() => setView({ name: 'list' })}
        onGoToVisitForm={scrollToVisitForm}
        showSync={showSessionChrome}
        downloaded={downloaded}
        onDownload={handleDownload}
        online={online}
        pendingCount={pendingCount}
        failedCount={failedCount}
        syncing={syncing}
        onSync={handleSync}
      />
    </div>
  )
}
