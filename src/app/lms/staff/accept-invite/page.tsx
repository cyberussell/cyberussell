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
    // Read the raw hash before creating the Supabase client — the client's own (failed) attempt
    // to auto-process this same URL shouldn't be relied on to leave it untouched.
    const hashParams = new URLSearchParams(window.location.hash.slice(1))
    const accessToken = hashParams.get('access_token')
    const refreshToken = hashParams.get('refresh_token')

    const supabase = createBrowserSupabase()

    // A staff invite (admin.inviteUserByEmail) is *always* an implicit-flow link —
    // `#access_token=...&refresh_token=...&type=invite` in the hash — because Supabase's own
    // SDK documents PKCE as unsupported for invites (the browser that requests an invite and
    // the one that accepts it are different, breaking PKCE's security model). @supabase/ssr
    // hardcodes `flowType: 'pkce'` on every client it creates with no way to override it, so its
    // own internal URL auto-detection throws on this URL shape and silently swallows the
    // session — neither PASSWORD_RECOVERY nor SIGNED_IN ever fires, no matter how long you wait
    // (confirmed by reading @supabase/ssr and @supabase/auth-js's own source, not guessed — see
    // docs/checkpoints/territory-management-invite-flow-map-recovery-field-rename-v1.md for the
    // full root-cause writeup, originally diagnosed for TMS's identical set-password page).
    // Worked around by parsing the hash ourselves and calling setSession() directly, which
    // doesn't go through that broken auto-detection path at all.
    if (accessToken && refreshToken) {
      supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken }).then(({ error: sessionError }) => {
        if (!sessionError) {
          readyRef.current = true
          setReady(true)
          // Drop the tokens from the visible URL/browser history now that they're consumed.
          window.history.replaceState(null, '', window.location.pathname)
        }
      })
    }

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
    // 8s, not 4 — a slow connection's auth event can genuinely take a few
    // seconds to arrive, and 4s was long enough to flash a scary "invalid or
    // expired" message for a link that was actually still fine (the UI
    // self-corrects once `ready` does fire, but that flicker alone could
    // make someone abandon a working invite).
    const timeout = setTimeout(() => {
      if (!readyRef.current) setExpired(true)
    }, 8000)
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
            Laundry <span className="text-[#22D3EE]">Management System</span>
          </Link>
          <p className="text-center text-white/40 mb-8 text-sm">Set a password to accept your staff invite.</p>

          {success ? (
            <div className="rounded-xl border border-[#22D3EE]/30 bg-[#22D3EE]/10 p-6 text-center">
              <CircleCheck className="mx-auto mb-2 h-8 w-8 text-[#22D3EE]" aria-hidden />
              <p className="text-[#22D3EE] font-medium">Password set</p>
              <p className="text-white/60 text-sm mt-2">Taking you to your dashboard…</p>
            </div>
          ) : expired && !ready ? (
            <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-6 text-center">
              <p className="text-amber-200 font-medium">This invite link is invalid or has expired.</p>
              <p className="text-white/60 text-sm mt-2">Ask your business owner to send a new invite.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
              <label className="block">
                <span className="text-sm text-white/60">Password</span>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="8+ characters"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-[#22D3EE] focus:outline-none"
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
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-[#22D3EE] focus:outline-none"
                />
              </label>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={pending || !ready}
                className="w-full rounded-full bg-gradient-to-r from-[#0D9488] to-[#22D3EE] py-2.5 font-semibold text-white hover:brightness-110 disabled:opacity-50 transition-all"
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
