import type { ReactNode, ComponentPropsWithoutRef } from "react";

type CardProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

export default function Card({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`h-full rounded-lg border border-slate-400 bg-gray-700 p-4 ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
