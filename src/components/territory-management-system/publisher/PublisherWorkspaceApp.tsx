'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { CheckCircle2, CloudOff, Download, PartyPopper, Plus, RefreshCw } from 'lucide-react'
import type { PartnershipWorkspace } from '@/lib/territory-management-system/modules/assignment/types'
import type { TerritoryRecordWithLocation } from '@/lib/territory-management-system/modules/records/types'
import type { TerritoryStructure } from '@/lib/territory-management-system/modules/territory/types'
import type { SyncQueueItem } from '@/lib/territory-management-system/modules/offline/db'
import type { RecordLocation } from '@/lib/territory-management-system/modules/reports/queries'
import { downloadAssignment, getLocalMapImageUrl, isDownloaded } from '@/lib/territory-management-system/modules/offline/download'
import { enqueue, listQueue } from '@/lib/territory-management-system/modules/offline/queue'
import { flushQueue } from '@/lib/territory-management-system/modules/offline/sync'
import { useOnlineStatus } from '@/lib/territory-management-system/modules/offline/useOnlineStatus'
import {
  clearClaimedPartnershipToken,
  getClaimedPartnershipToken,
  setClaimedPartnershipToken,
} from '@/lib/territory-management-system/modules/offline/claim'
import { chooseSearchScopeAction, getSearchScopeRecordsAction, releasePartnershipAction } from '@/app/territory-management-system/actions/publisher'
import TerritoryMapViewer from '@/components/territory-management-system/TerritoryMapViewer'
import Card from '@/components/territory-management-system/dashboard/Card'
import PublisherBottomMenu from './PublisherBottomMenu'
import ConfirmModal from './ConfirmModal'
import PartnershipRenameForm from './PartnershipRenameForm'
import SharePartnershipCard from './SharePartnershipCard'
import ChooseSearchScopeForm from './ChooseSearchScopeForm'
import AssignedRecordsList from './AssignedRecordsList'
import AddedRecordsList from './AddedRecordsList'
import PublisherRecordDetailView from './PublisherRecordDetailView'
import type { CorrectionFields } from './RecommendCorrectionForm'
import PublisherAddedRecordDetailView from './PublisherAddedRecordDetailView'
import PublisherRecordForm, { type NewPublisherRecordPayload } from './PublisherRecordForm'
import PublisherNoteForm from './PublisherNoteForm'
import SearchScopeRecordsList from './SearchScopeRecordsList'
import SearchScopeRecordDetailView from './SearchScopeRecordDetailView'

// Leaflet touches `window`/`document` on import — client-only, same pattern as the Admin
// Reports page's own use of this same component.
const HouseholdDistributionMap = dynamic(() => import('@/components/territory-management-system/HouseholdDistributionMap'), {
  ssr: false,
  loading: () => (
    <Card className="p-10 text-center">
      <p className="text-sm text-slate-600">Loading map…</p>
    </Card>
  ),
})

