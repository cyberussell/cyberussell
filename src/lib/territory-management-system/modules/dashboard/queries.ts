import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'

export interface DashboardStats {
  territoryCount: number
  sectionCount: number
  blockCount: number
  recordCount: number
  pendingRecordCount: number
  assignmentBatchCount: number
  visitsLoggedCount: number
}

export async function getDashboardStats(supabase: SupabaseClient, congregationId: string): Promise<DashboardStats> {
  const [territories, sections, blocks, records, pendingRecords, assignmentBatches, visits] = await Promise.all([
    supabase.from('territories').select('id', { count: 'exact', head: true }).eq('congregation_id', congregationId),
    supabase.from('territory_sections').select('id', { count: 'exact', head: true }).eq('congregation_id', congregationId),
    supabase.from('territory_blocks').select('id', { count: 'exact', head: true }).eq('congregation_id', congregationId),
    supabase.from('territory_records').select('id', { count: 'exact', head: true }).eq('congregation_id', congregationId),
    supabase
      .from('territory_records')
      .select('id', { count: 'exact', head: true })
      .eq('congregation_id', congregationId)
      .eq('status', 'pending'),
    supabase.from('assignment_batches').select('id', { count: 'exact', head: true }).eq('congregation_id', congregationId),
    supabase.from('territory_record_visits').select('id', { count: 'exact', head: true }).eq('congregation_id', congregationId),
  ])

  return {
    territoryCount: territories.count ?? 0,
    sectionCount: sections.count ?? 0,
    blockCount: blocks.count ?? 0,
    recordCount: records.count ?? 0,
    pendingRecordCount: pendingRecords.count ?? 0,
    assignmentBatchCount: assignmentBatches.count ?? 0,
    visitsLoggedCount: visits.count ?? 0,
  }
}
