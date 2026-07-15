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
  status: RecordStatus
  source: RecordSource
  // Set when a publisher marks this record "Moved" and chooses "Recommend for Admin Removal"
  // instead of correcting the contact info themselves — see 012_removal_recommendation.sql.
  // removal_recommended_by is the partnership's name (no publisher accounts to key off of).
  removal_recommended_at: string | null
  removal_recommended_reason: string | null
  removal_recommended_by: string | null
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
