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
  // Zero eligible records isn't an error — it's the "brand-new/unmapped territory" scenario:
  // publishers still get a real assignment (QR, partnerships, a workspace), just with nothing
  // pre-assigned to visit. They spend the day searching the area and adding new contact
  // records instead of revisiting existing ones (see PublisherWorkspaceApp's empty-records
  // messaging).
  if (eligibleRecordIds.length === 0) {
    return {
      partnerships: Array.from({ length: partnershipCount }, (_, i) => ({ sequence: i + 1, recordIds: [] })),
      unassignedCount: 0,
    }
  }
  if (eligibleRecordIds.length < partnershipCount) {
    return {
      error: `Insufficient records: ${eligibleRecordIds.length} approved record(s) available, but ${partnershipCount} partnership(s) requested — every partnership needs at least 1 record.`,
    }
  }
  const maxCapacity = partnershipCount * maxPerPartnership
  if (eligibleRecordIds.length > maxCapacity) {
    return {
      error: `Too many approved records: ${eligibleRecordIds.length} available, but ${partnershipCount} partnership(s) × ${maxPerPartnership} max per partnership = ${maxCapacity} capacity. Increase publishers going out or group size, or select fewer territories.`,
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
