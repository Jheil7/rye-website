"use client";

import { useState } from "react";

export default function Switch() {
  const [mode, setMode] = useState("raid");

  return (
    <div className="grid max-w-56 grid-cols-2 overflow-hidden rounded-full border border-[rgba(163,53,238,0.35)] bg-[rgba(12,8,20,0.65)] p-1">
      <button
        onClick={() => setMode("raid")}
        className={[
          "font-rajdhani rounded-full px-4 py-2 text-sm font-semibold tracking-[0.18em] uppercase transition",
          mode === "raid"
            ? "bg-[linear-gradient(135deg,#c77dff,#a335ee)] text-[#0b0812] shadow-[0_0_18px_rgba(163,53,238,0.3)]"
            : "text-[#c2b7d5] hover:bg-white/6",
        ].join(" ")}
      >
        RAID
      </button>

      <button
        onClick={() => setMode("mplus")}
        className={[
          "font-rajdhani rounded-full px-4 py-2 text-sm font-semibold tracking-[0.18em] uppercase transition",
          mode === "mplus"
            ? "bg-[linear-gradient(135deg,#c77dff,#a335ee)] text-[#0b0812] shadow-[0_0_18px_rgba(163,53,238,0.3)]"
            : "text-[#c2b7d5] hover:bg-white/6",
        ].join(" ")}
      >
        MYTHIC+
      </button>
    </div>
  );
}
