import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "@/components/portfolio";
import aboutMeImage from "@/assets/about-me-image.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — ATHULIYA" }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <div className="min-h-screen px-6 py-10 md:px-16 md:py-14">
        <BackBar />
        <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img src={aboutMeImage} alt="Athuliya" className="h-full w-full object-cover halftone" />
            </div>
          </motion.div>

          <div className="md:col-span-7">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-[11px] uppercase tracking-[0.4em] text-violet-deep">✦ 01 — About me</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
              className="mt-4 font-display leading-[0.9] text-ink" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
              Athuliya <span className="font-italic-serif italic text-violet">/ Creative Designer</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
              className="mt-8 font-italic-serif text-xl md:text-2xl leading-relaxed text-ink/85">
              I am a designer and illustrator specializing in branding, spatial concepts, and digital visual narrative. Guided by a love for minimal typography, bold forms, and harmonious colors, I strive to make work that communicates clearly, inspires curiosity, and bridges the gap between imagination and physical form.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-10 flex flex-wrap gap-2">
              {["Graphic Design", "Illustration", "Space Design", "Branding", "Creative Direction"].map((t) => (
                <span key={t} className="border border-violet/40 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-violet-deep hover:bg-violet hover:text-cream transition-colors duration-300">
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export function BackBar({ to = "/nav", label = "Back to index" }: { to?: "/nav" | "/projects" | "/projects/graphic" | "/projects/illustration"; label?: string }) {
  return (
    <div className="flex items-center justify-between">
      <Link to={to} className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-ink hover:text-violet transition-colors">
        <span className="font-display text-2xl group-hover:-translate-x-1 transition-transform">←</span>
        {label}
      </Link>
      <Link to="/" className="font-display text-xl text-violet">ATHULIYA</Link>
    </div>
  );
}
