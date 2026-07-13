// en-CA formats as YYYY-MM-DD, exactly what a Postgres `date` column expects. Shared by the
// Group Leader dashboard (to look up whether today's batch already exists) and
// createGroupLeaderAssignmentAction (to compute the same date server-side at submit time).
export function todayInTimezone(timezone: string): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: timezone })
}

// A batch is "expired" once its assignment_date is before today in the congregation's own
// timezone — publisher-facing QR/claim links for it stop working the next day, but nothing
// about the batch or its data is ever deleted (Reports and history still read it normally).
// String comparison is safe here since both sides are YYYY-MM-DD.
export function isBatchExpired(assignmentDate: string, timezone: string): boolean {
  return assignmentDate < todayInTimezone(timezone)
}
