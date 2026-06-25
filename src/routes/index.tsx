import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import portraitNobg from "@/assets/cover-page-image.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ATHULIYA — Portfolio" },
      {
        name: "description",
        content: "Personal portfolio of Athuliya — designer & illustrator.",
      },
    ],
  }),
  component: Cover,
});

const LETTERS = ["A", "T", "H", "U", "L", "I", "Y", "A"];

function Cover() {
  const [lettersVisible, setLettersVisible] = useState(false);
  const [uiVisible, setUiVisible] = useState(false);
  const [lineVisible, setLineVisible] = useState(false);
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const [easterFound, setEasterFound] = useState(false);
  const [glitching, setGlitching] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const clickCountRef = useRef(0);
  const glitchTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const particleRafRef = useRef<number>(0);

  // — Boot sequence
  useEffect(() => {
    const t1 = setTimeout(() => setLineVisible(true), 100);
    const t2 = setTimeout(() => setLettersVisible(true), 150);
    const t3 = setTimeout(() => setUiVisible(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // — Parallax on mouse move
  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      const rx = (e.clientX / window.innerWidth - 0.5);
      const ry = (e.clientY / window.innerHeight - 0.5);
      if (nameRef.current) {
        nameRef.current.style.transform = `translate(${rx * 18}px, ${ry * 8}px)`;
      }
      if (portraitRef.current) {
        portraitRef.current.style.transform = `translateX(-50%) translate(${rx * -24}px, ${ry * -12}px)`;
      }
    }
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // — Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx = context;

    let W = 0, H = 0;
    const colors = ["#5B1A8D", "#EBDDC3", "#9B6AC0"];
    type Particle = { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string; shape: "circle" | "cross" };
    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      particles = Array.from({ length: 40 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.2 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() > 0.5 ? "circle" : "cross",
      }));
    }
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, W, H);
      frame++;
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
        p.alpha = Math.sin(frame * 0.012 + p.x * 0.008) * 0.12 + 0.08;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;
        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x - p.size, p.y); ctx.lineTo(p.x + p.size, p.y);
          ctx.moveTo(p.x, p.y - p.size); ctx.lineTo(p.x, p.y + p.size);
          ctx.stroke();
        }
        ctx.restore();
      });
      particleRafRef.current = requestAnimationFrame(animate);
    }
    particleRafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(particleRafRef.current);
    };
  }, []);

  // — Random glitch
  useEffect(() => {
    glitchTimerRef.current = setInterval(() => {
      if (Math.random() > 0.88) {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 110);
      }
    }, 3200);
    return () => { if (glitchTimerRef.current) clearInterval(glitchTimerRef.current); };
  }, []);

  // — Easter egg: click anywhere 7 times
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (easterFound) return;
      clickCountRef.current++;
      if (clickCountRef.current >= 7) {
        setEasterEggOpen(true);
        setEasterFound(true);
        spawnSparkles(e.clientX, e.clientY);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [easterFound]);

  function spawnSparkles(cx: number, cy: number) {
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const dist = 45 + Math.random() * 40;
      const el = document.createElement("div");
      el.style.cssText = `
        position:fixed;pointer-events:none;z-index:9997;
        left:${cx}px;top:${cy}px;
        width:7px;height:7px;
        background:${i % 2 === 0 ? "#5B1A8D" : "#EBDDC3"};
        border-radius:50%;
        transform:translate(-50%,-50%);
        transition:transform 0.75s ease, opacity 0.75s ease;
        opacity:1;
      `;
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        el.style.transform = `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px))`;
        el.style.opacity = "0";
      });
      setTimeout(() => el.remove(), 800);
    }
  }

  return (
    <>

      {/* ─── Main Stage ────────────────────────────────── */}
      <main className="cover-main">
        {/* Grain overlay */}
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 2,
            pointerEvents: "none", opacity: 0.025,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "150px 150px",
          }}
        />

        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", width: "100%", height: "100%" }}
        />

        {/* Top-right Contact Link */}
        <div
          className={`absolute top-6 right-6 md:top-10 md:right-16 z-40 transition-opacity duration-[1000ms] delay-[1200ms] ${
            uiVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            to="/contact"
            className="text-[11px] uppercase tracking-[0.35em] text-ink hover:text-violet transition-colors duration-300 font-semibold"
          >
            Contact
          </Link>
        </div>

        {/* Bottom progress line */}
        <div
          style={{
            position: "absolute", bottom: 0, left: 0,
            height: 3,
            background: "linear-gradient(90deg, #5B1A8D, #EBDDC3)",
            zIndex: 60,
            width: lineVisible ? "100%" : "0%",
            transition: "width 1.4s ease 0.3s",
          }}
        />

        {/* ── ATHULIYA letters ── */}
        <div className="cover-name-container">
          <div
            style={{
              transform: glitching ? "skewX(-3deg)" : "none",
              transition: "transform 0.1s ease",
            }}
          >
            <h1
              ref={nameRef}
              className="cover-name"
              style={{
                textShadow: glitching
                  ? "5px 5px 0 #EBDDC3, -2px -2px 0 #9B6AC0"
                  : "5px 5px 0 #EBDDC3",
              }}
            >
              {LETTERS.map((char, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    transform: lettersVisible ? "translateY(0)" : "translateY(240px)",
                    opacity: lettersVisible ? 1 : 0,
                    transition: `transform .7s cubic-bezier(.22,1,.36,1) ${i * 0.07}s, opacity .7s ease ${i * 0.07}s`,
                  }}
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* ── Portrait ── */}
        <div
          ref={portraitRef}
          className="cover-portrait-container"
        >
          <img
            src={portraitNobg}
            alt="Athuliya"
            style={{
              width: "auto",
              height: "100%",
              objectFit: "contain",
              filter: "drop-shadow(0 25px 40px rgba(0,0,0,0.08))",
              animation: "floatAnim 6s ease-in-out infinite",
            }}
          />
        </div>

        {/* ── Creative Designer tag ── */}
        <div
          className={`cover-designer-tag ${uiVisible ? "visible" : ""}`}
        >
          CREATIVE DESIGNER
        </div>



        {/* ── Bottom bar: CTA + Portfolio link ── */}
        <div
          className={`cover-bottom-bar ${uiVisible ? "visible" : ""}`}
        >
          <Link
            to="/nav"
            className="cover-btn"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#4B1675"; (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#5B1A8D"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
          >
            Click Here To Explore
          </Link>

          <Link
            to="/nav"
            className="cover-portfolio-link"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#5B1A8D"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#111"; }}
          >
            Portfolio
            <span style={{
              position: "absolute", left: 0, bottom: -3,
              height: 2, background: "#5B1A8D",
              width: 0,
              transition: "width .4s ease",
            }} className="portfolio-underline" />
          </Link>
        </div>

        {/* ── Easter egg secret trigger (hover right edge) ── */}
        <div
          className="hoverable"
          style={{
            position: "absolute", top: "50%", right: "3%",
            transform: "translateY(-50%)",
            width: 28, height: 28,
            zIndex: 50,
            cursor: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: easterFound ? 1 : 0,
            transition: "opacity .4s",
            fontSize: 14, color: "#5B1A8D",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.4"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = easterFound ? "1" : "0"; }}
          onClick={(e) => { e.stopPropagation(); setEasterEggOpen(true); setEasterFound(true); spawnSparkles(e.clientX, e.clientY); }}
        >
          ✦
        </div>

        {/* ── Easter egg popup ── */}
        {easterEggOpen && (
          <div
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              background: "#5B1A8D",
              borderRadius: "1.2rem",
              padding: "1.5rem 2rem",
              zIndex: 100,
              textAlign: "center",
              maxWidth: 280,
              animation: "popIn .4s cubic-bezier(.34,1.56,.64,1) forwards",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: "1.8rem" }}>✦</div>
            <p style={{
              fontFamily: "'Architects Daughter', cursive",
              fontSize: ".8rem",
              lineHeight: 1.6,
              letterSpacing: ".05em",
              color: "#EBDDC3",
              marginTop: ".5rem",
              textTransform: "none",
            }}>
              You found the secret! Athuliya hides magic in every pixel. Now you know where to look.
            </p>
            <button
              onClick={() => setEasterEggOpen(false)}
              style={{
                marginTop: "1rem",
                background: "#EBDDC3",
                border: "none",
                borderRadius: 999,
                padding: ".4rem 1.2rem",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: ".8rem",
                letterSpacing: ".1em",
                color: "#5B1A8D",
                cursor: "pointer",
              }}
            >
              Close ✕
            </button>
          </div>
        )}
      </main>

      {/* ─── Global keyframes ─────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Architects+Daughter&display=swap');

        /* Hide custom cursor on touch devices */
        @media (hover: none) {
          .custom-cursor-container {
            display: none !important;
          }
          * {
            cursor: auto !important;
          }
        }

        /* Hide default cursor globally on desktop if hover is supported */
        @media (hover: hover) {
          * {
            cursor: none !important;
          }
        }

        @keyframes floatAnim {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes popIn {
          from { transform: translate(-50%,-50%) scale(0); opacity: 0; }
          to   { transform: translate(-50%,-50%) scale(1); opacity: 1; }
        }

        /* Portfolio link underline on hover */
        a:hover .portfolio-underline { width: 100% !important; }

        /* Cover layout classes */
        .cover-main {
          position: relative;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          background: #fff;
        }
        @media (hover: hover) {
          .cover-main {
            cursor: none;
          }
        }

        .cover-name-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 15vh; /* Responsive padding */
          pointer-events: none;
          z-index: 0;
        }
        @media (min-width: 768px) {
          .cover-name-container {
            padding-top: 14vh;
          }
        }

        .cover-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(6rem, min(26vw, 32vh), 18rem); /* Limit height too */
          line-height: 0.85;
          letter-spacing: -0.03em;
          color: #5B1A8D;
          white-space: nowrap;
          will-change: transform;
          user-select: none;
          transition: transform .05s linear, text-shadow .05s;
        }
        @media (min-width: 768px) {
          .cover-name {
            font-size: clamp(8rem, min(24vw, 40vh), 32rem); /* Dynamic based on min width/height */
          }
        }

        .cover-portrait-container {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          z-index: 30;
          width: clamp(280px, 85vw, 460px);
          height: 65vh;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          pointer-events: none;
          will-change: transform;
          transition: bottom 0.3s ease, width 0.3s ease, height 0.3s ease;
        }
        @media (min-width: 768px) {
          .cover-portrait-container {
            bottom: 0;
            width: clamp(340px, 40vw, 620px);
            height: 70vh; /* Constrain image height so it doesn't clip top/bottom on short screens */
          }
        }
        @media (min-width: 768px) and (min-height: 800px) {
          .cover-portrait-container {
            height: 75vh; /* Can be taller on larger screens */
          }
        }

        .cover-designer-tag {
          position: absolute;
          font-family: 'Architects Daughter', cursive;
          font-style: italic;
          font-size: clamp(.65rem, 1.2vw, 1.05rem);
          letter-spacing: .18em;
          color: #333;
          z-index: 40;
          top: 10vh;
          left: 50%;
          text-align: center;
          white-space: nowrap;
          transition: opacity .8s ease .9s, transform .8s ease .9s;
          transform: translate(-50%, 16px);
          opacity: 0;
        }
        .cover-designer-tag.visible {
          transform: translate(-50%, 0);
          opacity: 1;
        }
        @media (min-width: 768px) {
          .cover-designer-tag {
            left: auto;
            right: 8%;
            top: 40%;
            text-align: right;
            transform: translateY(16px);
          }
          .cover-designer-tag.visible {
            transform: translateY(0);
          }
        }
        @media (min-width: 768px) and (max-height: 800px) {
          .cover-designer-tag {
            top: 36%;
          }
        }
        @media (min-width: 768px) and (max-height: 680px) {
          .cover-designer-tag {
            top: 32%;
          }
        }

        .cover-bottom-bar {
          position: absolute;
          bottom: 1.5rem;
          left: 0;
          right: 0;
          z-index: 40;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem; /* Slightly smaller gap to save horizontal space on mobile */
          padding: 0 1rem;
          transition: opacity 0.8s ease 1s, transform 0.8s ease 1s;
          transform: translateY(30px);
          opacity: 0;
        }
        .cover-bottom-bar.visible {
          transform: translateY(0);
          opacity: 1;
        }
        @media (min-width: 768px) {
          .cover-bottom-bar {
            bottom: 2rem;
            justify-content: space-between;
            padding: 0 3rem;
            gap: 2rem;
          }
        }

        .cover-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: #5B1A8D;
          padding: .75rem 1.4rem; /* Optimized mobile padding */
          font-size: .58rem; /* Optimized mobile font-size */
          font-weight: 700;
          letter-spacing: .18em;
          color: #fff;
          text-transform: uppercase;
          border: none;
          cursor: none;
          text-decoration: none;
          white-space: nowrap; /* Ensures button text never wraps */
          transition: background .3s, transform .2s;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .cover-btn {
            padding: .9rem 2rem;
            font-size: .65rem;
            letter-spacing: .25em;
          }
        }

        .cover-portfolio-link {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.75rem; /* Optimized mobile font-size */
          letter-spacing: .12em;
          color: #111;
          text-transform: uppercase;
          cursor: none;
          text-decoration: none;
          white-space: nowrap; /* Prevents wrapping */
          position: relative;
          transition: color .3s;
        }
        @media (min-width: 768px) {
          .cover-portfolio-link {
            font-size: 2.2rem;
            letter-spacing: .15em;
          }
        }
      `}</style>
    </>
  );
}

export default Cover;
