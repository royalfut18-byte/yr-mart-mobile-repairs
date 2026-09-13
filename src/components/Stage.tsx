"use client";

import { MotionConfig } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Intro } from "@/components/Intro";

type StageState = {
  /** True once the intro curtain has started lifting. */
  ready: boolean;
  /**
   * True when the visitor asked for reduced motion. Components render their
   * finished state directly instead of animating into it — content must never
   * depend on an animation frame to become visible.
   */
  still: boolean;
};

const StageContext = createContext<StageState>({ ready: false, still: false });

export function useStage() {
  return useContext(StageContext);
}

export function Stage({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  // Always false for the server render and the first client render, so the
  // markup matches; the effect flips it immediately after hydration.
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Stable identity so the intro's timers are not torn down on re-render.
  const handleDone = useCallback(() => setReady(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <StageContext.Provider value={{ ready: ready || still, still }}>
        <Intro onDone={handleDone} />
        {children}
      </StageContext.Provider>
    </MotionConfig>
  );
}
