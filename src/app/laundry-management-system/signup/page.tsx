'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { MailCheck } from 'lucide-react'
import { signUp, type ActionResult } from '../actions'
import { AuthHeader, AuthFooter } from '@/components/laundry-management-system/AuthChrome'

export default function SignupPage() {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(signUp, {})
  const confirmEmail = state.error === 'CONFIRM_EMAIL'

  return (
    <div className="flex min-h-screen flex-col bg-[#050816]">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link href="/laundry-management-system" className="mb-2 flex flex-col items-center text-center">
            <img src="/lms-logo.png" alt="" className="mb-3 h-14 w-14 rounded-2xl object-cover" />
            <span className="text-2xl font-bold text-white">
              Laundry <span className="text-[#38BDF8]">Management System</span>
            </span>
          </Link>
          <p className="text-center text-white/40 mb-8 text-sm">
            Create your business account to get started.
          </p>

          {confirmEmail ? (
            <div className="rounded-xl border border-[#38BDF8]/30 bg-[#38BDF8]/10 p-6 text-center">
              <MailCheck className="mx-auto mb-2 h-8 w-8 text-[#38BDF8]" aria-hidden />
              <p className="text-[#38BDF8] font-medium">Check your email</p>
              <p className="text-white/60 text-sm mt-2">
                We sent a confirmation link to your email. You must confirm it before you can log in —
                after confirming, <Link href="/laundry-management-system/login" className="underline text-[#38BDF8]">log in here</Link>.
                Didn&apos;t get it? You can resend it from the{' '}
                <Link href="/laundry-management-system/login" className="underline text-[#38BDF8]">login page</Link>.
              </p>
            </div>
          ) : (
            <form action={formAction} className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6">
              <Field label="Email" name="email" type="email" placeholder="you@business.com" />
              <Field label="Password" name="password" type="password" placeholder="8+ characters" />
              {state.error && !confirmEmail && (
                <p className="text-sm text-red-400">{state.error}</p>
              )}
              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 font-semibold text-white hover:brightness-110 hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] disabled:opacity-50 transition-all"
              >
                {pending ? 'Creating your account…' : 'Create my account'}
              </button>
              <p className="text-center text-sm text-white/40">
                Already have an account?{' '}
                <Link href="/laundry-management-system/login" className="text-[#38BDF8] hover:underline">
                  Log in
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

function Field({
  label,
  name,
  type = 'text',
  placeholder,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="text-sm text-white/60">{label}</span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-[#38BDF8] focus:outline-none"
      />
    </label>
  )
}
