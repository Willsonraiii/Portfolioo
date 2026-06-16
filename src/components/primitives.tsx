import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import { Reveal } from "./Reveal";

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32",
        className
      )}
    >
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.34em] text-gold/90 sm:text-xs",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  children,
  align = "left",
  className,
}: {
  eyebrow: string;
  children: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.03] tracking-tight text-cream sm:text-5xl md:text-[3.4rem]">
        {children}
      </h2>
    </Reveal>
  );
}
