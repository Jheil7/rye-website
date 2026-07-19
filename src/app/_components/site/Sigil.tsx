import type { CSSProperties } from "react";

type SigilProps = {
  variant?: 0 | 1 | 2 | 3 | 4;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
};

function Glyph({ variant }: { variant: number }) {
  switch (variant) {
    case 1:
      return (
        <>
          <circle cx="50" cy="50" r="46" />
          <circle cx="50" cy="50" r="30" />
          <path d="M50 4v18M50 78v18M4 50h18M78 50h18" />
          <circle cx="50" cy="50" r="6" />
        </>
      );
    case 2:
      return (
        <>
          <circle cx="50" cy="50" r="46" />
          <path d="M50 8 61 40 95 40 67 60 78 92 50 72 22 92 33 60 5 40 39 40Z" />
        </>
      );
    case 3:
      return (
        <>
          <circle cx="50" cy="50" r="46" />
          <path d="M50 12v76M32 24v52M68 24v52" />
          <path d="M32 40l18 12 18-12M32 60l18 12 18-12" />
        </>
      );
    case 4:
      return (
        <>
          <circle cx="50" cy="50" r="46" />
          <circle cx="50" cy="50" r="24" />
          <path d="M50 4 76 50 50 96 24 50Z" />
          <path d="M4 50 50 24 96 50 50 76Z" />
        </>
      );
    default:
      return (
        <>
          <circle cx="50" cy="50" r="46" />
          <path d="M50 6 88 72H12Z" />
          <path d="M50 94 12 28h76Z" />
        </>
      );
  }
}

export function Sigil({
  variant = 0,
  size = 120,
  strokeWidth = 1,
  className,
  style,
}: SigilProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      style={style}
    >
      <Glyph variant={variant} />
    </svg>
  );
}
