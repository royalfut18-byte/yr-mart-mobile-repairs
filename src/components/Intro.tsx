"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const WORD = "YR MART".split("");

/** How long the title sequence holds before the curtain lifts. */
const HOLD_MS = 1700;
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Full-screen title sequence. Plays on every load, but it is short and any tap,
 * scroll or key press cuts it immediately, so nobody hunting for a phone number
 * is held up.
 */
export function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  // Hard removal, independent of the exit animation. AnimatePresence keeps the
  // overlay mounted until its children finish animating out, and those run on
  // animation frames. If frames never arrive the overlay would sit on top of
  // the page forever, so a plain timer takes it away regardless.
  const [removed, setRemoved] = useState(false);
  const [progress, setProgress] = useState(0);
  const finished = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      setProgress(100);
      setVisible(false);
      onDone();
      window.setTimeout(() => setRemoved(true), 1400);
    };

    // Timers rather than requestAnimationFrame: rAF is suspended outright in
    // background tabs, which would freeze the counter at 0.
    const started = Date.now();
    const ticker = window.setInterval(() => {
      const t = Math.min(1, (Date.now() - started) / HOLD_MS);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t >= 1) window.clearInterval(ticker);
    }, 40);

    const timer = window.setTimeout(finish, HOLD_MS);

    const events: (keyof WindowEventMap)[] = ["pointerdown", "wheel", "keydown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, finish, { once: true, passive: true }));

    return () => {
      window.clearInterval(ticker);
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, finish));
    };
  }, [onDone]);

  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  if (removed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          aria-hidden="true"
          exit={{ pointerEvents: "none" }}
        >
          {/* Curtain panels */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-paper"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-paper"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Seam that flashes as the curtain splits */}
          <motion.div
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-brand to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            exit={{ scaleX: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 0.9, ease }}
          />

          <motion.div
            className="relative flex flex-col items-center px-6"
            exit={{ opacity: 0, y: -26, transition: { duration: 0.4, ease } }}
          >
            <div className="flex items-baseline">
              {WORD.map((letter, i) =>
                letter === " " ? (
                  <span key={i} className="w-[0.26em]" />
                ) : (
                  <Letter key={i} index={i}>
                    {letter}
                  </Letter>
                ),
              )}
              {/* The wordmark's blue dot, as in the reference */}
              <motion.span
                className="ml-3 h-3 w-3 rounded-full bg-brand sm:ml-4 sm:h-4 sm:w-4"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.72, duration: 0.5, ease }}
              />
            </div>

            <motion.p
              className="mt-4 text-center text-[0.6rem] font-semibold uppercase tracking-[0.45em] text-ink-muted sm:text-xs"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease }}
            >
              Mobile Repairs · Neutral Bay
            </motion.p>

            <motion.div
              className="mt-10 flex w-56 items-center gap-3 sm:w-72"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.4 }}
            >
              <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-ink/10">
                <motion.div
                  className="h-full origin-left rounded-full bg-brand"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: HOLD_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="w-9 text-right font-display text-xs font-semibold tabular-nums text-ink-muted">
                {progress}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Letter({ children, index }: { children: string; index: number }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.12em]">
      <motion.span
        className="inline-block font-display text-[clamp(2.6rem,13vw,6.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-ink"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ delay: 0.08 + index * 0.06, duration: 0.85, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}
