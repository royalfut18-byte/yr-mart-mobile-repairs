"use client";

import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { brandMarks, type BrandMarkName } from "@/components/ui/BrandMarks";

type Brand = { name: string; mark: BrandMarkName };

/** Handsets that come across the counter, split into two opposing lanes. */
const rowOne: Brand[] = [
  { name: "iPhone", mark: "apple" },
  { name: "Samsung Galaxy", mark: "samsung" },
  { name: "Google Pixel", mark: "google" },
  { name: "OPPO", mark: "oppo" },
  { name: "Xiaomi", mark: "xiaomi" },
  { name: "Motorola", mark: "motorola" },
];

const rowTwo: Brand[] = [
  { name: "Huawei", mark: "huawei" },
  { name: "iPad", mark: "apple" },
  { name: "OnePlus", mark: "oneplus" },
  { name: "Nokia", mark: "nokia" },
  { name: "vivo", mark: "vivo" },
  { name: "realme", mark: "realme" },
  { name: "Samsung Tab", mark: "samsung" },
];

export function Brands() {
  return (
    <section className="py-20 sm:py-24">
      <Reveal>
        <h2 className="px-5 text-center font-display text-[clamp(1.5rem,3.4vw,2.1rem)] font-bold">
          Repaired here every week
        </h2>
        <p className="mx-auto mt-3 max-w-lg px-5 text-center text-sm text-ink-muted">
          If it is not on the list, bring it in anyway. Odds are it has been on the bench before.
        </p>
      </Reveal>

      <div className="edge-fade mt-10 space-y-3">
        <Marquee direction="left" seconds={52}>
          {rowOne.map((brand) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </Marquee>
        <Marquee direction="right" seconds={64}>
          {rowTwo.map((brand) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function BrandCard({ brand }: { brand: Brand }) {
  const Mark = brandMarks[brand.mark];

  return (
    <div className="card flex h-[4.5rem] shrink-0 items-center gap-3.5 px-7 sm:h-20 sm:px-9">
      <Mark />
      <span className="whitespace-nowrap font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
        {brand.name}
      </span>
    </div>
  );
}
