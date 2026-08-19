// Cross-component signal: StylistProfile's "Book with X" dispatches this on
// window with the chosen staff id as `detail`; Booking listens for it to
// preselect the stylist. They're rendered as siblings in page.tsx with no
// shared state, so a window event is the lightest way to connect them
// without introducing a context provider for one value.
export const BOOK_WITH_STYLIST_EVENT = "ganda:book-with-stylist";

export const SALON = {
  name: "Ganda Beauty Salon",
  address: "212 Jupiter St., Brgy. Bel-Air, Makati City, 1209",
  phone: "+63 917 234 5678",
  email: "hello@gandabeautysalon.ph",
  hours: "Mon–Sat 10am–8pm, Sun 11am–6pm",
  // Real tenant in the Appointment System (cyberussell.com/appointments) —
  // provisioned 2026-08-19, see docs/working-on.md for the full ID mapping.
  appointmentBusinessSlug: "ganda-beauty-salon",
};

// Live data from the real Appointment System — no more hardcoded services
// list. Prices/names/duration now come from cyberussell.com/appointments,
// the same tenant provisioned for this demo.
export type AppointmentService = { id: string; name: string; price: number; duration_min: number };
export type AppointmentStaffMember = { id: string; name: string; title: string };

export async function fetchAppointmentServices(): Promise<AppointmentService[]> {
  const res = await fetch(`/appointments/api/services?business=${SALON.appointmentBusinessSlug}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to load services");
  return data.services ?? [];
}

// Omitting serviceId returns every active staff member; passing it scopes
// to whoever is eligible for that specific service (mirrors the same
// "unrestricted unless explicitly assigned" rule the booking API itself
// uses, computed server-side so this never has to re-derive it).
export async function fetchAppointmentStaff(serviceId?: string): Promise<AppointmentStaffMember[]> {
  const params = new URLSearchParams({ business: SALON.appointmentBusinessSlug });
  if (serviceId) params.set("service", serviceId);
  const res = await fetch(`/appointments/api/staff?${params.toString()}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to load stylists");
  return data.staff ?? [];
}

export function formatPeso(amount: number) {
  return `₱${amount.toLocaleString("en-US")}`;
}

export type Stylist = {
  id: string;
  slug: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  specialties: string[];
  // Real staff row in the Appointment System — see docs/working-on.md.
  appointmentStaffId: string;
};

export const STYLISTS: Stylist[] = [
  {
    id: "stylist-1",
    slug: "isabela-cruz",
    name: "Isabela Cruz",
    role: "Creative Director · Colorist",
    photo: "/demo/ganda-beauty-salon/photos/stylist-1.png",
    bio: "Isabela founded Ganda Beauty Salon after nearly a decade coloring hair across Manila's top studios. She specializes in dimensional color work — balayage, hand-painted highlights, and corrective color — and leads every new stylist's training on the salon floor.",
    specialties: ["Balayage & Hand-Painting", "Corrective Color", "Bridal Color"],
    appointmentStaffId: "ca5b599b-3e40-4765-94e4-9e76be208568",
  },
  {
    id: "stylist-2",
    slug: "miguel-santos",
    name: "Miguel Santos",
    role: "Senior Stylist",
    photo: "/demo/ganda-beauty-salon/photos/stylist-2.png",
    bio: "Miguel trained under master stylists in Cebu before joining Ganda Beauty Salon. Known for precision cuts that grow out well between visits, he works closely with each client to find a shape that suits their face and their routine.",
    specialties: ["Precision Cutting", "Textured Styling", "Men's Grooming"],
    appointmentStaffId: "00086392-70ac-4a70-a717-6430632ab6ab",
  },
  {
    id: "stylist-3",
    slug: "katrina-bautista",
    name: "Katrina Bautista",
    role: "Balayage Specialist",
    photo: "/demo/ganda-beauty-salon/photos/stylist-3.png",
    bio: "Katrina's balayage work has become one of the salon's signatures — soft, sun-kissed transitions built one hand-painted section at a time. She keeps a running mood board with every client to make sure the result matches exactly what they pictured.",
    specialties: ["Balayage", "Root Melts", "Toning & Glossing"],
    appointmentStaffId: "7e0ebeab-f174-4bba-9ade-326640d1d138",
  },
  {
    id: "stylist-4",
    slug: "rafael-villanueva",
    name: "Rafael Villanueva",
    role: "Barber & Grooming",
    photo: "/demo/ganda-beauty-salon/photos/stylist-4.png",
    bio: "Rafael brings a classic barbering background to the salon floor, pairing sharp fades and beard work with the same unhurried, conversation-first approach the rest of the team is known for.",
    specialties: ["Fades & Tapers", "Beard Sculpting", "Hot Towel Shaves"],
    appointmentStaffId: "1499cccb-b015-48a4-8ed4-b6703f80be34",
  },
];

export const GALLERY = [
  { src: "/demo/ganda-beauty-salon/photos/gallery-1.png", alt: "Balayage result, side profile" },
  { src: "/demo/ganda-beauty-salon/photos/gallery-2.jpg", alt: "Salon interior, styling chairs" },
  { src: "/demo/ganda-beauty-salon/photos/gallery-3.png", alt: "Bridal updo, front view" },
  { src: "/demo/ganda-beauty-salon/photos/gallery-4.png", alt: "Keratin treatment, glossy result" },
  { src: "/demo/ganda-beauty-salon/photos/gallery-5.png", alt: "Manicure close-up" },
  { src: "/demo/ganda-beauty-salon/photos/gallery-6.png", alt: "Client blowout, walking shot" },
];

export const TESTIMONIALS = [
  {
    name: "Andrea Reyes",
    quote: "Booked through the website in under a minute and the QR check-in at the door made walking in feel effortless.",
  },
  {
    name: "Carlo Mendoza",
    quote: "Isabela completely understood the cut I wanted. Best salon experience I've had in Makati.",
  },
  {
    name: "Sofia Aquino",
    quote: "The space feels calm and private. My balayage with Katrina turned out exactly like the reference I sent.",
  },
];
