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
    <div className="flex flex-col items-center gap-3 text-center">
      {/* Count */}
      <div className="flex items-baseline justify-center gap-2">
        <span
          className="text-5xl md:text-7xl font-bold tracking-widest tabular-nums"
          style={{ color: "#ff2d2d" }}
        >
          {current}
        </span>
        <span className="text-2xl md:text-3xl text-white/50 tracking-widest font-bold">
          / {total}
        </span>
        <span className="hidden sm:inline text-base md:text-lg text-white/70 tracking-widest uppercase pl-1">
          PEOPLE IN
        </span>
      </div>
      <div className="sm:hidden text-base text-white/70 tracking-widest uppercase text-center">
        PEOPLE IN
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-[300px] mx-auto h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: "#ff2d2d" }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
      </div>
    </div>
  );
}
