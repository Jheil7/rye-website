"use client";

import { useState, type CSSProperties } from "react";

type ImageSlotProps = {
  src: string;
  alt: string;
  shape?: "circle" | "rounded";
  radius?: number;
  fit?: "cover" | "contain";
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
};

export function ImageSlot({
  src,
  alt,
  shape = "rounded",
  radius = 16,
  fit = "cover",
  placeholder,
  className,
  style,
}: ImageSlotProps) {
  const [errored, setErrored] = useState(false);
  const borderRadius = shape === "circle" ? "50%" : `${radius}px`;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius,
        background: "rgba(12,8,20,0.6)",
        ...style,
      }}
    >
      {errored ? (
        <span className="font-rajdhani px-3 text-center text-sm tracking-[0.12em] text-[#5f5670]">
          {placeholder ?? alt}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: fit,
            display: "block",
            borderRadius,
          }}
        />
      )}
    </div>
  );
}
