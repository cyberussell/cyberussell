'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { MailCheck } from 'lucide-react'
import { requestPasswordReset, type ActionResult } from '../actions'
import { AuthHeader, AuthFooter } from '@/components/laundry-management-system/AuthChrome'

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(requestPasswordReset, {})
  const sent = state.error === 'SENT'

  return (
    <div className="flex min-h-screen flex-col bg-[#050816]">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link href="/laundry-management-system" className="block text-center text-2xl font-bold text-white mb-2">
            Laundry <span className="text-[#38BDF8]">Management System</span>
          </Link>
          <p className="text-center text-white/40 mb-8 text-sm">Reset your password.</p>

          {sent ? (
            <div className="rounded-xl border border-[#38BDF8]/30 bg-[#38BDF8]/10 p-6 text-center">
              <MailCheck className="mx-auto mb-2 h-8 w-8 text-[#38BDF8]" aria-hidden />
              <p className="text-[#38BDF8] font-medium">Check your email</p>
              <p className="text-white/60 text-sm mt-2">
                If an account exists for that address, we&apos;ve sent a password reset link.{' '}
                <Link href="/laundry-management-system/login" className="underline text-[#38BDF8]">Back to login</Link>.
              </p>
            </div>
          ) : (
            <form action={formAction} className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6">
              <label className="block">
                <span className="text-sm text-white/60">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@business.com"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-[#38BDF8] focus:outline-none"
                />
              </label>
              {state.error && !sent && <p className="text-sm text-red-400">{state.error}</p>}
              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 font-semibold text-white hover:brightness-110 hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] disabled:opacity-50 transition-all"
              >
                {pending ? 'Sending…' : 'Send reset link'}
              </button>
              <p className="text-center text-sm text-white/40">
                <Link href="/laundry-management-system/login" className="text-[#38BDF8] hover:underline">
                  Back to login
                </Link>
              </p>
            </form>
          )}
        </div>
      </main>
      <AuthFooter />
    </div>
  )
}
