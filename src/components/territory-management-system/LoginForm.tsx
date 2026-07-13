'use client'

import { useActionState } from 'react'
import { signIn } from '@/app/territory-management-system/actions/auth'
import type { ActionResult } from '@/app/territory-management-system/actions/shared'

export default function LoginForm({ notProvisioned }: { notProvisioned: boolean }) {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(signIn, {})

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F3F8FF] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-2xl font-bold text-white">
            T
          </div>
          <span className="text-2xl font-bold text-[#0B1B33]">
            Territory <span className="text-[#2563EB]">Management System</span>
          </span>
        </div>
        <form
          action={formAction}
          className="space-y-4 rounded-2xl border border-blue-100/60 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_24px_-16px_rgba(37,99,235,0.25)]"
        >
          <label className="block">
            <span className="text-sm font-medium text-slate-600">Email</span>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-600">Password</span>
            <input
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
            />
          </label>
          {notProvisioned && !state.error && (
            <p className="text-sm text-amber-600">
              Your account isn&apos;t linked to a congregation yet — contact your administrator.
            </p>
          )}
          {state.error && <p className="text-sm text-red-500">{state.error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
          >
            {pending ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  )
}
