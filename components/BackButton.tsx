"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-5 left-5 z-50"
    >
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-white/40 hover:text-[#ff2d2d] transition-colors duration-300 text-xs tracking-[0.3em] uppercase"
      >
        <ArrowLeft size={14} />
        Back
      </button>
    </motion.div>
  );
}
