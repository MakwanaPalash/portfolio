import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/data/site";
const title = "Palash Makwana — Backend Engineer | Node.js & NestJS";
const description = "Backend engineer with 3.5+ years of experience building scalable APIs, production systems, databases, integrations and real-time applications using Node.js and NestJS.";
export const metadata: Metadata = { metadataBase: new URL(site.url), title, description,
  openGraph: { title, description, type: "website" }, twitter: { card: "summary_large_image", title, description } };
const splash = `<svg width="240" height="128" viewBox="0 0 150 80"><defs><linearGradient id="intro-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6e8bff"/><stop offset=".5" stop-color="#a855f7"/><stop offset="1" stop-color="#ff6b9d"/></linearGradient></defs><g fill="none" stroke="url(#intro-g)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path pathLength="1" d="M45 70V10H65a15 15 0 0 1 0 30H45"/><path pathLength="1" d="M45 10L77 54L109 10V70"/></g></svg>`;
// Holds until the M finishes (0.5s delay + 1.5s draw), fades out, then tells the page to play its entrance.
const splashScript = `(function(){var d=document.documentElement,el=document.getElementById("intro");function done(){window.__introDone=1;window.dispatchEvent(new Event("intro:done"))}
if(!el||d.dataset.intro==="seen")return done();d.style.overflow="hidden";var t=setTimeout(out,2300);el.addEventListener("click",out);
function out(){if(el.classList.contains("out"))return;clearTimeout(t);el.classList.add("out");d.style.overflow="";done();setTimeout(function(){el.style.display="none"},750)}})();`;
export default function Root({ children }: { children: React.ReactNode }) {
  const ld = { "@context": "https://schema.org", "@type": "Person", name: site.name, jobTitle: "Backend Engineer", url: site.url, sameAs: [site.linkedin] };
  // Runs before paint: skip the splash for reduced-motion users.
  const intro = `try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="seen"}catch(e){}`;
  return (<html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: intro }} /></head><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    {/* Splash: logo concept 04 (stroke draw). Pure CSS, so it animates from first paint without waiting for JS. */}
    <div id="intro" aria-hidden suppressHydrationWarning dangerouslySetInnerHTML={{ __html: splash }} />
    <script dangerouslySetInnerHTML={{ __html: splashScript }} />
    {children}</body></html>);
}
