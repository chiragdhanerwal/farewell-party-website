"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import BackButton from "@/components/BackButton";

const faqs = [
  {
    question: "Is this an official college event?",
    answer: "Hell no. This is organized by the students, for the legends. No faculty, no boring speeches, no restrictions. This is our territory.",
  },
  {
    question: "2k per head? Why so much?",
    answer: "You're still not getting the point. 2k won't make you poor but can definitely make you madly happy. We aren't serving local brands or cold snacks. You're paying for a grand private farmhouse, a pool, a massive DJ setup, unlimited premium pours, and a 16-hour experience. We aren't here to make a profit; we're here to make history. If you want cheap, we're sorry.",
  },
  {
    question: "What happens if we don't hit the 150-person mark?",
    answer: "The vibe check is real. If we don't get at least 150-200 people who are \"All In\" within 2-3 weeks, we scrap the whole thing and you get a 100% refund. We aren't settling for an \"average\" crowd.",
  },
  {
    question: "Can I bring a plus-one from another college/batch?",
    answer: "This era is ours, but we aren't gatekeeping a good time. Plus-ones are allowed as long as they pay the contribution and bring the same energy. If they're boring, don't bring 'em.",
  },
  {
    question: "What's the deal with the cars at the gate?",
    answer: "As soon as the BTP (Major Project) is over, we've arranged a fleet of cars at the main gate. Hop in, and we'll ferry you straight to the farmhouse. No one gets left behind, and no one has to worry about navigation.",
  },
  {
    question: "I don't drink/swim, should I still come?",
    answer: "Refer to the \"No Lazy Energy\" rule. You don't need a drink to have a vibe, but you do need to participate. Whether it's the drunk debates, the secret dares, or the dance floor—if you're planning to scroll on your phone in a corner, stay home.",
  },
  {
    question: "Is it actually safe? (Police raid joke aside)",
    answer: "The \"raid\" comment was a joke, but the security isn't. It's a private property with dedicated security. What happens inside the farmhouse stays inside the farmhouse. Your only job is to survive until 10:00 AM.",
  },
  {
    question: "What should I bring?",
    answer: "A change of clothes (for the pool/rain dance) & a towel but not very necessary.\nYour A-game.\nZero regrets.",
  },
  {
    question: "How do I lock my spot?",
    answer: "Go to Join The Party button on the homepage, fill the form get the payment done.\nJoin the WhatsApp group and you're officially in.",
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

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      custom={index + 2}
      variants={fadeUp}
      className={`border border-white/10 rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen ? "bg-white/10" : "bg-white/5 hover:bg-white/10"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-white/90 font-bold uppercase tracking-wide pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#ff2d2d] flex-shrink-0"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      
      <motion.div
        initial="collapsed"
        animate={isOpen ? "open" : "collapsed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          collapsed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="px-6 pb-5 pt-1 border-t border-white/5">
          <p className="text-white/60 text-sm md:text-base leading-relaxed whitespace-pre-line">
            {answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function QueriesPage() {
  const [query, setQuery] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
      setQuery("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 500);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      <div className="fixed inset-0 bg-black/75 pointer-events-none z-0" />

      <BackButton />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 pt-24 pb-20">
        {/* Title */}
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
            Intel & Details
          </p>
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.15em] leading-tight">
            <span className="text-[#ff2d2d]">Queries:</span> FAQ
            <br />& Answers
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-20 h-px mx-auto mt-8"
            style={{ backgroundColor: "#ff2d2d" }}
          />
        </motion.div>

        <motion.div initial="hidden" animate="visible" className="space-y-16">
          {/* FAQs List */}
          <motion.section custom={0} variants={fadeUp} className="w-full">
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-[0.15em] text-[#ff2d2d] mb-6 flex items-center gap-3">
              <span className="w-6 h-px bg-[#ff2d2d]" />
              The Handbook
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <FAQItem key={idx} index={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </motion.section>
          
          {/* Custom Query Box */}
          <motion.section custom={1} variants={fadeUp} className="w-full">
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-[0.15em] text-[#ff2d2d] mb-6 flex items-center gap-3">
              <span className="w-6 h-px bg-[#ff2d2d]" />
              Still Unsure?
            </h2>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff2d2d]/5 rounded-full blur-3xl" />
              
              <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                <div>
                  <label htmlFor="custom-query" className="block text-white/50 text-xs tracking-widest uppercase mb-3">
                    Submit a Custom Query
                  </label>
                  <textarea
                    id="custom-query"
                    rows={4}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask us anything..."
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff2d2d]/50 focus:ring-1 focus:ring-[#ff2d2d]/50 transition-all resize-none"
                    required
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {isSubmitted ? (
                      <span className="text-[#ff2d2d] font-mono">Query deployed successfully.</span>
                    ) : null}
                  </span>
                  
                  <button
                    type="submit"
                    disabled={isSubmitted || !query.trim()}
                    className="px-8 py-2.5 text-xs tracking-widest uppercase font-bold border border-[#ff2d2d] text-white hover:bg-[#ff2d2d] transition-all duration-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </motion.section>
        </motion.div>

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
