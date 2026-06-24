import { useState, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "@/components/portfolio";
import { BackBar } from "./about";
import { Lightbox } from "@/components/Lightbox";

import p1 from "@/assets/graphic-projects/graphic design project 1.jpg";
import p2 from "@/assets/graphic-projects/graphic design project 2.jpg";
import p3 from "@/assets/graphic-projects/graphic design project 3.jpg";
import p4 from "@/assets/graphic-projects/graphic design project 4.jpg";
import p5 from "@/assets/graphic-projects/graphic design project 5.jpg";
import p6 from "@/assets/graphic-projects/graphic design project 6.jpg";
import p7 from "@/assets/graphic-projects/graphic design project 7.jpg";
import p8 from "@/assets/graphic-projects/graphic design project 8.jpg";
import p9 from "@/assets/graphic-projects/graphic design project 9.jpg";
import p10 from "@/assets/graphic-projects/graphic design project 10.jpg";
import p11 from "@/assets/graphic-projects/graphic design project 11.jpg";

export const Route = createFileRoute("/projects/graphic")({
  head: () => ({ meta: [{ title: "Graphic Design — ATHULIYA" }] }),
  component: GraphicPage,
});

const graphicProjects = [
  { img: p1, title: "Brand Identity Design" },
  { img: p2, title: "Editorial Layout" },
  { img: p3, title: "Visual Storytelling" },
  { img: p4, title: "Typography Concept" },
  { img: p5, title: "Minimal Poster Series" },
  { img: p6, title: "Package Design" },
  { img: p7, title: "Exhibition Graphics" },
  { img: p8, title: "Creative Branding" },
  { img: p9, title: "Marketing Campaign" },
  { img: p10, title: "Vector Systems" },
  { img: p11, title: "Corporate Design" },
];

const lightboxImages = graphicProjects.map((p) => ({ src: p.img, title: p.title }));

function GraphicPage() {
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
            className="text-[11px] uppercase tracking-[0.4em] text-violet-deep">✦ Projects / 01</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="mt-3 font-display leading-[0.9] text-ink" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Graphic <span className="font-italic-serif italic text-violet">Design</span>
          </motion.h1>
        </div>

        <div className="mt-12 grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {graphicProjects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 4) * 0.08 + Math.floor(i / 4) * 0.05, duration: 0.7 }}
              className="group relative cursor-pointer"
              onClick={() => setLightboxIndex(i)}
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
