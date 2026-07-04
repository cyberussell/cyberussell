import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Clinic, Conversation, ConversationState, Service, Slot } from './types'
import { getAvailableSlots, bookAppointment, formatSlotLabel } from './slots'
import { sendText, sendButtons, sendQuickReplies } from './messenger'
import { parseIntent } from './ai'
import { logEvent } from './events'

// Flow: menu → choosing_service → choosing_slot → (known patient? book)
//       → collecting_name → collecting_phone → book → confirmation.
// Buttons handle ~80% of traffic for free; Haiku catches free text.

interface Incoming {
  text?: string
  payload?: string // postback / quick reply payload
}

export async function handleIncoming(
  db: SupabaseClient,
  clinic: Clinic,
  pageToken: string,
  psid: string,
  incoming: Incoming
): Promise<void> {
  const convo = await getOrCreateConversation(db, clinic.id, psid)
  await logEvent(db, clinic.id, 'message_in', {
    psid,
    text: incoming.text ?? null,
    payload: incoming.payload ?? null,
  })

  // Human mode: bot stays silent until staff hands back or 12h pass.
  if (convo.mode === 'human') {
    const idleMs = Date.now() - new Date(convo.last_message_at).getTime()
    if (incoming.payload !== 'BOT_RESUME' && idleMs < 12 * 3600_000) {
      await touchConversation(db, convo.id)
      return
    }
    await setMode(db, convo.id, 'bot')
  }

  if (incoming.payload) {
    await handlePayload(db, clinic, pageToken, psid, convo, incoming.payload)
  } else if (incoming.text) {
    await handleText(db, clinic, pageToken, psid, convo, incoming.text)
  }
}

// ── Payload (button/quick-reply) routing — zero AI cost ─────────────────────

async function handlePayload(
  db: SupabaseClient,
  clinic: Clinic,
  pageToken: string,
  psid: string,
  convo: Conversation,
  payload: string
): Promise<void> {
  if (payload === 'GET_STARTED' || payload === 'MAIN_MENU') {
    return showMainMenu(db, clinic, pageToken, psid, convo)
  }
  if (payload === 'BOOK') {
    return showServices(db, clinic, pageToken, psid, convo)
  }
  if (payload === 'TALK_HUMAN') {
    return handoffToHuman(db, clinic, pageToken, psid, convo)
  }
  if (payload === 'ASK') {
    await setState(db, convo.id, { step: 'idle' })
    await sendText(pageToken, psid, 'Sige po! Type your question — price, location, schedule, anything. 😊')
    return
  }
  if (payload.startsWith('SERVICE_')) {
    const serviceId = payload.slice('SERVICE_'.length)
    return showSlots(db, clinic, pageToken, psid, convo, serviceId)
  }
  if (payload.startsWith('SLOT_')) {
    // SLOT_{staffId}_{epochMs}
    const rest = payload.slice('SLOT_'.length)
    const sep = rest.indexOf('_')
    const staffId = rest.slice(0, sep)
    const startsAt = new Date(Number(rest.slice(sep + 1))).toISOString()
    return onSlotChosen(db, clinic, pageToken, psid, convo, staffId, startsAt)
  }
  // Unknown payload → menu
  return showMainMenu(db, clinic, pageToken, psid, convo)
}

// ── Free-text routing ────────────────────────────────────────────────────────

