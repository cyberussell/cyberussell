import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { RecordStatus, RecordVisitWithAuthor, TerritoryRecord, TerritoryRecordWithLocation } from './types'

// The !section_id/!block_id hints are required, not cosmetic: migration 030 added a second FK
// from territory_records to each of territory_sections/territory_blocks (the
// correction_recommended_* columns below), so an unqualified `territory_sections(...)`/
// `territory_blocks(...)` embed is ambiguous to PostgREST and the whole query silently returns
// zero rows instead of erroring — every embed of these two tables needs a hint, not just the
// newer correction_* ones.
const RECORD_WITH_LOCATION_SELECT =
  '*, territory:territories(id, name), section:territory_sections!section_id(id, label), block:territory_blocks!block_id(id, label), ' +
  'correction_section:territory_sections!correction_recommended_section_id(id, label), ' +
  'correction_block:territory_blocks!correction_recommended_block_id(id, label)'

export async function listRecords(
  supabase: SupabaseClient,
  congregationId: string,
  territoryId?: string
): Promise<TerritoryRecordWithLocation[]> {
  let query = supabase
    .from('territory_records')
    .select(RECORD_WITH_LOCATION_SELECT)
    .eq('congregation_id', congregationId)
    .order('created_at', { ascending: false })
  if (territoryId) query = query.eq('territory_id', territoryId)
  const { data } = await query
  return (data ?? []) as unknown as TerritoryRecordWithLocation[]
}

// Every record currently in a given set of blocks — used by an overflow batch's optional search
// scope (see 025_overflow_search_scope.sql) to show a publisher whatever already exists in the
// area they're about to canvass, read-only, so they don't create a duplicate for a household
// someone already logged. Deliberately unfiltered by status (a still-'pending' record is just as
// real a duplicate risk as an 'approved' one).
export async function getRecordsInBlocks(supabase: SupabaseClient, congregationId: string, blockIds: string[]): Promise<TerritoryRecordWithLocation[]> {
  if (blockIds.length === 0) return []
  const { data } = await supabase
    .from('territory_records')
    .select(RECORD_WITH_LOCATION_SELECT)
    .eq('congregation_id', congregationId)
    .in('block_id', blockIds)
    .order('created_at', { ascending: false })
  return (data ?? []) as unknown as TerritoryRecordWithLocation[]
}

export async function getRecordById(
  supabase: SupabaseClient,
  congregationId: string,
  recordId: string
): Promise<TerritoryRecordWithLocation | null> {
  const { data } = await supabase
    .from('territory_records')
    .select(RECORD_WITH_LOCATION_SELECT)
    .eq('congregation_id', congregationId)
    .eq('id', recordId)
    .maybeSingle()
  return (data as unknown as TerritoryRecordWithLocation) ?? null
}

export async function createRecord(
  supabase: SupabaseClient,
  congregationId: string,
  input: {
    // Set by addPublisherRecordAction to the same id it optimistically rendered client-side
    // the moment the publisher submitted — lets the offline-first UI show (and immediately
    // allow editing/deleting) a just-added record before the write has even synced, since the
    // id is already known and stable. Admin/CSV-import paths omit this and get the column's
    // normal gen_random_uuid() default.
    id?: string
    territoryId: string
    sectionId: string
    blockId: string
    address: string
    unit: string
    residentName: string
    plusCode: string
    householdMembers?: number
    notes: string
    doNotCall: boolean
    status?: RecordStatus
    source?: TerritoryRecord['source']
    createdByPartnershipId?: string
  }
): Promise<TerritoryRecord> {
  const { data, error } = await supabase
    .from('territory_records')
    .insert({
      ...(input.id ? { id: input.id } : {}),
      congregation_id: congregationId,
      territory_id: input.territoryId,
      section_id: input.sectionId,
      block_id: input.blockId,
      address: input.address,
      unit: input.unit,
      resident_name: input.residentName,
      plus_code: input.plusCode || null,
      household_members: input.householdMembers ?? null,
      notes: input.notes,
      do_not_call: input.doNotCall,
      status: input.status ?? 'approved',
      source: input.source ?? 'manual',
      created_by_partnership_id: input.createdByPartnershipId ?? null,
    })
    .select('*')
    .single()
  if (error) throw error
  return data as TerritoryRecord
}

