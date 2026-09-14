"use client";

import { useState } from "react";

/**
 * Plain <img> that degrades in two steps. Photos live in /public/images and can
 * be swapped at any time. If `src` 404s it tries `fallbackSrc`, which lets a
 * page ask for a photo that has not been supplied yet while still showing the
 * old one. If that fails too, the tile renders as a finished gradient panel
 * rather than a broken-image icon.
 */
export function SmartImage({
  src,
  fallbackSrc,
  alt,
  className,
  accent = "from-brand-soft to-paper-deep",
  label,
  priority = false,
}: {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  accent?: string;
  label?: string;
  priority?: boolean;
}) {
  const [current, setCurrent] = useState(src);
  const [failed, setFailed] = useState(false);

  function handleError() {
    if (fallbackSrc && current !== fallbackSrc) {
      setCurrent(fallbackSrc);
      return;
    }
    setFailed(true);
  }

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative grid place-items-center overflow-hidden bg-gradient-to-br ${accent} ${className ?? ""}`}
      >
        <PhoneGlyph className="relative h-1/3 w-auto text-ink/25" />
        {label ? (
          <span className="absolute bottom-3 left-0 right-0 px-3 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-ink-faint">
            {label}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      // Keyed so swapping to the fallback remounts the element and actually
      // re-requests it, instead of React reusing the errored node.
      key={current}
      src={current}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      onError={handleError}
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
