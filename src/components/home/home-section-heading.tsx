import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HomeSectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
};

export function HomeSectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  children,
}: HomeSectionHeadingProps) {
  return (
    <div
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}
    >
      {eyebrow ? (
        <p className="text-sm font-bold uppercase text-electric-300">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-balance text-5xl leading-none text-white md:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-zinc-400">{description}</p>
      ) : null}
      {children}
    </div>
  );
}
