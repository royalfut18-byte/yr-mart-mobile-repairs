"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { products, business, type Product } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon, BoltIcon, ShieldIcon, SparkIcon, WalletIcon } from "@/components/ui/Icons";

const extras = [
  { icon: BoltIcon, label: "Chargers, cables & power banks" },
  { icon: ShieldIcon, label: "Tempered glass, fitted free" },
  { icon: WalletIcon, label: "Telstra prepaid SIMs & recharge" },
  { icon: SparkIcon, label: "Headphones, holders & ring lights" },
];

export function Shop() {
  return (
    <section id="shop" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="In the shop"
            title={
              <>
                Walls of cases,
                <br />
                <span className="text-gradient">glass and gear</span>
              </>
            }
            lead="Every phone that leaves gets offered the thing that stops it coming back. Hundreds of cases in stock, and screen protectors fitted at the counter."
          />

          <Reveal delay={0.1}>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
            >
              See it in person
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        {/* Mobile: snap carousel. Desktop: grid. */}
        <RevealGroup className="mt-14 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {products.map((product) => (
            <RevealItem key={product.name}>
              <ProductCard product={product} />
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:hidden">
          {products.map((product) => (
            <div key={product.name} className="w-[72vw] shrink-0 snap-center">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
            {extras.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="group flex items-center gap-3.5 bg-ink-900 px-5 py-5 transition-colors duration-500 hover:bg-ink-800"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/6 text-amber-brand transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-white/70">{label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 9, y: px * 9 });
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      style={{ transformStyle: "preserve-3d", perspective: 900 }}
      className="surface group relative h-full overflow-hidden rounded-3xl"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <SmartImage
          src={product.image}
          alt={product.name}
          label={product.category}
          accent={product.accent}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
        <span className="absolute left-3.5 top-3.5 rounded-full border border-white/15 bg-ink-950/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75 backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="relative p-5">
        <h3 className="font-display text-base font-bold tracking-tight">{product.name}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white/50">{product.blurb}</p>
      </div>
    </motion.div>
  );
}
