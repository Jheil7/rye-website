"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTE_LINKS } from "~/lib/siteContent";

export default function Navbar() {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathName]);

  const linkClass = (href: string) =>
    [
      "rounded-full px-4 py-2 font-rajdhani text-sm font-semibold uppercase tracking-[0.22em] transition-all",
      pathName === href
        ? "bg-[rgba(163,53,238,0.18)] text-[#efe8fa] shadow-[0_0_24px_rgba(163,53,238,0.18)]"
        : "text-[#b3a8c6] hover:bg-white/5 hover:text-[#efe8fa]",
    ].join(" ");

  return (
    <nav className="relative z-50 mb-4 px-4 pt-4 sm:mb-6 sm:px-6 sm:pt-6">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(9,6,15,0.94),rgba(9,6,15,0.72))] px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#c77dff]/60 bg-[radial-gradient(circle_at_50%_50%,rgba(163,53,238,0.35),rgba(9,6,15,0.88))] shadow-[0_0_18px_rgba(163,53,238,0.35)_inset,0_0_12px_rgba(163,53,238,0.2)]">
            <img
              src="/newlogo.png"
              alt="Rhonin portrait"
              className="h-full w-full scale-[1.12] object-cover object-[56%_22%]"
            />
          </div>
          <div className="font-cinzel text-sm font-bold tracking-[0.28em] text-[#efe8fa] sm:text-base">
            RAISE YOUR EYES
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {ROUTE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#efe8fa] transition-colors hover:bg-white/10 lg:hidden"
        >
          <span className="font-rajdhani text-lg font-bold">
            {open ? "X" : "="}
          </span>
        </button>
      </div>

      {open ? (
        <div className="mx-auto mt-3 max-w-[1180px] rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(20,14,32,0.94),rgba(10,7,17,0.9))] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-2">
            {ROUTE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
