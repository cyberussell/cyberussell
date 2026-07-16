export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="animate-pulse space-y-2">
        <div className="h-5 w-32 rounded-md bg-teal-100/60" />
        <div className="h-4 w-48 rounded-md bg-teal-100/60" />
      </div>
      <div className="animate-pulse rounded-2xl bg-teal-100/60" style={{ height: 180 }} />
      <div className="animate-pulse rounded-2xl bg-teal-100/60" style={{ height: 120 }} />
    </div>
  )
}
