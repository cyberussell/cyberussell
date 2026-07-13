export type UserRole = 'admin' | 'group_leader'

export interface Profile {
  id: string
  role: UserRole
  congregation_id: string | null
  full_name: string
  created_at: string
}
