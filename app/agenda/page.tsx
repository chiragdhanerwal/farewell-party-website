"use client";

import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";

const sections = [
  {
    number: "1",
    title: "PURPOSE",
    paragraphs: [
      "To move beyond the idea of a conventional farewell and create an experience that captures the intensity, unpredictability, and spirit of the years gone by.",
      "This is not about hosting an event.\nIt is about creating a moment that people carry forward.",
    ],
  },
  {
    number: "2",
    title: "FORMAT",
    paragraphs: [
      "An overnight gathering designed to break away from structure and formality.",
      "From evening to sunrise, the timeline is intentionally fluid—allowing the night to unfold organically rather than follow a rigid sequence. The environment, set in a farmhouse setting, is chosen to encourage openness, energy, and participation.",
    ],
  },
  {
    number: "3",
    title: "EXPERIENCE DESIGN",
    paragraphs: [
      "The elements are familiar—music, a pool, food, drinks, activities.",
      "But the intention is not in listing features; it lies in how they come together.",
      "This agenda prioritizes:",
    ],
    bullets: [
      "High-energy engagement over passive attendance",
      "Shared experiences over individual presence",
      "Spontaneity over scripting",
    ],
    footer: "Because what defines a night like this is never what's planned, but what happens in between.",
  },
  {
    number: "4",
    title: "PARTICIPATION PRINCIPLE",
    paragraphs: [
      "This initiative operates on a simple condition:\nthe energy of the people defines the outcome.",
      "It is not designed for passive involvement.",
      "Those who choose to be part of it are expected to contribute not just financially, but emotionally—to engage, to participate, and to embrace the moment fully.",
    ],
  },
  {
    number: "5",
    title: "SCALE & FEASIBILITY",
    paragraphs: [
      "For the experience to retain its intended scale and impact, a critical mass is essential.",
      "A minimum participation threshold ensures:",
    ],
    bullets: [
      "Quality of execution",
      "Balance of cost and experience",
      "The atmosphere required to make the night what it is meant to be",
    ],
    footer: "Failing this, the plan does not dilute—it withdraws.",
  },
  {
    number: "6",
    title: "ECONOMIC STRUCTURE",
    paragraphs: [
      "The contribution model is straightforward.",
      "It is not profit-driven.\nIt is quality-driven.",
      "Every aspect—from venue to resources—is aligned with delivering a premium, uncompromised experience rather than a scaled-down alternative.",
    ],
  },
  {
    number: "7",
    title: "OUTCOME",
    paragraphs: [
      "The objective is not to host a successful event.",
      "The objective is to set a reference point.",
      "To create something that future batches look back on—not as a benchmark to match, but as a moment that redefined expectations.",
    ],
  },
  {
    number: "8",
    title: "CONCLUSION",
    paragraphs: [
      "This agenda is not about a party.",
      "It is about how a chapter ends.",
      "Whether it concludes quietly, like every other year…\nor stands out as something that people remember—not for what it was, but for how it felt.",
      "The decision, ultimately, is collective.",
      "Because moments like these don't happen by default.\nThey happen when people decide they should.",
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
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

        {/* ── Intro paragraphs ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="space-y-6 mb-16"
        >
          {[
            "There comes a point in every college journey where the noise fades—not because it's over, but because something bigger is about to take its place.",
            "The farewell.",
            "Traditionally, it's been treated as a formality. A scheduled event, a symbolic goodbye, a neatly packaged ending. But endings like these were never meant to be ordinary—especially not for a batch that has spent years redefining what \"normal\" even looks like.",
            <>This agenda begins with a simple premise:{" "}<br /><span className="text-white font-bold italic">if this is the end, it should feel like one.</span></>,
          ].map((text, i) => (
            <motion.p
              key={i}
              custom={i}
              variants={fadeUp}
              className="text-white/50 text-base md:text-lg leading-relaxed tracking-wide"
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

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
