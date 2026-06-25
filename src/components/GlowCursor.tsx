import { useEffect, useRef, useState } from "react";

export function GlowCursor() {
  const [enabled, setEnabled] = useState(false);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Disable custom cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    function onMouseMove(e: MouseEvent) {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX + "px";
        cursorDotRef.current.style.top = e.clientY + "px";
      }
    }

    function lerpRing() {
      const { x: tx, y: ty } = mousePosRef.current;
      let { x, y } = ringPosRef.current;
      // Smooth lerping
      x += (tx - x) * 0.15;
      y += (ty - y) * 0.15;
      ringPosRef.current = { x, y };
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = x + "px";
        cursorRingRef.current.style.top = y + "px";
      }
      rafRef.current = requestAnimationFrame(lerpRing);
    }

    function onMouseDown() {
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = "translate(-50%, -50%) scale(0.85)";
      }
    }
    function onMouseUp() {
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = "translate(-50%, -50%) scale(1)";
      }
    }

    // Global hover detection for links, buttons, and custom interactive elements
    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      
      const isHoverable = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.closest(".cursor-pointer") ||
        target.closest('[role="button"]') ||
        target.classList.contains("hoverable");

      if (isHoverable) {
        if (cursorDotRef.current) {
          cursorDotRef.current.style.width = "6px";
          cursorDotRef.current.style.height = "6px";
        }
        if (cursorRingRef.current) {
          cursorRingRef.current.style.width = "140px";
          cursorRingRef.current.style.height = "140px";
          cursorRingRef.current.style.opacity = "1";
        }
      } else {
        if (cursorDotRef.current) {
          cursorDotRef.current.style.width = "10px";
          cursorDotRef.current.style.height = "10px";
        }
        if (cursorRingRef.current) {
          cursorRingRef.current.style.width = "90px";
          cursorRingRef.current.style.height = "90px";
          cursorRingRef.current.style.opacity = "0.75";
        }
      }
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);
    rafRef.current = requestAnimationFrame(lerpRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          body, a, button, select, input, textarea, [role="button"], .cursor-pointer {
            cursor: none !important;
          }
        }
      `}</style>
      <div style={{ position: "fixed", pointerEvents: "none", zIndex: 2147483647, left: 0, top: 0 }}>
        <div
          ref={cursorDotRef}
          style={{
            position: "fixed",
            width: 10,
            height: 10,
            background: "#B599FF",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            transition: "width .2s, height .2s, background-color .2s",
            pointerEvents: "none",
          }}
        />
        <div
          ref={cursorRingRef}
          style={{
            position: "fixed",
            width: 90,
            height: 90,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            transition: "width .3s ease, height .3s ease, opacity .3s, transform .15s ease",
            opacity: 0.75,
            pointerEvents: "none",
            // Sharper glow: tighter gradient range and higher center opacity
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(168, 85, 247, 0.2) 40%, rgba(168, 85, 247, 0) 60%)",
          }}
        />
      </div>
    </>
  );
}
