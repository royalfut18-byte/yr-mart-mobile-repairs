"use client";

import { motion } from "motion/react";
import { business } from "@/lib/data";
import { photos } from "@/lib/images";
import { useStageReady } from "@/components/Stage";
import { Pill } from "@/components/ui/Pill";
import { SmartImage } from "@/components/ui/SmartImage";
import { PhoneIcon } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The damage shot on the front page.
 *
 * The panel runs the full width, but the photo inside it does not: the source
 * is 480x640, so stretching it across a 1376px band would turn it to mush.
 * Instead it sits as a device-sized object on a dark panel, tilted and shadowed
 * so it reads as a real iPad lying on the counter, with the message beside it.
 */
export function CrackedBand() {
  const ready = useStageReady();
  const state = ready ? "show" : "hidden";

  return (
    <div className="mx-auto mt-14 max-w-[86rem] px-5 sm:mt-16 sm:px-8">
      <motion.div
        data-enter
        className="relative overflow-hidden rounded-[2rem] bg-ink sm:rounded-[2.5rem]"
        initial={{ opacity: 0, y: 70 }}
        animate={state}
        variants={{ hidden: { opacity: 0, y: 70 }, show: { opacity: 1, y: 0 } }}
        transition={{
          delay: 0.5,
          duration: 1,
          ease,
          opacity: { delay: 0.5, duration: 0.35, ease: "easeOut" },
        }}
      >
        {/* Brand glow behind the device */}
        <div className="pointer-events-none absolute -left-[10%] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(43,96,226,0.55),transparent_62%)] blur-3xl" />
        <div className="pointer-events-none absolute -right-[8%] bottom-[-30%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,204,0,0.22),transparent_62%)] blur-3xl" />

        <div className="relative grid items-center gap-10 p-8 sm:p-12 md:grid-cols-[auto_1fr] md:gap-14 lg:p-16">
          <motion.div
            className="mx-auto w-[13rem] shrink-0 sm:w-[15rem] lg:w-[17rem]"
            initial={{ opacity: 0, rotate: -10, y: 40 }}
            animate={state}
            variants={{
              hidden: { opacity: 0, rotate: -10, y: 40 },
              show: { opacity: 1, rotate: -5, y: 0 },
            }}
            transition={{ delay: 0.75, duration: 1.1, ease }}
          >
            {/* aspect-[3/4] matches the source (480x640) and reserves the space,
                so the panel does not collapse and jump when the photo lands. */}
            <div className="aspect-[3/4] overflow-hidden rounded-[1.4rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
              <SmartImage
                src={photos.crackedIpad.src}
                alt={photos.crackedIpad.alt}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          <div className="text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-brand">
              Screen repair
            </span>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] font-bold leading-[1.05] text-white">
              We see this every day.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[1rem] leading-relaxed text-white/60 md:mx-0">
              Phones and iPads come in looking like this and go out looking new. Most phone
              screens are done at the counter in about twenty minutes; iPads and tablets usually
              take a day or two, and you get the price before anything is opened up.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <Pill
                href={business.phoneHref}
                tone="brand"
                icon={<PhoneIcon className="h-[1.1rem] w-[1.1rem]" />}
              >
                Get a price
              </Pill>
              <Pill href="#repairs" tone="light">
                See what we fix
              </Pill>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
