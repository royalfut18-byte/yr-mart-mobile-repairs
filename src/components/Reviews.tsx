"use client";

import { business, reviews, type Review } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { GoogleIcon, StarIcon } from "@/components/ui/Icons";

const rowOne = reviews.slice(0, 8);
const rowTwo = reviews.slice(8);

export function Reviews() {

  return (
    <section id="reviews" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            eyebrow="What locals say"
            title={
              <>
                {business.reviewCount} reviews.
                <br />
                <span className="text-gradient">Same story every time.</span>
              </>
            }
            lead="Fast, fair and honest — in the customers' own words, straight from the shop's Google listing."
          />

          <Reveal delay={0.1}>
            <div className="surface flex items-center gap-5 rounded-3xl p-6">
              <GoogleIcon className="h-9 w-9 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-3xl font-extrabold leading-none">
                    <Counter value={business.rating} decimals={1} />
                  </span>
                  <span className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-3.5 w-3.5 ${i < 4 ? "text-amber-brand" : "text-amber-brand/45"}`}
                      />
                    ))}
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/50">
                  <Counter value={business.reviewCount} /> Google reviews
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="edge-fade mt-14 space-y-4">
        <MarqueeRow items={rowOne} />
        <MarqueeRow items={rowTwo} reverse />
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-5 text-center sm:px-8">
        <Reveal>
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
          >
            <GoogleIcon className="h-4 w-4" />
            Read every review on Google
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function MarqueeRow({ items, reverse = false }: { items: Review[]; reverse?: boolean }) {
  // The list is rendered twice so the CSS translate can loop seamlessly.
  const track = [...items, ...items];

  return (
    <div className="group flex overflow-hidden">
      <div
        className={`flex shrink-0 gap-4 pr-4 pause-on-hover ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {track.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} hidden={i >= items.length} />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review, hidden }: { review: Review; hidden: boolean }) {
  return (
    <figure
      className="surface flex w-[82vw] shrink-0 flex-col rounded-3xl p-6 sm:w-[24rem]"
      aria-hidden={hidden || undefined}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-0.5">
          {Array.from({ length: review.rating }).map((_, i) => (
            <StarIcon key={i} className="h-3.5 w-3.5 text-amber-brand" />
          ))}
        </div>
        <GoogleIcon className="h-4 w-4 opacity-70" />
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/70">
        &ldquo;{review.text}&rdquo;
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-white/8 pt-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-signal-500/40 to-amber-brand/25 font-display text-sm font-bold text-white">
          {review.name.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-white">{review.name}</span>
          <span className="block truncate text-[11px] text-white/40">
            {review.meta} · {review.when}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
