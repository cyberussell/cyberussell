import Link from 'next/link'
import { requireAdmin } from '@/lib/territory-management-system/modules/auth/queries'
import { listFlaggedForRemoval } from '@/lib/territory-management-system/modules/records/queries'
import { deleteRecordAction, dismissRemovalRecommendationAction } from '@/app/territory-management-system/actions/records'
import PageHeader from '@/components/territory-management-system/dashboard/PageHeader'
import Card from '@/components/territory-management-system/dashboard/Card'
import ConfirmDeleteButton from '@/components/territory-management-system/dashboard/ConfirmDeleteButton'

export const dynamic = 'force-dynamic'

// Records a publisher marked "Moved" and recommended for removal (as opposed to correcting the
// contact info themselves) — the Admin reviews each one and either deletes the record outright
// or dismisses the recommendation if it turns out to be a mistake.
export default async function FlaggedForRemovalPage() {
  const { supabase, congregation } = await requireAdmin()
  const records = await listFlaggedForRemoval(supabase, congregation.id)

  return (
    <div>
      <PageHeader title="Flagged for Removal" subtitle="Contact records Ministry Partners have recommended the Admin remove." />
      {records.length === 0 ? (
        <Card className="p-6 text-center text-sm text-slate-400">No records are currently flagged.</Card>
      ) : (
        <div className="space-y-3">
          {records.map((r) => (
            <Card key={r.id} className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link
                    href={`/territory-management-system/dashboard/records/${r.id}`}
                    className="font-medium text-[#0B1B33] hover:underline"
                  >
                    {r.address || r.plus_code || 'Unlabeled record'}
                    {r.unit ? `, ${r.unit}` : ''}
                  </Link>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {r.territory?.name ?? '—'} / Section {r.section?.label ?? '—'} / Block {r.block?.label ?? '—'}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{r.removal_recommended_reason}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Recommended by {r.removal_recommended_by ?? 'Unknown'}
                    {r.removal_recommended_at &&
                      ` · ${new Date(r.removal_recommended_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}`}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <form action={dismissRemovalRecommendationAction.bind(null, r.id)}>
                    <button type="submit" className="text-sm font-medium text-slate-500 hover:underline">
                      Dismiss
                    </button>
                  </form>
                  <ConfirmDeleteButton
                    action={deleteRecordAction.bind(null, r.id)}
                    confirmMessage="Delete this contact record? This cannot be undone."
                    label="Delete"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
