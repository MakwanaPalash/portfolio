"use client";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { Eyebrow, Fade, G, Magnetic, Words, ease } from "./ui";
import { Stats, Systems } from "./Work";
import { Orbit, Scramble } from "./Brand";

function Nav({ ready }: { ready: boolean }) {
  const { scrollYProgress } = useScroll();
  const l = [
    ["About", "#about"],
    ["Stack", "#stack"],
    ["Work", "#systems"],
    ["Experience", "#experience"],
    ["Contact", "#contact"],
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-12 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-full max-w-5xl items-center justify-between px-6 text-xs text-[#d2d2d7]"
      >
        <a href="#top" aria-label="Palash Makwana, back to top" className="flex items-center gap-2.5 font-semibold text-white">
          <Orbit size={26} ring={1.5} textClass="text-[9px]" />
          <Scramble start={ready} delay={900} className="font-mono text-[13px] max-sm:hidden" />
        </a>
        <div className="flex gap-7 max-md:hidden">
          {l.map(([n, h]) => (
            <a key={n} href={h} className="transition hover:text-white">
              {n}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href={site.resume}
            target="_blank"
            rel="noopener"
            className="rounded-full px-3 py-1 text-white transition hover:bg-white/10"
          >
            Resume
          </a>
          <a
            href={`mailto:${site.email}`}
            className="rounded-full bg-white/10 px-3 py-1 text-white transition hover:bg-white/20"
          >
            Get in touch
          </a>
        </div>
      </nav>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-[#6e8bff] via-[#a855f7] to-[#ff6b9d]"
        aria-hidden
      />
    </header>
  );
}
const logos = [
  "Twilio",
  "AWS S3",
  "AWS SES",
  "Stripe",
  "Razorpay",
  "PayPal",
  "Brevo",
  "WhatsApp",
  "Google Calendar",
  "Outlook",
  "iCal",
  "Firebase FCM",
  "VideoSDK",
  "OpenAI",
];
function Marquee() {
  return (
    <div className="overflow-hidden bg-[#f5f5f7] pb-24" aria-hidden>
      <div className="flex w-max animate-[mq_50s_linear_infinite]">
        {[...logos, ...logos].map((x, i) => (
          <span
            key={i}
            className="mx-8 text-3xl font-semibold tracking-tight text-[#1d1d1f]/25 md:text-5xl"
          >
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}
function Portrait() {
  const [ok, setOk] = useState(true);
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
      stiffness: 150,
      damping: 18,
    }),
    ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
      stiffness: 150,
      damping: 18,
    });
  return (
    <div
      style={{ perspective: 1000 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry }}
        className="relative overflow-hidden rounded-[2.2rem] p-[2px]"
      >
        <span
          className="absolute inset-[-60%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_0deg,#6e8bff,#a855f7,#ff6b9d,#6e8bff)]"
          aria-hidden
        />
        <motion.div
          initial={{ clipPath: "inset(14% round 2rem)", opacity: 0 }}
          whileInView={{ clipPath: "inset(0% round 2rem)", opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease }}
          className="relative aspect-[4/5] overflow-hidden rounded-[2.1rem] bg-[#161618]"
        >
          {ok ? (
            <motion.img
              ref={(el) => {
                if (el?.complete && !el.naturalWidth) setOk(false);
              }}
              src="/palash.jpg"
              alt="Portrait of Palash Makwana"
              onError={() => setOk(false)}
              initial={{ scale: 1.25 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease }}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="grid h-full place-items-center"
              role="img"
              aria-label="Palash Makwana monogram"
            >
              <motion.div
                initial={{ scale: 0.3, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.3 }}
              >
                <Orbit size="13rem" ring={4} textClass="text-7xl" />
              </motion.div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
const facts: [string, string][] = [
  ["Role", "Associate Software Developer · Backend Engineer"],
  ["Company", "Devstree IT Service Pvt Ltd · since 2023"],
  ["Focus", "Node.js · NestJS · REST APIs · Real-time"],
  ["Education", "B.Tech IT, Ganpat University"],
  ["Based in", "Ahmedabad, India"],
];
function Intro() {
  return (
    <section id="about" className="bg-black px-6 py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[minmax(0,420px)_1fr] md:gap-20">
        <Fade>
          <Portrait />
        </Fade>
        <div>
          <Fade>
            <Eyebrow dark>ABOUT</Eyebrow>
            <h2 className="text-5xl font-semibold tracking-[-0.04em] md:text-6xl">
              Backend engineer. <span className={G}>Production first.</span>
            </h2>
          </Fade>
          <Fade d={0.1}>
            <p className="mt-6 text-xl leading-relaxed text-[#a1a1a6]">
              I&apos;m Palash Makwana, a backend engineer with 3.5+ years of
              experience shipping scalable RESTful APIs with Node.js and NestJS.
              My work spans virtual trade fairs, SaaS platforms and operational
              products — APIs, databases, third-party integrations, real-time
              communication and deployment.
            </p>
          </Fade>
          <Fade d={0.2}>
            <dl className="mt-8 divide-y divide-white/10 border-y border-white/10 text-[15px]">
              {facts.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-3">
                  <dt className="text-[#6e6e73]">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </Fade>
        </div>
      </div>
    </section>
  );
}
const code = `@Controller('fairs')
@UseGuards(AuthGuard, RolesGuard)
export class FairsController {
  @Get(':id/exhibitors')
  findExhibitors(@Param('id', ParseIntPipe) id: number) {
    return this.fairs.findExhibitors(id);
  }
}`;
function Hero() {
  // Spotlight follows the cursor via transform only (no per-frame background repaint).
  const mx = useMotionValue(0),
    my = useMotionValue(0);
  const rm = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const rotateX = useTransform(p, [0, 1], [rm ? 0 : 24, 0]),
    scale = useTransform(p, [0, 1], [rm ? 1 : 0.88, 1]),
    opacity = useTransform(p, [0, 0.5], [rm ? 1 : 0.2, 1]);
  return (
    <section
      id="top"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left - 600);
        my.set(e.clientY - r.top - 600);
      }}
      className="relative overflow-hidden bg-black px-6 pt-36 text-center"
    >
      <motion.div
        style={{ x: mx, y: my }}
        className="pointer-events-none absolute left-0 top-0 h-[1200px] w-[1200px] bg-[radial-gradient(circle_600px,rgba(110,139,255,.16),transparent_60%)] will-change-transform"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,.28),transparent_65%)]"
        aria-hidden
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative text-sm font-semibold text-[#a1a1a6]"
      >
        <span className="text-[#30d158]">●</span> Backend Engineer · Node.js ·
        NestJS
      </motion.p>
      <h1 className="relative mx-auto mt-4 max-w-5xl text-[clamp(2.75rem,9vw,7rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
        <Words
          text="I build the systems behind the products."
          accent={["behind"]}
          d={0.1}
        />
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 0.5 }}
        className="relative mx-auto mt-6 max-w-2xl text-xl text-[#a1a1a6]"
      >
        Backend engineer with 3.5+ years of experience designing and shipping
        production-ready APIs, databases, integrations and real-time systems.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="relative mt-8 flex flex-wrap justify-center gap-4 text-lg"
      >
        <Magnetic>
          <a
            href="#systems"
            className="inline-block rounded-full bg-[#2997ff] px-6 py-2.5 text-base font-medium text-white transition hover:bg-[#147ce5]"
          >
            Explore my work
          </a>
        </Magnetic>
        <a
          href={site.resume}
          download="Palash_Makwana.pdf"
          className="rounded-full border border-white/20 px-6 py-2.5 text-base font-medium text-white transition hover:bg-white/10"
        >
          Download resume
        </a>
      </motion.div>
      <div
        ref={ref}
        className="relative mx-auto mt-24 max-w-3xl"
        style={{ perspective: 1400 }}
      >
        <motion.div
          style={{ rotateX, scale, opacity }}
          className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0b0f]/90 will-change-transform text-left shadow-[0_40px_120px_-20px_rgba(168,85,247,.45)]"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
            <i className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <i className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <i className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-[#6e6e73]">
              fairs.controller.ts · sample
            </span>
            <span className="ml-auto text-xs text-[#30d158]">
              SYSTEM STATUS / ONLINE
            </span>
          </div>
          <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-7 text-[#d2d2d7] md:text-sm">
            {code}
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
const steps: [string, string][] = [
  ["Middleware", "Every request starts here: context, parsing, logging."],
  ["Guards", "Authentication and authorization decide whether it goes on."],
  ["Pipes", "Input is validated and transformed before it reaches your logic."],
  ["Controller", "The request is routed to exactly the right handler."],
  ["Service", "Business logic lives here, away from transport concerns."],
  [
    "Database",
    "TypeORM, Sequelize or Mongoose talking to PostgreSQL, MySQL or MongoDB.",
  ],
  ["Response", "Shaped on the way out; errors handled by filters."],
];
function Story() {
  const ref = useRef(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setI(Math.min(steps.length - 1, Math.floor(v * steps.length))),
  );
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });
  return (
    <section ref={ref} className="relative h-[520vh] bg-black">
      <div className="sticky top-0 mx-auto flex h-screen max-w-6xl flex-col justify-center gap-10 px-6 md:flex-row md:items-center md:gap-20">
        <div className="flex-1">
          <Eyebrow dark>THE LIFE OF A REQUEST</Eyebrow>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease }}
            >
              <h2 className="text-6xl font-semibold tracking-[-0.04em] md:text-8xl">
                <span className={G}>{steps[i][0]}</span>
              </h2>
              <p className="mt-5 max-w-md text-xl text-[#a1a1a6]">
                {steps[i][1]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative flex-1">
          <motion.div
            style={{ scaleY: fill }}
            className="absolute left-5 top-3 h-[calc(100%-1.5rem)] w-px origin-top bg-gradient-to-b from-[#6e8bff] to-[#ff6b9d]"
            aria-hidden
          />
          <ol className="space-y-3 pl-12">
            {steps.map(([k], n) => (
              <motion.li
                key={k}
                animate={{
                  opacity: n === i ? 1 : 0.3,
                  scale: n === i ? 1.03 : 1,
                  x: n === i ? 8 : 0,
                }}
                transition={{ duration: 0.5, ease }}
                className={`rounded-2xl border px-5 py-3 text-lg ${n === i ? "border-white/20 bg-white/10" : "border-white/5"}`}
              >
                {k}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
const text =
  "I'm a backend developer with 3.5+ years of experience designing and shipping scalable RESTful APIs in Node.js and NestJS. Skilled in relational and NoSQL database design — PostgreSQL, MySQL, MongoDB — third-party integrations, and delivering production-ready systems under tight deadlines. Comfortable owning features end-to-end, from schema design to deployment, in fast-paced product teams.";
function Word({
  w,
  r,
  p,
}: {
  w: string;
  r: [number, number];
  p: MotionValue<number>;
}) {
  const o = useTransform(p, r, [0.18, 1]);
  return (
    <motion.span style={{ opacity: o }} className="mr-[0.25em] inline-block">
      {w}
    </motion.span>
  );
}
function Statement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const ws = text.split(" ");
  return (
    <section className="bg-black px-6 py-40">
      <div className="mx-auto max-w-5xl">
        <Eyebrow dark>THE ENGINEER</Eyebrow>
        <p
          ref={ref}
          className="text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl"
        >
          {ws.map((w, i) => (
            <Word
              key={i}
              w={w}
              p={scrollYProgress}
              r={[i / ws.length, (i + 1) / ws.length]}
            />
          ))}
        </p>
      </div>
    </section>
  );
}
const bento: [string, string, string[], string][] = [
  [
    "Backend",
    "Node.js & NestJS at the core.",
    [
      "Node.js",
      "NestJS",
      "Express",
      "TypeScript",
      "JavaScript",
      "RESTful API design",
      "Modular monolith",
    ],
    "md:col-span-2",
  ],
  [
    "Real-time",
    "Conversations as they happen.",
    ["Socket.IO", "Chat", "Notifications", "Live operations"],
    "",
  ],
  [
    "Databases",
    "Schemas that hold up.",
    [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "TypeORM",
      "Sequelize",
      "Mongoose",
      "Query optimisation",
    ],
    "",
  ],
  [
    "Integrations",
    "Everything the product talks to.",
    [
      "Twilio",
      "AWS S3",
      "AWS SES",
      "Stripe",
      "Razorpay",
      "PayPal",
      "Brevo",
      "WhatsApp",
      "Google Calendar",
      "Outlook",
      "iCal",
      "Google Hotel ARI",
      "Firebase FCM",
      "VideoSDK",
      "OpenAI",
    ],
    "md:col-span-2",
  ],
  [
    "Delivery",
    "From commit to production.",
    ["Git", "GitHub", "Postman", "PM2", "GitHub Actions", "CI/CD"],
    "md:col-span-3",
  ],
];
function Stack() {
  return (
    <section id="stack" className="bg-[#f5f5f7] px-6 py-32 text-[#1d1d1f]">
      <div className="mx-auto max-w-6xl">
        <Fade>
          <Eyebrow>ENGINEERING DNA</Eyebrow>
          <h2 className="max-w-3xl text-5xl font-semibold tracking-[-0.04em] md:text-7xl">
            The toolkit.{" "}
            <span className="text-[#86868b]">Everything it takes to ship.</span>
          </h2>
        </Fade>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {bento.map(([t, s, c, span], i) => (
            <Fade key={t} d={i * 0.08} className={span}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease }}
                className="h-full rounded-[2rem] bg-white p-8 shadow-[0_2px_24px_rgba(0,0,0,.05)] transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,.1)]"
              >
                <h3 className="text-3xl font-semibold tracking-tight">{t}</h3>
                <p className="mt-1 text-[#86868b]">{s}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {c.map((x) => (
                    <span
                      key={x}
                      className="rounded-full bg-[#f5f5f7] px-3 py-1.5 text-sm"
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
const exp = [
  "Scalable REST APIs with Node.js / Express and NestJS",
  "Virtual trade fairs, hotel PMS / POS SaaS, mine-site operations, streaming, ed-tech and gaming",
  "MongoDB, MySQL and PostgreSQL with third-party integrations",
  "Socket.IO, production debugging and observability",
  "GitHub Actions and SSH / PM2 deployments",
];
function Experience() {
  return (
    <section id="experience" className="bg-[#fbfbfd] px-6 py-32 text-[#1d1d1f]">
      <div className="mx-auto max-w-5xl">
        <Fade>
          <Eyebrow>EXPERIENCE</Eyebrow>
          <h2 className="text-5xl font-semibold tracking-[-0.04em] md:text-7xl">
            Devstree IT Service Pvt Ltd.
          </h2>
          <p className="mt-3 text-xl text-[#86868b]">
            Jr. Node JS Developer · Ahmedabad · 2023 — present
          </p>
        </Fade>
        <ul className="mt-12 divide-y divide-black/10 border-y border-black/10">
          {exp.map((e, i) => (
            <Fade key={e} d={i * 0.06}>
              <li className="py-5 text-2xl tracking-tight">{e}</li>
            </Fade>
          ))}
        </ul>
        <Fade className="mt-12 grid gap-6 text-[#6e6e73] md:grid-cols-3">
          <p>
            <b className="block text-[#1d1d1f]">2023</b>Node JS Intern, Devstree
          </p>
          <p>
            <b className="block text-[#1d1d1f]">2019 – 2023</b>B.Tech IT, U.V.
            Patel Engineering College, Ganpat University
          </p>
          <p>
            <b className="block text-[#1d1d1f]">Next</b>Security-focused
            engineering (learning)
          </p>
        </Fade>
      </div>
    </section>
  );
}
function Next() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-40 text-center">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(110,139,255,.2),transparent_60%)]"
        aria-hidden
      />
      <Fade className="relative mx-auto max-w-4xl">
        <Eyebrow dark>WHAT&apos;S NEXT</Eyebrow>
        <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-7xl">
          Building systems is only half the problem.{" "}
          <span className={G}>Making them trustworthy is the next.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-xl text-[#a1a1a6]">
          Currently learning application security, secure API design,
          authorization, access control and data security.
        </p>
      </Fade>
    </section>
  );
}
function Contact() {
  return (
    <section id="contact" className="bg-black px-6 pb-10 pt-32 text-center">
      <Fade>
        <h2 className="text-[clamp(3rem,9vw,7rem)] font-semibold leading-none tracking-[-0.045em]">
          Have a system <span className={G}>to build?</span>
        </h2>
        <p className="mt-5 text-xl text-[#a1a1a6]">
          Let&apos;s build something reliable.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Magnetic>
            <a
              href={`mailto:${site.email}`}
              className="inline-block rounded-full bg-[#2997ff] px-7 py-3 text-base font-medium text-white transition hover:bg-[#147ce5]"
            >
              Email me
            </a>
          </Magnetic>
          <a
            href={site.resume}
            download="Palash_Makwana.pdf"
            className="rounded-full bg-white/10 px-7 py-3 text-base transition hover:bg-white/20"
          >
            Resume
          </a>
          <a
            href={site.linkedin}
            className="rounded-full bg-white/10 px-7 py-3 text-base transition hover:bg-white/20"
          >
            LinkedIn
          </a>
        </div>
        <p className="mt-32 text-2xl font-semibold tracking-tight text-[#6e6e73]">
          Build systems. Solve problems. Keep learning.
        </p>
      </Fade>
      <footer className="mx-auto mt-16 max-w-5xl border-t border-white/10 pt-6 text-xs text-[#6e6e73]">
        Palash Makwana / Backend Engineer · Ahmedabad, India · © 2026
      </footer>
    </section>
  );
}
export default function Apple() {
  const [ready, setReady] = useState(false);
  // The splash lives in layout.tsx (plain HTML/CSS); it fires "intro:done" when it starts to leave.
  useEffect(() => {
    if ((window as Window & { __introDone?: number }).__introDone) return setReady(true);
    const go = () => setReady(true);
    addEventListener("intro:done", go);
    return () => removeEventListener("intro:done", go);
  }, []);
  return (
    <main>
      <Nav ready={ready} />
      {/* Remount once the splash lifts so the hero entrance plays in view. */}
      <Hero key={ready ? "in" : "wait"} />
      <Intro />
      <Stats />
      <Statement />
      <Story />
      <Stack />
      <Marquee />
      <Systems />
      <Experience />
      <Next />
      <Contact />
    </main>
  );
}
