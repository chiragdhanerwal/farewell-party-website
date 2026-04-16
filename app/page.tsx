"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import IntroVideo from "@/components/IntroVideo";
import NavBar from "@/components/NavBar";
import ParticipantCounter from "@/components/ParticipantCounter";
import { useMusicContext } from "@/components/MusicContext";

const PARTICIPANT_TOTAL = 200;

async function handleJoinParty() {
  console.log("JOIN THE PARTY clicked — Razorpay flow will go here");
  // TODO: const res = await fetch("/api/create-order", { method: "POST" });
}

export default function HomePage() {
  const { started, startMusic } = useMusicContext();
  const [participantCount, setParticipantCount] = useState<number>(12);

  useEffect(() => {
    fetch("/api/participant-count")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && typeof data.count === "number") {
          setParticipantCount(data.count);
        }
      })
      .catch((err) => console.error("Failed to fetch count:", err));
  }, []);
  // If music already started (user went through intro), skip straight to main content.
  // On a full page reload the layout remounts → started resets to false → intro shows again.
  const [introState, setIntroState] = useState<"show" | "done">(
    started ? "done" : "show"
  );

  return (
    <>
      {/* Only mount intro on a genuine first visit */}
      {introState === "show" && (
        <IntroVideo
          onVideoEnd={() => {
            setIntroState("done");
            startMusic();
          }}
        />
      )}

      <AnimatePresence>
        {introState === "done" && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeIn" }}
            className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden"
          >
            {/* Dark overlay so text/UI is readable over background image */}
            <div className="fixed inset-0 bg-black/60 pointer-events-none z-0" />

            {/* Mute button is now rendered globally in layout.tsx */}

            {/* ── HERO SECTION ── */}
            <section className="relative z-10 w-full flex flex-col items-center pt-2 md:pt-2 pb-0 px-4 gap-0">

              {/* THE END OF AN ERA — LOGO (BIG, on top) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="w-full max-w-5xl -mb-[4%] mt-0"
              >
                <Image
                  src="/logo.png?v=2"
                  alt="THE END OF AN ERA"
                  width={1933}
                  height={347}
                  className="w-full h-auto object-contain"
                  unoptimized
                  priority
                />
              </motion.div>

              {/* CENTER IMAGE — below the title */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="w-full max-w-3xl mt-0"
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
              className="relative z-[50] w-full"
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
                bg-gradient-to-t from-black/90 to-transparent
                px-4 sm:px-6 pb-4 sm:pb-5 pt-3
              "
            >
              {/* ── Mobile layout (stacked) ── */}
              <div className="flex flex-col items-center gap-3 sm:hidden">
                {/* Join button */}
                <Link
                  id="join-party-btn-mobile"
                  href="/join"
                  className="
                    px-8 py-2.5 text-xs tracking-widest uppercase font-bold
                    border border-[#ff2d2d] text-white
                    hover:bg-[#ff2d2d] transition-all duration-300
                    hover:shadow-[0_0_20px_rgba(255,45,45,0.6)]
                  "
                >
                  JOIN THE PARTY
                </Link>

                {/* Disclaimer */}
                <p className="text-[10px] text-white/50 tracking-wider text-center leading-relaxed max-w-xs uppercase">
                  <span className="text-[#ff2d2d] font-bold">Disclaimer:</span>{" "}
                  This is <span className="text-[#ff2d2d] font-bold">not</span> about lame profits — the agenda is clear i.e.{" "}
                  <span className="text-white font-bold">CREATE HISTORY.</span>
                </p>

                {/* Dates + Counter row */}
                <div className="w-full flex items-end justify-between">
                  <div id="dates-display-mobile">
                    <Image
                      src="/newDates.png?v=2"
                      alt="Event Dates"
                      width={2268}
                      height={950}
                      className="w-44 h-auto object-contain opacity-90"
                      unoptimized
                    />
                  </div>
                  <div id="participant-counter-mobile">
                    <ParticipantCounter
                      current={participantCount}
                      total={PARTICIPANT_TOTAL}
                    />
                  </div>
                </div>
              </div>

              {/* ── Desktop / tablet layout (three columns) ── */}
              <div className="hidden sm:flex items-end justify-between gap-4">
                {/* Dates — left */}
                <div id="dates-display" className="flex-shrink-0">
                  <Image
                    src="/newDates.png?v=2"
                    alt="Event Dates"
                    width={2268}
                    height={950}
                    className="w-56 md:w-80 h-auto object-contain opacity-90"
                    unoptimized
                  />
                </div>

                {/* Center — Join button + Disclaimer */}
                <div className="flex flex-col flex-1 items-center justify-center px-4 mb-6 gap-4">
                  <Link
                    id="join-party-btn"
                    href="/join"
                    className="
                      px-8 py-3 text-xs md:text-sm tracking-widest uppercase font-bold
                      border border-[#ff2d2d] text-white
                      hover:bg-[#ff2d2d] transition-all duration-300
                      hover:shadow-[0_0_20px_rgba(255,45,45,0.6)]
                    "
                  >
                    JOIN THE PARTY
                  </Link>
                  <p className="text-sm md:text-lg text-white/60 tracking-wider text-center leading-relaxed max-w-xl uppercase">
                    <span className="text-[#ff2d2d] font-bold">Disclaimer:</span>{" "}
                    This is <span className="text-[#ff2d2d] font-bold">not</span> something done with the agenda of making some lame profits — the agenda is clear i.e.{" "}
                    <span className="text-white font-bold">CREATE HISTORY.</span>
                  </p>
                </div>

                {/* Counter — right */}
                <div id="participant-counter" className="flex-shrink-0">
                  <ParticipantCounter
                    current={participantCount}
                    total={PARTICIPANT_TOTAL}
                  />
                </div>
              </div>
            </motion.div>

            {/* Bottom spacer so content isn't hidden behind the HUD */}
            <div className="h-72 sm:h-56 relative z-10" />

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
