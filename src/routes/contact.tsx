import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "@/components/portfolio";
import { BackBar } from "./about";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — ATHULIYA" }] }),
  component: ContactPage,
});

const socials = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Behance", href: "https://behance.net/" },
];

function ContactPage() {
  return (
    <PageShell>
      <div className="min-h-screen flex flex-col px-6 py-10 md:px-16 md:py-14">
        <BackBar />

        <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full py-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[11px] uppercase tracking-[0.4em] text-violet-deep">✦ Get in touch</motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-display leading-[0.95] text-ink"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            Let's create <span className="font-italic-serif italic text-violet">something</span> together.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-8 font-italic-serif text-xl md:text-2xl text-ink/80 max-w-2xl"
          >
            [Your welcoming message — say hello, share what kinds of collaborations excite you, and invite the reader in.]
          </motion.p>

          <motion.a
            href="mailto:youremail@email.com"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-12 block font-display text-violet hover:text-violet-deep transition-colors break-all"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
          >
            youremail@email.com
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <a
              href="mailto:youremail@email.com"
              className="group inline-flex items-center gap-3 bg-violet text-cream px-8 py-4 text-[11px] uppercase tracking-[0.35em] hover:bg-violet-deep transition-all duration-500 animate-pulse-glow"
            >
              Send an email
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <div className="flex gap-6">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  className="relative text-[11px] uppercase tracking-[0.3em] text-ink hover:text-violet transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-violet hover:after:w-full after:transition-all after:duration-500">
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <footer className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-t border-violet/20 pt-6 text-[10px] uppercase tracking-[0.35em] text-violet-deep/70">
          <span>© 2025 ATHULIYA — All Rights Reserved</span>
          <span className="font-italic-serif italic text-sm normal-case tracking-normal text-violet">made with care ✦</span>
        </footer>
      </div>
    </PageShell>
  );
}
