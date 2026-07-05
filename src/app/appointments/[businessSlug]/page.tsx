import { notFound } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import { createAdminSupabase } from '@/lib/appointment-system/supabase-server'
import type { Business, Service } from '@/lib/appointment-system/types'
import { getTerms } from '@/lib/appointment-system/terminology'
import BookingWidget from '@/components/appointment-system/BookingWidget'

export const dynamic = 'force-dynamic'

// Public business page: Messenger is the primary CTA; the web form is the
// fallback for clients arriving from Google instead of Facebook.
export default async function BusinessPublicPage({
  params,
}: {
  params: Promise<{ businessSlug: string }>
}) {
  const { businessSlug } = await params
  const db = createAdminSupabase()

  const { data: businessRow } = await db.from('businesses').select('*').eq('slug', businessSlug).maybeSingle()
  if (!businessRow) notFound()
  const business = businessRow as Business
  if (business.plan_status === 'suspended') notFound()

  const { data: services } = await db
    .from('services')
    .select('*')
    .eq('business_id', business.id)
    .eq('active', true)
    .order('created_at')

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-2xl px-4 py-14">
        <header className="text-center">
          <h1 className="text-3xl font-bold">{business.name}</h1>
          {business.address && <p className="mt-2 text-slate-400">{business.address}</p>}
          {business.phone && <p className="text-slate-400">{business.phone}</p>}
        </header>

        {(business.settings as { closed?: boolean }).closed && (
          <div className="mt-8 rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 text-center">
            <p className="font-semibold text-amber-300">Temporarily closed</p>
            <p className="mt-1 text-sm text-slate-300">
              {(business.settings as { closed_message?: string }).closed_message ||
                'Online booking is paused for now — please check back soon.'}
            </p>
          </div>
        )}

        {business.fb_page_id && (
          <a
            href={`https://m.me/${business.fb_page_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-center font-semibold text-slate-950 hover:bg-emerald-400 transition"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Message us on Facebook to book
          </a>
        )}

        {!(business.settings as { closed?: boolean }).closed && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-center text-slate-300">
              {business.fb_page_id ? 'Or book here on the web' : 'Book an appointment'}
            </h2>
            <div className="mt-4">
              <BookingWidget businessSlug={business.slug} businessNoun={getTerms(business.business_type).business} services={(services ?? []) as Service[]} />
            </div>
          </div>
        )}

        <footer className="mt-14 text-center text-xs text-slate-600">
          Powered by <span className="text-slate-400">Cyberussell Appointment System</span>
        </footer>
      </div>
    </main>
  )
}