type View =
  | { name: 'home' }
  | { name: 'list' }
  | { name: 'detail'; recordId: string }
  | { name: 'addRecord' }
  | { name: 'addedRecords' }
  | { name: 'addedRecordDetail'; recordId: string }
  | { name: 'editAddedRecord'; recordId: string }
  | { name: 'note' }
  | { name: 'sync' }
  | { name: 'done' }
  | { name: 'searchScopeDetail'; recordId: string }

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
  const [view, setView] = useState<View>({ name: 'home' })
  const [downloaded, setDownloaded] = useState(false)
  const [savingVisit, setSavingVisit] = useState(false)
  const [movingRecord, setMovingRecord] = useState(false)
  const [sendingNote, setSendingNote] = useState(false)
  const [markingMoved, setMarkingMoved] = useState(false)
  const [recommendingCorrection, setRecommendingCorrection] = useState(false)
  const [recommendingSearchScopeCorrection, setRecommendingSearchScopeCorrection] = useState(false)
  const [refreshingSearchScope, setRefreshingSearchScope] = useState(false)
  const [choosingSearchScope, setChoosingSearchScope] = useState(false)
  const [searchScopeChoiceError, setSearchScopeChoiceError] = useState('')
  const [releasing, setReleasing] = useState(false)
  const [deletingAddedRecord, setDeletingAddedRecord] = useState(false)
  const [queue, setQueue] = useState<SyncQueueItem[]>([])
  const [syncing, setSyncing] = useState(false)
  const [mapUrls, setMapUrls] = useState<Record<string, string>>({})
  // Which map the list view shows when both are available — a toggle instead of stacking both
  // maps, for a cleaner one-screen-at-a-time look. Defaults to Territory Map (the prior default
  // visual order).
  const [mapView, setMapView] = useState<'territory' | 'records' | 'search' | 'share'>('territory')
  // Which branded confirm dialog (see ConfirmModal) is currently open, replacing
  // window.confirm() — its "www.cyberussell.com says" chrome reads as an unfamiliar browser
  // warning to a publisher in the field, not a TMS-branded prompt.
  const [confirmDialog, setConfirmDialog] = useState<
    { type: 'terminate' } | { type: 'deleteAddedRecord'; recordId: string } | { type: 'release' } | null
  >(null)
  const router = useRouter()
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
  // Same rule PublisherRecordDetailView applies internally for assigned records — reused here
  // to gate the "Add a New Contact Record" button and the added-records Edit/Delete actions.
  const editable = !readOnly && !sessionEnded
  // "Release" (a change of mind, not ending the ministry) is only offered while zero visits
  // have been logged yet — the same "no real work happened yet" gate releasePartnershipAction
  // re-checks server-side. Added records don't block it (the ask is specifically about visits).
  const canRelease = !readOnly && Boolean(workspace.claimed_at) && !sessionEnded && workspace.records.every((r) => !r.completed_at)

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
      returnToList()
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
      returnToList()
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
      returnToList()
    } finally {
      setMarkingMoved(false)
    }
  }

  // Unlike the "Mark as Moved" recommendations above, this isn't a ministry-visit outcome — the
  // record stays exactly as-is (still incomplete if it was) and nothing here changes what's
  // displayed, since the Admin hasn't applied the correction yet.
  async function handleRecommendCorrection(recordId: string, fields: CorrectionFields) {
    setRecommendingCorrection(true)
    try {
      await enqueue(partnershipToken, 'recommendCorrection', { partnershipToken, recordId, plusCode: fields.plusCode, reason: fields.reason })
      await refreshQueue()
      if (online) await handleSync()
      toast.success('Correction recommendation sent to the Admin.')
    } finally {
      setRecommendingCorrection(false)
    }
  }

  // After logging a visit, marking a record moved, or recommending removal, return to the card
  // list instead of auto-advancing to the next incomplete record — the publisher picks what to
  // do next themselves rather than being taken somewhere automatically.
  function returnToList() {
    setView({ name: 'list' })
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  // Recommends a Plus Code correction on a search-scope record (never assigned to this
  // partnership — see recommendSearchScopeCorrectionAction). Doesn't change what's displayed
  // (the Admin hasn't applied it yet), same as the assigned-record correction path.
  async function handleRecommendSearchScopeCorrection(recordId: string, fields: CorrectionFields) {
    setRecommendingSearchScopeCorrection(true)
    try {
      await enqueue(partnershipToken, 'recommendSearchScopeCorrection', { partnershipToken, recordId, plusCode: fields.plusCode, reason: fields.reason })
      await refreshQueue()
      if (online) await handleSync()
      toast.success('Correction recommendation sent to the Admin.')
      setView({ name: 'list' })
    } finally {
      setRecommendingSearchScopeCorrection(false)
    }
  }

  // Manual re-fetch of the search-scope records list — deliberately not automatic polling
  // (this workspace is offline-first, no background network), but the whole point of this list
  // is checking whether someone else just logged a record moments ago, so it's worth an explicit
  // live re-check rather than only ever showing what was cached at initial page load.
  async function handleRefreshSearchScope() {
    setRefreshingSearchScope(true)
    try {
      const records = await getSearchScopeRecordsAction(partnershipToken)
      setWorkspace((w) => ({ ...w, searchScopeRecords: records }))
    } finally {
      setRefreshingSearchScope(false)
    }
  }

  // The one-time, locked-in search-area choice — called directly (not through the offline sync
  // queue) since it needs a live, real-time answer about whether these blocks are still
  // available, same reasoning as handleRefreshSearchScope's direct call. On success, sets
  // workspace.searchScope locally (which permanently hides this form, per the "no changing it
  // later" rule) and immediately fetches whatever existing records are already in that area.
  async function handleChooseSearchScope(sectionId: string, blockIds: string[]) {
    setChoosingSearchScope(true)
    setSearchScopeChoiceError('')
    try {
      const formData = new FormData()
      formData.set('partnershipToken', partnershipToken)
      formData.set('sectionId', sectionId)
      blockIds.forEach((id) => formData.append('blockIds', id))
      const result = await chooseSearchScopeAction({}, formData)
      if (result.error && result.error !== 'SAVED') {
        setSearchScopeChoiceError(result.error)
        return
      }
      const territory = territoryStructures.find((t) => t.sections.some((s) => s.id === sectionId))
      const section = territory?.sections.find((s) => s.id === sectionId)
      const blocks = (section?.blocks ?? [])
        .filter((b) => blockIds.includes(b.id))
        .map((b) => ({ id: b.id, label: b.label }))
      setWorkspace((w) => ({ ...w, searchScope: { sectionId, sectionLabel: section?.label ?? '', blocks } }))
      const records = await getSearchScopeRecordsAction(partnershipToken)
      setWorkspace((w) => ({ ...w, searchScopeRecords: records }))
      toast.success('Search area saved.')
    } finally {
      setChoosingSearchScope(false)
    }
  }

  // The new record's id is generated here (not server-side) so it can be optimistically
  // rendered in "My Added Records" — and immediately made editable/deletable — before this
  // write has even synced. addPublisherRecordAction inserts under this exact id.
  async function handleAddRecord(payload: NewPublisherRecordPayload) {
    const recordId = crypto.randomUUID()
    const territory = territoryStructures.find((t) => t.id === payload.territoryId)
    const section = territory?.sections.find((s) => s.id === payload.sectionId)
    const block = section?.blocks.find((b) => b.id === payload.blockId)
    const optimisticRecord: TerritoryRecordWithLocation = {
      id: recordId,
      congregation_id: workspace.congregation_id,
      territory_id: payload.territoryId,
      section_id: payload.sectionId,
      block_id: payload.blockId,
      address: payload.address,
      unit: payload.unit,
      resident_name: payload.residentName,
      plus_code: payload.plusCode || null,
      household_members: payload.householdMembers ? Number(payload.householdMembers) : null,
      notes: payload.notes,
      do_not_call: false,
      status: 'pending',
      source: 'publisher',
      removal_recommended_at: null,
      removal_recommended_reason: null,
      removal_recommended_by: null,
      correction_recommended_at: null,
      correction_recommended_plus_code: null,
      correction_recommended_reason: null,
      correction_recommended_by: null,
      created_by_partnership_id: workspace.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      territory: territory ? { id: territory.id, name: territory.name } : null,
      section: section ? { id: section.id, label: section.label } : null,
      block: block ? { id: block.id, label: block.label } : null,
    }
    setWorkspace((w) => ({ ...w, addedRecords: [optimisticRecord, ...w.addedRecords] }))
    await enqueue(partnershipToken, 'addRecord', { partnershipToken, recordId, ...payload })
    await refreshQueue()
    setView({ name: 'addedRecords' })
    toast.success('Contact record added.')
    if (online) handleSync()
  }

  async function handleEditAddedRecord(recordId: string, payload: NewPublisherRecordPayload) {
    const territory = territoryStructures.find((t) => t.id === payload.territoryId)
    const section = territory?.sections.find((s) => s.id === payload.sectionId)
    const block = section?.blocks.find((b) => b.id === payload.blockId)
    setWorkspace((w) => ({
      ...w,
      addedRecords: w.addedRecords.map((r) =>
        r.id === recordId
          ? {
              ...r,
              territory_id: payload.territoryId,
              section_id: payload.sectionId,
              block_id: payload.blockId,
              address: payload.address,
              unit: payload.unit,
              resident_name: payload.residentName,
              plus_code: payload.plusCode || null,
              household_members: payload.householdMembers ? Number(payload.householdMembers) : null,
              notes: payload.notes,
              territory: territory ? { id: territory.id, name: territory.name } : r.territory,
              section: section ? { id: section.id, label: section.label } : r.section,
              block: block ? { id: block.id, label: block.label } : r.block,
            }
          : r
      ),
    }))
    await enqueue(partnershipToken, 'editAddedRecord', {
      partnershipToken,
      recordId,
      territoryId: payload.territoryId,
      sectionId: payload.sectionId,
      blockId: payload.blockId,
      address: payload.address,
      unit: payload.unit,
      residentName: payload.residentName,
      plusCode: payload.plusCode,
      householdMembers: payload.householdMembers,
      notes: payload.notes,
    })
    await refreshQueue()
    toast.success('Contact record updated.')
    if (online) await handleSync()
    setView({ name: 'addedRecordDetail', recordId })
  }

  async function handleDeleteAddedRecord(recordId: string) {
    setDeletingAddedRecord(true)
    try {
      setWorkspace((w) => ({ ...w, addedRecords: w.addedRecords.filter((r) => r.id !== recordId) }))
      await enqueue(partnershipToken, 'deleteAddedRecord', { partnershipToken, recordId })
      await refreshQueue()
      toast.success('Contact record deleted.')
      if (online) await handleSync()
      setView({ name: 'addedRecords' })
    } finally {
      setDeletingAddedRecord(false)
    }
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

  // A change of mind, not ending the ministry — undoes this device's claim entirely so the
  // partnership shows up as available again for anyone (including this same device) to claim
  // fresh. Called directly (not through the offline sync queue) since it needs a live, current
  // answer about whether any visit has actually been logged yet. On success there's nothing
  // left for this device to show — clear its local claim and head back to the batch's partner
  // list so a different (or the same) partnership can be picked.
  async function handleRelease() {
    setReleasing(true)
    try {
      const formData = new FormData()
      formData.set('partnershipToken', partnershipToken)
      const result = await releasePartnershipAction({}, formData)
      if (result.error && result.error !== 'SAVED') {
        toast.error(result.error)
        return
      }
      clearClaimedPartnershipToken(batchToken)
      toast.success('Partnership released.')
      router.push(`/territory-management-system/assignment/${batchToken}`)
    } finally {
      setReleasing(false)
    }
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
  // Pins for this partnership's own currently-assigned records only — not every approved record
  // in the territory (that's the Admin's Household Distribution map on Reports) — so a publisher
  // only ever sees where their own work is, not the whole congregation's.
  const assignedRecordLocations: RecordLocation[] = workspace.records.map((r) => ({
    id: r.record.id,
    address: r.record.address,
    residentName: r.record.resident_name,
    plusCode: r.record.plus_code ?? '',
    territoryName: r.record.territory?.name ?? '',
  }))
  // Pins for an overflow batch's chosen search area — existing/pre-assigned records (blue) and
  // this partnership's own newly-added, still-pending-Admin-approval ones (red), combined on
  // one map so a publisher can tell "already known" from "what I just found" at a glance. Added
  // records are filtered to this partnership's own locked blocks (should already always be true
  // given the add-record form's own lock, but re-checked here rather than assumed).
  const scopeBlockIds = new Set(workspace.searchScope?.blocks.map((b) => b.id) ?? [])
  const searchScopeLocations: (RecordLocation & { color: 'blue' | 'red' })[] = [
    ...workspace.searchScopeRecords.map((r) => ({
      id: r.id,
      address: r.address,
      residentName: r.resident_name,
      plusCode: r.plus_code ?? '',
      territoryName: r.territory?.name ?? '',
      color: 'blue' as const,
    })),
    ...workspace.addedRecords
      .filter((r) => scopeBlockIds.has(r.block_id))
      .map((r) => ({
        id: r.id,
        address: r.address,
        residentName: r.resident_name,
        plusCode: r.plus_code ?? '',
        territoryName: r.territory?.name ?? '',
        color: 'red' as const,
      })),
  ]
  // An overflow partnership must lock in its search area before anything else in the workspace
  // becomes visible — mirrors how the unclaimed state already hides everything behind the
  // rename form. Never true for a non-overflow batch (searchScope stays permanently null for
  // those) or once a scope has already been chosen (one-time only).
  const needsSearchScope = !readOnly && workspace.batch.is_overflow && !workspace.searchScope
  // Only this batch's own territories, narrowed from the full territoryStructures prop — the
  // search-area picker can't offer a section from a territory this batch doesn't even cover.
  const batchTerritoryStructures = territoryStructures.filter((t) => workspace.territories.some((wt) => wt.id === t.id))
  // Once a search area is locked in, "Add a New Contact Record" narrows to it — this partner
  // may only add records within their own scope. Undefined for every other partnership, which
  // keeps the form's normal whole-territory behavior.
  const addRecordLockedScope = (() => {
    if (!workspace.searchScope) return undefined
    const scopeTerritory = territoryStructures.find((t) => t.sections.some((s) => s.id === workspace.searchScope!.sectionId))
    if (!scopeTerritory) return undefined
    return {
      territoryId: scopeTerritory.id,
      territoryName: scopeTerritory.name,
      sectionId: workspace.searchScope.sectionId,
      sectionLabel: workspace.searchScope.sectionLabel,
      blocks: workspace.searchScope.blocks,
    }
  })()

  return (
    <div className="min-h-screen bg-[#C9D8EE] px-4 pb-24 pt-8">
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
        {showSessionChrome && view.name === 'home' && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloaded}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-blue-100 bg-white py-2 text-xs font-semibold text-[#2563EB] transition hover:border-[#38BDF8]/40 disabled:opacity-60"
            >
              {downloaded ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
              {downloaded ? 'Downloaded' : 'Download'}
            </button>
            <button
              type="button"
              onClick={handleSync}
              disabled={syncing || (pendingCount === 0 && failedCount === 0)}
              className="relative flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-blue-100 bg-white py-2 text-xs font-semibold text-[#2563EB] transition hover:border-[#38BDF8]/40 disabled:opacity-60"
            >
              {!online && !syncing ? (
                <CloudOff className="h-3.5 w-3.5" />
              ) : (
                <RefreshCw className={`h-3.5 w-3.5 ${syncing ? 'animate-spin' : ''}`} />
              )}
              {syncing ? 'Syncing…' : !online ? 'Offline' : pendingCount + failedCount > 0 ? 'Sync' : 'Synced'}
              {!syncing && pendingCount + failedCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-0.5 text-[9px] font-bold leading-none text-white">
                  {pendingCount + failedCount}
                </span>
              )}
            </button>
          </div>
        )}

        {readOnly && (view.name === 'home' || view.name === 'list' || view.name === 'detail') && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center text-sm font-medium text-amber-700 shadow-sm">
            Viewing {workspace.name}&apos;s assignment — read only.
          </div>
        )}

        {(view.name === 'home' || view.name === 'list') && !readOnly && !workspace.claimed_at && (
          <>
            <div className="rounded-2xl border border-gray-300 bg-white p-4 text-center text-sm text-slate-600 shadow-[0_0_18px_-3px_rgba(148,163,184,0.6)]">
              Enter your name(s) below to begin — your assigned contact records will appear once saved.
            </div>
            <PartnershipRenameForm currentName={workspace.name} onRename={handleRename} />
          </>
        )}

        {(view.name === 'home' || view.name === 'list') && (readOnly || workspace.claimed_at) && needsSearchScope && (
          <ChooseSearchScopeForm
            territories={batchTerritoryStructures}
            takenBlockIds={workspace.takenBlockIds}
            submitting={choosingSearchScope}
            error={searchScopeChoiceError}
            onSubmit={handleChooseSearchScope}
          />
        )}

        {view.name === 'home' && (readOnly || workspace.claimed_at) && !needsSearchScope && (
          <>
            {!readOnly && <PartnershipRenameForm currentName={workspace.name} onRename={handleRename} />}

            {(() => {
              const mappableTerritories = workspace.territories.filter((t) => mapUrls[t.id] && territoriesWithStructure.has(t.id))
              const tabs: { key: 'territory' | 'records' | 'search' | 'share'; label: string; available: boolean }[] = [
                { key: 'territory', label: 'Territory Map', available: mappableTerritories.length > 0 },
                { key: 'records', label: 'Assigned Records', available: assignedRecordLocations.length > 0 },
                { key: 'search', label: 'Search Area', available: searchScopeLocations.length > 0 },
                { key: 'share', label: 'Share', available: !readOnly },
              ]
              const availableTabs = tabs.filter((t) => t.available)
              if (availableTabs.length === 0) return null

              // A toggle only makes sense once there are genuinely two-or-more maps to switch
              // between — with just one available, show it directly instead of a one-option
              // pill row.
              const showToggle = availableTabs.length > 1
              const activeView = showToggle && availableTabs.some((t) => t.key === mapView) ? mapView : availableTabs[0].key

              return (
                <div className="space-y-3">
                  {showToggle && (
                    <div className="flex justify-center">
                      <div className="inline-flex flex-wrap justify-center rounded-full bg-blue-50 p-1">
                        {availableTabs.map((t) => (
                          <button
                            key={t.key}
                            type="button"
                            onClick={() => setMapView(t.key)}
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                              activeView === t.key ? 'bg-[#2563EB] text-white' : 'text-[#2563EB] hover:bg-blue-100'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeView === 'territory' && (
                    <div className="space-y-3">
                      {!showToggle && (
                        <h2 className="font-semibold text-[#0B1B33]">Territory Map{mappableTerritories.length > 1 ? 's' : ''}</h2>
                      )}
                      {mappableTerritories.map((t) => (
                        <div key={t.id}>
                          <p className="mb-1 text-xs text-slate-700">{t.name}</p>
                          <TerritoryMapViewer mapImageUrl={mapUrls[t.id]} territoryName={t.name} />
                        </div>
                      ))}
                    </div>
                  )}

                  {activeView === 'records' && (
                    <div className="space-y-3">
                      {!showToggle && <h2 className="font-semibold text-[#0B1B33]">My Assigned Records Map</h2>}
                      <HouseholdDistributionMap records={assignedRecordLocations} />
                    </div>
                  )}

                  {activeView === 'search' && (
                    <div className="space-y-3">
                      {!showToggle && <h2 className="font-semibold text-[#0B1B33]">Search Area Map</h2>}
                      <HouseholdDistributionMap records={searchScopeLocations} />
                    </div>
                  )}

                  {activeView === 'share' && !readOnly && (
                    <SharePartnershipCard batchToken={batchToken} partnershipToken={partnershipToken} />
                  )}
                </div>
              )
            })()}

            {!readOnly && (
              <div className="flex gap-3">
                {canRelease && (
                  <button
                    type="button"
                    disabled={releasing}
                    onClick={() => setConfirmDialog({ type: 'release' })}
                    className="flex-1 rounded-lg border border-blue-100 bg-white py-2.5 text-sm font-semibold text-[#2563EB] transition hover:border-[#38BDF8]/40 hover:bg-blue-50 disabled:opacity-50"
                  >
                    {releasing ? 'Releasing…' : 'Release Assignment'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setConfirmDialog({ type: 'terminate' })}
                  className="flex-1 rounded-lg border border-red-200 bg-white py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50"
                >
                  Early Out
                </button>
              </div>
            )}
          </>
        )}

        {view.name === 'list' && (readOnly || workspace.claimed_at) && !needsSearchScope && (
          <>
            {workspace.records.length > 0 && (
              <div>
                <h2 className="font-semibold text-[#0B1B33]">Assigned Contact Records</h2>
                {workspace.territories.map((t) => (
                  <p key={t.id} className="text-xs text-slate-500">
                    {t.name} — {t.description}
                  </p>
                ))}

                {!readOnly && allDone && (
                  <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center shadow-sm">
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

                <div className="mt-3">
                  <AssignedRecordsList
                    records={workspace.records}
                    failedRecordIds={new Set(queue.filter((q) => q.status === 'failed' && q.payload.recordId).map((q) => q.payload.recordId))}
                    onSelect={(recordId) => setView({ name: 'detail', recordId })}
                  />
                </div>
              </div>
            )}

            {workspace.searchScope &&
              (() => {
                const scopeStructTerritory = territoryStructures.find((t) => t.sections.some((s) => s.id === workspace.searchScope!.sectionId))
                const scopeTerritory = scopeStructTerritory ? workspace.territories.find((t) => t.id === scopeStructTerritory.id) : undefined
                const blockLabels = workspace.searchScope.blocks.map((b) => b.label)
                return (
                  <div className={workspace.records.length > 0 ? 'mt-6' : ''}>
                    <h2 className="font-semibold text-[#0B1B33]">Area To Search</h2>
                    {scopeTerritory && (
                      <p className="text-xs text-slate-500">
                        {scopeTerritory.name} — {scopeTerritory.description}
                      </p>
                    )}
                    <p className="text-xs text-slate-500">
                      Section {workspace.searchScope.sectionLabel} — Block{blockLabels.length === 1 ? '' : 's'} {blockLabels.join(', ')}
                    </p>
                    <div className="mt-3">
                      <SearchScopeRecordsList
                        sectionLabel={workspace.searchScope.sectionLabel}
                        blockLabels={blockLabels}
                        records={workspace.searchScopeRecords}
                        refreshing={refreshingSearchScope}
                        onRefresh={handleRefreshSearchScope}
                        onSelect={(recordId) => setView({ name: 'searchScopeDetail', recordId })}
                        showAreaLabel={false}
                      />
                    </div>
                  </div>
                )
              })()}

            {workspace.records.length === 0 && !workspace.searchScope && (
              <div className="rounded-2xl border border-gray-300 bg-white p-4 text-center shadow-[0_0_18px_-3px_rgba(148,163,184,0.6)]">
                <p className="text-sm font-semibold text-[#0B1B33]">No contact records assigned to you.</p>
                <p className="mt-1 text-sm text-slate-500">Add any new contact records you find via My Added Records.</p>
              </div>
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
            recommendingCorrection={recommendingCorrection}
            mapUrl={selected.record.territory ? mapUrls[selected.record.territory.id] : undefined}
            onLogVisit={(visitedAt, result, notes) => handleLogVisit(selected.record.id, visitedAt, result, notes)}
            onMoveRecord={(destinationPartnershipId) => handleMoveRecord(selected.record.id, destinationPartnershipId)}
            onUpdateMoved={(fields) => handleUpdateMoved(selected.record.id, fields)}
            onRecommendRemoval={(reason) => handleRecommendRemoval(selected.record.id, reason)}
            onRecommendCorrection={(fields) => handleRecommendCorrection(selected.record.id, fields)}
          />
        )}

        {view.name === 'addRecord' && (
          <PublisherRecordForm
            territories={territoryStructures}
            lockedScope={addRecordLockedScope}
            onSubmit={handleAddRecord}
            onCancel={() => setView({ name: 'list' })}
          />
        )}

        {view.name === 'addedRecords' && (
          <div>
            <h2 className="mb-3 font-semibold text-[#0B1B33]">My Added Records</h2>
            <AddedRecordsList
              records={workspace.addedRecords}
              onSelect={(recordId) => setView({ name: 'addedRecordDetail', recordId })}
            />
            {editable && territoryStructures.length > 0 && (
              <button
                type="button"
                onClick={() => setView({ name: 'addRecord' })}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-blue-100 bg-white py-2.5 text-sm font-medium text-[#2563EB] hover:border-[#38BDF8]/40"
              >
                <Plus className="h-4 w-4" />
                Add a New Contact Record
              </button>
            )}
          </div>
        )}

        {view.name === 'addedRecordDetail' &&
          (() => {
            const addedRecord = workspace.addedRecords.find((r) => r.id === view.recordId)
            if (!addedRecord) return null
            return (
              <PublisherAddedRecordDetailView
                record={addedRecord}
                editable={editable}
                deleting={deletingAddedRecord}
                onEdit={() => setView({ name: 'editAddedRecord', recordId: addedRecord.id })}
                onDelete={() => setConfirmDialog({ type: 'deleteAddedRecord', recordId: addedRecord.id })}
              />
            )
          })()}

        {view.name === 'editAddedRecord' &&
          (() => {
            const addedRecord = workspace.addedRecords.find((r) => r.id === view.recordId)
            if (!addedRecord) return null
            return (
              <PublisherRecordForm
                mode="edit"
                territories={territoryStructures}
                initialValues={{
                  territoryId: addedRecord.territory_id,
                  sectionId: addedRecord.section_id,
                  blockId: addedRecord.block_id,
                  address: addedRecord.address,
                  unit: addedRecord.unit,
                  residentName: addedRecord.resident_name,
                  plusCode: addedRecord.plus_code ?? '',
                  householdMembers: addedRecord.household_members != null ? String(addedRecord.household_members) : '',
                  notes: addedRecord.notes,
                }}
                onSubmit={(payload) => handleEditAddedRecord(addedRecord.id, payload)}
                onCancel={() => setView({ name: 'addedRecordDetail', recordId: addedRecord.id })}
              />
            )
          })()}

        {view.name === 'searchScopeDetail' &&
          (() => {
            const record = workspace.searchScopeRecords.find((r) => r.id === view.recordId)
            if (!record) return null
            return (
              <SearchScopeRecordDetailView
                record={record}
                editable={editable}
                submitting={recommendingSearchScopeCorrection}
                onRecommendCorrection={(fields) => handleRecommendSearchScopeCorrection(record.id, fields)}
              />
            )
          })()}

        {view.name === 'note' && <PublisherNoteForm sending={sendingNote} onSend={handleSendNote} onSkip={handleSkipNote} />}

        {view.name === 'sync' && (
          <div className="rounded-2xl border border-gray-300 bg-white p-6 text-center shadow-[0_0_18px_-3px_rgba(148,163,184,0.6)]">
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
          <div className="rounded-2xl border border-gray-300 bg-white p-8 text-center shadow-[0_0_18px_-3px_rgba(148,163,184,0.6)]">
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
        view={
          view.name === 'note' || view.name === 'sync' || view.name === 'done' || view.name === 'searchScopeDetail'
            ? 'list'
            : view.name
        }
        onGoToHome={() => setView({ name: 'home' })}
        onGoToRecords={() => setView({ name: 'list' })}
        onGoToAddedRecords={() => setView({ name: 'addedRecords' })}
        showAddedRecords={!readOnly}
        onGoToVisitForm={scrollToVisitForm}
      />

      <ConfirmModal
        open={confirmDialog?.type === 'terminate'}
        title="End your ministry early?"
        message="Your progress so far is already saved. Any records you haven't gotten to yet will simply stay assigned as-is for next time — nothing is marked or changed."
        confirmLabel="End Ministry"
        onConfirm={() => {
          setConfirmDialog(null)
          handleTerminate()
        }}
        onCancel={() => setConfirmDialog(null)}
      />
      <ConfirmModal
        open={confirmDialog?.type === 'deleteAddedRecord'}
        title="Delete this contact record?"
        message="This cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => {
          if (confirmDialog?.type === 'deleteAddedRecord') handleDeleteAddedRecord(confirmDialog.recordId)
          setConfirmDialog(null)
        }}
        onCancel={() => setConfirmDialog(null)}
      />
      <ConfirmModal
        open={confirmDialog?.type === 'release'}
        title="Release this partnership?"
        message="This isn't ending your ministry — it just frees this partnership back up so anyone (including you) can claim it fresh. Only available since you haven't logged a visit yet."
        confirmLabel="Release"
        onConfirm={() => {
          setConfirmDialog(null)
          handleRelease()
        }}
        onCancel={() => setConfirmDialog(null)}
      />
    </div>
  )
}
