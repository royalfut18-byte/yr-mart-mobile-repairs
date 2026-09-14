"use client";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

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
  return (
    <section id="how" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              How it works
            </span>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-[1.06]">
              Four steps, no runaround
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink-muted">
              The whole point of a local shop is that you don&apos;t post your phone away and
              hope. Here is exactly what happens when you walk through the door.
            </p>
          </div>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {steps.map((step) => (
            <RevealItem key={step.n}>
              <article className="card group flex h-full flex-col p-7 transition-transform duration-500 hover:-translate-y-1">
                <span className="font-display text-[2.75rem] font-extrabold leading-none tracking-tight text-paper-deep transition-colors duration-500 group-hover:text-brand">
                  {step.n}
                </span>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight">
                  {step.title}
                </h3>
                <span className="mt-2 inline-flex w-fit rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand">
                  {step.time}
                </span>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">{step.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
