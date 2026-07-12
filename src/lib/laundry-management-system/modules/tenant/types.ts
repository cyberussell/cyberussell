export type PlanTier = 'essential' | 'professional'
export type PlanStatus = 'trial' | 'active' | 'suspended'

export interface Business {
  id: string
  owner_id: string
  name: string
  slug: string
  phone: string
  address: string
  timezone: string
  currency: string
  plan_tier: PlanTier
  plan_status: PlanStatus
  trial_ends_at: string
  settings: Record<string, unknown>
  logo_url: string | null
  created_at: string
}

export interface DayHours {
  closed: boolean
  open: string
  close: string
}

export type BusinessHours = Record<
  'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun',
  DayHours
>

export interface Branch {
  id: string
  business_id: string
  name: string
  address: string
  phone: string
  business_hours: Partial<BusinessHours>
  active: boolean
  created_at: string
}
