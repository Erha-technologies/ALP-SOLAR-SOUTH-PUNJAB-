import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-surface shadow-card transition-shadow duration-300 hover:shadow-elevated",
        className
      )}
      {...props}
    />
  );
}
