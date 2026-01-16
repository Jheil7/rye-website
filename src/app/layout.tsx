import "~/styles/globals.css";

import Navbar from "./_components/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-black text-blue-50 ${inter.className}`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
