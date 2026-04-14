"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import IntroVideo from "@/components/IntroVideo";
import NavBar from "@/components/NavBar";
import ParticipantCounter from "@/components/ParticipantCounter";
import useBackgroundMusic from "@/components/useBackgroundMusic";

const PARTICIPANT_CURRENT = 137;
const PARTICIPANT_TOTAL = 200;

async function handleJoinParty() {
  console.log("JOIN THE PARTY clicked — Razorpay flow will go here");
  // TODO: const res = await fetch("/api/create-order", { method: "POST" });
}

export default function HomePage() {
  const [introFinished, setIntroFinished] = useState(false);
  const [muted, setMuted] = useState(false);

  useBackgroundMusic({ play: introFinished, muted });

  return (
    <>
      <IntroVideo onVideoEnd={() => setIntroFinished(true)} />

      <AnimatePresence>
        {introFinished && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeIn" }}
            className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden"
          >
            {/* Dark overlay so text/UI is readable over background image */}
            <div className="fixed inset-0 bg-black/60 pointer-events-none z-0" />

            {/* ── MUTE TOGGLE ── */}
            <motion.button
              id="mute-toggle-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Unmute music" : "Mute music"}
              className="
                fixed top-5 right-5 z-50
                flex items-center justify-center
                text-white/40 hover:text-[#ff2d2d]
                transition-colors duration-300
              "
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </motion.button>

            {/* ── HERO SECTION ── */}
            <section className="relative z-10 w-full flex flex-col items-center pt-0 pb-0 px-4 gap-0">

              {/* THE END OF AN ERA — LOGO (BIG, on top) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="w-full max-w-5xl -mb-[6%] -mt-8"
              >
                <Image
                  src="/logo.png"
                  alt="THE END OF AN ERA"
                  width={2000}
                  height={800}
                  className="w-full h-auto object-contain"
                  priority
                />
              </motion.div>

              {/* CENTER IMAGE — below the title */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="w-full max-w-3xl"
              >
                <Image
                  src="/main center photo.png?v=2"
                  alt="The End Of An Era — Venue"
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover"
                  unoptimized
                  priority
                />
              </motion.div>
            </section>

            {/* ── NAVIGATION ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="relative z-10 w-full"
            >
              <NavBar onJoin={handleJoinParty} />
            </motion.div>

            {/* ── BOTTOM HUD ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="
                fixed bottom-0 left-0 right-0 z-40
                flex flex-col sm:flex-row items-center sm:items-end justify-between
                px-6 pb-5 pt-3 gap-4
                bg-gradient-to-t from-black/90 to-transparent
              "
            >
              {/* Dates — bottom left */}
              <div id="dates-display" className="flex-shrink-0">
                <Image
                  src="/dates.png"
                  alt="Event Dates"
                  width={400}
                  height={120}
                  className="w-56 md:w-80 h-auto object-contain opacity-90"
                />
              </div>

              {/* Counter — bottom right */}
              <div id="participant-counter">
                <ParticipantCounter
                  current={PARTICIPANT_CURRENT}
                  total={PARTICIPANT_TOTAL}
                />
              </div>
            </motion.div>

            {/* Bottom spacer so content isn't hidden behind the HUD */}
            <div className="h-32 relative z-10" />

            {/* Subtle red glow line at bottom */}
            <div
              className="fixed bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px z-50"
              style={{ background: "linear-gradient(to right, transparent, #ff2d2d, transparent)" }}
            />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
