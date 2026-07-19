"use client";

import { useEffect, type RefObject } from "react";

const MOTE_COUNT = 90;
const EMBER_COUNT = 18;
const MOTE_COLORS = ["163,53,238", "199,125,255", "232,180,90", "139,120,220"];
const EMBER_COLORS = ["232,180,90", "199,125,255", "163,53,238"];

type Mote = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  a: number;
  tw: number;
  tws: number;
  c: string;
};

type Ember = {
  x: number;
  y: number;
  r: number;
  vy: number;
  sway: number;
  swaySpeed: number;
  phase: number;
  a: number;
  tw: number;
  tws: number;
  c: string;
};

function makeMote(width: number, height: number): Mote {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.8 + 0.5,
    vy: Math.random() * 0.5 + 0.12,
    vx: (Math.random() - 0.5) * 0.25,
    a: Math.random() * 0.5 + 0.25,
    tw: Math.random() * 6.28,
    tws: Math.random() * 0.05 + 0.01,
    c: MOTE_COLORS[Math.floor(Math.random() * MOTE_COLORS.length)]!,
  };
}

function makeEmber(width: number, height: number): Ember {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2.2 + 1.4,
    vy: Math.random() * 0.22 + 0.06,
    sway: Math.random() * 22 + 8,
    swaySpeed: Math.random() * 0.012 + 0.004,
    phase: Math.random() * 6.28,
    a: Math.random() * 0.32 + 0.18,
    tw: Math.random() * 6.28,
    tws: Math.random() * 0.03 + 0.008,
    c: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)]!,
  };
}

export function useParticles(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const motes = Array.from({ length: MOTE_COUNT }, () =>
      makeMote(width, height),
    );
    const embers = Array.from({ length: EMBER_COUNT }, () =>
      makeEmber(width, height),
    );

    const draw = () => {
      context.clearRect(0, 0, width, height);

      context.globalCompositeOperation = "lighter";
      for (const ember of embers) {
        ember.y -= ember.vy;
        ember.phase += ember.swaySpeed;
        ember.tw += ember.tws;

        if (ember.y < -30) {
          Object.assign(ember, makeEmber(width, height));
          ember.y = height + 30;
        }

        const x = ember.x + Math.sin(ember.phase) * ember.sway;
        const alpha = ember.a * (0.5 + 0.5 * Math.sin(ember.tw));

        context.beginPath();
        context.fillStyle = `rgba(${ember.c},${alpha})`;
        context.shadowColor = `rgba(${ember.c},0.95)`;
        context.shadowBlur = ember.r * 9;
        context.arc(x, ember.y, ember.r, 0, 6.283);
        context.fill();
      }

      context.globalCompositeOperation = "source-over";

      for (const mote of motes) {
        mote.y -= mote.vy;
        mote.x += mote.vx;
        mote.tw += mote.tws;

        if (mote.y < -20) {
          Object.assign(mote, makeMote(width, height));
          mote.y = height + 20;
        }

        if (mote.x < -20) mote.x = width + 20;
        if (mote.x > width + 20) mote.x = -20;

        const alpha = mote.a * (0.55 + 0.45 * Math.sin(mote.tw));

        context.beginPath();
        context.fillStyle = `rgba(${mote.c},${alpha})`;
        context.shadowColor = `rgba(${mote.c},0.9)`;
        context.shadowBlur = mote.r * 5;
        context.arc(mote.x, mote.y, mote.r, 0, 6.283);
        context.fill();
      }

      context.shadowBlur = 0;
      raf = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}
