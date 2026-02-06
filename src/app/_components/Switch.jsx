"use client";

import { useState } from "react";

export default function Switch() {
  const [mode, setMode] = useState("raid");

  return (
    <div className="grid max-w-48 grid-cols-2 overflow-hidden rounded-md border border-blue-600 bg-blue-600">
      <button
        onClick={() => setMode("raid")}
        className={[
          "py-2 text-sm transition",
          mode === "raid"
            ? "bg-white font-semibold text-blue-700 shadow-sm"
            : "text-white hover:bg-blue-500",
        ].join(" ")}
      >
        RAID
      </button>

      <button
        onClick={() => setMode("mplus")}
        className={[
          "py-2 text-sm transition",
          mode === "mplus"
            ? "bg-white font-semibold text-blue-700 shadow-sm"
            : "text-white hover:bg-blue-500",
        ].join(" ")}
      >
        MYTHIC+
      </button>
    </div>
  );
}
