"use client";

import { motion } from "motion/react";
import { business, services } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { OpenPill } from "@/components/OpenPill";
import { useStage } from "@/components/Stage";
import { ArrowIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";

const year = new Date().getFullYear();

export function Footer() {
  const { still } = useStage();

  return (
    <footer className="relative overflow-hidden">
      {/* Closing call to action */}
      <section className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="blob absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(46,125,255,0.26),transparent_62%)] animate-drift" />
          <div
            className="blob absolute bottom-0 right-[10%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,176,32,0.2),transparent_62%)] animate-drift"
            style={{ animationDelay: "-9s" }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-signal-300">
              Military Rd, Neutral Bay
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.2rem,7vw,4.6rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
              Your phone can be fixed
              <br />
              <span className="text-gradient">before your coffee&apos;s cold.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-base text-white/55 sm:text-lg">
              Walk in any day of the week, or call ahead and {business.owner} will tell you
              exactly what it takes.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic>
                <a
                  href={business.phoneHref}
                  className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-white px-8 py-4.5 font-display text-lg font-bold text-ink-950 shadow-[0_24px_60px_-20px_rgba(255,255,255,0.6)] transition-transform duration-300 active:scale-[0.97]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-signal-300/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <PhoneIcon className="relative h-5 w-5" />
                  <span className="relative">{business.phoneDisplay}</span>
                </a>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-4.5 text-sm font-semibold text-white/85 backdrop-blur transition-colors hover:border-white/30 hover:bg-white/10"
                >
                  <PinIcon className="h-4 w-4" />
                  Get directions
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex justify-center">
              <OpenPill compact />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Oversized wordmark that slides in as the page bottoms out */}
      <div className="relative select-none overflow-hidden" aria-hidden="true">
        {still ? (
          <p className="whitespace-nowrap text-center font-display text-[clamp(4rem,19vw,16rem)] font-extrabold leading-[0.8] tracking-[-0.05em] text-white/[0.045]">
            YR MART
          </p>
        ) : (
          <motion.p
            className="whitespace-nowrap text-center font-display text-[clamp(4rem,19vw,16rem)] font-extrabold leading-[0.8] tracking-[-0.05em] text-white/[0.045]"
            initial={{ x: "8%", opacity: 0 }}
            whileInView={{ x: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            YR MART
          </motion.p>
        )}
      </div>

      {/* Footer proper */}
      <div className="border-t border-white/8 bg-ink-950/60">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <p className="font-display text-2xl font-extrabold tracking-tight">
                <span className="text-amber-brand">YR</span> MART
                <span className="block text-xs font-medium uppercase tracking-[0.24em] text-white/40">
                  Mobile Repairs
                </span>
              </p>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
                Independent phone and tablet repair shop on Military Road, Neutral Bay. Screens,
                batteries, back glass, charging ports, cases and accessories — seven days a week.
              </p>
              <address className="mt-3 text-sm not-italic text-white/50">
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="-mx-2 block rounded-lg px-2 py-2 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {business.fullAddress}
                </a>
                <a
                  href={business.phoneHref}
                  className="-mx-2 block rounded-lg px-2 py-2 font-semibold text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {business.phoneDisplay}
                </a>
              </address>
            </div>

            <nav aria-label="Repairs">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                Repairs
              </h3>
              <ul className="mt-2 sm:mt-3">
                {services.slice(0, 6).map((service) => (
                  <li key={service.slug}>
                    <a
                      href="#repairs"
                      className="-mx-2 block rounded-lg px-2 py-2.5 text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="More">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                More
              </h3>
              <ul className="mt-2 sm:mt-3">
                {[
                  { href: "#how", label: "How it works" },
                  { href: "#shop", label: "Cases & accessories" },
                  { href: "#reviews", label: "Reviews" },
                  { href: "#faq", label: "FAQ" },
                  { href: "#visit", label: "Opening hours" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="-mx-2 block rounded-lg px-2 py-2.5 text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="hairline my-10" />

          <div className="flex flex-col gap-4 pb-20 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between lg:pb-0">
            <p>
              © {year} {business.name}. All rights reserved.
            </p>
            <p>
              Neutral Bay · Cremorne · Mosman · Cammeray · North Sydney · Kirribilli
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
