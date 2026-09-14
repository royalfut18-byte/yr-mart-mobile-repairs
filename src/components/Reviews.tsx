"use client";

import { business, reviews, type Review } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { Counter } from "@/components/ui/Counter";
import { Pill } from "@/components/ui/Pill";
import { GoogleIcon, StarIcon } from "@/components/ui/Icons";

// Three lanes running in alternating directions. Speeds are deliberately
// uneven so the rows never line up and march in lockstep.
const lanes = [
  { items: reviews.slice(0, 6), direction: "right" as const, seconds: 58 },
  { items: reviews.slice(6, 11), direction: "left" as const, seconds: 74 },
  { items: reviews.slice(11), direction: "right" as const, seconds: 66 },
];

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24 overflow-hidden py-16 sm:py-20">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              What locals say
            </span>
            <h2 className="max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3rem)] font-bold leading-[1.06]">
              {business.reviewCount} reviews. Same story every time.
            </h2>

            <div className="card inline-flex items-center gap-4 px-6 py-4">
              <GoogleIcon className="h-8 w-8 shrink-0" />
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl font-extrabold leading-none">
                    <Counter value={business.rating} decimals={1} />
                  </span>
                  <span className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-3.5 w-3.5 ${i < 4 ? "text-amber-brand" : "text-amber-brand/40"}`}
                      />
                    ))}
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink-muted">
                  <Counter value={business.reviewCount} /> Google reviews
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="edge-fade mt-12 space-y-4">
        {lanes.map((lane, i) => (
          <Marquee key={i} direction={lane.direction} seconds={lane.seconds}>
            {lane.items.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </Marquee>
        ))}
      </div>

      <div className="mt-12 flex justify-center px-5">
        <Reveal>
          <Pill
            href={business.mapsUrl}
            tone="light"
            external
            icon={<GoogleIcon className="h-4 w-4" />}
          >
            Read every review on Google
          </Pill>
        </Reveal>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="card flex w-[80vw] shrink-0 flex-col p-6 sm:w-[23rem]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-0.5">
          {Array.from({ length: review.rating }).map((_, i) => (
            <StarIcon key={i} className="h-3.5 w-3.5 text-amber-brand" />
          ))}
        </div>
        <GoogleIcon className="h-4 w-4" />
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
        &ldquo;{review.text}&rdquo;
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-ink/8 pt-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-soft font-display text-sm font-bold text-brand">
          {review.name.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-ink">{review.name}</span>
          <span className="block truncate text-[11px] text-ink-faint">
            {review.meta} · {review.when}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
