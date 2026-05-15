import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-metal-200 bg-metal-200 text-black shadow-glow hover:border-white hover:bg-white",
  secondary:
    "border-white/15 bg-white/[0.04] text-white hover:border-metal-300/60 hover:text-metal-100",
  ghost: "border-transparent bg-transparent text-zinc-300 hover:text-white",
};

const baseClassName =
  "inline-flex min-h-12 items-center justify-center gap-2 border px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-metal-200 disabled:pointer-events-none disabled:opacity-45";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseClassName, variants[variant], className)}
      {...props}
    />
  );
}

export function LinkButton({
  className,
  variant = "primary",
  href,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(baseClassName, variants[variant], className)}
      {...props}
    />
  );
}
