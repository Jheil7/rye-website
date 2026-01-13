// @ts-nocheck
"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileFormat, setIsMobileFormat] = useState(false);
  return (
    <>
      <nav>
        <div className="flex justify-evenly gap-8 bg-gray-600 p-3 text-blue-50">
          <div className="flex items-center">
            <img src="logo.png" className="hidden sm:block" />
            <span className="p-3.5 text-2xl font-bold md:text-5xl">
              Raise Your Eyes
            </span>
          </div>
          <div className="text-md flex items-center gap-3 underline md:gap-5 md:text-2xl">
            <Link href="/">Home</Link>
            <Link href="/roster">Roster</Link>
            <Link href="/apply">Apply</Link>
            {/* <Link href="/#contact">Contact</Link> */}
            <Link href="/TwitchStreams">Twitch Streams</Link>
          </div>
        </div>
      </nav>
    </>
  );
}
