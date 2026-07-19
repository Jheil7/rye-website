import { Sigil } from "./Sigil";
import type { CSSProperties } from "react";

type RuneCircleProps = {
  count?: number;
  runeSize?: number;
  variants?: (0 | 1 | 2 | 3 | 4)[];
  color?: string;
  glow?: string;
  spinClass?: string;
  offset?: string;
  strokeWidth?: number;
  flicker?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function RuneCircle({
  count = 12,
  runeSize = 22,
  variants = [0, 1, 2, 3, 4],
  color = "#c77dff",
  glow = "rgba(199,125,255,0.7)",
  spinClass = "animate-spin-vslow",
  offset = "-1.5%",
  strokeWidth = 1,
  flicker = true,
  className,
  style,
}: RuneCircleProps) {
  const step = 360 / count;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${spinClass} ${className ?? ""}`.trim()}
      style={style}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{ transform: `rotate(${step * index}deg)` }}
        >
          <div
            className={flicker ? "animate-flicker absolute" : "absolute"}
            style={{
              top: offset,
              left: "50%",
              transform: "translateX(-50%)",
              color,
              filter: `drop-shadow(0 0 6px ${glow})`,
              animationDelay: `${(index % 5) * 0.6}s`,
            }}
          >
            <Sigil
              variant={variants[index % variants.length]}
              size={runeSize}
              strokeWidth={strokeWidth}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
