"use client";

import { useEffect, useState } from "react";
import { business, hours } from "@/lib/data";
import { formatHour, getOpenState } from "@/lib/hours";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { ClockIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { photos } from "@/lib/images";

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
    <section id="visit" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Find us
            </span>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-[1.06]">
              On the Military Road strip, next to the bus stop
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <Reveal direction="right">
            <div className="card overflow-hidden">
              {/* The sign is the landmark people actually navigate by on a busy
                  shopping strip, so it sits above the map rather than in it. */}
              <div className="border-b border-ink/8 p-4 sm:p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
                  Look for this sign
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photos.logo.src}
                  alt={photos.logo.alt}
                  width={1080}
                  height={284}
                  loading="lazy"
                  className="w-full rounded-xl"
                />
              </div>
              <iframe
                title={`Map showing ${business.name} in Neutral Bay`}
                src={business.mapsEmbedUrl}
                className="h-[20rem] w-full border-0 sm:h-[28rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-7">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                    Shop 20
                  </p>
                  <p className="mt-1.5 font-display text-lg font-bold leading-snug sm:text-xl">
                    166-174 Military Rd
                    <span className="block font-sans text-sm font-normal text-ink-muted">
                      {business.suburb} {business.state} {business.postcode}
                    </span>
                  </p>
                </div>
                <Pill href={business.mapsUrl} tone="dark" external icon={<PinIcon className="h-4 w-4" />}>
                  Directions
                </Pill>
              </div>
            </div>
          </Reveal>

          <div className="space-y-4">
            <Reveal direction="left" delay={0.06}>
              <div className="card p-7 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand">
                    <ClockIcon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold tracking-tight">Opening hours</h3>
                </div>

                <dl className="mt-5">
                  {hours.map((entry, i) => {
                    const isToday = todayIndex === i;
                    return (
                      <div
                        key={entry.day}
                        className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm ${
                          isToday ? "bg-brand-soft" : ""
                        }`}
                        suppressHydrationWarning
                      >
                        <dt className={isToday ? "font-semibold text-ink" : "text-ink-muted"}>
                          {entry.day}
                          {isToday ? (
                            <span className="ml-2 rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                              Today
                            </span>
                          ) : null}
                        </dt>
                        <dd
                          className={`tabular-nums ${
                            isToday ? "font-semibold text-ink" : "text-ink-muted"
                          }`}
                        >
                          {formatHour(entry.open)} – {formatHour(entry.close)}
                        </dd>
                      </div>
                    );
                  })}
                </dl>

                <p className="mt-5 rounded-2xl bg-paper-deep px-4 py-3 text-xs leading-relaxed text-ink-muted">
                  Running late from work? Call ahead. Customers regularly mention {business.owner}{" "}
                  staying open a little longer to get a phone finished.
                </p>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.12}>
              <div className="card p-7 sm:p-8">
                <h3 className="font-display text-lg font-bold tracking-tight">Get in touch</h3>
                <div className="mt-5 space-y-3">
                  <a
                    href={business.phoneHref}
                    className="flex items-center gap-3.5 rounded-2xl bg-brand px-5 py-4 font-display text-lg font-bold text-white transition-colors hover:bg-brand-dark"
                  >
                    <PhoneIcon className="h-5 w-5" />
                    {business.phoneDisplay}
                  </a>
                  <a
                    href={business.smsHref}
                    className="flex items-center gap-3.5 rounded-2xl border border-ink/12 px-5 py-4 text-sm font-semibold text-ink transition-colors hover:bg-surface-warm"
                  >
                    Text a photo of the damage
                  </a>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-ink-faint">
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
