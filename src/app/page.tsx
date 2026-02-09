"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ════════════════════════════════════════════════════════════════════════
   Types
   ════════════════════════════════════════════════════════════════════════ */

interface Trail {
  x: number;
  y: number;
  alpha: number;
  radius: number;
}

interface AnimState {
  mouse: { x: number; y: number };
  smooth: { x: number; y: number };
  prev: { x: number; y: number };
  trails: Trail[];
  entered: boolean;
  crowd: HTMLImageElement | null;
  meetup: HTMLImageElement | null;
  maskCanvas: HTMLCanvasElement | null;
  revealCanvas: HTMLCanvasElement | null;
  raf: number;
}

/* ════════════════════════════════════════════════════════════════════════
   Helpers
   ════════════════════════════════════════════════════════════════════════ */

/** Draw image to fill the canvas (CSS `object-fit: cover` equivalent). */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
) {
  const ir = img.naturalWidth / img.naturalHeight;
  const cr = cw / ch;
  let dw: number, dh: number, dx: number, dy: number;
  if (cr > ir) {
    dw = cw;
    dh = cw / ir;
    dx = 0;
    dy = (ch - dh) / 2;
  } else {
    dh = ch;
    dw = ch * ir;
    dx = (cw - dw) / 2;
    dy = 0;
  }
  ctx.drawImage(img, dx, dy, dw, dh);
}

