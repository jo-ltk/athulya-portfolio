import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell, Placeholder, AnimatedWord } from "@/components/portfolio";
import coverPageImage from "@/assets/cover-page-image.png";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ATHULIYA — Portfolio" },
      { name: "description", content: "Personal portfolio of Athuliya — designer & illustrator." },
    ],
  }),
  component: Cover,
});

function Cover() {
  return (
    <PageShell>
      <Link to="/nav" className="block min-h-screen cursor-pointer">
        <div
          className="relative grid min-h-screen grid-cols-12 gap-4 px-6 py-8 md:px-12 md:py-10"
        >
          {/* top-right email */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="col-span-12 flex justify-end font-italic-serif text-base md:text-xl text-ink"
          >
            <span>athuliyareji@gmail.com</span>
          </motion.div>

          {/* central composition */}
          <div className="col-span-12 relative flex items-center justify-center">
            {/* photo placeholder behind */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-[58%] max-w-[580px] min-w-[300px]"
            >
              {/* violet horizontal shade behind subject */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-[-20%] top-1/2 -translate-y-1/2 h-[55%] z-0"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 100% at 50% 50%, oklch(0.62 0.25 300 / 0.9) 0%, oklch(0.52 0.24 295 / 0.6) 45%, transparent 80%)",
                  filter: "blur(20px)",
                }}
              />
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={coverPageImage} alt="Athuliya portrait" className="h-full w-full object-contain" />
              </div>
            </motion.div>

            {/* huge ATHULIYA behind image, top-left */}
            <h1 className="pointer-events-none absolute left-[-2%] top-[2%] z-[5] text-left font-display leading-[0.82] text-ink whitespace-nowrap"
                style={{ fontSize: "clamp(5rem, 18vw, 18rem)" }}>
              <AnimatedWord text="ATHULIYA" delay={0.6} />
            </h1>

            {/* italic Portfolio tagline mid-right */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="pointer-events-none absolute right-[4%] top-[52%] z-30 font-italic-serif italic text-ink"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)", lineHeight: 1 }}
            >
              Portfolio
            </motion.div>
          </div>

          {/* bottom hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.6 }}
            className="absolute inset-x-0 bottom-4 text-center text-[10px] uppercase tracking-[0.4em] text-violet-deep/70"
          >
            click anywhere to enter ✦
          </motion.div>
        </div>
      </Link>
    </PageShell>
  );
}
