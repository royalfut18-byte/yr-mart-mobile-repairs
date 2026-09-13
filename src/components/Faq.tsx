"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { faqs } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useStage } from "@/components/Stage";

export function Faq() {
  const { still } = useStage();
  // Single-open accordion; first question starts expanded.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Good to know"
              title={
                <>
                  Questions,
                  <br />
                  <span className="text-gradient">answered straight</span>
                </>
              }
              lead="The things people ask at the counter every week."
            />
          </div>

          <div>
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.04}>
                <FaqRow
                  question={faq.q}
                  answer={faq.a}
                  isOpen={open === i}
                  still={still}
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
  still,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  still: boolean;
  onToggle: () => void;
}) {
  const body = (
    <p className="pb-6 pr-12 text-sm leading-relaxed text-white/55 sm:text-base">{answer}</p>
  );
  return (
    <div className="border-b border-white/8">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span
            className={`font-display text-lg font-bold tracking-tight transition-colors duration-300 sm:text-xl ${
              isOpen ? "text-white" : "text-white/75 group-hover:text-white"
            }`}
          >
            {question}
          </span>

          <span
            className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
              isOpen
                ? "border-signal-400/50 bg-signal-500/15 text-signal-300"
                : "border-white/12 text-white/50 group-hover:border-white/30"
            }`}
          >
            <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
            <motion.span
              className="absolute h-[1.5px] w-3.5 rounded-full bg-current"
              animate={still ? undefined : { rotate: isOpen ? 0 : 90 }}
              style={still ? { rotate: isOpen ? 0 : 90 } : undefined}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </span>
        </button>
      </h3>

      {still ? (
        isOpen ? <div>{body}</div> : null
      ) : (
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
              {body}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
