import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import { isDoNotCallLocked, VISIT_RESULTS } from '../records/schema'
import type { VisitResult } from '../records/types'
import { getBatchSummary } from '../assignment/queries'
import type { PartnershipWithProgress } from '../assignment/types'
import { endOfDayUtcExclusive, startOfDayUtc, type DateRange } from './date'

export interface ReportStats {
  totalRecords: number
  completedRecords: number
  remainingRecords: number
  completionPct: number
  resultCounts: Record<VisitResult, number>
  newRecordsSubmitted: number
}

export interface BatchStats extends ReportStats {
  activeBibleStudies: number
  partnerships: PartnershipWithProgress[]
  // Today's assigned territories, for the Home tab's "territories worked today" summary once
  // every partner is done, and the QR card's barangay-name heading before that.
  territories: { id: string; name: string; description: string }[]
}

function emptyResultCounts(): Record<VisitResult, number> {
  return Object.fromEntries(VISIT_RESULTS.map((r) => [r, 0])) as Record<VisitResult, number>
}

async function recordIdsForTerritories(supabase: SupabaseClient, congregationId: string, territoryIds: string[]): Promise<string[]> {
  const { data } = await supabase
    .from('territory_records')
    .select('id')
    .eq('congregation_id', congregationId)
    .in('territory_id', territoryIds)
  return (data ?? []).map((r) => r.id)
}

async function getVisitResultCounts(
  supabase: SupabaseClient,
  congregationId: string,
  territoryIds: string[] | null,
  rangeStart: string,
  rangeEnd: string
): Promise<Record<VisitResult, number>> {
  let query = supabase
    .from('territory_record_visits')
    .select('record_id, result, visited_at')
    .eq('congregation_id', congregationId)
    .gte('visited_at', rangeStart)
    .lt('visited_at', rangeEnd)
    .order('visited_at', { ascending: false })
  if (territoryIds) {
    const recordIds = await recordIdsForTerritories(supabase, congregationId, territoryIds)
    if (recordIds.length === 0) return emptyResultCounts()
    query = query.in('record_id', recordIds)
  }

  const { data } = await query
  const counts = emptyResultCounts()
  // A record can be visited more than once in the range (e.g. re-visited later the same day) —
  // only its most recent visit should count toward the breakdown, so one record never
  // contributes more than once. Rows are ordered newest-first, so the first time a given
  // record_id is seen here is already its latest result.
  const seenRecordIds = new Set<string>()
  for (const row of (data ?? []) as { record_id: string; result: VisitResult; visited_at: string }[]) {
    if (seenRecordIds.has(row.record_id)) continue
    seenRecordIds.add(row.record_id)
    counts[row.result] = (counts[row.result] ?? 0) + 1
  }
  return counts
}

async function countNewPublisherRecords(
  supabase: SupabaseClient,
  congregationId: string,
  territoryIds: string[] | null,
  rangeStart: string,
  rangeEnd: string
): Promise<number> {
  let query = supabase
    .from('territory_records')
    .select('id', { count: 'exact', head: true })
    .eq('congregation_id', congregationId)
    .eq('source', 'publisher')
    .gte('created_at', rangeStart)
    .lt('created_at', rangeEnd)
  if (territoryIds) query = query.in('territory_id', territoryIds)
  const { count } = await query
  return count ?? 0
}

// "Bible Studies in the Area" (Group Leader Dashboard tab only, confirmed with Russell): a
// record counts if its most recent visit ever — not just one logged today — is 'bible_study'.
// A study runs over weeks, so unlike getVisitResultCounts this deliberately has no date range;
// scoped to today's batch's territories (also confirmed), same as the tab's other stats.
async function countActiveBibleStudies(supabase: SupabaseClient, congregationId: string, territoryIds: string[]): Promise<number> {
  const recordIds = await recordIdsForTerritories(supabase, congregationId, territoryIds)
  if (recordIds.length === 0) return 0

  const { data } = await supabase
    .from('territory_record_visits')
    .select('record_id, result, visited_at')
    .eq('congregation_id', congregationId)
    .in('record_id', recordIds)
    .order('visited_at', { ascending: false })

  // Same "rows ordered newest-first, first time we see a record_id is its latest result"
  // de-dup pattern as getVisitResultCounts.
  const seenRecordIds = new Set<string>()
  let count = 0
  for (const row of (data ?? []) as { record_id: string; result: VisitResult }[]) {
    if (seenRecordIds.has(row.record_id)) continue
    seenRecordIds.add(row.record_id)
    if (row.result === 'bible_study') count++
  }
  return count
}

