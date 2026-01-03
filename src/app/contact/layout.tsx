import "~/styles/globals.css";

export default function RosterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
