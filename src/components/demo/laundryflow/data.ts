import {
  ShieldCheck,
  Clock,
  Leaf,
  Radar,
  Shirt,
  Sparkles,
  WashingMachine,
  Package,
  Flame,
} from "lucide-react";

export const SHOP = {
  name: "Aling Maria",
  fullName: "Aling Maria Laundry Shop",
  phone: "0917 610 0090",
  phone2: "0928 265 738",
  address: "24 Kalayaan St., Brgy. San Isidro, Quezon City",
  shortLocation: "Brgy. San Isidro, Quezon City",
  hours: "Open Daily · 7AM–8PM",
  email: "hello@alingmarialaundry.ph",
};

export const BRANCHES = ["Quezon City (Main)", "Makati", "Pasig", "Mandaluyong"];

export const NAV_LINKS = [
  { label: "Home", href: "/demo/laundryflow#top" },
  { label: "Services", href: "/demo/laundryflow#services" },
  { label: "Track Order", href: "/demo/laundryflow/track-order" },
  { label: "Contact", href: "/demo/laundryflow#contact" },
];

const PHOTO = (name: string) => `/demo/laundryflow/photos/${name}`;

export const PHOTOS = {
  hero: PHOTO("hero-laundry.jpg"),
  attendantSorting: PHOTO("attendant-sorting.jpg"),
  attendantFolding: PHOTO("attendant-folding.png"),
  logo: PHOTO("logo.png"),
};

export const HERO_BADGES = [
  { label: "Trusted & Insured", icon: ShieldCheck },
  { label: "Same-Day Service", icon: Clock },
];

export const HERO = {
  eyebrow: "LAUNDRY SOLUTIONS",
  headline: "Fast, Friendly, and Affordable Laundry Care",
  body: "We provide reliable laundry solutions for your home or business. From everyday loads to bulk hotel linens, our team is ready to help.",
  cta: "Book a Pickup",
};

export const TRUST_ITEMS = [
  { label: "Premium Care", icon: ShieldCheck },
  { label: "Same-Day Service", icon: Clock },
  { label: "Eco-Friendly", icon: Leaf },
  { label: "Live Order Tracking", icon: Radar },
];

export const SERVICES_INTRO = {
  eyebrow: "OUR SERVICES",
  heading: "Complete Laundry Solutions You Can Trust",
  body: "From delicate garments to bulk hotel linens, our team handles every wash with care — on time, every time, guaranteed.",
};

export const SERVICES = [
  { label: "Wash & Fold", icon: Shirt },
  { label: "Dry Cleaning", icon: Sparkles },
  { label: "Self-Service Machines", icon: WashingMachine },
  { label: "Commercial / Bulk", icon: Package },
  { label: "Ironing / Pressing", icon: Flame },
];

export const SATISFACTION = {
  eyebrow: "OUR PROMISE",
  heading: "Your Satisfaction Is Our Priority",
  body: "Honest pricing, careful handling, and a 100% satisfaction guarantee — if something isn't right, we re-clean it free of charge.",
  ctaPrimary: "Learn More About Us",
  ctaSecondary: "View All Services",
};

export const ORDER_TRACKING = {
  eyebrow: "ALWAYS IN THE LOOP",
  heading: "Track Your Order, Anytime",
  body: "Every drop-off gets an order number. Check its status online — no calls, no guessing when it's ready.",
  demoUrl: "alingmarialaundry.ph/track/ORD-000482",
  orderNumber: "ORD-000482",
  orderService: "Wash & Fold — 2 loads",
  currentStep: "Folding",
  steps: [
    { label: "Received", time: "Today, 9:12 AM" },
    { label: "Washing", time: "Today, 9:40 AM" },
    { label: "Drying", time: "Today, 10:20 AM" },
    { label: "Folding", time: "In progress" },
    { label: "Ready for Pickup", time: "Pending" },
  ],
};

export const TESTIMONIAL = {
  quote:
    "Aling Maria's team treats every load like it's their own. I get a text the moment my order status changes — no more guessing when to pick up.",
  name: "Jamie R.",
  role: "Regular Customer",
};

export const BOOKING_TIME_SLOTS = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "01:00 PM - 03:00 PM",
  "03:00 PM - 05:00 PM",
  "05:00 PM - 07:00 PM",
];

export const BOOKING_SERVICES = [
  { key: "wash-fold", icon: Shirt, service: "Wash & Fold", desc: "Perfect for everyday wear.", price: "₱35", unit: "/ kg" },
  { key: "dry-cleaning", icon: Sparkles, service: "Dry Cleaning", desc: "Gentle care for delicate garments.", price: "₱150", unit: "/ pc" },
  { key: "self-service", icon: WashingMachine, service: "Self-Service Machines", desc: "Wash it yourself, on your time.", price: "₱80", unit: "/ load" },
  { key: "commercial", icon: Package, desc: "Bulk washing for businesses.", service: "Commercial / Bulk", price: "₱30", unit: "/ kg" },
];
