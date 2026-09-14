"use client";

import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";

const words = [
  "Screens",
  "Batteries",
  "Back glass",
  "Charging ports",
  "Cameras",
  "Water damage",
  "iPads",
  "Screen protectors",
];

/**
 * The reference's full-bleed blue band with an image card sitting over it. The
 * band scrolls behind the card, which is what sells the depth.
 */
export function Band() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="relative">
        <div className="bg-brand py-7 sm:py-9">
          <Marquee direction="left" seconds={42} gap="gap-10">
            {words.map((word) => (
              <span key={word} className="flex shrink-0 items-center gap-10">
                <span className="whitespace-nowrap font-display text-[clamp(1.8rem,5vw,3.6rem)] font-extrabold uppercase tracking-[-0.02em] text-white">
                  {word}
                </span>
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/60" />
              </span>
            ))}
          </Marquee>
        </div>

        {/* Card that straddles the band */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Reveal direction="none">
            <div className="w-[15rem] rounded-3xl bg-white p-2 shadow-[0_20px_60px_-20px_rgba(22,23,31,0.45)] sm:w-[20rem] lg:w-[24rem]">
              <div className="aspect-[4/3] overflow-hidden rounded-[1.15rem]">
                <SmartImage
                  src="/images/store-interior.webp"
                  alt="The repair counter and accessory wall inside YR MART"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
