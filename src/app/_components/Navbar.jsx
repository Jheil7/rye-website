// @ts-nocheck
"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  return (
    <>
      <nav>
        <div className="flex justify-evenly gap-4 bg-gray-700 p-3 text-white md:gap-8">
          <div className="flex items-center">
            <img src="logo.png" className="hidden sm:block" />
            <span className="p-3 text-lg font-bold md:text-5xl">
              Raise Your Eyes
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm md:gap-5 md:text-2xl">
            <Link
              href="/"
              className={
                pathName === "/" ? "text-blue-300 underline" : "hover:underline"
              }
            >
              Home
            </Link>
            <Link
              href="/roster"
              className={
                pathName === "/roster"
                  ? "text-blue-300 underline"
                  : "hover:underline"
              }
            >
              {" "}
              Roster
            </Link>
            <Link
              href="/apply"
              className={
                pathName === "/apply"
                  ? "text-blue-300 underline"
                  : "hover:underline"
              }
            >
              Apply
            </Link>
            {/* <Link href="/#contact">Contact</Link> */}
            <Link
              href="/TwitchStreams"
              className={
                pathName === "/TwitchStreams"
                  ? "text-blue-300 underline"
                  : "hover:underline"
              }
            >
              Twitch Streams
            </Link>
            <Link
              href="/Clips"
              className={
                pathName === "/Clips"
                  ? "text-blue-300 underline"
                  : "hover:underline"
              }
            >
              RYE Clips
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
