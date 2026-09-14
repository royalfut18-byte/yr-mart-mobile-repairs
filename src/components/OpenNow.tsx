"use client";

import { useEffect, useState } from "react";
import { business } from "@/lib/data";
import { getCountdown, type Countdown } from "@/lib/hours";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { SmartImage } from "@/components/ui/SmartImage";

/**
 * The reference puts a sale countdown here. A repair shop has something more
 * useful to count down to, so this ticks toward opening or closing time in
 * Sydney, the one thing a walk-in customer actually needs to know.
 */
export function OpenNow() {
  const [clock, setClock] = useState<Countdown | null>(null);

  useEffect(() => {
    const tick = () => setClock(getCountdown());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <Reveal>
          <div className="card grid items-stretch gap-0 overflow-hidden md:grid-cols-[minmax(0,22rem)_1fr]">
            <div className="relative min-h-[15rem] overflow-hidden">
              <SmartImage
                src="/images/storefront.webp"
                alt={`The ${business.name} shopfront on Military Road`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center gap-7 p-8 sm:p-10">
              <div>
                <span
                  className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand"
                  suppressHydrationWarning
                >
                  <span className="relative flex h-2 w-2">
                    <span
                      className={`absolute inline-flex h-full w-full rounded-full animate-pulse-ring ${
                        clock?.isOpen ? "bg-emerald-500" : "bg-amber-brand"
                      }`}
                    />
                    <span
                      className={`relative inline-flex h-2 w-2 rounded-full ${
                        clock?.isOpen ? "bg-emerald-500" : "bg-amber-brand"
                      }`}
                    />
                  </span>
                  {clock ? (clock.isOpen ? "Open now" : "Closed right now") : "Opening hours"}
                </span>

                <h2 className="mt-4 font-display text-[clamp(1.7rem,3.6vw,2.5rem)] font-bold leading-[1.08]">
                  Walk in today, no booking needed
                </h2>
                <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-ink-muted">
                  Open seven days, including Sundays and after most other shops on the strip have
                  shut. Most screens and batteries are done in about twenty minutes.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
                  {clock?.label ?? "Next change"}
                </p>
                <div className="mt-3 flex items-center gap-2.5">
                  <TimeBox value={clock?.hours} unit="hours" />
                  <TimeBox value={clock?.minutes} unit="mins" />
                  <TimeBox value={clock?.seconds} unit="secs" />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Pill href={business.mapsUrl} tone="dark" external>
                  Get directions
                </Pill>
                <Pill href={business.phoneHref} tone="outline">
                  Call first
                </Pill>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TimeBox({ value, unit }: { value?: number; unit: string }) {
  return (
    <div
      className="flex h-[4.25rem] w-[4.25rem] flex-col items-center justify-center rounded-2xl bg-paper-deep sm:h-20 sm:w-20"
      suppressHydrationWarning
    >
      <span className="font-display text-2xl font-extrabold tabular-nums text-ink sm:text-[1.75rem]">
        {value === undefined ? "--" : String(value).padStart(2, "0")}
      </span>
      <span className="mt-0.5 text-[0.65rem] font-medium text-ink-muted">{unit}</span>
    </div>
  );
}
