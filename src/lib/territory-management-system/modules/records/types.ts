export type RecordStatus = 'pending' | 'approved'
export type RecordSource = 'manual' | 'csv_import' | 'publisher'
export type VisitResult =
  | 'initial_visit'
  | 'return_visit'
  | 'started_bible_study'
  | 'bible_study'
  | 'progressing'
  | 'discontinued'
  | 'not_home'
  | 'do_not_call'
  | 'moved'
  | 'other'
  | 'undone'

export interface TerritoryRecord {
  id: string
  congregation_id: string
  territory_id: string
  section_id: string
  block_id: string
  address: string
  unit: string
  resident_name: string
  plus_code: string | null
  household_members: number | null
  notes: string
  do_not_call: boolean
  // Set automatically by a DB trigger the moment do_not_call flips true (see
  // 027_do_not_call_lock.sql) — null whenever do_not_call is false. Powers the 6-month
  // no-visit-can-be-logged cooldown (see isDoNotCallLocked in records/schema.ts).
  do_not_call_at: string | null
  status: RecordStatus
  source: RecordSource
  // Set when a publisher marks this record "Moved" and chooses "Recommend for Admin Removal"
  // instead of correcting the contact info themselves — see 012_removal_recommendation.sql.
  // removal_recommended_by is the partnership's name (no publisher accounts to key off of).
  removal_recommended_at: string | null
  removal_recommended_reason: string | null
  removal_recommended_by: string | null
  // Which partnership added this record via the publisher workspace's "Add a New Contact
  // Record" form (null for admin/CSV-created records) — see 019_publisher_added_record_ownership.sql.
  // Powers the publisher's own "My Added Records" list, kept separate from partnership_records
  // (today's assigned-record list) and from the pending-review gate (still Admin-only).
  created_by_partnership_id: string | null
  // Set when a publisher taps "Update" on an assigned record (e.g. a wrong Plus Code) and
  // recommends a correction — see 020_correction_recommendation.sql. Same review-gated shape
  // as removal_recommended_* above: the record itself is untouched until the Admin applies it.
  correction_recommended_at: string | null
  correction_recommended_plus_code: string | null
  correction_recommended_reason: string | null
  correction_recommended_by: string | null
  created_at: string
  updated_at: string
}

export interface TerritoryRecordWithLocation extends TerritoryRecord {
  territory: { id: string; name: string } | null
  section: { id: string; label: string } | null
  block: { id: string; label: string } | null
}

export interface RecordVisit {
  id: string
  congregation_id: string
  record_id: string
  visited_at: string
  result: VisitResult
  notes: string
  created_by: string | null
  partner_name: string | null
  created_at: string
}

export interface RecordVisitWithAuthor extends RecordVisit {
  created_by_name: string | null
}
