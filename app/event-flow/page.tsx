"use client";

import { motion, type Variants } from "framer-motion";
import BackButton from "@/components/BackButton";

const phases = [
  {
    icon: "🌅",
    title: "PHASE 1: THE GRAND ENTRANCE",
    time: "6:00 PM – 9:00 PM",
    events: [
      {
        time: "06:00 PM",
        title: "The Red Carpet Arrival",
        desc: "Welcome drinks served.",
      },
      {
        time: "06:30 PM",
        title: "Signing the Manifesto",
        desc: "A massive canvas or \"Wall of Fame\" where everyone signs their final \"decree\" or legacy statement before entering.",
      },
      {
        time: "07:00 PM",
        title: "Venue Warming",
        desc: "Explore the space, settle in, and get the aesthetic photoshoots out of the way while everyone still looks sharp.",
      },
    ],
  },
  {
    icon: "🌊",
    title: "PHASE 2: THE LIQUID RHYTHM",
    time: "9:00 PM – 12:00 AM",
    events: [
      {
        time: "09:00 PM",
        title: "The Trinity Dance",
        desc: "Start with the Dry Dance, transition into the Rain Dance, and end with a Swimming Pool session.",
      },
      {
        time: "11:00 PM",
        title: "High-Octane Music",
        desc: "The peak of the DJ set to dry off and build energy for the midnight transition.",
      },
    ],
  },
  {
    icon: "🎂",
    title: "PHASE 3: THE MIDNIGHT MILESTONE",
    time: "12:00 AM – 2:00 AM",
    events: [
      {
        time: "12:00 AM",
        title: "The Era Ends (Cake Cutting)",
        desc: "A heavy, emotional celebration.",
      },
      {
        time: "12:30 AM",
        title: "Group Photoshoot",
        desc: "Everyone is together, the vibe is peak, and the \"Era\" is officially marked.",
      },
      {
        time: "01:00 AM",
        title: "The Feast (Dinner)",
        desc: "A heavy fuel-up for the long night ahead.",
      },
    ],
  },
  {
    icon: "🎤",
    title: "PHASE 4: THE CHAOTIC DEEP-DIVE",
    time: "2:00 AM – 5:00 AM",
    events: [
      {
        time: "02:00 AM",
        title: "Drunk Debates",
        desc: "Fascinating, high-stakes topics (e.g., \"Is AI the end of engineering or the start?\" or \"Who actually carried the group projects?\").",
      },
      {
        time: "03:30 AM",
        title: "2 Truths 1 Lie",
        desc: "The \"Unbelievable\" Edition. This is where the wildest college secrets come out.",
      },
      {
        time: "04:30 AM",
        title: "Secret Dare Assignment",
        desc: "Hand out envelopes with \"missions\" that must be completed before the sun comes up.",
      },
    ],
  },
  {
    icon: "🕯️",
    title: "PHASE 5: THE INNER CIRCLE",
    time: "5:00 AM – 8:00 AM",
    events: [
      {
        time: "05:00 AM",
        title: "Confess Before You Leave",
        desc: "The ultimate vulnerability session. Clearing the air, admitting crushes, or apologizing for 4-year-old pranks.",
      },
      {
        time: "06:30 AM",
        title: "Sunrise Reflection",
        desc: "Catch the first light of the \"new era\" together.",
      },
      {
        time: "07:00 AM",
        title: "Certificate Ceremony",
        desc: "Handing out the mock/fun certificates while the vibe is sentimental and quiet.",
      },
    ],
  },
  {
    icon: "🏁",
    title: "PHASE 6: THE FINAL FAREWELL",
    time: "8:00 AM – 10:00 AM",
    events: [
      {
        time: "08:00 AM",
        title: "Survivors' Breakfast",
        desc: "Final meal together.",
      },
      {
        time: "09:30 AM",
        title: "Closing Remarks",
        desc: "One final toast to the manifesto signed 16 hours ago.",
      },
      {
        time: "10:00 AM",
        title: "Exit",
        desc: "The Era officially closes.",
      },
    ],
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

export default function EventFlowPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/75 pointer-events-none z-0" />

      {/* Back link */}
      <BackButton />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-24 pb-20">
        {/* ── Title ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-px mx-auto mb-8"
            style={{ backgroundColor: "#ff2d2d" }}
          />
          <p className="text-white/30 text-xs tracking-[0.5em] uppercase mb-4">
            The Timeline
          </p>
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.15em] leading-tight">
            <span className="text-[#ff2d2d]">Event Flow:</span> The Night
            <br />
            Unfolds
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-20 h-px mx-auto mt-8"
            style={{ backgroundColor: "#ff2d2d" }}
          />
        </motion.div>

        {/* ── Intro paragraphs ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="space-y-6 mb-20 text-center"
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="text-white/60 text-base md:text-lg leading-relaxed tracking-wide max-w-2xl mx-auto"
          >
            A 16-hour journey from the grand arrival to the final farewell. The timeline is structured to build energy, peak at midnight, and slowly bring everyone together for a sentimental close.
          </motion.p>
        </motion.div>

        {/* ── Phases ── */}
        <div className="space-y-16">
          {phases.map((phase, pIdx) => (
            <motion.section
              key={pIdx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="relative"
            >
              {/* Divider for subsequent phases */}
              {pIdx > 0 && (
                <motion.div
                  custom={0}
                  variants={fadeUp}
                  className="w-full h-px mb-12"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(255,45,45,0.3), transparent)",
                  }}
                />
              )}

              {/* Phase Header */}
              <motion.div
                custom={1}
                variants={fadeUp}
                className="flex flex-col items-center md:items-start mb-8 text-center md:text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{phase.icon}</span>
                  <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.15em] text-[#ff2d2d]">
                    {phase.title}
                  </h2>
                </div>
                <p className="text-white/40 text-sm font-mono tracking-widest pl-[1px]">
                  {phase.time}
                </p>
              </motion.div>

              {/* Events Loop */}
              <div className="grid gap-6 pl-2 md:pl-6 border-l border-white/10 ml-6 md:ml-4">
                {phase.events.map((evt, eIdx) => (
                  <motion.div
                    key={eIdx}
                    custom={eIdx + 2}
                    variants={fadeUp}
                    className="relative pl-6 md:pl-8 py-2"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-[-5px] top-[14px] w-2.5 h-2.5 rounded-full bg-[#ff2d2d] shadow-[0_0_10px_rgba(255,45,45,0.8)]" />

                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors duration-300">
                      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                        <span className="text-[#ff2d2d] font-mono text-sm tracking-wider whitespace-nowrap">
                          {evt.time}
                        </span>
                        <h3 className="text-white/90 text-lg md:text-xl font-bold tracking-wide uppercase">
                          {evt.title}
                        </h3>
                      </div>
                      <p className="text-white/50 text-sm md:text-base leading-relaxed">
                        {evt.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Bottom glow */}
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
