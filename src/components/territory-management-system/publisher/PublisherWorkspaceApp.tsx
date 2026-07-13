'use client'

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Download, Plus } from 'lucide-react'
import type { PartnershipWorkspace } from '@/lib/territory-management-system/modules/assignment/types'
import type { TerritoryStructure } from '@/lib/territory-management-system/modules/territory/types'
import type { SyncQueueItem } from '@/lib/territory-management-system/modules/offline/db'
import { downloadAssignment, getLocalMapImageUrl, isDownloaded } from '@/lib/territory-management-system/modules/offline/download'
import { enqueue, listQueue } from '@/lib/territory-management-system/modules/offline/queue'
import { flushQueue } from '@/lib/territory-management-system/modules/offline/sync'
import { useOnlineStatus } from '@/lib/territory-management-system/modules/offline/useOnlineStatus'
import TerritoryMapViewer from '@/components/territory-management-system/TerritoryMapViewer'
import SyncStatusBar from './SyncStatusBar'
import PartnershipRenameForm from './PartnershipRenameForm'
import AssignedRecordsList from './AssignedRecordsList'
import PublisherRecordDetailView from './PublisherRecordDetailView'
import PublisherRecordForm, { type NewPublisherRecordPayload } from './PublisherRecordForm'

type View = { name: 'list' } | { name: 'detail'; recordId: string } | { name: 'addRecord' }

// The offline-first app shell: everything after the initial server-rendered load happens as
// in-memory view-state changes here, never a new Next.js page navigation — that's what makes
// the rest of the day's session work with zero network once this has mounted once online.
export default function PublisherWorkspaceApp({
  partnershipToken,
  initialWorkspace,
  territoryStructures,
}: {
  partnershipToken: string
  initialWorkspace: PartnershipWorkspace
  territoryStructures: TerritoryStructure[]
}) {
  const [workspace, setWorkspace] = useState(initialWorkspace)
  const [view, setView] = useState<View>({ name: 'list' })
  const [downloaded, setDownloaded] = useState(false)
  const [queue, setQueue] = useState<SyncQueueItem[]>([])
  const [syncing, setSyncing] = useState(false)
  const [mapUrls, setMapUrls] = useState<Record<string, string>>({})
  const online = useOnlineStatus()

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
    setSyncing(true)
    const result = await flushQueue(partnershipToken)
    await refreshQueue()
    setSyncing(false)
    if (result.synced > 0) toast.success(`${result.synced} item(s) synced.`)
    if (result.failed > 0) toast.error(`${result.failed} item(s) failed to sync — see the pending list below.`)
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

  async function handleDownload() {
    await downloadAssignment(partnershipToken, workspace)
    setDownloaded(true)
    toast.success('Downloaded — ready for offline use.')
  }

  async function handleRename(name: string) {
    setWorkspace((w) => ({ ...w, name }))
    await enqueue(partnershipToken, 'rename', { partnershipToken, name })
    await refreshQueue()
    if (online) handleSync()
  }

  async function handleLogVisit(recordId: string, visitedAt: string, result: string, notes: string) {
    setWorkspace((w) => ({
      ...w,
      records: w.records.map((r) =>
        r.record.id === recordId ? { ...r, completed_at: r.completed_at ?? new Date().toISOString() } : r
      ),
    }))
    await enqueue(partnershipToken, 'visit', { partnershipToken, recordId, visitedAt, result, notes })
    await refreshQueue()
    if (online) handleSync()
  }

  async function handleAddRecord(payload: NewPublisherRecordPayload) {
    await enqueue(partnershipToken, 'addRecord', { partnershipToken, ...payload })
    await refreshQueue()
    setView({ name: 'list' })
    toast.success('Record queued for submission.')
    if (online) handleSync()
  }

  const selected = view.name === 'detail' ? (workspace.records.find((r) => r.record.id === view.recordId) ?? null) : null
  const pendingVisitsForSelected =
    view.name === 'detail' ? queue.filter((q) => q.type === 'visit' && q.payload.recordId === view.recordId) : []

  return (
    <div className="min-h-screen bg-[#F3F8FF] px-4 py-8">
      <div className="mx-auto max-w-lg space-y-6">
        <SyncStatusBar
          online={online}
          pendingCount={queue.filter((q) => q.status !== 'syncing').length}
          syncing={syncing}
          onSync={handleSync}
        />

        {!downloaded ? (
          <button
            type="button"
            onClick={handleDownload}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#38BDF8]/40 bg-white py-3 text-sm font-semibold text-[#2563EB] hover:border-[#38BDF8]"
          >
            <Download className="h-4 w-4" />
            Download for Offline Use
          </button>
        ) : (
          <p className="text-center text-xs font-medium text-emerald-600">✓ Downloaded — ready for offline use</p>
        )}

        {view.name === 'list' && (
          <>
            <PartnershipRenameForm currentName={workspace.name} onRename={handleRename} />

            {Object.keys(mapUrls).length > 0 && (
              <div className="space-y-3">
                <h2 className="font-semibold text-[#0B1B33]">Territory Map{Object.keys(mapUrls).length > 1 ? 's' : ''}</h2>
                {workspace.territories.map((t) =>
                  mapUrls[t.id] ? (
                    <div key={t.id}>
                      <p className="mb-1 text-xs text-slate-500">{t.name}</p>
                      <TerritoryMapViewer mapImageUrl={mapUrls[t.id]} territoryName={t.name} />
                    </div>
                  ) : null
                )}
              </div>
            )}

            <div>
              <h2 className="mb-3 font-semibold text-[#0B1B33]">Assigned Records</h2>
              <AssignedRecordsList records={workspace.records} onSelect={(recordId) => setView({ name: 'detail', recordId })} />
            </div>

            {territoryStructures.length > 0 && (
              <button
                type="button"
                onClick={() => setView({ name: 'addRecord' })}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-100 bg-white py-2.5 text-sm font-medium text-[#2563EB] hover:border-[#38BDF8]/40"
              >
                <Plus className="h-4 w-4" />
                Add a New Territory Record
              </button>
            )}
          </>
        )}

        {view.name === 'detail' && selected && (
          <PublisherRecordDetailView
            assigned={selected}
            pendingVisits={pendingVisitsForSelected}
            onBack={() => setView({ name: 'list' })}
            onLogVisit={(visitedAt, result, notes) => handleLogVisit(selected.record.id, visitedAt, result, notes)}
          />
        )}

        {view.name === 'addRecord' && (
          <PublisherRecordForm territories={territoryStructures} onSubmit={handleAddRecord} onCancel={() => setView({ name: 'list' })} />
        )}
      </div>
    </div>
  )
}
