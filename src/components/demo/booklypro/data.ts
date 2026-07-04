export const BOOKLY = {
  name: "BooklyPro",
  tagline: "Modern Appointment Scheduling for Professionals",
  altTagline: "Simple scheduling. Better client experiences.",
  subhead:
    "BooklyPro is a fictional SaaS concept designed to demonstrate modern UX, scheduling workflows, dashboard architecture, and scalable full-stack application design for dentists, doctors, and lawyers.",
};

export const PROBLEMS = [
  "Too many configuration screens before you can take a single booking",
  "Scheduling logic that breaks down once a professional has more than one office",
  "Clunky, unresponsive booking experiences on mobile",
  "Double bookings caused by no real-time availability checks",
  "Dashboards so complicated that front-desk staff need training just to read them",
];

export const SOLUTIONS = [
  { title: "Progressive Onboarding", desc: "A five-step wizard gets a professional fully set up in minutes, not days." },
  { title: "Minimal UI", desc: "Every screen shows exactly what's needed — nothing more." },
  { title: "Calendar-First Workflow", desc: "Scheduling is the home screen, not a buried menu item." },
  { title: "Office-Based Scheduling", desc: "Multiple locations, each with its own hours and availability." },
  { title: "Real-Time Availability", desc: "Live slot checking prevents double bookings before they happen." },
  { title: "Responsive Design", desc: "A dashboard-grade experience that holds up on any screen size." },
];

export const USER_TYPES = [
  {
    role: "Professional",
    icon: "Stethoscope",
    desc: "Manages offices, hours, and appointments from a single calendar-first dashboard.",
    tags: ["Doctor", "Dentist", "Lawyer", "Receptionist (future)"],
  },
  {
    role: "Client",
    icon: "User",
    desc: "Finds a professional, picks an office and time, and books in under a minute — no account required.",
    tags: ["Self-service booking", "Confirmation & reminders"],
  },
  {
    role: "Administrator",
    icon: "ShieldCheck",
    desc: "Oversees professionals, offices, and platform-wide scheduling activity.",
    tags: ["Account oversight", "Platform settings"],
  },
];

export const ONBOARDING_STEPS = [
  {
    step: 1,
    title: "Professional Information",
    desc: "Name, specialty, credentials, and profile photo.",
    fields: ["Full name", "Specialty", "License / credentials", "Profile photo"],
  },
  {
    step: 2,
    title: "Contact Information",
    desc: "How clients and the platform reach you.",
    fields: ["Email address", "Phone number", "Time zone"],
  },
  {
    step: 3,
    title: "Office Locations",
    desc: "Add one or more offices with Google Maps autocomplete.",
    fields: ["Address (Maps autocomplete)", "Office name", "Multiple offices supported"],
  },
  {
    step: 4,
    title: "Clinic Hours",
    desc: "Set a weekly schedule, vacation days, and unavailable dates.",
    fields: ["Weekly schedule", "Vacation days", "Unavailable dates"],
  },
  {
    step: 5,
    title: "Appointment Settings",
    desc: "Fine-tune how bookings behave.",
    fields: ["Duration", "Buffer time", "Cancellation policy", "Max appointments / day"],
  },
];

export const BOOKING_JOURNEY = [
  { step: "Find Professional", desc: "Search or browse by specialty and location." },
  { step: "Choose Office", desc: "Pick the most convenient location." },
  { step: "Choose Date", desc: "See real-time availability on a calendar." },
  { step: "Choose Time", desc: "Pick an open slot — no double bookings possible." },
  { step: "Enter Details", desc: "A quick contact form, no account required." },
  { step: "Confirmation", desc: "Instant confirmation with an email reminder." },
];

export const DB_ENTITIES = [
  { name: "Professionals", fields: ["id", "name", "specialty", "email"] },
  { name: "Offices", fields: ["id", "professional_id", "address", "name"] },
  { name: "Office Hours", fields: ["id", "office_id", "day", "open", "close"] },
  { name: "Availability", fields: ["id", "office_id", "date", "slots"] },
  { name: "Appointments", fields: ["id", "client_id", "office_id", "start_time", "status"] },
  { name: "Clients", fields: ["id", "name", "email", "phone"] },
];

export const FEATURES = [
  { icon: "CalendarCheck", title: "Online Booking", desc: "Clients book real-time slots without calling or emailing." },
  { icon: "Building2", title: "Multiple Offices", desc: "Each professional can manage several office locations." },
  { icon: "MapPin", title: "Google Maps", desc: "Address autocomplete and office locations on a live map." },
  { icon: "ListOrdered", title: "Appointment Timeline", desc: "A clear, chronological view of every booking." },
  { icon: "Bell", title: "Notifications", desc: "Real-time alerts for new, changed, or cancelled appointments." },
  { icon: "Mail", title: "Email Reminders", desc: "Automated reminders sent ahead of every appointment." },
  { icon: "RefreshCw", title: "Calendar Sync", desc: "Two-way sync keeps external calendars up to date." },
  { icon: "CalendarDays", title: "Availability Management", desc: "Hours, vacations, and blocked dates in one place." },
  { icon: "LayoutDashboard", title: "Responsive Dashboard", desc: "A productivity-grade dashboard on any device." },
  { icon: "History", title: "Appointment History", desc: "Full record of past visits per client and office." },
];

export const ROADMAP = [
  { icon: "Video", title: "Teleconsultation" },
  { icon: "QrCode", title: "QR Check-in" },
  { icon: "Sparkles", title: "AI Scheduling" },
  { icon: "MessageSquare", title: "SMS Notifications" },
  { icon: "CreditCard", title: "Payments" },
  { icon: "Users", title: "Reception Dashboard" },
  { icon: "BarChart3", title: "Analytics" },
  { icon: "ListOrdered", title: "Waiting List" },
  { icon: "RefreshCw", title: "Calendar Sync" },
];

export const HIGHLIGHTS = [
  { value: 10, suffix: "+", label: "Interface Concepts" },
  { value: 25, suffix: "+", label: "Reusable Components" },
  { value: 5, suffix: "", label: "User Flows" },
  { value: 20, suffix: "+", label: "Responsive Screens" },
];

export const HIGHLIGHT_TAGS = ["Google Maps Integration", "Appointment Engine", "Modern Dashboard"];

export const TECH_STACK = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Supabase",
  "PostgreSQL",
  "Google Maps API",
  "Resend",
  "Vercel",
];

export const NAV_LINKS = [
  { label: "Problem & Solution", href: "#problem-solution" },
  { label: "User Types", href: "#user-types" },
  { label: "Onboarding", href: "#onboarding" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Features", href: "#features" },
];
