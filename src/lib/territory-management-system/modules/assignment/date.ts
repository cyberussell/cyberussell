// Settings-form input is validated (congregation/schema.ts), but rows written outside the app
// (manual SQL provisioning, direct DB edits) aren't — an invalid IANA zone would otherwise throw
// a RangeError deep inside Intl and crash every page that renders a congregation-local date.
// Falling back to UTC keeps the dashboard usable instead of a hard 500.
export function safeTimezone(timezone: string): string {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone })
    return timezone
  } catch {
    return 'UTC'
  }
}

// en-CA formats as YYYY-MM-DD, exactly what a Postgres `date` column expects. Shared by the
// Group Leader dashboard (to look up whether today's batch already exists) and
// createGroupLeaderAssignmentAction (to compute the same date server-side at submit time).
export function todayInTimezone(timezone: string): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: safeTimezone(timezone) })
}

// A batch is "expired" once its assignment_date is before today in the congregation's own
// timezone — publisher-facing QR/claim links for it stop working the next day, but nothing
// about the batch or its data is ever deleted (Reports and history still read it normally).
// String comparison is safe here since both sides are YYYY-MM-DD.
export function isBatchExpired(assignmentDate: string, timezone: string): boolean {
  return assignmentDate < todayInTimezone(timezone)
}