export async function updateRecord(
  supabase: SupabaseClient,
  recordId: string,
  updates: {
    // Only set by the publisher's own "edit a record I added" path — every other caller
    // (admin edit, "Mark as Moved" → Update Contact Record) leaves the record's location alone.
    territoryId?: string
    sectionId?: string
    blockId?: string
    address: string
    unit: string
    residentName: string
    plusCode: string
    householdMembers?: number
    notes: string
    doNotCall: boolean
  }
): Promise<void> {
  const { error } = await supabase
    .from('territory_records')
    .update({
      ...(updates.territoryId ? { territory_id: updates.territoryId } : {}),
      ...(updates.sectionId ? { section_id: updates.sectionId } : {}),
      ...(updates.blockId ? { block_id: updates.blockId } : {}),
      address: updates.address,
      unit: updates.unit,
      resident_name: updates.residentName,
      plus_code: updates.plusCode || null,
      household_members: updates.householdMembers ?? null,
      notes: updates.notes,
      do_not_call: updates.doNotCall,
      updated_at: new Date().toISOString(),
    })
    .eq('id', recordId)
  if (error) throw error
}

export async function deleteRecord(supabase: SupabaseClient, recordId: string): Promise<void> {
  const { error } = await supabase.from('territory_records').delete().eq('id', recordId)
  if (error) throw error
}

// The publisher's own "My Added Records" list — records this specific partnership added via
// the workspace's Add form, regardless of their (still Admin-controlled) pending/approved
// status. Deliberately not scoped through partnership_records — these records are never
// linked there (see addPublisherRecordAction).
export async function listRecordsAddedByPartnership(
  supabase: SupabaseClient,
  partnershipId: string
): Promise<TerritoryRecordWithLocation[]> {
  const { data } = await supabase
    .from('territory_records')
    .select(RECORD_WITH_LOCATION_SELECT)
    .eq('created_by_partnership_id', partnershipId)
    .order('created_at', { ascending: false })
  return (data ?? []) as unknown as TerritoryRecordWithLocation[]
}

// Guard used before the publisher-facing edit/delete-added-record actions — the concrete
// enforcement of "a publisher may only edit/delete records they personally added," mirroring
// partnershipHasRecord's role for assigned records. source='publisher' is belt-and-suspenders:
// created_by_partnership_id is never set on any other source.
export async function recordAddedByPartnership(supabase: SupabaseClient, partnershipId: string, recordId: string): Promise<boolean> {
  const { data } = await supabase
    .from('territory_records')
    .select('id')
    .eq('id', recordId)
    .eq('created_by_partnership_id', partnershipId)
    .eq('source', 'publisher')
    .maybeSingle()
  return !!data
}

export async function setRecordStatus(supabase: SupabaseClient, recordId: string, status: RecordStatus): Promise<void> {
  const { error } = await supabase.from('territory_records').update({ status }).eq('id', recordId)
  if (error) throw error
}

// Publisher-facing "Mark as Moved" → "Recommend for Admin Removal" path — the reason is
// required at the schema level (assignment/schema.ts), never optional.
export async function recommendRecordForRemoval(
  supabase: SupabaseClient,
  recordId: string,
  reason: string,
  recommendedBy: string
): Promise<void> {
  const { error } = await supabase
    .from('territory_records')
    .update({ removal_recommended_at: new Date().toISOString(), removal_recommended_reason: reason, removal_recommended_by: recommendedBy })
    .eq('id', recordId)
  if (error) throw error
}

// Admin dismisses a removal recommendation without deleting the record (e.g. it turned out to
// be a mistake) — clears the flag so it drops off the Flagged for Removal list.
export async function dismissRemovalRecommendation(supabase: SupabaseClient, recordId: string): Promise<void> {
  const { error } = await supabase
    .from('territory_records')
    .update({ removal_recommended_at: null, removal_recommended_reason: null, removal_recommended_by: null })
    .eq('id', recordId)
  if (error) throw error
}

export async function listFlaggedForRemoval(supabase: SupabaseClient, congregationId: string): Promise<TerritoryRecordWithLocation[]> {
  const { data } = await supabase
    .from('territory_records')
    .select(RECORD_WITH_LOCATION_SELECT)
    .eq('congregation_id', congregationId)
    .not('removal_recommended_at', 'is', null)
    .order('removal_recommended_at', { ascending: false })
  return (data ?? []) as unknown as TerritoryRecordWithLocation[]
}

