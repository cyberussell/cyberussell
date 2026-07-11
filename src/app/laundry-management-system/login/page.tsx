'use client'

import { useActionState, useState, useTransition } from 'react'
import Link from 'next/link'
import { signIn, resendConfirmation, type ActionResult } from '../actions'
import { AuthHeader, AuthFooter } from '@/components/laundry-management-system/AuthChrome'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(signIn, {})
  const [email, setEmail] = useState('')
  const [resendPending, startResendTransition] = useTransition()
  const [resendResult, setResendResult] = useState<ActionResult | null>(null)
  const needsConfirmation = state.error === 'EMAIL_NOT_CONFIRMED'

  function handleResend() {
    setResendResult(null)
    startResendTransition(async () => {
      setResendResult(await resendConfirmation(email))
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#050816]">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link href="/laundry-management-system" className="mb-8 flex flex-col items-center text-center">
            <img src="/lms-logo.png" alt="" className="mb-3 h-14 w-14 rounded-2xl object-cover" />
            <span className="text-2xl font-bold text-white">
              Laundry <span className="text-[#38BDF8]">Management System</span>
            </span>
          </Link>
          <form action={formAction} className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6">
            <label className="block">
              <span className="text-sm text-white/60">Email</span>
              <input
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-[#38BDF8] focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-sm text-white/60">Password</span>
              <input
                name="password"
                type="password"
                required
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-[#38BDF8] focus:outline-none"
              />
            </label>
            {state.error && !needsConfirmation && <p className="text-sm text-red-400">{state.error}</p>}
            {needsConfirmation && (
              <div className="rounded-lg border border-[#38BDF8]/30 bg-[#38BDF8]/10 p-3 text-sm text-[#38BDF8]">
                <p>
                  Please confirm your email before logging in — check your inbox for the confirmation link
                  we sent when you signed up.
                </p>
                {resendResult && !resendResult.error ? (
                  <p className="mt-2 text-white">Confirmation email resent — check your inbox.</p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendPending}
                    className="mt-2 font-medium underline underline-offset-4 hover:text-white disabled:opacity-50"
                  >
                    {resendPending ? 'Resending…' : "Didn't get it? Resend confirmation email"}
                  </button>
                )}
                {resendResult?.error && <p className="mt-2 text-red-400">{resendResult.error}</p>}
              </div>
            )}
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 font-semibold text-white hover:brightness-110 hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] disabled:opacity-50 transition-all"
            >
              {pending ? 'Logging in…' : 'Log in'}
            </button>
            <p className="text-center text-sm text-white/40">
              New here?{' '}
              <Link href="/laundry-management-system/signup" className="text-[#38BDF8] hover:underline">
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
