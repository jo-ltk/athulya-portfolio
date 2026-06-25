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
      <div className="min-h-screen px-6 py-10 md:px-16 md:py-14 flex flex-col gap-8">
        <BackBar />

        {/* ── Hero row ─────────────────────────────── */}
        <div className="mt-8 flex flex-col gap-12 max-w-3xl mx-auto w-full">

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex flex-col"
          >
            <div className="relative h-[300px] sm:h-[400px] md:h-[480px]">
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
            </div>
          </motion.div>

          {/* Text column */}
          <div className="w-full flex flex-col pb-12">
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




          </div>
        </div>


      </div>
    </PageShell>
  );
}

export function BackBar({
  to = "/nav",
  label = "Back to index",
  hideContact = false,
}: {
  to?: "/nav" | "/projects" | "/projects/graphic" | "/projects/illustration";
  label?: string;
  hideContact?: boolean;
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
      <div className="flex items-center gap-6">
        {!hideContact && (
          <Link
            to="/contact"
            className="text-[11px] uppercase tracking-[0.35em] text-ink hover:text-violet transition-colors"
          >
            Contact
          </Link>
        )}
        <Link to="/" className="font-display text-xl text-violet">
          ATHULIYA
        </Link>
      </div>
    </div>
  );
}