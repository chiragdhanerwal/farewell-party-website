"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Script from "next/script";
import { PartyPopper, Loader2, CheckCircle, IndianRupee } from "lucide-react";
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

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const RAZORPAY_KEY_ID = "ps6M4BhTbOlpp1nKTIyzC5yj";

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
  const [paymentId, setPaymentId] = useState("");

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Validate required fields before proceeding to payment
  const validateForm = (): boolean => {
    if (!form.name.trim()) { setError("Please enter your name."); return false; }
    if (!form.gender) { setError("Please select your gender."); return false; }
    if (!form.branch.trim()) { setError("Please enter your branch."); return false; }
    if (!form.rollNo.trim()) { setError("Please enter your roll number."); return false; }
    if (!form.nsutEmail.trim()) { setError("Please enter your NSUT email."); return false; }
    if (!form.personalEmail.trim()) { setError("Please enter your personal email."); return false; }
    if (!form.phoneNumber.trim()) { setError("Please enter your phone number."); return false; }
    if (!form.placementStatus) { setError("Please select your placement status."); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      // Step 1: Create a Razorpay order on the server
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.nsutEmail,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.message || "Failed to create payment order.");
      }

      // Step 2: Open Razorpay checkout
      const options: RazorpayOptions = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "THE END OF AN ERA",
        description: "Farewell Party Entry — ₹2,000",
        order_id: orderData.orderId,
        handler: async (response: RazorpayResponse) => {
          // Step 3: Verify the payment on the server + save to Excel
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                formData: form,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.message || "Payment verification failed.");
            }

            setPaymentId(response.razorpay_payment_id);
            setSubmitted(true);
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Verification error.";
            setError(`Payment received but verification failed: ${msg}. Please contact us.`);
          } finally {
            setSubmitting(false);
          }
        },
        prefill: {
          name: form.name,
          email: form.nsutEmail,
          contact: form.phoneNumber,
        },
        theme: {
          color: "#ff2d2d",
        },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
            setError("Payment was cancelled. Please try again.");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
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
            Payment successful! Your entry has been registered. Get ready for the night of a lifetime.
          </p>
          {paymentId && (
            <p className="text-white/30 text-xs tracking-wider">
              Payment ID: <span className="text-white/50">{paymentId}</span>
            </p>
          )}
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
      {/* Razorpay checkout script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

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
            Fill in details &amp; pay ₹2,000 to secure your spot
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

          {/* Payment Amount Info */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div
              className="w-12 h-px"
              style={{ background: "linear-gradient(to right, transparent, #ff2d2d)" }}
            />
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase flex items-center gap-1">
              Entry Fee: <IndianRupee size={12} className="text-[#ff2d2d]" />
              <span className="text-white font-bold text-sm">2,000</span>
            </p>
            <div
              className="w-12 h-px"
              style={{ background: "linear-gradient(to left, transparent, #ff2d2d)" }}
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
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
                  Processing…
                </>
              ) : (
                <>
                  Pay ₹2,000 &amp; Join
                </>
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
