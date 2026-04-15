"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PartyPopper, Loader2, CheckCircle } from "lucide-react";
import BackButton from "@/components/BackButton";

type FormData = {
  name: string;
  gender: string;
  branch: string;
  rollNo: string;
  nsutEmail: string;
  personalEmail: string;
  phoneNumber: string;
  placementStatus: string;
  relationshipStatus: string;
  expectations: string;
};

const FORMSPREE_URL = "https://formspree.io/f/mwvapywv"; // ← Replace with your Formspree form ID

export default function JoinThePartyForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    gender: "",
    branch: "",
    rollNo: "",
    nsutEmail: "",
    personalEmail: "",
    phoneNumber: "",
    placementStatus: "",
    relationshipStatus: "",
    expectations: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Name: form.name,
          Gender: form.gender,
          Branch: form.branch,
          "Roll No": form.rollNo,
          "NSUT Email": form.nsutEmail,
          "Personal Email": form.personalEmail,
          "Phone Number": form.phoneNumber,
          "Placement Status": form.placementStatus,
          "Relationship Status": form.relationshipStatus || "Not specified",
          "Expectations from the night": form.expectations || "Not specified",
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center px-4">
        <div className="fixed inset-0 bg-black/70 pointer-events-none z-0" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col items-center gap-6 text-center"
        >
          <CheckCircle size={64} className="text-[#ff2d2d]" />
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest">
            You&apos;re In!
          </h2>
          <p className="text-white/50 text-sm tracking-wider max-w-md">
            Your entry has been registered. Get ready for the night of a lifetime.
          </p>
          <div
            className="w-24 h-px mt-2"
            style={{ background: "linear-gradient(to right, transparent, #ff2d2d, transparent)" }}
          />
          <Link
            href="/"
            className="
              mt-4 px-8 py-3 text-xs tracking-[0.3em] uppercase font-bold
              border border-[#ff2d2d] text-white
              hover:bg-[#ff2d2d] transition-all duration-300
              hover:shadow-[0_0_30px_rgba(255,45,45,0.5)]
            "
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/70 pointer-events-none z-0" />

      {/* Back link */}
      <BackButton />

      {/* ── Form Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl mx-auto mt-20 mb-16 px-4"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-px mx-auto mb-6"
            style={{ backgroundColor: "#ff2d2d" }}
          />
          <div className="flex items-center justify-center gap-3 mb-3">
            <PartyPopper size={24} className="text-[#ff2d2d]" />
            <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-[0.2em]">
              Join The Party
            </h1>
            <PartyPopper size={24} className="text-[#ff2d2d] scale-x-[-1]" />
          </div>
          <p className="text-white/30 text-xs tracking-[0.4em] uppercase">
            Fill in the details below to secure your spot
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-16 h-px mx-auto mt-6"
            style={{ backgroundColor: "#ff2d2d" }}
          />
        </div>

        {/* Form body */}
        <form
          onSubmit={handleSubmit}
          className="
            bg-black/60 backdrop-blur-md border border-white/10
            p-6 md:p-10 space-y-6
          "
        >
          {/* Name */}
          <FormField label="Name" required>
            <input
              id="field-name"
              type="text"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Your full name"
              className={inputClass}
            />
          </FormField>

          {/* Gender */}
          <FormField label="Gender" required>
            <div className="flex gap-3 flex-wrap">
              {["He", "She", "Other"].map((g) => (
                <RadioPill
                  key={g}
                  name="gender"
                  value={g}
                  selected={form.gender === g}
                  onSelect={() => update("gender", g)}
                />
              ))}
            </div>
          </FormField>

          {/* Branch */}
          <FormField label="Branch" required>
            <input
              id="field-branch"
              type="text"
              required
              value={form.branch}
              onChange={(e) => update("branch", e.target.value)}
              placeholder="e.g. CSE, ECE, IT …"
              className={inputClass}
            />
          </FormField>

          {/* Roll No */}
          <FormField label="Roll No." required>
            <input
              id="field-roll"
              type="text"
              required
              value={form.rollNo}
              onChange={(e) => update("rollNo", e.target.value)}
              placeholder="Your roll number"
              className={inputClass}
            />
          </FormField>

          {/* NSUT Email */}
          <FormField label="NSUT Email ID" required>
            <input
              id="field-nsut-email"
              type="email"
              required
              value={form.nsutEmail}
              onChange={(e) => update("nsutEmail", e.target.value)}
              placeholder="you@nsut.ac.in"
              className={inputClass}
            />
          </FormField>

          {/* Personal Email */}
          <FormField label="Personal Email ID" required>
            <input
              id="field-personal-email"
              type="email"
              required
              value={form.personalEmail}
              onChange={(e) => update("personalEmail", e.target.value)}
              placeholder="you@gmail.com"
              className={inputClass}
            />
          </FormField>

          {/* Phone Number */}
          <FormField label="Phone Number" required>
            <input
              id="field-phone"
              type="tel"
              required
              value={form.phoneNumber}
              onChange={(e) => update("phoneNumber", e.target.value)}
              placeholder="Your phone number"
              className={inputClass}
            />
          </FormField>

          {/* Placement Status */}
          <FormField label="Placement Status" required>
            <div className="flex gap-3 flex-wrap">
              {["Placed", "Unplaced"].map((s) => (
                <RadioPill
                  key={s}
                  name="placement"
                  value={s}
                  selected={form.placementStatus === s}
                  onSelect={() => update("placementStatus", s)}
                />
              ))}
            </div>
          </FormField>

          {/* Relationship Status (optional) */}
          <FormField label="Relationship Status" optional>
            <div className="flex gap-3 flex-wrap">
              {[
                "Single (Bitchless)",
                "Single (Doggyless)",
                "Committed",
                "Complicated",
              ].map((r) => (
                <RadioPill
                  key={r}
                  name="relationship"
                  value={r}
                  selected={form.relationshipStatus === r}
                  onSelect={() =>
                    update(
                      "relationshipStatus",
                      form.relationshipStatus === r ? "" : r
                    )
                  }
                />
              ))}
            </div>
          </FormField>

          {/* Expectations (optional) */}
          <FormField label="Expectations from the Night" optional>
            <textarea
              id="field-expectations"
              value={form.expectations}
              onChange={(e) => update("expectations", e.target.value)}
              placeholder="What are you hoping for tonight?"
              rows={3}
              maxLength={300}
              className={`${inputClass} resize-none`}
            />
          </FormField>

          {/* Error */}
          {error && (
            <p className="text-[#ff2d2d] text-xs tracking-wider text-center">{error}</p>
          )}

          {/* Submit */}
          <div className="pt-4">
            <button
              id="submit-form-btn"
              type="submit"
              disabled={submitting}
              className="
                w-full py-4 text-sm tracking-[0.3em] uppercase font-bold
                border border-[#ff2d2d] text-white
                hover:bg-[#ff2d2d] transition-all duration-300
                hover:shadow-[0_0_40px_rgba(255,45,45,0.6)]
                disabled:opacity-40 disabled:cursor-not-allowed
                flex items-center justify-center gap-3
              "
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Submitting…
                </>
              ) : (
                "Submit & Join"
              )}
            </button>
          </div>
        </form>

        {/* Bottom glow line */}
        <div
          className="w-2/3 h-px mx-auto mt-8"
          style={{ background: "linear-gradient(to right, transparent, #ff2d2d, transparent)" }}
        />
      </motion.div>
    </div>
  );
}

