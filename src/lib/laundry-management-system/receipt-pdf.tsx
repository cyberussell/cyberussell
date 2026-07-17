import 'server-only'
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer'
import type { Business } from './modules/tenant/types'
import type { OrderWithRelations } from './modules/orders/types'
import { groupOrderItems } from './modules/orders/queries'
import { formatCurrency } from './format'

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 11, color: '#0B1B33' },
  logo: { width: 48, height: 48, marginBottom: 8, alignSelf: 'center', borderRadius: 8 },
  businessName: { fontSize: 14, fontWeight: 700, textAlign: 'center' },
  muted: { fontSize: 9, color: '#64748B', textAlign: 'center' },
  divider: { borderTopWidth: 1, borderTopColor: '#CBD5E1', borderTopStyle: 'dashed', marginVertical: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  sectionLabel: { fontSize: 9, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 4, marginTop: 4 },
  label: { color: '#64748B' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#CBD5E1', borderTopStyle: 'dashed' },
  totalLabel: { fontSize: 13, fontWeight: 700 },
  qr: { width: 90, height: 90, alignSelf: 'center', marginTop: 16 },
  footer: { marginTop: 12, fontSize: 9, color: '#94A3B8', textAlign: 'center' },
})

export function ReceiptDocument({
  business,
  order,
  qrDataUrl,
}: {
  business: Business
  order: OrderWithRelations
  qrDataUrl: string
}) {
  const { services, addons } = groupOrderItems(order.items)
  return (
    <Document>
      <Page size="A6" style={styles.page}>
        {business.logo_url && <Image src={business.logo_url} style={styles.logo} />}
        <Text style={styles.businessName}>{business.name}</Text>
        {business.address && <Text style={styles.muted}>{business.address}</Text>}
        {business.phone && <Text style={styles.muted}>{business.phone}</Text>}

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Order #</Text>
          <Text>{order.order_number}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          <Text>{new Date(order.created_at).toLocaleString('en-US')}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Customer</Text>
          <Text>{order.customer?.full_name || order.walk_in_name || 'Walk-in customer'}</Text>
        </View>
        {order.items.length > 0 ? (
          <>
            {services.length > 0 && (
              <>
                <Text style={styles.sectionLabel}>Services</Text>
                {services.map((item) => (
                  <View style={styles.row} key={item.id}>
                    <Text style={styles.label}>
                      {item.name} × {item.quantity}
                    </Text>
                    <Text>{formatCurrency(item.line_total, business.currency)}</Text>
                  </View>
                ))}
              </>
            )}
            {addons.length > 0 && (
              <>
                <Text style={styles.sectionLabel}>Add-ons</Text>
                {addons.map((item) => (
                  <View style={styles.row} key={item.id}>
                    <Text style={styles.label}>
                      {item.name} × {item.quantity}
                    </Text>
                    <Text>{formatCurrency(item.line_total, business.currency)}</Text>
                  </View>
                ))}
              </>
            )}
          </>
        ) : (
          <View style={styles.row}>
            <Text style={styles.label}>Service</Text>
            <Text>{order.service_label}</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <Text>{order.status.replace('_', ' ')}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalLabel}>{formatCurrency(order.amount, business.currency)}</Text>
        </View>

        <Image src={qrDataUrl} style={styles.qr} />
        <Text style={styles.footer}>Scan to track your order</Text>
        <Text style={styles.footer}>Thank you for your business!</Text>
      </Page>
    </Document>
  )
}