// The Group Leader Home tab's "completed today" breakdown, strictly scoped to THIS batch's own
// assigned records — not getVisitResultCounts' broader "any visit logged today anywhere in
// these territories," which double-counts whenever the same Group Leader also has a second
// batch (e.g. an overflow one) touching the same territory the same day, or a prior day's batch
// left a record whose territory overlaps. Two of the buckets below never come from an actual
// territory_record_visits row:
//  - 'undone': terminatePartnershipEarly (Group Leader force-end or a publisher's own Early Out)
//    deliberately never writes a visit row (see its own comment — a synthetic one used to
//    corrupt the rotation staleness signal) — so an assigned record still incomplete once its
//    partnership has ended_early_at is derived as undone here instead.
//  - 'do_not_call': a record still inside its 6-month lock (see isDoNotCallLocked) can't have
//    had a visit logged against it at all today, structurally — it still belongs in the
//    breakdown as do_not_call rather than silently vanishing from the totals.
// A record with neither an actual visit, an ended-early partnership, nor an active lock simply
// isn't counted in any bucket — it's still in progress, which the separate remainingRecords
// stat already covers.
async function getBatchVisitResultCounts(
  supabase: SupabaseClient,
  congregationId: string,
  batchId: string,
  rangeStart: string,
  rangeEnd: string
): Promise<Record<VisitResult, number>> {
  const counts = emptyResultCounts()

  const { data: partnerships } = await supabase.from('partnerships').select('id, ended_early_at').eq('batch_id', batchId)
  const endedEarlyByPartnership = new Map(
    ((partnerships ?? []) as { id: string; ended_early_at: string | null }[]).map((p) => [p.id, Boolean(p.ended_early_at)])
  )
  const partnershipIds = [...endedEarlyByPartnership.keys()]
  if (partnershipIds.length === 0) return counts

  const { data: assigned } = await supabase.from('partnership_records').select('partnership_id, record_id').in('partnership_id', partnershipIds)
  const assignedRows = (assigned ?? []) as { partnership_id: string; record_id: string }[]
  if (assignedRows.length === 0) return counts

  const recordIds = assignedRows.map((r) => r.record_id)

  const [{ data: visits }, { data: records }] = await Promise.all([
    supabase
      .from('territory_record_visits')
      .select('record_id, result, visited_at')
      .eq('congregation_id', congregationId)
      .in('record_id', recordIds)
      .gte('visited_at', rangeStart)
      .lt('visited_at', rangeEnd)
      .order('visited_at', { ascending: false }),
    supabase.from('territory_records').select('id, do_not_call, do_not_call_at').in('id', recordIds),
  ])

  // Same "rows ordered newest-first, first time we see a record_id is its latest result"
  // de-dup pattern as getVisitResultCounts.
  const latestResultByRecord = new Map<string, VisitResult>()
  for (const row of (visits ?? []) as { record_id: string; result: VisitResult }[]) {
    if (!latestResultByRecord.has(row.record_id)) latestResultByRecord.set(row.record_id, row.result)
  }
  const lockedByRecord = new Map(
    ((records ?? []) as { id: string; do_not_call: boolean; do_not_call_at: string | null }[]).map((r) => [
      r.id,
      isDoNotCallLocked(r.do_not_call, r.do_not_call_at),
    ])
  )

  for (const row of assignedRows) {
    const visited = latestResultByRecord.get(row.record_id)
    if (visited) {
      counts[visited] = (counts[visited] ?? 0) + 1
    } else if (lockedByRecord.get(row.record_id)) {
      counts.do_not_call += 1
    } else if (endedEarlyByPartnership.get(row.partnership_id)) {
      counts.undone += 1
    }
  }

  return counts
}

