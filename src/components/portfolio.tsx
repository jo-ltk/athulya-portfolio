import { type ReactNode } from "react";
import { motion } from "motion/react";

export function Placeholder({
  label,
  className = "",
  aspect = "aspect-[4/5]",
  children,
}: {
  label: string;
  className?: string;
  aspect?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`relative ${aspect} w-full overflow-hidden border-2 border-dashed border-violet/50 bg-violet-soft/10 ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center text-center px-3">
        <div>
          <div className="font-display text-violet text-2xl font-mono bg-gray-200">+</div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-violet-deep/70">{label}</div>
        </div>
      </div>
      {children}
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen w-full"
    >
      {/* ambient floating violet blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-soft/40 blur-3xl animate-float" />
        <div className="absolute top-1/2 -right-40 h-[28rem] w-[28rem] rounded-full bg-violet/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-glow/20 blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>
      {children}
    </motion.main>
  );
}

export function AnimatedWord({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const chars = Array.from(text);
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {chars.map((c, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ whiteSpace: c === " " ? "pre" : undefined }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}
