import Link from 'next/link'
import { requireAdmin } from '@/lib/territory-management-system/modules/auth/queries'
import { listFlaggedForCorrection, listFlaggedForRemoval } from '@/lib/territory-management-system/modules/records/queries'
import {
  applyRecordCorrectionAction,
  deleteRecordAction,
  dismissCorrectionRecommendationAction,
  dismissRemovalRecommendationAction,
} from '@/app/territory-management-system/actions/records'
import PageHeader from '@/components/territory-management-system/dashboard/PageHeader'
import Card from '@/components/territory-management-system/dashboard/Card'
import ConfirmDeleteButton from '@/components/territory-management-system/dashboard/ConfirmDeleteButton'

export const dynamic = 'force-dynamic'

// Two independent publisher-flagged review queues on one page: records marked "Moved" and
// recommended for removal, and records where a Ministry Partner tapped "Update" to recommend a
// corrected Plus Code (or other wrong info). Both follow the same review-gated shape — the
// Admin applies or dismisses each one, nothing changes on the record until then.
export default async function FlaggedForRemovalPage() {
  const { supabase, congregation } = await requireAdmin()
  const [removalRecords, correctionRecords] = await Promise.all([
    listFlaggedForRemoval(supabase, congregation.id),
    listFlaggedForCorrection(supabase, congregation.id),
  ])

  return (
    <div className="space-y-8">
      <div>
        <PageHeader title="Flagged for Removal" subtitle="Contact records Ministry Partners have recommended the Admin remove." />
        {removalRecords.length === 0 ? (
          <Card className="p-6 text-center text-sm text-slate-400">No records are currently flagged.</Card>
        ) : (
          <div className="space-y-3">
            {removalRecords.map((r) => (
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

      <div>
        <PageHeader
          title="Flagged for Correction"
          subtitle="Contact records a Ministry Partner has recommended a Plus Code (or other) correction for."
        />
        {correctionRecords.length === 0 ? (
          <Card className="p-6 text-center text-sm text-slate-400">No records are currently flagged.</Card>
        ) : (
          <div className="space-y-3">
            {correctionRecords.map((r) => (
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
                    <p className="mt-2 text-sm text-slate-600">
                      Current Plus Code: <span className="font-medium text-[#0B1B33]">{r.plus_code || '—'}</span>
                      {' → Recommended: '}
                      <span className="font-medium text-[#0B1B33]">{r.correction_recommended_plus_code}</span>
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Current Section/Block:{' '}
                      <span className="font-medium text-[#0B1B33]">
                        Section {r.section?.label ?? '—'} / Block {r.block?.label ?? '—'}
                      </span>
                      {' → Recommended: '}
                      <span className="font-medium text-[#0B1B33]">
                        Section {r.correction_section?.label ?? '—'} / Block {r.correction_block?.label ?? '—'}
                      </span>
                    </p>
                    {r.correction_recommended_household_members != null && (
                      <p className="mt-1 text-sm text-slate-600">
                        Current Household Members: <span className="font-medium text-[#0B1B33]">{r.household_members ?? '—'}</span>
                        {' → Recommended: '}
                        <span className="font-medium text-[#0B1B33]">{r.correction_recommended_household_members}</span>
                      </p>
                    )}
                    <p className="mt-1 text-sm text-slate-600">{r.correction_recommended_reason}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Recommended by {r.correction_recommended_by ?? 'Unknown'}
                      {r.correction_recommended_at &&
                        ` · ${new Date(r.correction_recommended_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}`}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <form action={dismissCorrectionRecommendationAction.bind(null, r.id)}>
                      <button type="submit" className="text-sm font-medium text-slate-500 hover:underline">
                        Dismiss
                      </button>
                    </form>
                    <form action={applyRecordCorrectionAction.bind(null, r.id)}>
                      <button
                        type="submit"
                        className="rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-3 py-1.5 text-sm font-semibold text-white transition hover:brightness-110"
                      >
                        Apply Correction
                      </button>
                    </form>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
