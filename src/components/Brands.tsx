"use client";

import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Handsets that come across the counter. Rendered as wordmarks rather than
 * manufacturer logos — YR MART is an independent repairer, not an authorised
 * reseller, and borrowed brand marks would imply otherwise.
 */
const rowOne = ["iPhone", "Samsung Galaxy", "Google Pixel", "OPPO", "Xiaomi", "Motorola"];
const rowTwo = ["Huawei", "iPad", "OnePlus", "Nokia", "vivo", "realme", "Samsung Tab"];

export function Brands() {
  return (
    <section className="py-20 sm:py-24">
      <Reveal>
        <h2 className="px-5 text-center font-display text-[clamp(1.5rem,3.4vw,2.1rem)] font-bold">
          Repaired here every week
        </h2>
        <p className="mx-auto mt-3 max-w-lg px-5 text-center text-sm text-ink-muted">
          If it is not on the list, bring it in anyway — odds are it has been on the bench before.
        </p>
      </Reveal>

      <div className="edge-fade mt-10 space-y-3">
        <Marquee direction="left" seconds={52}>
          {rowOne.map((name) => (
            <BrandCard key={name} name={name} />
          ))}
        </Marquee>
        <Marquee direction="right" seconds={64}>
          {rowTwo.map((name) => (
            <BrandCard key={name} name={name} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function BrandCard({ name }: { name: string }) {
  return (
    <div className="card flex h-[4.5rem] shrink-0 items-center gap-3 px-7 sm:h-20 sm:px-9">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-soft">
        <span className="h-2.5 w-2.5 rounded-full bg-brand" />
      </span>
      <span className="whitespace-nowrap font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
        {name}
      </span>
    </div>
  );
}
