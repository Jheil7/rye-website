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
      className={`arcane-panel h-full p-5 sm:p-6 ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
