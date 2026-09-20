"use client";

import { business } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Pill } from "@/components/ui/Pill";
import {
  BoltIcon,
  CableIcon,
  HeadphonesIcon,
  PhoneIcon,
  ShieldIcon,
  SparkIcon,
  StarIcon,
  WalletIcon,
} from "@/components/ui/Icons";

/** One flat list, whatever the item is. See `shopItems` in lib/shop.ts. */
export type ShopItem = {
  id: string;
  name: string;
  blurb: string;
  image: string;
  /** object-contain for product shots on white, cover for photographs. */
  contain: boolean;
};

const tradePoints = [
  "Refurbished iPhones and Android handsets in stock",
  "We buy your old phone, working or not",
  "Trade in against a repair or an upgrade",
  "Unlocked and tested before it leaves the counter",
];

/** The odds and ends that do not warrant a photo tile of their own. */
const shelf = [
  { icon: BoltIcon, label: "Chargers & power banks" },
  { icon: CableIcon, label: "Charging cables, every fitting" },
  { icon: ShieldIcon, label: "Tempered glass, fitted in store" },
  { icon: WalletIcon, label: "Telstra prepaid SIMs & recharge" },
  { icon: HeadphonesIcon, label: "Headphones & earbuds" },
  { icon: SparkIcon, label: "Car holders & ring lights" },
];

export function Shop({ items }: { items: ShopItem[] }) {
  return (
    <section id="shop" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        {/* The shop's own yellow, as on the sign. Everything inside switches to
            dark text: white on this yellow is unreadable, and the signage solves
            it the same way, with dark elements sitting on the yellow. */}
        <div className="rounded-[2rem] bg-sign p-6 sm:rounded-[2.5rem] sm:p-10 lg:p-14">
          <Reveal direction="right">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/80">
                  In the shop
                </span>
                <h2 className="mt-3 max-w-xl font-display text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-[1.06]">
                  Everything on the shelves
                </h2>
                <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-ink/75">
                  Cases, glass, chargers and cables for phones and tablets, plus Mac and laptop
                  chargers, hubs, mice and keyboards. Refurbished handsets too. If you cannot see
                  it, ask, because the shelves turn over quickly.
                </p>
              </div>
              <Pill href={business.mapsUrl} tone="light" external className="self-start">
                See it in person
              </Pill>
            </div>
          </Reveal>

          {/* Buying and selling is a trade line, not an accessory, so it gets its
              own block rather than a tile in the product grid. */}
          <Reveal delay={0.06}>
            <div className="mt-10 grid items-center gap-8 overflow-hidden rounded-[2rem] bg-brand p-8 text-white sm:rounded-[2.5rem] sm:p-12 md:grid-cols-[1.15fr_1fr]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                  Buy &amp; sell
                </span>
                <h3 className="mt-3 font-display text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold leading-[1.06]">
                  We buy and sell all kinds of phones
                </h3>
                <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-white/75">
                  Refurbished handsets on the shelf, checked and ready to go. Upgrading? Bring the
                  old one in and {business.owner} will make you an offer on the spot, or put it
                  toward a repair.
                </p>
                <div className="mt-7">
                  <Pill
                    href={business.phoneHref}
                    tone="light"
                    icon={<PhoneIcon className="h-[1.1rem] w-[1.1rem]" />}
                  >
                    Ask what yours is worth
                  </Pill>
                </div>
              </div>

              <ul className="space-y-2.5">
                {tradePoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-2xl bg-white/10 px-4 py-3.5"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/20">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true">
                        <path
                          d="m5 12.5 4.5 4.5L19 7.5"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-white/90">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* One grid, everything in it. Newly uploaded stock leads. */}
          <RevealGroup
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.04}
          >
            {items.map((item) => (
              <RevealItem key={item.id}>
                <ProductCard item={item} />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.06}>
            <div className="card mt-4 p-7 sm:p-8">
              <h3 className="font-display text-lg font-bold tracking-tight">
                Also on the shelves
              </h3>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {shelf.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3.5 rounded-2xl bg-paper py-3 pl-3 pr-4"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium text-ink-soft">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ item }: { item: ShopItem }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-1">
      <div className={`aspect-square overflow-hidden ${item.contain ? "bg-white p-5" : "bg-surface-warm"}`}>
        <SmartImage
          src={item.image}
          alt={item.name}
          className={`h-full w-full transition-transform duration-700 group-hover:scale-105 ${
            item.contain ? "object-contain" : "object-cover"
          }`}
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} className="h-3 w-3 text-amber-brand" />
          ))}
        </div>
        <h3 className="mt-2.5 font-display text-base font-bold tracking-tight">{item.name}</h3>
        {item.blurb ? (
          <p className="mt-1.5 flex-1 text-[0.8rem] leading-relaxed text-ink-muted">
            {item.blurb}
          </p>
        ) : (
          <div className="flex-1" />
        )}
        <p className="mt-4 border-t border-ink/8 pt-3 text-xs font-medium text-ink-faint">
          Ask in store for pricing
        </p>
      </div>
    </article>
  );
}
