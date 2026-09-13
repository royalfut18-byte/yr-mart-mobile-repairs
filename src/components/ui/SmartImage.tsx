"use client";

import { useState } from "react";

/**
 * Plain <img> with a designed fallback. Photos live in /public/images and can be
 * swapped at any time; until a file exists the tile still renders as a finished
 * gradient panel rather than a broken-image icon.
 */
export function SmartImage({
  src,
  alt,
  className,
  accent = "from-signal-500/40 to-ink-900",
  label,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  accent?: string;
  label?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative grid place-items-center overflow-hidden bg-gradient-to-br ${accent} ${className ?? ""}`}
      >
        <div className="absolute inset-0 grid-lines opacity-40" />
        <div className="absolute -inset-8 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
        <PhoneGlyph className="relative h-1/3 w-auto text-white/35" />
        {label ? (
          <span className="absolute bottom-3 left-0 right-0 px-3 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
            {label}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      onError={() => setFailed(true)}
    />
  );
}

function PhoneGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 80" fill="none" className={className} aria-hidden="true">
      <rect
        x="2"
        y="2"
        width="44"
        height="76"
        rx="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <rect x="18" y="7" width="12" height="3" rx="1.5" fill="currentColor" />
      <rect x="9" y="18" width="30" height="44" rx="4" fill="currentColor" opacity="0.25" />
    </svg>
  );
}
