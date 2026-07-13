import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import { calculateAssignment, isAssignmentError, type AssignmentError } from './engine'
import type {
  AssignmentBatch,
  BatchSummary,
  Partnership,
  PartnershipRecordDetail,
  PartnershipWithProgress,
  PartnershipWorkspace,
} from './types'

// Fetches the eligible ('approved') record pool across the selected territories, in the
// canonical walking order the sequential engine relies on: territory selection order, then
// section sort_order, then block sort_order, then record creation order. This ordering lives
// here (DB-facing), not in the pure engine, which only ever sees a pre-sorted id list.
async function fetchEligibleRecordIds(
  supabase: SupabaseClient,
  congregationId: string,
  territoryIds: string[]
): Promise<string[]> {
  const { data } = await supabase
    .from('territory_records')
    .select('id, territory_id, created_at, section:territory_sections(sort_order), block:territory_blocks(sort_order)')
    .eq('congregation_id', congregationId)
    .in('territory_id', territoryIds)
    .eq('status', 'approved')

  const territoryRank = new Map(territoryIds.map((id, index) => [id, index]))
  const rows = (data ?? []) as unknown as Array<{
    id: string
    territory_id: string
    created_at: string
    section: { sort_order: number } | null
    block: { sort_order: number } | null
  }>

  rows.sort((a, b) => {
    const territoryDiff = (territoryRank.get(a.territory_id) ?? 0) - (territoryRank.get(b.territory_id) ?? 0)
    if (territoryDiff !== 0) return territoryDiff
    const sectionDiff = (a.section?.sort_order ?? 0) - (b.section?.sort_order ?? 0)
    if (sectionDiff !== 0) return sectionDiff
    const blockDiff = (a.block?.sort_order ?? 0) - (b.block?.sort_order ?? 0)
    if (blockDiff !== 0) return blockDiff
    return a.created_at.localeCompare(b.created_at)
  })

  return rows.map((r) => r.id)
}

// Per-territory approved-record counts, for the New Assignment form's live "how many
// records would this pull in" hint next to each territory checkbox.
export async function getApprovedRecordCounts(
  supabase: SupabaseClient,
  congregationId: string
): Promise<Record<string, number>> {
  const { data } = await supabase
    .from('territory_records')
    .select('territory_id')
    .eq('congregation_id', congregationId)
    .eq('status', 'approved')

  const counts: Record<string, number> = {}
  for (const row of (data ?? []) as { territory_id: string }[]) {
    counts[row.territory_id] = (counts[row.territory_id] ?? 0) + 1
  }
  return counts
}

export interface CreateAssignmentResult {
  batchId: string
  unassignedCount: number
}

export async function createAssignment(
  supabase: SupabaseClient,
  congregationId: string,
  input: { territoryIds: string[]; partnershipCount: number; assignmentDate: string }
): Promise<CreateAssignmentResult | AssignmentError> {
  const eligibleRecordIds = await fetchEligibleRecordIds(supabase, congregationId, input.territoryIds)
  const plan = calculateAssignment(eligibleRecordIds, input.partnershipCount)
  if (isAssignmentError(plan)) return plan

  const { data: batch, error: batchError } = await supabase
    .from('assignment_batches')
    .insert({
      congregation_id: congregationId,
      assignment_date: input.assignmentDate,
      requested_partnership_count: input.partnershipCount,
    })
    .select('id')
    .single()
  if (batchError) return { error: batchError.message }
  const batchId = batch.id as string

  const { error: territoriesError } = await supabase.from('assignment_batch_territories').insert(
    input.territoryIds.map((territoryId) => ({ congregation_id: congregationId, batch_id: batchId, territory_id: territoryId }))
  )
  if (territoriesError) return { error: territoriesError.message }

  for (const partnershipPlan of plan.partnerships) {
    const { data: partnership, error: partnershipError } = await supabase
      .from('partnerships')
      .insert({
        congregation_id: congregationId,
        batch_id: batchId,
        sequence: partnershipPlan.sequence,
        name: `Partnership ${partnershipPlan.sequence}`,
      })
      .select('id')
      .single()
    if (partnershipError) return { error: partnershipError.message }

    const { error: recordsError } = await supabase.from('partnership_records').insert(
      partnershipPlan.recordIds.map((recordId, index) => ({
        congregation_id: congregationId,
        partnership_id: partnership.id,
        record_id: recordId,
        sequence: index + 1,
      }))
    )
    if (recordsError) return { error: recordsError.message }
  }

  return { batchId, unassignedCount: plan.unassignedCount }
}

export async function deleteBatch(supabase: SupabaseClient, batchId: string): Promise<void> {
  const { error } = await supabase.from('assignment_batches').delete().eq('id', batchId)
  if (error) throw error
}

export async function listBatches(supabase: SupabaseClient, congregationId: string): Promise<AssignmentBatch[]> {
  const { data } = await supabase
    .from('assignment_batches')
    .select('*')
    .eq('congregation_id', congregationId)
    .order('assignment_date', { ascending: false })
  return (data ?? []) as AssignmentBatch[]
}

export async function getBatchForDate(
  supabase: SupabaseClient,
  congregationId: string,
  assignmentDate: string
): Promise<AssignmentBatch | null> {
  const { data } = await supabase
    .from('assignment_batches')
    .select('*')
    .eq('congregation_id', congregationId)
    .eq('assignment_date', assignmentDate)
    .maybeSingle()
  return (data as AssignmentBatch | null) ?? null
}

