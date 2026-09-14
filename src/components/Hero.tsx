"use client";

import { motion } from "motion/react";
import { business } from "@/lib/data";
import { useStageReady } from "@/components/Stage";
import { Pill } from "@/components/ui/Pill";
import { SmartImage } from "@/components/ui/SmartImage";
import { OpenPill } from "@/components/OpenPill";
import { PhoneIcon, StarIcon } from "@/components/ui/Icons";

const HEADLINE_A = ["Cracked", "screen?"];
const HEADLINE_B = ["Fixed", "while", "you", "wait."];

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The fanned row under the headline. Heights and vertical offsets arc down from
 * the centre card, which is what gives the reference its shopfront-window feel.
 */
const fan = [
  { src: "/images/case-rugged-armor.webp", alt: "MagSafe rugged armour cases", h: "h-40 sm:h-48 lg:h-56", y: "translate-y-10 lg:translate-y-14" },
  { src: "/images/case-luxury-magsafe.webp", alt: "Luxury MagSafe glitter cases", h: "h-52 sm:h-60 lg:h-72", y: "translate-y-3 lg:translate-y-5" },
  { src: "/images/storefront.webp", alt: "The YR MART shopfront on Military Road", h: "h-60 sm:h-72 lg:h-[21rem]", y: "translate-y-0" },
  { src: "/images/ipad-folio.webp", alt: "360 degree rotating iPad folios", h: "h-52 sm:h-60 lg:h-72", y: "translate-y-3 lg:translate-y-5" },
  { src: "/images/case-hanman-wallet.webp", alt: "Hanman leather wallet cases", h: "h-40 sm:h-48 lg:h-56", y: "translate-y-10 lg:translate-y-14" },
];

export function Hero() {
  const ready = useStageReady();
  const state = ready ? "show" : "hidden";

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="mx-auto max-w-[86rem] px-5 text-center sm:px-8">
        <Fade state={state} delay={0} className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-2 pr-4 shadow-[0_1px_2px_rgba(22,23,31,0.05)]">
            <span className="flex items-center gap-0.5 rounded-full bg-brand-soft px-2 py-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-3 w-3 text-brand" />
              ))}
            </span>
            <span className="text-xs font-medium text-ink-muted">
              <span className="font-semibold text-ink">{business.rating}</span> from{" "}
              {business.reviewCount} Google reviews
            </span>
          </div>
        </Fade>

        <h1 className="mx-auto mt-7 max-w-5xl font-display text-[clamp(2.5rem,7.2vw,5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
          <span className="block">
            {HEADLINE_A.map((w, i) => (
              <Word key={w} state={state} delay={0.08 + i * 0.08}>
                {w}
              </Word>
            ))}
          </span>
          <span className="block">
            {HEADLINE_B.map((w, i) => (
              <Word key={w} state={state} delay={0.24 + i * 0.07}>
                {w}
              </Word>
            ))}
          </span>
        </h1>

        <Fade state={state} delay={0.5}>
          <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink-muted">
            {business.owner} has been fixing phones on Military Road for years — screens,
            batteries, back glass and charging ports, most of them done at the counter in about
            twenty minutes. No appointment, no postage, no waiting a week.
          </p>
        </Fade>

        <Fade state={state} delay={0.62}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Pill
              href={business.phoneHref}
              tone="brand"
              icon={<PhoneIcon className="h-[1.1rem] w-[1.1rem]" />}
            >
              Call {business.phoneDisplay}
            </Pill>
            <Pill href="#repairs" tone="light">
              See what we fix
            </Pill>
          </div>
        </Fade>

        <Fade state={state} delay={0.74}>
          <div className="mt-7 flex justify-center">
            <OpenPill compact />
          </div>
        </Fade>
      </div>

      {/* Fanned photo row */}
      <div className="mx-auto mt-14 max-w-[86rem] px-3 sm:mt-16 sm:px-8">
        <div className="flex items-end justify-center gap-2 sm:gap-4">
          {fan.map((item, i) => (
            <motion.div
              key={item.src}
              data-enter
              className={`${item.y} ${i === 0 || i === 4 ? "hidden sm:block" : ""} min-w-0 flex-1`}
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              animate={state}
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.92 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ delay: 0.5 + Math.abs(2 - i) * 0.09, duration: 0.9, ease }}
            >
              <div className={`overflow-hidden rounded-3xl bg-white p-1.5 shadow-[0_8px_30px_-14px_rgba(22,23,31,0.25)] ${item.h}`}>
                <SmartImage
                  src={item.src}
                  alt={item.alt}
                  priority={i === 2}
                  className="h-full w-full rounded-[1.15rem] object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Fade({
  children,
  state,
  delay,
  className,
}: {
  children: React.ReactNode;
  state: string;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      data-enter
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={state}
      variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
      transition={{ delay, duration: 0.7, ease }}
    >
      {children}
    </motion.div>
  );
}

function Word({
  children,
  state,
  delay,
}: {
  children: string;
  state: string;
  delay: number;
}) {
  return (
    // The clipping span is what makes each word rise out of the line above it.
    <span className="inline-block overflow-hidden pb-[0.06em] pr-[0.25em] align-bottom">
      <motion.span
        data-enter
        className="inline-block"
        initial={{ y: "105%" }}
        animate={state}
        variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
        transition={{ delay, duration: 0.9, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}
