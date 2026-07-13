// The Assignment Engine — deliberately pure and DB-free (no Supabase import anywhere in this
// file) so it's a single reusable, independently testable source of truth for how records get
// split across partnerships. Callers (modules/assignment/queries.ts) own fetching the eligible
// record pool in the correct order and persisting the result; this function only does the math.

export interface AssignmentPartnershipPlan {
  sequence: number
  recordIds: string[]
}

export interface AssignmentPlan {
  partnerships: AssignmentPartnershipPlan[]
  unassignedCount: number
}

export interface AssignmentError {
  error: string
}

export const DEFAULT_MAX_PER_PARTNERSHIP = 6

// Records are always assigned sequentially, in the exact order they're passed in — never
// shuffled or randomized. Partnership 1 fills first (up to maxPerPartnership), then
// partnership 2, and so on; only the last partnership may end up with fewer than the max.
export function calculateAssignment(
  eligibleRecordIds: string[],
  partnershipCount: number,
  maxPerPartnership: number = DEFAULT_MAX_PER_PARTNERSHIP
): AssignmentPlan | AssignmentError {
  if (!Number.isInteger(partnershipCount) || partnershipCount < 1) {
    return { error: 'Enter at least 1 partnership.' }
  }
  if (eligibleRecordIds.length === 0) {
    return { error: 'No approved records are available in the selected territories.' }
  }
  if (eligibleRecordIds.length < partnershipCount) {
    return {
      error: `Insufficient records: ${eligibleRecordIds.length} approved record(s) available, but ${partnershipCount} partnership(s) requested — every partnership needs at least 1 record.`,
    }
  }

  const partnerships: AssignmentPartnershipPlan[] = []
  let cursor = 0
  for (let sequence = 1; sequence <= partnershipCount; sequence += 1) {
    const recordIds = eligibleRecordIds.slice(cursor, cursor + maxPerPartnership)
    partnerships.push({ sequence, recordIds })
    cursor += recordIds.length
  }

  return { partnerships, unassignedCount: eligibleRecordIds.length - cursor }
}

// Generic over T so it also narrows CreateAssignmentResult | AssignmentError in queries.ts,
// not just AssignmentPlan | AssignmentError.
export function isAssignmentError<T extends object>(result: T | AssignmentError): result is AssignmentError {
  return 'error' in result
}
