"use client";

import { useEffect } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion";

export interface PointerParallax {
  px: MotionValue<number>;
  py: MotionValue<number>;
}

export function usePointerParallax(): PointerParallax {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const reducedMotion = useReducedMotion();
  const spring = { stiffness: 55, damping: 18, mass: 0.7 };

  const px = useSpring(rawX, spring);
  const py = useSpring(rawY, spring);

  useEffect(() => {
    if (reducedMotion) return;

    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [rawX, rawY, reducedMotion]);

  return { px, py };
}
