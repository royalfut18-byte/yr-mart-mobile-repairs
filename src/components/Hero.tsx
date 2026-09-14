"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { business } from "@/lib/data";
import { useStageReady } from "@/components/Stage";
import { Magnetic } from "@/components/ui/Magnetic";
import { Counter } from "@/components/ui/Counter";
import { OpenPill } from "@/components/OpenPill";
import { ArrowIcon, PhoneIcon, PinIcon, StarIcon } from "@/components/ui/Icons";

const HEADLINE = ["Smashed", "screen?"];
const SUBLINE = ["Walk", "in.", "Walk", "out", "fixed."];

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  // Content stays hidden until the intro curtain lifts, so the two sequences
  // read as one continuous move rather than two competing ones.
  const ready = useStageReady();
  const state = ready ? "show" : "hidden";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Gentle parallax: content drifts up and fades as you scroll past.
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pb-20 pt-28 sm:pt-32"
    >
      <Aurora style={{ y: glowY }} />

      <motion.div
        className="relative mx-auto w-full max-w-7xl px-5 sm:px-8"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div>
            <Fade state={state} delay={0} className="inline-block">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 py-1.5 pl-1.5 pr-4 backdrop-blur">
                <span className="flex items-center gap-1 rounded-full bg-amber-brand/15 px-2.5 py-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-3 w-3 text-amber-brand" />
                  ))}
                </span>
                <span className="text-xs font-medium text-white/70">
                  <span className="font-semibold text-white">{business.rating}</span> from{" "}
                  {business.reviewCount} Google reviews
                </span>
              </div>
            </Fade>

            <h1 className="mt-6 font-display text-[clamp(2.6rem,8.5vw,5.4rem)] font-extrabold leading-[0.94] tracking-[-0.035em]">
              <span className="block">
                {HEADLINE.map((word, i) => (
                  <Word key={word} state={state} delay={0.1 + i * 0.09}>
                    {word}
                  </Word>
                ))}
              </span>
              <span className="mt-1 block">
                {SUBLINE.map((word, i) => (
                  <Word
                    key={`${word}-${i}`}
                    state={state}
                    delay={0.28 + i * 0.07}
                    className={i > 1 ? "text-gradient" : "text-white/55"}
                  >
                    {word}
                  </Word>
                ))}
              </span>
            </h1>

            <Fade state={state} delay={0.55}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                {business.owner} has been fixing phones on Military Road for years — screens,
                batteries, back glass and charging ports, most of them done at the counter in
                about twenty minutes. No appointment, no postage, no waiting a week.
              </p>
            </Fade>

            <Fade state={state} delay={0.68}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Magnetic>
                  <a
                    href={business.phoneHref}
                    className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-white px-7 py-4 font-display text-base font-bold text-ink-950 shadow-[0_20px_50px_-18px_rgba(255,255,255,0.55)] transition-transform duration-300 active:scale-[0.97]"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-signal-300/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <PhoneIcon className="relative h-5 w-5" />
                    <span className="relative">Call {business.phoneDisplay}</span>
                  </a>
                </Magnetic>

                <Magnetic strength={0.25}>
                  <a
                    href="#repairs"
                    className="group flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white/85 backdrop-blur transition-colors duration-300 hover:border-white/30 hover:bg-white/10"
                  >
                    See what we fix
                    <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Magnetic>
              </div>
            </Fade>

            <Fade state={state} delay={0.85}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <OpenPill compact />
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/70 backdrop-blur transition-colors hover:border-white/25 hover:text-white"
                >
                  <PinIcon className="h-3.5 w-3.5 text-signal-400" />
                  {business.addressLine}, {business.suburb}
                </a>
              </div>
            </Fade>
          </div>

          <motion.div
            data-enter
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={state}
            variants={{
              hidden: { opacity: 0, scale: 0.9, rotate: -4 },
              show: { opacity: 1, scale: 1, rotate: 0 },
            }}
            transition={{ delay: 0.2, duration: 1, ease }}
          >
            <PhoneShowcase ready={ready} />
          </motion.div>
        </div>

        <Fade state={state} delay={0.95}>
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 sm:mt-20 sm:grid-cols-4">
            <Stat value={20} suffix=" min" label="Typical screen repair" />
            <Stat value={business.rating} decimals={1} suffix="★" label="Google rating" />
            <Stat value={business.reviewCount} suffix="+" label="Local reviews" />
            <Stat value={7} suffix=" days" label="Open every week" />
          </div>
        </Fade>
      </motion.div>

      <ScrollCue state={state} />
    </section>
  );
}

