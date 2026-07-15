import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import { calculateAssignment, isAssignmentError, type AssignmentError } from './engine'
import { isBatchExpired } from './date'
import { listRecordsAddedByPartnership, logVisit } from '../records/queries'
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
// section sort_order, then block sort_order, then (within a block) oldest-last-visited-first —
// a record never visited at all sorts before every visited one. This is what actually produces
// rotation across successive assignment generations: a record's created_at never changes (so
// tiebreaking on that, the old behavior, would hand the same first N records in a block to
// every single assignment), but a record's latest visit date does, so a record worked today
// naturally sorts toward the back of its block next time and a long-neglected one surfaces
// first. Confirmed with Russell: section/block grouping stays the primary walking order (so a
// partnership's route stays geographically coherent) — staleness only breaks ties within a
// block, it doesn't reorder which block comes first. This ordering lives here (DB-facing), not
// in the pure engine, which only ever sees a pre-sorted id list.
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

  const latestVisitByRecord = await getLatestVisitDatesByRecord(
    supabase,
    rows.map((r) => r.id)
  )

  rows.sort((a, b) => {
    const territoryDiff = (territoryRank.get(a.territory_id) ?? 0) - (territoryRank.get(b.territory_id) ?? 0)
    if (territoryDiff !== 0) return territoryDiff
    const sectionDiff = (a.section?.sort_order ?? 0) - (b.section?.sort_order ?? 0)
    if (sectionDiff !== 0) return sectionDiff
    const blockDiff = (a.block?.sort_order ?? 0) - (b.block?.sort_order ?? 0)
    if (blockDiff !== 0) return blockDiff
    // '' sorts before any real ISO timestamp, so a never-visited record (no entry in the map)
    // is treated as infinitely old and always comes first within its block.
    const visitDiff = (latestVisitByRecord.get(a.id) ?? '').localeCompare(latestVisitByRecord.get(b.id) ?? '')
    if (visitDiff !== 0) return visitDiff
    return a.created_at.localeCompare(b.created_at)
  })

  return rows.map((r) => r.id)
}

