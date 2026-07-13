import LoginForm from '@/components/territory-management-system/LoginForm'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams
  return <LoginForm notProvisioned={params.error === 'not_provisioned'} />
}
