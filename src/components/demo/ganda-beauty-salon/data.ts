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

export const SERVICE_CATEGORIES = [
  {
    name: "Hair",
    items: [
      { name: "Signature Cut", price: "₱850", appointmentServiceId: "97b9fac3-01f1-40cd-9b65-0c859e01dacd" },
      { name: "Blowout & Style", price: "₱650", appointmentServiceId: "cd708626-30bd-4822-b9e6-741a3f03a9a2" },
      { name: "Keratin Treatment", price: "₱3,200", appointmentServiceId: "cb42e3b4-7339-4a08-bd9a-ff19a2b3c7c9" },
    ],
  },
  {
    name: "Color",
    items: [
      { name: "Balayage", price: "₱4,500", appointmentServiceId: "9c721fb1-703e-4636-b9bd-5b13703037a0" },
      { name: "Root Touch-Up", price: "₱1,800", appointmentServiceId: "2d446778-ca09-4ff4-b97e-9c3085fc08d7" },
      { name: "Full Color", price: "₱2,800", appointmentServiceId: "ef45ee80-b126-4347-9b4f-2ff077e4e8c7" },
    ],
  },
  {
    name: "Nails",
    items: [
      { name: "Gel Manicure", price: "₱600", appointmentServiceId: "55ebba17-b6e4-4ea5-b567-fc80bc8d0dcb" },
      { name: "Classic Pedicure", price: "₱550", appointmentServiceId: "e9e5a0e1-3254-43d7-bac4-1d1cca8ba44c" },
    ],
  },
  {
    name: "Spa",
    items: [
      { name: "Scalp Spa Treatment", price: "₱1,200", appointmentServiceId: "e7451001-9c43-47d3-ad06-cc38b3abd392" },
      { name: "Hand & Foot Spa", price: "₱950", appointmentServiceId: "b352ac88-5a65-4ec2-a915-6144e56825e3" },
    ],
  },
];

export const SERVICE_OPTIONS = SERVICE_CATEGORIES.flatMap((cat) => cat.items.map((item) => item.name));

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
