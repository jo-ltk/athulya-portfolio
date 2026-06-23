import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "@/components/portfolio";
import { BackBar } from "./about";

import graphicCover from "@/assets/cover-images/graphic design cover image.png";
import illustrationCover from "@/assets/cover-images/illustration cover image.png";
import spaceCover from "@/assets/cover-images/space design cover image.jpg";

export const Route = createFileRoute("/projects/")({
  head: () => ({ meta: [{ title: "Projects — ATHULIYA" }] }),
  component: ProjectsPage,
});

const categories = [
  { to: "/projects/graphic" as const, label: "Graphic Design", num: "01", image: graphicCover },
  { to: "/projects/illustration" as const, label: "Illustration", num: "02", image: illustrationCover },
  { to: "/projects/space" as const, label: "Space Design", num: "03", image: spaceCover },
];

function ProjectsPage() {
  return (
    <PageShell>
      <div className="min-h-screen px-6 py-10 md:px-16 md:py-14">
        <BackBar />

        <div className="mt-14">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[11px] uppercase tracking-[0.4em] text-violet-deep">✦ 03 — Projects</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="mt-3 font-display leading-[0.9] text-ink" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Choose a <span className="font-italic-serif italic text-violet">category</span>
          </motion.h1>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {categories.map((c, i) => (
            <motion.div key={c.to}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <Link to={c.to}
                className="group flex flex-col h-full overflow-hidden border border-violet/20 bg-cream transition-all duration-500 hover:border-violet/60 hover:shadow-xl hover:-translate-y-1 rounded-xl">
                
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream border-b border-violet/10">
                  <img 
                    src={c.image} 
                    alt={c.label} 
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter saturate-[0.85] contrast-[1.02] group-hover:saturate-100"
                  />
                  {/* Subtle elegant color overlay that fades out on hover */}
                  <div className="absolute inset-0 bg-violet-deep/5 mix-blend-multiply opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
                </div>

                {/* Info Container */}
                <div className="flex-1 flex flex-col justify-between p-6 md:p-8">
                  <div className="flex justify-between items-start gap-4">
                    <h2 className="font-display leading-tight text-ink group-hover:text-violet transition-colors duration-300"
                        style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.85rem)" }}>
                      {c.label}
                    </h2>
                    <span className="font-italic-serif italic text-violet text-lg font-medium leading-none">{c.num}</span>
                  </div>
                  
                  <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-violet-deep font-semibold">
                    <span className="h-px w-8 bg-violet group-hover:w-12 transition-all duration-500" />
                    Explore
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
