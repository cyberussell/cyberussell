export const CLINIC = {
  name: "Bright Smiles Dental Studio",
  tagline: "Your best smile starts here.",
  subhead:
    "Comfortable, modern dental care in BGC — from routine checkups to complete smile makeovers, all in one gentle, judgment-free clinic.",
  address: "21F One Bonifacio High Street, BGC, Taguig City",
  phone: "(02) 8123 4567",
  email: "hello@brightsmilesdental.ph",
  hours: "Mon–Sat: 9:00 AM – 6:30 PM",
};

export const STATS = [
  { value: 12, suffix: "+", label: "Years of Practice" },
  { value: 15000, suffix: "+", label: "Happy Patients" },
  { value: 4.9, suffix: "/5", label: "Average Rating", decimals: 1 },
  { value: 98, suffix: "%", label: "Painless Visit Satisfaction" },
];

export const SERVICES = [
  {
    icon: "Stethoscope",
    title: "General & Preventive Care",
    desc: "Routine checkups, cleanings, and cavity prevention to keep your smile healthy year-round.",
  },
  {
    icon: "Sparkles",
    title: "Teeth Whitening",
    desc: "Professional in-office and take-home whitening treatments for a brighter, more confident smile.",
  },
  {
    icon: "Smile",
    title: "Orthodontics & Invisalign",
    desc: "Traditional braces and clear aligners for kids, teens, and adults.",
  },
  {
    icon: "Anchor",
    title: "Dental Implants",
    desc: "Permanent, natural-looking tooth replacement using modern implant technology.",
  },
  {
    icon: "Syringe",
    title: "Root Canal Therapy",
    desc: "Gentle, pain-managed root canal treatment to save and restore damaged teeth.",
  },
  {
    icon: "Baby",
    title: "Pediatric Dentistry",
    desc: "Kid-friendly dental care that makes visits comfortable for your little ones.",
  },
];

export const FEATURES = [
  {
    icon: "ShieldCheck",
    title: "Sterile, Modern Equipment",
    desc: "Every procedure uses fully sterilized, up-to-date equipment for your safety.",
  },
  {
    icon: "HeartPulse",
    title: "Pain-Managed Care",
    desc: "Sedation options and gentle techniques for anxiety-free visits.",
  },
  {
    icon: "Clock",
    title: "Same-Week Appointments",
    desc: "Most patients get seen within the same week — no long waitlists.",
  },
  {
    icon: "Award",
    title: "Board-Certified Dentists",
    desc: "Our team is licensed, trained, and continuously updated on the latest techniques.",
  },
];

export const TEAM = [
  {
    name: "Dr. Maya Villanueva, DMD",
    role: "Lead Dentist & Founder",
    bio: "12 years of experience specializing in cosmetic dentistry and full smile makeovers.",
    initials: "MV",
    photo: "/portfolio/luma-dental/team-maya.jpg",
  },
  {
    name: "Dr. Carlo Reyes, DMD",
    role: "Orthodontist",
    bio: "Specializes in braces, Invisalign, and pediatric orthodontics.",
    initials: "CR",
    photo: "/portfolio/luma-dental/team-carlo.jpg",
  },
  {
    name: "Dr. Anna Bautista, DMD",
    role: "Oral Surgeon",
    bio: "Focuses on implants, extractions, and root canal therapy.",
    initials: "AB",
    photo: "/portfolio/luma-dental/team-anna.jpg",
  },
];

export const TESTIMONIALS = [
  {
    quote: "I used to dread the dentist. Bright Smiles changed that completely — gentle, honest, and genuinely caring staff.",
    author: "Jenny L.",
    role: "Patient since 2022",
  },
  {
    quote: "Got my Invisalign here and the results were incredible. Dr. Reyes explained every step clearly.",
    author: "Mark T.",
    role: "Invisalign Patient",
  },
  {
    quote: "Best pediatric experience for my daughter. The staff made her actually excited to go to the dentist!",
    author: "Cathy P.",
    role: "Parent",
  },
];

export const FAQS = [
  {
    question: "Do you accept HMO / insurance?",
    answer: "Yes, we accept most major HMO providers in Metro Manila. Bring your card and we'll verify coverage before your visit.",
  },
  {
    question: "How do I book an appointment?",
    answer: "Use the booking form above, message us on Facebook, or call the clinic directly. We usually confirm within a few hours.",
  },
  {
    question: "Is teeth whitening safe?",
    answer: "Yes — our in-office whitening is supervised by licensed dentists and uses dentist-grade formulas safer than store-bought kits.",
  },
  {
    question: "Do you treat children?",
    answer: "Yes, we welcome patients of all ages, including a dedicated pediatric-friendly setup.",
  },
  {
    question: "What if I have dental anxiety?",
    answer: "We offer sedation options and a calm, judgment-free environment designed specifically for anxious patients.",
  },
];

export const SERVICE_OPTIONS = SERVICES.map((s) => s.title);
