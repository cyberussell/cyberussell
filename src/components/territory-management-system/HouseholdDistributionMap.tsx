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

function toPin(r: RecordLocation, code: string): Pin {
  const area = openLocationCode.decode(code)
  return { id: r.id, lat: area.latitudeCenter, lng: area.longitudeCenter, address: r.address, territoryName: r.territoryName }
}

// Decoding happens entirely client-side (no geocoding API, no network call) — the same
// open-location-code package lib/plusCode.ts already uses to encode a GPS position into a Plus
// Code decodes one back into a lat/lng center point just as easily. Most manually-typed or
// older CSV-imported Plus Codes are SHORT/local-form (e.g. "5JJ6+F8", missing their leading
// area digits, since that's what a publisher realistically types at the door) — only codes
// captured via the "Use My Location" button are full-form. A short code alone can't be decoded
// standalone; it needs a nearby reference point. Two-pass: decode every full code directly,
// then use their average position (any other record in the same congregation is geographically
// close enough to be a valid reference — recoverNearest only needs to be within ~55km) to
// recover the short codes too.
function decodePins(records: RecordLocation[]): Pin[] {
  const fullPins: Pin[] = []
  const shortRecords: RecordLocation[] = []
  for (const r of records) {
    if (!openLocationCode.isValid(r.plusCode)) continue
    if (openLocationCode.isFull(r.plusCode)) {
      try {
        fullPins.push(toPin(r, r.plusCode))
      } catch {
        // Passed isValid/isFull but still failed to decode — skip rather than let one bad row
        // break the whole map.
      }
    } else {
      shortRecords.push(r)
    }
  }

  // No full-code anchor to recover short codes against — can't safely guess a reference point
  // (a wrong guess would silently place a pin in the wrong city, worse than no pin at all).
  if (shortRecords.length === 0 || fullPins.length === 0) return fullPins

  const refLat = fullPins.reduce((sum, p) => sum + p.lat, 0) / fullPins.length
  const refLng = fullPins.reduce((sum, p) => sum + p.lng, 0) / fullPins.length

  const recoveredPins: Pin[] = []
  for (const r of shortRecords) {
    try {
      const fullCode = openLocationCode.recoverNearest(r.plusCode, refLat, refLng)
      recoveredPins.push(toPin(r, fullCode))
    } catch {
      // Malformed short code that still passed isValid — skip.
    }
  }

  return [...fullPins, ...recoveredPins]
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