// Shared by the admin Assignment Summary page, the public partnership-list page, and the
// public Progress page — all three need the same "batch + territories + per-partnership
// progress" shape.
export async function getBatchSummary(
  supabase: SupabaseClient,
  congregationId: string,
  batchId: string
): Promise<BatchSummary | null> {
  const { data: batch } = await supabase
    .from('assignment_batches')
    .select('*')
    .eq('congregation_id', congregationId)
    .eq('id', batchId)
    .maybeSingle()
  if (!batch) return null

  const [{ data: territoryLinks }, { data: partnerships }] = await Promise.all([
    supabase.from('assignment_batch_territories').select('territory:territories(id, name)').eq('batch_id', batchId),
    supabase.from('partnerships').select('*').eq('batch_id', batchId).order('sequence'),
  ])

  const partnershipIds = (partnerships ?? []).map((p) => p.id)
  const { data: allRecords } =
    partnershipIds.length > 0
      ? await supabase.from('partnership_records').select('partnership_id, completed_at').in('partnership_id', partnershipIds)
      : { data: [] as { partnership_id: string; completed_at: string | null }[] }

  const partnershipsWithProgress: PartnershipWithProgress[] = (partnerships ?? []).map((p) => {
    const records = (allRecords ?? []).filter((r) => r.partnership_id === p.id)
    return {
      ...(p as Partnership),
      recordCount: records.length,
      completedCount: records.filter((r) => r.completed_at !== null).length,
    }
  })

  return {
    ...(batch as AssignmentBatch),
    territories: ((territoryLinks ?? []) as unknown as { territory: { id: string; name: string } }[]).map((t) => t.territory),
    partnerships: partnershipsWithProgress,
  }
}

// Public entry point: resolves a batch by its QR/URL token. No congregation auth involved —
// the unguessable token itself is the access control for this one public-facing slice.
export async function getBatchByToken(supabase: SupabaseClient, accessToken: string): Promise<BatchSummary | null> {
  const { data: batch } = await supabase.from('assignment_batches').select('*').eq('access_token', accessToken).maybeSingle()
  if (!batch) return null
  return getBatchSummary(supabase, batch.congregation_id, batch.id)
}

// Public entry point: resolves a partnership by its claim token and returns everything its
// workspace page needs. Opportunistically stamps claimed_at the first time it's resolved —
// there's no separate "claim" action; visiting the link *is* claiming it.
export async function getPartnershipByToken(supabase: SupabaseClient, claimToken: string): Promise<PartnershipWorkspace | null> {
  const { data: partnership } = await supabase.from('partnerships').select('*').eq('claim_token', claimToken).maybeSingle()
  if (!partnership) return null

  if (!partnership.claimed_at) {
    await supabase.from('partnerships').update({ claimed_at: new Date().toISOString() }).eq('id', partnership.id)
  }

  const { data: batch } = await supabase.from('assignment_batches').select('*').eq('id', partnership.batch_id).maybeSingle()
  if (!batch) return null

  const { data: partnershipRecords } = await supabase
    .from('partnership_records')
    .select(
      'id, sequence, completed_at, record:territory_records(*, territory:territories(id, name, map_image_url), section:territory_sections(id, label), block:territory_blocks(id, label))'
    )
    .eq('partnership_id', partnership.id)
    .order('sequence')

  const records = (partnershipRecords ?? []) as unknown as PartnershipRecordDetail[]

  // Fetched up front, once, and attached per-record — the client shell renders visit history
  // entirely from this initial payload, no on-demand server call once the page has loaded.
  if (records.length > 0) {
    const { data: visitRows } = await supabase
      .from('territory_record_visits')
      .select('*, creator:profiles(full_name)')
      .in(
        'record_id',
        records.map((r) => r.record.id)
      )
      .order('visited_at', { ascending: false })
    const visitsByRecord = new Map<string, PartnershipRecordDetail['visits']>()
    for (const row of (visitRows ?? []) as unknown as Array<Record<string, unknown> & { record_id: string; creator: { full_name: string } | null }>) {
      const list = visitsByRecord.get(row.record_id) ?? []
      list.push({ ...(row as unknown as PartnershipRecordDetail['visits'][number]), created_by_name: row.creator?.full_name ?? null })
      visitsByRecord.set(row.record_id, list)
    }
    for (const r of records) {
      r.visits = visitsByRecord.get(r.record.id) ?? []
    }
  }

  const territoryMap = new Map<string, { id: string; name: string; map_image_url: string | null }>()
  for (const r of records) {
    if (r.record.territory) territoryMap.set(r.record.territory.id, r.record.territory)
  }

  return {
    ...(partnership as Partnership),
    batch: batch as AssignmentBatch,
    records,
    territories: [...territoryMap.values()],
  }
}

export async function renamePartnership(supabase: SupabaseClient, partnershipId: string, name: string): Promise<void> {
  const { error } = await supabase.from('partnerships').update({ name }).eq('id', partnershipId)
  if (error) throw error
}

// Guard used before any publisher-facing record mutation — the concrete enforcement of
// "publishers cannot edit records belonging to other partnerships."
export async function partnershipHasRecord(supabase: SupabaseClient, partnershipId: string, recordId: string): Promise<boolean> {
  const { data } = await supabase
    .from('partnership_records')
    .select('id')
    .eq('partnership_id', partnershipId)
    .eq('record_id', recordId)
    .maybeSingle()
  return !!data
}

// Only stamps completed_at the first time — later visits to an already-completed record
// (e.g. a follow-up Return Visit) don't reset "when this partnership finished it."
export async function markPartnershipRecordCompleted(supabase: SupabaseClient, partnershipId: string, recordId: string): Promise<void> {
  const { error } = await supabase
    .from('partnership_records')
    .update({ completed_at: new Date().toISOString() })
    .eq('partnership_id', partnershipId)
    .eq('record_id', recordId)
    .is('completed_at', null)
  if (error) throw error
}
