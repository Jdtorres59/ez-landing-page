"use client";

import { motion } from "framer-motion";

const particles = [
  { symbol: "$", left: "5%",  top: "12%", size: "text-4xl", color: "rgba(245,158,11,0.22)", dur: 7,  delay: 0 },
  { symbol: "%", left: "12%", top: "68%", size: "text-3xl", color: "rgba(74,158,255,0.18)",  dur: 9,  delay: 1 },
  { symbol: "↑", left: "20%", top: "32%", size: "text-5xl", color: "rgba(245,158,11,0.16)", dur: 11, delay: 2 },
  { symbol: "+", left: "30%", top: "78%", size: "text-4xl", color: "rgba(74,158,255,0.20)",  dur: 8,  delay: 0.5 },
  { symbol: "$", left: "42%", top: "8%",  size: "text-3xl", color: "rgba(245,158,11,0.18)", dur: 13, delay: 3 },
  { symbol: "📈", left: "50%", top: "55%", size: "text-2xl", color: "rgba(255,255,255,0.12)", dur: 10, delay: 1.5 },
  { symbol: "₿", left: "60%", top: "22%", size: "text-4xl", color: "rgba(245,158,11,0.18)", dur: 9,  delay: 2.5 },
  { symbol: "%", left: "68%", top: "72%", size: "text-3xl", color: "rgba(74,158,255,0.16)",  dur: 12, delay: 0.8 },
  { symbol: "+", left: "76%", top: "40%", size: "text-5xl", color: "rgba(245,158,11,0.14)", dur: 7,  delay: 1.8 },
  { symbol: "↑", left: "85%", top: "15%", size: "text-3xl", color: "rgba(74,158,255,0.20)", dur: 14, delay: 0.3 },
  { symbol: "$", left: "91%", top: "62%", size: "text-4xl", color: "rgba(245,158,11,0.18)", dur: 11, delay: 2.2 },
  { symbol: "📈", left: "10%", top: "48%", size: "text-3xl", color: "rgba(255,255,255,0.10)", dur: 8,  delay: 3.5 },
  { symbol: "₿", left: "38%", top: "88%", size: "text-2xl", color: "rgba(245,158,11,0.16)", dur: 10, delay: 1.2 },
  { symbol: "$", left: "72%", top: "85%", size: "text-3xl", color: "rgba(74,158,255,0.18)",  dur: 9,  delay: 4 },
  { symbol: "+", left: "24%", top: "90%", size: "text-4xl", color: "rgba(245,158,11,0.14)", dur: 13, delay: 0.7 },
  { symbol: "₿", left: "55%", top: "93%", size: "text-2xl", color: "rgba(74,158,255,0.16)",  dur: 8,  delay: 2.8 },
  { symbol: "↑", left: "95%", top: "38%", size: "text-4xl", color: "rgba(245,158,11,0.20)", dur: 10, delay: 1.6 },
  { symbol: "%", left: "46%", top: "30%", size: "text-3xl", color: "rgba(74,158,255,0.14)",  dur: 12, delay: 3.2 },
  { symbol: "$", left: "3%",  top: "82%", size: "text-5xl", color: "rgba(245,158,11,0.12)", dur: 9,  delay: 0.9 },
  { symbol: "+", left: "82%", top: "58%", size: "text-3xl", color: "rgba(74,158,255,0.18)",  dur: 7,  delay: 2.1 },
  { symbol: "📈", left: "16%", top: "18%", size: "text-3xl", color: "rgba(255,255,255,0.09)", dur: 11, delay: 4.2 },
  { symbol: "$", left: "64%", top: "5%",  size: "text-4xl", color: "rgba(245,158,11,0.20)", dur: 8,  delay: 1.1 },
  { symbol: "↑", left: "78%", top: "96%", size: "text-3xl", color: "rgba(74,158,255,0.14)",  dur: 13, delay: 3.8 },
  { symbol: "₿", left: "33%", top: "50%", size: "text-2xl", color: "rgba(245,158,11,0.16)", dur: 6,  delay: 0.4 },
  { symbol: "%", left: "88%", top: "80%", size: "text-4xl", color: "rgba(74,158,255,0.18)",  dur: 10, delay: 2.6 },
];

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* SVG grid perspectiva estilo synthwave */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(74,158,255,0)" />
            <stop offset="45%" stopColor="rgba(74,158,255,0.10)" />
            <stop offset="100%" stopColor="rgba(74,158,255,0)" />
          </linearGradient>
        </defs>
        {[0.3, 0.45, 0.55, 0.65, 0.73, 0.8, 0.86, 0.91, 0.95, 0.98].map((y, i) => (
          <line
            key={`h-${i}`}
            x1="0%" y1={`${y * 100}%`}
            x2="100%" y2={`${y * 100}%`}
            stroke="url(#gridFade)"
            strokeWidth="0.6"
          />
        ))}
        {[-40, -20, 0, 20, 40, 60, 80, 100, 120, 140].map((x, i) => (
          <line
            key={`v-${i}`}
            x1={`${x}%`} y1="100%"
            x2="50%" y2="30%"
            stroke="rgba(74,158,255,0.06)"
            strokeWidth="0.6"
          />
        ))}
      </svg>

      {/* Partículas flotantes */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute ${p.size} select-none font-black`}
          style={{ left: p.left, top: p.top, color: p.color }}
          animate={{ y: [0, -28, 0], rotate: [0, 6, 0] }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
}