// Publisher-facing "Update" path — recommends a corrected Plus Code (the most common wrong-data
// case) plus a reason, without editing the record directly. Overwrites any prior
// recommendation on this record rather than accumulating a history — same "latest wins" shape
// as recommendRecordForRemoval above.
// Confirms a publisher-submitted Section/Block correction actually belongs to the record's own
// territory before it's ever written — never trust a client-supplied parent id outright, same
// rule this codebase applies everywhere else a client picks from a constrained list (e.g.
// createAssignment's territory check, lockPartnershipSearchBlocks' block check). Two plain
// queries rather than a nested embed — territory_records/territory_sections/territory_blocks
// each only have one relevant FK path here, but a nested embed was exactly what broke silently
// elsewhere in this product once a table gained a second FK, so this stays deliberately simple.
export async function sectionBlockBelongsToTerritory(
  supabase: SupabaseClient,
  territoryId: string,
  sectionId: string,
  blockId: string
): Promise<boolean> {
  const { data: section } = await supabase
    .from('territory_sections')
    .select('id')
    .eq('id', sectionId)
    .eq('territory_id', territoryId)
    .maybeSingle()
  if (!section) return false
  const { data: block } = await supabase.from('territory_blocks').select('id').eq('id', blockId).eq('section_id', sectionId).maybeSingle()
  return !!block
}

export async function recommendRecordCorrection(
  supabase: SupabaseClient,
  recordId: string,
  plusCode: string,
  reason: string,
  recommendedBy: string,
  sectionId: string,
  blockId: string,
  // Optional — see 031_correction_household_members.sql. undefined means "not recommending a
  // change to this field," left out of the update entirely rather than written as null, so a
  // second correction that only touches the Plus Code can't accidentally wipe out a still-open
  // household-members recommendation from create time (this function always fires on submit,
  // there's only ever one recommendation in flight per record at a time, so this mostly guards
  // against a caller forgetting to pass it rather than a real concurrent-edit scenario).
  householdMembers?: number
): Promise<void> {
  const { error } = await supabase
    .from('territory_records')
    .update({
      correction_recommended_at: new Date().toISOString(),
      correction_recommended_plus_code: plusCode,
      correction_recommended_reason: reason,
      correction_recommended_by: recommendedBy,
      correction_recommended_section_id: sectionId,
      correction_recommended_block_id: blockId,
      correction_recommended_household_members: householdMembers ?? null,
    })
    .eq('id', recordId)
  if (error) throw error
}

// Admin dismisses a correction recommendation without applying it (e.g. it turned out to be
// wrong) — clears the flag, leaves the record's own plus_code untouched.
export async function dismissCorrectionRecommendation(supabase: SupabaseClient, recordId: string): Promise<void> {
  const { error } = await supabase
    .from('territory_records')
    .update({
      correction_recommended_at: null,
      correction_recommended_plus_code: null,
      correction_recommended_reason: null,
      correction_recommended_by: null,
      correction_recommended_section_id: null,
      correction_recommended_block_id: null,
      correction_recommended_household_members: null,
    })
    .eq('id', recordId)
  if (error) throw error
}

// Admin applies a correction recommendation — writes the recommended Plus Code/Section/Block/
// Household Members onto the record's real columns and clears the recommendation flag in the
// same update. Reads the recommended values first since Supabase's update() can't copy one
// column's value into another server-side without a raw SQL/RPC call.
export async function applyRecordCorrection(supabase: SupabaseClient, recordId: string): Promise<void> {
  const { data: existing } = await supabase
    .from('territory_records')
    .select('correction_recommended_plus_code, correction_recommended_section_id, correction_recommended_block_id, correction_recommended_household_members')
    .eq('id', recordId)
    .maybeSingle()
  if (
    !existing?.correction_recommended_plus_code &&
    !existing?.correction_recommended_section_id &&
    !existing?.correction_recommended_block_id &&
    existing?.correction_recommended_household_members == null
  ) {
    return
  }
  const update: Record<string, unknown> = {
    correction_recommended_at: null,
    correction_recommended_plus_code: null,
    correction_recommended_reason: null,
    correction_recommended_by: null,
    correction_recommended_section_id: null,
    correction_recommended_block_id: null,
    correction_recommended_household_members: null,
    updated_at: new Date().toISOString(),
  }
  if (existing.correction_recommended_plus_code) update.plus_code = existing.correction_recommended_plus_code
  if (existing.correction_recommended_section_id) update.section_id = existing.correction_recommended_section_id
  if (existing.correction_recommended_block_id) update.block_id = existing.correction_recommended_block_id
  if (existing.correction_recommended_household_members != null) update.household_members = existing.correction_recommended_household_members
  const { error } = await supabase.from('territory_records').update(update).eq('id', recordId)
  if (error) throw error
}

