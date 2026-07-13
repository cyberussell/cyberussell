import PageHeader from '@/components/laundry-management-system/dashboard/PageHeader'
import AddCustomerForm from '@/components/laundry-management-system/dashboard/AddCustomerForm'

export default function NewCustomerPage() {
  return (
    <div>
      <PageHeader title="Add Customer" subtitle="Add a customer to your business's records." />
      <AddCustomerForm />
    </div>
  )
}
