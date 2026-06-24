import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
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

function Cover() {
return (
<motion.main
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.8 }}
className="relative h-screen w-full overflow-hidden bg-white"
>
  {/* ATHULIYA Text - large background text at the top */}
  <div className="absolute top-0 left-0 right-0 flex justify-center items-start pointer-events-none z-0" style={{ paddingTop: "22vh" }}>
        <motion.h1
          initial={{
            opacity: 0,
            y: 120,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.2,
          }}
          className="
            font-['Bebas_Neue']
            uppercase
            leading-[0.8]
            tracking-[-0.05em]
            text-[#5B1A8D]
            whitespace-nowrap
          "
          style={{
            fontSize: "clamp(9rem,32vw,34rem)",
            textShadow: "6px 6px 0px #EBDDC3",
          }}
        >
          ATHULIYA
        </motion.h1>
  </div>
  {/* Portrait - centered, above the ATHULIYA text */}
  <motion.div
    initial={{
      opacity: 0,
      y: 80,
      scale: 0.9,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    transition={{
      duration: 1.2,
      delay: 0.2,
    }}
    className="
      absolute
      left-1/2
      -translate-x-1/2
      bottom-0
      z-30
      w-[90%]
      sm:w-[70%]
      md:w-[44%]
      lg:w-[36%]
      max-w-[580px]
      pointer-events-none
    "
  >
    <motion.img
      src={portraitNobg}
      alt="Athuliya"
      className="w-full h-auto object-contain"
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        filter:
          "drop-shadow(0 25px 40px rgba(0,0,0,0.08))",
      }}
    />
  </motion.div>

  {/* Creative Designer */}
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{
      delay: 0.7,
      duration: 0.8,
    }}
    className="
      absolute
      left-1/2
      -translate-x-1/2
      top-[14%]
      md:left-auto
      md:translate-x-0
      md:right-[10%]
      md:top-[45%]
      z-40
      font-['Architects_Daughter']
      italic
      text-xs
      md:text-lg
      tracking-[0.18em]
      text-zinc-700
      text-center
    "
  >
    CREATIVE DESIGNER
  </motion.div>

  {/* Buttons - centered row on mobile, spread on desktop */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9, duration: 0.8 }}
    className="
      absolute
      bottom-6
      left-0
      right-0
      z-40
      flex
      items-center
      justify-center
      gap-6
      px-6
      md:justify-between
      md:px-12
    "
  >
    <Link
      to="/nav"
      className="
        inline-flex
        items-center
        justify-center
        rounded-full
        bg-[#5B1A8D]
        px-8
        py-4
        text-[11px]
        font-bold
        uppercase
        tracking-[0.25em]
        text-white
        transition-all
        duration-300
        hover:scale-105
        hover:bg-[#4B1675]
      "
    >
      Click Here To Explore
    </Link>

    <Link
      to="/nav"
      className="
        font-['Bebas_Neue']
        text-3xl
        uppercase
        tracking-[0.15em]
        text-black
        hover:text-[#5B1A8D]
        transition-colors
      "
    >
      Portfolio
    </Link>
  </motion.div>
</motion.main>

);
}

export default Cover;
