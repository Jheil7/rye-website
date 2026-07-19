"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useParallax } from "~/hooks/useParallax";
import { useParticles } from "~/hooks/useParticles";

export function ArcaneBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef);

  const y1 = useParallax(0.15);
  const y2 = useParallax(0.28);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 h-full w-full"
        style={{ zIndex: 0 }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none fixed"
        style={{
          top: "-20%",
          left: "-10%",
          width: "70vw",
          height: "70vw",
          zIndex: 0,
          y: y1,
        }}
      >
        <div
          className="animate-fog-drift h-full w-full"
          style={{
            background:
              "radial-gradient(circle,rgba(103,40,180,0.28),transparent 62%)",
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed"
        style={{
          right: "-12%",
          bottom: "-25%",
          width: "65vw",
          height: "65vw",
          zIndex: 0,
          y: y2,
        }}
      >
        <div
          className="animate-fog-drift-rev h-full w-full"
          style={{
            background:
              "radial-gradient(circle,rgba(163,53,238,0.20),transparent 60%)",
          }}
        />
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none fixed top-0 left-[-20%] h-[60vh] w-[140%] overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div
          className="animate-aurora h-full w-full"
          style={{
            filter: "blur(60px)",
            background:
              "radial-gradient(60% 100% at 30% 0%, rgba(163,53,238,0.20), transparent 70%)," +
              "radial-gradient(50% 90% at 70% 10%, rgba(232,180,90,0.10), transparent 72%)",
          }}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(ellipse at 50% 0%,transparent 40%,rgba(4,3,8,0.85) 100%)",
        }}
      />
    </>
  );
}
