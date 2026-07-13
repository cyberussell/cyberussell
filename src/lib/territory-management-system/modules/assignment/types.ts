import type { RecordVisitWithAuthor, TerritoryRecord } from '../records/types'

export interface AssignmentBatch {
  id: string
  congregation_id: string
  assignment_date: string
  requested_partnership_count: number
  access_token: string
  created_at: string
}

export interface Partnership {
  id: string
  congregation_id: string
  batch_id: string
  sequence: number
  name: string
  claim_token: string
  claimed_at: string | null
  created_at: string
}

export interface PartnershipWithProgress extends Partnership {
  recordCount: number
  completedCount: number
}

export interface BatchSummary extends AssignmentBatch {
  territories: { id: string; name: string }[]
  partnerships: PartnershipWithProgress[]
}

export interface PartnershipRecordDetail {
  id: string
  sequence: number
  completed_at: string | null
  record: TerritoryRecord & {
    territory: { id: string; name: string; map_image_url: string | null } | null
    section: { id: string; label: string } | null
    block: { id: string; label: string } | null
  }
  // Fetched up front (not on-demand) so the fully client-side offline workspace never needs
  // a network round-trip just to open a record's visit history.
  visits: RecordVisitWithAuthor[]
}

export interface PartnershipWorkspace extends Partnership {
  batch: AssignmentBatch
  records: PartnershipRecordDetail[]
  territories: { id: string; name: string; map_image_url: string | null }[]
}
