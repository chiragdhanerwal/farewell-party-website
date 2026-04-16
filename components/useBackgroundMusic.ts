"use client";

import { useRef, useEffect, useCallback } from "react";

interface BackgroundMusicProps {
  play: boolean;
  muted: boolean;
}

export default function useBackgroundMusic({ play, muted }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio("/music.mp3");
      audio.loop = true;
      audio.volume = 0;
      audio.muted = muted;
      audioRef.current = audio;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = muted;
  }, [muted]);

  const fadeIn = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0;
    audioRef.current.play().catch(() => {});
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) return;
      if (audioRef.current.volume < 0.15) {
        audioRef.current.volume = Math.min(audioRef.current.volume + 0.01, 0.15);
      } else {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, 100);
  }, []);

  useEffect(() => {
    if (play) {
      fadeIn();
    } else {
      audioRef.current?.pause();
    }
  }, [play, fadeIn]);
}
