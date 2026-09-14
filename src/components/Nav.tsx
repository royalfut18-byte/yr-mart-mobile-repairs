"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { business } from "@/lib/data";
import { PhoneIcon } from "@/components/ui/Icons";
import { OpenPill } from "@/components/OpenPill";
import { useStageReady } from "@/components/Stage";

const links = [
  { href: "#repairs", label: "Repairs" },
  { href: "#how", label: "How it works" },
  { href: "#shop", label: "In store" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit" },
];

export function Nav() {
  const ready = useStageReady();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile sheet, and close it on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <Header ready={ready} scrolled={scrolled}>
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:h-18 sm:px-8"
          aria-label="Primary"
        >
          <a href="#top" className="group flex items-center gap-2.5" aria-label={`${business.name} home`}>
            <Logo />
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-extrabold tracking-tight sm:text-lg">
                <span className="text-amber-brand">YR</span> MART
              </span>
              <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.24em] text-white/40">
                Mobile Repairs
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-white/65 transition-colors hover:text-white"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-0 scale-90 rounded-full bg-white/6 opacity-0 transition-all duration-300 hover:scale-100 hover:opacity-100" />
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
              className="group hidden items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink-950 transition-transform duration-300 hover:scale-[1.04] active:scale-95 sm:inline-flex"
            >
              <PhoneIcon className="h-4 w-4" />
              {business.phoneDisplay}
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/5 lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <span className="flex h-4 w-5 flex-col justify-between">
                <motion.span
                  className="block h-[2px] w-full rounded-full bg-white"
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block h-[2px] w-full rounded-full bg-white"
                  animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-[2px] w-full rounded-full bg-white"
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Reading-progress hairline */}
        <motion.div
          className="h-[2px] origin-left bg-gradient-to-r from-signal-500 via-signal-300 to-amber-brand"
          style={{ scaleX: progress }}
        />
      </Header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-ink-950/85 backdrop-blur-xl"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="absolute inset-x-0 top-0 flex min-h-full flex-col justify-center px-7 pb-16 pt-28"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className="space-y-1">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.08, duration: 0.4 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline gap-4 border-b border-white/8 py-4 font-display text-3xl font-bold tracking-tight text-white/90 transition-colors active:text-signal-300"
                    >
                      <span className="font-sans text-xs font-medium tabular-nums text-signal-400">
                        0{i + 1}
                      </span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mt-10 space-y-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <OpenPill />
                <a
                  href={business.phoneHref}
                  className="flex items-center justify-center gap-2.5 rounded-2xl bg-white px-6 py-4 font-display text-lg font-bold text-ink-950"
                >
                  <PhoneIcon className="h-5 w-5" />
                  {business.phoneDisplay}
                </a>
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-6 py-4 text-sm font-semibold text-white/80"
                >
                  Get directions
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** The bar itself. Drops in once the intro curtain has lifted. */
function Header({
  ready,
  scrolled,
  children,
}: {
  ready: boolean;
  scrolled: boolean;
  children: React.ReactNode;
}) {
  const className = `fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
    scrolled
      ? "border-b border-white/8 bg-ink-950/75 backdrop-blur-xl"
      : "border-b border-transparent bg-transparent"
  }`;

  return (
    <motion.header
      data-enter
      className={className}
      initial={{ y: -80, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.header>
  );
}

function Logo() {
  return (
    <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-signal-500 to-signal-600 shadow-[0_8px_24px_-8px_rgba(46,125,255,0.9)]">
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_60%)]" />
      <svg viewBox="0 0 24 24" className="relative h-5 w-5" aria-hidden="true">
        <rect
          x="7"
          y="2.5"
          width="10"
          height="19"
          rx="2.4"
          fill="none"
          stroke="white"
          strokeWidth="1.7"
        />
        <path
          d="M13.6 6.6 9.6 12h3.4l-1.9 5"
          fill="none"
          stroke="var(--color-amber-brand)"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
