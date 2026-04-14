"use client";

import { motion } from "framer-motion";

interface ParticipantCounterProps {
  current: number;
  total: number;
}

export default function ParticipantCounter({ current, total }: ParticipantCounterProps) {
  const remaining = total - current;
  const percentage = (current / total) * 100;

  return (
    <div className="flex flex-col gap-2 text-right">
      {/* Count */}
      <div className="flex items-baseline justify-end gap-2">
        <span
          className="text-4xl md:text-5xl font-bold tracking-widest tabular-nums"
          style={{ color: "#ff2d2d" }}
        >
          {current}
        </span>
        <span className="text-xl md:text-2xl text-white/50 tracking-widest font-bold">
          / {total}
        </span>
        <span className="hidden sm:inline text-sm md:text-base text-white/70 tracking-widest uppercase pl-1">
          PEOPLE IN
        </span>
      </div>
      <div className="sm:hidden text-sm text-white/70 tracking-widest uppercase text-right">
        PEOPLE IN
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-[260px] ml-auto h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: "#ff2d2d" }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
      </div>

      {/* Subtext */}
      <p className="text-sm tracking-widest uppercase text-white/40">
        Spots filling fast
      </p>
      <p className="text-sm tracking-widest font-bold" style={{ color: "#ff2d2d" }}>
        {remaining} spots left
      </p>
    </div>
  );
}