// Backs the Group Leader Dashboard (always today's own batch) — Reports (getReportStats below)
// deliberately computes its own congregation-wide, multi-day rollup instead of reusing this,
// since it's a broader admin tool where "every visit in range" is the right scope, not "just
// this one batch."
export async function getBatchStats(
  supabase: SupabaseClient,
  congregationId: string,
  batchId: string,
  timezone: string
): Promise<BatchStats | null> {
  const batch = await getBatchSummary(supabase, congregationId, batchId)
  if (!batch) return null

  const totalRecords = batch.partnerships.reduce((sum, p) => sum + p.recordCount, 0)
  const completedRecords = batch.partnerships.reduce((sum, p) => sum + p.completedCount, 0)
  const territoryIds = batch.territories.map((t) => t.id)
  const rangeStart = startOfDayUtc(batch.assignment_date, timezone)
  const rangeEnd = endOfDayUtcExclusive(batch.assignment_date, timezone)

  const [resultCounts, newRecordsSubmitted, activeBibleStudies] = await Promise.all([
    getBatchVisitResultCounts(supabase, congregationId, batchId, rangeStart, rangeEnd),
    countNewPublisherRecords(supabase, congregationId, territoryIds, rangeStart, rangeEnd),
    countActiveBibleStudies(supabase, congregationId, territoryIds),
  ])

  return {
    totalRecords,
    completedRecords,
    remainingRecords: totalRecords - completedRecords,
    completionPct: totalRecords > 0 ? Math.round((completedRecords / totalRecords) * 100) : 0,
    resultCounts,
    newRecordsSubmitted,
    activeBibleStudies,
    partnerships: batch.partnerships,
    territories: batch.territories,
  }
}

export interface TerritoryReportRow {
  id: string
  name: string
  barangayName: string
  startedBibleStudy: number
  bibleStudy: number
  totalHouseholds: number
  totalRecords: number
}

// Per-territory snapshot for the admin Reports table (confirmed with Russell via 3 scope
// questions before building): Started Bible Study / Bible Study reflect each record's current
// (most-recent-ever) visit result — no date range — same "active" definition
// countActiveBibleStudies already uses for the Group Leader Dashboard's single stat, just broken
// out per-territory and split into the two distinct results instead of one. Total Households
// sums household_members only for approved records; Total Records counts every record
// regardless of status, matching territory/queries.ts's existing record_count meaning. Sorted by
// Total Households descending, per Russell's request.
export async function getTerritoryReportRows(supabase: SupabaseClient, congregationId: string): Promise<TerritoryReportRow[]> {
  const { data: territories } = await supabase
    .from('territories')
    .select('id, name, description')
    .eq('congregation_id', congregationId)
  if (!territories || territories.length === 0) return []

  const { data: records } = await supabase
    .from('territory_records')
    .select('id, territory_id, status, household_members')
    .eq('congregation_id', congregationId)

  const recordTerritoryById = new Map<string, string>()
  const totals = new Map<string, { totalHouseholds: number; totalRecords: number }>()
  for (const t of territories) totals.set(t.id, { totalHouseholds: 0, totalRecords: 0 })
  for (const r of (records ?? []) as { id: string; territory_id: string; status: string; household_members: number | null }[]) {
    recordTerritoryById.set(r.id, r.territory_id)
    const bucket = totals.get(r.territory_id)
    if (!bucket) continue
    bucket.totalRecords += 1
    if (r.status === 'approved') bucket.totalHouseholds += r.household_members ?? 0
  }

  const bibleStudyCounts = new Map<string, { startedBibleStudy: number; bibleStudy: number }>()
  for (const t of territories) bibleStudyCounts.set(t.id, { startedBibleStudy: 0, bibleStudy: 0 })

  const recordIds = [...recordTerritoryById.keys()]
  if (recordIds.length > 0) {
    const { data: visits } = await supabase
      .from('territory_record_visits')
      .select('record_id, result, visited_at')
      .eq('congregation_id', congregationId)
      .in('record_id', recordIds)
      .order('visited_at', { ascending: false })

    // Same "rows ordered newest-first, first time we see a record_id is its latest result"
    // de-dup pattern as getVisitResultCounts/countActiveBibleStudies.
    const seenRecordIds = new Set<string>()
    for (const row of (visits ?? []) as { record_id: string; result: VisitResult }[]) {
      if (seenRecordIds.has(row.record_id)) continue
      seenRecordIds.add(row.record_id)
      if (row.result !== 'started_bible_study' && row.result !== 'bible_study') continue
      const territoryId = recordTerritoryById.get(row.record_id)
      const bucket = territoryId ? bibleStudyCounts.get(territoryId) : undefined
      if (!bucket) continue
      if (row.result === 'started_bible_study') bucket.startedBibleStudy += 1
      else bucket.bibleStudy += 1
    }
  }

  return territories
    .map((t) => ({
      id: t.id as string,
      name: t.name as string,
      barangayName: (t.description as string) || '—',
      startedBibleStudy: bibleStudyCounts.get(t.id)?.startedBibleStudy ?? 0,
      bibleStudy: bibleStudyCounts.get(t.id)?.bibleStudy ?? 0,
      totalHouseholds: totals.get(t.id)?.totalHouseholds ?? 0,
      totalRecords: totals.get(t.id)?.totalRecords ?? 0,
    }))
    .sort((a, b) => b.totalHouseholds - a.totalHouseholds)
}