async function handleText(
  db: SupabaseClient,
  clinic: Clinic,
  pageToken: string,
  psid: string,
  convo: Conversation,
  text: string
): Promise<void> {
  const state = convo.state

  if (state.step === 'collecting_name') {
    const name = text.trim().slice(0, 80)
    if (name.length < 2) {
      await sendText(pageToken, psid, 'Pakitype po ang buong pangalan ninyo. 🙂')
      return
    }
    await setState(db, convo.id, { ...state, step: 'collecting_phone', patientName: name })
    await sendText(pageToken, psid, `Thanks, ${name}! Ano po ang mobile number ninyo? (e.g. 09171234567)`)
    return
  }

  if (state.step === 'collecting_phone') {
    const phone = text.replace(/[^\d+]/g, '')
    if (phone.length < 10) {
      await sendText(pageToken, psid, 'Mukhang kulang po ang number — pakitype ulit (e.g. 09171234567).')
      return
    }
    return finalizeBooking(db, clinic, pageToken, psid, convo, {
      ...state,
      patientPhone: phone,
    } as ConversationState & { patientName?: string; patientPhone?: string })
  }

  // Everything else: cheap AI classification, then back into the button flow.
  const services = await getActiveServices(db, clinic.id)
  const result = await parseIntent(clinic, services, text)

  if (result) {
    const { parsed, usage } = result
    await logEvent(db, clinic.id, 'ai_call', { psid, usage, intent: parsed.intent })

    // Free-text symptom descriptions become the doctor's intake note.
    if (parsed.intake_note) {
      await setState(db, convo.id, { ...state, intakeNote: parsed.intake_note })
      convo.state = { ...state, intakeNote: parsed.intake_note }
    }

    switch (parsed.intent) {
      case 'book': {
        const match = parsed.service_name ? matchService(services, parsed.service_name) : null
        if (match) return showSlots(db, clinic, pageToken, psid, convo, match.id)
        return showServices(db, clinic, pageToken, psid, convo)
      }
      case 'question': {
        if (parsed.answer) {
          await sendText(pageToken, psid, parsed.answer)
          await sendButtons(pageToken, psid, 'May iba pa po ba kayong kailangan?', [
            { title: '📅 Book appointment', payload: 'BOOK' },
            { title: '💬 Talk to staff', payload: 'TALK_HUMAN' },
          ])
          return
        }
        return handoffToHuman(db, clinic, pageToken, psid, convo)
      }
      case 'human':
        return handoffToHuman(db, clinic, pageToken, psid, convo)
      case 'cancel':
        // v1: cancellations go to staff.
        return handoffToHuman(
          db,
          clinic,
          pageToken,
          psid,
          convo,
          'Sige po, ipapasa ko kayo sa staff namin para ma-ayos ang appointment ninyo. 🙏'
        )
      case 'greeting':
      case 'other':
        return showMainMenu(db, clinic, pageToken, psid, convo)
    }
  }

  // AI unavailable → the flow still works via buttons.
  return showMainMenu(db, clinic, pageToken, psid, convo)
}

// ── Flow steps ───────────────────────────────────────────────────────────────

async function showMainMenu(
  db: SupabaseClient,
  clinic: Clinic,
  pageToken: string,
  psid: string,
  convo: Conversation
): Promise<void> {
  await setState(db, convo.id, { step: 'idle', intakeNote: convo.state.intakeNote })
  await sendButtons(pageToken, psid, `Hi! 👋 Welcome to ${clinic.name}. Paano po kami makakatulong?`, [
    { title: '📅 Book appointment', payload: 'BOOK' },
    { title: '❓ Ask a question', payload: 'ASK' },
    { title: '💬 Talk to staff', payload: 'TALK_HUMAN' },
  ])
}

async function showServices(
  db: SupabaseClient,
  clinic: Clinic,
  pageToken: string,
  psid: string,
  convo: Conversation
): Promise<void> {
  const services = await getActiveServices(db, clinic.id)
  if (services.length === 0) {
    await sendText(pageToken, psid, 'Wala pa pong naka-setup na services. Message na lang po kayo ulit mamaya!')
    return
  }
  await setState(db, convo.id, { ...convo.state, step: 'choosing_service' })
  await sendQuickReplies(
    pageToken,
    psid,
    'Anong service po ang kailangan ninyo?',
    services.slice(0, 12).map((s) => ({
      title: `${s.name} ₱${Number(s.price).toFixed(0)}`.slice(0, 20),
      payload: `SERVICE_${s.id}`,
    }))
  )
}

async function showSlots(
  db: SupabaseClient,
  clinic: Clinic,
  pageToken: string,
  psid: string,
  convo: Conversation,
  serviceId: string
): Promise<void> {
  const slots = await getAvailableSlots(db, {
    clinicId: clinic.id,
    timezone: clinic.timezone,
    serviceId,
    days: 7,
    limit: 8,
  })
  if (slots.length === 0) {
    await sendText(pageToken, psid, 'Pasensya na po, fully booked kami this week. 😔')
    await sendButtons(pageToken, psid, 'Gusto niyo po bang makausap ang staff namin?', [
      { title: '💬 Talk to staff', payload: 'TALK_HUMAN' },
      { title: '🔙 Main menu', payload: 'MAIN_MENU' },
    ])
    return
  }
  await setState(db, convo.id, { ...convo.state, step: 'choosing_slot', serviceId })
  await sendQuickReplies(
    pageToken,
    psid,
    'Eto po ang mga available na schedule — pili lang po: 🗓️',
    slots.map((s: Slot) => ({
      title: s.label.slice(0, 20),
      payload: `SLOT_${s.staffId}_${new Date(s.startsAt).getTime()}`,
    }))
  )
}

