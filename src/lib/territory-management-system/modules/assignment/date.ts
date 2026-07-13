// en-CA formats as YYYY-MM-DD, exactly what a Postgres `date` column expects. Shared by the
// admin New Assignment page (to look up whether today's batch already exists) and the
// createAssignmentAction Server Action (to compute the same date server-side at submit time).
export function todayInTimezone(timezone: string): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: timezone })
}
