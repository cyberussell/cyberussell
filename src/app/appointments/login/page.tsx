'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signIn, type ActionResult } from '../actions'
import { AuthHeader, AuthFooter } from '@/components/appointment-system/AuthChrome'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(signIn, {})

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/appointments" className="block text-center text-2xl font-bold text-white mb-8">
          Appointment <span className="text-emerald-400">System</span>
        </Link>
        <form action={formAction} className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <label className="block">
            <span className="text-sm text-slate-300">Email</span>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-emerald-400 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Password</span>
            <input
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-emerald-400 focus:outline-none"
            />
          </label>
          {state.error && <p className="text-sm text-red-400">{state.error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-emerald-500 py-2.5 font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition"
          >
            {pending ? 'Logging in…' : 'Log in'}
          </button>
          <p className="text-center text-sm text-slate-400">
            New here?{' '}
            <Link href="/appointments/signup" className="text-emerald-400 hover:underline">
              Create your account
            </Link>
          </p>
        </form>
      </div>
      </main>
      <AuthFooter />
    </div>
  )
}