async function onSlotChosen(
  db: SupabaseClient,
  clinic: Clinic,
  pageToken: string,
  psid: string,
  convo: Conversation,
  staffId: string,
  startsAt: string
): Promise<void> {
  const state: ConversationState = { ...convo.state, slotStart: startsAt, slotStaffId: staffId }

  // Returning patients are recognized by PSID — no re-typing details.
  const { data: patient } = await db
    .from('patients')
    .select('id, full_name, phone')
    .eq('clinic_id', clinic.id)
    .eq('messenger_psid', psid)
    .maybeSingle()

  if (patient?.full_name && patient.phone) {
    return finalizeBooking(db, clinic, pageToken, psid, convo, {
      ...state,
      patientName: patient.full_name,
      patientPhone: patient.phone,
    } as ConversationState)
  }

  await setState(db, convo.id, { ...state, step: 'collecting_name' })
  await sendText(pageToken, psid, 'Almost done! 🙌 Ano po ang buong pangalan ninyo?')
}

async function finalizeBooking(
  db: SupabaseClient,
  clinic: Clinic,
  pageToken: string,
  psid: string,
  convo: Conversation,
  state: ConversationState & { patientName?: string; patientPhone?: string }
): Promise<void> {
  if (!state.serviceId || !state.slotStart || !state.slotStaffId) {
    await setState(db, convo.id, { step: 'idle' })
    return showServices(db, clinic, pageToken, psid, convo)
  }

  const result = await bookAppointment(db, {
    clinicId: clinic.id,
    serviceId: state.serviceId,
    staffId: state.slotStaffId,
    startsAt: state.slotStart,
    patient: {
      fullName: state.patientName ?? '',
      phone: state.patientPhone ?? '',
      messengerPsid: psid,
    },
    source: 'messenger',
    intakeNote: state.intakeNote,
  })

  if (!result.ok) {
    if (result.reason === 'conflict') {
      await sendText(pageToken, psid, 'Ay, kakakuha lang po ng slot na iyon. 😅 Eto po ang iba pang available:')
      return showSlots(db, clinic, pageToken, psid, convo, state.serviceId)
    }
    await logEvent(db, clinic.id, 'booking_failed', { psid, message: result.message })
    await sendText(pageToken, psid, 'May problema po sa booking. Pakisubukan ulit, o i-tap ang "Talk to staff".')
    return
  }

  const { data: service } = await db.from('services').select('name').eq('id', state.serviceId).single()
  const label = formatSlotLabel(state.slotStart, clinic.timezone)
  await setState(db, convo.id, { step: 'idle' })
  await logEvent(db, clinic.id, 'booking_created', {
    psid,
    appointment_id: result.appointmentId,
    source: 'messenger',
  })
  await sendText(
    pageToken,
    psid,
    `Booked na po! ✅\n\n${service?.name ?? 'Appointment'}\n🗓️ ${label}\n📍 ${clinic.name}${clinic.address ? `, ${clinic.address}` : ''}\n\nSee you po! Magre-remind kami bago ang schedule ninyo.`
  )
}

async function handoffToHuman(
  db: SupabaseClient,
  clinic: Clinic,
  pageToken: string,
  psid: string,
  convo: Conversation,
  customMessage?: string
): Promise<void> {
  await setMode(db, convo.id, 'human')
  await logEvent(db, clinic.id, 'handoff_to_human', { psid })
  await sendText(
    pageToken,
    psid,
    customMessage ??
      'Sige po! Ipapasa ko kayo sa staff namin — reply po sila dito sa chat na ito as soon as possible. 🙏'
  )
}

// ── Small helpers ────────────────────────────────────────────────────────────

async function getOrCreateConversation(db: SupabaseClient, clinicId: string, psid: string): Promise<Conversation> {
  const { data } = await db
    .from('conversations')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('psid', psid)
    .maybeSingle()
  if (data) return data as Conversation
  const { data: created, error } = await db
    .from('conversations')
    .insert({ clinic_id: clinicId, psid })
    .select('*')
    .single()
  if (error || !created) throw new Error(`conversation insert failed: ${error?.message}`)
  return created as Conversation
}

async function setState(db: SupabaseClient, convoId: string, state: ConversationState) {
  await db
    .from('conversations')
    .update({ state, last_message_at: new Date().toISOString() })
    .eq('id', convoId)
}

async function setMode(db: SupabaseClient, convoId: string, mode: 'bot' | 'human') {
  await db
    .from('conversations')
    .update({ mode, last_message_at: new Date().toISOString() })
    .eq('id', convoId)
}

async function touchConversation(db: SupabaseClient, convoId: string) {
  await db.from('conversations').update({ last_message_at: new Date().toISOString() }).eq('id', convoId)
}

async function getActiveServices(db: SupabaseClient, clinicId: string): Promise<Service[]> {
  const { data } = await db
    .from('services')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('active', true)
    .order('created_at')
  return (data ?? []) as Service[]
}

function matchService(services: Service[], guess: string): Service | null {
  const g = guess.toLowerCase()
  return (
    services.find((s) => s.name.toLowerCase() === g) ??
    services.find((s) => s.name.toLowerCase().includes(g) || g.includes(s.name.toLowerCase())) ??
    null
  )
}
