import type { CSSProperties } from "react";

type GodRaysProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};

export function GodRays({ size = 560, className, style }: GodRaysProps) {
  const mask =
    "radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 42%, transparent 72%)";

  return (
    <div
      aria-hidden
      className={`animate-spin-vslow absolute rounded-full ${className ?? ""}`.trim()}
      style={{
        width: size,
        height: size,
        pointerEvents: "none",
        background:
          "conic-gradient(from 0deg," +
          "transparent 0deg, rgba(199,125,255,0.16) 14deg, transparent 30deg," +
          "transparent 84deg, rgba(163,53,238,0.12) 96deg, transparent 112deg," +
          "transparent 168deg, rgba(232,180,90,0.10) 180deg, transparent 196deg," +
          "transparent 252deg, rgba(199,125,255,0.14) 264deg, transparent 280deg," +
          "transparent 324deg, rgba(163,53,238,0.10) 336deg, transparent 352deg)",
        WebkitMaskImage: mask,
        maskImage: mask,
        ...style,
      }}
    />
  );
}
