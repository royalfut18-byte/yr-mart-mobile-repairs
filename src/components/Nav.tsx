"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { business } from "@/lib/data";
import { PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { OpenPill } from "@/components/OpenPill";
import { useStageReady } from "@/components/Stage";
import { photos } from "@/lib/images";

const links = [
  { href: "#repairs", label: "Repairs" },
  { href: "#shop", label: "In Store" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#visit", label: "Visit" },
];

export function Nav() {
  const ready = useStageReady();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  /**
   * Keeps the sheet in the tree just long enough to animate out, then drops it
   * whatever happened. AnimatePresence holds an exiting child until its
   * animation finishes, and that animation runs on animation frames; if frames
   * never arrive the sheet would sit there at opacity 0 still swallowing every
   * tap, which looks like a page that has simply stopped responding.
   */
  const [menuMounted, setMenuMounted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      setMenuMounted(true);
      return;
    }
    const id = window.setTimeout(() => setMenuMounted(false), 450);
    return () => window.clearTimeout(id);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        data-enter
        className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_1px_0_0_rgba(22,23,31,0.08)]" : ""
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="bg-surface/90 backdrop-blur-md">
          <nav
            className="relative mx-auto flex h-16 max-w-[86rem] items-center justify-between gap-6 px-5 sm:h-[4.5rem] sm:px-8"
            aria-label="Primary"
          >
            <a
              href="#top"
              className="-my-2 flex shrink-0 items-center gap-2 py-2"
              aria-label={`${business.name} home`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos.logo.src}
                alt={photos.logo.alt}
                width={1080}
                height={284}
                className="h-9 w-auto rounded-md sm:h-12"
              />
            </a>

            {/* Centred links, as in the reference */}
            <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden xl:block">
                <OpenPill compact />
              </span>

              <a
                href={business.phoneHref}
                className="hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-display text-sm font-semibold text-white transition-colors hover:bg-brand-dark sm:inline-flex"
              >
                <PhoneIcon className="h-4 w-4" />
                {business.phoneDisplay}
              </a>

              <a
                href={business.phoneHref}
                aria-label={`Call ${business.phoneDisplay}`}
                className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white sm:hidden"
              >
                <PhoneIcon className="h-5 w-5" />
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/12 bg-white lg:hidden"
              >
                <span className="flex h-3.5 w-5 flex-col justify-between">
                  <motion.span
                    className="block h-[2px] w-full rounded-full bg-ink"
                    animate={
                      menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="block h-[2px] w-full rounded-full bg-ink"
                    animate={
                      menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }
                    }
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="block h-[2px] w-full rounded-full bg-ink"
                    animate={
                      menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {menuMounted && (
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              className="fixed inset-0 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, pointerEvents: "auto" }}
              exit={{ opacity: 0, pointerEvents: "none" }}
              transition={{ duration: 0.25 }}
            >
              <div
                className="absolute inset-0 bg-paper"
                onClick={() => setMenuOpen(false)}
              />
              <motion.div
                className="absolute inset-x-0 top-0 flex min-h-full flex-col justify-center px-6 pb-16 pt-24"
                initial={{ y: -18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ul className="space-y-2">
                  {links.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i + 0.06, duration: 0.4 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="card flex items-center justify-between px-5 py-4 font-display text-xl font-bold text-ink"
                      >
                        {link.label}
                        <span className="text-sm font-medium text-brand">
                          0{i + 1}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  className="mt-8 space-y-3"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34, duration: 0.4 }}
                >
                  <OpenPill />
                  <a
                    href={business.phoneHref}
                    className="flex items-center justify-center gap-2.5 rounded-full bg-brand px-6 py-4 font-display text-lg font-bold text-white"
                  >
                    <PhoneIcon className="h-5 w-5" />
                    {business.phoneDisplay}
                  </a>
                  <a
                    href={business.mapsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-4 text-sm font-semibold text-ink"
                  >
                    <PinIcon className="h-4 w-4" />
                    Get directions
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
