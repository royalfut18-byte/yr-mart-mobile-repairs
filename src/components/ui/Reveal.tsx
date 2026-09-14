"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

/** Travel distance per direction. Generous, so the movement actually reads. */
const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 72 },
  down: { x: 0, y: -72 },
  left: { x: 90, y: 0 },
  right: { x: -90, y: 0 },
  none: { x: 0, y: 0 },
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Slide-in on scroll.
 *
 * Opacity gets a much shorter transition than the transform on purpose: the
 * element is fully opaque a third of the way through, so the eye reads it as
 * something sliding into place rather than something fading up.
 *
 * Reduced motion is handled centrally by the MotionConfig in Stage; it drops
 * the transform and leaves a plain cross-fade. Never branch on the media query
 * here, since that changes the markup and breaks hydration.
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  once?: boolean;
}) {
  const { x, y } = offset[direction];

  return (
    <motion.div
      data-enter
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: 0.95,
        delay,
        ease,
        opacity: { duration: 0.32, delay, ease: "easeOut" },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers its `RevealItem` children as the group scrolls in. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  const { x, y } = offset[direction];

  return (
    <motion.div
      data-enter
      className={className}
      variants={{
        hidden: { opacity: 0, x, y },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.85,
            ease,
            opacity: { duration: 0.3, ease: "easeOut" },
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
