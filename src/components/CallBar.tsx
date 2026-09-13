"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { business } from "@/lib/data";
import { PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { useStage } from "@/components/Stage";

/**
 * Sticky call/directions bar for phones. Appears once the hero is scrolled past
 * so it never covers the hero's own call button.
 */
export function CallBar() {
  const { still } = useStage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pb-safe fixed inset-x-0 bottom-0 z-40 px-3 pt-3 lg:hidden"
          initial={still ? false : { y: 120, opacity: 0 }}
          animate={still ? undefined : { y: 0, opacity: 1 }}
          exit={still ? undefined : { y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 rounded-2xl border border-white/12 bg-ink-900/90 p-2 shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <a
              href={business.phoneHref}
              className="flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-white py-3.5 font-display text-base font-bold text-ink-950 active:scale-[0.97]"
            >
              <PhoneIcon className="h-5 w-5" />
              Call {business.owner}
            </a>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Get directions"
              className="grid h-[3.25rem] w-[3.25rem] shrink-0 place-items-center rounded-xl border border-white/12 bg-white/6 text-white/80 active:scale-95"
            >
              <PinIcon className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
