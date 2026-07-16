'use client'

import { useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { OpenLocationCode } from 'open-location-code'
import type { RecordLocation } from '@/lib/territory-management-system/modules/reports/queries'
import Card from '@/components/territory-management-system/dashboard/Card'
import 'leaflet/dist/leaflet.css'

// Leaflet's default marker icon references image files by a relative path that breaks under
// most bundlers (including Next.js) — the standard workaround is pointing it at a CDN copy of
// the same icon images leaflet itself ships, rather than trying to bundle them locally.
const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const openLocationCode = new OpenLocationCode()

interface Pin {
  id: string
  lat: number
  lng: number
  address: string
  territoryName: string
}

// Decoding happens entirely client-side (no geocoding API, no network call) — the same
// open-location-code package lib/plusCode.ts already uses to encode a GPS position into a Plus
// Code decodes one back into a lat/lng center point just as easily.
function decodePins(records: RecordLocation[]): Pin[] {
  const pins: Pin[] = []
  for (const r of records) {
    if (!openLocationCode.isValid(r.plusCode) || !openLocationCode.isFull(r.plusCode)) continue
    try {
      const area = openLocationCode.decode(r.plusCode)
      pins.push({ id: r.id, lat: area.latitudeCenter, lng: area.longitudeCenter, address: r.address, territoryName: r.territoryName })
    } catch {
      // A malformed/short Plus Code that still passed isValid/isFull in some edge case — skip
      // rather than let one bad row break the whole map.
    }
  }
  return pins
}

export default function HouseholdDistributionMap({ records }: { records: RecordLocation[] }) {
  const pins = useMemo(() => decodePins(records), [records])

  if (pins.length === 0) {
    return (
      <Card className="p-10 text-center">
        <p className="text-sm text-slate-600">No approved records with a Plus Code yet.</p>
      </Card>
    )
  }

  const center: [number, number] = [
    pins.reduce((sum, p) => sum + p.lat, 0) / pins.length,
    pins.reduce((sum, p) => sum + p.lng, 0) / pins.length,
  ]

  return (
    <Card className="overflow-hidden p-0">
      <MapContainer center={center} zoom={13} scrollWheelZoom style={{ height: '480px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins.map((pin) => (
          <Marker key={pin.id} position={[pin.lat, pin.lng]} icon={markerIcon}>
            <Popup>
              <p className="font-medium">{pin.address || 'No address on file'}</p>
              <p className="text-slate-500">{pin.territoryName}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Card>
  )
}
