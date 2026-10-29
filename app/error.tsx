"use client";
export default function Err({ reset }: { reset: () => void }) {
  return <main className="p-20"><p className="label">SYSTEM_STATUS: DEGRADED</p><button onClick={reset} className="mt-4 underline">Retry</button></main>;
}
