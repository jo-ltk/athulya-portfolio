import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "@/components/portfolio";
import { BackBar } from "./about";

import ill1 from "@/assets/illustration-works/illustration work 1.png";
import ill2 from "@/assets/illustration-works/illustration work 2.png";
import ill3 from "@/assets/illustration-works/illustration work 3.png";
import ill4 from "@/assets/illustration-works/illustration work 4.png";
import ill5 from "@/assets/illustration-works/illustration work 5.png";
import ill6 from "@/assets/illustration-works/illustration work 6.png";
import ill7 from "@/assets/illustration-works/illustration work 7.png";
import ill8 from "@/assets/illustration-works/illustration work 8.png";

export const Route = createFileRoute("/projects/illustration")({
  head: () => ({ meta: [{ title: "Illustration — ATHULIYA" }] }),
  component: IllustrationPage,
});

const illustrations = [
  { img: ill1, title: "Character Design" },
  { img: ill2, title: "Concept Sketch" },
  { img: ill3, title: "Digital Painting" },
  { img: ill4, title: "Narrative Illustration" },
  { img: ill5, title: "Line Art Study" },
  { img: ill6, title: "Vector Artwork" },
  { img: ill7, title: "Surreal Composition" },
  { img: ill8, title: "Fantasy Poster" },
];

function IllustrationPage() {
  return (
    <PageShell>
      <div className="min-h-screen px-6 py-10 md:px-16 md:py-14">
        <BackBar to="/projects" label="Back to projects" />

        <div className="mt-14">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[11px] uppercase tracking-[0.4em] text-violet-deep">✦ Projects / 02</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="mt-3 font-display leading-[0.9] text-ink" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            <span className="font-italic-serif italic text-violet">Illustration</span> gallery
          </motion.h1>
        </div>

        <div className="mt-12 grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3">
          {illustrations.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05, duration: 0.7 }}
              className="group relative cursor-pointer"
            >
              <div className="overflow-hidden transition-transform duration-500 group-hover:-translate-y-2 border border-violet/10 aspect-square">
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="h-full w-full object-cover filter saturate-75 contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105" 
                />
              </div>
              <div className="absolute inset-0 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-violet/85 pointer-events-none">
                <div className="flex flex-col">
                  <span className="font-italic-serif italic text-cream text-xl leading-tight">{p.title}</span>
                  <span className="text-[9px] uppercase tracking-widest text-cream/70 mt-1">artwork · 0{i + 1}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
