"use client";

export function FilmGrain() {
  return (
    <div
      aria-hidden
      className="animate-grain pointer-events-none fixed inset-0"
      style={{
        zIndex: 3,
        opacity: 0.045,
        mixBlendMode: "overlay",
        inset: "-50%",
        width: "200%",
        height: "200%",
      }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <filter id="rye-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#rye-grain)" />
      </svg>
    </div>
  );
}
