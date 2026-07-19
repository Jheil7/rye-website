"use client";

import { useScroll, useTransform, type MotionValue } from "framer-motion";

export function useParallax(factor: number): MotionValue<number> {
  const { scrollY } = useScroll();
  return useTransform(scrollY, (value) => value * factor);
}
