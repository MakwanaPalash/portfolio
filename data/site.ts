export const site = {
  name: "Palash Makwana",
  url: "https://example.com" /* [ADD DETAIL] domain */,
  email: "palashmakwana135@gmail.com",
  linkedin: "https://linkedin.com/in/palash-makwana-468309260",
  resume: "/resume.pdf",
};

export type Project = {
  slug: string;
  n: string;
  name: string;
  tag: string;
  stamp: string;
  domain: string;
  period: string;
  role: string;
  desc: string;
  problem: string;
  flow: string[];
  caps: string[];
  stack: string[];
  resp: string[];
  stats?: [string, string][];
  featured?: boolean;
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "xpo-fairs",
    n: "01",
    name: "XPO Fairs",
    tag: "A trade show, rebuilt for the browser.",
    stamp: "FLAGSHIP",
    featured: true,
    accent: "#a855f7",
    domain: "Virtual events · B2B",
    period: "2024 — present",
    role: "Lead backend engineer",
    desc: "An online trade-fair platform. Organizers run events and halls, exhibitors showcase their companies and products, and visitors discover exhibitors, chat, video call and book meetings — all in real time.",
    problem:
      "Physical trade fairs are expensive, short-lived and lose most leads the day they close. Exhibitors needed a venue that stays open, captures every conversation and turns visits into meetings — at the scale of thousands of concurrent visitors.",
    flow: [
      "Organizers · Exhibitors · Visitors",
      "Web + mobile apps",
      "Express REST API · Socket.IO",
      "MySQL (Sequelize) · Redis",
      "AWS S3 · SES · MediaConvert · FCM",
    ],
    caps: [
      "Events, halls and exhibitor management",
      "Real-time chat and video calls",
      "Meeting scheduling with Google Calendar, Outlook and iCal",
      "Ticketing, coupons and PayPal payments",
      "Lifecycle email engine with cron + Redis dedupe",
      "Audit logs, analytics and lead export",
      "Headless CMS for event and launch sites",
      "OpenAI-assisted content",
    ],
    stack: [
      "Node.js",
      "Express",
      "Socket.IO",
      "MySQL",
      "Sequelize",
      "Redis",
      "AWS",
      "Firebase FCM",
      "OpenAI",
    ],
    resp: [
      "Owned most backend modules end-to-end — 1,200+ commits",
      "Built the visitor lifecycle email system (show start, reminders, last call) with Redis dedupe",
      "Calendar sync for Google, Outlook (MS Graph) and iCal meetings",
      "Audit logging with retention cron and device-level session tracking",
      "Redis caching and CMS APIs for the launch and event sites",
      "Exhibitor media pipeline: image ordering, video reprocessing via MediaConvert, migration export/import",
    ],
    stats: [
      ["1,200+", "commits shipped"],
      ["100+", "API modules"],
      ["2 yrs", "in production"],
    ],
  },
  {
    slug: "minemend",
    n: "02",
    name: "Minemend",
    tag: "Mine-site operations, measured to the load.",
    stamp: "OPERATIONS",
    featured: true,
    accent: "#ff9f0a",
    domain: "Mining · Field operations",
    period: "2025 — 2026",
    role: "Backend engineer",
    desc: "An operations platform for mine sites. Operators log every load from the field app; admins track projects, machines, materials and site progress, then export reports for clients.",
    problem:
      "Site progress lived on paper and spreadsheets, so nobody knew real coverage or operator output until the job was over. The business needed live load statistics per operator and site, plus client-ready reports.",
    flow: [
      "Operators (mobile)",
      "Admins · Admin users",
      "NestJS API",
      "PostgreSQL (TypeORM)",
      "S3 · FCM · Twilio · PDF/CSV",
    ],
    caps: [
      "Projects, sites, machines and materials",
      "Operator load logging and history",
      "Timezone-aware load statistics",
      "PDF and CSV report export",
      "Role and module-level permissions",
      "Push notifications and account deletion flows",
    ],
    stack: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "TypeORM",
      "Socket.IO",
      "Firebase FCM",
      "Twilio",
      "wkhtmltopdf",
    ],
    resp: [
      "Load-statistics and dashboard APIs with operator-wise progress",
      "PDF/CSV exports with coverage and application-rate summaries",
      "Admin-user role with per-module add/edit/delete/view permissions",
      "OTP-based account deletion without the app installed",
      "CI/CD pipeline fixes for reliable server restarts",
    ],
    stats: [
      ["130+", "commits"],
      ["16", "domain modules"],
      ["PDF · CSV", "client reports"],
    ],
  },
  {
    slug: "posease",
    n: "03",
    name: "POSease",
    tag: "Point of sale and hotel PMS, one register.",
    stamp: "SAAS",
    featured: true,
    accent: "#30d158",
    domain: "Hospitality · Retail SaaS",
    period: "2026",
    role: "Backend engineer",
    desc: "A SaaS point-of-sale and hotel property-management system. Owners run sales, rooms, reservations and payments from one register, with availability published to Google Hotels.",
    problem:
      "Small hotels juggle a POS, a booking sheet and OTA channels that drift out of sync. Owners needed one source of truth for rooms, rates and money — and fast dashboards on a growing MongoDB dataset.",
    flow: [
      "Owners · Staff",
      "POS + PMS registers",
      "Express API",
      "MongoDB (Mongoose)",
      "Google Hotels ARI · WhatsApp · Razorpay · Stripe",
    ],
    caps: [
      "Reservations, room types and rates",
      "Google Hotels ARI availability sync",
      "WhatsApp booking confirmations",
      "Receivables, split payments and outstanding tracking",
      "Sales, occupancy and payment dashboards",
      "CSV / XLSX exports",
    ],
    stack: [
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Razorpay",
      "Stripe",
      "Twilio",
      "AWS S3",
    ],
    resp: [
      "Google Hotels ARI integration with consistent sell limits",
      "Separated PMS and POS registers without breaking existing data",
      "Receivables KPIs, split-payment reporting and occupancy fixes",
      "Query and index tuning from Atlas recommendations",
      "IP blocklist middleware and auth-failure logging",
    ],
  },
  {
    slug: "reelflix",
    n: "04",
    name: "ReelFlix",
    tag: "Short-form series, streamed.",
    stamp: "STREAMING",
    featured: true,
    accent: "#ff375f",
    domain: "Media · OTT",
    period: "2025 — 2026",
    role: "Backend contributor",
    desc: "A streaming platform for short-form series and episodes, built as a NestJS monorepo of services with background media processing.",
    problem:
      "Episodes must release on schedule and play instantly on any network, without exposing raw video URLs.",
    flow: [
      "Viewers · Admins",
      "NestJS services (monorepo)",
      "PostgreSQL · BullMQ workers",
      "Bunny CDN (signed HLS)",
    ],
    caps: [
      "Series and episode catalogue",
      "Scheduled releases",
      "Signed HLS playback",
      "Background media jobs",
    ],
    stack: ["NestJS", "TypeORM", "PostgreSQL", "BullMQ", "Bunny CDN"],
    resp: [
      "Signed Bunny m3u8 playback links for episodes",
      "Bulk video status updates mapped to release schedules",
    ],
  },
  {
    slug: "bucket",
    n: "05",
    name: "Bucket",
    tag: "Save places. Build lists.",
    stamp: "CONSUMER",
    accent: "#64d2ff",
    domain: "Travel · Social",
    period: "2026",
    role: "Backend engineer",
    desc: "A place-based bucket-list app. A pin is a saved place, a bucket is a themed collection, and one pin can live in many buckets.",
    problem:
      "Users share places from everywhere; the app has to turn a pasted link into a rich, real place — and give admins visibility over a growing community.",
    flow: [
      "Users · Admins",
      "NestJS API",
      "PostgreSQL (TypeORM)",
      "Google Places · S3 · FCM · Stripe",
    ],
    caps: [
      "Share-link import with Places enrichment",
      "Admin dashboard and audit logs",
      "Real-time unread notifications",
    ],
    stack: [
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "Socket.IO",
      "Google Places API",
    ],
    resp: [
      "Share-link import preview with Places API (New)",
      "Admin APIs: users, categories, CSV export, audit logs, dashboard",
      "Socket for live notification counts",
    ],
  },
  {
    slug: "nexa",
    n: "06",
    name: "Nexa Learning",
    tag: "Training, inside 360° scenes.",
    stamp: "EDTECH",
    accent: "#bf5af2",
    domain: "EdTech · Immersive",
    period: "2026",
    role: "Backend contributor",
    desc: "An immersive learning platform: courses, interactive videos and 360° panoramas with zones, questions and per-learner progress across organizations.",
    problem:
      "Progress must be tracked per learner, per scene, per zone — across organizations and languages — without losing state when content changes.",
    flow: [
      "Learners · Org admins",
      "NestJS API",
      "PostgreSQL",
      "S3 · FFmpeg · OpenAI",
    ],
    caps: [
      "Panorama scenes, zones and interactions",
      "Course and video progress",
      "Multi-organization, multi-language",
    ],
    stack: ["NestJS", "PostgreSQL", "TypeORM", "FFmpeg", "OpenAI"],
    resp: [
      "Multi-organization support for global admins",
      "Self-healing panorama image progress",
      "3D model assembly config APIs",
    ],
  },
  {
    slug: "poker",
    n: "07",
    name: "Poker Platform",
    tag: "Real-time tables for a Unity client.",
    stamp: "GAMING",
    accent: "#ff453a",
    domain: "Gaming · Real-time",
    period: "2026",
    role: "Backend contributor",
    desc: "A NestJS backend for a Unity poker game: rooms, matchmaking, wallets, bots and live streaming.",
    problem:
      "Game state must survive disconnects and feel human — bots, pacing and reconnects all decide whether a hand feels fair.",
    flow: [
      "Unity client",
      "Socket.IO gateway",
      "NestJS game engine",
      "PostgreSQL · Redis · S3",
    ],
    caps: [
      "Rooms and matchmaking",
      "Seat restore on reconnect",
      "Bot pacing and all-in run-outs",
    ],
    stack: ["NestJS", "Socket.IO", "Redis", "PostgreSQL", "LiveKit"],
    resp: [
      "Seat restore on reconnect and persisted game type",
      "All-in run-out pacing, deal pauses and bot replacement",
      "CloudFront URLs and S3 credential fixes",
    ],
  },
  {
    slug: "email-warming",
    n: "08",
    name: "Email Warming",
    tag: "Engineering for reliable email delivery.",
    stamp: "DELIVERABILITY",
    accent: "#6e8bff",
    domain: "Email · Deliverability",
    period: "Devstree",
    role: "Backend developer",
    desc: "An email-warming platform that builds a positive sending reputation for email accounts and domains through consistent, natural-looking sending and engagement activity — before or while they send at larger volumes.",
    problem:
      "New or cold senders that jump straight to volume get classified as spam. Reputation has to be earned gradually, with sending, engagement, bounces and reputation signals watched the whole way.",
    flow: [
      "Email account / sender — configure sender and warming process",
      "Automated email activity — controlled sending and engagement workflows",
      "Deliverability monitoring — activity, engagement, bounces, reputation",
      "Outcome — better inbox placement, reduced spam risk",
    ],
    caps: [
      "Sender and warming configuration",
      "Controlled sending and engagement workflows",
      "Email activity tracking",
      "Bounce and reputation monitoring",
      "Better inbox placement",
      "Reduced spam risk",
    ],
    stack: ["Node.js", "REST APIs"],
    resp: [
      "Backend development for email-warming workflows",
      "API-driven integration between the application and email-related services",
      "Email activity tracking and deliverability monitoring",
      "Reliable handling of background processes and application data",
    ],
  },
  {
    slug: "apex-titan",
    n: "09",
    name: "Apex-Titan",
    tag: "Online car service management.",
    stamp: "IN SERVICE",
    accent: "#ff6b9d",
    domain: "Automotive · Marketplace",
    period: "Devstree",
    role: "Backend engineer",
    desc: "Connects mechanics, customers and shop owners; customers discover shops, request estimates and book appointments.",
    problem:
      "Car owners had no easy way to compare shops or get estimates; shops had no single place to manage bookings and mechanics.",
    flow: [
      "Customer",
      "Find shop · Estimate · Book",
      "Apex-Titan",
      "Mechanics · Shop owners",
    ],
    caps: [
      "RESTful APIs",
      "Database schema design",
      "Data retrieval optimisation",
      "Platform performance",
      "Puppeteer integrations",
      "Twilio integration",
    ],
    stack: ["Node.js", "MongoDB", "Monolith", "Puppeteer", "Twilio"],
    resp: [
      "RESTful APIs",
      "Schema design",
      "Retrieval optimisation",
      "Integrations",
    ],
  },
];

export const stats: [number, string, string][] = [
  [3.5, "+", "years shipping backends"],
  [1400, "+", "commits across products"],
  [9, "", "production systems"],
  [15, "+", "third-party integrations"],
];
