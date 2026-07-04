export type PlanTier = 'basic' | 'pro' | 'premium'
export type PlanStatus = 'trial' | 'active' | 'suspended'
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
export type AppointmentSource = 'messenger' | 'web' | 'manual'

export interface Clinic {
  id: string
  owner_id: string
  name: string
  slug: string
  phone: string
  address: string
  timezone: string
  plan_tier: PlanTier
  plan_status: PlanStatus
  trial_ends_at: string
  fb_page_id: string | null
  settings: Record<string, unknown>
  created_at: string
}

export interface Staff {
  id: string
  clinic_id: string
  name: string
  title: string
  active: boolean
  created_at: string
}

export interface Service {
  id: string
  clinic_id: string
  name: string
  duration_min: number
  price: number
  active: boolean
  metadata: Record<string, unknown>
  created_at: string
}

export interface Availability {
  id: string
  clinic_id: string
  staff_id: string
  day_of_week: number
  start_time: string
  end_time: string
}

export interface Patient {
  id: string
  clinic_id: string
  full_name: string
  phone: string
  messenger_psid: string | null
  notes: string
  metadata: Record<string, unknown>
  created_at: string
}

export interface Appointment {
  id: string
  clinic_id: string
  patient_id: string
  staff_id: string
  service_id: string
  starts_at: string
  ends_at: string
  status: AppointmentStatus
  source: AppointmentSource
  intake_note: string
  amount_paid: number
  paid_at: string | null
  created_at: string
}

export type FlowStep =
  | 'idle'
  | 'choosing_service'
  | 'choosing_slot'
  | 'collecting_name'
  | 'collecting_phone'

export interface ConversationState {
  step: FlowStep
  serviceId?: string
  slotStart?: string
  slotStaffId?: string
  intakeNote?: string
  [key: string]: unknown
}

export interface Conversation {
  id: string
  clinic_id: string
  psid: string
  state: ConversationState
  mode: 'bot' | 'human'
  last_message_at: string
}

export interface Slot {
  startsAt: string // ISO
  endsAt: string // ISO
  staffId: string
  staffName: string
  label: string // human label in clinic timezone, e.g. "Tue Jul 7, 2:00 PM"
}
