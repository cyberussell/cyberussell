'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CircleCheck } from 'lucide-react'
import { createBrowserSupabase } from '@/lib/territory-management-system/supabase'

// Shared by both entry points that land here with a Supabase-established session from an
// emailed link — accepting a Group Leader invite, and finishing a password reset. Both fire the
// same PASSWORD_RECOVERY auth event, so one page covers both flows.
export default function SetPasswordPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [expired, setExpired] = useState(false)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState(false)
  const readyRef = useRef(false)

  useEffect(() => {
    const supabase = createBrowserSupabase()
    // Only the PASSWORD_RECOVERY event proves this page was reached via a valid emailed link —
    // an existing session (e.g. already logged in elsewhere in this browser) looks identical to
    // a real recovery session if checked via getSession() alone.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        readyRef.current = true
        setReady(true)
      }
    })
    const timeout = setTimeout(() => {
      if (!readyRef.current) setExpired(true)
    }, 4000)
    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password.length < 8) return setError('Password must be at least 8 characters.')
    if (password !== confirm) return setError('Passwords do not match.')
    setPending(true)
    const supabase = createBrowserSupabase()
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setPending(false)
    if (updateError) return setError('Could not update your password — please try the link again.')
    setSuccess(true)
    setTimeout(() => router.push('/territory-management-system/login'), 2000)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#C9D8EE] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-2xl font-bold text-white">
            T
          </div>
          <span className="text-2xl font-bold text-[#0B1B33]">
            Territory <span className="text-[#2563EB]">Management System</span>
          </span>
          <p className="mt-2 text-sm text-slate-700">Set your password.</p>
        </div>

        {success ? (
          <div className="rounded-2xl border border-gray-300 bg-white p-6 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_0_18px_-3px_rgba(148,163,184,0.6)]">
            <CircleCheck className="mx-auto mb-2 h-8 w-8 text-emerald-500" aria-hidden />
            <p className="font-medium text-[#0B1B33]">Password set</p>
            <p className="mt-2 text-sm text-slate-500">Redirecting you to log in…</p>
          </div>
        ) : expired && !ready ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
            <p className="font-medium text-amber-700">This link is invalid or has expired.</p>
            <p className="mt-2 text-sm text-slate-500">
              <Link href="/territory-management-system/forgot-password" className="text-[#2563EB] hover:underline">
                Request a new one
              </Link>
              .
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-gray-300 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_0_18px_-3px_rgba(148,163,184,0.6)]"
          >
            <label className="block">
              <span className="text-sm font-medium text-slate-600">New password</span>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8+ characters"
                className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] placeholder:text-slate-400 focus:border-[#38BDF8] focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-600">Confirm new password</span>
              <input
                type="password"
                required
                minLength={8}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="mt-1 w-full rounded-lg border border-blue-100 bg-[#F8FBFF] px-3 py-2 text-[#0B1B33] focus:border-[#38BDF8] focus:outline-none"
              />
            </label>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={pending || !ready}
              className="w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
            >
              {!ready ? 'Verifying link…' : pending ? 'Updating…' : 'Set Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
