"use client";

import { business, services } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneIcon, PinIcon } from "@/components/ui/Icons";

const year = new Date().getFullYear();

const moreLinks = [
  { href: "#repairs", label: "Repairs" },
  { href: "#shop", label: "Cases & accessories" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#visit", label: "Opening hours" },
];

const areas = ["Neutral Bay", "Cremorne", "Mosman", "Cammeray", "North Sydney", "Kirribilli"];

export function Footer() {
  return (
    <footer className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="overflow-hidden rounded-[2rem] bg-ink text-white sm:rounded-[2.5rem]">
        <div className="mx-auto max-w-[86rem] px-6 py-14 sm:px-12 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr]">
            {/* Closing call to action */}
            <Reveal>
              <div>
                <h2 className="max-w-md font-display text-[clamp(2rem,4.6vw,3.2rem)] font-bold leading-[1.04] text-white">
                  Cracked screen? Don&apos;t wait a week.
                </h2>
                <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-white/55">
                  Walk in any day of the week, or call ahead and {business.owner} will tell you
                  exactly what it takes before you make the trip.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={business.phoneHref}
                    className="inline-flex items-center justify-center gap-2.5 rounded-full bg-brand px-7 py-4 font-display text-base font-bold text-white transition-colors hover:bg-brand-dark"
                  >
                    <PhoneIcon className="h-5 w-5" />
                    {business.phoneDisplay}
                  </a>
                  <a
                    href={business.mapsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white/85 transition-colors hover:border-white/45 hover:text-white"
                  >
                    <PinIcon className="h-4 w-4" />
                    Get directions
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Link columns */}
            <Reveal delay={0.08}>
              <div className="grid gap-10 sm:grid-cols-3">
                <nav aria-label="Repairs">
                  <h3 className="font-display text-base font-bold text-white">Repairs</h3>
                  <ul className="mt-4 space-y-1">
                    {services.slice(0, 6).map((service) => (
                      <li key={service.slug}>
                        <a
                          href="#repairs"
                          className="-mx-2 block rounded-lg px-2 py-1.5 text-sm text-white/50 transition-colors hover:text-white"
                        >
                          {service.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <nav aria-label="More">
                  <h3 className="font-display text-base font-bold text-white">More</h3>
                  <ul className="mt-4 space-y-1">
                    {moreLinks.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="-mx-2 block rounded-lg px-2 py-1.5 text-sm text-white/50 transition-colors hover:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div>
                  <h3 className="font-display text-base font-bold text-white">Areas served</h3>
                  <ul className="mt-4 space-y-1.5">
                    {areas.map((area) => (
                      <li key={area} className="text-sm text-white/50">
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-14 flex flex-col gap-6 border-t border-white/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <a href="#top" className="flex items-center gap-2" aria-label={`${business.name} home`}>
              <span className="font-display text-xl font-extrabold tracking-[-0.04em] text-white">
                YR MART
              </span>
              <span className="h-2 w-2 rounded-full bg-brand" />
            </a>

            <address className="text-xs not-italic text-white/45 sm:text-right">
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="transition-colors hover:text-white"
              >
                {business.fullAddress}
              </a>
              <span className="mt-1 block">
                © {year} {business.name}. All rights reserved.
              </span>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}
