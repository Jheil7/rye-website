import "~/styles/globals.css";

import Navbar from "./_components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-950 text-blue-50">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
