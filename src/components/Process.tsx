"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    n: "01",
    title: "Walk in",
    time: "Any time we're open",
    body: "No booking, no online form, no waiting for a slot. Come down to Military Road and put the device on the counter — Yusuf looks at it right then.",
  },
  {
    n: "02",
    title: "Get a straight price",
    time: "Before anything is opened",
    body: "You hear exactly what's wrong, what it costs and which options you have. If a cheaper fix will do the job, that's the one you'll be offered.",
  },
  {
    n: "03",
    title: "Wait about 20 minutes",
    time: "Most screens & batteries",
    body: "Grab a coffee on the strip or browse the wall of cases. Bigger jobs and ordered-in parts are usually turned around within 48 hours.",
  },
  {
    n: "04",
    title: "Checked, then handed back",
    time: "Tested in front of you",
    body: "Touch, cameras, speakers and charging all tested before it leaves. Add a case and a fitted screen protector and you won't be back next month.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(46,125,255,0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Four steps, <span className="text-gradient">no runaround</span>
            </>
          }
          lead="The whole point of a local shop is that you don't post your phone away and hope. Here's exactly what happens when you walk through the door."
          align="center"
        />

        <div ref={ref} className="relative mx-auto mt-16 max-w-3xl">
          {/* Spine */}
          <div className="absolute left-[1.45rem] top-2 hidden h-[calc(100%-3rem)] w-px bg-white/10 sm:block">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-signal-400 via-signal-500 to-amber-brand"
              style={{ scaleY: lineScale }}
            />
            <motion.span
              className="absolute -left-[5px] h-3 w-3 rounded-full bg-signal-300 shadow-[0_0_22px_6px_rgba(46,125,255,0.55)]"
              style={{ top: glowY }}
            />
          </div>

          <ol className="space-y-4">
            {steps.map((step, i) => (
              <li key={step.n}>
                <Reveal delay={i * 0.08} direction="left">
                  <div className="group relative flex gap-5 sm:gap-7">
                    <span className="relative z-10 hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-white/12 bg-ink-900 font-display text-sm font-bold text-white/70 transition-colors duration-500 group-hover:border-signal-400/50 group-hover:text-signal-300 sm:grid">
                      {step.n}
                    </span>

                    <div className="surface flex-1 rounded-3xl p-6 transition-transform duration-500 group-hover:translate-x-1 sm:p-7">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-display text-sm font-bold text-signal-300 sm:hidden">
                          {step.n}
                        </span>
                        <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                          {step.title}
                        </h3>
                        <span className="rounded-full bg-white/6 px-2.5 py-1 text-[11px] font-medium text-white/50">
                          {step.time}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
