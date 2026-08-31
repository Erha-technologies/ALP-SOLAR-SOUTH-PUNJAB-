import { type ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const variantClasses = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "border border-border bg-transparent text-ink2 hover:border-primary hover:text-primary",
  accent: "bg-accent text-ink hover:bg-accent/90",
  ghost: "bg-transparent text-primary hover:bg-primary-50",
} as const;

const sizeClasses = {
  md: "h-11 px-5 text-sm",
  lg: "h-[3.25rem] px-7 text-base",
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      "disabled:opacity-50 disabled:pointer-events-none",
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
