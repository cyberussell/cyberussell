'use client'

import { useActionState } from 'react'
import { changePasswordAction } from '@/app/lms/actions/auth'
import type { ActionResult } from '@/app/lms/actions/shared'
import { AuthHeader, AuthFooter } from './AuthChrome'

// Reached only via a forced redirect (must_change_password) — the account was just invited or
// reset with a temp password the owner relayed directly, replacing the emailed invite-link flow.
// No token/link to verify here — the user already has a real session by the time they land on
// this page, just one flagged as needing a real password before it can be used anywhere else.
export default function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(changePasswordAction, {})

  return (
    <div className="flex min-h-screen flex-col bg-[#050816]">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center text-2xl font-bold text-white">
            Laundry <span className="text-[#22D3EE]">Management System</span>
          </div>
          <p className="mb-6 text-center text-sm text-white/40">Set a new password to continue.</p>

          <form action={formAction} className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
            <label className="block">
              <span className="text-sm text-white/60">New password</span>
              <input
                type="password"
                name="password"
                required
                minLength={8}
                placeholder="8+ characters"
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-[#22D3EE] focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-sm text-white/60">Confirm new password</span>
              <input
                type="password"
                name="confirm"
                required
                minLength={8}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-[#22D3EE] focus:outline-none"
              />
            </label>
            {state.error && <p className="text-sm text-red-400">{state.error}</p>}
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-gradient-to-r from-[#0D9488] to-[#22D3EE] py-2.5 font-semibold text-white hover:brightness-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] disabled:opacity-50 transition-all"
            >
              {pending ? 'Saving…' : 'Set password'}
            </button>
          </form>
        </div>
      </main>
      <AuthFooter />
    </div>
  )
}
