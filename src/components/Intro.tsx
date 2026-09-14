"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const WORD_ONE = "YR".split("");
const WORD_TWO = "MART".split("");

/** How long the title sequence holds before the curtain lifts. */
const HOLD_MS = 1800;
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Full-screen title sequence. It plays on every load — it is the first thing
 * the shop wanted people to see — but it is short and any tap, scroll or key
 * press cuts it immediately, so nobody hunting for a phone number is held up.
 */
export function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  // Hard removal, independent of the exit animation. AnimatePresence keeps the
  // overlay mounted until its children finish animating out — and those run on
  // animation frames. If frames never arrive (throttled or suspended tab) the
  // overlay would sit on top of the page forever, so a plain timer takes it
  // away regardless.
  const [removed, setRemoved] = useState(false);
  const [progress, setProgress] = useState(0);
  // Guards against the timer and a user skip both firing.
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

    // setInterval rather than requestAnimationFrame: rAF is suspended outright
    // in background tabs, which would freeze the counter at 0.
    const started = Date.now();
    const ticker = window.setInterval(() => {
      const t = Math.min(1, (Date.now() - started) / HOLD_MS);
      // Ease-out so the number sprints early and settles on 100.
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

  // Hold the page still underneath the overlay.
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
          // No exit of its own: the wrapper must not fade, or the curtain
          // panels would dissolve instead of sliding apart. AnimatePresence
          // keeps it mounted until the panels below finish. Clicks stop passing
          // through to the hero the moment the curtain starts moving.
          exit={{ pointerEvents: "none" }}
        >
          {/* Two panels that part like a curtain */}
          <motion.div
            className="noise absolute inset-x-0 top-0 h-1/2 origin-top bg-ink-950"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="noise absolute inset-x-0 bottom-0 h-1/2 origin-bottom bg-ink-950"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Seam that flashes as the curtain splits */}
          <motion.div
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-signal-300 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            exit={{ scaleX: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 0.9, ease }}
          />

          {/* Glow behind the wordmark */}
          <motion.div
            className="blob pointer-events-none absolute h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(46,125,255,0.38),transparent_62%)]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 1.3, ease }}
          />

          <motion.div
            className="relative flex flex-col items-center px-6"
            exit={{ opacity: 0, y: -30, transition: { duration: 0.4, ease } }}
          >
            <div className="flex items-baseline gap-[0.16em]">
              {WORD_ONE.map((letter, i) => (
                <Letter key={`a-${i}`} index={i} className="text-amber-brand">
                  {letter}
                </Letter>
              ))}
              <span className="w-[0.28em]" />
              {WORD_TWO.map((letter, i) => (
                <Letter key={`b-${i}`} index={i + 2} className="text-white">
                  {letter}
                </Letter>
              ))}
            </div>

            <motion.p
              className="mt-4 text-center text-[0.6rem] font-medium uppercase tracking-[0.5em] text-white/50 sm:text-xs"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease }}
            >
              Mobile Repairs
            </motion.p>

            <motion.div
              className="mt-10 flex w-56 items-center gap-3 sm:w-72"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="h-px flex-1 overflow-hidden bg-white/15">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-signal-500 to-amber-brand"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: HOLD_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="w-9 text-right font-display text-xs tabular-nums text-white/60">
                {progress}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Letter({
  children,
  index,
  className,
}: {
  children: string;
  index: number;
  className?: string;
}) {
  return (
    // The clipping span is what makes the letter rise out of nothing.
    <span className="inline-block overflow-hidden pb-[0.12em]">
      <motion.span
        className={`inline-block font-display text-[clamp(3rem,16vw,8rem)] font-extrabold leading-[0.9] ${className ?? ""}`}
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ delay: 0.1 + index * 0.08, duration: 0.9, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}
