"use client";

import { products, business, type Product } from "@/lib/data";
import { accessories } from "@/lib/images";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Pill } from "@/components/ui/Pill";
import {
  BoltIcon,
  CableIcon,
  HeadphonesIcon,
  ShieldIcon,
  SparkIcon,
  StarIcon,
  WalletIcon,
} from "@/components/ui/Icons";

/** The odds and ends that do not warrant a photo tile of their own. */
const shelves = [
  {
    title: "Also on the shelves",
    items: [
      { icon: BoltIcon, label: "Chargers & power banks" },
      { icon: CableIcon, label: "Charging cables, every fitting" },
      { icon: ShieldIcon, label: "Tempered glass, fitted in store" },
      { icon: WalletIcon, label: "Telstra prepaid SIMs & recharge" },
      { icon: HeadphonesIcon, label: "Headphones & earbuds" },
      { icon: SparkIcon, label: "Car holders & ring lights" },
    ],
  },
];

export function Shop() {
  return (
    <section id="shop" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <Reveal direction="right">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                In the shop
              </span>
              <h2 className="mt-3 max-w-xl font-display text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-[1.06]">
                Walls of cases, glass and gear
              </h2>
              <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-ink-muted">
                Phone and tablet accessories out front, and a full computer shelf behind it:
                Mac and laptop chargers, USB hubs, mice, keyboards and cables for just about
                anything.
              </p>
            </div>
            <Pill href={business.mapsUrl} tone="light" external className="self-start">
              See it in person
            </Pill>
          </div>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {products.map((product) => (
            <RevealItem key={product.name}>
              <ProductCard product={product} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.06}>
          <div className="mt-16 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Computer &amp; laptop
              </span>
              <h3 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.1rem)] font-bold leading-tight">
                Not just phones
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
              The shelf behind the counter runs chargers, hubs and peripherals for Mac and
              Windows machines.
            </p>
          </div>
        </Reveal>

        <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {accessories.map((item) => (
            <RevealItem key={item.name}>
              <article className="card group flex h-full flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-1">
                <div className="aspect-square overflow-hidden bg-white p-5">
                  <SmartImage
                    src={item.src}
                    alt={item.name}
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col border-t border-ink/8 p-5">
                  <h4 className="font-display text-base font-bold tracking-tight">{item.name}</h4>
                  <p className="mt-1.5 flex-1 text-[0.8rem] leading-relaxed text-ink-muted">
                    {item.blurb}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-4 grid gap-4">
          {shelves.map((shelf, i) => (
            <Reveal key={shelf.title} direction={i === 0 ? "right" : "left"} delay={0.06}>
              <div className="card h-full p-7 sm:p-8">
                <h3 className="font-display text-lg font-bold tracking-tight">{shelf.title}</h3>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {shelf.items.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-3.5 rounded-2xl bg-paper py-3 pl-3 pr-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-medium text-ink-soft">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-surface-warm">
        <SmartImage
          src={product.image}
          fallbackSrc={product.fallback}
          alt={product.name}
          label={product.category}
          accent={product.accent}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} className="h-3 w-3 text-amber-brand" />
          ))}
        </div>
        <h3 className="mt-2.5 font-display text-base font-bold tracking-tight">{product.name}</h3>
        <p className="mt-1.5 flex-1 text-[0.8rem] leading-relaxed text-ink-muted">
          {product.blurb}
        </p>
        <p className="mt-4 border-t border-ink/8 pt-3 text-xs font-medium text-ink-faint">
          Ask in store for pricing
        </p>
      </div>
    </article>
  );
}
