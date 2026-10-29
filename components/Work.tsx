"use client";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects, stats, type Project } from "@/data/site";
import { Count, Eyebrow, Fade, G, ease } from "./ui";

export function Stats() {
  return <section className="bg-black px-6 pb-32"><div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-14 border-t border-white/10 pt-16 md:grid-cols-4">
    {stats.map(([n, s, l], i) => <Fade key={l} d={i * 0.08}><p className="text-5xl font-semibold tracking-[-0.04em] md:text-7xl"><span className={G}><Count to={n} suffix={s} /></span></p><p className="mt-2 max-w-[12rem] text-[#86868b]">{l}</p></Fade>)}</div></section>;
}

/** Apple-style title that starts huge and settles into place as you scroll. */
function ZoomTitle() {
  const ref = useRef(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.45], [2.2, 1]), opacity = useTransform(scrollYProgress, [0.05, 0.3, 0.75, 0.95], [0, 1, 1, 0]);
  return <div ref={ref} className="relative h-[140vh]"><div className="sticky top-0 grid h-screen place-items-center overflow-hidden px-6 text-center">
    <motion.div style={{ scale, opacity }} className="will-change-transform"><Eyebrow dark>SYSTEMS I&apos;VE BUILT</Eyebrow><h2 className="text-[clamp(3rem,10vw,8.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]">Real products.<br /><span className={G}>Real production.</span></h2></motion.div></div></div>;
}

function Card({ p, i, open }: { p: Project; i: number; open: () => void }) {
  return <Fade d={(i % 3) * 0.08} className="h-full"><button type="button" onClick={open} aria-label={`Learn more about ${p.name}`}
    className="group relative flex h-full min-h-[440px] w-full flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-[#111113] p-8 text-left transition duration-500 ease-out hover:-translate-y-1.5 hover:border-white/20">
    <div className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-700 group-hover:opacity-100" style={{ background: `radial-gradient(70% 60% at 100% 0%, ${p.accent}55, transparent 70%)` }} aria-hidden />
    <div className="relative">
      <div className="flex items-center justify-between gap-3 text-sm font-semibold"><span style={{ color: p.accent }}>{p.n} · {p.stamp}</span>{p.featured && <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-[#d2d2d7]">Featured</span>}</div>
      <h4 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">{p.name}</h4><p className="mt-3 text-xl text-[#d2d2d7]">{p.tag}</p>
      <p className="mt-4 line-clamp-3 text-[#86868b]">{p.desc}</p>
    </div>
    <div className="relative mt-8">
      {p.stats && <dl className="mb-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">{p.stats.map(([v, l]) => <div key={l}><dt className="text-xl font-semibold tracking-tight">{v}</dt><dd className="mt-1 text-xs text-[#86868b]">{l}</dd></div>)}</dl>}
      <div className="flex flex-wrap gap-2">{p.stack.slice(0, 4).map(s => <span key={s} className="rounded-full bg-white/[.07] px-3 py-1 text-xs text-[#d2d2d7]">{s}</span>)}</div>
      <div className="mt-5 flex items-center justify-between"><span className="text-sm text-[#6e6e73]">{p.domain}</span><span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-xl transition group-hover:rotate-90 group-hover:bg-white group-hover:text-black">+</span></div>
    </div>
  </button></Fade>;
}

/** One grid, one card style: featured projects lead, the rest follow. */
function Grid({ list, open }: { list: Project[]; open: (p: Project) => void }) {
  return <div className="mx-auto max-w-6xl px-6"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{list.map((p, i) => <Card key={p.slug} p={p} i={i} open={() => open(p)} />)}</div></div>;
}

const tabs = ["Context", "Problem", "Product", "My role", "Architecture"] as const;
function Sheet({ p, close }: { p: Project; close: () => void }) {
  const [t, setT] = useState<(typeof tabs)[number]>("Context");
  const list = (xs: string[]) => <ul className="space-y-3">{xs.map((c, i) => <motion.li key={c} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.5, ease }} className="flex gap-3"><span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />{c}</motion.li>)}</ul>;
  const body: Record<string, React.ReactNode> = {
    Context: <><p>{p.desc}</p><dl className="mt-8 divide-y divide-white/10 border-y border-white/10 text-base">{([["Domain", p.domain], ["Role", p.role], ["Period", p.period], ["Stack", p.stack.join(" · ")]] as const).map(([k, v]) => <div key={k} className="flex justify-between gap-6 py-3"><dt className="text-[#6e6e73]">{k}</dt><dd className="text-right">{v}</dd></div>)}</dl></>,
    Problem: <p>{p.problem}</p>, Product: list(p.caps), "My role": list(p.resp),
    Architecture: <ol className="space-y-2">{p.flow.map((f, i) => <motion.li key={f} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12, duration: 0.6, ease }}>
      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.04] px-5 py-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm text-black" style={{ background: p.accent }}>{i + 1}</span>{f}</div>
      {i < p.flow.length - 1 && <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: i * 0.12 + 0.3, duration: 0.4 }} className="ml-9 h-4 w-px origin-top bg-white/20" aria-hidden />}</motion.li>)}</ol> };
  return <motion.div role="dialog" aria-modal="true" aria-label={p.name} className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-black/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.25 } }} onClick={close}>
    <motion.div onClick={e => e.stopPropagation()} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%", transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } }} transition={{ type: "spring", damping: 32, stiffness: 260 }} className="relative mx-auto mt-[8vh] min-h-[92vh] max-w-4xl overflow-hidden rounded-t-[2rem] bg-[#1d1d1f] p-8 md:p-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem]" style={{ background: `radial-gradient(50% 60% at 100% 0%, ${p.accent}33, transparent 70%)` }} aria-hidden />
      <button type="button" onClick={close} aria-label="Close" className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 md:right-8 md:top-8">✕</button>
      <p className="relative text-sm font-semibold" style={{ color: p.accent }}>{p.n} · {p.stamp}</p>
      <h3 className="relative mt-2 text-5xl font-semibold tracking-[-0.04em] md:text-7xl">{p.name}</h3><p className="relative mt-3 text-xl text-[#a1a1a6]">{p.tag}</p>
      <div role="tablist" className="relative mt-10 inline-flex flex-wrap gap-1 rounded-full bg-white/10 p-1">{tabs.map(x => <button key={x} role="tab" aria-selected={x === t} onClick={() => setT(x)} className="relative rounded-full px-4 py-1.5 text-sm">
        <span className={`absolute inset-0 rounded-full bg-white transition-all duration-300 ${x === t ? "scale-100 opacity-100" : "scale-90 opacity-0"}`} /><span className={`relative transition-colors ${x === t ? "text-black" : "text-[#d2d2d7]"}`}>{x}</span></button>)}</div>
      <motion.div key={t} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease }} className="relative mt-8 max-w-2xl text-xl leading-relaxed text-[#d2d2d7]">{body[t]}</motion.div></motion.div></motion.div>;
}

export function Systems() {
  const [o, setO] = useState<Project | null>(null); const close = useCallback(() => setO(null), []);
  useEffect(() => {
    if (!o) return;
    const f = (e: KeyboardEvent) => e.key === "Escape" && close(); addEventListener("keydown", f);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { removeEventListener("keydown", f); document.body.style.overflow = prev; };
  }, [o, close]);
  return <section id="systems" className="bg-black pb-32"><ZoomTitle />
    <Grid list={[...projects.filter(p => p.featured), ...projects.filter(p => !p.featured)]} open={setO} />
    <AnimatePresence>{o && <Sheet key={o.slug} p={o} close={close} />}</AnimatePresence></section>;
}
