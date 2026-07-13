'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CircleCheck } from 'lucide-react'
import { createBrowserSupabase } from '@/lib/laundry-management-system/supabase'
import { AuthHeader, AuthFooter } from '@/components/laundry-management-system/AuthChrome'

export default function AcceptStaffInvitePage() {
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
    // An invite link authenticates the browser the same way a password-recovery
    // link does — Supabase fires PASSWORD_RECOVERY or SIGNED_IN depending on
    // version, so both are treated as a valid arrival here.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
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
    if (updateError) return setError('Could not set your password — please try the invite link again.')
    setSuccess(true)
    setTimeout(() => router.push('/lms/staff/dashboard'), 2000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#050816]">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link href="/lms" className="block text-center text-2xl font-bold text-white mb-2">
            Laundry <span className="text-[#38BDF8]">Management System</span>
          </Link>
          <p className="text-center text-white/40 mb-8 text-sm">Set a password to accept your staff invite.</p>

          {success ? (
            <div className="rounded-xl border border-[#38BDF8]/30 bg-[#38BDF8]/10 p-6 text-center">
              <CircleCheck className="mx-auto mb-2 h-8 w-8 text-[#38BDF8]" aria-hidden />
              <p className="text-[#38BDF8] font-medium">Password set</p>
              <p className="text-white/60 text-sm mt-2">Taking you to your dashboard…</p>
            </div>
          ) : expired && !ready ? (
            <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-6 text-center">
              <p className="text-amber-200 font-medium">This invite link is invalid or has expired.</p>
              <p className="text-white/60 text-sm mt-2">Ask your business owner to send a new invite.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6">
              <label className="block">
                <span className="text-sm text-white/60">Password</span>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="8+ characters"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-[#38BDF8] focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-sm text-white/60">Confirm password</span>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-[#38BDF8] focus:outline-none"
                />
              </label>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={pending || !ready}
                className="w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] py-2.5 font-semibold text-white hover:brightness-110 disabled:opacity-50 transition-all"
              >
                {!ready ? 'Verifying invite link…' : pending ? 'Setting password…' : 'Set password & continue'}
              </button>
            </form>
          )}
        </div>
      </main>
      <AuthFooter />
    </div>
  )
}
