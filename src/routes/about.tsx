import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "@/components/portfolio";
import aboutMeImage from "@/assets/about-me-image.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — ATHULIYA" }] }),
  component: AboutPage,
});

const disciplines = [
  "Interior Design",
  "Graphic Design",
  "Illustration",
  "Visual Storytelling",
];

const beliefs = [
  { label: "Colour", desc: "Every palette tells a story." },
  { label: "Proportion", desc: "Scale shapes how we feel in space." },
  { label: "Balance", desc: "Stillness achieved through intention." },
];

function AboutPage() {
  return (
    <PageShell>
      <div className="min-h-screen px-6 py-10 md:px-16 md:py-14 flex flex-col justify-between gap-8">
        <BackBar />

        {/* ── Hero row ─────────────────────────────── */}
        <div className="mt-8 grid gap-12 md:grid-cols-12 md:gap-0 items-stretch">

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 md:pr-8 flex flex-col"
          >
            <div className="relative h-[420px] md:h-[580px]">
              {/* Decorative offset border */}
              <div
                className="absolute inset-0 translate-x-3 translate-y-3 border border-violet/30"
                aria-hidden="true"
              />
              <div className="h-full overflow-hidden relative z-10">
                <img
                  src={aboutMeImage}
                  alt="Athuliya"
                  className="h-full w-full object-cover halftone"
                />
              </div>

              {/* Floating discipline badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute -bottom-5 -right-5 z-20 bg-violet px-5 py-3 shadow-lg"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream/70">
                  Based in
                </p>
                <p className="mt-0.5 font-display text-sm text-cream">
                  Dubai, UAE
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text column */}
          <div className="md:col-span-7 md:pl-12 flex flex-col">
            {/* Section tag */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[11px] uppercase tracking-[0.4em] text-violet-deep"
            >
              ✦ 01 — About me
            </motion.p>

            {/* Name + role heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 font-display leading-[0.9] text-ink"
              style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
            >
              Athuliya{" "}
              <span className="font-italic-serif italic text-violet">
                / Designer
              </span>
            </motion.h1>

            {/* Primary bio paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="mt-6 font-italic-serif text-xl md:text-2xl leading-relaxed text-ink/85"
            >
              By profession, an interior designer — but I also work with
              graphics, illustrations, and visual storytelling. I enjoy moving
              between different forms of design rather than staying in just one.
            </motion.p>

            {/* Secondary bio paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.8 }}
              className="mt-4 text-base leading-relaxed text-ink/65"
            >
              My work is simple, thoughtful, and intentional. I pay attention to
              colour, proportion, and balance, believing that every detail
              matters. At its core, my work is about creating experiences that
              feel meaningful, human, and true.
            </motion.p>

            {/* Disciplines tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.8 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {disciplines.map((t) => (
                <span
                  key={t}
                  className="border border-violet/40 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-violet-deep hover:bg-violet hover:text-cream transition-colors duration-300"
                >
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Belief list — pinned to the bottom so this column matches the image column's height */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.8 }}
              className="mt-auto pt-6 divide-y divide-violet/15 border-t border-violet/15"
            >
              {beliefs.map(({ label, desc }, i) => (
                <div
                  key={label}
                  className="group flex items-baseline gap-6 py-3 hover:bg-violet/5 transition-colors duration-300"
                >
                  <span className="font-display text-xs text-violet/50">
                    0{i + 1}
                  </span>
                  <p className="font-display text-2xl text-violet shrink-0">
                    {label}
                  </p>
                  <p className="text-sm text-ink/55 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Closing statement ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 1 }}
          className="mt-20 mb-10 flex flex-col items-center text-center gap-4"
        >
          <p
            className="font-display text-ink/20 leading-tight select-none"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          >
            DESIGN
          </p>
          <p className="max-w-md text-sm text-ink/50 leading-relaxed -mt-4">
            Creating experiences that feel meaningful, human, and true.
          </p>
        </motion.div>
      </div>
    </PageShell>
  );
}

export function BackBar({
  to = "/nav",
  label = "Back to index",
}: {
  to?: "/nav" | "/projects" | "/projects/graphic" | "/projects/illustration";
  label?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <Link
        to={to}
        className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-ink hover:text-violet transition-colors"
      >
        <span className="font-display text-2xl group-hover:-translate-x-1 transition-transform">
          ←
        </span>
        {label}
      </Link>
      <Link to="/" className="font-display text-xl text-violet">
        ATHULIYA
      </Link>
    </div>
  );
}