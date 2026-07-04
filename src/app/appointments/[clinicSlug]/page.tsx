import { notFound } from 'next/navigation'
import { createAdminSupabase } from '@/lib/booklypro/supabase-server'
import type { Clinic, Service } from '@/lib/booklypro/types'
import BookingWidget from '@/components/booklypro/BookingWidget'

export const dynamic = 'force-dynamic'

// Public clinic page: Messenger is the primary CTA; the web form is the
// fallback for patients arriving from Google instead of Facebook.
export default async function ClinicPublicPage({
  params,
}: {
  params: Promise<{ clinicSlug: string }>
}) {
  const { clinicSlug } = await params
  const db = createAdminSupabase()

  const { data: clinicRow } = await db.from('clinics').select('*').eq('slug', clinicSlug).maybeSingle()
  if (!clinicRow) notFound()
  const clinic = clinicRow as Clinic
  if (clinic.plan_status === 'suspended') notFound()

  const { data: services } = await db
    .from('services')
    .select('*')
    .eq('clinic_id', clinic.id)
    .eq('active', true)
    .order('created_at')

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-2xl px-4 py-14">
        <header className="text-center">
          <h1 className="text-3xl font-bold">{clinic.name}</h1>
          {clinic.address && <p className="mt-2 text-slate-400">{clinic.address}</p>}
          {clinic.phone && <p className="text-slate-400">{clinic.phone}</p>}
        </header>

        {clinic.fb_page_id && (
          <a
            href={`https://m.me/${clinic.fb_page_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 block rounded-xl bg-emerald-500 py-3 text-center font-semibold text-slate-950 hover:bg-emerald-400 transition"
          >
            💬 Message us on Facebook to book
          </a>
        )}

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-center text-slate-300">
            {clinic.fb_page_id ? 'Or book here on the web' : 'Book an appointment'}
          </h2>
          <div className="mt-4">
            <BookingWidget clinicSlug={clinic.slug} services={(services ?? []) as Service[]} />
          </div>
        </div>

        <footer className="mt-14 text-center text-xs text-slate-600">
          Powered by <span className="text-slate-400">BooklyPro</span>
        </footer>
      </div>
    </main>
  )
}
