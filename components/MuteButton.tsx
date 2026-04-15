"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useMusicContext } from "./MusicContext";

export default function MuteButton() {
  const { muted, started, toggleMute } = useMusicContext();

  // Only show the button once music has been started (after intro)
  if (!started) return null;

  return (
    <button
      id="mute-toggle-btn"
      onClick={toggleMute}
      aria-label={muted ? "Unmute music" : "Mute music"}
      className="
        fixed top-5 right-5 z-50
        flex items-center justify-center
        text-white/40 hover:text-[#ff2d2d]
        transition-colors duration-300
      "
    >
      {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </button>
  );
}
