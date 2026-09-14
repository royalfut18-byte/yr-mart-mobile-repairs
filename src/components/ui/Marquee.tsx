import type { ReactNode } from "react";

/**
 * One continuously scrolling lane.
 *
 * The children are rendered twice and the track slides by exactly -50%, which
 * lands on the start of the copy and makes the loop seamless. That only works
 * because each copy is its own flex box: with a single flat list the inter-item
 * gaps are shared between the halves, so -50% misses the seam and the row
 * visibly jumps once per cycle.
 */
export function Marquee({
  children,
  direction = "left",
  seconds = 60,
  gap = "gap-4",
  className,
}: {
  children: ReactNode;
  /** "left" scrolls right-to-left; "right" scrolls left-to-right. */
  direction?: "left" | "right";
  seconds?: number;
  gap?: string;
  className?: string;
}) {
  const set = <div className={`flex shrink-0 items-center ${gap} pr-4`}>{children}</div>;

  return (
    <div className={`flex overflow-hidden ${className ?? ""}`}>
      <div
        className={`flex w-max pause-on-hover ${
          direction === "right" ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ animationDuration: `${seconds}s` }}
      >
        {set}
        {/* Exact duplicate purely to fill the wrap-around; hidden from readers. */}
        <div className={`flex shrink-0 items-center ${gap} pr-4`} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
