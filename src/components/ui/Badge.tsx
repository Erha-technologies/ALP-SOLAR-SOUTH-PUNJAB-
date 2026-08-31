import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const variants = {
  accent: "bg-accent-soft text-primary-dark",
  outline: "border border-border text-muted",
  muted: "bg-surface-muted text-muted",
} as const;

export function Badge({
  children,
  variant = "accent",
  className,
}: {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium font-mono uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