/** Draw a soft radial circle (white, used for masking). */
function softCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  alpha: number,
) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(255,255,255,${alpha})`);
  g.addColorStop(0.55, `rgba(255,255,255,${alpha * 0.5})`);
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

/* ════════════════════════════════════════════════════════════════════════
   Component
   ════════════════════════════════════════════════════════════════════════ */

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  const sRef = useRef<AnimState>({
    mouse: { x: -9999, y: -9999 },
    smooth: { x: -9999, y: -9999 },
    prev: { x: -9999, y: -9999 },
    trails: [],
    entered: false,
    crowd: null,
    meetup: null,
    maskCanvas: null,
    revealCanvas: null,
    raf: 0,
  });

  /* ─── Canvas setup & animation loop ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const s = sRef.current;

    // Offscreen canvases for compositing
    s.maskCanvas = document.createElement("canvas");
    s.revealCanvas = document.createElement("canvas");
    const maskCtx = s.maskCanvas.getContext("2d")!;
    const revealCtx = s.revealCanvas.getContext("2d")!;

    // ── Load images ──
    let count = 0;
    const onLoad = () => {
      count++;
      if (count === 2) setLoaded(true);
    };
    const crowd = new Image();
    crowd.src = "/crowd.png";
    crowd.onload = () => {
      s.crowd = crowd;
      onLoad();
    };
    const meetup = new Image();
    meetup.src = "/meetup.png";
    meetup.onload = () => {
      s.meetup = meetup;
      onLoad();
    };

    // ── Resize ──
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      s.maskCanvas!.width = w;
      s.maskCanvas!.height = h;
      s.revealCanvas!.width = w;
      s.revealCanvas!.height = h;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Input ──
    const onMouse = (e: MouseEvent) => {
      s.mouse.x = e.clientX;
      s.mouse.y = e.clientY;
      s.entered = true;
    };
    const onTouch = (e: TouchEvent) => {
      s.mouse.x = e.touches[0].clientX;
      s.mouse.y = e.touches[0].clientY;
      s.entered = true;
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });

    // ── Constants ──
    const LERP = 0.07;
    const RADIUS = 160;

    // ── Loop ──
    function loop() {
      const w = canvas!.width;
      const h = canvas!.height;

      // Smooth follow
      s.smooth.x += (s.mouse.x - s.smooth.x) * LERP;
      s.smooth.y += (s.mouse.y - s.smooth.y) * LERP;

      // Velocity
      const vx = s.smooth.x - s.prev.x;
      const vy = s.smooth.y - s.prev.y;
      const speed = Math.sqrt(vx * vx + vy * vy);

      // Spawn trail echoes when moving fast
      if (speed > 2.5 && s.entered) {
        s.trails.push({
          x: s.smooth.x,
          y: s.smooth.y,
          alpha: Math.min(speed / 25, 0.55),
          radius: RADIUS * (0.35 + Math.min(speed / 60, 0.35)),
        });
      }

      // Decay trails
      for (let i = s.trails.length - 1; i >= 0; i--) {
        s.trails[i].alpha *= 0.93;
        s.trails[i].radius *= 0.997;
        if (s.trails[i].alpha < 0.005) s.trails.splice(i, 1);
      }
      if (s.trails.length > 80) s.trails.splice(0, s.trails.length - 80);

      s.prev.x = s.smooth.x;
      s.prev.y = s.smooth.y;

      // ── RENDER ──
      ctx!.clearRect(0, 0, w, h);

      // 1 ─ Base layer: crowd image + dark scrim
      if (s.crowd) {
        drawCover(ctx!, s.crowd, w, h);
        ctx!.fillStyle = "rgba(3,0,20,0.35)";
        ctx!.fillRect(0, 0, w, h);
      } else {
        ctx!.fillStyle = "#030014";
        ctx!.fillRect(0, 0, w, h);
      }

      // 2 ─ Spotlight reveal layer
      if (s.meetup && s.entered) {
        // Build mask (white = reveal)
        maskCtx.clearRect(0, 0, w, h);
        for (const t of s.trails) {
          softCircle(maskCtx, t.x, t.y, t.radius, t.alpha);
        }
        softCircle(maskCtx, s.smooth.x, s.smooth.y, RADIUS, 1);

        // Composite: meetup masked by spotlight circles
        revealCtx.clearRect(0, 0, w, h);
        drawCover(revealCtx, s.meetup, w, h);
        revealCtx.globalCompositeOperation = "destination-in";
        revealCtx.drawImage(s.maskCanvas!, 0, 0);
        revealCtx.globalCompositeOperation = "source-over";

        // Paint onto main canvas
        ctx!.drawImage(s.revealCanvas!, 0, 0);

        // Spotlight ring
        ctx!.save();
        ctx!.strokeStyle = "rgba(255,255,255,0.1)";
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.arc(s.smooth.x, s.smooth.y, RADIUS, 0, Math.PI * 2);
        ctx!.stroke();

        // Outer glow ring
        const ring = ctx!.createRadialGradient(
          s.smooth.x,
          s.smooth.y,
          RADIUS - 4,
          s.smooth.x,
          s.smooth.y,
          RADIUS + 12,
        );
        ring.addColorStop(0, "rgba(168,85,247,0)");
        ring.addColorStop(0.5, "rgba(168,85,247,0.08)");
        ring.addColorStop(1, "rgba(168,85,247,0)");
        ctx!.fillStyle = ring;
        ctx!.beginPath();
        ctx!.arc(s.smooth.x, s.smooth.y, RADIUS + 12, 0, Math.PI * 2);
        ctx!.fill();

        // Center dot
        ctx!.fillStyle = "rgba(255,255,255,0.6)";
        ctx!.beginPath();
        ctx!.arc(s.smooth.x, s.smooth.y, 2.5, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }

      // 3 ─ Reactive grid
      const spacing = 70;
      const gx = s.entered
        ? ((s.smooth.x - w / 2) * 0.012) % spacing
        : 0;
      const gy = s.entered
        ? ((s.smooth.y - h / 2) * 0.012) % spacing
        : 0;

      ctx!.save();
      ctx!.strokeStyle = "rgba(168,85,247,0.035)";
      ctx!.lineWidth = 0.5;
      ctx!.beginPath();
      for (let x = gx; x < w; x += spacing) {
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, h);
      }
      for (let y = gy; y < h; y += spacing) {
        ctx!.moveTo(0, y);
        ctx!.lineTo(w, y);
      }
      ctx!.stroke();
      ctx!.restore();

      s.raf = requestAnimationFrame(loop);
    }

    s.raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(s.raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchstart", onTouch);
    };
  }, []);

  /* ─── Render ─── */
  return (
    <main className="relative w-screen h-screen overflow-hidden cursor-none select-none bg-[#030014]">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* ── Content overlay ── */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full py-8 sm:py-10 px-6 pointer-events-none">
        {/* Top bar */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-7xl flex items-center justify-between pointer-events-auto"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/25">
              M
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Meet Your Fan
            </span>
          </div>
          <Link
            href="/waitlist"
            className="glow-button px-5 py-2.5 rounded-full text-white text-sm font-semibold"
          >
            Get Early Access
          </Link>
        </motion.nav>

        {/* Center */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-6xl sm:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-[0_4px_60px_rgba(0,0,0,0.6)]"
          >
            MEET
            <br />
            YOUR
            <br />
            <span className="gradient-text">FAN</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white/50 text-base sm:text-lg mt-5 max-w-md mx-auto leading-relaxed"
          >
            Where creators and fans connect through
            <br className="hidden sm:block" />
            meetups, giveaways &amp; exclusive content
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Link
              href="/waitlist"
              className="glow-button inline-block mt-8 px-10 py-4 rounded-full text-white font-bold text-lg pointer-events-auto"
            >
              Join the Waitlist
            </Link>
          </motion.div>
        </div>

        {/* Bottom hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-white/20 text-xs sm:text-sm tracking-widest uppercase"
        >
          Move your cursor to explore
        </motion.p>
      </div>
    </main>
  );
}
