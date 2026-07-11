// Shared UTC-only date-bucketing helpers, used by both queries.ts (Daily/Weekly/
// Monthly Sales) and advanced.ts (Monthly Service Requests) — factored out here
// so the "always bucket in UTC, never local server time" rule (see queries.ts's
// comment on why) lives in exactly one place instead of being copy-pasted.

export function monthKey(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
}

export function monthLabel(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
}

export function startOfMonthsAgoUtc(monthsAgo: number): Date {
  const now = new Date()
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - monthsAgo, 1))
}

export function monthBuckets(windowStart: Date, count: number): { key: string; label: string; date: Date }[] {
  const out: { key: string; label: string; date: Date }[] = []
  for (let i = 0; i < count; i++) {
    const d = new Date(Date.UTC(windowStart.getUTCFullYear(), windowStart.getUTCMonth() + i, 1))
    out.push({ key: monthKey(d), label: monthLabel(d), date: d })
  }
  return out
}
