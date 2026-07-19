"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 right-0 left-0"
      style={{
        zIndex: 60,
        height: 3,
        transformOrigin: "0% 50%",
        scaleX,
        background:
          "linear-gradient(90deg,#7b3fb8,#a335ee 40%,#c77dff 70%,#f0d79a)",
        boxShadow: "0 0 14px rgba(163,53,238,0.7)",
      }}
    />
  );
}
