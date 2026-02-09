"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FormEvent, useState } from "react";

const EASE = [0.25, 0.4, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: EASE as unknown as [number, number, number, number] },
  }),
};

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"fan" | "creator">("fan");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    // Simulate API call — replace with real endpoint
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setSubmitted(true);
    setLoading(false);
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      {/* Background effects */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Back link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="absolute top-6 left-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back to home
        </Link>
      </motion.div>

      {!submitted ? (
        <motion.div
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-md"
        >
          {/* Logo */}
          <motion.div variants={fadeUp} custom={0} className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <span className="text-xl font-bold tracking-tight">
                Meet Your <span className="gradient-text">Fan</span>
              </span>
            </Link>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
              Get <span className="gradient-text">Early Access</span>
            </h1>
            <p className="text-white/40 leading-relaxed">
              Join the waitlist and be among the first to experience Meet Your
              Fan when we launch.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={fadeUp}
            custom={1}
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-8 space-y-6"
          >
            {/* Role toggle */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-3">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("fan")}
                  className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                    role === "fan"
                      ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-purple-500/40 text-white"
                      : "border border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                  }`}
                >
                  <span className="text-lg block mb-1">
                    {role === "fan" ? "🙋" : "🙋"}
                  </span>
                  Fan
                </button>
                <button
                  type="button"
                  onClick={() => setRole("creator")}
                  className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                    role === "creator"
                      ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-purple-500/40 text-white"
                      : "border border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                  }`}
                >
                  <span className="text-lg block mb-1">
                    {role === "creator" ? "⭐" : "⭐"}
                  </span>
                  Creator / Influencer
                </button>
              </div>
            </div>

            {/* Email input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/60 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="glow-button w-full py-3.5 rounded-xl text-white font-bold text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Joining...
                </span>
              ) : (
                "Join the Waitlist"
              )}
            </button>

            <p className="text-xs text-white/25 text-center">
              We&apos;ll only email you about launch updates. No spam, ever.
            </p>
          </motion.form>
        </motion.div>
      ) : (
        /* ─── Success state ─── */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative z-10 text-center max-w-md"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 mb-6">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-10 h-10 text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            You&apos;re <span className="gradient-text">In!</span>
          </h1>
          <p className="text-white/50 leading-relaxed mb-8">
            Welcome aboard! We&apos;ll send early access details to{" "}
            <strong className="text-white/80">{email}</strong> as soon as
            we&apos;re ready to launch.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/60 font-semibold hover:bg-white/5 hover:text-white transition-all"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Back to Home
          </Link>
        </motion.div>
      )}
    </main>
  );
}
