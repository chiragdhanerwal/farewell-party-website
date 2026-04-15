"use client";

import { motion } from "framer-motion";
import { Wine } from "lucide-react";
import BackButton from "@/components/BackButton";

const categories = [
  {
    name: "WHISKY",
    items: [
      "Johnnie Walker Blue Label",
      "Jack Daniel's Old No.7",
      "The Macallan 12 Year",
      "Glenfiddich Select Cask",
    ],
  },
  {
    name: "GIN",
    items: ["Tanqueray", "Bombay Sapphire", "BullDog"],
  },
  {
    name: "VODKA",
    items: ["Grey Goose", "Absolute Vodka", "Cîroc"],
  },
  {
    name: "TEQUILA & CHAMPAGNE",
    items: ["Don Julio", "Vollereaux Cuvée"],
  },
  {
    name: "BEER",
    items: ["Budweiser", "Carlsberg"],
  },
  {
    name: "SOFT DRINKS",
    items: ["Coke Diet", "Thumbs Up", "Mountain Dew", "Sprite", "& Juices"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function DrinksPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/75 pointer-events-none z-0" />

      {/* Back link */}
      <BackButton />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-24 pb-20">
        {/* ── Header ── */}
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wine size={28} className="text-[#ff2d2d]" />
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.15em]">
              Drinks
            </h1>
            <Wine size={28} className="text-[#ff2d2d] scale-x-[-1]" />
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-20 h-px mx-auto mt-8"
            style={{ backgroundColor: "#ff2d2d" }}
          />
        </motion.div>

        {/* ── Drinks Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              custom={idx}
              variants={fadeUp}
              className="
                bg-white/[0.03] border border-white/10 backdrop-blur-sm
                p-6 flex flex-col
                hover:border-[#ff2d2d]/40 hover:bg-white/[0.05]
                transition-all duration-500
                group
              "
            >
              {/* Category name */}
              <h2 className="text-lg md:text-xl font-bold tracking-[0.2em] uppercase mb-5 flex items-center gap-3">
                <span
                  className="w-2 h-2 rounded-full inline-block flex-shrink-0 group-hover:shadow-[0_0_8px_rgba(255,45,45,0.8)] transition-shadow duration-500"
                  style={{ backgroundColor: "#ff2d2d" }}
                />
                {cat.name}
              </h2>

              {/* Items */}
              <ul className="space-y-3 flex-1">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="text-white/50 text-sm md:text-base tracking-wider pl-5 border-l border-white/10 group-hover:border-[#ff2d2d]/30 transition-colors duration-500"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom glow */}
        <div
          className="w-2/3 h-px mx-auto mt-16"
          style={{
            background:
              "linear-gradient(to right, transparent, #ff2d2d, transparent)",
          }}
        />
      </div>
    </div>
  );
}