/* ─── Reusable sub-components ─── */

const inputClass = `
  w-full bg-white/5 border border-white/10 text-white
  px-4 py-3 text-sm tracking-wider
  placeholder:text-white/20
  focus:outline-none focus:border-[#ff2d2d]/60 focus:bg-white/[0.07]
  transition-all duration-300
`;

function FormField({
  label,
  required,
  optional,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs tracking-[0.3em] uppercase text-white/50">
        {label}
        {required && <span className="text-[#ff2d2d] ml-1">*</span>}
        {optional && (
          <span className="text-white/20 ml-2 normal-case tracking-normal text-[10px]">
            (optional)
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function RadioPill({
  name,
  value,
  selected,
  onSelect,
}: {
  name: string;
  value: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      id={`${name}-${value.toLowerCase().replace(/[\s()]/g, "-")}`}
      onClick={onSelect}
      className={`
        px-4 py-2 text-xs tracking-widest uppercase border transition-all duration-300
        ${
          selected
            ? "border-[#ff2d2d] bg-[#ff2d2d]/20 text-white shadow-[0_0_15px_rgba(255,45,45,0.3)]"
            : "border-white/15 text-white/40 hover:border-white/40 hover:text-white/70"
        }
      `}
    >
      {value}
    </button>
  );
}
