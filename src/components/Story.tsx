"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { business } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { StarIcon } from "@/components/ui/Icons";

const promises = [
  {
    title: "A price before, not after",
    body: "You hear the cost up front. Nothing gets opened, ordered or charged without you agreeing to it first.",
  },
  {
    title: "The cheaper option, when it fits",
    body: "Customers regularly mention being talked out of the expensive fix when a simpler one would do. That is deliberate.",
  },
  {
    title: "Tested before you take it",
    body: "Touch, cameras, speakers and charging are all checked in front of you, so nothing surprises you on the walk home.",
  },
];

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Slow inner-parallax on the photo so the section feels alive on scroll.
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="right">
            <div className="surface relative overflow-hidden rounded-4xl">
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
                <motion.div
                  className="absolute inset-x-0 -inset-y-[10%]"
                  style={{ y: imageY }}
                >
                  <SmartImage
                    src="/images/store-interior.webp"
                    alt="Inside YR MART: walls of phone cases, accessories and the repair counter"
                    label="Inside the shop"
                    accent="from-signal-500/30 to-ember/15"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/85 via-transparent to-transparent" />
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-4 rounded-2xl border border-white/12 bg-ink-950/75 p-4 backdrop-blur-xl">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-brand to-ember font-display text-lg font-extrabold text-ink-950">
                  Y
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-base font-bold">{business.owner}</p>
                  <p className="truncate text-xs text-white/50">
                    Owner &amp; technician, on the tools himself
                  </p>
                </div>
                <span className="ml-auto flex shrink-0 gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-3 w-3 text-amber-brand" />
                  ))}
                </span>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-signal-300">
                <span className="h-px w-7 bg-signal-400/60" />
                The shop
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-4 font-display text-[clamp(1.9rem,5vw,3.2rem)] font-extrabold leading-[1.05]">
                One person.
                <br />
                <span className="text-gradient">One counter. No call centre.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 text-base leading-relaxed text-white/55 sm:text-lg">
                {business.owner} runs YR MART himself — the same person who quotes your repair is
                the one who does it and hands it back. That is why the reviews keep using the same
                three words: fast, fair and honest.
              </p>
            </Reveal>

            <ul className="mt-9 space-y-3">
              {promises.map((promise, i) => (
                <li key={promise.title}>
                  <Reveal delay={0.16 + i * 0.07}>
                    <div className="surface group flex gap-4 rounded-2xl p-5 transition-transform duration-500 hover:translate-x-1">
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-signal-500/15 text-signal-300">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                          <path
                            d="m5 12.5 4.5 4.5L19 7.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div>
                        <h3 className="font-display text-base font-bold tracking-tight">
                          {promise.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                          {promise.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
