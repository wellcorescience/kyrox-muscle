import type { ReactNode } from "react";

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  return (
    <section className="min-h-[calc(100vh-5rem)] py-16 md:py-24">
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-metal-200">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-balance text-4xl md:text-6xl font-black uppercase text-white tracking-normal leading-[1.1]">
            {title}
          </h1>
          <p className="mt-5 text-base leading-8 text-zinc-400">
            {description}
          </p>
        </div>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
