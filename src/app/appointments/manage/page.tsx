import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

async function findBooking(formData: FormData) {
  'use server'
  const code = String(formData.get('code') ?? '').trim().toUpperCase()
  if (code) redirect(`/appointments/manage/${code}`)
}

export default function ManageEntryPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
        <h1 className="text-center text-xl font-bold">Manage your booking</h1>
        <p className="mt-1.5 text-center text-sm text-slate-400">
          Enter the reference code from your booking confirmation.
        </p>
        <form action={findBooking} className="mt-6 space-y-4">
          <input
            name="code"
            required
            placeholder="e.g. 482913"
            className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-center font-mono text-lg tracking-widest text-white placeholder:text-slate-500 focus:border-emerald-400/50 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Find my booking
          </button>
        </form>
      </div>
    </main>
  )
}
