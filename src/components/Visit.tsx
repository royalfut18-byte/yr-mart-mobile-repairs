"use client";

import { useEffect, useState } from "react";
import { business, hours } from "@/lib/data";
import { formatHour, getOpenState } from "@/lib/hours";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon, ClockIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";

export function Visit() {
  // Highlight the current Sydney day once we're on the client.
  const [todayIndex, setTodayIndex] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setTodayIndex(getOpenState().dayIndex);
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="visit" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Find us"
          title={
            <>
              On the Military Road strip,
              <br />
              <span className="text-gradient">next to the bus stop</span>
            </>
          }
          lead="Look for the yellow, red and blue sign. Open seven days, including Sundays and after most other shops on the strip have shut."
          align="center"
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          {/* Storefront + map */}
          <div className="space-y-4">
            <Reveal>
              <div className="surface group relative overflow-hidden rounded-4xl">
                <div className="relative aspect-[4/3] sm:aspect-[16/10]">
                  <SmartImage
                    src="/images/storefront.webp"
                    alt={`The ${business.name} shopfront on Military Road, Neutral Bay`}
                    label="Shopfront"
                    accent="from-signal-500/35 to-amber-brand/15"
                    className="h-full w-full object-cover object-[center_28%] transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-signal-300">
                        Shop 20
                      </p>
                      <p className="mt-1.5 font-display text-xl font-bold leading-tight sm:text-2xl">
                        166-174 Military Rd
                        <br />
                        <span className="text-white/60">
                          {business.suburb} {business.state} {business.postcode}
                        </span>
                      </p>
                    </div>
                    <a
                      href={business.mapsUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group/btn inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink-950 transition-transform duration-300 hover:scale-105 active:scale-95"
                    >
                      <PinIcon className="h-4 w-4" />
                      Directions
                      <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="surface overflow-hidden rounded-4xl">
                <iframe
                  title={`Map showing ${business.name} in Neutral Bay`}
                  src={business.mapsEmbedUrl}
                  className="h-[16rem] w-full border-0 opacity-90 grayscale-[0.35] transition-all duration-700 hover:opacity-100 hover:grayscale-0 sm:h-[20rem]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>

          {/* Hours + contact */}
          <div className="space-y-4">
            <Reveal delay={0.06}>
              <div className="surface rounded-4xl p-7 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/6 text-signal-300">
                    <ClockIcon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-bold tracking-tight">Opening hours</h3>
                </div>

                <dl className="mt-6 space-y-0.5">
                  {hours.map((entry, i) => {
                    const isToday = todayIndex === i;
                    return (
                      <div
                        key={entry.day}
                        className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                          isToday ? "bg-signal-500/12 ring-1 ring-inset ring-signal-400/25" : ""
                        }`}
                      >
                        <dt
                          className={`font-medium ${isToday ? "text-white" : "text-white/55"}`}
                        >
                          {entry.day}
                          {isToday ? (
                            <span className="ml-2 rounded-full bg-signal-500/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-signal-200">
                              Today
                            </span>
                          ) : null}
                        </dt>
                        <dd
                          className={`tabular-nums ${
                            isToday ? "font-semibold text-white" : "text-white/50"
                          }`}
                        >
                          {formatHour(entry.open)} – {formatHour(entry.close)}
                        </dd>
                      </div>
                    );
                  })}
                </dl>

                <p className="mt-5 rounded-2xl bg-white/4 px-4 py-3 text-xs leading-relaxed text-white/45">
                  Running late from work? Call ahead — customers regularly mention Yusuf staying
                  open a little longer to get a phone finished.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="surface rounded-4xl p-7 sm:p-8">
                <h3 className="font-display text-xl font-bold tracking-tight">Get in touch</h3>
                <div className="mt-5 space-y-2.5">
                  <a
                    href={business.phoneHref}
                    className="group flex items-center gap-3.5 rounded-2xl bg-white px-5 py-4 font-display text-lg font-bold text-ink-950 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <PhoneIcon className="h-5 w-5" />
                    {business.phoneDisplay}
                    <ArrowIcon className="ml-auto h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href={business.smsHref}
                    className="flex items-center gap-3.5 rounded-2xl border border-white/12 bg-white/5 px-5 py-4 text-sm font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
                  >
                    Text a photo of the damage
                  </a>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-white/40">
                  Tell us your model and what happened and you&apos;ll get a price before you make
                  the trip.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
