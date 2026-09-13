import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className ?? ""}`}
    >
      <Reveal>
        <span
          className={`inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-signal-300 ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-7 bg-signal-400/60" />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-4 font-display text-[clamp(1.9rem,5vw,3.2rem)] font-extrabold leading-[1.05]">
          {title}
        </h2>
      </Reveal>

      {lead ? (
        <Reveal delay={0.12}>
          <p className="mt-4 text-base leading-relaxed text-white/55 sm:text-lg">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
