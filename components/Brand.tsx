"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const NAME = "Palash Makwana";
const GLYPHS = "01<>/{}#$%&";
const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Text that decodes from random glyphs into the real string (logo concept 09). */
export function Scramble({ text = NAME, start = true, delay = 0, className = "" }: { text?: string; start?: boolean; delay?: number; className?: string }) {
  const [out, setOut] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const run = useCallback(() => {
    if (reduced()) return;
    clearInterval(timer.current);
    let f = 0;
    const total = 28;
    timer.current = setInterval(() => {
      setOut(text.split("").map((c, i) => (c === " " || i < (f * text.length) / total ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(""));
      if (++f > total) {
        clearInterval(timer.current);
        setOut(text);
      }
    }, 40);
  }, [text]);
  useEffect(() => {
    if (!start) return;
    const d = setTimeout(run, delay);
    return () => {
      clearTimeout(d);
      clearInterval(timer.current);
    };
  }, [start, delay, run]);
  return (
    <span className={className} onMouseEnter={run}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="whitespace-pre">{out}</span>
    </span>
  );
}

/** "PM" inside a spinning gradient ring (logo concept 13). */
export function Orbit({ size, ring = 2, className = "", textClass = "" }: { size: number | string; ring?: number; className?: string; textClass?: string }) {
  return (
    <span className={`relative inline-grid shrink-0 place-items-center rounded-full ${className}`} style={{ width: size, height: size }}>
      <span className="absolute inset-0 animate-[spin_4s_linear_infinite] rounded-full bg-[conic-gradient(#6e8bff,#a855f7,#ff6b9d,#6e8bff)]" aria-hidden />
      <span className="absolute rounded-full bg-[#0b0b0f]" style={{ inset: ring }} aria-hidden />
      <span className={`relative font-semibold tracking-[-0.04em] text-[#f5f5f7] ${textClass}`}>PM</span>
    </span>
  );
}
