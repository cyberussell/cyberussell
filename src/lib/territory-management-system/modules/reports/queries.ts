import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import { VISIT_RESULTS } from '../records/schema'
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
  partnerships: PartnershipWithProgress[]
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

// Backs both the Group Leader Dashboard (always today's batch) and, indirectly, the shape
// Reports reuses for a single-day rollup — the two features share this one metric definition
// rather than each inventing their own.
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

  const [resultCounts, newRecordsSubmitted] = await Promise.all([
    getVisitResultCounts(supabase, congregationId, territoryIds, rangeStart, rangeEnd),
    countNewPublisherRecords(supabase, congregationId, territoryIds, rangeStart, rangeEnd),
  ])

  return {
    totalRecords,
    completedRecords,
    remainingRecords: totalRecords - completedRecords,
    completionPct: totalRecords > 0 ? Math.round((completedRecords / totalRecords) * 100) : 0,
    resultCounts,
    newRecordsSubmitted,
    partnerships: batch.partnerships,
  }
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
