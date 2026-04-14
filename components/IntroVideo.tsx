"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroVideoProps {
  onVideoEnd: () => void;
}

export default function IntroVideo({ onVideoEnd }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<"enter" | "playing" | "done">("enter");

  // User clicks Enter → video starts with sound (browser allows it after interaction)
  const handleEnter = () => {
    setPhase("playing");
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    v.play().catch(() => {
      // If somehow still blocked, at least play muted
      v.muted = true;
      v.play();
    });
  };

  const handleEnded = () => {
    setPhase("done");
    setTimeout(onVideoEnd, 800);
  };

  const handleSkip = () => {
    if (videoRef.current) videoRef.current.pause();
    setPhase("done");
    setTimeout(onVideoEnd, 400);
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          {/* Pre-load video silently in background */}
          <video
            ref={videoRef}
            src="/intro_video.mp4"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              phase === "playing" ? "opacity-100" : "opacity-0"
            }`}
            onEnded={handleEnded}
            playsInline
            preload="auto"
            muted
          />

          {/* Skip button — only shown while video is playing */}
          {phase === "playing" && (
            <button
              id="skip-intro-btn"
              onClick={handleSkip}
              className="
                absolute top-5 right-5 z-20
                text-white/40 hover:text-white
                text-xs tracking-[0.3em] uppercase
                transition-colors duration-300
                flex items-center gap-2
              "
            >
              Skip
              <span className="text-[#ff2d2d] text-base leading-none">›</span>
            </button>
          )}

          {/* ENTER screen — shown until user clicks */}
          <AnimatePresence>
            {phase === "enter" && (
              <motion.div
                key="enter-screen"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex flex-col items-center justify-center gap-8 text-center px-6"
              >
                {/* Red top line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="w-16 h-px"
                  style={{ backgroundColor: "#ff2d2d" }}
                />

                <div className="flex flex-col items-center gap-3">
                  <p className="text-white/30 text-xs tracking-[0.5em] uppercase">
                    You are about to enter
                  </p>
                  <h1 className="text-white text-3xl md:text-5xl font-bold tracking-widest uppercase">
                    THE END<br />OF AN ERA
                  </h1>
                  <p className="text-white/20 text-xs tracking-[0.4em] uppercase mt-2">
                    Turn your volume up
                  </p>
                </div>

                <button
                  id="enter-era-btn"
                  onClick={handleEnter}
                  className="
                    mt-4 px-10 py-4 text-white uppercase font-bold tracking-[0.4em] text-sm
                    border border-[#ff2d2d]
                    hover:bg-[#ff2d2d]
                    hover:shadow-[0_0_40px_rgba(255,45,45,0.6)]
                    transition-all duration-300
                    relative group
                  "
                >
                  <span className="relative z-10">Enter The Era</span>
                </button>

                {/* Bottom line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="w-16 h-px"
                  style={{ backgroundColor: "#ff2d2d" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
