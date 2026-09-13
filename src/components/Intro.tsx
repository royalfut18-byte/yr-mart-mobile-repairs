"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const WORD_ONE = "YR".split("");
const WORD_TWO = "MART".split("");
const SESSION_KEY = "yrmart:intro-played";

/**
 * Full-screen title sequence. Plays once per browser session and shortens to a
 * beat for anyone who prefers reduced motion. Calls `onDone` as the curtain
 * starts lifting so the hero can animate in behind it.
 */
export function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  // Unmounts outright, skipping the exit animation, when the intro should not
  // play at all — no lingering overlay to wait on.
  const [skip, setSkip] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let alreadyPlayed = false;
    try {
      alreadyPlayed = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Storage blocked (private mode) — just play the intro.
    }

    const markPlayed = () => {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
    };

    if (alreadyPlayed || reduced) {
      setSkip(true);
      setVisible(false);
      onDone();
      markPlayed();
      return;
    }

    const start = performance.now();
    const duration = 1500;
    let frame = 0;

    const tick = (now: number) => {
      // Ease-out so the number sprints early and settles on 100.
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const done = window.setTimeout(() => {
      setVisible(false);
      onDone();
      markPlayed();
    }, 2150);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(done);
    };
  }, [onDone]);

  // Keep the page from scrolling underneath the overlay.
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  if (skip) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          aria-hidden="true"
          exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.75 } }}
        >
          {/* Two panels that part like a curtain on exit */}
          <motion.div
            className="noise absolute inset-x-0 top-0 h-1/2 bg-ink-950"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="noise absolute inset-x-0 bottom-0 h-1/2 bg-ink-950"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Glow behind the wordmark */}
          <motion.div
            className="blob pointer-events-none absolute h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(46,125,255,0.38),transparent_62%)]"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            className="relative flex flex-col items-center px-6"
            exit={{ opacity: 0, y: -24, transition: { duration: 0.4 } }}
          >
            <div className="flex items-baseline gap-[0.18em] overflow-hidden">
              {WORD_ONE.map((letter, i) => (
                <Letter key={`a-${i}`} index={i} className="text-amber-brand">
                  {letter}
                </Letter>
              ))}
              <span className="w-[0.3em]" />
              {WORD_TWO.map((letter, i) => (
                <Letter key={`b-${i}`} index={i + 2} className="text-white">
                  {letter}
                </Letter>
              ))}
            </div>

            <motion.p
              className="mt-4 text-center text-[0.6rem] font-medium uppercase tracking-[0.5em] text-white/45 sm:text-xs"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              Mobile Repairs
            </motion.p>

            <motion.div
              className="mt-10 flex w-56 items-center gap-3 sm:w-72"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="h-px flex-1 overflow-hidden bg-white/12">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-signal-500 to-amber-brand"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="w-9 text-right font-display text-xs tabular-nums text-white/50">
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
    <motion.span
      className={`inline-block font-display text-[clamp(3rem,16vw,8rem)] font-extrabold leading-[0.9] ${className ?? ""}`}
      initial={{ y: "110%", rotate: 8, opacity: 0 }}
      animate={{ y: "0%", rotate: 0, opacity: 1 }}
      transition={{
        delay: 0.12 + index * 0.075,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.span>
  );
}
