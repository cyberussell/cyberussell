import type { RecordVisitWithAuthor, TerritoryRecord } from '../records/types'

export interface AssignmentBatch {
  id: string
  congregation_id: string
  assignment_date: string
  requested_partnership_count: number
  access_token: string
  // Nullable — batches created before 013_group_leader_assignment_ownership.sql have no
  // creator on record. Every batch created going forward always sets this.
  created_by: string | null
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
  ended_early_at: string | null
  // Set when the publisher reaches Sync & Finish (Skip or Send on the note screen) — the
  // "we're genuinely done" signal that doesn't depend on record math, so it also covers a
  // zero-record ("searching a fresh territory") partnership, which would otherwise look done
  // the instant it's created. Distinct from ended_early_at (which specifically means unfinished
  // records got marked undone) — a normally-finished session sets this without that.
  finished_at: string | null
  created_at: string
}

export interface PartnershipWithProgress extends Partnership {
  recordCount: number
  completedCount: number
}

export interface BatchSummary extends AssignmentBatch {
  territories: { id: string; name: string }[]
  partnerships: PartnershipWithProgress[]
  // True once assignment_date is before today in the congregation's timezone — the public
  // landing/progress pages render an "ended" state instead of the live view when this is set.
  expired: boolean
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
  congregationName: string
  records: PartnershipRecordDetail[]
  territories: { id: string; name: string; map_image_url: string | null }[]
  // Same meaning as BatchSummary.expired — checked again server-side before every
  // publisher-facing write (rename/log visit/add record), not just used for display.
  expired: boolean
  // Other partnerships in the same batch a record can be moved/passed to — excludes this
  // partnership itself and any that already ended their ministry early.
  siblingPartnerships: { id: string; name: string }[]
}
