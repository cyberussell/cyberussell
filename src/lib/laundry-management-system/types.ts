export type UserRole = 'owner' | 'staff' | 'customer'
export type PlanTier = 'essential' | 'professional'
export type PlanStatus = 'trial' | 'active' | 'suspended'

export interface Profile {
  id: string
  role: UserRole
  full_name: string
  phone: string
  created_at: string
}

export interface Business {
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
  settings: Record<string, unknown>
  created_at: string
}

export interface Branch {
  id: string
  business_id: string
  name: string
  address: string
  phone: string
  active: boolean
  created_at: string
}

export interface StaffMember {
  id: string
  business_id: string
  branch_id: string | null
  profile_id: string
  title: string
  active: boolean
  created_at: string
}

export interface Customer {
  id: string
  business_id: string
  profile_id: string | null
  full_name: string
  phone: string
  email: string
  notes: string
  created_at: string
}
