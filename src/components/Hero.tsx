"use client";

import { motion } from "motion/react";
import { business } from "@/lib/data";
import { useStageReady } from "@/components/Stage";
import { Pill } from "@/components/ui/Pill";
import { OpenPill } from "@/components/OpenPill";
import { PhoneIcon, StarIcon } from "@/components/ui/Icons";
import { CrackedBand } from "@/components/CrackedBand";
import { photos } from "@/lib/images";

const HEADLINE_A = ["Cracked", "screen?"];
const HEADLINE_B = ["Fixed", "while", "you", "wait."];

const ease = [0.16, 1, 0.3, 1] as const;


export function Hero() {
  const ready = useStageReady();
  const state = ready ? "show" : "hidden";

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="mx-auto max-w-[86rem] px-5 text-center sm:px-8">
        <Fade state={state} delay={0} className="flex justify-center">
          {/* The shop's sign, shown whole. Yusuf asked for it on the front page
              presented the way it appears in the "look for this sign" card. */}
          <div className="card w-full max-w-lg p-2.5 sm:p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos.logo.src}
              alt={photos.logo.alt}
              width={1080}
              height={284}
              className="w-full rounded-xl"
            />
          </div>
        </Fade>

        <Fade state={state} delay={0.08} className="mt-7 flex justify-center">
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

        <h1 className="mx-auto mt-6 max-w-5xl font-display text-[clamp(2.5rem,7.2vw,5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
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
            {business.owner} has been fixing phones on Military Road for years: screens,
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

      <CrackedBand />
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
      initial={{ opacity: 0, y: 44 }}
      animate={state}
      variants={{ hidden: { opacity: 0, y: 44 }, show: { opacity: 1, y: 0 } }}
      transition={{
        delay,
        duration: 0.9,
        ease,
        opacity: { delay, duration: 0.3, ease: "easeOut" },
      }}
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