export async function listFlaggedForCorrection(supabase: SupabaseClient, congregationId: string): Promise<TerritoryRecordWithLocation[]> {
  const { data } = await supabase
    .from('territory_records')
    .select(RECORD_WITH_LOCATION_SELECT)
    .eq('congregation_id', congregationId)
    .not('correction_recommended_at', 'is', null)
    .order('correction_recommended_at', { ascending: false })
  return (data ?? []) as unknown as TerritoryRecordWithLocation[]
}

// Admin-only "Undo Last Visit" — deletes the single most recent visit entry so the record
// reverts to whatever its status was before (e.g. a mis-tagged Bible Study). Since logVisit
// keeps only one row per calendar day (same-day edits overwrite in place), the latest row by
// visited_at is always exactly "the last thing logged," so a plain delete is safe here — no
// risk of leaving a same-day duplicate behind.
export async function deleteLatestVisit(supabase: SupabaseClient, recordId: string): Promise<void> {
  const { data: latest } = await supabase
    .from('territory_record_visits')
    .select('id')
    .eq('record_id', recordId)
    .order('visited_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (!latest) return
  const { error } = await supabase.from('territory_record_visits').delete().eq('id', (latest as { id: string }).id)
  if (error) throw error
}

// Admin corrects the result/notes a publisher actually submitted, in place — distinct from
// deleteLatestVisit (removes it outright) and from just logging a fresh visit today (only
// collapses into the existing row if it's the same calendar day; an older mistaken entry needs
// fixing in place instead). visited_at/created_by/partner_name are left untouched so the visit
// still reads as "submitted by X on Y," just with corrected result/notes and a new
// overridden_by_admin_at marker (migration 029) for Visit History to show "Overridden by admin."
// Deliberately does NOT touch the record's own do_not_call flag even if the new result is/was
// 'do_not_call' — that's a separate, explicit toggle on RecordEditForm with its own 6-month-lock
// trigger; auto-flipping it here as a side effect of a notes/status correction would be a
// surprising, easy-to-miss consequence.
export async function overrideLatestVisit(supabase: SupabaseClient, recordId: string, result: string, notes: string): Promise<void> {
  const { data: latest } = await supabase
    .from('territory_record_visits')
    .select('id')
    .eq('record_id', recordId)
    .order('visited_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (!latest) throw new Error('No visit to override.')
  const { error } = await supabase
    .from('territory_record_visits')
    .update({ result, notes, overridden_by_admin_at: new Date().toISOString() })
    .eq('id', (latest as { id: string }).id)
  if (error) throw error
}

interface ImportRow {
  territoryId: string
  sectionId: string
  blockId: string
  address: string
  unit: string
  residentName: string
  plusCode: string
  householdMembers: number | null
  notes: string
  doNotCall: boolean
}

// CSV-imported rows land as 'pending' so the admin reviews them before they count as live
// territory data — matches the same 'pending' state a future publisher-facing submission
// flow can also feed without a schema change. territoryId lives per-row (not a shared param)
// since the cross-territory import resolves a different territory for each row from its own
// Territory Name column; the per-territory import just sets the same id on every row.
export async function importRecords(supabase: SupabaseClient, congregationId: string, rows: ImportRow[]): Promise<number> {
  if (rows.length === 0) return 0
  const { error } = await supabase.from('territory_records').insert(
    rows.map((r) => ({
      congregation_id: congregationId,
      territory_id: r.territoryId,
      section_id: r.sectionId,
      block_id: r.blockId,
      address: r.address,
      unit: r.unit,
      resident_name: r.residentName,
      plus_code: r.plusCode || null,
      household_members: r.householdMembers,
      notes: r.notes,
      do_not_call: r.doNotCall,
      status: 'pending',
      source: 'csv_import',
    }))
  )
  if (error) throw error
  return rows.length
}

// Cheap variant of listVisits for callers that only need the most recent result (e.g. to
// re-derive getSelectableResults() server-side) — no need to pull full history + the
// profiles join for that.
export async function getLatestVisitResult(supabase: SupabaseClient, recordId: string): Promise<string | null> {
  const { data } = await supabase
    .from('territory_record_visits')
    .select('result')
    .eq('record_id', recordId)
    .order('visited_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  return (data as { result: string } | null)?.result ?? null
}

// Cheap do_not_call(+timestamp)-only read — same rationale as getLatestVisitResult, used to
// re-derive getSelectableResults() server-side without pulling the full record + location
// joins. doNotCallAt only matters to the publisher-facing 6-month lock (see
// logPublisherVisitAction) — the Admin's own logVisitAction still calls getSelectableResults
// with just the doNotCall flag, which never locks on its own.
export async function getRecordDoNotCall(
  supabase: SupabaseClient,
  recordId: string
): Promise<{ doNotCall: boolean; doNotCallAt: string | null }> {
  const { data } = await supabase.from('territory_records').select('do_not_call, do_not_call_at').eq('id', recordId).maybeSingle()
  const row = data as { do_not_call: boolean; do_not_call_at: string | null } | null
  return { doNotCall: row?.do_not_call ?? false, doNotCallAt: row?.do_not_call_at ?? null }
}

export async function listVisits(supabase: SupabaseClient, recordId: string): Promise<RecordVisitWithAuthor[]> {
  const { data } = await supabase
    .from('territory_record_visits')
    .select('*, creator:profiles(full_name)')
    .eq('record_id', recordId)
    .order('visited_at', { ascending: false })
  return ((data ?? []) as unknown as Array<Record<string, unknown> & { creator: { full_name: string } | null }>).map(
    (v) => ({ ...(v as unknown as RecordVisitWithAuthor), created_by_name: v.creator?.full_name ?? null })
  )
}

// Logging a 'do_not_call' result also flips the record's own flag — one action instead of
// the admin/publisher having to separately toggle it after the fact.
//
// Only one logged visit per record per calendar day is kept — logging a second visit for the
// same record on the same day overwrites that day's row (matched by a UTC day-boundary range on
// visited_at) instead of inserting a second history entry, so there's never more than one
// update per day in the history.
export async function logVisit(
  supabase: SupabaseClient,
  congregationId: string,
  input: { recordId: string; visitedAt: string; result: string; notes: string; createdBy: string | null; partnerName: string | null }
): Promise<void> {
  const visitedDate = new Date(input.visitedAt)
  const dayStart = new Date(Date.UTC(visitedDate.getUTCFullYear(), visitedDate.getUTCMonth(), visitedDate.getUTCDate()))
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)

  const { data: sameDayVisit } = await supabase
    .from('territory_record_visits')
    .select('id')
    .eq('record_id', input.recordId)
    .gte('visited_at', dayStart.toISOString())
    .lt('visited_at', dayEnd.toISOString())
    .order('visited_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  const row = {
    congregation_id: congregationId,
    record_id: input.recordId,
    visited_at: input.visitedAt,
    result: input.result,
    notes: input.notes,
    created_by: input.createdBy,
    partner_name: input.partnerName,
  }

  const { error } = sameDayVisit
    ? await supabase.from('territory_record_visits').update(row).eq('id', sameDayVisit.id)
    : await supabase.from('territory_record_visits').insert(row)
  if (error) throw error

  if (input.result === 'do_not_call') {
    const { error: flagError } = await supabase
      .from('territory_records')
      .update({ do_not_call: true })
      .eq('id', input.recordId)
    if (flagError) throw flagError
  }

  // Retention: hard-delete visit history older than 6 months. Run opportunistically on every
  // write rather than needing a separate scheduled job — best-effort, so a failure here doesn't
  // undo the visit that was just successfully saved above.
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setUTCMonth(sixMonthsAgo.getUTCMonth() - 6)
  await supabase.from('territory_record_visits').delete().eq('congregation_id', congregationId).lt('visited_at', sixMonthsAgo.toISOString())
}
