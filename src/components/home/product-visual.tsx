import Image from "next/image";
import { cn } from "@/lib/utils";

type ProductVisualProps = {
  name: string;
  tone?: "gold" | "blue" | "silver";
  size?: "sm" | "lg";
  imageUrl?: string;
};

const toneStyles = {
  gold: {
    label: "from-metal-200 via-metal-300 to-metal-500",
    glow: "bg-metal-200/24",
    ring: "border-metal-200/45",
  },
  blue: {
    label: "from-electric-300 via-electric-400 to-electric-600",
    glow: "bg-electric-400/24",
    ring: "border-electric-300/45",
  },
  silver: {
    label: "from-white via-silver-200 to-silver-500",
    glow: "bg-silver-200/20",
    ring: "border-silver-200/45",
  },
};

export function ProductVisual({
  name,
  tone = "gold",
  size = "lg",
  imageUrl,
}: ProductVisualProps) {
  const styles = toneStyles[tone];
  const isReal = imageUrl && (imageUrl.startsWith("http") || imageUrl.startsWith("/") || imageUrl.includes("."));

  if (isReal) {
    return (
      <div
        className={cn(
          "relative mx-auto aspect-[3/4] w-full flex items-center justify-center",
          size === "lg" ? "max-w-[19rem]" : "max-w-[13rem]",
        )}
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes={size === "lg" ? "(max-w-md) 100vw, 300px" : "(max-w-xs) 100vw, 200px"}
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[3/4] w-full",
        size === "lg" ? "max-w-[19rem]" : "max-w-[13rem]",
      )}
      aria-label={`${name} product visual placeholder`}
      role="img"
    >
      <div
        className={cn("absolute inset-x-8 bottom-0 h-16 blur-3xl", styles.glow)}
      />
      <div
        className={cn(
          "absolute inset-x-[18%] top-0 h-8 rounded-t-[44%] border bg-gradient-to-b from-zinc-700 to-black",
          styles.ring,
        )}
      />
      <div
        className={cn(
          "absolute inset-x-[14%] top-5 h-[88%] overflow-hidden border bg-[linear-gradient(110deg,#1f2027_0%,#08080a_44%,#17181d_100%)] shadow-2xl",
          styles.ring,
        )}
      >
        <div className="absolute inset-y-0 left-0 w-1/2 bg-white/[0.05]" />
        <div className="absolute inset-y-0 right-4 w-px bg-white/10" />
        <div className="absolute left-1/2 top-7 h-14 w-14 -translate-x-1/2 border border-white/15 bg-white/[0.03]" />
        <div
          className={cn(
            "absolute inset-x-0 top-[34%] bg-gradient-to-r py-4",
            styles.label,
          )}
        >
          <p className="text-center font-heading text-4xl leading-none text-black">
            KYROX
          </p>
          <p className="text-center text-[0.62rem] font-black uppercase text-black">
            Muscle
          </p>
        </div>
        <div className="absolute inset-x-8 bottom-14 h-1 bg-white/20" />
        <div className="absolute inset-x-12 bottom-10 h-1 bg-white/10" />
      </div>
    </div>
  );
}
