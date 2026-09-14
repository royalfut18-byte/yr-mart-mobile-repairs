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

/** True once the intro curtain has lifted. The hero waits on this. */
const StageContext = createContext(false);

export function useStageReady() {
  return useContext(StageContext);
}

export function Stage({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  // Stable identity so the intro's timers survive re-renders.
  const handleDone = useCallback(() => setReady(true), []);

  // Failsafe. The hero starts at opacity 0 and waits for this flag, so if the
  // intro's timer is ever starved (background tab, throttled timers) the page
  // must still reveal itself rather than sit blank.
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 4000);
    return () => window.clearTimeout(id);
  }, []);

  // Entrance animations only ever end in "visible", so a page whose animation
  // frames never arrive would stay blank; an embedded webview or a suspended
  // tab can do exactly that. Watch for it and flag the document; one CSS rule
  // in globals.css then forces every [data-enter] element to its resting state.
  useEffect(() => {
    let frame = 0;
    let timer = 0;
    const root = document.documentElement;

    const probe = () => {
      let sawFrame = false;
      frame = requestAnimationFrame(() => {
        sawFrame = true;
        delete root.dataset.motion;
      });
      timer = window.setTimeout(() => {
        if (!sawFrame) root.dataset.motion = "off";
      }, 700);
    };

    probe();
    // Frames resume when a backgrounded tab comes forward, so re-check then.
    document.addEventListener("visibilitychange", probe);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", probe);
    };
  }, []);

  return (
    // "user" tells Motion to drop transform animations for visitors who ask for
    // reduced motion while still cross-fading, so the site is gentler but never
    // dead. Do NOT branch on the media query during render; that desyncs the
    // server markup from the first client render.
    <MotionConfig reducedMotion="user">
      <StageContext.Provider value={ready}>
        <Intro onDone={handleDone} />
        {children}
      </StageContext.Provider>
    </MotionConfig>
  );
}
