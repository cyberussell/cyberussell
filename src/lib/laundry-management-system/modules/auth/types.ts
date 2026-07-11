export type UserRole = 'owner' | 'staff' | 'customer'

export interface Profile {
  id: string
  role: UserRole
  full_name: string
  phone: string
  created_at: string
}
