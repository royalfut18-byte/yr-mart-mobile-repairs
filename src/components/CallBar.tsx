"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { business } from "@/lib/data";
import { PhoneIcon, PinIcon } from "@/components/ui/Icons";

/**
 * Sticky call/directions bar for phones. Appears once the hero is scrolled past
 * so it never covers the hero's own call button.
 */
export function CallBar() {
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
          // data-enter matters more here than anywhere else on the page: this is
          // the primary call button on a phone, and it slides up from off
          // screen. If animation frames never arrive it would sit below the fold
          // permanently, so the escape hatch in globals.css pins it in place.
          data-enter
          className="pb-safe fixed inset-x-0 bottom-0 z-40 px-3 pt-3 lg:hidden"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 rounded-full bg-white p-2 shadow-[0_-6px_30px_-8px_rgba(22,23,31,0.28)]">
            <a
              href={business.phoneHref}
              className="flex flex-1 items-center justify-center gap-2.5 rounded-full bg-brand py-3.5 font-display text-base font-bold text-white active:scale-[0.97]"
            >
              <PhoneIcon className="h-5 w-5" />
              Call {business.owner}
            </a>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Get directions"
              className="grid h-[3.25rem] w-[3.25rem] shrink-0 place-items-center rounded-full border border-ink/12 text-ink active:scale-95"
            >
              <PinIcon className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
