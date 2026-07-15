import { requireAdmin } from '@/lib/territory-management-system/modules/auth/queries'
import { listPartnershipNotesForCongregation } from '@/lib/territory-management-system/modules/assignment/queries'
import PageHeader from '@/components/territory-management-system/dashboard/PageHeader'
import Card from '@/components/territory-management-system/dashboard/Card'

export const dynamic = 'force-dynamic'

// Admin-only — every note a Ministry Partner has ever chosen to leave at the end of their
// ministry, newest first. Deliberately not surfaced anywhere in the Group Leader dashboard.
export default async function NotesPage() {
  const { supabase, congregation } = await requireAdmin()
  const notes = await listPartnershipNotesForCongregation(supabase, congregation.id)

  return (
    <div>
      <PageHeader title="Notes" subtitle="Notes Ministry Partners have left at the end of their ministry." />
      {notes.length === 0 ? (
        <Card className="p-6 text-center text-sm text-slate-400">No notes have been submitted yet.</Card>
      ) : (
        <div className="space-y-3">
          {notes.map((n) => (
            <Card key={n.id} className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium text-[#0B1B33]">{n.name}</p>
                <span className="text-xs text-slate-400">
                  {n.assignment_date
                    ? new Date(`${n.assignment_date}T00:00:00`).toLocaleDateString('en-US', { dateStyle: 'medium' })
                    : ''}
                  {n.admin_note_at &&
                    ` · ${new Date(n.admin_note_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}
                </span>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">{n.admin_note}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
