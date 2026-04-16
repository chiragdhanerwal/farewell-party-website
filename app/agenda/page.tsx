"use client";

import { motion, type Variants } from "framer-motion";
import BackButton from "@/components/BackButton";

type SectionType = {
  number: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  footer?: string;
};

const sections: SectionType[] = [
  {
    number: "1",
    title: "THE INTENT",
    paragraphs: [
      "This is not just a farewell. We aim to throw the most INCREDIBLE farewell any engineering batch has ever seen in the history.",
    ],
  },
  {
    number: "2",
    title: "THE PLAN",
    paragraphs: [
      "One night. Where there is nothing holding you back from sunset to sunrise. The last and the most epic point blank.",
    ],
  },
  {
    number: "3",
    title: "THE EXPERIENCE",
    paragraphs: [
      "Forget the basics you already know there's music, pool, drinks, food n all of that. But what you don't know is that's it's going to be the most memorable party of your bachlor life before u become a permanent corporate slave.",
    ],
  },
  {
    number: "4",
    title: "THE SELECTION",
    paragraphs: [
      "This is not open for everyone. This belongs to the Batch of 2026 who brings the energy and isn't just another batch of anus-fuckin'-UT.",
    ],
  },
  {
    number: "5",
    title: "THE NUMBERS",
    paragraphs: [
      "It's the difference between average and unforgettable. When the right number of people show up with the right intent, at the right place.",
    ],
  },
  {
    number: "6",
    title: "THE PRICE",
    paragraphs: [
      "The entry is simple, you don't pay to attend but to be part of something that refuses to be mediocre. This isn't about affordability, it's about whether you value the experience enough to step in without hesitation.",
    ],
  },
  {
    number: "7",
    title: "THE OUTCOME",
    paragraphs: [
      "If this happens the way it's meant to, it won't just be remembered it will be referenced. Not copied, not repeated, but pointed at as the moment where the standard changed.",
    ],
  },
  {
    number: "8",
    title: "THE DECISION",
    paragraphs: [
      "Right now, it's just an idea. In a few days, it either becomes something real or it disappears like every other plan that never had the people to carry it. There's no middle ground here.",
    ],
    footer: "EITHER BIGGEST OR NOTHING AT ALL.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export default function AgendaPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/75 pointer-events-none z-0" />

      {/* Back link */}
      <BackButton />

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 pt-24 pb-20">
        {/* ── Title ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-px mx-auto mb-8"
            style={{ backgroundColor: "#ff2d2d" }}
          />
          <p className="text-white/30 text-xs tracking-[0.5em] uppercase mb-4">
            The Document
          </p>
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.15em] leading-tight">
            <span className="text-[#ff2d2d]">Agenda:</span> The End
            <br />
            of an Era
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-20 h-px mx-auto mt-8"
            style={{ backgroundColor: "#ff2d2d" }}
          />
        </motion.div>

        {/* ── Intro paragraphs removed as per request ── */}
        <div className="mb-16" />

        {/* ── Numbered sections ── */}
        {sections.map((section, idx) => (
          <motion.section
            key={section.number}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mb-16"
          >
            {/* Divider */}
            <motion.div
              custom={0}
              variants={fadeUp}
              className="w-full h-px mb-10"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,45,45,0.4), transparent)",
              }}
            />

            {/* Section heading */}
            <motion.div custom={1} variants={fadeUp} className="flex items-baseline gap-4 mb-6">
              <span
                className="text-4xl md:text-5xl font-bold tabular-nums"
                style={{ color: "#ff2d2d" }}
              >
                {section.number}.
              </span>
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em]">
                {section.title}
              </h2>
            </motion.div>

            {/* Paragraphs */}
            {section.paragraphs.map((para, pIdx) => (
              <motion.p
                key={pIdx}
                custom={pIdx + 2}
                variants={fadeUp}
                className="text-white/50 text-base md:text-lg leading-relaxed tracking-wide mb-4 whitespace-pre-line"
              >
                {para}
              </motion.p>
            ))}

            {/* Bullets */}
            {section.bullets && (
              <motion.ul custom={section.paragraphs.length + 2} variants={fadeUp} className="space-y-2 my-5 pl-6">
                {section.bullets.map((bullet, bIdx) => (
                  <li
                    key={bIdx}
                    className="text-white/50 text-base md:text-lg tracking-wide flex items-start gap-3"
                  >
                    <span className="text-[#ff2d2d] mt-1.5 text-xs">▸</span>
                    {bullet}
                  </li>
                ))}
              </motion.ul>
            )}

            {/* Footer */}
            {section.footer && (
              <motion.p
                custom={section.paragraphs.length + 3}
                variants={fadeUp}
                className="text-white/60 text-base md:text-lg leading-relaxed tracking-wide mt-4 italic"
              >
                {section.footer}
              </motion.p>
            )}
          </motion.section>
        ))}

        {/* Bottom glow */}
        <div
          className="w-2/3 h-px mx-auto mt-8"
          style={{
            background:
              "linear-gradient(to right, transparent, #ff2d2d, transparent)",
          }}
        />
      </div>
    </div>
  );
}
