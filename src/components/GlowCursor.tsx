import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function GlowCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-5 w-5 rounded-full"
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.9) 0%, rgba(139,92,246,0.5) 40%, rgba(139,92,246,0) 70%)",
          boxShadow: "0 0 20px 6px rgba(139,92,246,0.55), 0 0 40px 12px rgba(139,92,246,0.3)",
        }}
      />
    </motion.div>
  );
}
