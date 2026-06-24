import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "@/components/portfolio";
import { BackBar } from "./about";

import bmwLogo from "@/assets/brand-logos/BMW LOGO.png";
import flybyLogo from "@/assets/brand-logos/FLYBY LOGO.png";
import havasRedLogo from "@/assets/brand-logos/HAVAS RED LOGO.png";

import cert1 from "@/assets/certificates/CERTIFICATE IMAGE 1.jpeg";
import cert2 from "@/assets/certificates/CERTIFICATE IMAGE 2.jpg";
import cert3 from "@/assets/certificates/CERTIFICATE IMAGE 3.png";

export const Route = createFileRoute("/achievements")({
  head: () => ({ meta: [{ title: "Achievements — ATHULIYA" }] }),
  component: AchievementsPage,
});

const brands = [
  { name: "BMW AGMC", logo: bmwLogo },
  { name: "FLYBY", logo: flybyLogo },
  { name: "HAVAS RED MIDDLE EAST", logo: havasRedLogo },
];

const certificates = [
  { img: cert1, caption: "Practice-Led Research Project Certificate - Sustainable Product Strategies (AGMC)" },
  { img: cert2, caption: "Certificate of Research Contribution - Havas Red Middle East × University of Europe" },
  { img: cert3, caption: "Havas Red Middle East - Research and space design" },
];

function AchievementsPage() {
  return (
    <PageShell>
      <div className="min-h-screen px-6 py-10 md:px-16 md:py-14">
        <BackBar />

        <section className="mt-14">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] uppercase tracking-[0.4em] text-violet-deep">✦ 02 — Achievements</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="mt-3 font-display leading-[0.9] text-ink" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Brands I've <span className="font-italic-serif italic text-violet">worked</span> with
          </motion.h1>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-x-12 gap-y-10">
            {brands.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="flex-1 min-w-[180px] flex items-center justify-center"
              >
                <img
                  src={b.logo}
                  alt={`${b.name} logo`}
                  className="h-16 md:h-20 w-auto max-w-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </section>


        <section className="mt-24">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-display leading-[0.9] text-ink" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            Certifications & <span className="font-italic-serif italic text-violet">recognition</span>
          </motion.h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {certificates.map((c, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="group">
                <div className="overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                  <img
                    src={c.img}
                    alt={`Certificate ${i + 1}`}
                    className="halftone h-full w-full object-cover aspect-[4/5]"
                  />
                </div>
                <p className="mt-3 font-italic-serif italic text-ink/80">{c.caption}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
