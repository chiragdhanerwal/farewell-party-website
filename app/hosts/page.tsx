"use client";

import { motion, type Variants } from "framer-motion";
import BackButton from "@/components/BackButton";

const hosts = [
  {
    name: "Ohm Tyagi (aka. Jaanwar/RDX)",
    id: "2022UEI2807",
    role: "The Chaos Architect",
    bio: "As a person I don't believe in ordinary goodbyes, so I'm turning this farewell into something unforgettable. I mix creativity, chaos, and a bit of madness to make things happen. If it sounds crazy, it's probably my idea. I bet you guys gonna love it for life.",
  },
  {
    name: "Abhishek Gupta",
    id: "2022UEI2805",
    role: "The Executionist",
    bio: "Ideas are great, but flawless execution is everything. While the chaos is being dreamt up, I'm the one ensuring every detail is actually pulled off perfectly. I blend the pristine vibes with logistics so you don't have to worry about a thing. You just show up with energy; I'll make sure the night is seamless.",
  },
  {
    name: "Chirag Dhanerwal",
    id: "🤫",
    role: "The Mastermind",
    bio: "Behind every great era is a mastermind connecting the pieces from the shadows. I built the platform, set the stage, and orchestrated the quiet brilliance that makes this entire experience possible. I don't need a loud introduction—the event itself will do all the talking. I'm the silent killer of average parties.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export default function HostsPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      <div className="fixed inset-0 bg-black/75 pointer-events-none z-0" />

      <BackButton />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-px mx-auto mb-8"
            style={{ backgroundColor: "#ff2d2d" }}
          />
          <p className="text-white/30 text-xs tracking-[0.5em] uppercase mb-4">
            The Faces Behind The Era
          </p>
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.15em] leading-tight">
            <span className="text-[#ff2d2d]">Know:</span> Your
            <br />Hosts
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-20 h-px mx-auto mt-8"
            style={{ backgroundColor: "#ff2d2d" }}
          />
        </motion.div>

        <div className="space-y-12">
          {hosts.map((host, idx) => (
            <motion.div
              key={idx}
              custom={idx + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-10 relative overflow-hidden group hover:bg-white/10 transition-colors duration-500"
            >
              {/* Subtle background glow effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff2d2d]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                <div className="flex-shrink-0 flex flex-col items-start gap-1 w-full md:w-64">
                  <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.15em] text-white/90">
                    {host.name}
                  </h2>
                  <div className="flex items-center gap-3 w-full">
                    <span className="text-[#ff2d2d] font-mono tracking-widest text-sm">
                      {host.id}
                    </span>
                    <div className="h-px bg-white/20 flex-grow" />
                  </div>
                  <span className="text-white/40 text-xs tracking-[0.2em] uppercase mt-2 border border-white/20 px-3 py-1 rounded-full">
                    {host.role}
                  </span>
                </div>
                
                <div className="border-l-0 md:border-l border-white/10 pl-0 md:pl-10">
                  <p className="text-white/60 text-base md:text-lg leading-relaxed tracking-wide italic">
                    &quot;{host.bio}&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Glow */}
        <div
          className="w-2/3 h-px mx-auto mt-24"
          style={{
            background:
              "linear-gradient(to right, transparent, #ff2d2d, transparent)",
          }}
        />
      </div>
    </div>
  );
}
