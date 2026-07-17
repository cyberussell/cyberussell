import type { RecordVisitWithAuthor, TerritoryRecord, TerritoryRecordWithLocation } from '../records/types'

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
  // True for a batch created via createOverflowAssignmentAction (see
  // 024_batch_is_overflow.sql) — every partnership always starts with zero records. Lets the
  // Group Leader dashboard's batch switcher label it "Overflow" rather than "Assignment"
  // without guessing from array position, which breaks once the original batch is deleted.
  is_overflow: boolean
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
  // Set when this record was handed to the current partnership via "Pass to Another Partner"
  // (see movePartnershipRecord/022_partnership_pass_tracking.sql) — the source partnership's
  // name at the moment of the move, not a live reference (so it still reads correctly even if
  // that partnership is later renamed). Null for a record that's never been passed.
  passed_from_name: string | null
  passed_from_at: string | null
  record: TerritoryRecord & {
    territory: { id: string; name: string; description: string; map_image_url: string | null } | null
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
  // Every other Ministry Partner working under the same Group Leader today (original
  // assignment + any overflow batches, see getGroupLeaderPartnershipsForDate) a record can be
  // moved/passed to — excludes this partnership itself and any that already ended their
  // ministry early. batchLabel ("Assignment"/"Overflow"/"Overflow 2"...) disambiguates which
  // batch each sibling belongs to, since this can now span more than one.
  siblingPartnerships: { id: string; name: string; batchLabel: string }[]
  // Records this partnership added via "Add a New Contact Record" — deliberately separate from
  // `records` above (today's assigned list): never linked into partnership_records, still
  // pending Admin review, but visible/editable/deletable by the publisher until their ministry
  // session ends (see created_by_partnership_id on TerritoryRecord).
  addedRecords: TerritoryRecordWithLocation[]
  // Set only for an overflow batch whose Group Leader narrowed it to a specific section +
  // blocks (see 025_overflow_search_scope.sql) — null for every other batch (including an
  // unscoped overflow batch searching its whole territory).
  searchScope: { sectionLabel: string; blockLabels: string[] } | null
  // Whatever records already exist in that search scope, read-only (see getRecordsInBlocks) —
  // shown so a publisher searching the area doesn't create a duplicate for a household someone
  // already logged. Always empty when searchScope is null.
  searchScopeRecords: TerritoryRecordWithLocation[]
}
