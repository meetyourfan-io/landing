"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

/* ───────────────────────── Animation variants ───────────────────────── */

const EASE = [0.25, 0.4, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: EASE as unknown as [number, number, number, number] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.12, ease: EASE as unknown as [number, number, number, number] },
  }),
};

/* ───────────────────────────── Particles ─────────────────────────────── */

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            background: `rgba(${
              [
                "168,85,247",
                "236,72,153",
                "99,102,241",
                "34,211,238",
              ][Math.floor(Math.random() * 4)]
            },${Math.random() * 0.5 + 0.2})`,
            animation: `float ${Math.random() * 4 + 4}s ease-in-out ${
              Math.random() * 4
            }s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ──────────────────────── Floating orbs (hero) ──────────────────────── */

function HeroOrbs() {
  return (
    <>
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-blob" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] animate-blob animation-delay-4000" />
    </>
  );
}

/* ──────────────────────────── Navbar ──────────────────────────────── */

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-[#030014]/60 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
            M
          </div>
          <span className="text-lg font-bold tracking-tight">
            Meet Your <span className="gradient-text">Fan</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#for-creators" className="hover:text-white transition-colors">
            For Creators
          </a>
          <a href="#for-fans" className="hover:text-white transition-colors">
            For Fans
          </a>
        </div>
        <Link
          href="/waitlist"
          className="glow-button px-5 py-2 rounded-full text-white text-sm font-semibold"
        >
          Get Early Access
        </Link>
      </div>
    </motion.nav>
  );
}

/* ─────────────────────────── Hero section ────────────────────────────── */

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <HeroOrbs />
      <Particles />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 text-sm mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
          </span>
          Coming Soon — Join the Waitlist
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6"
        >
          Meet Your
          <br />
          <span className="gradient-text">Idols.</span>{" "}
          <span className="gradient-text-warm">Reward</span>
          <br />
          Your{" "}
          <span className="gradient-text">Fans.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          The platform where content creators launch meetup campaigns and fans
          get the chance to meet their idols — in real life or on video call.
          Giveaways, exclusive media, and paid Meet&nbsp;&&nbsp;Greets.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/waitlist"
            className="glow-button px-8 py-4 rounded-full text-white font-bold text-lg"
          >
            Get Early Access
          </Link>
          <a
            href="#how-it-works"
            className="px-8 py-4 rounded-full border border-white/10 text-white/70 font-semibold text-lg hover:bg-white/5 hover:border-white/20 transition-all"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          {[
            { value: "$10", label: "Starting bid" },
            { value: "3", label: "Campaign types" },
            { value: "US & CA", label: "Compliant" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-black gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-white/40" />
        </div>
      </motion.div>
    </section>
  );
}

/* ────────────────── Campaign type cards (How it works) ───────────────── */

const campaigns = [
  {
    title: "Giveaway",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
        />
      </svg>
    ),
    color: "from-pink-500 to-rose-500",
    glow: "pink",
    description:
      "Fans bid a small amount to enter (as low as $10). One lucky winner is drawn at random and gets an exclusive meetup with their idol.",
    features: [
      "Low entry cost — accessible to every fan",
      "Sweepstakes-law compliant (US & Canada)",
      "Creators monetize their entire fanbase",
    ],
  },
  {
    title: "Media Selling",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
        />
      </svg>
    ),
    color: "from-purple-500 to-violet-500",
    glow: "purple",
    description:
      "Sell exclusive photos, videos, or audio. Buyers can request a complimentary entry to a meetup draw — content + a chance to meet.",
    features: [
      "Sell exclusive content directly to fans",
      "Buyers get a complimentary meetup entry",
      "Dual revenue: sales + engagement",
    ],
  },
  {
    title: "Meet & Greet",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
        />
      </svg>
    ),
    color: "from-cyan-500 to-blue-500",
    glow: "cyan",
    description:
      "A premium paid meetup. The creator sets the price and the number of spots. Fans pay, show up, and meet their idol. Simple and direct.",
    features: [
      "Creator sets price & capacity",
      "In-person or video call",
      "No sweepstakes rules needed",
    ],
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 px-6">
      {/* Section header */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Three Ways to <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Creators launch campaigns. Fans participate. Real connections happen.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {campaigns.map((c, i) => (
            <motion.div
              key={c.title}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              className="glass-card rounded-2xl p-8 relative group"
            >
              {/* Glow dot */}
              <div
                className={`absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r ${c.color} opacity-60 group-hover:opacity-100 transition-opacity`}
              />

              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${c.color} bg-opacity-10 mb-6`}
              >
                <div className="text-white">{c.icon}</div>
              </div>

              <h3 className="text-2xl font-bold mb-3">{c.title}</h3>
              <p className="text-white/50 leading-relaxed mb-6">
                {c.description}
              </p>

              <ul className="space-y-3">
                {c.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-white/60"
                  >
                    <svg
                      className="w-4 h-4 mt-0.5 text-purple-400 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── How the flow works ──────────────────────── */

function FlowSection() {
  const steps = [
    {
      step: "01",
      title: "Creator launches a campaign",
      desc: "Choose a campaign type, set the rules, and share the link on Instagram, TikTok, YouTube — anywhere.",
    },
    {
      step: "02",
      title: "Fans participate",
      desc: "Buy giveaway entries, purchase exclusive media, or grab a Meet & Greet spot. It takes seconds.",
    },
    {
      step: "03",
      title: "The meetup happens",
      desc: "Winners are drawn (giveaway) or spots fill up (M&G). The platform schedules the meetup — in person or video call.",
    },
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Simple as{" "}
            <span className="gradient-text-warm">1 — 2 — 3</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/40 via-pink-500/40 to-transparent" />

          <div className="space-y-16 md:space-y-24">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={0}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  i % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 text-center md:text-left">
                  <span className="text-6xl font-black text-white/5">
                    {s.step}
                  </span>
                  <h3 className="text-2xl font-bold -mt-4 mb-3">{s.title}</h3>
                  <p className="text-white/50 leading-relaxed max-w-md">
                    {s.desc}
                  </p>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shrink-0 shadow-lg shadow-purple-500/25">
                  <span className="text-white font-bold text-sm">{s.step}</span>
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────── For Creators ─────────────────────────────── */

function ForCreators() {
  const benefits = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
      ),
      title: "Monetize Your Entire Fanbase",
      desc: "Not just the top 1%. With entry-based giveaways, every single fan can participate and contribute.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      ),
      title: "Fully Compliant",
      desc: "We handle US and Canadian sweepstakes law compliance so you can focus on your content and your fans.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
        </svg>
      ),
      title: "Share Anywhere",
      desc: "Get a shareable campaign link. Drop it on Instagram Stories, TikTok bio, YouTube descriptions — your fans are one tap away.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
        </svg>
      ),
      title: "Multiple Revenue Streams",
      desc: "Giveaway entries, media sales, paid meetups — diversify how you earn while deepening fan relationships.",
    },
  ];

  return (
    <section id="for-creators" className="relative py-32 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold text-purple-400 tracking-widest uppercase mb-4 block">
            For Creators & Influencers
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Turn <span className="gradient-text">Every Fan</span> Into Revenue
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Stop leaving money on the table. Even fans who can&apos;t afford premium
            meetups can now support you — and get rewarded for it.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              className="glass-card rounded-2xl p-8 flex gap-5"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 shrink-0">
                {b.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{b.title}</h3>
                <p className="text-white/50 leading-relaxed">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── For Fans ───────────────────────────────── */

function ForFans() {
  const perks = [
    {
      emoji: "🎟️",
      title: "Affordable Entries",
      desc: "Bid as little as $10 on a giveaway for a chance to meet your idol. No VIP price tags needed.",
    },
    {
      emoji: "🎬",
      title: "Exclusive Content",
      desc: "Buy exclusive photos, videos, and audio directly from your favorite creators.",
    },
    {
      emoji: "🤝",
      title: "Real Meetups",
      desc: "Meet in person or hop on a video call. Real, authentic interactions — not just a comment on a post.",
    },
    {
      emoji: "🏆",
      title: "Fair & Transparent",
      desc: "Giveaway draws are fully compliant with sweepstakes laws. Every entry is a real chance.",
    },
  ];

  return (
    <section id="for-fans" className="relative py-32 px-6">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold text-pink-400 tracking-widest uppercase mb-4 block">
            For Fans
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Your Chance to{" "}
            <span className="gradient-text-warm">Meet Them</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            No more watching from the sidelines. For the price of a coffee, you
            could win a face-to-face moment with the people you admire most.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((p, i) => (
            <motion.div
              key={p.title}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="text-4xl mb-4">{p.emoji}</div>
              <h3 className="text-lg font-bold mb-2">{p.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────── Social proof / trust ─────────────────────────── */

function TrustSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="glass-card rounded-3xl p-10 sm:p-16 text-center animated-border"
        >
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 mb-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="w-8 h-8 text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black mb-4">
              Built for <span className="gradient-text">Trust & Compliance</span>
            </h3>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto">
              Meet Your Fan handles all the legal complexity of sweepstakes and
              giveaways. Our platform is designed from the ground up to comply
              with <strong className="text-white/70">US and Canadian sweepstakes laws</strong>,
              so creators can run campaigns with confidence and fans can participate
              knowing everything is fair and legitimate.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── Final CTA section ───────────────────────────── */

function FinalCTA() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-indigo-600/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6">
          Ready to{" "}
          <span className="gradient-text">Bridge the Gap</span>?
        </h2>
        <p className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
          Whether you&apos;re a creator looking to monetize or a fan dreaming of
          meeting your idol — the waitlist is open. Be among the first.
        </p>
        <Link
          href="/waitlist"
          className="glow-button inline-block px-10 py-5 rounded-full text-white font-bold text-xl"
        >
          Join the Waitlist
        </Link>
      </motion.div>
    </section>
  );
}

/* ────────────────────────── Footer ───────────────────────────────────── */

function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
            M
          </div>
          <span className="text-sm font-semibold text-white/60">
            Meet Your Fan
          </span>
        </div>
        <p className="text-sm text-white/30">
          &copy; {new Date().getFullYear()} Meet Your Fan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════ PAGE ═══════════════════════════════════════ */

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FlowSection />
      <ForCreators />
      <ForFans />
      <TrustSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
