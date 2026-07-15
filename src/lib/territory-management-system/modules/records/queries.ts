import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { RecordStatus, RecordVisitWithAuthor, TerritoryRecord, TerritoryRecordWithLocation } from './types'

const RECORD_WITH_LOCATION_SELECT =
  '*, territory:territories(id, name), section:territory_sections(id, label), block:territory_blocks(id, label)'

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
  }
): Promise<TerritoryRecord> {
  const { data, error } = await supabase
    .from('territory_records')
    .insert({
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

export async function setRecordStatus(supabase: SupabaseClient, recordId: string, status: RecordStatus): Promise<void> {
  const { error } = await supabase.from('territory_records').update({ status }).eq('id', recordId)
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