/** Opacity/offset entrance keyed off the stage state. */
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
      initial={{ opacity: 0, y: 24 }}
      animate={state}
      variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
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
  className,
}: {
  children: string;
  state: string;
  delay: number;
  className?: string;
}) {
  return (
    // The clipping span is what makes each word rise out of the line above it.
    <span className="inline-block overflow-hidden pb-[0.08em] pr-[0.22em] align-bottom">
      <motion.span
        data-enter
        className={`inline-block ${className ?? ""}`}
        initial={{ y: "105%" }}
        animate={state}
        variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
        transition={{ delay, duration: 0.95, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Stat({
  value,
  label,
  suffix,
  decimals,
}: {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
}) {
  return (
    <div className="bg-ink-950/80 px-5 py-6 backdrop-blur">
      <div className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        <Counter value={value} decimals={decimals} suffix={suffix} />
      </div>
      <div className="mt-1.5 text-xs font-medium uppercase tracking-[0.12em] text-white/45">
        {label}
      </div>
    </div>
  );
}

function Aurora({ style }: { style?: React.ComponentProps<typeof motion.div>["style"] }) {
  return (
    <motion.div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={style}>
      <div className="absolute inset-0 bg-ink-950" />
      <div className="blob animate-drift absolute -left-[12%] -top-[22%] h-[56vh] w-[56vh] rounded-full bg-[radial-gradient(circle,rgba(46,125,255,0.5),transparent_62%)]" />
      <div
        className="blob animate-drift absolute -right-[14%] top-[4%] h-[50vh] w-[50vh] rounded-full bg-[radial-gradient(circle,rgba(255,176,32,0.3),transparent_62%)]"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="blob animate-drift absolute bottom-[-20%] left-[26%] h-[46vh] w-[46vh] rounded-full bg-[radial-gradient(circle,rgba(232,54,43,0.26),transparent_60%)]"
        style={{ animationDelay: "-14s" }}
      />
      <div className="grid-lines absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_72%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-950 to-transparent" />
    </motion.div>
  );
}

/** A phone rendered entirely in CSS/SVG — crisp at every size, zero image weight. */
function PhoneShowcase({ ready }: { ready: boolean }) {
  return (
    <div className="relative">
      <div className="blob absolute inset-x-6 top-10 -z-10 h-full rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(46,125,255,0.42),transparent_65%)]" />

      <div className="animate-float relative mx-auto aspect-[9/18.5] w-[min(17rem,72vw)]">
        {/* Body */}
        <div className="absolute inset-0 rounded-[2.6rem] bg-gradient-to-b from-white/22 via-white/8 to-white/14 p-[2px] shadow-[0_50px_90px_-30px_rgba(0,0,0,0.95)]">
          <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-ink-900">
            {/* Wallpaper */}
            <div className="absolute inset-0 bg-[linear-gradient(160deg,#123,#0a1020_45%,#1a1030)]" />
            <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-signal-500/45 blur-2xl" />
            <div className="absolute -right-12 bottom-16 h-52 w-52 rounded-full bg-amber-brand/25 blur-2xl" />

            {/* Repair scan line */}
            <div className="animate-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-signal-300/35 to-transparent" />

            {/* Dynamic island */}
            <div className="absolute left-1/2 top-3 h-6 w-[34%] -translate-x-1/2 rounded-full bg-black" />

            {/* Status bar */}
            <div className="absolute inset-x-0 top-[0.9rem] flex items-center justify-between px-6 text-[9px] font-semibold text-white/80">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2.5 rounded-[2px] bg-white/70" />
                <span className="h-2 w-4 rounded-[2px] border border-white/60" />
              </span>
            </div>

            {/* Diagnostic card */}
            <div className="absolute inset-x-4 top-[5.2rem] rounded-2xl border border-white/12 bg-white/8 p-3.5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-400/20">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true">
                    <path
                      d="m5 12.5 4.5 4.5L19 7.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-semibold text-white">Screen replaced</p>
                  <p className="truncate text-[9px] text-white/50">Tested &amp; ready to collect</p>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <Meter label="Touch" value="100%" width="100%" tone="bg-emerald-400" delay={0} ready={ready} />
                <Meter label="Battery" value="100%" width="100%" tone="bg-signal-400" delay={0.2} ready={ready} />
                <Meter label="Cameras" value="OK" width="92%" tone="bg-amber-brand" delay={0.4} ready={ready} />
              </div>
            </div>

            {/* App grid */}
            <div className="absolute inset-x-5 bottom-16 grid grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-[0.8rem] bg-white/8 backdrop-blur-sm"
                  style={{ opacity: 0.35 + (i % 4) * 0.12 }}
                />
              ))}
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-2.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/45" />
          </div>
        </div>

        {/* Side buttons */}
        <div className="absolute -left-[3px] top-[22%] h-9 w-[3px] rounded-l bg-white/25" />
        <div className="absolute -left-[3px] top-[33%] h-14 w-[3px] rounded-l bg-white/25" />
        <div className="absolute -right-[3px] top-[28%] h-16 w-[3px] rounded-r bg-white/25" />
      </div>

      {/* Floating chips */}
      <FloatingChip ready={ready} className="-left-2 top-[18%] sm:left-0" delay={0.55}>
        <span className="text-amber-brand">20 min</span> turnaround
      </FloatingChip>
      <FloatingChip ready={ready} className="-right-1 top-[52%] sm:right-0" delay={0.75}>
        No booking needed
      </FloatingChip>
      <FloatingChip ready={ready} className="bottom-[8%] left-2 sm:left-6" delay={0.95}>
        Open <span className="text-signal-300">7 days</span>
      </FloatingChip>
    </div>
  );
}

function Meter({
  label,
  value,
  width,
  tone,
  delay,
  ready,
}: {
  label: string;
  value: string;
  width: string;
  tone: string;
  delay: number;
  ready: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[8.5px] text-white/55">
        <span>{label}</span>
        <span className="font-semibold text-white/80">{value}</span>
      </div>
      <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={`h-full rounded-full ${tone}`}
          initial={{ width: 0 }}
          animate={{ width: ready ? width : 0 }}
          transition={{ delay: 0.7 + delay, duration: 1.1, ease }}
        />
      </div>
    </div>
  );
}

function FloatingChip({
  children,
  className,
  delay,
  ready,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
  ready: boolean;
}) {
  return (
    <motion.div
      data-enter
      className={`absolute z-10 rounded-xl border border-white/12 bg-ink-900/80 px-3 py-2 text-[11px] font-semibold text-white/85 shadow-xl backdrop-blur-md ${className ?? ""}`}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={ready ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 10 }}
      transition={{ delay, duration: 0.55, ease }}
    >
      {children}
    </motion.div>
  );
}

function ScrollCue({ state }: { state: string }) {
  return (
    <motion.a
      data-enter
      href="#repairs"
      aria-label="Scroll to repairs"
      className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/35 transition-colors hover:text-white/70 md:flex"
      initial={{ opacity: 0 }}
      animate={state}
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
      <span className="relative h-9 w-5 rounded-full border border-current">
        <motion.span
          className="absolute left-1/2 top-1.5 h-1.5 w-1 -translate-x-1/2 rounded-full bg-current"
          animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </motion.a>
  );
}
