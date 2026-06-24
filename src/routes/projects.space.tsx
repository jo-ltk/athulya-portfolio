import { useState, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "@/components/portfolio";
import { BackBar } from "./about";
import { Lightbox } from "@/components/Lightbox";
import spaceCover from "@/assets/cover-images/space design cover image.jpg";

import sp1 from "@/assets/space-projects/space design project 1.jpg";
import sp2 from "@/assets/space-projects/space design project 2.jpg";
import sp3 from "@/assets/space-projects/space design project 3.jpg";
import sp4 from "@/assets/space-projects/space design project 4.jpg";
import sp5 from "@/assets/space-projects/space design project 5.jpg";

export const Route = createFileRoute("/projects/space")({
  head: () => ({ meta: [{ title: "Space Design — ATHULIYA" }] }),
  component: SpacePage,
});

const spaceProjects = [
  { img: sp1, title: "Shams" },
  { img: sp2, title: "Residence" },
  { img: sp3, title: "Korean Inns" },
  { img: sp4, title: "One Central" },
  { img: sp5, title: "Cari" },
];

// Include cover as the first lightbox image, followed by gallery images
const lightboxImages = [
  { src: spaceCover, title: "Space Design Showcase" },
  ...spaceProjects.map((p) => ({ src: p.img, title: p.title })),
];

function SpacePage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const onClose = useCallback(() => setLightboxIndex(null), []);
  const onPrev = useCallback(() => setLightboxIndex((i) => (i !== null ? (i - 1 + lightboxImages.length) % lightboxImages.length : null)), []);
  const onNext = useCallback(() => setLightboxIndex((i) => (i !== null ? (i + 1) % lightboxImages.length : null)), []);

  return (
    <PageShell>
      <div className="min-h-screen px-6 py-10 md:px-16 md:py-14">
        <BackBar to="/projects" label="Back to projects" />

        <div className="mt-14">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[11px] uppercase tracking-[0.4em] text-violet-deep">✦ Projects / 03</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="mt-3 font-display leading-[0.9] text-ink" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Space <span className="font-italic-serif italic text-violet">Design</span>
          </motion.h1>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7 cursor-pointer"
            onClick={() => setLightboxIndex(0)}
          >
            <div className="aspect-[16/10] overflow-hidden border border-violet/20 bg-cream">
              <img 
                src={spaceCover} 
                alt="Space Design Showcase" 
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="md:col-span-5"
          >
            <h2 className="font-display text-2xl text-ink">Conceptual Spatial Planning</h2>
            <p className="mt-4 font-italic-serif text-lg leading-relaxed text-ink/80">
              Exploring the intersection of environment, structure, and human flow. These projects span corporate offices, residential interiors, cultural spaces, and conceptual installations — each designed to create meaningful spatial experiences.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Exhibition Design", "Interior Architecture", "Spatial Concept", "Corporate Interiors"].map((tag) => (
                <span key={tag} className="border border-violet/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-violet-deep">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Project gallery ───────────────────────── */}
        <div className="mt-16 grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
          {spaceProjects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 2) * 0.08 + Math.floor(i / 2) * 0.05, duration: 0.7 }}
              className="group relative cursor-pointer"
              onClick={() => setLightboxIndex(i + 1)}
            >
              <div className="overflow-hidden transition-transform duration-500 group-hover:-translate-y-2 border border-violet/10 aspect-[16/10]">
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="h-full w-full object-cover filter saturate-75 contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105" 
                />
              </div>
              <div className="absolute inset-0 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-violet/85 pointer-events-none">
                <div className="flex flex-col">
                  <span className="font-italic-serif italic text-cream text-lg leading-tight">{p.title}</span>
                  <span className="text-[9px] uppercase tracking-widest text-cream/70 mt-1">project · {String(i + 1).padStart(2, "0")}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={onClose}
        onPrev={onPrev}
        onNext={onNext}
      />
    </PageShell>
  );
}
