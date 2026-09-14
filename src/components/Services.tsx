"use client";

import { business, services, type Service } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { SmartImage } from "@/components/ui/SmartImage";
import { serviceIcons, PhoneIcon } from "@/components/ui/Icons";

/** The two hero tiles at the top of the section, as in the reference. */
const features = [
  {
    src: "/images/store-interior.webp",
    alt: "Inside YR MART: walls of cases and the repair counter",
    label: "Walk-in repairs",
    meta: "10 services",
  },
  {
    src: "/images/ipad-bundle.webp",
    alt: "iPad folio, tempered glass and stylus bundle",
    label: "iPads & tablets",
    meta: "1–2 days",
  },
];

export function Services() {
  return (
    <section id="repairs" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        {/* Intro card + feature tiles */}
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="card flex h-full flex-col justify-between gap-8 p-8 sm:p-10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  What we fix
                </span>
                <h2 className="mt-4 font-display text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-[1.06]">
                  Bring it in broken.
                  <br />
                  Leave with it working.
                </h2>
                <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink-muted">
                  Ten things the shop does day in, day out — most finished at the counter while
                  you wait, and all of them quoted before anything is opened up.
                </p>
              </div>
              <Pill
                href={business.phoneHref}
                tone="brand"
                className="self-start"
                icon={<PhoneIcon className="h-[1.1rem] w-[1.1rem]" />}
              >
                Ask {business.owner}
              </Pill>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal key={f.src} delay={0.06 + i * 0.06}>
                <figure className="card group h-full overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden sm:aspect-[5/6]">
                    <SmartImage
                      src={f.src}
                      alt={f.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between gap-3 px-5 py-4">
                    <span className="font-display text-base font-bold">{f.label}</span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      {f.meta}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Service cards */}
        <RevealGroup
          // 2 or 5 across only — a 3- or 4-column grid leaves the tenth card
          // stranded on a row of its own.
          className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
          stagger={0.05}
        >
          {services.map((service) => (
            <RevealItem key={service.slug}>
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon];

  return (
    <article className="card group flex h-full flex-col p-6 transition-transform duration-500 hover:-translate-y-1">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
        <Icon className="h-6 w-6" />
      </span>

      <h3 className="mt-5 font-display text-lg font-bold leading-snug tracking-tight">
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{service.blurb}</p>

      <div className="mt-5 flex items-center justify-between border-t border-ink/8 pt-4">
        <span className="text-xs font-medium text-ink-faint">Turnaround</span>
        <span className="font-display text-sm font-bold text-brand">{service.turnaround}</span>
      </div>
    </article>
  );
}
