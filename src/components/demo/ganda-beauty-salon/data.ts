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

export const STYLISTS = [
  { id: "stylist-1", name: "Isabela Cruz", role: "Creative Director · Colorist", photo: "/demo/ganda-beauty-salon/photos/stylist-1.png" },
  { id: "stylist-2", name: "Miguel Santos", role: "Senior Stylist", photo: "/demo/ganda-beauty-salon/photos/stylist-2.png" },
  { id: "stylist-3", name: "Katrina Bautista", role: "Balayage Specialist", photo: "/demo/ganda-beauty-salon/photos/stylist-3.png" },
  { id: "stylist-4", name: "Rafael Villanueva", role: "Barber & Grooming", photo: "/demo/ganda-beauty-salon/photos/stylist-4.png" },
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
