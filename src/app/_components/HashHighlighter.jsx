"use client";
import { useEffect } from "react";

export default function HashHighlighter({ id }) {
  useEffect(() => {
    if (window.location.hash !== `#${id}`) return;

    const el = document.getElementById(id);
    if (!el) return;

    el.classList.add("ring-2", "ring-green-400");
    setTimeout(() => {
      el.classList.remove("ring-2", "ring-green-400");
    }, 1200);
  }, [id]);

  return null;
}
