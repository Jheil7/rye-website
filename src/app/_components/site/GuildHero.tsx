"use client";

import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import { GodRays } from "./GodRays";
import { ImageSlot } from "./ImageSlot";
import { RuneCircle } from "./RuneCircle";
import { usePointerParallax } from "~/hooks/usePointerParallax";

type HeroAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

type HeroStat = {
  label: string;
  value: string;
};

type GuildHeroProps = {
  subtitle: string;
  motto?: string;
  actions?: HeroAction[];
  stats?: HeroStat[];
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.2, 0.7, 0.2, 1] },
  },
};

export function GuildHero({
  subtitle,
  motto,
  actions = [],
  stats = [],
}: GuildHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const blurPx = useTransform(scrollYProgress, [0, 0.7], [0, 6]);
  const contentFilter = useMotionTemplate`blur(${blurPx}px)`;

  const ringScrollY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const { px, py } = usePointerParallax();
  const ringPX = useTransform(px, (value) => value * 18);
  const ringPY = useTransform(py, (value) => value * 18);
  const crestPX = useTransform(px, (value) => value * -12);
  const crestPY = useTransform(py, (value) => value * -12);

  const pulseRing = {
    width: 160,
    height: 160,
    border: "1px solid rgba(199,125,255,0.45)",
    boxShadow: "0 0 30px rgba(163,53,238,0.4)",
  } as const;

  return (
    <header
      ref={heroRef}
      className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-7 pb-7 text-center sm:pt-8 sm:pb-10"
      style={{ minHeight: "clamp(500px, 68vh, 720px)" }}
    >
      <div
        className="pointer-events-none absolute"
        style={{
          top: "46%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "min(54vh,500px)",
          height: "min(54vh,500px)",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            y: ringScrollY,
            x: ringPX,
            rotate: ringRotate,
            scale: ringScale,
            opacity: ringOpacity,
          }}
        >
          <motion.div className="absolute inset-0" style={{ y: ringPY }}>
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: "1px solid rgba(163,53,238,0.22)",
                boxShadow: "0 0 60px rgba(163,53,238,0.15) inset",
              }}
            />
            <div
              className="absolute animate-spin rounded-full"
              style={{
                inset: "6%",
                border: "1px dashed rgba(199,125,255,0.35)",
              }}
            />
            <div
              className="animate-spin-rev absolute rounded-full"
              style={{
                inset: "16%",
                border: "2px solid rgba(163,53,238,0.28)",
                borderTopColor: "rgba(199,125,255,0.85)",
                borderBottomColor: "transparent",
              }}
            />
            <div
              className="animate-spin-slow absolute rounded-full"
              style={{
                inset: "26%",
                border: "1px dashed rgba(163,53,238,0.4)",
              }}
            />
            <div
              className="animate-glow-pulse absolute rounded-full"
              style={{
                inset: "33%",
                background:
                  "radial-gradient(circle,rgba(163,53,238,0.35),transparent 68%)",
              }}
            />
            <RuneCircle
              count={12}
              runeSize={24}
              offset="-1.7%"
              spinClass="animate-spin-vslow"
              color="#c77dff"
              glow="rgba(199,125,255,0.85)"
              flicker={false}
            />
            <div className="absolute" style={{ inset: "22%" }}>
              <RuneCircle
                count={8}
                runeSize={17}
                offset="-2.6%"
                spinClass="animate-spin-rev-slow"
                color="#f0d79a"
                glow="rgba(232,180,90,0.7)"
                strokeWidth={1.1}
                variants={[2, 0, 4, 1]}
                flicker={false}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="relative flex w-full flex-col items-center"
        style={{
          zIndex: 3,
          opacity: contentOpacity,
          y: contentY,
          scale: contentScale,
          filter: contentFilter,
        }}
      >
        <motion.div
          className="flex w-full flex-col items-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={item}
            className="relative flex flex-col items-center"
          >
            <motion.div style={{ x: crestPX, y: crestPY }}>
              <div className="relative flex items-center justify-center">
                <GodRays
                  size={320}
                  style={{ position: "absolute", zIndex: -1 }}
                />
                <div
                  className="animate-pulse-ring absolute rounded-full"
                  style={pulseRing}
                />
                <div
                  className="animate-pulse-ring absolute rounded-full"
                  style={{ ...pulseRing, animationDelay: "2.25s" }}
                />
                <div className="animate-float-y">
                  <ImageSlot
                    src="/newlogo.png"
                    alt="Rhonin portrait"
                    shape="circle"
                    fit="cover"
                    placeholder="Raise Your Eyes"
                    style={{
                      width: 160,
                      height: 160,
                      marginBottom: 2,
                      padding: 0,
                      border: "1px solid rgba(199,125,255,0.35)",
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(30,20,44,0.9), rgba(8,6,12,0.55))",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={item}
            className="font-rajdhani relative mt-0.5 mb-2 text-xs font-semibold tracking-[0.48em] text-[#b58bd6] uppercase sm:text-sm"
          >
            {subtitle}
          </motion.div>

          <motion.h1
            variants={item}
            className="font-cinzel-dec animate-text-glow relative m-0 text-[clamp(40px,7vw,108px)] leading-[0.92] font-black"
            style={{
              background:
                "linear-gradient(180deg,#f4ecff 0%,#c77dff 55%,#7b3fb8 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            RAISE
            <br />
            YOUR EYES
          </motion.h1>

          {motto ? (
            <motion.p
              variants={item}
              className="relative mx-auto mt-4 max-w-[680px] text-[clamp(15px,2vw,19px)] leading-[1.55] text-[#c9bfda] italic"
            >
              {motto}
            </motion.p>
          ) : null}

          {actions.length ? (
            <motion.div
              variants={item}
              className="relative mt-6 flex flex-wrap justify-center gap-3"
            >
              {actions.map((action) => (
                <Link
                  key={`${action.href}-${action.label}`}
                  href={action.href}
                  className={
                    action.variant === "secondary"
                      ? "arcane-button-secondary"
                      : "arcane-button-primary"
                  }
                >
                  {action.label}
                </Link>
              ))}
            </motion.div>
          ) : null}

          {stats.length ? (
            <motion.div
              variants={item}
              className="relative mt-8 flex flex-wrap justify-center overflow-hidden rounded-2xl border border-white/10 bg-[rgba(12,8,20,0.55)] backdrop-blur-[6px]"
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center"
                  style={{
                    padding: "16px 24px",
                    minWidth: 118,
                    borderRight:
                      index < stats.length - 1
                        ? "1px solid rgba(163,53,238,0.16)"
                        : "none",
                  }}
                >
                  <div className="font-cinzel text-[clamp(24px,3vw,34px)] leading-none font-bold text-[#efe6fb]">
                    {stat.value}
                  </div>
                  <div className="font-rajdhani mt-2 text-[11px] font-semibold tracking-[0.2em] text-[#8f82a8] uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          ) : null}
        </motion.div>
      </motion.div>
    </header>
  );
}
