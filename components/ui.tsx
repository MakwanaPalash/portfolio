"use client";
import { animate, motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;
export const G = "bg-gradient-to-r from-[#6e8bff] via-[#a855f7] to-[#ff6b9d] bg-clip-text text-transparent";
export const Eyebrow = ({ children, dark }: { children: React.ReactNode; dark?: boolean }) => <p className={`mb-4 text-sm font-semibold tracking-wide ${dark ? "text-[#6e6e73]" : "text-[#a855f7]"}`}>{children}</p>;
export const Fade = ({ children, d = 0, className = "" }: { children: React.ReactNode; d?: number; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, delay: d, ease }}>{children}</motion.div>);

export function Magnetic({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0), y = useMotionValue(0), sx = useSpring(x, { stiffness: 200, damping: 15 }), sy = useSpring(y, { stiffness: 200, damping: 15 });
  return <motion.div style={{ x: sx, y: sy }} onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.25); y.set((e.clientY - r.top - r.height / 2) * 0.25); }} onMouseLeave={() => { x.set(0); y.set(0); }} className="inline-block">{children}</motion.div>;
}

/** Headline that reveals word by word, each rising out of a mask. */
export function Words({ text, className = "", d = 0, accent = [] }: { text: string; className?: string; d?: number; accent?: string[] }) {
  return <span className={className}>{text.split(" ").map((w, i) => <Fragment key={i}>{i > 0 && " "}<span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
    <motion.span className={`inline-block ${accent.includes(w) ? G : ""}`} initial={{ y: "110%", rotate: 4 }} animate={{ y: "0%", rotate: 0 }} transition={{ duration: 1, ease, delay: d + i * 0.07 }}>{w}</motion.span></span></Fragment>)}</span>;
}

/** Number that counts up once it scrolls into view. */
export function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null); const seen = useInView(ref, { once: true, margin: "-15%" }); const [v, setV] = useState(0);
  useEffect(() => { if (!seen) return; const c = animate(0, to, { duration: 2, ease, onUpdate: setV }); return () => c.stop(); }, [seen, to]);
  const dec = to % 1 ? 1 : 0;
  return <span ref={ref}>{v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec })}{suffix}</span>;
}
