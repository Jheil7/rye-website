import "~/styles/globals.css";

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
