"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function StartersPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden">
      <div className="fixed inset-0 bg-black/75 pointer-events-none z-0" />

      <BackButton />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-20 h-px mb-8"
          style={{ backgroundColor: "#ff2d2d" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-8"
        >
          <UtensilsCrossed size={28} className="text-[#ff2d2d]" />
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.15em]">
            Starters
          </h1>
          <UtensilsCrossed size={28} className="text-[#ff2d2d] scale-x-[-1]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/50 text-base md:text-lg tracking-wider leading-relaxed mb-8"
        >
          We don&apos;t think it&apos;s cool to mention this stuff.
          <br />
          But trust us, <span className="text-white font-bold">we&apos;ve got everything covered.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-white/30 text-sm tracking-wider uppercase">Still curious?</p>
          <Link
            href="/#queries"
            className="text-[#ff2d2d] text-sm tracking-[0.3em] uppercase font-bold hover:text-white transition-colors duration-300"
          >
            Ask it as a query →
          </Link>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-20 h-px mt-10"
          style={{ backgroundColor: "#ff2d2d" }}
        />
      </div>
    </div>
  );
}