export interface RecordLocation {
  id: string
  address: string
  residentName: string
  plusCode: string
  territoryName: string
}

// Pin data for the Reports page's household distribution map — only approved records (same
// population as getTerritoryReportRows' Total Households) with a real Plus Code set (legacy/
// CSV-imported records can have a null one, see plus_code's nullable column). Decoding each
// Plus Code into a lat/lng happens client-side in HouseholdDistributionMap via the
// open-location-code package already used by lib/plusCode.ts — no geocoding API call needed.
// residentName backs the popup's fallback label (address, then name, then Plus Code) for a
// record with no address on file.
export async function getApprovedRecordLocations(supabase: SupabaseClient, congregationId: string): Promise<RecordLocation[]> {
  const { data } = await supabase
    .from('territory_records')
    .select('id, address, resident_name, plus_code, territory:territories(name)')
    .eq('congregation_id', congregationId)
    .eq('status', 'approved')
    .not('plus_code', 'is', null)

  return (
    (data ?? []) as unknown as {
      id: string
      address: string
      resident_name: string
      plus_code: string | null
      territory: { name: string }[] | null
    }[]
  )
    .filter((r): r is typeof r & { plus_code: string } => Boolean(r.plus_code))
    .map((r) => ({
      id: r.id,
      address: r.address,
      residentName: r.resident_name,
      plusCode: r.plus_code,
      territoryName: r.territory?.[0]?.name ?? '',
    }))
}

// Congregation-wide rollup across every batch whose assignment_date falls in the range —
// the Daily/Weekly/Monthly Reports view.
export async function getReportStats(
  supabase: SupabaseClient,
  congregationId: string,
  range: DateRange,
  timezone: string
): Promise<ReportStats> {
  const rangeStart = startOfDayUtc(range.start, timezone)
  const rangeEnd = endOfDayUtcExclusive(range.end, timezone)

  const { data: batches } = await supabase
    .from('assignment_batches')
    .select('id')
    .eq('congregation_id', congregationId)
    .gte('assignment_date', range.start)
    .lte('assignment_date', range.end)
  const batchIds = (batches ?? []).map((b) => b.id)

  let totalRecords = 0
  let completedRecords = 0
  if (batchIds.length > 0) {
    const { data: partnerships } = await supabase.from('partnerships').select('id').in('batch_id', batchIds)
    const partnershipIds = (partnerships ?? []).map((p) => p.id)
    if (partnershipIds.length > 0) {
      const { data: partnershipRecords } = await supabase
        .from('partnership_records')
        .select('completed_at')
        .in('partnership_id', partnershipIds)
      totalRecords = partnershipRecords?.length ?? 0
      completedRecords = (partnershipRecords ?? []).filter((r) => r.completed_at !== null).length
    }
  }

  const [resultCounts, newRecordsSubmitted] = await Promise.all([
    getVisitResultCounts(supabase, congregationId, null, rangeStart, rangeEnd),
    countNewPublisherRecords(supabase, congregationId, null, rangeStart, rangeEnd),
  ])

  return {
    totalRecords,
    completedRecords,
    remainingRecords: totalRecords - completedRecords,
    completionPct: totalRecords > 0 ? Math.round((completedRecords / totalRecords) * 100) : 0,
    resultCounts,
    newRecordsSubmitted,
  }
}
