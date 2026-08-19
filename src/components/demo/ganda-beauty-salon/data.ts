export const SALON = {
  name: "Ganda Beauty Salon",
  address: "212 Jupiter St., Brgy. Bel-Air, Makati City, 1209",
  phone: "+63 917 234 5678",
  email: "hello@gandabeautysalon.ph",
  hours: "Mon–Sat 10am–8pm, Sun 11am–6pm",
};

export const SERVICE_CATEGORIES = [
  {
    name: "Hair",
    items: [
      { name: "Signature Cut", price: "₱850" },
      { name: "Blowout & Style", price: "₱650" },
      { name: "Keratin Treatment", price: "₱3,200" },
    ],
  },
  {
    name: "Color",
    items: [
      { name: "Balayage", price: "₱4,500" },
      { name: "Root Touch-Up", price: "₱1,800" },
      { name: "Full Color", price: "₱2,800" },
    ],
  },
  {
    name: "Nails",
    items: [
      { name: "Gel Manicure", price: "₱600" },
      { name: "Classic Pedicure", price: "₱550" },
    ],
  },
  {
    name: "Spa",
    items: [
      { name: "Scalp Spa Treatment", price: "₱1,200" },
      { name: "Hand & Foot Spa", price: "₱950" },
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
  },
  {
    id: "stylist-2",
    slug: "miguel-santos",
    name: "Miguel Santos",
    role: "Senior Stylist",
    photo: "/demo/ganda-beauty-salon/photos/stylist-2.png",
    bio: "Miguel trained under master stylists in Cebu before joining Ganda Beauty Salon. Known for precision cuts that grow out well between visits, he works closely with each client to find a shape that suits their face and their routine.",
    specialties: ["Precision Cutting", "Textured Styling", "Men's Grooming"],
  },
  {
    id: "stylist-3",
    slug: "katrina-bautista",
    name: "Katrina Bautista",
    role: "Balayage Specialist",
    photo: "/demo/ganda-beauty-salon/photos/stylist-3.png",
    bio: "Katrina's balayage work has become one of the salon's signatures — soft, sun-kissed transitions built one hand-painted section at a time. She keeps a running mood board with every client to make sure the result matches exactly what they pictured.",
    specialties: ["Balayage", "Root Melts", "Toning & Glossing"],
  },
  {
    id: "stylist-4",
    slug: "rafael-villanueva",
    name: "Rafael Villanueva",
    role: "Barber & Grooming",
    photo: "/demo/ganda-beauty-salon/photos/stylist-4.png",
    bio: "Rafael brings a classic barbering background to the salon floor, pairing sharp fades and beard work with the same unhurried, conversation-first approach the rest of the team is known for.",
    specialties: ["Fades & Tapers", "Beard Sculpting", "Hot Towel Shaves"],
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
