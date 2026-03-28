import type { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
  className?: string;
}

export default function Main({ children, className }: MainProps) {
  return <main className={className}>{children}</main>;
}
