import "~/styles/globals.css";

import SiteFooter from "./_components/SiteFooter";
import Navbar from "./_components/Navbar";
import { ArcaneBackdrop } from "./_components/site/ArcaneBackdrop";
import { FilmGrain } from "./_components/site/FilmGrain";
import { ScrollProgress } from "./_components/site/ScrollProgress";
import {
  Cinzel,
  Cinzel_Decorative,
  Rajdhani,
  Spectral,
} from "next/font/google";

const spectral = Spectral({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-spectral",
  weight: ["400", "500", "600", "700"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800"],
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel-dec",
  weight: ["400", "700"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rajdhani",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spectral.variable} ${cinzel.variable} ${cinzelDecorative.variable} ${rajdhani.variable} min-h-screen overflow-x-hidden bg-[#08060c] text-[#e8e2f0] antialiased`}
      >
        <ArcaneBackdrop />
        <FilmGrain />
        <ScrollProgress />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
