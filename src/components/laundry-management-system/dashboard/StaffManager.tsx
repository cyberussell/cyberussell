'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { KeyRound } from 'lucide-react'
import { inviteStaff, resetStaffPasswordAction, type InviteStaffResult } from '@/app/lms/actions/staff'
import { useServerAction } from '@/lib/laundry-management-system/hooks/useServerAction'
import type { Branch } from '@/lib/laundry-management-system/modules/tenant/types'
import type { StaffMember } from '@/lib/laundry-management-system/modules/staff/types'
import Card from './Card'
import DataTable, { type DataTableColumn } from './DataTable'
import FormField, { inputClass, selectAppearance } from './FormField'
import Avatar from './Avatar'

type StaffRow = StaffMember & { profile: { full_name: string } | null }

// Merges the old StaffTable + StaffInviteForm into one component, mirroring Territory
// Management System's GroupLeadersManager.tsx: both the invite form and the per-row "Reset
// Password" action need to share one `revealedPassword` panel, which only works cleanly as
// shared state in a single client component.
export default function StaffManager({
  staff,
  branches,
  atLimit,
  limitMessage,
}: {
  staff: StaffRow[]
  branches: Branch[]
  atLimit?: boolean
  limitMessage?: string
}) {
  const router = useRouter()
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const { dispatch, pending: invitePending, error, successMessage, state } = useServerAction<InviteStaffResult>(
    inviteStaff,
    ['SAVED']
  )
  // Holds whichever temp password (invite or reset) needs to stay visible until the owner
  // dismisses it — a toast would vanish before there's time to copy/relay it.
  const [revealedPassword, setRevealedPassword] = useState<{ name: string; password: string } | null>(null)

  useEffect(() => {
    if (successMessage) {
      router.refresh()
      if (state.tempPassword) setRevealedPassword({ name: 'the new staff member', password: state.tempPassword })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successMessage])

  function runResetPassword(id: string, name: string) {
    const custom = window.prompt(
      `Reset the password for ${name}?\n\nOptionally set a custom temporary password (at least 8 characters) — leave blank to auto-generate one.`,
      ''
    )
    if (custom === null) return // cancelled
    if (custom && custom.length < 8) {
      toast.error('Temporary password must be at least 8 characters.')
      return
    }
    setPendingId(id)
    startTransition(async () => {
      const result = await resetStaffPasswordAction(id, custom || undefined)
      setPendingId(null)
      if (result.error) toast.error(result.error)
      else if (result.tempPassword) {
        setRevealedPassword({ name, password: result.tempPassword })
        router.refresh()
      }
    })
  }

  const columns: DataTableColumn<StaffRow>[] = [
    {
      header: 'Name',
      cell: (m) => {
        const name = m.profile?.full_name || m.email
        return (
          <div className="flex items-center gap-3">
            <Avatar name={name} size="sm" />
            <span>{name}</span>
          </div>
        )
      },
    },
    { header: 'Title', cell: (m) => m.title || '—' },
    {
      header: 'Status',
      cell: (m) => (
        <span className={`text-sm ${m.active ? 'text-emerald-600' : 'text-slate-400'}`}>
          {m.active ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: (m) => {
        const name = m.profile?.full_name || m.email
        const rowPending = isPending && pendingId === m.id
        return (
          <button
            type="button"
            disabled={rowPending}
            onClick={() => runResetPassword(m.id, name)}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#0D9488] hover:underline disabled:opacity-50"
          >
            <KeyRound className="h-3.5 w-3.5" />
            Reset Password
          </button>
        )
      },
    },
  ]

  return (
    <div className="space-y-4">
      {revealedPassword && (
        <Card className="border-2 border-[#22D3EE] p-6">
          <h2 className="font-semibold text-[#0B1B33]">Temporary password for {revealedPassword.name}</h2>
          <p className="mt-1 text-sm text-slate-600">
            Share this with them directly — it won&apos;t be shown again. They&apos;ll be asked to set their own
            password the first time they log in.
          </p>
          <p className="mt-3 select-all rounded-lg border border-teal-100 bg-[#F0FDFA] px-4 py-3 text-center font-mono text-lg font-semibold tracking-wide text-[#0B1B33]">
            {revealedPassword.password}
          </p>
          <button
            type="button"
            onClick={() => setRevealedPassword(null)}
            className="mt-3 w-full rounded-full border border-teal-100 bg-white py-2 text-sm font-medium text-slate-500 hover:border-[#22D3EE]/40"
          >
            Done — I&apos;ve shared it
          </button>
        </Card>
      )}

      {atLimit ? (
        <Card className="p-6 text-sm text-slate-500">{limitMessage}</Card>
      ) : (
        <Card className="p-6">
          <h2 className="mb-4 font-semibold text-[#0B1B33]">Invite staff</h2>
          <form action={dispatch} key={successMessage ?? 'invite-form'} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField label="Email">
              <input name="email" type="email" required className={inputClass} />
            </FormField>
            <FormField label="Title" optional>
              <input name="title" type="text" placeholder="Front desk" className={inputClass} />
            </FormField>
            {branches.length > 0 && (
              <FormField label="Branch" optional>
                <select name="branchId" className={`${inputClass} ${selectAppearance}`}>
                  <option value="">Any branch</option>
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </FormField>
            )}
            <FormField label="Temporary password" optional>
              <input
                name="tempPassword"
                type="text"
                minLength={8}
                maxLength={72}
                placeholder="Leave blank to auto-generate"
                className={inputClass}
              />
            </FormField>
            <p className="text-xs text-slate-500 sm:col-span-2 sm:self-center">
              Auto-generated passwords can be hard to relay — set something easier to type if you&apos;d like. At
              least 8 characters either way.
            </p>
            {error && <p className="text-sm text-red-500 sm:col-span-3">{error}</p>}
            <button
              type="submit"
              disabled={invitePending}
              className="rounded-full bg-gradient-to-r from-[#0D9488] to-[#22D3EE] py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50 sm:col-span-3"
            >
              {invitePending ? 'Creating account…' : 'Invite staff'}
            </button>
          </form>
        </Card>
      )}

      <DataTable columns={columns} rows={staff} emptyMessage="No staff yet — invite your first team member above." />
    </div>
  )
}
