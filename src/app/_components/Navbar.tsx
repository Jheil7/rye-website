import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav>
        <div className="flex justify-evenly gap-8 bg-gray-600 p-3 text-blue-50">
          <div className="flex items-center">
            <img src="logo.png" />
            <span className="p-3.5 text-5xl font-bold">Raise Your Eyes</span>
          </div>
          <div className="flex items-center gap-4 text-lg">
            <Link href="/">Home</Link>
            <Link href="/roster">Roster</Link>
            <Link href="/apply">Apply</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </nav>
    </>
  );
}
