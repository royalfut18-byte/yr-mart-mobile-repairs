import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/ui/Icons";

type Tone = "brand" | "dark" | "light" | "outline";

const tones: Record<Tone, { shell: string; badge: string }> = {
  brand: {
    shell: "bg-brand text-white hover:bg-brand-dark",
    badge: "bg-white text-brand",
  },
  dark: {
    shell: "bg-ink text-white hover:bg-black",
    badge: "bg-white text-ink",
  },
  light: {
    shell: "bg-white text-ink hover:bg-surface-warm",
    badge: "bg-brand text-white",
  },
  outline: {
    shell: "border border-ink/15 text-ink hover:border-ink/35 hover:bg-white",
    badge: "bg-ink text-white",
  },
};

/**
 * The template's signature control: a pill with a circular badge on the right
 * holding an arrow that kicks 45 degrees on hover.
 */
export function Pill({
  children,
  href,
  tone = "brand",
  icon,
  external = false,
  className,
}: {
  children: ReactNode;
  href: string;
  tone?: Tone;
  icon?: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const t = tones[tone];

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={`pill ${t.shell} ${className ?? ""}`}
    >
      {icon}
      <span>{children}</span>
      <span className={`pill-badge ${t.badge}`} aria-hidden="true">
        <ArrowIcon className="h-4 w-4" />
      </span>
    </a>
  );
}
