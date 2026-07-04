import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Appointment System — Messenger Booking for Philippine Clinics',
  description:
    'Your clinic\'s Facebook Page answers instantly and books appointments by itself. AI receptionist in English at Tagalog, built for PH clinics.',
}

const TIERS = [
  {
    name: 'Basic',
    price: '₱999',
    blurb: 'The booking system',
    features: [
      'Messenger booking bot (buttons)',
      'Public web booking page',
      'Appointment dashboard',
      'Up to 300 AI conversations / mo',
    ],
  },
  {
    name: 'Pro',
    price: '₱1,999',
    blurb: 'The AI receptionist',
    highlight: true,
    features: [
      'Everything in Basic',
      'AI answers free-text questions (Taglish)',
      'Patient intake notes for the doctor',
      'Up to 1,500 AI conversations / mo',
    ],
  },
  {
    name: 'Premium',
    price: '₱3,499',
    blurb: 'The growth engine',
    features: [
      'Everything in Pro',
      'Priority support & onboarding',
      'Recall & reactivation campaigns (soon)',
      'Unlimited AI conversations (fair use)',
    ],
  },
]

export default function AppointmentSystemLanding() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pt-20 pb-16 text-center">
        <p className="text-sm font-semibold tracking-widest text-emerald-400 uppercase">Appointment System</p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight">
          Your clinic&apos;s Facebook Page,
          <br />
          <span className="text-emerald-400">answering and booking by itself.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          Patients already message your Page asking &ldquo;open ba kayo?&rdquo; — our AI receptionist
          replies instantly, shows real available slots, and books the appointment. In English, Tagalog, or
          Taglish. No app for patients to install.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/appointments/signup"
            className="rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-slate-950 hover:bg-emerald-400 transition"
          >
            Start free 14-day trial
          </Link>
          <Link
            href="/demo/appointment-system"
            className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-slate-200 hover:border-emerald-400 transition"
          >
            See the concept demo
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold">How patients book</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              step: '1',
              title: 'Patient messages your Page',
              body: '“Hi po, pa book” — same as they do today. Nothing new to learn.',
            },
            {
              step: '2',
              title: 'Bot shows real slots',
              body: 'Tap a service, tap a time. Free-text like “pwede ba bukas hapon?” is understood by AI.',
            },
            {
              step: '3',
              title: 'Booked + reminded',
              body: 'Instant confirmation in the same chat, and a reminder before the visit. You see it all in your dashboard.',
            },
          ].map((s) => (
            <div key={s.step} className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300 font-bold">
                {s.step}
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold">Simple monthly pricing</h2>
        <p className="mt-2 text-center text-slate-400 text-sm">
          14-day free trial on every plan. Cancel anytime.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl border p-6 ${
                tier.highlight
                  ? 'border-emerald-400 bg-emerald-500/5'
                  : 'border-slate-800 bg-slate-900'
              }`}
            >
              <h3 className="font-bold text-lg">{tier.name}</h3>
              <p className="text-sm text-slate-400">{tier.blurb}</p>
              <p className="mt-4 text-3xl font-bold">
                {tier.price}
                <span className="text-sm font-normal text-slate-400">/mo</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-emerald-400">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/appointments/signup"
                className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-semibold transition ${
                  tier.highlight
                    ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                    : 'border border-slate-700 text-slate-200 hover:border-emerald-400'
                }`}
              >
                Start free trial
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        Appointment System · Built by{' '}
        <Link href="/" className="text-slate-300 hover:text-emerald-300">
          Cyberussell
        </Link>
      </footer>
    </main>
  )
}
