"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { business, services, type Service } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";
import { serviceIcons, ArrowIcon, PhoneIcon } from "@/components/ui/Icons";

export function Services() {
  return (
    <section id="repairs" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What we fix"
          title={
            <>
              Bring it in broken.
              <br />
              <span className="text-gradient">Leave with it working.</span>
            </>
          }
          lead="Ten things the shop does day in, day out — most of them finished at the counter while you wait, and all of them quoted before anything is opened up."
        />

        <RevealGroup
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
        >
          {services.map((service) => (
            <RevealItem key={service.slug}>
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="surface mt-6 flex flex-col items-start gap-6 overflow-hidden rounded-4xl p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="relative max-w-lg">
              <h3 className="font-display text-2xl font-bold sm:text-3xl">
                Not sure what&apos;s wrong with it?
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/55 sm:text-base">
                Describe the problem over the phone or just bring the device in. You get an
                honest look and a price first — if it isn&apos;t worth fixing, you&apos;ll be
                told that too.
              </p>
            </div>
            <a
              href={business.phoneHref}
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-2xl bg-white px-6 py-4 font-display text-base font-bold text-ink-950 transition-transform duration-300 hover:scale-[1.04] active:scale-95"
            >
              <PhoneIcon className="h-5 w-5" />
              Ask {business.owner}
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon];

  // Spotlight that tracks the cursor across the card.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(46,125,255,0.16), transparent 72%)`;

  function handleMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  return (
    <motion.article
      onPointerMove={handleMove}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="surface group relative h-full overflow-hidden rounded-3xl p-6"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal-400/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-signal-500/20 to-transparent text-signal-300 transition-all duration-500 group-hover:border-signal-400/40 group-hover:text-signal-200">
          <Icon className="h-6 w-6" />
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/60">
          {service.turnaround}
        </span>
      </div>

      <h3 className="relative mt-5 font-display text-xl font-bold tracking-tight">
        {service.title}
      </h3>
      <p className="relative mt-2.5 text-sm leading-relaxed text-white/55">{service.blurb}</p>

      <ul className="relative mt-5 flex flex-wrap gap-1.5">
        {service.highlights.map((item) => (
          <li
            key={item}
            className="rounded-full bg-white/6 px-2.5 py-1 text-[11px] font-medium text-white/55"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
