import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "@/components/portfolio";
import { BackBar } from "./about";
import spaceCover from "@/assets/cover-images/space design cover image.jpg";

export const Route = createFileRoute("/projects/space")({
  head: () => ({ meta: [{ title: "Space Design — ATHULIYA" }] }),
  component: SpacePage,
});

function SpacePage() {
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
            className="md:col-span-7"
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
              Exploring the intersection of environment, structure, and human flow. This concept design visualizes experimental exhibition layouts, integrating clean minimal geometry, curated lighting, and modern typography to redefine public galleries.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Exhibition Design", "Interior Architecture", "Spatial Concept", "Mockup"].map((tag) => (
                <span key={tag} className="border border-violet/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-violet-deep">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}
