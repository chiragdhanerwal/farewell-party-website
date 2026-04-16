"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

interface MusicContextValue {
  muted: boolean;
  started: boolean;
  toggleMute: () => void;
  startMusic: () => void;
}

const MusicContext = createContext<MusicContextValue>({
  muted: false,
  started: false,
  toggleMute: () => {},
  startMusic: () => {},
});

export function useMusicContext() {
  return useContext(MusicContext);
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedRef = useRef(false);

  const doFadeIn = useCallback((audio: HTMLAudioElement) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    audio.volume = 0;

    const tryPlay = () => {
      const p = audio.play();
      if (p !== undefined) {
        p.catch(() => {
          const resume = () => {
            audio.play().catch(() => {});
            document.removeEventListener("click", resume);
            document.removeEventListener("keydown", resume);
          };
          document.addEventListener("click", resume, { once: true });
          document.addEventListener("keydown", resume, { once: true });
        });
      }
    };

    tryPlay();

    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume < 0.35) {
        audio.volume = Math.min(audio.volume + 0.02, 0.35);
      } else {
        clearInterval(fadeIntervalRef.current!);
      }
    }, 100);
  }, []);

  useEffect(() => {
    const savedMuted = localStorage.getItem("musicMuted") === "true";
    setTimeout(() => setMuted(savedMuted), 0);

    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0;
    audio.muted = savedMuted;
    audioRef.current = audio;

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [doFadeIn]);

  const startMusic = useCallback(() => {
    if (!audioRef.current || startedRef.current) return;
    startedRef.current = true;
    setStarted(true);
    doFadeIn(audioRef.current);
  }, [doFadeIn]);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      if (audioRef.current) audioRef.current.muted = next;
      localStorage.setItem("musicMuted", String(next));
      return next;
    });
  }, []);

  return (
    <MusicContext.Provider value={{ muted, started, toggleMute, startMusic }}>
      {children}
    </MusicContext.Provider>
  );
}
