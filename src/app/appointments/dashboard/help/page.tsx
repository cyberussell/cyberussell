import Link from 'next/link'
import { requireClinic } from '@/lib/booklypro/auth'

export const dynamic = 'force-dynamic'

export default async function HelpPage() {
  const { clinic } = await requireClinic()

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Help</h1>
        <p className="text-slate-400 text-sm mt-1">
          Everything you need to get your clinic fully set up.
        </p>
      </div>

      <HelpCard title="🚀 Quick start checklist" defaultOpen>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Services</strong> — add what patients can book (name, duration, price).
          </li>
          <li>
            <strong>Staff</strong> — add your doctors/practitioners.
          </li>
          <li>
            <strong>Availability</strong> — set each staff member&apos;s working hours. Open slots
            are computed from these.
          </li>
          <li>
            <strong>Test it</strong> — open your public page{' '}
            <Link href={`/appointments/${clinic.slug}`} className="text-emerald-400 underline">
              /appointments/{clinic.slug}
            </Link>{' '}
            and book a test appointment.
          </li>
          <li>
            <strong>Connect Facebook</strong> — so patients can book by messaging your Page (guide
            below).
          </li>
        </ol>
      </HelpCard>

      <HelpCard title="💬 How do I connect my Facebook Page?">
        <p>
          During early access, we connect your Page <strong>together with you</strong> — it takes
          about 15 minutes on a video call or chat. Here&apos;s what happens:
        </p>
        <ol className="list-decimal list-inside space-y-2 mt-3">
          <li>
            You tell us your <strong>Facebook Page name/link</strong> via the{' '}
            <Link href="/contact" className="text-emerald-400 underline">
              contact page
            </Link>
            .
          </li>
          <li>
            We send you a <strong>tester invite</strong> from our Meta app — you accept it with the
            Facebook account that admins your Page.
          </li>
          <li>
            We generate your <strong>Page ID</strong> and <strong>Page Access Token</strong> with
            you, and you paste them in{' '}
            <Link href="/appointments/dashboard/settings" className="text-emerald-400 underline">
              Settings → Facebook Page connection
            </Link>
            .
          </li>
          <li>
            You message your own Page to test — the bot should greet you with the booking menu. 🎉
          </li>
        </ol>
        <p className="mt-3 text-slate-400">
          Requirements: you must be an <strong>admin</strong> of the Facebook Page, and the Page
          must allow messaging.
        </p>
      </HelpCard>

      <HelpCard title="🤖 What does the Messenger bot do?">
        <ul className="list-disc list-inside space-y-2">
          <li>Greets patients who message your Page and shows booking buttons.</li>
          <li>Shows only real open slots (your staff hours minus booked appointments).</li>
          <li>Understands free text in English, Tagalog, or Taglish — &ldquo;pwede ba bukas hapon?&rdquo; works.</li>
          <li>Saves symptoms patients mention as intake notes for the doctor.</li>
          <li>
            Hands over to you when a patient asks for a person — reply in your normal{' '}
            <strong>Page inbox</strong>, then press &ldquo;Hand back to bot&rdquo; in{' '}
            <Link href="/appointments/dashboard/conversations" className="text-emerald-400 underline">
              Conversations
            </Link>
            .
          </li>
        </ul>
      </HelpCard>

      <HelpCard title="🚪 How do I close the clinic temporarily?">
        <p>
          Go to{' '}
          <Link href="/appointments/dashboard/settings" className="text-emerald-400 underline">
            Settings → Clinic status
          </Link>
          , tick &ldquo;Clinic is temporarily closed&rdquo;, and write the message patients should
          see (e.g. &ldquo;Closed for the holidays, back January 3&rdquo;). The Messenger bot and
          your public booking page will show that message and stop taking bookings until you reopen.
        </p>
      </HelpCard>

      <HelpCard title="📅 How do I add a walk-in or phone booking?">
        <p>
          Open{' '}
          <Link href="/appointments/dashboard/appointments" className="text-emerald-400 underline">
            Appointments
          </Link>{' '}
          and use the &ldquo;Add appointment (walk-in / phone)&rdquo; form under the calendar. To
          move an appointment, press <strong>Reschedule</strong> on any booking. The system blocks
          double-booking the same staff member automatically.
        </p>
      </HelpCard>

      <HelpCard title="💳 Billing & plans">
        <p>
          Your plan and payment instructions are in{' '}
          <Link href="/appointments/dashboard/settings" className="text-emerald-400 underline">
            Settings → Billing
          </Link>
          . We accept GCash and bank transfer; your account activates within 24 hours of payment.
          Plans: Basic ₱999 · Pro ₱1,999 · Premium ₱3,499 per month.
        </p>
      </HelpCard>

      <HelpCard title="🙋 Something else?">
        <p>
          Message us through the{' '}
          <Link href="/contact" className="text-emerald-400 underline">
            contact page
          </Link>{' '}
          — include your clinic name (<strong>{clinic.name}</strong>) so we can help faster.
        </p>
      </HelpCard>
    </div>
  )
}

function HelpCard({
  title,
  children,
  defaultOpen,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  return (
    <details
      className="group rounded-xl border border-slate-800 bg-slate-900 open:border-emerald-500/30"
      open={defaultOpen}
    >
      <summary className="cursor-pointer select-none px-5 py-4 font-semibold text-slate-200 hover:text-emerald-300 transition list-none flex items-center justify-between">
        {title}
        <span className="text-slate-500 group-open:rotate-90 transition-transform">›</span>
      </summary>
      <div className="px-5 pb-5 text-sm text-slate-300 space-y-2">{children}</div>
    </details>
  )
}
