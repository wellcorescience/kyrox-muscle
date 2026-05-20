import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HomeSectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children?: ReactNode;
};

export function HomeSectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  children,
}: HomeSectionHeadingProps) {
  return (
    <div
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}
    >
      {eyebrow ? (
        <p className={cn("text-sm font-bold uppercase tracking-[0.2em] text-[#A89340]", eyebrowClassName)}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={cn("mt-3 text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground font-black uppercase tracking-normal", titleClassName)}>
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-5 text-base leading-8 text-muted", descriptionClassName)}>{description}</p>
      ) : null}
      {children}
    </div>
  );
}