// One query for the whole eligible pool rather than per-record, then reduced in JS to "first
// (newest) row per record_id" — same de-dup pattern already used by reports/queries.ts's
// activeBibleStudies count, kept consistent rather than introducing a GROUP BY variant.
async function getLatestVisitDatesByRecord(supabase: SupabaseClient, recordIds: string[]): Promise<Map<string, string>> {
  if (recordIds.length === 0) return new Map()
  const { data } = await supabase
    .from('territory_record_visits')
    .select('record_id, visited_at')
    .in('record_id', recordIds)
    .order('visited_at', { ascending: false })

  const latest = new Map<string, string>()
  for (const row of (data ?? []) as { record_id: string; visited_at: string }[]) {
    if (!latest.has(row.record_id)) latest.set(row.record_id, row.visited_at)
  }
  return latest
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

// Territories already claimed by ANY Group Leader's active batch today (congregation-wide,
// not scoped to one creator) — used to block a second Group Leader from double-assigning the
// same territory. Called after the caller's own prior batch for today (if regenerating) has
// already been deleted, so this never conflicts with itself.
async function getTerritoryIdsInUseToday(supabase: SupabaseClient, congregationId: string, assignmentDate: string): Promise<Set<string>> {
  const { data: batches } = await supabase
    .from('assignment_batches')
    .select('id')
    .eq('congregation_id', congregationId)
    .eq('assignment_date', assignmentDate)
  const batchIds = (batches ?? []).map((b) => b.id as string)
  if (batchIds.length === 0) return new Set()

  const { data: links } = await supabase.from('assignment_batch_territories').select('territory_id').in('batch_id', batchIds)
  return new Set((links ?? []).map((l) => l.territory_id as string))
}

export interface CreateAssignmentResult {
  batchId: string
  unassignedCount: number
}

export async function createAssignment(
  supabase: SupabaseClient,
  congregationId: string,
  input: { territoryIds: string[]; partnershipCount: number; assignmentDate: string; createdBy: string }
): Promise<CreateAssignmentResult | AssignmentError> {
  // The territory checkboxes are ordinary client-editable form values — confirm every
  // selected id actually belongs to this congregation before it's written into
  // assignment_batch_territories, same "don't trust a client-supplied parent id" rule as
  // territory/queries.ts's addSection/addBlock.
  const { data: ownedTerritories } = await supabase
    .from('territories')
    .select('id, name')
    .eq('congregation_id', congregationId)
    .in('id', input.territoryIds)
  const ownedById = new Map((ownedTerritories ?? []).map((t) => [t.id as string, t.name as string]))
  const territoryIds = input.territoryIds.filter((id) => ownedById.has(id))
  if (territoryIds.length === 0) return { error: 'Select at least one valid territory.' }

  // No two Group Leaders' active batches on the same day may cover the same territory —
  // confirmed with Russell: a hard block with a clear error, not a silent auto-filter.
  const inUseTerritoryIds = await getTerritoryIdsInUseToday(supabase, congregationId, input.assignmentDate)
  const conflictingNames = territoryIds.filter((id) => inUseTerritoryIds.has(id)).map((id) => ownedById.get(id) ?? id)
  if (conflictingNames.length > 0) {
    const list = conflictingNames.join(', ')
    const verb = conflictingNames.length === 1 ? 'is' : 'are'
    return { error: `${list} ${verb} already assigned in another Group Leader's active batch today. Choose different territories.` }
  }

  const eligibleRecordIds = await fetchEligibleRecordIds(supabase, congregationId, territoryIds)
  const plan = calculateAssignment(eligibleRecordIds, input.partnershipCount)
  if (isAssignmentError(plan)) return plan

  const { data: batch, error: batchError } = await supabase
    .from('assignment_batches')
    .insert({
      congregation_id: congregationId,
      assignment_date: input.assignmentDate,
      requested_partnership_count: input.partnershipCount,
      created_by: input.createdBy,
    })
    .select('id')
    .single()
  if (batchError) return { error: batchError.message }
  const batchId = batch.id as string

  const { error: territoriesError } = await supabase.from('assignment_batch_territories').insert(
    territoryIds.map((territoryId) => ({ congregation_id: congregationId, batch_id: batchId, territory_id: territoryId }))
  )
  if (territoriesError) return { error: territoriesError.message }

  for (const partnershipPlan of plan.partnerships) {
    const { data: partnership, error: partnershipError } = await supabase
      .from('partnerships')
      .insert({
        congregation_id: congregationId,
        batch_id: batchId,
        sequence: partnershipPlan.sequence,
        name: `Ministry Partner ${partnershipPlan.sequence}`,
      })
      .select('id')
      .single()
    if (partnershipError) return { error: partnershipError.message }

    // A "searching a fresh territory" partnership has zero recordIds by design (see engine.ts)
    // — .insert([]) is a no-op worth skipping outright rather than trusting every Supabase
    // client version to handle an empty array insert gracefully.
    if (partnershipPlan.recordIds.length > 0) {
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
  }

  return { batchId, unassignedCount: plan.unassignedCount }
}

export async function deleteBatch(supabase: SupabaseClient, batchId: string): Promise<void> {
  const { error } = await supabase.from('assignment_batches').delete().eq('id', batchId)
  if (error) throw error
}

// Each Group Leader now has at most one batch per congregation per day (see
// 013_group_leader_assignment_ownership.sql) — "today's batch" means "my own batch today,"
// not "the congregation's one shared batch" the way it used to.
export async function getBatchForGroupLeaderAndDate(
  supabase: SupabaseClient,
  congregationId: string,
  groupLeaderId: string,
  assignmentDate: string
): Promise<AssignmentBatch | null> {
  const { data } = await supabase
    .from('assignment_batches')
    .select('*')
    .eq('congregation_id', congregationId)
    .eq('assignment_date', assignmentDate)
    .eq('created_by', groupLeaderId)
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

  const [{ data: territoryLinks }, { data: partnerships }, { data: congregation }] = await Promise.all([
    supabase.from('assignment_batch_territories').select('territory:territories(id, name)').eq('batch_id', batchId),
    // Explicit column list, not select('*') — this feeds both the Admin dashboard and the
    // Group Leader's stats.partnerships (via getBatchStats), and admin_note/admin_note_at
    // must never reach the Group Leader surface (see 011_partnership_admin_note.sql).
    supabase
      .from('partnerships')
      .select('id, congregation_id, batch_id, sequence, name, claim_token, claimed_at, ended_early_at, finished_at, created_at')
      .eq('batch_id', batchId)
      .order('sequence'),
    supabase.from('congregations').select('timezone').eq('id', congregationId).maybeSingle(),
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
    expired: isBatchExpired((batch as AssignmentBatch).assignment_date, congregation?.timezone ?? 'UTC'),
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
// workspace page needs. Does NOT stamp claimed_at — claiming happens explicitly when the
// publisher saves their name via renamePartnership below, not merely by opening the link, so
// the assigned-records list can stay hidden behind a "who are you" step until then.
export async function getPartnershipByToken(supabase: SupabaseClient, claimToken: string): Promise<PartnershipWorkspace | null> {
  const { data: partnership } = await supabase.from('partnerships').select('*').eq('claim_token', claimToken).maybeSingle()
  if (!partnership) return null

  const { data: batch } = await supabase.from('assignment_batches').select('*').eq('id', partnership.batch_id).maybeSingle()
  if (!batch) return null

  const { data: congregation } = await supabase.from('congregations').select('name, timezone').eq('id', partnership.congregation_id).maybeSingle()
  const expired = isBatchExpired(batch.assignment_date, congregation?.timezone ?? 'UTC')

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

  // The whole BATCH's selected territories, not just the ones with an assigned record — a
  // zero-record ("searching a fresh territory") partnership has no records to derive a
  // territory from at all, which used to leave both "Add a New Contact Record" and the
  // Territory Map(s) section with nothing to show for a batch that's entirely about searching
  // one specific territory.
  const { data: batchTerritoryLinks } = await supabase
    .from('assignment_batch_territories')
    .select('territory:territories(id, name, map_image_url)')
    .eq('batch_id', partnership.batch_id)
  const territories = ((batchTerritoryLinks ?? []) as unknown as { territory: { id: string; name: string; map_image_url: string | null } | null }[])
    .map((l) => l.territory)
    .filter((t): t is { id: string; name: string; map_image_url: string | null } => t !== null)

  const siblingPartnerships = await getBatchSiblingPartnerships(supabase, partnership.batch_id, partnership.id)
  const addedRecords = await listRecordsAddedByPartnership(supabase, partnership.id)

  return {
    ...(partnership as Partnership),
    batch: batch as AssignmentBatch,
    congregationName: congregation?.name ?? '',
    records,
    territories,
    expired,
    siblingPartnerships,
    addedRecords,
  }
}

// Other partnerships in the same batch a record can be moved to — excludes the partnership
// itself and any that already ended their ministry early (nothing left to hand a record to).
export async function getBatchSiblingPartnerships(
  supabase: SupabaseClient,
  batchId: string,
  excludePartnershipId: string
): Promise<{ id: string; name: string }[]> {
  const { data } = await supabase
    .from('partnerships')
    .select('id, name, ended_early_at')
    .eq('batch_id', batchId)
    .neq('id', excludePartnershipId)
    .order('sequence')
  return ((data ?? []) as { id: string; name: string; ended_early_at: string | null }[])
    .filter((p) => !p.ended_early_at)
    .map((p) => ({ id: p.id, name: p.name }))
}

// Resolves a partnership by its raw id (not claim_token) — used to validate a move's
// destination, which the publisher picks from getBatchSiblingPartnerships' list rather than
// ever having that partnership's own token.
export async function getPartnershipById(supabase: SupabaseClient, partnershipId: string): Promise<Partnership | null> {
  const { data } = await supabase.from('partnerships').select('*').eq('id', partnershipId).maybeSingle()
  return (data as Partnership | null) ?? null
}

// The first successful rename *is* the claim (see getPartnershipByToken's comment above) — a
// later rename (e.g. a typo fix) shouldn't re-stamp claimed_at, so that only happens the one
// time this conditional update actually matches a still-unclaimed row.
export async function renamePartnership(supabase: SupabaseClient, partnershipId: string, name: string): Promise<void> {
  const { data: claimedRow, error: claimError } = await supabase
    .from('partnerships')
    .update({ name, claimed_at: new Date().toISOString() })
    .eq('id', partnershipId)
    .is('claimed_at', null)
    .select('id')
    .maybeSingle()
  if (claimError) throw claimError
  if (claimedRow) return

  const { error } = await supabase.from('partnerships').update({ name }).eq('id', partnershipId)
  if (error) throw error
}

// Ends a Ministry Partner's session early. Every assigned record they hadn't gotten to yet gets
// a real 'undone' visit logged — so Reports reflects it was genuinely left unfinished rather
// than silently missing — and is stamped completed, same as any other visited record.
export async function terminatePartnershipEarly(
  supabase: SupabaseClient,
  congregationId: string,
  partnershipId: string,
  partnershipName: string
): Promise<void> {
  const { data: unfinished } = await supabase
    .from('partnership_records')
    .select('record_id')
    .eq('partnership_id', partnershipId)
    .is('completed_at', null)

  for (const row of unfinished ?? []) {
    await logVisit(supabase, congregationId, {
      recordId: row.record_id,
      visitedAt: new Date().toISOString(),
      result: 'undone',
      notes: '',
      createdBy: null,
      partnerName: partnershipName || null,
    })
    await markPartnershipRecordCompleted(supabase, partnershipId, row.record_id)
  }

  const { error } = await supabase
    .from('partnerships')
    .update({ ended_early_at: new Date().toISOString() })
    .eq('id', partnershipId)
    .is('ended_early_at', null)
  if (error) throw error
}

// The "we're genuinely done" signal, set the moment a publisher reaches Sync & Finish (Skip or
// Send on the note screen) — reachable from BOTH the normal finish path and the End Early path,
// since both route through that same note screen. Distinct from ended_early_at (only set by
// terminatePartnershipEarly above, meaning unfinished records got marked undone); this fires
// regardless of which path got them there. Idempotent — a second call is a harmless no-op.
export async function finishPartnership(supabase: SupabaseClient, partnershipId: string): Promise<void> {
  const { error } = await supabase
    .from('partnerships')
    .update({ finished_at: new Date().toISOString() })
    .eq('id', partnershipId)
    .is('finished_at', null)
  if (error) throw error
}

// End-of-ministry note to the Admin — skippable, so this is only ever called when a publisher
// actually writes something. Visible to the Admin only (see listPartnershipNotesForCongregation
// below); the Group Leader has no read path to this column anywhere in the app.
export async function submitPartnershipNote(supabase: SupabaseClient, partnershipId: string, note: string): Promise<void> {
  const { error } = await supabase
    .from('partnerships')
    .update({ admin_note: note, admin_note_at: new Date().toISOString() })
    .eq('id', partnershipId)
  if (error) throw error
}

export interface PartnershipNote {
  id: string
  name: string
  admin_note: string
  admin_note_at: string
  assignment_date: string
}

// Admin-only read of every submitted end-of-ministry note across all of this congregation's
// batches (not scoped to today) — a note from last week is still worth an admin seeing it.
export async function listPartnershipNotesForCongregation(supabase: SupabaseClient, congregationId: string): Promise<PartnershipNote[]> {
  const { data } = await supabase
    .from('partnerships')
    .select('id, name, admin_note, admin_note_at, batch:assignment_batches(assignment_date)')
    .eq('congregation_id', congregationId)
    .not('admin_note', 'is', null)
    .order('admin_note_at', { ascending: false })
  return ((data ?? []) as unknown as Array<{ id: string; name: string; admin_note: string; admin_note_at: string; batch: { assignment_date: string } | null }>).map(
    (row) => ({
      id: row.id,
      name: row.name,
      admin_note: row.admin_note,
      admin_note_at: row.admin_note_at,
      assignment_date: row.batch?.assignment_date ?? '',
    })
  )
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

// Passes an assigned record to a different partnership in the same batch — an UPDATE on the
// existing partnership_records row (preserving its id), not a delete+reinsert. Re-sequenced to
// the end of the destination's list and completed_at reset to null: only incomplete records are
// ever offered for a move (see the publisher UI), but this stays defensive either way, since the
// destination partnership hasn't actually visited it yet regardless of the source's state.
export async function movePartnershipRecord(
  supabase: SupabaseClient,
  sourcePartnershipId: string,
  destinationPartnershipId: string,
  recordId: string
): Promise<void> {
  const { data: lastRow } = await supabase
    .from('partnership_records')
    .select('sequence')
    .eq('partnership_id', destinationPartnershipId)
    .order('sequence', { ascending: false })
    .limit(1)
    .maybeSingle()
  const nextSequence = ((lastRow?.sequence as number | undefined) ?? 0) + 1

  const { error } = await supabase
    .from('partnership_records')
    .update({ partnership_id: destinationPartnershipId, sequence: nextSequence, completed_at: null })
    .eq('partnership_id', sourcePartnershipId)
    .eq('record_id', recordId)
  if (error) throw error
}
