"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { business, faqs } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { PhoneIcon } from "@/components/ui/Icons";

export function Faq() {
  // Single-open accordion; first question starts expanded.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal direction="right">
            <div className="card flex h-full flex-col justify-between gap-8 p-8 sm:p-10 lg:sticky lg:top-28">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  Good to know
                </span>
                <h2 className="mt-3 font-display text-[clamp(1.9rem,4.2vw,2.8rem)] font-bold leading-[1.06]">
                  Questions, answered straight
                </h2>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-muted">
                  The things people ask at the counter every week.
                </p>
              </div>
              <Pill
                href={business.phoneHref}
                tone="brand"
                className="self-start"
                icon={<PhoneIcon className="h-[1.1rem] w-[1.1rem]" />}
              >
                Ask something else
              </Pill>
            </div>
          </Reveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.04}>
                <FaqRow
                  question={faq.q}
                  answer={faq.a}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqRow({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="card overflow-hidden">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-7"
        >
          <span
            className={`font-display text-base font-bold leading-snug tracking-tight transition-colors sm:text-lg ${
              isOpen ? "text-brand" : "text-ink group-hover:text-brand"
            }`}
          >
            {question}
          </span>

          <span
            className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
              isOpen ? "bg-brand text-white" : "bg-paper-deep text-ink"
            }`}
          >
            <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
            <motion.span
              className="absolute h-[1.5px] w-3.5 rounded-full bg-current"
              animate={{ rotate: isOpen ? 0 : 90 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 pr-12 text-sm leading-relaxed text-ink-muted sm:px-7">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
