'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { MailCheck } from 'lucide-react'
import { signUp, type ActionResult } from '../actions'
import { BUSINESS_TYPE_OPTIONS } from '@/lib/appointment-system/terminology'

export default function SignupPage() {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(signUp, {})
  const confirmEmail = state.error === 'CONFIRM_EMAIL'

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/appointments" className="block text-center text-2xl font-bold text-white mb-2">
          Appointment <span className="text-emerald-400">System</span>
        </Link>
        <p className="text-center text-slate-400 mb-8 text-sm">
          Start on the Free plan — no credit card required.
        </p>

        {confirmEmail ? (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
            <MailCheck className="mx-auto mb-2 h-8 w-8 text-emerald-300" aria-hidden />
            <p className="text-emerald-300 font-medium">Check your email</p>
            <p className="text-slate-300 text-sm mt-2">
              We sent a confirmation link. After confirming, <Link href="/appointments/login" className="underline text-emerald-300">log in here</Link>.
            </p>
          </div>
        ) : (
          <form action={formAction} className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
            <Field label="Your name" name="fullName" placeholder="Dr. Maria Santos" />
            <Field label="Business name" name="businessName" placeholder="Bright Smiles Dental" />
            <label className="block">
              <span className="text-sm text-slate-300">Business type</span>
              <select
                name="businessType"
                required
                defaultValue="medical"
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-emerald-400 focus:outline-none"
              >
                {BUSINESS_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>
            <Field label="Email" name="email" type="email" placeholder="you@business.com" />
            <Field label="Password" name="password" type="password" placeholder="8+ characters" />
            {state.error && !confirmEmail && (
              <p className="text-sm text-red-400">{state.error}</p>
            )}
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-lg bg-emerald-500 py-2.5 font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition"
            >
              {pending ? 'Creating your account…' : 'Create my account'}
            </button>
            <p className="text-center text-sm text-slate-400">
              Already have an account?{' '}
              <Link href="/appointments/login" className="text-emerald-400 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        )}
      </div>
    </main>
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
      <span className="text-sm text-slate-300">{label}</span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
      />
    </label>
  )
}
