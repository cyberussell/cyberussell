import {
  Truck,
  ShieldCheck,
  Sparkles,
  Shirt,
  BedDouble,
  Blinds,
  WashingMachine,
  Layers,
  Clock,
  CreditCard,
  CircleCheckBig,
} from "lucide-react";

export const SHOP = {
  name: "Aling Maria",
  fullName: "Aling Maria Laundry Shop",
  phone: "0917 610 0090",
  phone2: "0928 265 738",
  coverage: "Metro Manila",
  address: "24 Kalayaan St., Brgy. San Isidro, Quezon City",
};

export const BRANCHES = ["Quezon City (Main)", "Makati", "Pasig", "Mandaluyong"];

const PHOTO = (name: string) => `/demo/laundryflow/photos/${name}`;

export const PHOTOS = {
  hero: PHOTO("hero-pile.png"),
  finalCta: PHOTO("cta-scene.jpg"),
};

export const NAV_LINKS = [
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export const HERO = {
  headline: [
    { text: "TOO MUCH", weight: "font-normal" },
    { text: "LAUNDRY?", weight: "font-black" },
  ],
  highlight: "WE'VE GOT YOU!",
  tagline: "Doorstep laundry that cares.",
  features: [
    { icon: Truck, title: "Pickup", sub: "at your doorstep" },
    { icon: ShieldCheck, title: "Expert Care", sub: "& premium cleaning" },
    { icon: Sparkles, title: "Fresh, Clean", sub: "& perfectly pressed" },
  ],
};

export const PRICING = [
  { icon: Shirt, service: "Wash & Fold", price: "₱35", unit: "/ kg", badge: "Most Popular", color: "blue" },
  { icon: WashingMachine, service: "Wash & Iron", price: "₱70", unit: "/ kg", color: "orange" },
  { icon: BedDouble, service: "Comforters", prefix: "from", price: "₱250", unit: "each", color: "purple" },
  { icon: Blinds, service: "Curtains", prefix: "from", price: "₱180", unit: "per panel", color: "green" },
  { icon: Layers, service: "Blankets", prefix: "from", price: "₱200", unit: "each", color: "amber" },
  { icon: Truck, service: "Pickup & Delivery", price: "FREE", unit: "within 3 km", color: "teal" },
];

export const PRICING_TRUST = [
  { icon: CircleCheckBig, title: "Minimum order", sub: "3 kg", color: "green" },
  { icon: Clock, title: "Same-day service", sub: "available", color: "blue" },
  { icon: CreditCard, title: "Multiple payment", sub: "options", color: "rose" },
  { icon: ShieldCheck, title: "100% Satisfaction", sub: "Guaranteed", color: "purple" },
];

export const PRICING_BANNER = {
  heading: "We treat your clothes like",
  highlight: "our own.",
  body: "Every load is carefully washed, dried, and folded with love and attention to detail.",
  ratingNote: "Rated 4.9/5 by our happy customers",
};

export const TESTIMONIALS = [
  { quote: "Always on time. Their pickup service has made our lives so much easier.", name: "Carla Mendoza", role: "Working Mom", color: "orange" },
  { quote: "My comforters have never smelled this fresh. Worth every peso.", name: "Ramon Dizon", role: "Regular Customer", color: "purple" },
  { quote: "We switched our restaurant's linens to Aling Maria and never looked back.", name: "Jun Torres", role: "Restaurant Owner", color: "amber" },
];
