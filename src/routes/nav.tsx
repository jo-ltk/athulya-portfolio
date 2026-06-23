import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "@/components/portfolio";

export const Route = createFileRoute("/nav")({
  head: () => ({ meta: [{ title: "Navigate — ATHULIYA" }] }),
  component: NavPage,
});

const sections = [
  { to: "/about", label: "About Me", num: "01" },
  { to: "/achievements", label: "Achievements", num: "02" },
  { to: "/projects", label: "Projects", num: "03" },
] as const;

function NavPage() {
  return (
    <PageShell>
      <div className="min-h-screen px-6 py-10 md:px-16 md:py-14 flex flex-col">
        <header className="flex items-center justify-between">
          <Link to="/" className="font-display text-2xl text-violet">ATHULIYA</Link>
          <Link to="/contact" className="text-[11px] uppercase tracking-[0.35em] text-ink hover:text-violet transition-colors">
            Contact →
          </Link>
        </header>

        <div className="mt-12 md:mt-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] uppercase tracking-[0.4em] text-violet-deep"
          >
            ✦ Index
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 font-display leading-[0.9] text-ink"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            Welcome to my <span className="font-italic-serif italic text-violet">little</span> corner.
          </motion.h1>
        </div>

        <nav className="mt-16 flex-1 flex flex-col justify-center divide-y divide-violet/20 border-y border-violet/20">
          {sections.map((s, i) => (
            <motion.div
              key={s.to}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
            >
              <Link
                to={s.to}
                className="group flex items-baseline justify-between py-6 md:py-8 px-2 hover:px-6 transition-all duration-500"
              >
                <span className="flex items-baseline gap-4 md:gap-8">
                  <span className="font-italic-serif italic text-violet text-lg md:text-xl">{s.num}</span>
                  <span className="font-display text-ink group-hover:text-violet transition-colors duration-500"
                        style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                    {s.label}
                  </span>
                </span>
                <span className="font-display text-violet opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-3xl md:text-5xl">
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </PageShell>
  );
}
