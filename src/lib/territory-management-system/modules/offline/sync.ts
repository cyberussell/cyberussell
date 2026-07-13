'use client'

// Replays queued items through the *existing* publisher Server Actions — no new server
// endpoints. Each item that fails (e.g. its partnership/record no longer exists because the
// admin regenerated the assignment) is marked 'failed' and left in the queue rather than
// retried silently or dropped — the confirmed reject-and-flag conflict rule.

import { addPublisherRecordAction, logPublisherVisitAction, renamePartnershipAction } from '@/app/territory-management-system/actions/publisher'
import type { SyncQueueItem } from './db'
import { listQueue, removeFromQueue, updateQueueItem } from './queue'

export interface FlushResult {
  synced: number
  failed: number
}

function buildFormData(payload: Record<string, string>): FormData {
  const formData = new FormData()
  for (const [key, value] of Object.entries(payload)) formData.set(key, value)
  return formData
}

async function executeItem(item: SyncQueueItem): Promise<{ ok: boolean; error?: string }> {
  const formData = buildFormData(item.payload)
  const result =
    item.type === 'rename'
      ? await renamePartnershipAction({}, formData)
      : item.type === 'visit'
        ? await logPublisherVisitAction({}, formData)
        : await addPublisherRecordAction({}, formData)

  // 'SAVED' is this codebase's success sentinel (see useServerAction) — everything else in
  // result.error is a real failure.
  if (result.error && result.error !== 'SAVED') return { ok: false, error: result.error }
  return { ok: true }
}

export async function flushQueue(partnershipToken: string): Promise<FlushResult> {
  const items = await listQueue(partnershipToken)
  let synced = 0
  let failed = 0

  for (const item of items) {
    if (item.status === 'syncing') continue
    await updateQueueItem(item.id, { status: 'syncing' })
    try {
      const { ok, error } = await executeItem(item)
      if (ok) {
        await removeFromQueue(item.id)
        synced += 1
      } else {
        await updateQueueItem(item.id, { status: 'failed', error })
        failed += 1
      }
    } catch (e) {
      await updateQueueItem(item.id, { status: 'failed', error: e instanceof Error ? e.message : 'Sync failed.' })
      failed += 1
    }
  }

  return { synced, failed }
}
